import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { createBlockletPlugin } from "vite-plugin-blocklet";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

const postCssScss = require("postcss-scss");
const postcssRTLCSS = require("postcss-rtlcss");

const viteCompressionFilter = /\.(js|mjs|json|css|html|svg)$/i;

// https://vitejs.dev/config/
export default defineConfig({
    server: process.env.BLOCKLET_DATA_DIR ? {} : { port: 3000 },
    define: {
        "FRONTEND_VERSION": JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
        vue(),
        process.env.BLOCKLET_DATA_DIR ? createBlockletPlugin() : null,
        legacy({
            targets: [ "since 2015" ],
        }),
        visualizer({
            filename: "tmp/dist-stats.html"
        }),
        viteCompression({
            algorithm: "gzip",
            filter: viteCompressionFilter,
        }),
        viteCompression({
            algorithm: "brotliCompress",
            filter: viteCompressionFilter,
        }),
    ].filter(Boolean),
    css: {
        postcss: {
            "parser": postCssScss,
            "map": false,
            "plugins": [ postcssRTLCSS ]
        }
    },
    build: {
        modulePreload: false,
        rollupOptions: {
            output: {
                manualChunks(id, { getModuleInfo, getModuleIds }) {

                }
            }
        },
    }
});
