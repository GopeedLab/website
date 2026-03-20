import type { Locale } from "@/lib/i18n";
import { getVisibleFaqEntries } from "@/lib/keyword-pages";

interface SeoFaqProps {
  locale: Locale;
}

const sectionTitle: Record<Locale, string> = {
  en: "Download Manager FAQ",
  zh: "下载器常见问题",
  "zh-TW": "下載器常見問題",
};

export function SeoFaq({ locale }: SeoFaqProps) {
  const entries = getVisibleFaqEntries(locale);

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

          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.question}
                className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/90 dark:bg-gray-900/80 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {entry.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-7">
                  {entry.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
