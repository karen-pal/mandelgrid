import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "docs", // para el github pages
	},
	base: "/mandelgrid/",
});
