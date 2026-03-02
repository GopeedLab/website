import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Extensions table - stores parsed gopeed extension metadata
 * One row per extension (a single git repo can have multiple extensions via subdirectory)
 */
export const extensions = sqliteTable("extensions", {
  // Unique identifier: "<author>@<name>" from manifest.json
  // e.g. "monkeyWie@gopeed-extension-bilibili"
  // Falls back to repo owner if manifest author is absent.
  id: text("id").primaryKey(),

  // Git repo info
  repoFullName: text("repo_full_name").notNull(), // e.g. "monkeyWie/gopeed-extension-bilibili"
  repoUrl: text("repo_url").notNull(), // e.g. "https://github.com/monkeyWie/gopeed-extension-bilibili"
  directory: text("directory"), // subdirectory within the repo (null if root)

  // Commit-based cache key
  commitSha: text("commit_sha"), // last commit SHA used when fetching, for cache busting

  // Extension manifest fields (from manifest.json)
  name: text("name").notNull(),
  author: text("author").notNull().default(""),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  icon: text("icon"), // resolved absolute URL to icon image
  version: text("version").notNull().default("0.0.0"),
  homepage: text("homepage"),

  // Stats
  installCount: integer("install_count").notNull().default(0),

  // GitHub metadata
  stars: integer("stars").notNull().default(0),
  topics: text("topics").notNull().default("[]"), // JSON array of strings

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Extension = typeof extensions.$inferSelect;
export type NewExtension = typeof extensions.$inferInsert;
