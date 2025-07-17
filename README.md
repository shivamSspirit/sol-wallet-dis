# Solana Wallet Inventory

How to Add a Wallet to the Dashboard ??
This dashboard uses a Google Sheet to manage wallet data. 

That sheet is exported as a CSV and added to the project.

sheet link

🪜 Steps to Add a Wallet
1. Open the Wallets Google Sheet
👉 Open Sheet
Each row = one wallet
Fill in details like:

Wallet name

Platform (Android, Chrome, etc.)

Custody type (Self-custody, Custodial, MPC)

Features (Staking, NFT, DEX, etc.)

Website, version, notes, and test date

2. Add Your Wallet
Scroll down and add a new row

Fill in all required columns

Keep names and categories consistent

3. Download as CSV
In Google Sheets, click:
File → Download → Comma-separated values (.csv)

Save the file as:
solana-wallet-matrix.csv

1. Update the Project
Replace the old solana-wallet-matrix.csv inside:
/data/ folder in your project

Example path:
your-project/data/solana-wallet-matrix.csv

1. Check the Dashboard
Run or refresh the dashboard

Your new wallet should now appear correctly