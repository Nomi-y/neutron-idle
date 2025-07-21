import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        include: ['bignumber.js']
    },
    esbuild: {
        loader: 'ts',
    },
});
