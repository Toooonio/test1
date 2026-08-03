import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), legacy({
    targets: ["defaults", "Android >= 5", "iOS >= 11"],
    modernPolyfills: true,
  })],
});
