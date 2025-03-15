import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Remove tailwindcss(), it's not a Vite plugin
  build: {
    target: "esnext",
    minify: "esbuild",
    outDir: "dist"
  },
  define: {
    "process.env": {}, // Helps prevent missing env errors
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  }
});
