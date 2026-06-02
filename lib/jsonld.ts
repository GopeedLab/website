import type { Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import { BASE_URL, canonicalUrl } from "@/lib/seo";

/**
 * JSON-LD structured data generators for SEO.
 *
 * These produce Schema.org objects that Google, Bing and other search engines
 * use to display rich results (software info cards, breadcrumbs, sitelinks
 * search box, etc.).
 */

// ── SoftwareApplication ────────────────────────────────────────────────────
// Tells Google this site is about a downloadable software product.
export function softwareApplicationJsonLd(locale: Locale, version?: string) {
  const t = (key: string) => getTranslation(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gopeed",
    alternateName: "Gopeed Download Manager",
    description: t("site.description"),
    url: canonicalUrl(locale, "/"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS",
    ...(version ? { softwareVersion: version } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    downloadUrl: `${BASE_URL}/#downloads`,
    screenshot: `${BASE_URL}/images/screenshot.png`,
    image: `${BASE_URL}/images/logo.png`,
    author: {
      "@type": "Organization",
      name: "Gopeed",
      url: BASE_URL,
    },
    license: "https://opensource.org/licenses/GPL-3.0",
    featureList: [
      "Multi-threaded download engine",
      "HTTP/HTTPS protocol support",
      "BitTorrent protocol support",
      "Magnet link support",
      "ed2k link support",
      "Cross-platform (Windows, macOS, Linux, Android, iOS, Web)",
      "JavaScript extension system",
      "RESTful API",
      "Browser extension (Chrome, Edge, Firefox)",
      "Open source",
    ],
  };
}

// ── WebSite (enables Sitelinks Search Box in Google) ───────────────────────
export function webSiteJsonLd(locale: Locale) {
  const t = (key: string) => getTranslation(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("site.name"),
    alternateName: "Gopeed Download Manager",
    url: canonicalUrl(locale, "/"),
    description: t("site.description"),
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "Gopeed",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
  };
}

// ── Organization ──────────────────────────────────────────────────────────
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gopeed",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    sameAs: ["https://github.com/GoproxySS/gopeed"],
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────
// Generates breadcrumb structured data for any page path.
export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(locale, item.path),
    })),
  };
}

// ── FAQPage (for features section – helps win "People also ask" snippets) ─
type FaqEntry = { question: string; answer: string };

