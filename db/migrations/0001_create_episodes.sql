CREATE TABLE IF NOT EXISTS episodes (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  video_number    INTEGER,
  show_name       TEXT NOT NULL,
  season          INTEGER NOT NULL DEFAULT 1,
  episode_number  INTEGER,
  guest           TEXT NOT NULL,
  youtube_title   TEXT NOT NULL DEFAULT '',
  description     TEXT NOT NULL DEFAULT '',
  main_tags       TEXT NOT NULL DEFAULT '',
  tags            TEXT NOT NULL DEFAULT '',
  resources       TEXT NOT NULL DEFAULT '',
  status          TEXT NOT NULL DEFAULT 'Recorded',
  photo           TEXT NOT NULL DEFAULT '',
  youtube_url     TEXT,
  substack        TEXT,
  guest_bio       TEXT,
  key_insights    JSONB,
  faq             JSONB,
  transcript_file TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS episodes_slug_idx   ON episodes (slug);
CREATE INDEX IF NOT EXISTS episodes_show_idx   ON episodes (show_name);
CREATE INDEX IF NOT EXISTS episodes_status_idx ON episodes (status);
