// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

const site = 'https://royalcrownbearings.lk';
const hiddenFromSearch = new Set([
    '/admin/',
    '/admin/login/',
    '/enquiry-list/',
]);

// https://astro.build/config
export default defineConfig({
    site,
    integrations: [
        sitemap({
            filter: (page) => !hiddenFromSearch.has(new URL(page).pathname),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});