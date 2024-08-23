import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/remarkFigureCaption.js',
            formats: ['es'],
            fileName: 'index',
        },
        rollupOptions: {
            external: ['unist-util-visit'],
        },
    },
});
