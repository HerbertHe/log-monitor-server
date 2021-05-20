import { defineConfig } from "windicss/helpers"

export default defineConfig({
    extract: {
        include: ["./**/*.html", "./src/**/*.tsx"],
    },
})
