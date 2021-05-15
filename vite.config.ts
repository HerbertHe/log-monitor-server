import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        proxy: {
            "^/api/.*": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
            },
        },
    },
})
