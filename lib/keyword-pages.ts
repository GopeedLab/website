import { defaultLocale, type Locale } from "@/lib/i18n";

export const keywordPageSlugs = [
  "download-manager",
  "torrent-downloader",
  "magnet-link-downloader",
  "ed2k-downloader",
] as const;

export type KeywordPageSlug = (typeof keywordPageSlugs)[number];

export type KeywordPageContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  title: string;
  description: string;
  intro: string[];
  benefitsTitle: string;
  benefits: string[];
  stepsTitle: string;
  steps: string[];
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

type VisibleFaqEntry = {
  question: string;
  answer: string;
};

const keywordPageContent: Record<
  Locale,
  Record<KeywordPageSlug, KeywordPageContent>
> = {
  en: {
    "download-manager": {
      metaTitle:
        "Free Download Manager for Windows, macOS, Linux, Android and iOS | Gopeed",
      metaDescription:
        "Gopeed is a free open-source download manager with multi-threaded acceleration, torrent, magnet and ed2k support, and desktop plus mobile clients.",
      keywords: [
        "download manager",
        "free download manager",
        "open source download manager",
        "multi-threaded downloader",
        "cross-platform downloader",
      ],
      eyebrow: "Download Manager",
      title: "Free Download Manager for Windows, macOS, Linux, Android and iOS",
      description:
        "Gopeed is an open-source download manager built for people who need one tool for normal files, torrent tasks, magnet links and ed2k resources.",
      intro: [
        "If someone searches for a free download manager, the real intent is usually simple: faster downloads, resume support, fewer limitations and support for more than just direct HTTP files. That is exactly the category Gopeed belongs to.",
        "Gopeed combines a multi-threaded download engine with BitTorrent, magnet and ed2k support, so the same app can handle software packages, large archives, torrent metadata and legacy link formats without switching tools.",
      ],
      benefitsTitle: "Why this download manager is easier to rank for",
      benefits: [
        "Free and open source with no paywall for core download features",
        "Supports HTTP, HTTPS, torrent, magnet and ed2k in one client",
        "Works across Windows, macOS, Linux, Android, iOS, Web and Docker",
        "Includes browser extensions, API support and resumable downloads",
      ],
      stepsTitle: "How people typically use Gopeed",
      steps: [
        "Install the desktop or mobile client for your platform.",
        "Paste a file URL, torrent file, magnet link or ed2k link into Gopeed.",
        "Start the task, monitor progress and resume interrupted downloads later.",
      ],
      ctaTitle: "Download Gopeed",
      ctaDescription:
        "Choose your platform or open the installation guide to get started quickly.",
      primaryCtaLabel: "Download Now",
      secondaryCtaLabel: "Installation Guide",
    },
    "torrent-downloader": {
      metaTitle:
        "Torrent Downloader / BT Downloader with Magnet Support | Gopeed",
      metaDescription:
        "Gopeed is a free open-source torrent downloader with BitTorrent, magnet, DHT and cross-platform support for Windows, macOS, Linux, Android and iOS.",
      keywords: [
        "torrent downloader",
        "bt downloader",
        "bittorrent downloader",
        "torrent client",
        "magnet downloader",
      ],
      eyebrow: "Torrent Downloader",
      title: "Torrent / BT Downloader with Magnet Support",
      description:
        "Gopeed can be used as a BitTorrent downloader for both `.torrent` files and magnet links, while still keeping direct download support in the same application.",
      intro: [
        "Searches for BT downloader or torrent downloader are usually looking for a lightweight client that can open torrent files fast, pull metadata from magnet links and keep long-running tasks stable. Gopeed is designed for exactly that workflow.",
        "Because the app also supports HTTP and ed2k, users do not need one torrent client and another file downloader. One tool can handle both direct file delivery and peer-to-peer download tasks.",
      ],
      benefitsTitle: "What this torrent page highlights",
      benefits: [
        "BitTorrent protocol support with magnet link handling",
        "Useful for software images, large archives and multi-file tasks",
        "Cross-platform client instead of a desktop-only torrent workflow",
        "Open-source stack with browser extension and API support",
      ],
      stepsTitle: "Typical torrent workflow",
      steps: [
        "Open a local `.torrent` file or paste a magnet URI.",
        "Let Gopeed resolve metadata and choose the files you want.",
        "Download, pause, resume and manage tasks from the same interface.",
      ],
      ctaTitle: "Start downloading torrents with Gopeed",
      ctaDescription:
        "Install the client or visit the docs to see platform-specific instructions.",
      primaryCtaLabel: "Download Gopeed",
      secondaryCtaLabel: "View Docs",
    },
    "magnet-link-downloader": {
      metaTitle: "Magnet Link Downloader for Torrent Tasks | Gopeed",
      metaDescription:
        "Download magnet links with Gopeed, a free open-source downloader that supports BitTorrent metadata, resume support and cross-platform clients.",
      keywords: [
        "magnet link downloader",
        "magnet downloader",
        "magnet uri downloader",
        "torrent magnet downloader",
      ],
      eyebrow: "Magnet Downloader",
      title: "Magnet Link Downloader for Fast Cross-Platform Downloads",
      description:
        "Gopeed gives magnet links a clean download workflow without forcing users into a separate tool for direct file downloads.",
      intro: [
        "A magnet link downloader needs to resolve peer metadata reliably, stay stable on large tasks and make it easy to resume interrupted work. Gopeed covers that while keeping the interface focused on real download management.",
        "This matters for users who regularly move between direct file URLs, torrent metadata and magnet URIs. Instead of choosing different apps by protocol, they can keep the same workflow inside Gopeed.",
      ],
      benefitsTitle: "Why users pick Gopeed for magnet links",
      benefits: [
        "Paste magnet links directly into the app",
        "Continue using the same client for HTTP, HTTPS and ed2k tasks",
        "Available across desktop, mobile and self-hosted web environments",
        "Free open-source project with active documentation and releases",
      ],
      stepsTitle: "Basic magnet link flow",
      steps: [
        "Copy a magnet link from the source page.",
        "Paste it into Gopeed to resolve the task and file list.",
        "Start the download and continue later if the transfer is interrupted.",
      ],
      ctaTitle: "Use Gopeed for magnet links",
      ctaDescription:
        "Download the client or review the installation guide for your platform.",
      primaryCtaLabel: "Get Gopeed",
      secondaryCtaLabel: "Installation Guide",
    },
    "ed2k-downloader": {
      metaTitle: "ed2k Downloader for eDonkey Links | Gopeed",
      metaDescription:
        "Gopeed is a free open-source ed2k downloader with multi-protocol support for HTTP, torrent and magnet links across desktop and mobile platforms.",
      keywords: [
        "ed2k downloader",
        "ed2k client",
        "edonkey downloader",
        "ed2k link download",
      ],
      eyebrow: "ed2k Downloader",
      title: "ed2k Downloader for Legacy and Multi-Protocol Workflows",
      description:
        "Gopeed supports ed2k links alongside HTTP, torrent and magnet downloads, which is useful for users who still work with older resource formats.",
      intro: [
        "Many ed2k searches come from users who are trying to find a client that still supports older link formats without looking abandoned or unsafe. Gopeed gives that use case a modern interface and an actively maintained project site.",
        "Because Gopeed is multi-protocol by design, ed2k does not live in isolation. It can sit next to standard file downloads, torrent jobs and browser-triggered tasks in the same application.",
      ],
      benefitsTitle: "Why this matters for ed2k search intent",
      benefits: [
        "Dedicated support for ed2k links in a modern client",
        "Safer project presentation than many thin download-directory pages",
        "One app can manage old and new protocols together",
        "Cross-platform release assets and installation docs",
      ],
      stepsTitle: "How to use ed2k links in Gopeed",
      steps: [
        "Copy an ed2k link from the source site.",
        "Paste it into Gopeed to create the download task.",
        "Track progress, pause when needed and resume later.",
      ],
      ctaTitle: "Download an ed2k-capable client",
      ctaDescription:
        "Install Gopeed or open the docs to choose the right package for your platform.",
      primaryCtaLabel: "Download Gopeed",
      secondaryCtaLabel: "View Docs",
    },
  },
  zh: {
    "download-manager": {
      metaTitle:
        "免费开源下载管理器，支持 Windows、macOS、Linux、Android 和 iOS | Gopeed",
      metaDescription:
        "Gopeed 是一款免费开源下载管理器，支持多线程加速、HTTP/HTTPS、BT、磁力和 ed2k 下载，覆盖桌面端和移动端。",
      keywords: [
        "下载管理器",
        "免费下载管理器",
        "开源下载器",
        "多线程下载器",
        "跨平台下载器",
      ],
      eyebrow: "下载管理器",
      title: "免费开源下载管理器，覆盖桌面端和移动端",
      description:
        "Gopeed 面向的是想用一个工具解决常规文件下载、BT 任务、磁力链接和 ed2k 资源下载的人。",
      intro: [
        "用户搜索“下载管理器”时，真实诉求通常很明确：下载更快、可以断点续传、协议支持更全、不要被单一平台绑定。Gopeed 就是为这种需求设计的。",
        "它把多线程下载引擎和 HTTP、HTTPS、BitTorrent、磁力、ed2k 支持整合到同一个客户端里，既能处理普通文件，也能处理 P2P 下载任务，不需要在多个工具之间来回切换。",
      ],
      benefitsTitle: "这页承接的核心需求",
      benefits: [
        "免费开源，没有把核心下载能力放进付费墙",
        "同时支持 HTTP、HTTPS、BT、磁力和 ed2k",
        "覆盖 Windows、macOS、Linux、Android、iOS、Web 和 Docker",
        "支持浏览器扩展、API 和断点续传下载",
      ],
      stepsTitle: "常见使用方式",
      steps: [
        "先安装对应平台的 Gopeed 客户端。",
        "把文件 URL、种子文件、磁力链接或 ed2k 链接添加到 Gopeed。",
        "开始下载，并在需要时暂停或继续任务。",
      ],
      ctaTitle: "开始下载 Gopeed",
      ctaDescription: "选择你的平台，或者先查看安装文档。",
      primaryCtaLabel: "立即下载",
      secondaryCtaLabel: "安装文档",
    },
    "torrent-downloader": {
      metaTitle: "BT 下载器 / Torrent 下载器，支持磁力链接 | Gopeed",
      metaDescription:
        "Gopeed 是一款免费开源 BT 下载器，支持 BitTorrent、磁力链接、跨平台客户端和多协议下载。",
      keywords: [
        "bt下载器",
        "torrent下载器",
        "种子下载器",
        "bittorrent下载",
        "磁力下载器",
      ],
      eyebrow: "BT 下载器",
      title: "支持磁力链接的 BT / Torrent 下载器",
      description:
        "Gopeed 可以作为 BT 下载器使用，既支持 `.torrent` 文件，也支持磁力链接，同时保留常规文件下载能力。",
      intro: [
        "搜索“BT 下载器”或“torrent downloader”的人，通常需要的是一个够轻、够稳、能快速打开种子和解析磁力元数据的客户端。Gopeed 就是围绕这种使用场景设计的。",
        "它不仅能做 BitTorrent 下载，也能继续处理 HTTP 和 ed2k 任务，所以你不需要单独装一个 BT 客户端，再额外找一个普通下载器。",
      ],
      benefitsTitle: "这页重点强调什么",
      benefits: [
        "支持 BitTorrent 协议和磁力链接下载",
        "适合大型文件、镜像包和多文件任务",
        "跨平台，不局限于单一桌面系统",
        "开源项目，带浏览器扩展和 API 能力",
      ],
      stepsTitle: "BT 下载典型流程",
      steps: [
        "导入本地 `.torrent` 文件，或者直接粘贴磁力链接。",
        "等待 Gopeed 解析任务元数据并选择文件。",
        "开始下载、暂停管理，并在中断后继续任务。",
      ],
      ctaTitle: "用 Gopeed 下载 BT 任务",
      ctaDescription: "安装客户端，或者查看平台对应的安装说明。",
      primaryCtaLabel: "下载 Gopeed",
      secondaryCtaLabel: "查看文档",
    },
    "magnet-link-downloader": {
      metaTitle: "磁力链接下载器，支持 Magnet 下载 | Gopeed",
      metaDescription:
        "使用 Gopeed 下载 magnet 磁力链接。免费开源，支持 BitTorrent 元数据解析、断点续传和跨平台客户端。",
      keywords: [
        "磁力链接下载器",
        "磁力下载器",
        "magnet下载",
        "magnet downloader",
      ],
      eyebrow: "磁力下载器",
      title: "支持 Magnet 的磁力链接下载器",
      description:
        "Gopeed 让磁力链接下载变得直接，同时仍然保留 HTTP、HTTPS 和 ed2k 下载能力。",
      intro: [
        "一个好用的磁力链接下载器，关键不是只会粘贴 magnet，而是能稳定解析元数据、处理大任务，并且在网络波动后继续下载。Gopeed 覆盖了这套完整流程。",
        "对经常在直链、BT 和 magnet 之间切换的人来说，一个多协议下载器比单独的磁力工具更实用，工作流也更稳定。",
      ],
      benefitsTitle: "为什么这页值得做独立承接",
      benefits: [
        "支持直接粘贴 magnet 链接创建下载任务",
        "同一个客户端还可以继续处理 HTTP 和 ed2k 下载",
        "覆盖桌面端、移动端和 Web / Docker 场景",
        "项目开源，文档和发布节奏更可信",
      ],
      stepsTitle: "基础使用流程",
      steps: [
        "从资源站复制 magnet 磁力链接。",
        "粘贴到 Gopeed 中等待解析文件信息。",
        "开始下载，并在需要时继续未完成的任务。",
      ],
      ctaTitle: "开始下载磁力链接",
      ctaDescription: "下载 Gopeed，或先阅读安装文档。",
      primaryCtaLabel: "获取 Gopeed",
      secondaryCtaLabel: "安装文档",
    },
    "ed2k-downloader": {
      metaTitle: "ed2k 下载器，支持 eDonkey 链接下载 | Gopeed",
      metaDescription:
        "Gopeed 是一款免费开源 ed2k 下载器，支持 ed2k、HTTP、BT 和磁力链接，覆盖桌面端和移动端平台。",
      keywords: ["ed2k下载器", "ed2k下载", "edonkey下载器", "ed2k链接下载"],
      eyebrow: "ed2k 下载器",
      title: "兼容老资源格式的 ed2k 下载器",
      description:
        "Gopeed 在支持 HTTP、BT 和磁力的同时，也保留了 ed2k 下载能力，适合还需要兼容老链接格式的场景。",
      intro: [
        "很多人搜“ed2k 下载器”，本质是在找一个今天还能正常用、看起来不危险、而且不是陈旧废站的客户端。Gopeed 提供的是更现代、持续维护中的实现。",
        "更重要的是，ed2k 在 Gopeed 里不是孤立功能。它可以和普通文件下载、BT 任务、浏览器触发下载一起放在同一个工具里管理。",
      ],
      benefitsTitle: "这页承接的搜索意图",
      benefits: [
        "在现代客户端里继续支持 ed2k 链接",
        "比很多下载目录站更可信、更完整",
        "一个应用同时管理新旧下载协议",
        "有跨平台安装包和文档支持",
      ],
      stepsTitle: "ed2k 使用方式",
      steps: [
        "复制 ed2k 链接。",
        "粘贴到 Gopeed 中创建下载任务。",
        "查看进度，按需暂停并在之后恢复。",
      ],
      ctaTitle: "下载支持 ed2k 的客户端",
      ctaDescription: "安装 Gopeed，或者先查看对应平台的文档说明。",
      primaryCtaLabel: "下载 Gopeed",
      secondaryCtaLabel: "查看文档",
    },
  },
  "zh-TW": {
    "download-manager": {
      metaTitle:
        "免費開源下載管理器，支援 Windows、macOS、Linux、Android 和 iOS | Gopeed",
      metaDescription:
        "Gopeed 是一款免費開源下載管理器，支援多執行緒加速、HTTP/HTTPS、BT、磁力和 ed2k 下載，覆蓋桌面端和行動端。",
      keywords: [
        "下載管理器",
        "免費下載管理器",
        "開源下載器",
        "多執行緒下載器",
        "跨平台下載器",
      ],
      eyebrow: "下載管理器",
      title: "免費開源下載管理器，覆蓋桌面端和行動端",
      description:
        "Gopeed 面向的是想用一個工具處理一般檔案下載、BT 任務、磁力連結和 ed2k 資源的人。",
      intro: [
        "使用者搜尋「下載管理器」時，通常想找的是下載更快、可以續傳、協定支援更完整，而且不要被單一平台綁住的工具。Gopeed 就是為這種需求設計的。",
        "它把多執行緒下載引擎和 HTTP、HTTPS、BitTorrent、磁力、ed2k 支援整合到同一個客戶端中，既能處理一般檔案，也能處理 P2P 任務，不需要切換多套工具。",
      ],
      benefitsTitle: "這頁承接的核心需求",
      benefits: [
        "免費開源，核心下載能力沒有被付費牆限制",
        "同時支援 HTTP、HTTPS、BT、磁力和 ed2k",
        "覆蓋 Windows、macOS、Linux、Android、iOS、Web 和 Docker",
        "支援瀏覽器擴充、API 與斷點續傳下載",
      ],
      stepsTitle: "常見使用方式",
      steps: [
        "先安裝對應平台的 Gopeed 客戶端。",
        "把檔案 URL、種子檔、磁力連結或 ed2k 連結加入 Gopeed。",
        "開始下載，並在需要時暫停或繼續任務。",
      ],
      ctaTitle: "開始下載 Gopeed",
      ctaDescription: "選擇你的平台，或先查看安裝文件。",
      primaryCtaLabel: "立即下載",
      secondaryCtaLabel: "安裝文件",
    },
    "torrent-downloader": {
      metaTitle: "BT 下載器 / Torrent 下載器，支援磁力連結 | Gopeed",
      metaDescription:
        "Gopeed 是一款免費開源 BT 下載器，支援 BitTorrent、磁力連結、跨平台客戶端與多協定下載。",
      keywords: [
        "bt下載器",
        "torrent下載器",
        "種子下載器",
        "bittorrent下載",
        "磁力下載器",
      ],
      eyebrow: "BT 下載器",
      title: "支援磁力連結的 BT / Torrent 下載器",
      description:
        "Gopeed 可以作為 BT 下載器使用，既支援 `.torrent` 檔，也支援磁力連結，同時保留一般檔案下載能力。",
      intro: [
        "搜尋「BT 下載器」或「torrent downloader」的人，通常需要的是一個夠輕、夠穩、能快速打開種子和解析磁力 metadata 的客戶端。Gopeed 就是圍繞這個場景設計的。",
        "它不只支援 BitTorrent，也能繼續處理 HTTP 和 ed2k 任務，所以你不需要再另外安裝一個 BT 客戶端和一個普通下載器。",
      ],
      benefitsTitle: "這頁重點強調什麼",
      benefits: [
        "支援 BitTorrent 協定與磁力連結下載",
        "適合大型檔案、映像檔和多檔任務",
        "跨平台，不局限於單一桌面系統",
        "開源專案，附帶瀏覽器擴充與 API 能力",
      ],
      stepsTitle: "BT 下載典型流程",
      steps: [
        "匯入本地 `.torrent` 檔，或直接貼上磁力連結。",
        "等待 Gopeed 解析任務 metadata 並選擇檔案。",
        "開始下載、暫停管理，並在中斷後繼續任務。",
      ],
      ctaTitle: "用 Gopeed 下載 BT 任務",
      ctaDescription: "安裝客戶端，或查看對應平台的安裝說明。",
      primaryCtaLabel: "下載 Gopeed",
      secondaryCtaLabel: "查看文件",
    },
    "magnet-link-downloader": {
      metaTitle: "磁力連結下載器，支援 Magnet 下載 | Gopeed",
      metaDescription:
        "使用 Gopeed 下載 magnet 磁力連結。免費開源，支援 BitTorrent metadata 解析、斷點續傳與跨平台客戶端。",
      keywords: [
        "磁力連結下載器",
        "磁力下載器",
        "magnet下載",
        "magnet downloader",
      ],
      eyebrow: "磁力下載器",
      title: "支援 Magnet 的磁力連結下載器",
      description:
        "Gopeed 讓磁力連結下載變得直接，同時仍然保留 HTTP、HTTPS 和 ed2k 下載能力。",
      intro: [
        "一個好用的磁力連結下載器，重點不只是能貼 magnet，而是能穩定解析 metadata、處理大型任務，並在網路波動後繼續下載。Gopeed 覆蓋了這套完整流程。",
        "對經常在直鏈、BT 和 magnet 之間切換的人來說，一個多協定下載器比單獨的磁力工具更實用，工作流程也更穩定。",
      ],
      benefitsTitle: "為什麼這頁值得獨立承接",
      benefits: [
        "支援直接貼上 magnet 連結建立下載任務",
        "同一個客戶端也能處理 HTTP 和 ed2k 下載",
        "覆蓋桌面端、行動端和 Web / Docker 場景",
        "專案開源，文件與發佈節奏更可信",
      ],
      stepsTitle: "基礎使用流程",
      steps: [
        "從資源站複製 magnet 磁力連結。",
        "貼到 Gopeed 中等待解析檔案資訊。",
        "開始下載，並在需要時繼續未完成的任務。",
      ],
      ctaTitle: "開始下載磁力連結",
      ctaDescription: "下載 Gopeed，或先閱讀安裝文件。",
      primaryCtaLabel: "取得 Gopeed",
      secondaryCtaLabel: "安裝文件",
    },
    "ed2k-downloader": {
      metaTitle: "ed2k 下載器，支援 eDonkey 連結下載 | Gopeed",
      metaDescription:
        "Gopeed 是一款免費開源 ed2k 下載器，支援 ed2k、HTTP、BT 和磁力連結，覆蓋桌面端和行動端平台。",
      keywords: ["ed2k下載器", "ed2k下載", "edonkey下載器", "ed2k連結下載"],
      eyebrow: "ed2k 下載器",
      title: "相容舊資源格式的 ed2k 下載器",
      description:
        "Gopeed 在支援 HTTP、BT 和磁力的同時，也保留了 ed2k 下載能力，適合還需要相容舊連結格式的場景。",
      intro: [
        "很多人搜尋「ed2k 下載器」，本質是在找一個今天還能正常用、看起來不危險、而且不是陳舊廢站的客戶端。Gopeed 提供的是更現代、持續維護中的實作。",
        "更重要的是，ed2k 在 Gopeed 裡不是孤立功能。它可以和一般檔案下載、BT 任務、瀏覽器觸發下載一起放在同一個工具裡管理。",
      ],
      benefitsTitle: "這頁承接的搜尋意圖",
      benefits: [
        "在現代客戶端中繼續支援 ed2k 連結",
        "比很多下載目錄站更可信、更完整",
        "一個應用同時管理新舊下載協定",
        "有跨平台安裝包和文件支援",
      ],
      stepsTitle: "ed2k 使用方式",
      steps: [
        "複製 ed2k 連結。",
        "貼到 Gopeed 中建立下載任務。",
        "查看進度，按需暫停並在之後恢復。",
      ],
      ctaTitle: "下載支援 ed2k 的客戶端",
      ctaDescription: "安裝 Gopeed，或先查看對應平台的文件說明。",
      primaryCtaLabel: "下載 Gopeed",
      secondaryCtaLabel: "查看文件",
    },
  },
};

