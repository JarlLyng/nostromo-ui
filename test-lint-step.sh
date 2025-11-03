#!/bin/bash

# Test lint step logic exactly as in CI
set +e
pnpm lint 2>&1 | tee lint-output.txt
LINT_EXIT=${PIPESTATUS[0]}
echo ""
echo "=== Lint Exit Code: $LINT_EXIT ==="
echo ""
echo "=== Checking for (0 errors in output ==="
if grep -q "(0 errors" lint-output.txt; then
  echo "✅ Found '(0 errors' in output - should exit 0"
  EXPECTED_EXIT=0
else
  echo "❌ Did NOT find '(0 errors' in output"
  EXPECTED_EXIT=1
fi
echo ""
echo "=== Full lint output summary ==="
grep -E "✖|problems|error" lint-output.txt | head -5
echo ""
if [ $EXPECTED_EXIT -eq 0 ]; then
  echo "✅ Linter should pass (warnings only)"
  exit 0
else
  echo "❌ Linter should fail"
  exit 1
fi

