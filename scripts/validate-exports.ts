#!/usr/bin/env tsx
/**
 * Script to validate that all components in dist/components are exported in package.json
 * Prevents "missing export" bugs by ensuring exports map matches build output
 */

import { readFileSync, existsSync } from "fs";
import { readdirSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

function validateExports() {
  console.log("🔍 Validating component exports...\n");

  const packageJsonPath = join(rootDir, "packages/nostromo/package.json");
  const distComponentsPath = join(rootDir, "packages/nostromo/dist/components");
  const srcComponentsPath = join(rootDir, "packages/nostromo/src/components");

  // Read package.json
  if (!existsSync(packageJsonPath)) {
    console.error("❌ package.json not found");
    process.exit(1);
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  const exports = packageJson.exports || {};

  // Get all component files from src/components (excluding test/story files)
  if (!existsSync(srcComponentsPath)) {
    console.error("❌ src/components directory not found");
    process.exit(1);
  }

  // Components are grouped: src/components/<group>/<name>.tsx, and the matching
  // export keys are "./components/<group>/<name>".
  const groups = readdirSync(srcComponentsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("__"))
    .map((entry) => entry.name);

  const srcFiles = groups.flatMap((group) =>
    readdirSync(join(srcComponentsPath, group), { withFileTypes: true })
      .filter(
        (file) =>
          file.isFile() &&
          file.name.endsWith(".tsx") &&
          !file.name.includes(".test.") &&
          !file.name.includes(".stories."),
      )
      .map((file) => `components/${group}/${basename(file.name, ".tsx")}`),
  );

  console.log(`📦 Found ${srcFiles.length} component files in src/components:`);
  srcFiles.forEach((file) => console.log(`   - ${file}`));

  // Get all exported components from package.json
  const exportedComponents = Object.keys(exports)
    .filter((key) => key.startsWith("./components/"))
    .map((key) => key.replace("./", ""));

  console.log(
    `\n📤 Found ${exportedComponents.length} exported components in package.json:`,
  );
  exportedComponents.forEach((comp) => console.log(`   - ${comp}`));

  // Check for missing exports
  const missingExports: string[] = [];
  const extraExports: string[] = [];

  srcFiles.forEach((component) => {
    if (!exportedComponents.includes(component)) {
      missingExports.push(component);
    }
  });

  exportedComponents.forEach((exported) => {
    if (!srcFiles.includes(exported)) {
      extraExports.push(exported);
    }
  });

  // Report results
  console.log("\n📊 Validation Results:");

  if (missingExports.length === 0 && extraExports.length === 0) {
    console.log("✅ All components are properly exported!");
    console.log("\n💡 All component files match exports in package.json");
    return 0;
  }

  if (missingExports.length > 0) {
    console.log(`\n❌ Missing exports (${missingExports.length}):`);
    missingExports.forEach((comp) => {
      console.log(`   - ${comp}`);
      console.log(
        `     Add to package.json exports: "./${comp}": { "types": "./dist/components/${comp}.d.ts", "import": "./dist/components/${comp}.js", "require": "./dist/components/${comp}.cjs" }`,
      );
    });
  }

  if (extraExports.length > 0) {
    console.log(`\n⚠️  Extra exports (${extraExports.length}):`);
    extraExports.forEach((comp) => {
      console.log(`   - ${comp} (component file not found)`);
    });
  }

  console.log("\n💡 Fix: Update package.json exports to match component files");
  return 1;
}

const exitCode = validateExports();
process.exit(exitCode);
