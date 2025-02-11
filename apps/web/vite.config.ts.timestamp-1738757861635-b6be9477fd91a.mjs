// vite.config.ts
import { defineConfig } from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.7_lightningcss@1.28.2_sass-embedded@1.83.0_sass@1.83.4_terser@5.37.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_@swc+helpers@0.5.15_vite@5.4.11_@types+node@22.10.7_lightningc_svigwkxulnasxr26aok2kfy6tm/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///C:/Users/mkuznetsov/Desktop/Sigma/sigma-chat/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_typescript@5.7.3_vite@5.4.11_@types+node@22.10.7_lightningcss@1.28._rwkdvn7abfnlgpf3iqluuwgusq/node_modules/vite-tsconfig-paths/dist/index.js";
import { networkInterfaces } from "os";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\mkuznetsov\\Desktop\\Sigma\\sigma-chat\\apps\\web";
var interfaces = Object.values(Object.fromEntries(Object.entries(networkInterfaces()).filter(([key]) => key.startsWith("en"))));
var network = interfaces.reduce((prev, next) => {
  return prev ?? next.find(({ family }) => family === "IPv4")?.address;
}, void 0);
var vite_config_default = defineConfig({
  server: {
    port: 2051,
    proxy: {
      "/api": {
        target: `http://localhost:2050`,
        // target: `https://backend.rifify.me`,
        changeOrigin: true
      }
    }
  },
  plugins: [
    tsconfigPaths(),
    react()
  ],
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
    renderBuiltUrl(filename: string) {
      return 'https://musicstats.ru/' + filename;
    }
  }*/
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxta3V6bmV0c292XFxcXERlc2t0b3BcXFxcU2lnbWFcXFxcc2lnbWEtY2hhdFxcXFxhcHBzXFxcXHdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWt1em5ldHNvdlxcXFxEZXNrdG9wXFxcXFNpZ21hXFxcXHNpZ21hLWNoYXRcXFxcYXBwc1xcXFx3ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21rdXpuZXRzb3YvRGVza3RvcC9TaWdtYS9zaWdtYS1jaGF0L2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcbmltcG9ydCB7bmV0d29ya0ludGVyZmFjZXN9IGZyb20gJ29zJ1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuY29uc3QgaW50ZXJmYWNlcyA9IE9iamVjdC52YWx1ZXMoT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKG5ldHdvcmtJbnRlcmZhY2VzKCkpLmZpbHRlcigoW2tleV0pID0+IGtleS5zdGFydHNXaXRoKCdlbicpKSkpO1xyXG5cclxuY29uc3QgbmV0d29yayA9IGludGVyZmFjZXMucmVkdWNlKChwcmV2LCBuZXh0KSA9PiB7XHJcbiAgICByZXR1cm4gcHJldiA/PyBuZXh0LmZpbmQoKHtmYW1pbHl9KSA9PiBmYW1pbHkgPT09ICdJUHY0Jyk/LmFkZHJlc3NcclxufSwgdW5kZWZpbmVkKVxyXG5cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBwb3J0OiAyMDUxLFxyXG4gICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBgaHR0cDovL2xvY2FsaG9zdDoyMDUwYCxcclxuICAgICAgICAgICAgICAgIC8vIHRhcmdldDogYGh0dHBzOi8vYmFja2VuZC5yaWZpZnkubWVgLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICAgICAgcmVhY3QoKVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczp7XHJcbiAgICAgICAgZm9yY2U6IHRydWVcclxuICAgIH1cclxuICAgIC8qZXhwZXJpbWVudGFsOiB7XHJcbiAgICAgIHJlbmRlckJ1aWx0VXJsKGZpbGVuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gJ2h0dHBzOi8vbXVzaWNzdGF0cy5ydS8nICsgZmlsZW5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0qL1xyXG5cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVcsU0FBUSxvQkFBbUI7QUFDNVgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVEseUJBQXdCO0FBQ2hDLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxJQUFNLGFBQWEsT0FBTyxPQUFPLE9BQU8sWUFBWSxPQUFPLFFBQVEsa0JBQWtCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUM7QUFFaEksSUFBTSxVQUFVLFdBQVcsT0FBTyxDQUFDLE1BQU0sU0FBUztBQUM5QyxTQUFPLFFBQVEsS0FBSyxLQUFLLENBQUMsRUFBQyxPQUFNLE1BQU0sV0FBVyxNQUFNLEdBQUc7QUFDL0QsR0FBRyxNQUFTO0FBSVosSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0gsUUFBUTtBQUFBLFFBQ0osUUFBUTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUEsTUFDbEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2hCLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsRUFDWjtBQUFBLEVBQ0EsY0FBYTtBQUFBLElBQ1QsT0FBTztBQUFBLEVBQ1g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
