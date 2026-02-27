"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Extension } from "@/db/schema";
import { useLocale } from "@/lib/locale-context";
import { ExtensionCard } from "./ExtensionCard";

type SortKey = "installs" | "stars" | "updated";

interface StoreGridProps {
  extensions: Extension[];
}

export function StoreGrid({ extensions }: StoreGridProps) {
  const { t } = useLocale();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("installs");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const list = q
      ? extensions.filter(
          (ext) =>
            ext.title.toLowerCase().includes(q) ||
            ext.name.toLowerCase().includes(q) ||
            ext.description.toLowerCase().includes(q) ||
            ext.author.toLowerCase().includes(q) ||
            ext.repoFullName.toLowerCase().includes(q),
        )
      : [...extensions];

    list.sort((a, b) => {
      if (sortKey === "installs") return b.installCount - a.installCount;
      if (sortKey === "stars") return b.stars - a.stars;
      // updated: compare timestamps
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return list;
  }, [extensions, search, sortKey]);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "installs", label: t("store.sort.installs") },
    { key: "stars", label: t("store.sort.stars") },
    { key: "updated", label: t("store.sort.updated") },
  ];

  return (
    <div>
      {/* Search + Sort toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("store.search")}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400 dark:focus:border-primary-500/50 transition-all text-sm"
          />
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/60 rounded-xl p-1 border border-gray-200/60 dark:border-white/8">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSortKey(opt.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                sortKey === opt.key
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count badge */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
        {filtered.length} {filtered.length === 1 ? "extension" : "extensions"}
      </p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-white/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-300 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {search ? t("store.noResults") : t("store.empty")}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs">
              {search ? t("store.noResultsDesc") : t("store.emptyDesc")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((ext, i) => (
              <ExtensionCard key={ext.id} extension={ext} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
