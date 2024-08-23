import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/remarkFigureCaption.js',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['unist-util-visit'],
        },
    },
});
