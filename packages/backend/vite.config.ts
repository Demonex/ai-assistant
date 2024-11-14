import {defineConfig} from 'vite';
import {VitePluginNode} from 'vite-plugin-node';
import dirname from 'es-dirname';
import path from 'path';

const __dirname = dirname();

export default defineConfig({
  clearScreen: false,
  server: {
    port: 2050,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/index.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc',
      initAppOnBoot: true
    })
  ],
  resolve: {
    alias: [
      {
        find: /@stigma-io\/payload\/dist/,
        replacement: `${process.cwd()}/node_modules/@stigma-io/payload/src`,
      },
      {
        find: '~',
        replacement: path.resolve(__dirname, 'src'),
      },
    ]
  },
  optimizeDeps: {
    force: true,
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
      'mock-aws-s3',
      'nock',
      'fsevents',
      '@lexical/react'
    ],
    include: []
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: ['src/index.ts'],
      formats: ['es']
    }
  }
});
