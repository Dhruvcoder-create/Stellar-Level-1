# Split Bill Calculator – Stellar Testnet dApp

A web application that allows users to split a bill in XLM and send payments securely using the Freighter Wallet on the Stellar Testnet.

This project demonstrates wallet integration, transaction building, signing, and submission using the Stellar SDK and Freighter API.

---

## Project Description

The Split Bill Calculator enables users to:

- Connect their Freighter wallet  
- View their current XLM balance  
- Enter a total bill amount  
- Split the bill among multiple people  
- Send the calculated share to a recipient address  
- View the transaction hash after successful submission  

The application builds a Stellar transaction using `TransactionBuilder`, signs it using Freighter, and submits it to the Stellar Horizon Testnet.

---

## Features

- Freighter wallet connection  
- Real-time balance retrieval  
- Bill splitting calculation  
- Transaction signing using Freighter  
- Transaction submission to Horizon  
- Transaction hash display to user  
- Stellar Testnet integration  

---

## Screenshots

### Dashboard
<img width="1919" height="1131" alt="Dashboard" src="https://github.com/user-attachments/assets/c177c7f4-12d5-4134-98f3-92eb7609a80c" />

### Wallet Connected
<img width="1919" height="1124" alt="Wallet Connect" src="https://github.com/user-attachments/assets/55299ac9-daf7-4ccd-a4a1-7238b2fc1f24" />

### Balance Displayed
<img width="1919" height="955" alt="image" src="https://github.com/user-attachments/assets/8e50fccb-c6ec-40c7-b7c4-6fb87d992b2c" />

### Transaction Confirmation (Freighter)
<img width="1886" height="1123" alt="Txn Confirmation" src="https://github.com/user-attachments/assets/a60ac6c1-046e-4861-8d9f-2b5c1728167c" />

### Successful Testnet Transaction
<img width="1919" height="1121" alt="Txn Successful" src="https://github.com/user-attachments/assets/4a0258fa-66a1-4c58-9c4a-9078414faf16" />

---

## Technologies Used

Frontend:
- TypeScript
- Vite

Stellar Integration:
- @stellar/stellar-sdk (v11.3.0)
- @stellar/freighter-api

Network:
- Stellar Horizon Testnet

---

## Setup Instructions (Run Locally)

### Prerequisites

- Node.js (v18 or higher recommended)  
- npm  
- Freighter Wallet browser extension installed  
- Freighter set to Testnet  
- Testnet account funded using Friendbot  

Friendbot:
https://friendbot.stellar.org/

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/split-bill-ts.git
cd split-bill-ts
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

http://localhost:5173

---

## How It Works

1. The user connects their Freighter wallet.  
2. The application fetches the wallet balance from Horizon.  
3. The user enters total bill amount and number of people.  
4. The application calculates the split amount.  
5. A Stellar transaction is built using `TransactionBuilder`.  
6. The transaction is signed using Freighter.  
7. The signed transaction is submitted to Horizon.  
8. The transaction hash is displayed to the user.  

---

## Explorer Link

After sending a transaction, you can verify it on:

https://stellar.expert/explorer/testnet
