#!/bin/bash

# Simulate GitHub Actions CI Environment Locally
# This script runs the same commands as CI to catch errors before pushing

set -e  # Exit on error
export CI=true  # Simulate CI environment to enable higher performance thresholds and other CI-specific behavior


echo "🔧 Simulating GitHub Actions CI Environment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper function to print status
print_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed${NC}"
    echo "Install pnpm: npm install -g pnpm@9"
    exit 1
fi

echo "📦 Checking pnpm version..."
pnpm --version
print_status "pnpm is available"

echo ""
echo "📥 Step 1: Installing dependencies..."
pnpm install --frozen-lockfile
print_status "Dependencies installed"

echo ""
echo "🔍 Step 2: Running linter..."
pnpm lint
print_status "Linter passed"

echo ""
echo "🔷 Step 3: Running type check..."
pnpm type-check
print_status "Type check passed"

echo ""
echo "🧪 Step 4: Running tests..."
cd packages/nostromo
pnpm test:run
print_status "Tests passed"
cd ../..

echo ""
echo "🏗️  Step 5: Building packages..."
pnpm build
print_status "Build completed"

echo ""
echo "📊 Step 6: Checking bundle sizes..."
cd packages/nostromo
pnpm size
print_status "Bundle size checks passed"
cd ../..

echo ""
echo "♿ Step 7: Running accessibility tests..."
cd packages/nostromo
pnpm test:a11y
print_status "Accessibility tests passed"
cd ../..

echo ""
echo -e "${GREEN}✅ All CI checks passed! Your code is ready.${NC}"

