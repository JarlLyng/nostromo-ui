#!/bin/bash

# Stability Test Script for 1.0.0 Release
# This script runs comprehensive stability tests

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

echo -e "${BLUE}🧪 Running Stability Tests for 1.0.0 Release${NC}"
echo "=============================================="
echo ""

# 1. Unit Tests
echo -e "${BLUE}1️⃣ Running unit tests...${NC}"
cd packages/ui-core
pnpm test:run
print_status "Unit tests passed"

# 2. Accessibility Tests
echo ""
echo -e "${BLUE}2️⃣ Running accessibility tests...${NC}"
pnpm test:a11y
print_status "Accessibility tests passed"

# 3. Type Check
echo ""
echo -e "${BLUE}3️⃣ Running type check...${NC}"
cd ../..
pnpm type-check
print_status "Type check passed"

# 4. Lint
echo ""
echo -e "${BLUE}4️⃣ Running linter...${NC}"
pnpm lint || {
    # Check if there are actual errors (not just warnings)
    if grep -q "(0 errors" lint-output.txt 2>/dev/null || grep -q "0 errors" lint-output.txt 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Linter has warnings but no errors (acceptable)${NC}"
    else
        echo -e "${RED}❌ Linter found errors${NC}"
        exit 1
    fi
}
print_status "Linter passed"

# 5. Build
echo ""
echo -e "${BLUE}5️⃣ Building packages...${NC}"
pnpm build
print_status "Build completed"

# 6. Bundle Size
echo ""
echo -e "${BLUE}6️⃣ Checking bundle sizes...${NC}"
cd packages/ui-core
pnpm size
print_status "Bundle size checks passed"

# 7. Storybook Build
echo ""
echo -e "${BLUE}7️⃣ Building Storybook...${NC}"
pnpm build-storybook
print_status "Storybook build completed"

# 8. Documentation Build
echo ""
echo -e "${BLUE}8️⃣ Building documentation...${NC}"
cd ../../docs
npm run build
print_status "Documentation build completed"

echo ""
echo -e "${GREEN}✅ All automated stability tests passed!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "   • Test in different browsers (Chrome, Firefox, Safari, Edge)"
echo "   • Test with React 18 and React 19"
echo "   • Create test projects (Next.js, Vite)"
echo "   • Manual accessibility testing"
echo "   • Performance testing"
echo ""
echo "✅ All stability tests completed!"
echo ""
echo "For more information about testing, see:"
echo "- CI/CD workflows: .github/workflows/ci.yml"
echo "- Development guide: docs/guides/DEVELOPMENT.md"

