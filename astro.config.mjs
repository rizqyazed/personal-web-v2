// @ts-check
import { defineConfig } from 'astro/config';// https://astro.build/config
import tailwindcss from '@tailwindcss/vite';
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    edgeMiddleware: true,
  }),
});
