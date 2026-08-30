import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/health")({
  server: {
    handlers: {
      GET: async () => {
        return new Response("ok", {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      },
      HEAD: async () => {
        return new Response(null, {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
