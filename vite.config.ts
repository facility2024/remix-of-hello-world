import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    client: { entry: "./src/client.tsx" },
  },
  nitro: {
    preset: "node-server",
  },
  vite: {
    build: {
      manifest: true,
    },
  },
});
