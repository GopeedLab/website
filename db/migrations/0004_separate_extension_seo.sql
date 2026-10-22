-- Preserve existing SEO copy and README; fill manifest translations separately.
ALTER TABLE extension_localizations RENAME COLUMN title TO seo_title;
ALTER TABLE extension_localizations RENAME COLUMN description TO seo_description;
ALTER TABLE extension_localizations ADD COLUMN title text;
ALTER TABLE extension_localizations ADD COLUMN description text;
