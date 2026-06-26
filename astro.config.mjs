// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/browser-storage-from-zero-to-hero',
  output: 'static',
  integrations: [starlight({
      title: 'Browser Storage & Data — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/browser-storage-from-zero-to-hero/enhance.js' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/browser-storage-from-zero-to-hero/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/browser-storage-from-zero-to-hero/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/browser-storage-from-zero-to-hero/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#D97706' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "Browser Storage & Data" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/browser-storage-from-zero-to-hero/sw.js',{scope:'/browser-storage-from-zero-to-hero/'}).catch(function(){})})}" },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/browser-storage-from-zero-to-hero' }],
      sidebar: [
        { label: 'Intro: Storage Landscape', collapsed: true, items: [{ autogenerate: { directory: 'intro-storage-landscape' } }] },
        { label: 'localStorage & sessionStorage', collapsed: true, items: [{ autogenerate: { directory: 'web-storage' } }] },
        { label: 'Cookies', collapsed: true, items: [{ autogenerate: { directory: 'cookies' } }] },
        { label: 'IndexedDB Fundamentals', collapsed: true, items: [{ autogenerate: { directory: 'indexeddb-fundamentals' } }] },
        { label: 'IndexedDB Advanced', collapsed: true, items: [{ autogenerate: { directory: 'indexeddb-advanced' } }] },
        { label: 'Cache API & Quota', collapsed: true, items: [{ autogenerate: { directory: 'cache-and-quota' } }] },
        { label: 'Web Workers & SharedWorker', collapsed: true, items: [{ autogenerate: { directory: 'workers-sharedworker' } }] },
        { label: 'Cross-Tab & Files', collapsed: true, items: [{ autogenerate: { directory: 'cross-tab-and-files' } }] },
      ],
      }), preact()],
});