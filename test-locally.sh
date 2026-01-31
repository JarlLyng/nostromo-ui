#!/bin/bash

# Local Testing Script for Nostromo UI Improvements
# This script runs all the same checks that CI will run

set -e  # Exit on error

echo "🧪 Testing Nostromo UI Improvements Locally"
echo "=============================================="
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

# 1. Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile
print_status "Dependencies installed"

# 2. Lint check
echo ""
echo "🔍 Running linter..."
pnpm lint
print_status "Linter passed"

# 3. Type check
echo ""
echo "🔷 Running TypeScript type check..."
pnpm type-check
print_status "Type check passed"

# 4. Run tests
echo ""
echo "🧪 Running tests..."
pnpm test:run
print_status "All tests passed"

# 5. Build packages
echo ""
echo "🏗️  Building packages..."
pnpm build
print_status "Build completed"

# 6. Check bundle sizes
echo ""
echo "📊 Checking bundle sizes..."
cd packages/nostromo
pnpm size
print_status "Bundle size checks passed"

# 7. Accessibility tests
echo ""
echo "♿ Running accessibility tests..."
pnpm test:a11y
print_status "Accessibility tests passed"

# 8. Storybook test (optional - only if you want to verify Storybook works)
echo ""
echo -e "${YELLOW}📚 Storybook test (optional)${NC}"
echo "   To test Storybook, run: cd packages/ui-core && pnpm storybook"
echo "   Then open http://localhost:6006 in your browser"

echo ""
echo -e "${GREEN}✅ All checks passed! Your code is ready for PR.${NC}"

