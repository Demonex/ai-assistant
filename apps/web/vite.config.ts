import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import {networkInterfaces} from 'os'
import path from "path";

const interfaces = Object.values(Object.fromEntries(Object.entries(networkInterfaces()).filter(([key]) => key.startsWith('en'))));

const network = interfaces.reduce((prev, next) => {
    return prev ?? next.find(({family}) => family === 'IPv4')?.address
}, undefined)


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 2051,
        proxy: {
            '/api': {
                target: `http://localhost:2050`,
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
    /*experimental: {
      renderBuiltUrl(filename: string) {
        return 'https://musicstats.ru/' + filename;
      }
    }*/

});
