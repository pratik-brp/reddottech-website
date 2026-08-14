import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      router: {
        // Supported at runtime (router-composed-plugin reads it); the installed
        // start-plugin-core types lag the router-plugin API.
        // @ts-expect-error - verified to emit per-route chunks in production build.
        autoCodeSplitting: true,
      },
    }),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      // Forward API calls to the Express + SQLite backend during development so
      // the frontend can use same-origin "/api/..." URLs everywhere.
      "/api": {
        target: process.env.VITE_DEV_PROXY_TARGET || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (id.includes("gsap") || id.includes("framer-motion") || id.includes("lenis")) {
              return "vendor-motion";
            }
            if (
              id.includes("@radix-ui") ||
              id.includes("embla-carousel") ||
              id.includes("cmdk") ||
              id.includes("vaul")
            ) {
              return "vendor-ui";
            }
            if (id.includes("recharts")) {
              return "vendor-charts";
            }
            if (id.includes("@tanstack")) {
              return "vendor-tanstack";
            }
          }
        },
      },
    },
  },
});
