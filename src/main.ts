import "./style.css";

import {
  requestAccess,
  getAddress,
  signTransaction
} from "@stellar/freighter-api";

import {
  Horizon,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Operation,
  Asset
} from "@stellar/stellar-sdk";

const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

let userPublicKey: string | null = null;
let splitAmount: string | null = null;

const connectBtn = document.getElementById("connectBtn") as HTMLButtonElement;
const disconnectBtn = document.getElementById("disconnectBtn") as HTMLButtonElement;
const walletAddress = document.getElementById("walletAddress")!;
const balanceEl = document.getElementById("balance")!;
const totalInput = document.getElementById("totalAmount") as HTMLInputElement;
const peopleInput = document.getElementById("peopleCount") as HTMLInputElement;
const calculateBtn = document.getElementById("calculateBtn") as HTMLButtonElement;
const splitResult = document.getElementById("splitResult")!;
const recipientInput = document.getElementById("recipient") as HTMLInputElement;
const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const txStatus = document.getElementById("txStatus")!;
const txHash = document.getElementById("txHash")!;

// CONNECT WALLET
connectBtn.addEventListener("click", async () => {
  try {
    await requestAccess();
    const { address } = await getAddress();
    userPublicKey = address;

    walletAddress.innerText = "Wallet: " + userPublicKey;

    const account = await server.loadAccount(userPublicKey);
    const balance = account.balances.find(
      (b: any) => b.asset_type === "native"
    );

    balanceEl.innerText = `Balance: ${balance?.balance} XLM`;
  } catch (err) {
    txStatus.innerText = "Wallet connection failed";
    console.error(err);
  }
});

// DISCONNECT
disconnectBtn.addEventListener("click", () => {
  userPublicKey = null;
  walletAddress.innerText = "";
  balanceEl.innerText = "";
  txStatus.innerText = "";
  txHash.innerText = "";
});

// CALCULATE SPLIT
calculateBtn.addEventListener("click", () => {
  const total = parseFloat(totalInput.value);
  const people = parseInt(peopleInput.value);

  if (!total || !people) {
    splitResult.innerText = "Enter valid values";
    return;
  }

  splitAmount = (total / people).toFixed(7);
  splitResult.innerText = `Each person pays: ${splitAmount} XLM`;
});

// SEND PAYMENT
import { Transaction } from "@stellar/stellar-sdk"; // add this at top

sendBtn.addEventListener("click", async () => {
  try {
    if (!userPublicKey || !splitAmount) {
      txStatus.innerText = "Connect wallet and calculate split first";
      return;
    }

    const account = await server.loadAccount(userPublicKey);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: recipientInput.value,
          asset: Asset.native(),
          amount: splitAmount,
        })
      )
      .setTimeout(30)
      .build();

    // 🔹 SIGN ONLY
    const signed = await signTransaction(
      transaction.toXDR(),
      {
        networkPassphrase: Networks.TESTNET,
      }
    );

    // 🔹 Convert back to Transaction object
    const signedTx = new Transaction(
      signed.signedTxXdr,
      Networks.TESTNET
    );

    // 🔹 Submit to Horizon
    const result = await server.submitTransaction(signedTx);

    txStatus.innerText = "Transaction Successful!";
    txHash.innerText = `Tx Hash: ${result.hash}`;

  } catch (err) {
    console.error(err);
    txStatus.innerText = "Transaction Failed";
  }
});