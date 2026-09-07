-- ============================================
-- Facility Email Marketing — Supabase Schema
-- Rode no: Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Tabela de campanhas
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  total INTEGER NOT NULL DEFAULT 0,
  opened INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES auth.users(id)
);

-- 2. Tabela de envios individuais (tracking pixel)
CREATE TABLE IF NOT EXISTS email_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id TEXT UNIQUE NOT NULL,
  campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  opened_at TIMESTAMPTZ,
  opened BOOLEAN NOT NULL DEFAULT false
);

-- 3. Index para buscas rapidas
CREATE INDEX IF NOT EXISTS idx_email_tracks_campaign ON email_tracks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_tracks_track_id ON email_tracks(track_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_user ON email_campaigns(user_id);

-- 4. RLS (Row Level Security) — desabilitado para server-side access
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_tracks ENABLE ROW LEVEL SECURITY;

-- Permite acesso total via service role (server-side)
CREATE POLICY "Service role full access" ON email_campaigns
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON email_tracks
  FOR ALL USING (true) WITH CHECK (true);

-- Permite leitura para usuarios autenticados
CREATE POLICY "Authenticated read" ON email_campaigns
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read" ON email_tracks
  FOR SELECT USING (auth.role() = 'authenticated');

-- 5. View para estatisticas por campanha
CREATE OR REPLACE VIEW campaign_stats AS
SELECT
  c.id AS campaign_id,
  c.subject,
  c.sent_at,
  c.total,
  COUNT(t.id) FILTER (WHERE t.opened = true) AS opened,
  c.total - COUNT(t.id) FILTER (WHERE t.opened = true) AS pending
FROM email_campaigns c
LEFT JOIN email_tracks t ON t.campaign_id = c.id
GROUP BY c.id, c.subject, c.sent_at, c.total
ORDER BY c.sent_at DESC;

-- ============================================
-- Apos rodar este SQL, crie o usuario:
-- Dashboard > Authentication > Users > Add User
-- Email: otavio01@gmail.com
-- Senha: 123
-- Confirmar email: desmarcar opcao (para teste)
-- ============================================
