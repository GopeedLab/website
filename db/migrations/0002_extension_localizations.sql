ALTER TABLE extensions ADD COLUMN content_hash text;
CREATE TABLE extension_localizations (
  extension_id text NOT NULL REFERENCES extensions(id) ON DELETE CASCADE,
  locale text NOT NULL CHECK (locale IN ('en', 'zh', 'zh-TW', 'ru')),
  title text NOT NULL,
  description text NOT NULL,
  readme text,
  source_hash text NOT NULL,
  updated_at integer NOT NULL,
  PRIMARY KEY (extension_id, locale)
);
