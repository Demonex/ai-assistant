import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 2051,
		proxy: {
			"/api/v1": {
				target: `http://localhost:2050`,
				changeOrigin: true,
			},
			"/admin": {
				target: "http://localhost:2055",
				changeOrigin: true,
			},
			"/_next/webpack-hmr": {
				target: "ws://localhost:2055/_next/webpack-hmr",
				changeOrigin: true,
			},
			"/_next": {
				target: "http://localhost:2055",
				changeOrigin: true,
			},
		},
	},
	plugins: [tsconfigPaths(), react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	build: {
		minify: true,
	},
	optimizeDeps: {
		force: true,
	},
	/*experimental: {
    server: {
        port: 2051,
        proxy: {
            '/api': {
                target: `http://10.199.35.49:2050`,
                // target: `https://backend.rifify.me`,
                changeOrigin: true,
            },
        },
    },
    plugins: [
        tsconfigPaths(),
      react()
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
    },
    build: {
        minify: true,
    },
    optimizeDeps:{
        force: true
    }
    /*experimental: {
      renderBuiltUrl(filename: string) {
        return 'https://musicstats.ru/' + filename;
      }
    }*/
});
