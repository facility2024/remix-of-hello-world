import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    client: { entry: "./client.tsx" },
  },
  vite: {
    build: {
      manifest: true,
    },
  },
});
