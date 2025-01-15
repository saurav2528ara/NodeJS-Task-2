# Cryptocurrency Real-Time Price Tracker & Alert System

A real-time cryptocurrency price tracker built using **Express.js**, **Socket.IO**, and **CoinGecko API**. This application fetches cryptocurrency prices every 15 seconds and provides real-time updates to users. It also includes an alert system that notifies users when a coin reaches a user-defined target price.

---
## **Example Output**

### **Cryptocurrency Prices Table** (Updated Every 15 seconds):

| **Name**     | **Symbol** | **Current Price (USD)** | **24h Change (%)** |
|--------------|------------|-------------------------|--------------------|
| **Bitcoin**  | BTC        | **$50,000.00**           | +2.5%              |
| **Ethereum** | ETH        | **$4,000.00**            | -1.8%              |
| **Nexo**     | NEXO       | **$1.85**                | +1.0%              |
| ...          | ...        | ...                     | ...                |

---

### **Alert Notification Example**:

When an alert is triggered, the user will receive a notification like the one below:


> **🚨 Price Alert! 🚨**  
> **NEXO** has reached **$2**. Current Price: **$2.01**



## **Features**

- **Real-Time Price Updates**: 
  - Displays cryptocurrency prices updated every 15 seconds.
  - Data fetched from the **CoinGecko API** and displayed dynamically.

- **Price Alert System**:
  - Users can set alerts for specific cryptocurrencies and target prices.
  - Receive real-time alerts when the target price is met.
  - Alerts are sent directly to the user's browser.

---

## **Technologies Used**

- **Backend**:
  - **Node.js** for the server
  - **Express.js** for handling routes
  - **Socket.IO** for real-time communication between the server and client
  - **Axios** for fetching cryptocurrency data from the **CoinGecko API**

- **Frontend**:
  - **EJS** for dynamic HTML rendering
  - **HTML/CSS** for the basic UI

---

## **How It Works**

1. **Real-Time Price Updates**:  
   The server fetches cryptocurrency prices from the CoinGecko API every 15 seconds and sends them to all connected clients. This allows users to see live updates of the top cryptocurrencies.

2. **Set Alerts**:  
   Users can set alerts for specific cryptocurrencies. For example, if you want to be notified when **NEXO** reaches $2, the system will trigger an alert once that condition is met.

3. **Receive Alerts**:  
   When a target price is reached, users will receive a **real-time alert** in their browser with the current price of the coin.

---

## **Getting Started**

### **1. Clone the repository:**

```bash
git clone https://github.com/yourusername/crypto-price-alert.git
