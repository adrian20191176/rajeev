// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

const site = 'https://royalcrownbearings.lk';
const hiddenFromSearch = new Set([
    '/admin',
    '/admin/login',
    '/enquiry-list',
]);

function stripTrailingSlash(pathname) {
    if (pathname !== '/' && pathname.endsWith('/')) {
        return pathname.replace(/\/+$/, '');
    }

    return pathname;
}

function normalizeSitemapUrl(value) {
    const url = new URL(value);
    url.pathname = stripTrailingSlash(url.pathname);
    return url.href;
}

// https://astro.build/config
export default defineConfig({
    site,
    trailingSlash: 'never',
    integrations: [
        sitemap({
            filter: (page) => !hiddenFromSearch.has(stripTrailingSlash(new URL(page).pathname)),
            serialize: (item) => ({
                ...item,
                url: normalizeSitemapUrl(item.url),
            }),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
