// import react from "@vitejs/plugin-react";

// export default {
//   plugins: [react()],
//   optimizeDeps: {
//     include: ["react", "react-dom"]
//   }
  
// };
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
 react()],
  build: {
    target: "esnext",
    minify: "esbuild",
    outDir: "dist"
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  }
});