const visibleFaqEntries: Record<Locale, VisibleFaqEntry[]> = {
  en: [
    {
      question: "What protocols does Gopeed support?",
      answer:
        "Gopeed supports HTTP, HTTPS, BitTorrent, magnet links and ed2k links in the same download client.",
    },
    {
      question: "Is Gopeed a free download manager?",
      answer:
        "Yes. Gopeed is free and open source, and the desktop and mobile clients can be downloaded and used directly.",
    },
    {
      question: "Can Gopeed be used as a BT or torrent downloader?",
      answer:
        "Yes. You can open `.torrent` files, use magnet links and manage torrent tasks alongside direct file downloads.",
    },
    {
      question: "Which platforms can install Gopeed?",
      answer:
        "Gopeed provides releases for Windows, macOS, Linux, Android and iOS, and also supports Web, Docker and command-line workflows.",
    },
    {
      question: "Why is my download speed sometimes slow?",
      answer:
        "Download speed depends on the source itself, the number and quality of peers or servers, and your own network conditions. Gopeed can improve task handling and concurrency, but it cannot exceed the limits of the resource or your connection.",
    },
  ],
  zh: [
    {
      question: "Gopeed 支持哪些下载协议？",
      answer:
        "Gopeed 在同一个客户端下载器里同时支持 HTTP、HTTPS、BitTorrent、磁力链接和 ed2k 链接。",
    },
    {
      question: "Gopeed 是免费开源下载管理器吗？",
      answer:
        "是。Gopeed 免费开源，桌面端和移动端客户端都可以直接下载安装使用。",
    },
    {
      question: "Gopeed 可以作为 BT 下载器使用吗？",
      answer:
        "可以。你可以导入 `.torrent` 文件、粘贴磁力链接，并把 BT 任务和普通文件下载一起管理。",
    },
    {
      question: "Gopeed 支持哪些平台？",
      answer:
        "Gopeed 提供 Windows、macOS、Linux、Android、iOS 版本，也支持 Web、Docker 和命令行场景。",
    },
    {
      question: "为什么下载速度有时候不快？",
      answer:
        "下载速度取决于资源本身、服务端或节点质量，以及你自己的网络环境。Gopeed 可以优化任务管理和并发连接，但不能突破资源端或本地网络的上限。",
    },
  ],
  "zh-TW": [
    {
      question: "Gopeed 支援哪些下載協定？",
      answer:
        "Gopeed 在同一個下載客戶端裡同時支援 HTTP、HTTPS、BitTorrent、磁力連結和 ed2k 連結。",
    },
    {
      question: "Gopeed 是免費開源下載管理器嗎？",
      answer:
        "是。Gopeed 免費開源，桌面端和行動端客戶端都可以直接下載安裝使用。",
    },
    {
      question: "Gopeed 可以作為 BT 下載器使用嗎？",
      answer:
        "可以。你可以匯入 `.torrent` 檔、貼上磁力連結，並把 BT 任務和一般檔案下載一起管理。",
    },
    {
      question: "Gopeed 支援哪些平台？",
      answer:
        "Gopeed 提供 Windows、macOS、Linux、Android、iOS 版本，也支援 Web、Docker 和命令列場景。",
    },
    {
      question: "為什麼下載速度有時候不快？",
      answer:
        "下載速度取決於資源本身、伺服器或節點品質，以及你自己的網路環境。Gopeed 可以優化任務管理和並發連線，但不能突破資源端或本地網路的上限。",
    },
  ],
};

export function localeHref(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export function getKeywordPage(locale: Locale, slug: KeywordPageSlug) {
  return keywordPageContent[locale][slug];
}

export function getVisibleFaqEntries(locale: Locale) {
  return visibleFaqEntries[locale];
}
