import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {networkInterfaces} from 'os'

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
                target: `http://${network}:2050`,
                changeOrigin: true,
            },
        },
    },
    plugins: [react()],
    build: {
        minify: true
    },
    /*experimental: {
      renderBuiltUrl(filename: string) {
        return 'https://musicstats.ru/' + filename;
      }
    }*/
});
