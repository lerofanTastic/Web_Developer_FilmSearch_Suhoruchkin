import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Web_Developer_FilmSearch_Suhoruchkin/",
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.kinopoisk.dev/v1.4/movie",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
