import { createFileRoute } from "@tanstack/react-router";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../../../data");
const TRACK_FILE = resolve(DATA_DIR, "email-tracks.json");

interface TrackEntry {
  id: string;
  campaignId: string;
  email: string;
  subject: string;
  sentAt: string;
  openedAt: string | null;
  opened: boolean;
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readTracks(): TrackEntry[] {
  ensureDataDir();
  if (!existsSync(TRACK_FILE)) return [];
  try {
    return JSON.parse(readFileSync(TRACK_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeTracks(tracks: TrackEntry[]) {
  ensureDataDir();
  writeFileSync(TRACK_FILE, JSON.stringify(tracks, null, 2));
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

        const tracks = readTracks();
        const entry = tracks.find((t) => t.id === id);

        if (entry && !entry.opened) {
          entry.opened = true;
          entry.openedAt = new Date().toISOString();
          writeTracks(tracks);
          console.log(`[TRACK] Email aberto: ${entry.email} (${entry.campaignId})`);
        }

        // 1x1 transparent GIF pixel
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
          const { campaignId, email, subject, ids } = body as {
            campaignId: string;
            email?: string;
            subject?: string;
            ids?: string[];
          };

          if (ids && Array.isArray(ids)) {
            // Bulk register sent emails
            const tracks = readTracks();
            const now = new Date().toISOString();
            for (const id of ids) {
              tracks.push({
                id,
                campaignId,
                email: email || "",
                subject: subject || "",
                sentAt: now,
                openedAt: null,
                opened: false,
              });
            }
            writeTracks(tracks);
            return new Response(JSON.stringify({ registered: ids.length }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ error: "Missing ids array" }), {
            status: 400,
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
