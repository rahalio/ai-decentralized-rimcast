import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: false,
  outDir: 'dist',
  external: [
    '@rimcast/core',
    '@rimcast/services',
    '@rimcast/adapters',
    'fastify',
    '@fastify/cors',
    '@fastify/helmet',
    '@fastify/jwt',
    'dotenv',
    'jsonwebtoken',
    'zod',
    '@zodios/core',
    /^@aws-sdk\//,
  ],
});
