import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    client: { entry: "./src/client.tsx" },
    spa: { enabled: true },
  },
  vite: {
    build: {
      manifest: true,
    },
  },
});
