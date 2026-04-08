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
  ja: {
    "download-manager": {
      metaTitle:
        "無料ダウンロードマネージャー（Windows、macOS、Linux、Android、iOS対応）| Gopeed",
      metaDescription:
        "Gopeedは無料のオープンソースダウンロードマネージャーで、マルチスレッド加速、HTTP/HTTPS、BT、マグネット、ed2k対応。デスクトップおよびモバイルクライアントを提供。",
      keywords: [
        "ダウンロードマネージャー",
        "無料ダウンロードマネージャー",
        "オープンソースダウンローダー",
        "マルチスレッドダウンローダー",
        "クロスプラットフォームダウンローダー",
      ],
      eyebrow: "ダウンロードマネージャー",
      title:
        "Windows、macOS、Linux、Android、iOS対応の無料ダウンロードマネージャー",
      description:
        "Gopeedは、HTTP、BT、マグネットリンク、ed2kリソースを1つのツールでダウンロードしたい人向けのオープンソースダウンロードマネージャーです。",
      intro: [
        "無料のダウンロードマネージャーを探す人の本当の目的はシンプルです。ダウンロードが速く、再開可能で、より多くのプロトコルに対応し、特定のプラットフォームに縛られないこと。Gopeedはまさにそのために設計されています。",
        "マルチスレッドダウンロードエンジンとHTTP、HTTPS、BitTorrent、マグネット、ed2kサポートを1つのクライアントに統合し、通常ファイルもP2Pタスクも複数のツールを切り替えることなく処理できます。",
      ],
      benefitsTitle: "このダウンロードマネージャーが選ばれる理由",
      benefits: [
        "無料でオープンソース。コアダウンロード機能に課金制限なし",
        "HTTP、HTTPS、BT、マグネット、ed2kを1つのクライアントでサポート",
        "Windows、macOS、Linux、Android、iOS、Web、Dockerに対応",
        "ブラウザ拡張機能、API、レジュームダウンロードをサポート",
      ],
      stepsTitle: "一般的な使い方",
      steps: [
        "プラットフォームに合ったGopeedクライアントをインストールします。",
        "ファイルURL、torrentファイル、マグネットリンク、またはed2kリンクをGopeedに追加します。",
        "ダウンロードを開始し、必要に応じて一時停止・再開します。",
      ],
      ctaTitle: "Gopeedをダウンロード",
      ctaDescription:
        "プラットフォームを選択するか、インストールガイドをご覧ください。",
      primaryCtaLabel: "今すぐダウンロード",
      secondaryCtaLabel: "インストールガイド",
    },
    "torrent-downloader": {
      metaTitle:
        "BTダウンローダー / Torrentダウンローダー（マグネットリンク対応）| Gopeed",
      metaDescription:
        "Gopeedは無料のオープンソースBTダウンローダーで、BitTorrent、マグネットリンク、クロスプラットフォームクライアント、マルチプロトコルダウンロードに対応。",
      keywords: [
        "BTダウンローダー",
        "torrentダウンローダー",
        "torrentクライアント",
        "bittorrentダウンローダー",
        "マグネットダウンローダー",
      ],
      eyebrow: "Torrentダウンローダー",
      title: "マグネットリンク対応のBT / Torrentダウンローダー",
      description:
        "GopeedはBTダウンローダーとして使用でき、`.torrent`ファイルとマグネットリンクの両方に対応しながら、通常のファイルダウンロード機能も維持しています。",
      intro: [
        "BTダウンローダーを探す人は通常、軽量で安定しており、torrentファイルを素早く開き、マグネットメタデータを解析できるクライアントを必要としています。Gopeedはまさにそのワークフロー向けに設計されています。",
        "BitTorrentだけでなくHTTPやed2kタスクも処理できるため、BTクライアントと通常のダウンローダーを別々にインストールする必要はありません。",
      ],
      benefitsTitle: "このtorrentページが強調するポイント",
      benefits: [
        "BitTorrentプロトコルとマグネットリンクダウンロードに対応",
        "大容量ファイル、イメージ、マルチファイルタスクに最適",
        "クロスプラットフォーム。単一のデスクトップシステムに限定されない",
        "オープンソースプロジェクト。ブラウザ拡張機能とAPIを提供",
      ],
      stepsTitle: "BTダウンロードの典型的な流れ",
      steps: [
        "ローカルの`.torrent`ファイルをインポートするか、マグネットリンクを貼り付けます。",
        "Gopeedがタスクメタデータを解析するのを待ち、ファイルを選択します。",
        "ダウンロードを開始、一時停止、管理し、中断後も再開できます。",
      ],
      ctaTitle: "GopeedでBTタスクをダウンロード",
      ctaDescription:
        "クライアントをインストールするか、プラットフォーム別のインストール手順をご覧ください。",
      primaryCtaLabel: "Gopeedをダウンロード",
      secondaryCtaLabel: "ドキュメントを見る",
    },
    "magnet-link-downloader": {
      metaTitle: "マグネットリンクダウンローダー | Gopeed",
      metaDescription:
        "Gopeedでmagnetマグネットリンクをダウンロード。無料のオープンソース。BitTorrentメタデータ解析、レジューム、クロスプラットフォームクライアントに対応。",
      keywords: [
        "マグネットリンクダウンローダー",
        "マグネットダウンローダー",
        "magnetダウンローダー",
        "torrentマグネットダウンローダー",
      ],
      eyebrow: "マグネットダウンローダー",
      title:
        "高速クロスプラットフォームダウンロードのマグネットリンクダウンローダー",
      description:
        "Gopeedはマグネットリンクのダウンロードをシンプルにしつつ、HTTP、HTTPS、ed2kダウンロード機能も維持しています。",
      intro: [
        "優れたマグネットリンクダウンローダーの重要な点は、magnetを貼り付けるだけでなく、メタデータを安定して解析し、大規模タスクを処理し、ネットワークの変動後にダウンロードを再開できることです。Gopeedはこの完全なワークフローをカバーしています。",
        "直リンク、BT、magnetの間を頻繁に切り替えるユーザーにとって、マルチプロトコルダウンローダーは単独のマグネットツールよりも実用的で、ワークフローも安定しています。",
      ],
      benefitsTitle: "ユーザーがGopeedをマグネットリンクに選ぶ理由",
      benefits: [
        "magnetリンクを直接アプリに貼り付け可能",
        "同じクライアントでHTTPとed2kタスクも継続処理",
        "デスクトップ、モバイル、Web/Docker環境に対応",
        "無料のオープンソースプロジェクト。活発なドキュメントとリリース",
      ],
      stepsTitle: "基本的なマグネットリンクの流れ",
      steps: [
        "ソースページからmagnetマグネットリンクをコピーします。",
        "Gopeedに貼り付けてタスクとファイルリストを解析します。",
        "ダウンロードを開始し、転送が中断された場合は後で続行します。",
      ],
      ctaTitle: "Gopeedでマグネットリンクをダウンロード",
      ctaDescription:
        "クライアントをダウンロードするか、プラットフォームのインストールガイドをご覧ください。",
      primaryCtaLabel: "Gopeedを入手",
      secondaryCtaLabel: "インストールガイド",
    },
    "ed2k-downloader": {
      metaTitle: "ed2kダウンローダー（eDonkeyリンク対応）| Gopeed",
      metaDescription:
        "Gopeedは無料のオープンソースed2kダウンローダーで、ed2k、HTTP、BT、マグネットリンクに対応。デスクトップおよびモバイルプラットフォームをカバー。",
      keywords: [
        "ed2kダウンローダー",
        "ed2kクライアント",
        "edonkeyダウンローダー",
        "ed2kリンクダウンロード",
      ],
      eyebrow: "ed2kダウンローダー",
      title:
        "レガシーおよびマルチプロトコルワークフロー対応のed2kダウンローダー",
      description:
        "GopeedはHTTP、BT、マグネットダウンロードと共にed2kリンクをサポートしており、古いリソースフォーマットを扱うユーザーに便利です。",
      intro: [
        "ed2kを検索するユーザーの多くは、今日でも正常に動作し、安全に見え、放棄されていないクライアントを探しています。Gopeedはより現代的で、積極的に保守されている実装を提供します。",
        "重要なのは、ed2kはGopeedで孤立した機能ではないことです。通常のファイルダウンロード、BTタスク、ブラウザトリガーダウンロードと同じツールで管理できます。",
      ],
      benefitsTitle: "ed2k検索意図に対応するポイント",
      benefits: [
        "モダンなクライアントでed2kリンクを継続サポート",
        "多くのダウンロードディレクトリサイトよりも信頼性が高く完全",
        "1つのアプリで新旧ダウンロードプロトコルを同時管理",
        "クロスプラットフォームのインストールパッケージとドキュメントサポート",
      ],
      stepsTitle: "ed2kの使い方",
      steps: [
        "ed2kリンクをコピーします。",
        "Gopeedに貼り付けてダウンロードタスクを作成します。",
        "進捗を確認し、必要に応じて一時停止し後で再開します。",
      ],
      ctaTitle: "ed2k対応クライアントをダウンロード",
      ctaDescription:
        "Gopeedをインストールするか、プラットフォームのドキュメントをご覧ください。",
      primaryCtaLabel: "Gopeedをダウンロード",
      secondaryCtaLabel: "ドキュメントを見る",
    },
  },
  ko: {
    "download-manager": {
      metaTitle:
        "무료 다운로드 매니저 (Windows, macOS, Linux, Android, iOS 지원) | Gopeed",
      metaDescription:
        "Gopeed은 무료 오픈소스 다운로드 매니저로 멀티스레드 가속, HTTP/HTTPS, BT, 마그넷, ed2k 지원. 데스크톱 및 모바일 클라이언트 제공.",
      keywords: [
        "다운로드 매니저",
        "무료 다운로드 매니저",
        "오픈소스 다운로더",
        "멀티스레드 다운로더",
        "크로스 플랫폼 다운로더",
      ],
      eyebrow: "다운로드 매니저",
      title: "Windows, macOS, Linux, Android, iOS 지원 무료 다운로드 매니저",
      description:
        "Gopeed은 일반 파일, BT 작업, 마그넷 링크, ed2k 리소스를 하나의 도구로 다운로드하고 싶은 사용자를 위한 오픈소스 다운로드 매니저입니다.",
      intro: [
        "무료 다운로드 매니저를 찾는 사람들의 실제 요구는 보통 간단합니다. 더 빠른 다운로드, 이어서 다운로드, 더 많은 프로토콜 지원, 단일 플랫폼에 종속되지 않는 것. Gopeed은 바로 이런 요구를 위해 설계되었습니다.",
        "멀티스레드 다운로드 엔진과 HTTP, HTTPS, BitTorrent, 마그넷, ed2k 지원을 하나의 클라이언트에 통합하여 일반 파일과 P2P 작업을 모두 처리할 수 있어 여러 도구를 전환할 필요가 없습니다.",
      ],
      benefitsTitle: "이 다운로드 매니저가 선택받는 이유",
      benefits: [
        "무료 오픈소스, 핵심 다운로드 기능에 유료 벽 없음",
        "HTTP, HTTPS, BT, 마그넷, ed2k를 하나의 클라이언트에서 지원",
        "Windows, macOS, Linux, Android, iOS, Web, Docker 지원",
        "브라우저 확장 프로그램, API, 이어서 다운로드 지원",
      ],
      stepsTitle: "일반적인 사용 방법",
      steps: [
        "플랫폼에 맞는 Gopeed 클라이언트를 설치합니다.",
        "파일 URL, 토렌트 파일, 마그넷 링크 또는 ed2k 링크를 Gopeed에 추가합니다.",
        "다운로드를 시작하고 필요에 따라 일시정지 및 재개합니다.",
      ],
      ctaTitle: "Gopeed 다운로드",
      ctaDescription: "플랫폼을 선택하거나 설치 가이드를 확인하세요.",
      primaryCtaLabel: "지금 다운로드",
      secondaryCtaLabel: "설치 가이드",
    },
    "torrent-downloader": {
      metaTitle: "BT 다운로더 / Torrent 다운로더 (마그넷 링크 지원) | Gopeed",
      metaDescription:
        "Gopeed은 무료 오픈소스 BT 다운로더로 BitTorrent, 마그넷 링크, 크로스 플랫폼 클라이언트 및 멀티 프로토콜 다운로드를 지원합니다.",
      keywords: [
        "BT 다운로더",
        "torrent 다운로더",
        "토렌트 클라이언트",
        "bittorrent 다운로더",
        "마그넷 다운로더",
      ],
      eyebrow: "Torrent 다운로더",
      title: "마그넷 링크 지원 BT / Torrent 다운로더",
      description:
        "Gopeed은 BT 다운로더로 사용할 수 있으며 `.torrent` 파일과 마그넷 링크를 모두 지원하면서 일반 파일 다운로드 기능도 유지합니다.",
      intro: [
        "BT 다운로더를 찾는 사람들은 보통 가볍고 안정적이며, 토렌트 파일을 빠르게 열고 마그넷 메타데이터를 파싱할 수 있는 클라이언트를 원합니다. Gopeed은 바로 이런 워크플로우를 위해 설계되었습니다.",
        "BitTorrent뿐만 아니라 HTTP와 ed2k 작업도 처리할 수 있어 BT 클라이언트와 일반 다운로더를 별도로 설치할 필요가 없습니다.",
      ],
      benefitsTitle: "이 torrent 페이지가 강조하는 점",
      benefits: [
        "BitTorrent 프로토콜 및 마그넷 링크 다운로드 지원",
        "대용량 파일, 이미지 및 멀티 파일 작업에 적합",
        "크로스 플랫폼, 단일 데스크톱 시스템에 제한되지 않음",
        "오픈소스 프로젝트, 브라우저 확장 프로그램 및 API 제공",
      ],
      stepsTitle: "BT 다운로드 일반적인 흐름",
      steps: [
        "로컬 `.torrent` 파일을 가져오거나 마그넷 링크를 붙여넣습니다.",
        "Gopeed이 작업 메타데이터를 파싱할 때까지 기다린 후 파일을 선택합니다.",
        "다운로드를 시작, 일시정지 관리하고 중단 후에도 작업을 이어갈 수 있습니다.",
      ],
      ctaTitle: "Gopeed으로 BT 작업 다운로드",
      ctaDescription:
        "클라이언트를 설치하거나 플랫폼별 설치 안내를 확인하세요.",
      primaryCtaLabel: "Gopeed 다운로드",
      secondaryCtaLabel: "문서 보기",
    },
    "magnet-link-downloader": {
      metaTitle: "마그넷 링크 다운로더 | Gopeed",
      metaDescription:
        "Gopeed으로 magnet 마그넷 링크를 다운로드하세요. 무료 오픈소스. BitTorrent 메타데이터 파싱, 이어서 다운로드, 크로스 플랫폼 클라이언트 지원.",
      keywords: [
        "마그넷 링크 다운로더",
        "마그넷 다운로더",
        "magnet 다운로더",
        "토렌트 마그넷 다운로더",
      ],
      eyebrow: "마그넷 다운로더",
      title: "빠른 크로스 플랫폼 다운로드를 위한 마그넷 링크 다운로더",
      description:
        "Gopeed은 마그넷 링크 다운로드를 간편하게 만들면서도 HTTP, HTTPS, ed2k 다운로드 기능을 유지합니다.",
      intro: [
        "좋은 마그넷 링크 다운로더의 핵심은 magnet을 붙여넣는 것뿐 아니라 메타데이터를 안정적으로 파싱하고, 대규모 작업을 처리하며, 네트워크 변동 후에도 다운로드를 재개할 수 있는 것입니다. Gopeed은 이 전체 워크플로우를 다룹니다.",
        "직접 링크, BT, magnet 사이를 자주 전환하는 사용자에게 멀티 프로토콜 다운로더가 단독 마그넷 도구보다 실용적이고 워크플로우도 더 안정적입니다.",
      ],
      benefitsTitle: "사용자가 Gopeed을 마그넷 링크에 선택하는 이유",
      benefits: [
        "magnet 링크를 앱에 직접 붙여넣기 가능",
        "같은 클라이언트에서 HTTP와 ed2k 다운로드도 계속 처리",
        "데스크톱, 모바일, Web/Docker 환경 지원",
        "무료 오픈소스 프로젝트, 활발한 문서와 릴리즈",
      ],
      stepsTitle: "기본 마그넷 링크 흐름",
      steps: [
        "소스 페이지에서 magnet 마그넷 링크를 복사합니다.",
        "Gopeed에 붙여넣어 작업과 파일 목록을 파싱합니다.",
        "다운로드를 시작하고 전송이 중단된 경우 나중에 이어서 진행합니다.",
      ],
      ctaTitle: "Gopeed으로 마그넷 링크 다운로드",
      ctaDescription:
        "클라이언트를 다운로드하거나 플랫폼의 설치 가이드를 확인하세요.",
      primaryCtaLabel: "Gopeed 받기",
      secondaryCtaLabel: "설치 가이드",
    },
    "ed2k-downloader": {
      metaTitle: "ed2k 다운로더 (eDonkey 링크 지원) | Gopeed",
      metaDescription:
        "Gopeed은 무료 오픈소스 ed2k 다운로더로 ed2k, HTTP, BT, 마그넷 링크를 지원하며 데스크톱 및 모바일 플랫폼을 모두 지원합니다.",
      keywords: [
        "ed2k 다운로더",
        "ed2k 클라이언트",
        "edonkey 다운로더",
        "ed2k 링크 다운로드",
      ],
      eyebrow: "ed2k 다운로더",
      title: "레거시 및 멀티 프로토콜 워크플로우 지원 ed2k 다운로더",
      description:
        "Gopeed은 HTTP, BT, 마그넷 다운로드와 함께 ed2k 링크를 지원하여 여전히 오래된 링크 형식을 사용하는 사용자에게 유용합니다.",
      intro: [
        "ed2k를 검색하는 많은 사용자는 오늘날에도 정상적으로 작동하고 안전해 보이며 방치되지 않은 클라이언트를 찾고 있습니다. Gopeed은 더 현대적이고 지속적으로 유지보수되는 구현을 제공합니다.",
        "중요한 점은 ed2k가 Gopeed에서 고립된 기능이 아니라는 것입니다. 일반 파일 다운로드, BT 작업, 브라우저 트리거 다운로드와 같은 도구에서 함께 관리할 수 있습니다.",
      ],
      benefitsTitle: "ed2k 검색 의도에 대응하는 포인트",
      benefits: [
        "현대적인 클라이언트에서 ed2k 링크를 계속 지원",
        "많은 다운로드 디렉토리 사이트보다 더 신뢰할 수 있고 완전함",
        "하나의 앱으로 새로운/오래된 다운로드 프로토콜을 동시에 관리",
        "크로스 플랫폼 설치 패키지와 문서 지원",
      ],
      stepsTitle: "ed2k 사용 방법",
      steps: [
        "ed2k 링크를 복사합니다.",
        "Gopeed에 붙여넣어 다운로드 작업을 생성합니다.",
        "진행 상황을 확인하고 필요에 따라 일시정지 후 재개합니다.",
      ],
      ctaTitle: "ed2k 지원 클라이언트 다운로드",
      ctaDescription: "Gopeed을 설치하거나 플랫폼의 문서를 확인하세요.",
      primaryCtaLabel: "Gopeed 다운로드",
      secondaryCtaLabel: "문서 보기",
    },
  },
  es: {
    "download-manager": {
      metaTitle:
        "Gestor de descargas gratuito para Windows, macOS, Linux, Android e iOS | Gopeed",
      metaDescription:
        "Gopeed es un gestor de descargas gratuito y de código abierto con aceleración multiproceso, soporte para torrent, magnet y ed2k, y clientes de escritorio y móviles.",
      keywords: [
        "gestor de descargas",
        "gestor de descargas gratuito",
        "gestor de descargas de código abierto",
        "descargador multiproceso",
        "descargador multiplataforma",
      ],
      eyebrow: "Gestor de descargas",
      title:
        "Gestor de descargas gratuito para Windows, macOS, Linux, Android e iOS",
      description:
        "Gopeed es un gestor de descargas de código abierto diseñado para quienes necesitan una sola herramienta para archivos normales, tareas torrent, enlaces magnet y recursos ed2k.",
      intro: [
        "Cuando alguien busca un gestor de descargas gratuito, lo que realmente quiere es sencillo: descargas más rápidas, posibilidad de reanudar, menos limitaciones y soporte para más protocolos además de HTTP directo. Gopeed pertenece exactamente a esa categoría.",
        "Gopeed combina un motor de descarga multiproceso con soporte para BitTorrent, magnet y ed2k, de modo que la misma aplicación puede manejar paquetes de software, archivos grandes, metadatos de torrent y formatos de enlace heredados sin necesidad de cambiar de herramienta.",
      ],
      benefitsTitle:
        "Por qué este gestor de descargas es más fácil de posicionar",
      benefits: [
        "Gratuito y de código abierto, sin paywall para las funciones principales de descarga",
        "Soporta HTTP, HTTPS, torrent, magnet y ed2k en un solo cliente",
        "Disponible en Windows, macOS, Linux, Android, iOS, Web y Docker",
        "Incluye extensiones de navegador, soporte de API y descargas reanudables",
      ],
      stepsTitle: "Cómo se usa normalmente Gopeed",
      steps: [
        "Instala el cliente de escritorio o móvil para tu plataforma.",
        "Pega una URL de archivo, archivo torrent, enlace magnet o enlace ed2k en Gopeed.",
        "Inicia la tarea, supervisa el progreso y reanuda las descargas interrumpidas más adelante.",
      ],
      ctaTitle: "Descargar Gopeed",
      ctaDescription:
        "Elige tu plataforma o abre la guía de instalación para comenzar rápidamente.",
      primaryCtaLabel: "Descargar ahora",
      secondaryCtaLabel: "Guía de instalación",
    },
    "torrent-downloader": {
      metaTitle:
        "Descargador de Torrents / Descargador BT con soporte Magnet | Gopeed",
      metaDescription:
        "Gopeed es un descargador de torrents gratuito y de código abierto con soporte para BitTorrent, magnet, DHT y multiplataforma para Windows, macOS, Linux, Android e iOS.",
      keywords: [
        "descargador de torrents",
        "descargador bt",
        "descargador bittorrent",
        "cliente torrent",
        "descargador magnet",
      ],
      eyebrow: "Descargador de Torrents",
      title: "Descargador de Torrents / BT con soporte Magnet",
      description:
        "Gopeed se puede usar como descargador de BitTorrent tanto para archivos `.torrent` como para enlaces magnet, manteniendo también el soporte de descarga directa en la misma aplicación.",
      intro: [
        "Quienes buscan un descargador de BT o de torrents suelen necesitar un cliente ligero que abra archivos torrent rápido, obtenga metadatos de enlaces magnet y mantenga las tareas de larga duración estables. Gopeed está diseñado exactamente para ese flujo de trabajo.",
        "Como la aplicación también soporta HTTP y ed2k, los usuarios no necesitan un cliente torrent y otro descargador de archivos. Una sola herramienta puede manejar tanto la entrega directa de archivos como las descargas peer-to-peer.",
      ],
      benefitsTitle: "Lo que destaca esta página de torrents",
      benefits: [
        "Soporte del protocolo BitTorrent con manejo de enlaces magnet",
        "Útil para imágenes de software, archivos grandes y tareas multifichero",
        "Cliente multiplataforma en lugar de un flujo de trabajo torrent solo de escritorio",
        "Proyecto de código abierto con extensión de navegador y soporte de API",
      ],
      stepsTitle: "Flujo de trabajo típico de torrent",
      steps: [
        "Abre un archivo `.torrent` local o pega un URI magnet.",
        "Deja que Gopeed resuelva los metadatos y elige los archivos que deseas.",
        "Descarga, pausa, reanuda y gestiona las tareas desde la misma interfaz.",
      ],
      ctaTitle: "Comienza a descargar torrents con Gopeed",
      ctaDescription:
        "Instala el cliente o visita la documentación para ver las instrucciones específicas de cada plataforma.",
      primaryCtaLabel: "Descargar Gopeed",
      secondaryCtaLabel: "Ver documentación",
    },
    "magnet-link-downloader": {
      metaTitle: "Descargador de enlaces Magnet para tareas Torrent | Gopeed",
      metaDescription:
        "Descarga enlaces magnet con Gopeed, un descargador gratuito y de código abierto que soporta metadatos BitTorrent, reanudación y clientes multiplataforma.",
      keywords: [
        "descargador de enlaces magnet",
        "descargador magnet",
        "descargador de uri magnet",
        "descargador magnet torrent",
      ],
      eyebrow: "Descargador Magnet",
      title:
        "Descargador de enlaces Magnet para descargas rápidas multiplataforma",
      description:
        "Gopeed ofrece a los enlaces magnet un flujo de descarga limpio sin obligar a los usuarios a usar una herramienta separada para descargas directas de archivos.",
      intro: [
        "Un descargador de enlaces magnet necesita resolver los metadatos de pares de forma fiable, mantenerse estable en tareas grandes y facilitar la reanudación de trabajos interrumpidos. Gopeed cubre eso manteniendo la interfaz centrada en la gestión real de descargas.",
        "Esto es importante para usuarios que se mueven regularmente entre URLs de archivos directos, metadatos de torrent y URIs magnet. En lugar de elegir diferentes aplicaciones según el protocolo, pueden mantener el mismo flujo de trabajo dentro de Gopeed.",
      ],
      benefitsTitle: "Por qué los usuarios eligen Gopeed para enlaces magnet",
      benefits: [
        "Pega enlaces magnet directamente en la aplicación",
        "Sigue usando el mismo cliente para tareas HTTP, HTTPS y ed2k",
        "Disponible en escritorio, móvil y entornos web autoalojados",
        "Proyecto gratuito y de código abierto con documentación activa y actualizaciones",
      ],
      stepsTitle: "Flujo básico de enlace magnet",
      steps: [
        "Copia un enlace magnet de la página de origen.",
        "Pégalo en Gopeed para resolver la tarea y la lista de archivos.",
        "Inicia la descarga y continúa más tarde si la transferencia se interrumpe.",
      ],
      ctaTitle: "Usa Gopeed para enlaces magnet",
      ctaDescription:
        "Descarga el cliente o revisa la guía de instalación para tu plataforma.",
      primaryCtaLabel: "Obtener Gopeed",
      secondaryCtaLabel: "Guía de instalación",
    },
    "ed2k-downloader": {
      metaTitle: "Descargador ed2k para enlaces eDonkey | Gopeed",
      metaDescription:
        "Gopeed es un descargador ed2k gratuito y de código abierto con soporte multiprotocolo para HTTP, torrent y enlaces magnet en plataformas de escritorio y móviles.",
      keywords: [
        "descargador ed2k",
        "cliente ed2k",
        "descargador edonkey",
        "descarga de enlaces ed2k",
      ],
      eyebrow: "Descargador ed2k",
      title:
        "Descargador ed2k para flujos de trabajo heredados y multiprotocolo",
      description:
        "Gopeed soporta enlaces ed2k junto con descargas HTTP, torrent y magnet, lo cual es útil para usuarios que todavía trabajan con formatos de recursos antiguos.",
      intro: [
        "Muchas búsquedas de ed2k provienen de usuarios que intentan encontrar un cliente que siga soportando formatos de enlace antiguos sin parecer abandonado o inseguro. Gopeed ofrece a ese caso de uso una interfaz moderna y un proyecto activamente mantenido.",
        "Como Gopeed es multiprotocolo por diseño, ed2k no vive de forma aislada. Puede convivir junto a descargas de archivos estándar, tareas torrent y descargas activadas desde el navegador en la misma aplicación.",
      ],
      benefitsTitle: "Por qué esto importa para la intención de búsqueda ed2k",
      benefits: [
        "Soporte dedicado para enlaces ed2k en un cliente moderno",
        "Presentación del proyecto más segura que muchas páginas de directorios de descargas",
        "Una sola aplicación puede gestionar protocolos antiguos y nuevos juntos",
        "Recursos de instalación multiplataforma y documentación",
      ],
      stepsTitle: "Cómo usar enlaces ed2k en Gopeed",
      steps: [
        "Copia un enlace ed2k del sitio de origen.",
        "Pégalo en Gopeed para crear la tarea de descarga.",
        "Sigue el progreso, pausa cuando lo necesites y reanuda más tarde.",
      ],
      ctaTitle: "Descarga un cliente compatible con ed2k",
      ctaDescription:
        "Instala Gopeed o abre la documentación para elegir el paquete adecuado para tu plataforma.",
      primaryCtaLabel: "Descargar Gopeed",
      secondaryCtaLabel: "Ver documentación",
    },
  },
  pt: {
    "download-manager": {
      metaTitle:
        "Gerenciador de downloads gratuito para Windows, macOS, Linux, Android e iOS | Gopeed",
      metaDescription:
        "Gopeed é um gerenciador de downloads gratuito e de código aberto com aceleração multithread, suporte a torrent, magnet e ed2k, e clientes para desktop e dispositivos móveis.",
      keywords: [
        "gerenciador de downloads",
        "gerenciador de downloads gratuito",
        "gerenciador de downloads de código aberto",
        "downloader multithread",
        "downloader multiplataforma",
      ],
      eyebrow: "Gerenciador de Downloads",
      title:
        "Gerenciador de downloads gratuito para Windows, macOS, Linux, Android e iOS",
      description:
        "Gopeed é um gerenciador de downloads de código abierto feito para quem precisa de uma única ferramenta para arquivos normais, tarefas torrent, links magnet e recursos ed2k.",
      intro: [
        "Quando alguém procura um gerenciador de downloads gratuito, a necessidade real geralmente é simples: downloads mais rápidos, suporte a retomada, menos limitações e compatibilidade com mais protocolos além de HTTP direto. Gopeed pertence exatamente a essa categoria.",
        "Gopeed combina um motor de download multithread com suporte a BitTorrent, magnet e ed2k, de modo que o mesmo aplicativo pode lidar com pacotes de software, arquivos grandes, metadados de torrent e formatos de link legados sem trocar de ferramenta.",
      ],
      benefitsTitle:
        "Por que este gerenciador de downloads é mais fácil de posicionar",
      benefits: [
        "Gratuito e de código aberto, sem paywall para os recursos principais de download",
        "Suporta HTTP, HTTPS, torrent, magnet e ed2k em um único cliente",
        "Disponível no Windows, macOS, Linux, Android, iOS, Web e Docker",
        "Inclui extensões de navegador, suporte a API e downloads retomáveis",
      ],
      stepsTitle: "Como as pessoas normalmente usam o Gopeed",
      steps: [
        "Instale o cliente desktop ou mobile para sua plataforma.",
        "Cole uma URL de arquivo, arquivo torrent, link magnet ou link ed2k no Gopeed.",
        "Inicie a tarefa, acompanhe o progresso e retome downloads interrompidos depois.",
      ],
      ctaTitle: "Baixar Gopeed",
      ctaDescription:
        "Escolha sua plataforma ou abra o guia de instalação para começar rapidamente.",
      primaryCtaLabel: "Baixar agora",
      secondaryCtaLabel: "Guia de instalação",
    },
    "torrent-downloader": {
      metaTitle:
        "Downloader de Torrents / Downloader BT com suporte Magnet | Gopeed",
      metaDescription:
        "Gopeed é um downloader de torrents gratuito e de código aberto com suporte a BitTorrent, magnet, DHT e multiplataforma para Windows, macOS, Linux, Android e iOS.",
      keywords: [
        "downloader de torrents",
        "downloader bt",
        "downloader bittorrent",
        "cliente torrent",
        "downloader magnet",
      ],
      eyebrow: "Downloader de Torrents",
      title: "Downloader de Torrents / BT com suporte Magnet",
      description:
        "Gopeed pode ser usado como um downloader BitTorrent tanto para arquivos `.torrent` quanto para links magnet, mantendo também o suporte a download direto no mesmo aplicativo.",
      intro: [
        "Quem procura um downloader de BT ou de torrents geralmente precisa de um cliente leve que abra arquivos torrent rapidamente, obtenha metadados de links magnet e mantenha tarefas de longa duração estáveis. Gopeed foi projetado exatamente para esse fluxo de trabalho.",
        "Como o aplicativo também suporta HTTP e ed2k, os usuários não precisam de um cliente torrent e outro downloader de arquivos. Uma única ferramenta pode lidar tanto com entrega direta de arquivos quanto com downloads peer-to-peer.",
      ],
      benefitsTitle: "O que esta página de torrent destaca",
      benefits: [
        "Suporte ao protocolo BitTorrent com manipulação de links magnet",
        "Útil para imagens de software, arquivos grandes e tarefas multifile",
        "Cliente multiplataforma em vez de um fluxo de trabalho torrent apenas para desktop",
        "Projeto de código aberto com extensão de navegador e suporte a API",
      ],
      stepsTitle: "Fluxo de trabalho típico de torrent",
      steps: [
        "Abra um arquivo `.torrent` local ou cole um URI magnet.",
        "Deixe o Gopeed resolver os metadados e escolha os arquivos desejados.",
        "Baixe, pause, retome e gerencie tarefas pela mesma interface.",
      ],
      ctaTitle: "Comece a baixar torrents com o Gopeed",
      ctaDescription:
        "Instale o cliente ou visite a documentação para ver instruções específicas da plataforma.",
      primaryCtaLabel: "Baixar Gopeed",
      secondaryCtaLabel: "Ver documentação",
    },
    "magnet-link-downloader": {
      metaTitle: "Downloader de links Magnet para tarefas Torrent | Gopeed",
      metaDescription:
        "Baixe links magnet com o Gopeed, um downloader gratuito e de código aberto que suporta metadados BitTorrent, retomada e clientes multiplataforma.",
      keywords: [
        "downloader de links magnet",
        "downloader magnet",
        "downloader de uri magnet",
        "downloader magnet torrent",
      ],
      eyebrow: "Downloader Magnet",
      title:
        "Downloader de links Magnet para downloads rápidos multiplataforma",
      description:
        "Gopeed oferece aos links magnet um fluxo de download limpo sem forçar os usuários a usar uma ferramenta separada para downloads diretos de arquivos.",
      intro: [
        "Um downloader de links magnet precisa resolver metadados de pares de forma confiável, permanecer estável em tarefas grandes e facilitar a retomada de trabalhos interrompidos. Gopeed cobre isso mantendo a interface focada na gestão real de downloads.",
        "Isso é importante para usuários que alternam regularmente entre URLs de arquivos diretos, metadados de torrent e URIs magnet. Em vez de escolher aplicativos diferentes por protocolo, podem manter o mesmo fluxo de trabalho dentro do Gopeed.",
      ],
      benefitsTitle: "Por que os usuários escolhem o Gopeed para links magnet",
      benefits: [
        "Cole links magnet diretamente no aplicativo",
        "Continue usando o mesmo cliente para tarefas HTTP, HTTPS e ed2k",
        "Disponível em desktop, mobile e ambientes web auto-hospedados",
        "Projeto gratuito e de código aberto com documentação ativa e lançamentos frequentes",
      ],
      stepsTitle: "Fluxo básico de link magnet",
      steps: [
        "Copie um link magnet da página de origem.",
        "Cole no Gopeed para resolver a tarefa e a lista de arquivos.",
        "Inicie o download e continue depois se a transferência for interrompida.",
      ],
      ctaTitle: "Use o Gopeed para links magnet",
      ctaDescription:
        "Baixe o cliente ou consulte o guia de instalação para sua plataforma.",
      primaryCtaLabel: "Obter Gopeed",
      secondaryCtaLabel: "Guia de instalação",
    },
    "ed2k-downloader": {
      metaTitle: "Downloader ed2k para links eDonkey | Gopeed",
      metaDescription:
        "Gopeed é um downloader ed2k gratuito e de código aberto com suporte multiprotocolo para HTTP, torrent e links magnet em plataformas desktop e móveis.",
      keywords: [
        "downloader ed2k",
        "cliente ed2k",
        "downloader edonkey",
        "download de link ed2k",
      ],
      eyebrow: "Downloader ed2k",
      title: "Downloader ed2k para fluxos de trabalho legados e multiprotocolo",
      description:
        "Gopeed suporta links ed2k junto com downloads HTTP, torrent e magnet, o que é útil para usuários que ainda trabalham com formatos de recursos antigos.",
      intro: [
        "Muitas buscas por ed2k vêm de usuários tentando encontrar um cliente que ainda suporte formatos de link antigos sem parecer abandonado ou inseguro. Gopeed oferece a esse caso de uso uma interface moderna e um projeto com manutenção ativa.",
        "Como o Gopeed é multiprotocolo por design, o ed2k não vive isolado. Pode coexistir com downloads de arquivos padrão, tarefas torrent e downloads acionados pelo navegador no mesmo aplicativo.",
      ],
      benefitsTitle: "Por que isso importa para a intenção de busca ed2k",
      benefits: [
        "Suporte dedicado a links ed2k em um cliente moderno",
        "Apresentação de projeto mais segura do que muitas páginas de diretórios de download",
        "Um único aplicativo pode gerenciar protocolos antigos e novos juntos",
        "Pacotes de instalação multiplataforma e documentação disponível",
      ],
      stepsTitle: "Como usar links ed2k no Gopeed",
      steps: [
        "Copie um link ed2k do site de origem.",
        "Cole no Gopeed para criar a tarefa de download.",
        "Acompanhe o progresso, pause quando necessário e retome depois.",
      ],
      ctaTitle: "Baixe um cliente compatível com ed2k",
      ctaDescription:
        "Instale o Gopeed ou abra a documentação para escolher o pacote certo para sua plataforma.",
      primaryCtaLabel: "Baixar Gopeed",
      secondaryCtaLabel: "Ver documentação",
    },
  },
  fr: {
    "download-manager": {
      metaTitle:
        "Gestionnaire de téléchargement gratuit pour Windows, macOS, Linux, Android et iOS | Gopeed",
      metaDescription:
        "Gopeed est un gestionnaire de téléchargement gratuit et open source avec accélération multithread, prise en charge de torrent, magnet et ed2k, et clients desktop et mobiles.",
      keywords: [
        "gestionnaire de téléchargement",
        "gestionnaire de téléchargement gratuit",
        "gestionnaire de téléchargement open source",
        "téléchargeur multithread",
        "téléchargeur multiplateforme",
      ],
      eyebrow: "Gestionnaire de téléchargement",
      title:
        "Gestionnaire de téléchargement gratuit pour Windows, macOS, Linux, Android et iOS",
      description:
        "Gopeed est un gestionnaire de téléchargement open source conçu pour ceux qui ont besoin d'un seul outil pour les fichiers classiques, les tâches torrent, les liens magnet et les ressources ed2k.",
      intro: [
        "Lorsqu'une personne recherche un gestionnaire de téléchargement gratuit, le besoin réel est généralement simple : des téléchargements plus rapides, la reprise possible, moins de limitations et la prise en charge de davantage de protocoles au-delà du HTTP direct. Gopeed appartient exactement à cette catégorie.",
        "Gopeed combine un moteur de téléchargement multithread avec la prise en charge de BitTorrent, magnet et ed2k, de sorte que la même application peut gérer les paquets logiciels, les gros fichiers, les métadonnées torrent et les formats de lien hérités sans changer d'outil.",
      ],
      benefitsTitle:
        "Pourquoi ce gestionnaire de téléchargement est plus facile à positionner",
      benefits: [
        "Gratuit et open source, sans paywall pour les fonctions principales de téléchargement",
        "Prend en charge HTTP, HTTPS, torrent, magnet et ed2k dans un seul client",
        "Disponible sur Windows, macOS, Linux, Android, iOS, Web et Docker",
        "Inclut des extensions de navigateur, la prise en charge d'API et les téléchargements reprenez",
      ],
      stepsTitle: "Comment les gens utilisent généralement Gopeed",
      steps: [
        "Installez le client desktop ou mobile pour votre plateforme.",
        "Collez une URL de fichier, un fichier torrent, un lien magnet ou un lien ed2k dans Gopeed.",
        "Démarrez la tâche, suivez la progression et reprenez les téléchargements interrompus ultérieurement.",
      ],
      ctaTitle: "Télécharger Gopeed",
      ctaDescription:
        "Choisissez votre plateforme ou ouvrez le guide d'installation pour démarrer rapidement.",
      primaryCtaLabel: "Télécharger maintenant",
      secondaryCtaLabel: "Guide d'installation",
    },
    "torrent-downloader": {
      metaTitle:
        "Téléchargeur de torrents / Téléchargeur BT avec prise en charge Magnet | Gopeed",
      metaDescription:
        "Gopeed est un téléchargeur de torrents gratuit et open source avec prise en charge de BitTorrent, magnet, DHT et multiplateforme pour Windows, macOS, Linux, Android et iOS.",
      keywords: [
        "téléchargeur de torrents",
        "téléchargeur bt",
        "téléchargeur bittorrent",
        "client torrent",
        "téléchargeur magnet",
      ],
      eyebrow: "Téléchargeur de torrents",
      title: "Téléchargeur de torrents / BT avec prise en charge Magnet",
      description:
        "Gopeed peut être utilisé comme téléchargeur BitTorrent pour les fichiers `.torrent` et les liens magnet, tout en conservant le téléchargement direct dans la même application.",
      intro: [
        "Les recherches de téléchargeur BT ou de torrents cherchent généralement un client léger qui ouvre rapidement les fichiers torrent, récupère les métadonnées des liens magnet et maintient les tâches longue durée stables. Gopeed est conçu exactement pour ce flux de travail.",
        "Comme l'application prend également en charge HTTP et ed2k, les utilisateurs n'ont pas besoin d'un client torrent et d'un autre téléchargeur de fichiers. Un seul outil peut gérer à la fois la livraison directe de fichiers et les téléchargements peer-to-peer.",
      ],
      benefitsTitle: "Ce que cette page torrent met en avant",
      benefits: [
        "Prise en charge du protocole BitTorrent avec gestion des liens magnet",
        "Utile pour les images logicielles, les gros fichiers et les tâches multi-fichiers",
        "Client multiplateforme au lieu d'un flux de travail torrent limité au desktop",
        "Projet open source avec extension de navigateur et prise en charge d'API",
      ],
      stepsTitle: "Flux de travail torrent typique",
      steps: [
        "Ouvrez un fichier `.torrent` local ou collez un URI magnet.",
        "Laissez Gopeed résoudre les métadonnées et choisissez les fichiers souhaités.",
        "Téléchargez, mettez en pause, reprenez et gérez les tâches depuis la même interface.",
      ],
      ctaTitle: "Commencez à télécharger des torrents avec Gopeed",
      ctaDescription:
        "Installez le client ou consultez la documentation pour les instructions spécifiques à chaque plateforme.",
      primaryCtaLabel: "Télécharger Gopeed",
      secondaryCtaLabel: "Voir la documentation",
    },
    "magnet-link-downloader": {
      metaTitle: "Téléchargeur de liens Magnet pour tâches Torrent | Gopeed",
      metaDescription:
        "Téléchargez des liens magnet avec Gopeed, un téléchargeur gratuit et open source qui prend en charge les métadonnées BitTorrent, la reprise et les clients multiplateformes.",
      keywords: [
        "téléchargeur de liens magnet",
        "téléchargeur magnet",
        "téléchargeur d'uri magnet",
        "téléchargeur magnet torrent",
      ],
      eyebrow: "Téléchargeur Magnet",
      title:
        "Téléchargeur de liens Magnet pour des téléchargements rapides multiplateformes",
      description:
        "Gopeed offre aux liens magnet un flux de téléchargement épuré sans forcer les utilisateurs à recourir à un outil séparé pour les téléchargements directs de fichiers.",
      intro: [
        "Un téléchargeur de liens magnet doit résoudre les métadonnées des pairs de manière fiable, rester stable sur les grosses tâches et faciliter la reprise des travaux interrompus. Gopeed couvre ces besoins tout en gardant l'interface centrée sur la gestion réelle des téléchargements.",
        "Ceci est important pour les utilisateurs qui passent régulièrement d'URL de fichiers directs aux métadonnées torrent et aux URI magnet. Au lieu de choisir différentes applications selon le protocole, ils peuvent garder le même flux de travail dans Gopeed.",
      ],
      benefitsTitle:
        "Pourquoi les utilisateurs choisissent Gopeed pour les liens magnet",
      benefits: [
        "Collez des liens magnet directement dans l'application",
        "Continuez à utiliser le même client pour les tâches HTTP, HTTPS et ed2k",
        "Disponible sur desktop, mobile et environnements web auto-hébergés",
        "Projet gratuit et open source avec une documentation active et des mises à jour régulières",
      ],
      stepsTitle: "Flux basique de lien magnet",
      steps: [
        "Copiez un lien magnet depuis la page source.",
        "Collez-le dans Gopeed pour résoudre la tâche et la liste de fichiers.",
        "Démarrez le téléchargement et reprenez plus tard si le transfert est interrompu.",
      ],
      ctaTitle: "Utilisez Gopeed pour les liens magnet",
      ctaDescription:
        "Téléchargez le client ou consultez le guide d'installation pour votre plateforme.",
      primaryCtaLabel: "Obtenir Gopeed",
      secondaryCtaLabel: "Guide d'installation",
    },
    "ed2k-downloader": {
      metaTitle: "Téléchargeur ed2k pour liens eDonkey | Gopeed",
      metaDescription:
        "Gopeed est un téléchargeur ed2k gratuit et open source avec prise en charge multiprotocole de HTTP, torrent et liens magnet sur les plateformes desktop et mobiles.",
      keywords: [
        "téléchargeur ed2k",
        "client ed2k",
        "téléchargeur edonkey",
        "téléchargement de lien ed2k",
      ],
      eyebrow: "Téléchargeur ed2k",
      title:
        "Téléchargeur ed2k pour flux de travail hérités et multiprotocoles",
      description:
        "Gopeed prend en charge les liens ed2k alongside les téléchargements HTTP, torrent et magnet, ce qui est utile pour les utilisateurs qui travaillent encore avec des formats de ressources anciens.",
      intro: [
        "De nombreuses recherches ed2k proviennent d'utilisateurs qui essaient de trouver un client qui prend encore en charge les anciens formats de lien sans paraître abandonné ou peu sûr. Gopeed offre à ce cas d'usage une interface moderne et un projet activement maintenu.",
        "Comme Gopeed est multiprotocole par conception, ed2k ne vit pas de manière isolée. Il peut cohabiter avec les téléchargements de fichiers standards, les tâches torrent et les téléchargements déclenchés par le navigateur dans la même application.",
      ],
      benefitsTitle:
        "Pourquoi c'est important pour l'intention de recherche ed2k",
      benefits: [
        "Prise en charge dédiée des liens ed2k dans un client moderne",
        "Présentation du projet plus sûre que de nombreuses pages de répertoires de téléchargement",
        "Une seule application peut gérer les anciens et nouveaux protocoles ensemble",
        "Ressources d'installation multiplateformes et documentation disponible",
      ],
      stepsTitle: "Comment utiliser les liens ed2k dans Gopeed",
      steps: [
        "Copiez un lien ed2k depuis le site source.",
        "Collez-le dans Gopeed pour créer la tâche de téléchargement.",
        "Suivez la progression, mettez en pause si nécessaire et reprenez plus tard.",
      ],
      ctaTitle: "Téléchargez un client compatible ed2k",
      ctaDescription:
        "Installez Gopeed ou ouvrez la documentation pour choisir le bon paquet pour votre plateforme.",
      primaryCtaLabel: "Télécharger Gopeed",
      secondaryCtaLabel: "Voir la documentation",
    },
  },
  de: {
    "download-manager": {
      metaTitle:
        "Kostenloser Download-Manager für Windows, macOS, Linux, Android und iOS | Gopeed",
      metaDescription:
        "Gopeed ist ein kostenloser Open-Source-Download-Manager mit Multithread-Beschleunigung, Torrent-, Magnet- und ed2k-Unterstützung sowie Desktop- und Mobile-Clients.",
      keywords: [
        "Download-Manager",
        "kostenloser Download-Manager",
        "Open-Source-Download-Manager",
        "Multithread-Downloader",
        "plattformübergreifender Downloader",
      ],
      eyebrow: "Download-Manager",
      title:
        "Kostenloser Download-Manager für Windows, macOS, Linux, Android und iOS",
      description:
        "Gopeed ist ein Open-Source-Download-Manager für alle, die ein einziges Werkzeug für normale Dateien, Torrent-Aufgaben, Magnet-Links und ed2k-Ressourcen benötigen.",
      intro: [
        "Wenn jemand nach einem kostenlosen Download-Manager sucht, ist das eigentliche Anliegen meist einfach: schnellere Downloads, Fortsetzungsmöglichkeit, weniger Einschränkungen und Unterstützung für mehr Protokolle als nur direktes HTTP. Genau in diese Kategorie fällt Gopeed.",
        "Gopeed kombiniert eine Multithread-Download-Engine mit BitTorrent-, Magnet- und ed2k-Unterstützung, sodass dieselbe App Software-Pakete, große Archive, Torrent-Metadaten und ältere Link-Formate ohne Werkzeugwechsel verarbeiten kann.",
      ],
      benefitsTitle: "Warum dieser Download-Manager leichter zu ranken ist",
      benefits: [
        "Kostenlos und Open Source, keine Paywall für die Kern-Download-Funktionen",
        "Unterstützt HTTP, HTTPS, Torrent, Magnet und ed2k in einem Client",
        "Verfügbar auf Windows, macOS, Linux, Android, iOS, Web und Docker",
        "Enthält Browser-Erweiterungen, API-Unterstützung und wiederaufnehmbare Downloads",
      ],
      stepsTitle: "Wie Gopeed typischerweise verwendet wird",
      steps: [
        "Installieren Sie den Desktop- oder Mobile-Client für Ihre Plattform.",
        "Fügen Sie eine Datei-URL, eine Torrent-Datei, einen Magnet-Link oder einen ed2k-Link in Gopeed ein.",
        "Starten Sie die Aufgabe, überwachen Sie den Fortschritt und setzen Sie unterbrochene Downloads später fort.",
      ],
      ctaTitle: "Gopeed herunterladen",
      ctaDescription:
        "Wählen Sie Ihre Plattform oder öffnen Sie die Installationsanleitung für einen schnellen Einstieg.",
      primaryCtaLabel: "Jetzt herunterladen",
      secondaryCtaLabel: "Installationsanleitung",
    },
    "torrent-downloader": {
      metaTitle:
        "Torrent-Downloader / BT-Downloader mit Magnet-Unterstützung | Gopeed",
      metaDescription:
        "Gopeed ist ein kostenloser Open-Source-Torrent-Downloader mit BitTorrent-, Magnet-, DHT- und plattformübergreifender Unterstützung für Windows, macOS, Linux, Android und iOS.",
      keywords: [
        "Torrent-Downloader",
        "BT-Downloader",
        "BitTorrent-Downloader",
        "Torrent-Client",
        "Magnet-Downloader",
      ],
      eyebrow: "Torrent-Downloader",
      title: "Torrent / BT-Downloader mit Magnet-Unterstützung",
      description:
        "Gopeed kann als BitTorrent-Downloader sowohl für `.torrent`-Dateien als auch für Magnet-Links verwendet werden, wobei die direkte Download-Unterstützung in derselben Anwendung erhalten bleibt.",
      intro: [
        "Wer nach einem BT- oder Torrent-Downloader sucht, braucht in der Regel einen schlanken Client, der Torrent-Dateien schnell öffnet, Metadaten von Magnet-Links abruft und langlaufende Aufgaben stabil hält. Gopeed ist genau für diesen Workflow konzipiert.",
        "Da die App auch HTTP und ed2k unterstützt, benötigen Benutzer keinen separaten Torrent-Client und einen weiteren Datei-Downloader. Ein einziges Werkzeug kann sowohl direkte Dateiübertragung als auch Peer-to-Peer-Downloads bewältigen.",
      ],
      benefitsTitle: "Was diese Torrent-Seite hervorhebt",
      benefits: [
        "BitTorrent-Protokollunterstützung mit Magnet-Link-Verarbeitung",
        "Nützlich für Software-Images, große Archive und Multi-Datei-Aufgaben",
        "Plattformübergreifender Client statt eines reinen Desktop-Torrent-Workflows",
        "Open-Source-Projekt mit Browser-Erweiterung und API-Unterstützung",
      ],
      stepsTitle: "Typischer Torrent-Workflow",
      steps: [
        "Öffnen Sie eine lokale `.torrent`-Datei oder fügen Sie eine Magnet-URI ein.",
        "Lassen Sie Gopeed die Metadaten auflösen und wählen Sie die gewünschten Dateien aus.",
        "Laden Sie herunter, pausieren Sie, setzen Sie fort und verwalten Sie Aufgaben über dieselbe Oberfläche.",
      ],
      ctaTitle: "Starten Sie Torrent-Downloads mit Gopeed",
      ctaDescription:
        "Installieren Sie den Client oder besuchen Sie die Dokumentation für plattformspezifische Anleitungen.",
      primaryCtaLabel: "Gopeed herunterladen",
      secondaryCtaLabel: "Dokumentation anzeigen",
    },
    "magnet-link-downloader": {
      metaTitle: "Magnet-Link-Downloader für Torrent-Aufgaben | Gopeed",
      metaDescription:
        "Laden Sie Magnet-Links mit Gopeed herunter, einem kostenlosen Open-Source-Downloader, der BitTorrent-Metadaten, Wiederaufnahme und plattformübergreifende Clients unterstützt.",
      keywords: [
        "Magnet-Link-Downloader",
        "Magnet-Downloader",
        "Magnet-URI-Downloader",
        "Torrent-Magnet-Downloader",
      ],
      eyebrow: "Magnet-Downloader",
      title:
        "Magnet-Link-Downloader für schnelle plattformübergreifende Downloads",
      description:
        "Gopeed bietet Magnet-Links einen sauberen Download-Workflow, ohne Benutzer zu einem separaten Werkzeug für direkte Datei-Downloads zu zwingen.",
      intro: [
        "Ein Magnet-Link-Downloader muss Peer-Metadaten zuverlässig auflösen, bei großen Aufgaben stabil bleiben und die Fortsetzung unterbrochener Arbeiten erleichtern. Gopeed deckt dies ab und hält die Oberfläche auf echtes Download-Management fokussiert.",
        "Dies ist wichtig für Benutzer, die regelmäßig zwischen direkten Datei-URLs, Torrent-Metadaten und Magnet-URIs wechseln. Anstatt je nach Protokoll verschiedene Apps zu wählen, können sie denselben Workflow in Gopeed beibehalten.",
      ],
      benefitsTitle: "Warum Benutzer Gopeed für Magnet-Links wählen",
      benefits: [
        "Magnet-Links direkt in die App einfügen",
        "Weiterhin denselben Client für HTTP-, HTTPS- und ed2k-Aufgaben nutzen",
        "Verfügbar auf Desktop, Mobile und selbst gehosteten Web-Umgebungen",
        "Kostenloses Open-Source-Projekt mit aktiver Dokumentation und regelmäßigen Releases",
      ],
      stepsTitle: "Grundlegender Magnet-Link-Ablauf",
      steps: [
        "Kopieren Sie einen Magnet-Link von der Quellseite.",
        "Fügen Sie ihn in Gopeed ein, um die Aufgabe und die Dateiliste aufzulösen.",
        "Starten Sie den Download und setzen Sie ihn später fort, falls die Übertragung unterbrochen wurde.",
      ],
      ctaTitle: "Gopeed für Magnet-Links nutzen",
      ctaDescription:
        "Laden Sie den Client herunter oder lesen Sie die Installationsanleitung für Ihre Plattform.",
      primaryCtaLabel: "Gopeed erhalten",
      secondaryCtaLabel: "Installationsanleitung",
    },
    "ed2k-downloader": {
      metaTitle: "ed2k-Downloader für eDonkey-Links | Gopeed",
      metaDescription:
        "Gopeed ist ein kostenloser Open-Source-ed2k-Downloader mit Multiprotokoll-Unterstützung für HTTP, Torrent und Magnet-Links auf Desktop- und Mobilplattformen.",
      keywords: [
        "ed2k-Downloader",
        "ed2k-Client",
        "eDonkey-Downloader",
        "ed2k-Link-Download",
      ],
      eyebrow: "ed2k-Downloader",
      title: "ed2k-Downloader für Legacy- und Multiprotokoll-Workflows",
      description:
        "Gopeed unterstützt ed2k-Links neben HTTP-, Torrent- und Magnet-Downloads, was für Benutzer nützlich ist, die noch mit älteren Ressourcenformaten arbeiten.",
      intro: [
        "Viele ed2k-Suchanfragen stammen von Benutzern, die einen Client suchen, der ältere Link-Formate noch unterstützt, ohne vernachlässigt oder unsicher zu wirken. Gopeed bietet diesem Anwendungsfall eine moderne Oberfläche und ein aktiv gepflegtes Projekt.",
        "Da Gopeed von Grund auf multiprotokollfähig ist, existiert ed2k nicht isoliert. Es kann alongside Standard-Datei-Downloads, Torrent-Aufgaben und browsergesteuerten Downloads in derselben Anwendung verwaltet werden.",
      ],
      benefitsTitle: "Warum dies für die ed2k-Suchintention wichtig ist",
      benefits: [
        "Dedizierte Unterstützung für ed2k-Links in einem modernen Client",
        "Sicherere Projektdarstellung als viele spärliche Download-Verzeichnisseiten",
        "Eine einzige App kann alte und neue Protokolle gemeinsam verwalten",
        "Plattformübergreifende Installationspakete und Dokumentation verfügbar",
      ],
      stepsTitle: "So verwenden Sie ed2k-Links in Gopeed",
      steps: [
        "Kopieren Sie einen ed2k-Link von der Quellseite.",
        "Fügen Sie ihn in Gopeed ein, um die Download-Aufgabe zu erstellen.",
        "Verfolgen Sie den Fortschritt, pausieren Sie bei Bedarf und setzen Sie später fort.",
      ],
      ctaTitle: "Laden Sie einen ed2k-fähigen Client herunter",
      ctaDescription:
        "Installieren Sie Gopeed oder öffnen Sie die Dokumentation, um das richtige Paket für Ihre Plattform zu wählen.",
      primaryCtaLabel: "Gopeed herunterladen",
      secondaryCtaLabel: "Dokumentation anzeigen",
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
  ja: [
    {
      question: "どのプロトコルに対応していますか？",
      answer:
        "GopeedはHTTP、HTTPS、BitTorrent、マグネットリンク、ed2kリンクに対応しています。",
    },
    {
      question: "ブラウザのダウンロードを傍受できますか？",
      answer:
        "はい。Gopeedブラウザ拡張機能をインストールすると、ブラウザのダウンロードリンクを自動的にキャプチャします。",
    },
    {
      question: "トレントやマグネットリンクのダウンロードが遅い場合は？",
      answer:
        "BTのダウンロード速度はシーダーの数、Trackerの状態、ネットワーク環境に依存します。Trackerの追加、ファイアウォールとポートフォワーディングの確認、DHTの有効化をお試しください。",
    },
    {
      question: "プロキシ設定に対応していますか？",
      answer:
        "はい。Gopeedの設定でHTTP、SOCKS5プロキシまたはシステムプロキシを設定できます。直接接続が制限されている場合や、特定のネットワーク経由でダウンロードする場合に便利です。",
    },
    {
      question: "無料ですか？有料機能はありますか？",
      answer:
        "Gopeedは完全に無料でオープンソースです。すべてのコアダウンロード機能が無料で利用でき、広告や隠れた課金制限はありません。",
    },
    {
      question: "ダウンロードをリモートで管理できますか？",
      answer:
        "はい。GopeedはRESTful APIとWebインターフェースを提供しています。APIを通じてリモートでダウンロードタスクを管理したり、同じネットワーク上の別のデバイスからWeb UIにアクセスできます。",
    },
  ],
  ko: [
    {
      question: "어떤 프로토콜을 지원하나요?",
      answer:
        "Gopeed은 HTTP, HTTPS, BitTorrent, 마그넷 링크, ed2k 링크를 지원합니다.",
    },
    {
      question: "브라우저 다운로드를 가로챌 수 있나요?",
      answer:
        "네. Gopeed 브라우저 확장 프로그램을 설치하면 브라우저의 다운로드 링크를 자동으로 캡처합니다.",
    },
    {
      question: "토렌트나 마그넷 링크 다운로드가 느린 경우 어떻게 하나요?",
      answer:
        "BT 다운로드 속도는 시더 수, Tracker 상태, 네트워크 환경에 따라 다릅니다. Tracker 추가, 방화벽 및 포트 포워딩 확인, DHT 활성화를 시도해 보세요.",
    },
    {
      question: "프록시 설정을 지원하나요?",
      answer:
        "네. Gopeed 설정에서 HTTP, SOCKS5 프록시 또는 시스템 프록시를 구성할 수 있습니다. 직접 연결이 제한되거나 특정 네트워크를 통해 다운로드해야 하는 경우에 유용합니다.",
    },
    {
      question: "무료인가요? 유료 기능이 있나요?",
      answer:
        "Gopeed은 완전히 무료이며 오픈소스입니다. 모든 핵심 다운로드 기능을 무료로 사용할 수 있으며, 광고나 숨겨진 유료 제한이 없습니다.",
    },
    {
      question: "다운로드를 원격으로 관리할 수 있나요?",
      answer:
        "네. Gopeed은 RESTful API와 웹 인터페이스를 제공합니다. API를 통해 원격으로 다운로드 작업을 관리하거나, 같은 네트워크의 다른 기기에서 웹 UI에 접속할 수 있습니다.",
    },
  ],
  es: [
    {
      question: "¿Qué protocolos son compatibles?",
      answer:
        "Gopeed es compatible con HTTP, HTTPS, BitTorrent, enlaces magnet y enlaces ed2k.",
    },
    {
      question: "¿Puede interceptar las descargas del navegador?",
      answer:
        "Sí. Instala la extensión de navegador de Gopeed y capturará automáticamente los enlaces de descarga del navegador.",
    },
    {
      question: "¿Por qué mi descarga de torrent o magnet es lenta?",
      answer:
        "La velocidad de descarga BT depende de la cantidad de seeders, el estado de los trackers y tu entorno de red. Intenta añadir más trackers, verificar el firewall y la configuración de puertos, y asegurarte de que DHT esté activado.",
    },
    {
      question: "¿Es compatible con la configuración de proxy?",
      answer:
        "Sí. Puedes configurar proxies HTTP, SOCKS5 o usar el proxy del sistema en la configuración de Gopeed. Es útil cuando las conexiones directas están limitadas o necesitas enrutar las descargas a través de una red específica.",
    },
    {
      question: "¿Es gratuito? ¿Hay funciones de pago?",
      answer:
        "Gopeed es completamente gratuito y de código abierto. Todas las funciones de descarga principales están disponibles sin costo, sin anuncios ni paywalls ocultos.",
    },
    {
      question: "¿Puedo gestionar las descargas de forma remota?",
      answer:
        "Sí. Gopeed proporciona una API RESTful y una interfaz web. Puedes gestionar las tareas de descarga de forma remota a través de la API o acceder a la interfaz web desde otro dispositivo en la misma red.",
    },
  ],
  pt: [
    {
      question: "Quais protocolos são suportados?",
      answer:
        "O Gopeed suporta HTTP, HTTPS, BitTorrent, links magnet e links ed2k.",
    },
    {
      question: "É possível interceptar downloads do navegador?",
      answer:
        "Sim. Instale a extensão de navegador do Gopeed e ela capturará automaticamente os links de download do navegador.",
    },
    {
      question: "Por que meu download de torrent ou magnet está lento?",
      answer:
        "A velocidade de download BT depende do número de seeders, do status dos trackers e do seu ambiente de rede. Tente adicionar mais trackers, verificar as configurações de firewall e encaminhamento de porta, e certifique-se de que o DHT está ativado.",
    },
    {
      question: "Suporta configuração de proxy?",
      answer:
        "Sim. Você pode configurar proxies HTTP, SOCKS5 ou usar o proxy do sistema nas configurações do Gopeed. Útil quando conexões diretas são limitadas ou quando você precisa rotear downloads por uma rede específica.",
    },
    {
      question: "É gratuito? Existem recursos pagos?",
      answer:
        "O Gopeed é completamente gratuito e de código aberto. Todos os recursos principais de download estão disponíveis sem custo, sem anúncios e sem paywalls ocultos.",
    },
    {
      question: "Posso gerenciar downloads remotamente?",
      answer:
        "Sim. O Gopeed fornece uma API RESTful e uma interface web. Você pode gerenciar tarefas de download remotamente pela API ou acessar a interface web de outro dispositivo na mesma rede.",
    },
  ],
  fr: [
    {
      question: "Quels protocoles sont pris en charge ?",
      answer:
        "Gopeed prend en charge HTTP, HTTPS, BitTorrent, les liens magnet et les liens ed2k.",
    },
    {
      question: "Peut-il intercepter les téléchargements du navigateur ?",
      answer:
        "Oui. Installez l'extension de navigateur Gopeed et elle capturera automatiquement les liens de téléchargement.",
    },
    {
      question: "Pourquoi mon téléchargement torrent ou magnet est-il lent ?",
      answer:
        "La vitesse de téléchargement BT dépend du nombre de seeders, de l'état des trackers et de votre environnement réseau. Essayez d'ajouter plus de trackers, de vérifier le pare-feu et le transfert de port, et de vous assurer que DHT est activé.",
    },
    {
      question: "Prend-il en charge les paramètres de proxy ?",
      answer:
        "Oui. Vous pouvez configurer des proxies HTTP, SOCKS5 ou utiliser le proxy système dans les paramètres de Gopeed. Utile lorsque les connexions directes sont limitées ou pour acheminer les téléchargements via un réseau spécifique.",
    },
    {
      question: "Est-ce gratuit ? Y a-t-il des fonctionnalités payantes ?",
      answer:
        "Gopeed est entièrement gratuit et open source. Toutes les fonctions de téléchargement principales sont disponibles gratuitement, sans publicité ni paywall caché.",
    },
    {
      question: "Puis-je gérer les téléchargements à distance ?",
      answer:
        "Oui. Gopeed fournit une API RESTful et une interface web. Vous pouvez gérer les tâches de téléchargement à distance via l'API ou accéder à l'interface web depuis un autre appareil sur le même réseau.",
    },
  ],
  de: [
    {
      question: "Welche Protokolle werden unterstützt?",
      answer:
        "Gopeed unterstützt HTTP, HTTPS, BitTorrent, Magnet-Links und ed2k-Links.",
    },
    {
      question: "Können Browser-Downloads abgefangen werden?",
      answer:
        "Ja. Installieren Sie die Gopeed-Browser-Erweiterung und sie wird Download-Links automatisch erfassen.",
    },
    {
      question: "Warum ist mein Torrent- oder Magnet-Download langsam?",
      answer:
        "Die BT-Download-Geschwindigkeit hängt von der Anzahl der Seeder, dem Tracker-Status und Ihrer Netzwerkumgebung ab. Versuchen Sie, mehr Tracker hinzuzufügen, Firewall- und Port-Forwarding-Einstellungen zu überprüfen und sicherzustellen, dass DHT aktiviert ist.",
    },
    {
      question: "Werden Proxy-Einstellungen unterstützt?",
      answer:
        "Ja. Sie können HTTP-, SOCKS5-Proxys oder den System-Proxy in den Gopeed-Einstellungen konfigurieren. Nützlich, wenn Direktverbindungen eingeschränkt sind oder Downloads über ein bestimmtes Netzwerk geleitet werden müssen.",
    },
    {
      question: "Ist es kostenlos? Gibt es kostenpflichtige Funktionen?",
      answer:
        "Gopeed ist vollständig kostenlos und Open Source. Alle Kern-Download-Funktionen sind kostenlos verfügbar, ohne Werbung und ohne versteckte Paywalls.",
    },
    {
      question: "Kann ich Downloads remote verwalten?",
      answer:
        "Ja. Gopeed bietet eine RESTful-API und eine Weboberfläche. Sie können Download-Aufgaben remote über die API verwalten oder von einem anderen Gerät im selben Netzwerk auf die Weboberfläche zugreifen.",
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
