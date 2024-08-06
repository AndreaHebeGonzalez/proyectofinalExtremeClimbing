import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      css: {
        devSourcemap: true
      },
    },
  },
  plugins: [react()],
});

