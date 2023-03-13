import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/social/",
	plugins: [react()],
	build: { rollupOptions: { 
    output: { manualChunks: { firestore: ["firebase/firestore"] } } }, target: "modules", outDir: 'docs' },
});
