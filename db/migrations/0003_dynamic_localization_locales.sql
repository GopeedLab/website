CREATE TABLE extension_localizations_next (
  extension_id text NOT NULL REFERENCES extensions(id) ON DELETE CASCADE,
  locale text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  readme text,
  source_hash text NOT NULL,
  updated_at integer NOT NULL,
  PRIMARY KEY (extension_id, locale)
);
INSERT INTO extension_localizations_next
  SELECT extension_id, locale, title, description, readme, source_hash, updated_at
  FROM extension_localizations;
DROP TABLE extension_localizations;
ALTER TABLE extension_localizations_next RENAME TO extension_localizations;
