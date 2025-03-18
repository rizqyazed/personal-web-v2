// @ts-check
import { defineConfig } from 'astro/config';// https://astro.build/config
import tailwindcss from '@tailwindcss/vite';
import vercel from "@astrojs/vercel";

export default defineConfig({
    output: "static",
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: vercel({
        // isr: true,
        // edgeMiddleware: true,
    }),
});
