"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getVisibleFaqEntries } from "@/lib/keyword-pages";

interface SeoFaqProps {
  locale: Locale;
}

const sectionTitle: Record<Locale, string> = {
  en: "Download Manager FAQ",
  zh: "下载器常见问题",
  "zh-TW": "下載器常見問題",
  ja: "ダウンロードマネージャー FAQ",
  ko: "다운로드 매니저 FAQ",
  es: "Preguntas frecuentes sobre el gestor de descargas",
  pt: "Perguntas frequentes sobre o gerenciador de downloads",
  fr: "FAQ du gestionnaire de téléchargement",
  de: "Download-Manager FAQ",
  ru: "Часто задаваемые вопросы о менеджере загрузок",
};

export function SeoFaq({ locale }: SeoFaqProps) {
  const entries = getVisibleFaqEntries(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      aria-label={sectionTitle[locale]}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl section-heading mb-10">
            {sectionTitle[locale]}
          </h2>

          <div className="space-y-3">
            {entries.map((entry, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={entry.question}
                  className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/90 dark:bg-gray-900/80 overflow-hidden"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {entry.question}
                    </h3>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-200 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-7">
                        {entry.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
