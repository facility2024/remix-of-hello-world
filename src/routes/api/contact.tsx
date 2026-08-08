import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const data = await request.json();
        console.log("[API] Recebido:", data.nome, data.email);

        return new Response(JSON.stringify({ success: true, message: "Rota funcionando" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
