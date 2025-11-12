# Git LFS Setup Instructions

To push the large video file (102MB) to GitHub, you need to install Git LFS first.

## Installation Options

### Option 1: Using Homebrew (Recommended for macOS)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git LFS
brew install git-lfs

# Initialize Git LFS
git lfs install
```

### Option 2: Direct Download
1. Visit: https://git-lfs.github.com/
2. Download the macOS installer
3. Run the installer
4. Then run: `git lfs install`

## After Installation

Once Git LFS is installed, run these commands:

```bash
cd /Users/nicolettetandradinata/Desktop/Nicolette-Portfolio
git add "public/Project files/2/export_1689436621341.mov"
git commit -m "feat: add large video file using Git LFS"
git push origin main
```

The `.gitattributes` file is already configured to track the large video file with Git LFS.

## Verify Installation

Check if Git LFS is working:
```bash
git lfs version
```

You should see something like: `git-lfs/3.x.x`

