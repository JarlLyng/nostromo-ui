// vitest.config.ts
import { defineConfig } from "file:///Users/jarl.l/Documents/Github/nostromo-ui/node_modules/.pnpm/vitest@1.6.1_@types+node@20.19.14_jsdom@27.0.0_postcss@8.5.6__lightningcss@1.30.1/node_modules/vitest/dist/config.js";
import react from "file:///Users/jarl.l/Documents/Github/nostromo-ui/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.20_@types+node@20.19.14_lightningcss@1.30.1_/node_modules/@vitejs/plugin-react/dist/index.js";
var vitest_config_default = defineConfig({
  plugins: [
    react()
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.stories.*",
        "**/*.test.*"
      ]
    }
  },
  resolve: {
    alias: {
      "@": "./src"
    }
  },
  css: {
    postcss: {
      plugins: []
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qYXJsLmwvRG9jdW1lbnRzL0dpdGh1Yi9ub3N0cm9tby11aS9wYWNrYWdlcy91aS1jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamFybC5sL0RvY3VtZW50cy9HaXRodWIvbm9zdHJvbW8tdWkvcGFja2FnZXMvdWktY29yZS92aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYXJsLmwvRG9jdW1lbnRzL0dpdGh1Yi9ub3N0cm9tby11aS9wYWNrYWdlcy91aS1jb3JlL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICBdLFxuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgc2V0dXBGaWxlczogWycuL3NyYy90ZXN0L3NldHVwLnRzJ10sXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCddLFxuICAgICAgZXhjbHVkZTogW1xuICAgICAgICAnbm9kZV9tb2R1bGVzLycsXG4gICAgICAgICdzcmMvdGVzdC8nLFxuICAgICAgICAnKiovKi5kLnRzJyxcbiAgICAgICAgJyoqLyouc3Rvcmllcy4qJyxcbiAgICAgICAgJyoqLyoudGVzdC4qJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6ICcuL3NyYycsXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW10sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VyxTQUFTLG9CQUFvQjtBQUNwWSxPQUFPLFdBQVc7QUFFbEIsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxxQkFBcUI7QUFBQSxJQUNsQyxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVLENBQUMsUUFBUSxRQUFRLE1BQU07QUFBQSxNQUNqQyxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
