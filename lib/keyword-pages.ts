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
  ru: {
    "download-manager": {
      metaTitle:
        "Бесплатный менеджер загрузок для Windows, macOS, Linux, Android и iOS | Gopeed",
      metaDescription:
        "Gopeed — бесплатный менеджер загрузок с открытым исходным кодом, многопотоковым ускорением, поддержкой torrent, magnet и ed2k, а также десктопными и мобильными клиентами.",
      keywords: [
        "менеджер загрузок",
        "бесплатный менеджер загрузок",
        "менеджер загрузок с открытым исходным кодом",
        "многопоточный загрузчик",
        "кроссплатформенный загрузчик",
      ],
      eyebrow: "Менеджер загрузок",
      title:
        "Бесплатный менеджер загрузок для Windows, macOS, Linux, Android и iOS",
      description:
        "Gopeed — менеджер загрузок с открытым исходным кодом, созданный для тех, кому нужен один инструмент для обычных файлов, торрентов, magnet-ссылок и ресурсов ed2k.",
      intro: [
        "Когда кто-то ищет бесплатный менеджер загрузок, реальные потребности обычно просты: более быстрые загрузки, поддержка докачки, меньше ограничений и поддержка большего числа протоколов, чем просто прямой HTTP. Gopeed относится именно к этой категории.",
        "Gopeed объединяет многопоточный движок загрузки с поддержкой BitTorrent, magnet и ed2k, так что одно приложение может работать с программными пакетами, большими архивами, метаданными торрентов и устаревшими форматами ссылок без переключения между инструментами.",
      ],
      benefitsTitle:
        "Почему этим менеджером загрузок легче занимать позиции в поиске",
      benefits: [
        "Бесплатный и с открытым исходным кодом, без платного доступа к основным функциям загрузки",
        "Поддерживает HTTP, HTTPS, torrent, magnet и ed2k в одном клиенте",
        "Работает на Windows, macOS, Linux, Android, iOS, Web и Docker",
        "Включает расширения для браузера, поддержку API и загружаемые с докачкой файлы",
      ],
      stepsTitle: "Как обычно используют Gopeed",
      steps: [
        "Установите десктопный или мобильный клиент для вашей платформы.",
        "Вставьте URL файла, торрент-файл, magnet-ссылку или ссылку ed2k в Gopeed.",
        "Запустите задачу, отслеживайте прогресс и возобновляйте прерванные загрузки позже.",
      ],
      ctaTitle: "Скачать Gopeed",
      ctaDescription:
        "Выберите вашу платформу или откройте руководство по установке, чтобы быстро начать.",
      primaryCtaLabel: "Скачать сейчас",
      secondaryCtaLabel: "Руководство по установке",
    },
    "torrent-downloader": {
      metaTitle:
        "Загрузчик торрентов / BT-загрузчик с поддержкой Magnet | Gopeed",
      metaDescription:
        "Gopeed — бесплатный загрузчик торрентов с открытым исходным кодом, поддержкой BitTorrent, magnet, DHT и кроссплатформенный для Windows, macOS, Linux, Android и iOS.",
      keywords: [
        "загрузчик торрентов",
        "BT-загрузчик",
        "BitTorrent-загрузчик",
        "торрент-клиент",
        "загрузчик magnet",
      ],
      eyebrow: "Загрузчик торрентов",
      title: "Загрузчик торрентов / BT с поддержкой Magnet",
      description:
        "Gopeed можно использовать как загрузчик BitTorrent как для файлов `.torrent`, так и для magnet-ссылок, сохраняя при этом поддержку прямых загрузок в том же приложении.",
      intro: [
        "Поиск BT-загрузчика или загрузчика торрентов обычно означает, что нужен лёгкий клиент, быстро открывающий торрент-файлы, получающий метаданные magnet-ссылок и стабильно поддерживающий длительные задачи. Gopeed разработан именно для такого рабочего процесса.",
        "Поскольку приложение также поддерживает HTTP и ed2k, пользователям не нужны отдельные торрент-клиент и загрузчик файлов. Один инструмент справится и с прямой передачей файлов, и с загрузками peer-to-peer.",
      ],
      benefitsTitle: "Что подчеркивается на этой странице торрентов",
      benefits: [
        "Поддержка протокола BitTorrent с обработкой magnet-ссылок",
        "Подходит для образов ПО, больших архивов и многофайловых задач",
        "Кроссплатформенный клиент вместо рабочего процесса торрентов только для десктопа",
        "Проект с открытым исходным кодом, расширение для браузера и поддержка API",
      ],
      stepsTitle: "Типичный рабочий процесс торрентов",
      steps: [
        "Откройте локальный файл `.torrent` или вставьте magnet URI.",
        "Дождитесь, пока Gopeed разрешит метаданные, и выберите нужные файлы.",
        "Скачивайте, ставьте на паузу, возобновляйте и управляйте задачами из одного интерфейса.",
      ],
      ctaTitle: "Начните скачивать торренты с Gopeed",
      ctaDescription:
        "Установите клиент или посетите документацию для инструкций, специфичных для платформы.",
      primaryCtaLabel: "Скачать Gopeed",
      secondaryCtaLabel: "Документация",
    },
    "magnet-link-downloader": {
      metaTitle: "Загрузчик magnet-ссылок для торрент-задач | Gopeed",
      metaDescription:
        "Скачивайте magnet-ссылки с Gopeed — бесплатным загрузчиком с открытым исходным кодом, поддерживающим метаданные BitTorrent, докачку и кроссплатформенные клиенты.",
      keywords: [
        "загрузчик magnet-ссылок",
        "загрузчик magnet",
        "загрузчик magnet URI",
        "торрент magnet загрузчик",
      ],
      eyebrow: "Загрузчик Magnet",
      title: "Загрузчик magnet-ссылок для быстрых кроссплатформенных загрузок",
      description:
        "Gopeed предоставляет magnet-ссылкам простой рабочий процесс загрузки, не заставляя пользователей переходить на отдельный инструмент для прямых загрузок файлов.",
      intro: [
        "Загрузчик magnet-ссылок должен надёжно разрешать метаданные пиров, стабильно работать с большими задачами и облегчать возобновление прерванных загрузок. Gopeed покрывает эти потребности, сохраняя интерфейс ориентированным на реальное управление загрузками.",
        "Это важно для пользователей, которые регулярно переключаются между прямыми URL файлов, метаданными торрентов и magnet URI. Вместо выбора разных приложений в зависимости от протокола они могут сохранить единый рабочий процесс внутри Gopeed.",
      ],
      benefitsTitle: "Почему пользователи выбирают Gopeed для magnet-ссылок",
      benefits: [
        "Вставляйте magnet-ссылки прямо в приложение",
        "Продолжайте использовать тот же клиент для задач HTTP, HTTPS и ed2k",
        "Доступен на десктопе, мобильных устройствах и самохостируемых веб-средах",
        "Бесплатный проект с открытым исходным кодом с активной документацией и регулярными обновлениями",
      ],
      stepsTitle: "Базовый процесс работы с magnet-ссылками",
      steps: [
        "Скопируйте magnet-ссылку с исходной страницы.",
        "Вставьте её в Gopeed для разрешения задачи и списка файлов.",
        "Начните загрузку и продолжите позже, если передача была прервана.",
      ],
      ctaTitle: "Используйте Gopeed для magnet-ссылок",
      ctaDescription:
        "Скачайте клиент или ознакомьтесь с руководством по установке для вашей платформы.",
      primaryCtaLabel: "Получить Gopeed",
      secondaryCtaLabel: "Руководство по установке",
    },
    "ed2k-downloader": {
      metaTitle: "Загрузчик ed2k для ссылок eDonkey | Gopeed",
      metaDescription:
        "Gopeed — бесплатный загрузчик ed2k с открытым исходным кодом с мультипротокольной поддержкой HTTP, torrent и magnet-ссылок на десктопных и мобильных платформах.",
      keywords: [
        "загрузчик ed2k",
        "клиент ed2k",
        "загрузчик eDonkey",
        "скачать ed2k ссылку",
      ],
      eyebrow: "Загрузчик ed2k",
      title:
        "Загрузчик ed2k для устаревших и мультипротокольных рабочих процессов",
      description:
        "Gopeed поддерживает ссылки ed2k наряду с загрузками HTTP, torrent и magnet, что полезно для пользователей, всё ещё работающих со старыми форматами ресурсов.",
      intro: [
        "Многие поисковые запросы ed2k исходят от пользователей, пытающихся найти клиент, который всё ещё поддерживает старые форматы ссылок и при этом не выглядит заброшенным или небезопасным. Gopeed предоставляет этому сценарию современный интерфейс и активно поддерживаемый проект.",
        "Поскольку Gopeed по своей природе мультипротокольный, ed2k не существует изолированно. Он может соседствовать со стандартными загрузками файлов, торрент-задачами и загрузками, инициированными из браузера, в одном приложении.",
      ],
      benefitsTitle: "Почему это важно для поискового интента ed2k",
      benefits: [
        "Выделенная поддержка ссылок ed2k в современном клиенте",
        "Более безопасное представление проекта, чем у многих скудных каталогов загрузок",
        "Одно приложение может управлять как старыми, так и новыми протоколами",
        "Кроссплатформенные установочные пакеты и документация",
      ],
      stepsTitle: "Как использовать ссылки ed2k в Gopeed",
      steps: [
        "Скопируйте ссылку ed2k с исходного сайта.",
        "Вставьте её в Gopeed для создания задачи загрузки.",
        "Отслеживайте прогресс, ставьте на паузу при необходимости и возобновляйте позже.",
      ],
      ctaTitle: "Скачайте клиент с поддержкой ed2k",
      ctaDescription:
        "Установите Gopeed или откройте документацию, чтобы выбрать подходящий пакет для вашей платформы.",
      primaryCtaLabel: "Скачать Gopeed",
      secondaryCtaLabel: "Документация",
    },
  },
};

const visibleFaqEntries: Record<Locale, VisibleFaqEntry[]> = {
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

export function localeHref(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export function getKeywordPage(locale: Locale, slug: KeywordPageSlug) {
  return keywordPageContent[locale][slug];
}

export function getVisibleFaqEntries(locale: Locale) {
  return visibleFaqEntries[locale];
}
