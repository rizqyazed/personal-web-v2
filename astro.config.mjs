// @ts-check
import { defineConfig } from 'astro/config';// https://astro.build/config
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
      }, 
});
