import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'node',
        environment: 'happy-dom',
        include: ['tests/**/*.spec.ts'],
    },
})
