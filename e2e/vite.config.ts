import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// A consumer app, deliberately ordinary. The point is that the components and
// the stylesheet arrive here the same way they arrive in someone else's project:
// through the package's `exports` map into `dist`, with Tailwind compiling the
// two `@import` lines the published instructions tell you to write.
export default defineConfig({
  root: "app",
  plugins: [react(), tailwindcss()],
  build: { outDir: "../dist", emptyOutDir: true },
});
