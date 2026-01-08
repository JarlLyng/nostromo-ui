#!/usr/bin/env tsx
/**
 * Script to verify Tailwind CSS v4 compatibility
 * Checks that ui-tw preset works correctly with Tailwind v4
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

function checkTailwindV4Compatibility() {
  console.log("🔍 Verifying Tailwind CSS v4 compatibility...\n");

  // Check ui-tw package.json peerDependencies
  const uiTwPackageJson = JSON.parse(
    readFileSync(join(rootDir, "packages/ui-tw/package.json"), "utf-8"),
  );
  const peerDeps = uiTwPackageJson.peerDependencies || {};
  const tailwindPeer = peerDeps.tailwindcss;

  console.log(`📦 ui-tw peerDependencies:`);
  console.log(`   tailwindcss: ${tailwindPeer || "not specified"}`);

  if (!tailwindPeer || !tailwindPeer.includes("4.0.0")) {
    console.log(
      "   ⚠️  Warning: peerDependencies does not explicitly include Tailwind v4",
    );
  } else {
    console.log("   ✅ Tailwind v4 is supported in peerDependencies");
  }

  // Check ui-core uses Tailwind v4
  const uiCorePackageJson = JSON.parse(
    readFileSync(join(rootDir, "packages/ui-core/package.json"), "utf-8"),
  );
  const uiCoreDeps = {
    ...uiCorePackageJson.dependencies,
    ...uiCorePackageJson.devDependencies,
  };
  const tailwindVersion = uiCoreDeps.tailwindcss;
  const vitePluginVersion = uiCoreDeps["@tailwindcss/vite"];

  console.log(`\n📦 ui-core dependencies:`);
  console.log(`   tailwindcss: ${tailwindVersion || "not found"}`);
  console.log(`   @tailwindcss/vite: ${vitePluginVersion || "not found"}`);

  if (tailwindVersion && tailwindVersion.startsWith("^4")) {
    console.log("   ✅ Using Tailwind CSS v4");
  } else {
    console.log("   ⚠️  Not using Tailwind CSS v4");
  }

  if (vitePluginVersion && vitePluginVersion.startsWith("^4")) {
    console.log("   ✅ Using Tailwind CSS v4 Vite plugin");
  } else {
    console.log("   ⚠️  Not using Tailwind CSS v4 Vite plugin");
  }

  // Check preset syntax compatibility
  const presetPath = join(rootDir, "packages/ui-tw/src/tailwind.preset.ts");
  const presetContent = readFileSync(presetPath, "utf-8");

  console.log(`\n🔧 Preset syntax checks:`);

  // Check for <alpha-value> placeholder (v3/v4 compatible)
  if (presetContent.includes("<alpha-value>")) {
    console.log("   ✅ Uses <alpha-value> placeholder (v3/v4 compatible)");
  } else {
    console.log("   ⚠️  Does not use <alpha-value> placeholder");
  }

  // Check for Config type import (should work with both v3 and v4)
  if (presetContent.includes("import type { Config } from 'tailwindcss'")) {
    console.log("   ✅ Uses Tailwind Config type");
  } else {
    console.log("   ⚠️  Does not import Config type");
  }

  // Check for plugins array (v3/v4 compatible)
  if (presetContent.includes("plugins: [")) {
    console.log("   ✅ Uses plugins array (v3/v4 compatible)");
  } else {
    console.log("   ⚠️  Does not use plugins array");
  }

  console.log(`\n✅ Compatibility check complete!`);
  console.log(`\n💡 Recommendations:`);
  console.log(
    `   - Ensure all packages using ui-tw preset have Tailwind v4 installed`,
  );
  console.log(
    `   - Test preset with both Tailwind v3 and v4 if backward compatibility is needed`,
  );
  console.log(`   - Monitor Tailwind v4 release notes for breaking changes`);
}

checkTailwindV4Compatibility();