const faqEntries: Record<Locale, FaqEntry[]> = {
  en: [
    {
      question: "What protocols are supported?",
      answer:
        "Gopeed supports HTTP, HTTPS, BitTorrent, magnet links and ed2k links in the same download client.",
    },
    {
      question: "Does it support intercepting browser downloads?",
      answer:
        "Yes. Install the Gopeed browser extension and it will automatically capture download links from your browser.",
    },
    {
      question: "Why is my torrent or magnet link downloading slowly?",
      answer:
        "BT download speed depends on the number of seeders, tracker status and your network environment. Try adding more trackers, checking your firewall and port forwarding settings, and making sure DHT is enabled.",
    },
    {
      question: "Does it support proxy settings?",
      answer:
        "Yes. You can configure HTTP, SOCKS5 proxies or use system proxy in Gopeed's settings. This is useful when direct connections are limited or when you need to route downloads through a specific network.",
    },
    {
      question: "Is it free? Are there any paid features?",
      answer:
        "Gopeed is completely free and open source. All core download features are available at no cost, with no ads and no hidden paywalls.",
    },
    {
      question: "Can I manage downloads remotely?",
      answer:
        "Yes. Gopeed provides a RESTful API and a web interface. You can manage download tasks remotely through the API or access the web UI from another device on the same network.",
    },
  ],
  zh: [
    {
      question: "支持哪些下载协议？",
      answer:
        "Gopeed 在同一个客户端中同时支持 HTTP、HTTPS、BitTorrent、磁力链接和 ed2k 链接。",
    },
    {
      question: "是否支持接管浏览器下载？",
      answer: "支持。安装 Gopeed 浏览器扩展后即可自动捕获浏览器中的下载链接。",
    },
    {
      question: "磁力链接 / BT 任务下载很慢怎么办？",
      answer:
        "BT 下载速度取决于做种者数量、Tracker 状态和你的网络环境。可以尝试添加更多 Tracker、检查防火墙和端口转发设置、确保 DHT 已开启。",
    },
    {
      question: "支持设置代理吗？",
      answer:
        "支持。在 Gopeed 的设置中可以配置 HTTP、SOCKS5 代理或使用系统代理。适用于直连受限或需要通过特定网络下载的场景。",
    },
    {
      question: "是免费的吗？有付费功能吗？",
      answer:
        "Gopeed 完全免费开源，所有核心下载功能均可免费使用，没有广告，也没有隐藏的付费限制。",
    },
    {
      question: "可以远程管理下载任务吗？",
      answer:
        "可以。Gopeed 提供 RESTful API 和 Web 界面，你可以通过 API 远程管理下载任务，或在同一网络下的其他设备上访问 Web UI。",
    },
  ],
  "zh-TW": [
    {
      question: "支援哪些下載協定？",
      answer:
        "Gopeed 在同一個客戶端中同時支援 HTTP、HTTPS、BitTorrent、磁力連結和 ed2k 連結。",
    },
    {
      question: "是否支援接管瀏覽器下載？",
      answer:
        "支援。安裝 Gopeed 瀏覽器擴充功能後即可自動擷取瀏覽器中的下載連結。",
    },
    {
      question: "磁力連結 / BT 任務下載很慢怎麼辦？",
      answer:
        "BT 下載速度取決於做種者數量、Tracker 狀態和你的網路環境。可以嘗試新增更多 Tracker、檢查防火牆和連接埠轉發設定、確保 DHT 已開啟。",
    },
    {
      question: "支援設定代理嗎？",
      answer:
        "支援。在 Gopeed 的設定中可以設定 HTTP、SOCKS5 代理或使用系統代理。適用於直連受限或需要透過特定網路下載的場景。",
    },
    {
      question: "是免費的嗎？有付費功能嗎？",
      answer:
        "Gopeed 完全免費開源，所有核心下載功能均可免費使用，沒有廣告，也沒有隱藏的付費限制。",
    },
    {
      question: "可以遠端管理下載任務嗎？",
      answer:
        "可以。Gopeed 提供 RESTful API 和 Web 介面，你可以透過 API 遠端管理下載任務，或在同一網路下的其他裝置上存取 Web UI。",
    },
  ],
  ru: [
    {
      question: "Какие протоколы поддерживаются?",
      answer:
        "Gopeed поддерживает HTTP, HTTPS, BitTorrent, magnet-ссылки и ed2k-ссылки.",
    },
    {
      question: "Можно ли перехватывать загрузки из браузера?",
      answer:
        "Да. Установите расширение Gopeed для браузера, и оно будет автоматически перехватывать ссылки для загрузки.",
    },
    {
      question: "Почему торрент или magnet-ссылка скачивается медленно?",
      answer:
        "Скорость BT-загрузки зависит от количества сидеров, состояния трекеров и вашей сетевой среды. Попробуйте добавить больше трекеров, проверить настройки брандмауэра и проброса портов, а также убедиться, что DHT включён.",
    },
    {
      question: "Поддерживаются ли настройки прокси?",
      answer:
        "Да. В настройках Gopeed можно настроить HTTP-, SOCKS5-прокси или использовать системный прокси. Это полезно, когда прямые подключения ограничены или нужно направлять загрузки через определённую сеть.",
    },
    {
      question: "Это бесплатно? Есть платные функции?",
      answer:
        "Gopeed полностью бесплатен и имеет открытый исходный код. Все основные функции загрузки доступны бесплатно, без рекламы и скрытых ограничений.",
    },
    {
      question: "Можно ли управлять загрузками удалённо?",
      answer:
        "Да. Gopeed предоставляет RESTful API и веб-интерфейс. Вы можете удалённо управлять задачами загрузки через API или получить доступ к веб-интерфейсу с другого устройства в той же сети.",
    },
  ],
};

export function faqJsonLd(locale: Locale) {
  const entries = faqEntries[locale];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function getFaqEntries(locale: Locale): FaqEntry[] {
  return faqEntries[locale];
}

/**
 * Helper: renders one or more JSON-LD objects into a string
 * suitable for dangerouslySetInnerHTML.
 */
export function jsonLdScriptContent(
  ...objects: Record<string, unknown>[]
): string {
  if (objects.length === 1) {
    return JSON.stringify(objects[0]);
  }
  return JSON.stringify(objects);
}
