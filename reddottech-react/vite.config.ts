import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      // Forward API calls to the Express backend during development
      "/api": {
        target: process.env.VITE_DEV_PROXY_TARGET || "http://localhost:5000",
        changeOrigin: true,
      },
      "/uploads": {
        target: process.env.VITE_DEV_PROXY_TARGET || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("src/data/ai-")) {
            return "ai-course-curriculum";
          }
        },
      },
    },
  },

});
