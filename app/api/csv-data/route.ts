

// app/api/csv-data/route.js
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';


const csvFilePath = path.join(process.cwd(), 'data', 'solana-wallet-matrix.csv');

// GET - Read CSV data
export async function GET() {
  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    const jsonData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true
    });

    if (jsonData.errors.length > 0) {
      return NextResponse.json(
        { error: 'CSV parsing error', details: jsonData.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: jsonData.data });
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found or read error', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Add new wallet data
export async function POST(request) {
  try {
    const newWalletData = await request.json();
    
    // Validate required fields
    if (!newWalletData.walletAddress || !newWalletData.ownerName) {
      return NextResponse.json(
        { error: 'Wallet address and owner name are required' },
        { status: 400 }
      );
    }

    // Read existing CSV data
    let existingData = [];
    try {
      const csvData = fs.readFileSync(csvFilePath, 'utf8');
      const parsed = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      existingData = parsed.data;
    } catch (error) {
      // If file doesn't exist, we'll create it
      console.log('CSV file not found, creating new one');
    }

    // Add timestamp and ID
    const newEntry = {
      id: Date.now(),
      walletAddress: newWalletData.walletAddress,
      ownerName: newWalletData.ownerName,
      balance: newWalletData.balance || 0,
      currency: newWalletData.currency || 'ETH',
      network: newWalletData.network || 'Ethereum',
      createdAt: new Date().toISOString().split('T')[0],
      status: newWalletData.status || 'Active'
    };

    // Check for duplicate wallet address
    const existingWallet = existingData.find(
      wallet => wallet.walletAddress === newEntry.walletAddress
    );
    
    if (existingWallet) {
      return NextResponse.json(
        { error: 'Wallet address already exists' },
        { status: 409 }
      );
    }

    // Add new entry to existing data
    existingData.push(newEntry);

    // Convert back to CSV
    const csvString = Papa.unparse(existingData, {
      header: true
    });

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to CSV file
    fs.writeFileSync(csvFilePath, csvString, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Wallet data added successfully',
      data: newEntry
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add wallet data', message: error.message },
      { status: 500 }
    );
  }
}

