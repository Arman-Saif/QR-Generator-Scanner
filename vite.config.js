import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const treatJsAsJsx = () => ({
  name: "treat-js-as-jsx",
  enforce: "pre",
  async transform(code, id) {
    if (!id.match(/\.js$/)) return null;
    return await transformWithOxc(code, id, { lang: "jsx" });
  },
});

export default defineConfig({
  plugins: [react(), treatJsAsJsx(), tailwindcss()],
});
