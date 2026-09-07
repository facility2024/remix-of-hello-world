import { createFileRoute } from "@tanstack/react-router";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
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

interface CampaignStats {
  campaignId: string;
  subject: string;
  sentAt: string;
  total: number;
  opened: number;
  pending: number;
}

export const Route = createFileRoute("/api/track-stats")({
  server: {
    handlers: {
      GET: async () => {
        const tracks = readTracks();

        const campaignMap = new Map<
          string,
          { subject: string; sentAt: string; total: number; opened: number }
        >();

        for (const t of tracks) {
          const existing = campaignMap.get(t.campaignId);
          if (existing) {
            existing.total++;
            if (t.opened) existing.opened++;
          } else {
            campaignMap.set(t.campaignId, {
              subject: t.subject,
              sentAt: t.sentAt,
              total: 1,
              opened: t.opened ? 1 : 0,
            });
          }
        }

        const stats: CampaignStats[] = Array.from(campaignMap.entries()).map(
          ([campaignId, data]) => ({
            campaignId,
            subject: data.subject,
            sentAt: data.sentAt,
            total: data.total,
            opened: data.opened,
            pending: data.total - data.opened,
          }),
        );

        stats.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());

        return new Response(JSON.stringify(stats), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
