const express = require('express');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

// Configure EJS as the view engine
app.set('view engine', 'ejs');

// In-memory alerts storage
// Example alert format: { symbol: 'NEXO', targetPrice: 2, user: 'socket_id' }
const alerts = [];

// Serve the prices page
app.get("/", (req, res) => {
    res.render('prices');
});

// Fetch cryptocurrency prices and emit updates periodically
setInterval(async () => {
    try {
        // Fetch data from CoinGecko API
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
                vs_currency: 'usd',
                order: "market_cap_desc",
                limit: 10,
                sparkline: false,
                price_change_percentage: "24h"
            }
        });

        const prices = response.data;

        // Emit updated prices to all connected clients
        io.emit('priceUpdate', prices);

        // Check if any alerts should be triggered
        alerts.forEach((alert, index) => {
            const coin = prices.find(c => c.symbol.toUpperCase() === alert.symbol.toUpperCase());
            if (coin && coin.current_price >= alert.targetPrice) {
                // Trigger an alert for the user who set it
                io.to(alert.user).emit('priceAlert', {
                    message: `🚨 Alert! ${alert.symbol.toUpperCase()} has reached $${alert.targetPrice}. Current Price: $${coin.current_price.toFixed(2)}`
                });

                console.log(`Alert triggered for user ${alert.user}: ${alert.symbol} hit $${alert.targetPrice}`);
                
                // Optionally remove the alert after triggering
                alerts.splice(index, 1);
            }
        });
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error.message);
    }
}, 15000);

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for 'setAlert' event from clients
    socket.on('setAlert', (data) => {
        if (data.symbol && data.targetPrice) {
            console.log(`New alert received from ${socket.id}:`, data);
            alerts.push({ ...data, user: socket.id }); // Add alert to storage
            socket.emit('alertSet', { message: `Alert set for ${data.symbol} at $${data.targetPrice}` });
        } else {
            socket.emit('error', { message: "Invalid alert data. Please provide 'symbol' and 'targetPrice'." });
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        // Remove alerts set by the disconnected user
        const initialAlertCount = alerts.length;
        alerts = alerts.filter(alert => alert.user !== socket.id);
        console.log(`Removed ${initialAlertCount - alerts.length} alerts for user ${socket.id}`);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
