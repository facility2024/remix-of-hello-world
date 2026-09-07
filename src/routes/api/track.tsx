import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

export const Route = createFileRoute("/api/track")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
          return new Response("Missing id", { status: 400 });
        }

        const supabase = getServerSupabase();

        const { data: entry } = await supabase
          .from("email_tracks")
          .select("id, opened")
          .eq("track_id", id)
          .single();

        if (entry && !entry.opened) {
          await supabase
            .from("email_tracks")
            .update({ opened: true, opened_at: new Date().toISOString() })
            .eq("track_id", id);

          // Update campaign opened count
          const { data: track } = await supabase
            .from("email_tracks")
            .select("campaign_id")
            .eq("track_id", id)
            .single();

          if (track) {
            const { count } = await supabase
              .from("email_tracks")
              .select("id", { count: "exact", head: true })
              .eq("campaign_id", track.campaign_id)
              .eq("opened", true);

            await supabase
              .from("email_campaigns")
              .update({ opened: count || 0 })
              .eq("id", track.campaign_id);
          }

          console.log(`[TRACK] Email aberto: track_id=${id}`);
        }

        const pixel = Buffer.from(
          "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          "base64",
        );

        return new Response(pixel, {
          status: 200,
          headers: {
            "Content-Type": "image/gif",
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
      },

      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json();
          const { campaignId, subject, ids } = body as {
            campaignId: string;
            subject?: string;
            ids?: string[];
          };

          if (!ids || !Array.isArray(ids)) {
            return new Response(JSON.stringify({ error: "Missing ids array" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const supabase = getServerSupabase();
          const now = new Date().toISOString();

          const rows = ids.map((trackId) => ({
            track_id: trackId,
            campaign_id: campaignId,
            email: "",
            subject: subject || "",
            sent_at: now,
            opened_at: null,
            opened: false,
          }));

          const { error } = await supabase.from("email_tracks").insert(rows);

          if (error) {
            console.error("[TRACK] Erro ao registrar:", error);
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ registered: ids.length }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
