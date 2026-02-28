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
  const [sortKey, setSortKey] = useState<SortKey>("stars");

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
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return list;
  }, [extensions, search, sortKey]);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "stars", label: t("store.sort.stars") },
    { key: "installs", label: t("store.sort.installs") },
    { key: "updated", label: t("store.sort.updated") },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("store.search")}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-600 transition-all text-sm shadow-sm"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
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
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-[#111111] rounded-xl p-1 border border-gray-200 dark:border-white/10 shadow-sm">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSortKey(opt.key)}
              className={`relative px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                sortKey === opt.key
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {sortKey === opt.key && (
                <motion.span
                  layoutId="sort-pill"
                  className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-sm border border-gray-100 dark:border-white/5"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500 mb-6">
        {t(
          filtered.length === 1 ? "store.count.one" : "store.count.other",
        ).replace("{count}", String(filtered.length))}
      </p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            {/* Minimal empty state */}
            <div className="w-16 h-16 mb-6 rounded-2xl bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-white/5 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-300 dark:text-gray-600"
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
            <p className="text-[15px] text-gray-900 dark:text-white font-medium">
              {search ? t("store.noResults") : t("store.empty")}
            </p>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1 max-w-xs leading-relaxed">
              {search ? t("store.noResultsDesc") : t("store.emptyDesc")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
