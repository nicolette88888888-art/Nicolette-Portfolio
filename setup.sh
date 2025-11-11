#!/bin/bash

# Setup script for Nicolette Portfolio

echo "Setting up Node.js and dependencies..."

# Load nvm if it exists
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if node is already installed
if command -v node &> /dev/null; then
    echo "Node.js is already installed: $(node --version)"
else
    echo "Installing Node.js LTS..."
    nvm install --lts
    nvm use --lts
    nvm alias default lts/*
fi

# Verify installation
if command -v node &> /dev/null && command -v npm &> /dev/null; then
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
    
    echo "Installing project dependencies..."
    npm install
    
    echo ""
    echo "✅ Setup complete! You can now run: npm run dev"
else
    echo "❌ Node.js installation failed. Please install Node.js manually from https://nodejs.org/"
    exit 1
fi

