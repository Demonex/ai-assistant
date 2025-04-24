// vite.config.ts
import react from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/sigma-chat/node_modules/.pnpm/@vitejs+plugin-react-swc@3._55797fb8ba1d5c60fd54af914d5cee02/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/sigma-chat/node_modules/.pnpm/vite@5.4.14_@types+node@22.13.17_sass@1.86.0_terser@5.39.0/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/sigma-chat/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_t_929a75697d5a5de15b452f756b3447d8/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\mkuznetsov\\Desktop\\Sigma\\sigma-chat\\sigma-chat\\apps\\web";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: 2051,
      proxy: {
        "/api/v1": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true
        }
        // "/admin": {
        // 	target: "http://localhost:2055",
        // 	changeOrigin: true,
        // },
        // "/_next/webpack-hmr": {
        // 	target: "ws://localhost:2055/_next/webpack-hmr",
        // 	changeOrigin: true,
        // },
        // "/_next": {
        // 	target: "http://localhost:2055",
        // 	changeOrigin: true,
        // },
      }
    },
    plugins: [tsconfigPaths(), react()],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    build: {
      minify: true
    },
    optimizeDeps: {
      force: true
    }
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
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxta3V6bmV0c292XFxcXERlc2t0b3BcXFxcU2lnbWFcXFxcc2lnbWEtY2hhdFxcXFxzaWdtYS1jaGF0XFxcXGFwcHNcXFxcd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxta3V6bmV0c292XFxcXERlc2t0b3BcXFxcU2lnbWFcXFxcc2lnbWEtY2hhdFxcXFxzaWdtYS1jaGF0XFxcXGFwcHNcXFxcd2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ta3V6bmV0c292L0Rlc2t0b3AvU2lnbWEvc2lnbWEtY2hhdC9zaWdtYS1jaGF0L2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcblxuXHRyZXR1cm4ge1xuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogMjA1MSxcblx0XHRcdHByb3h5OiB7XG5cdFx0XHRcdFwiL2FwaS92MVwiOiB7XG5cdFx0XHRcdFx0dGFyZ2V0OiBlbnYuVklURV9CQUNLRU5EX1VSTCxcblx0XHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIFwiL2FkbWluXCI6IHtcblx0XHRcdFx0Ly8gXHR0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDoyMDU1XCIsXG5cdFx0XHRcdC8vIFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHQvLyB9LFxuXHRcdFx0XHQvLyBcIi9fbmV4dC93ZWJwYWNrLWhtclwiOiB7XG5cdFx0XHRcdC8vIFx0dGFyZ2V0OiBcIndzOi8vbG9jYWxob3N0OjIwNTUvX25leHQvd2VicGFjay1obXJcIixcblx0XHRcdFx0Ly8gXHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdC8vIH0sXG5cdFx0XHRcdC8vIFwiL19uZXh0XCI6IHtcblx0XHRcdFx0Ly8gXHR0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDoyMDU1XCIsXG5cdFx0XHRcdC8vIFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHQvLyB9LFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHBsdWdpbnM6IFt0c2NvbmZpZ1BhdGhzKCksIHJlYWN0KCldLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiB7XG5cdFx0XHRcdFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0YnVpbGQ6IHtcblx0XHRcdG1pbmlmeTogdHJ1ZSxcblx0XHR9LFxuXHRcdG9wdGltaXplRGVwczoge1xuXHRcdFx0Zm9yY2U6IHRydWUsXG5cdFx0fSxcblx0XHQvKmV4cGVyaW1lbnRhbDoge1xuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiAyMDUxLFxuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBgaHR0cDovLzEwLjE5OS4zNS40OToyMDUwYCxcbiAgICAgICAgICAgICAgICAvLyB0YXJnZXQ6IGBodHRwczovL2JhY2tlbmQucmlmaWZ5Lm1lYCxcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgICByZWFjdCgpXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczp7XG4gICAgICAgIGZvcmNlOiB0cnVlXG4gICAgfVxuICAgIC8qZXhwZXJpbWVudGFsOiB7XG4gICAgICByZW5kZXJCdWlsdFVybChmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAnaHR0cHM6Ly9tdXNpY3N0YXRzLnJ1LycgKyBmaWxlbmFtZTtcbiAgICAgIH1cbiAgICB9Ki9cblx0fTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxPQUFPLFdBQVc7QUFDdFosU0FBUyxlQUFlO0FBQ3hCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sbUJBQW1CO0FBSDFCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3pDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxTQUFPO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTixXQUFXO0FBQUEsVUFDVixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxRQUNmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFhRDtBQUFBLElBQ0Q7QUFBQSxJQUNBLFNBQVMsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQUEsSUFDbEMsU0FBUztBQUFBLE1BQ1IsT0FBTztBQUFBLFFBQ04sS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUM5QjtBQUFBLElBQ0Q7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNUO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDYixPQUFPO0FBQUEsSUFDUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFnQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
