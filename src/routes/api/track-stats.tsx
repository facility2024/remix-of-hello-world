import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseServer } from "@/lib/supabase";

export const Route = createFileRoute("/api/track-stats")({
  server: {
    handlers: {
      GET: async () => {
        const supabase = getSupabaseServer();

        const { data, error } = await supabase
          .from("email_campaigns")
          .select("id, subject, sent_at, total, opened")
          .order("sent_at", { ascending: false });

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const stats = (data || []).map((c) => ({
          campaignId: c.id,
          subject: c.subject,
          sentAt: c.sent_at,
          total: c.total,
          opened: c.opened,
          pending: c.total - c.opened,
        }));

        return new Response(JSON.stringify(stats), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
