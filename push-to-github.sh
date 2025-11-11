#!/bin/bash

# Script to push to GitHub with authentication
# This will prompt you for your GitHub credentials

echo "Pushing to GitHub..."
echo ""
echo "You will be prompted for your GitHub credentials."
echo "Username: nicolette88888888-art"
echo "Password: Use a Personal Access Token (not your GitHub password)"
echo ""
echo "To create a Personal Access Token:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token (classic)'"
echo "3. Select 'repo' scope"
echo "4. Copy the token and use it as your password"
echo ""
read -p "Press Enter to continue with push..."

git push -u origin main

