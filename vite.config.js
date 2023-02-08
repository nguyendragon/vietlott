import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@layout': path.resolve(__dirname, './src/components/Layout'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@axios': path.resolve(__dirname, './src/api/axios.jsx'),
            '@socket': path.resolve(__dirname, './src/api/socket.jsx'),
        },
    },
    plugins: [react()],
});
