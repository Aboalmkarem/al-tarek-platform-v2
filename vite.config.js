import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/al-tarek-platform-v2",
    plugins: [react()],
});