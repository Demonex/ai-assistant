// vite.config.ts
import { defineConfig } from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/sigma-chat/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.7_lightningcss@1.28.2_sass-embedded@1.83.0_sass@1.83.4_terser@5.37.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/sigma-chat/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_@swc+helpers@0.5.15_vite@5.4.11_@types+node@22.10.7_lightningc_svigwkxulnasxr26aok2kfy6tm/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/sigma-chat/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_typescript@5.7.3_vite@5.4.11_@types+node@22.10.7_lightningcss@1.28._rwkdvn7abfnlgpf3iqluuwgusq/node_modules/vite-tsconfig-paths/dist/index.js";
import { networkInterfaces } from "os";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\mkuznetsov\\Desktop\\Sigma\\sigma-chat\\sigma-chat\\apps\\web";
var interfaces = Object.values(
  Object.fromEntries(
    Object.entries(networkInterfaces()).filter(([key]) => key.startsWith("en"))
  )
);
var network = interfaces.reduce((prev, next) => {
  return prev ?? next.find(({ family }) => family === "IPv4")?.address;
}, void 0);
var vite_config_default = defineConfig({
  server: {
    port: 2051,
    proxy: {
      "/api": {
        // target: `http://localhost:2050/`,
        target: "http://10.199.35.49:2050",
        // target: `https://backend.rifify.me`,
        changeOrigin: true
      }
    }
  },
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
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
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxta3V6bmV0c292XFxcXERlc2t0b3BcXFxcU2lnbWFcXFxcc2lnbWEtY2hhdFxcXFxzaWdtYS1jaGF0XFxcXGFwcHNcXFxcd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxta3V6bmV0c292XFxcXERlc2t0b3BcXFxcU2lnbWFcXFxcc2lnbWEtY2hhdFxcXFxzaWdtYS1jaGF0XFxcXGFwcHNcXFxcd2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ta3V6bmV0c292L0Rlc2t0b3AvU2lnbWEvc2lnbWEtY2hhdC9zaWdtYS1jaGF0L2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHsgbmV0d29ya0ludGVyZmFjZXMgfSBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmNvbnN0IGludGVyZmFjZXMgPSBPYmplY3QudmFsdWVzKFxyXG4gIE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgIE9iamVjdC5lbnRyaWVzKG5ldHdvcmtJbnRlcmZhY2VzKCkpLmZpbHRlcigoW2tleV0pID0+IGtleS5zdGFydHNXaXRoKFwiZW5cIikpXHJcbiAgKVxyXG4pO1xyXG5cclxuY29uc3QgbmV0d29yayA9IGludGVyZmFjZXMucmVkdWNlKChwcmV2LCBuZXh0KSA9PiB7XHJcbiAgcmV0dXJuIHByZXYgPz8gbmV4dC5maW5kKCh7IGZhbWlseSB9KSA9PiBmYW1pbHkgPT09IFwiSVB2NFwiKT8uYWRkcmVzcztcclxufSwgdW5kZWZpbmVkKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAyMDUxLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICAvLyB0YXJnZXQ6IGBodHRwOi8vbG9jYWxob3N0OjIwNTAvYCxcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzEwLjE5OS4zNS40OToyMDUwXCIsXHJcbiAgICAgICAgLy8gdGFyZ2V0OiBgaHR0cHM6Ly9iYWNrZW5kLnJpZmlmeS5tZWAsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFt0c2NvbmZpZ1BhdGhzKCksIHJlYWN0KCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbWluaWZ5OiB0cnVlLFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBmb3JjZTogdHJ1ZSxcclxuICB9LFxyXG4gIC8qZXhwZXJpbWVudGFsOiB7XHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBwb3J0OiAyMDUxLFxyXG4gICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBgaHR0cDovLzEwLjE5OS4zNS40OToyMDUwYCxcclxuICAgICAgICAgICAgICAgIC8vIHRhcmdldDogYGh0dHBzOi8vYmFja2VuZC5yaWZpZnkubWVgLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICAgICAgcmVhY3QoKVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczp7XHJcbiAgICAgICAgZm9yY2U6IHRydWVcclxuICAgIH1cclxuICAgIC8qZXhwZXJpbWVudGFsOiB7XHJcbiAgICAgIHJlbmRlckJ1aWx0VXJsKGZpbGVuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gJ2h0dHBzOi8vbXVzaWNzdGF0cy5ydS8nICsgZmlsZW5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0qL1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLG9CQUFvQjtBQUNqYSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyx5QkFBeUI7QUFDbEMsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0sYUFBYSxPQUFPO0FBQUEsRUFDeEIsT0FBTztBQUFBLElBQ0wsT0FBTyxRQUFRLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLElBQUksV0FBVyxJQUFJLENBQUM7QUFBQSxFQUM1RTtBQUNGO0FBRUEsSUFBTSxVQUFVLFdBQVcsT0FBTyxDQUFDLE1BQU0sU0FBUztBQUNoRCxTQUFPLFFBQVEsS0FBSyxLQUFLLENBQUMsRUFBRSxPQUFPLE1BQU0sV0FBVyxNQUFNLEdBQUc7QUFDL0QsR0FBRyxNQUFTO0FBR1osSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBO0FBQUEsUUFFTixRQUFRO0FBQUE7QUFBQSxRQUVSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztBQUFBLEVBQ2xDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixPQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0NGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
