import { defineConfig } from "vitest/config";

// No @vitejs/plugin-react here on purpose. The tests build their trees with
// React.createElement rather than JSX, so nothing needs a JSX transform - and the
// snippets under test are compiled by react-live itself, which is the point.
// Types resolve through the package `exports` map into dist, same as everywhere
// else: dist is what ships.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts"],
    testTimeout: 60000,
  },
});
