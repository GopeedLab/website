import type { Locale } from "../i18n";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - Free Modern Open Source Download Manager | HTTP, BitTorrent, Magnet & ed2k",
    "site.description":
      "Gopeed is a free, open-source download manager supporting HTTP, HTTPS, BitTorrent, magnet, and ed2k links. Multi-threaded high-speed downloads across Windows, macOS, Linux, Android, and iOS. Built with Golang and Flutter.",

    // SEO-specific metadata (not shown in UI, used only for meta tags)
    "seo.keywords.en":
      "download manager,free download manager,open source downloader,BitTorrent client,magnet link downloader,ed2k downloader,HTTP downloader,multi-threaded download,Gopeed,torrent downloader,cross-platform download manager,file downloader,download accelerator",
    "seo.keywords.store":
      "Gopeed extensions,download extensions,YouTube downloader,HuggingFace downloader,cloud storage downloader,browser extension",

    // Navigation
    "nav.docs": "Docs",
    "nav.store": "Store",
    "nav.api": "API",
    "nav.openMenu": "Open menu",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Hero
    "hero.title": "Modern Download Manager",
    "hero.subtitle":
      "Supports HTTP, torrents, magnet links and ed2k multi-protocol downloads — free, open source, and available on every platform.",
    "hero.downloadNow": "Download Now",
    "hero.downloadFor": "Download for {platform}",
    "hero.moreVersions": "More Versions",
    "hero.extension": "Extension",
    "hero.previewAlt": "Gopeed Desktop Preview",
    "hero.preparing": "Preparing...",

    // Features
    "features.title": "Why Choose Gopeed?",
    "features.subtitle":
      "A powerful yet lightweight download manager with cutting-edge features",
    "features.speed.title": "Lightning Fast",
    "features.speed.desc":
      "Multi-threaded download engine maximizes your bandwidth for the fastest download speeds",
    "features.cross.title": "Cross Platform",
    "features.cross.desc":
      "Available on Windows, macOS, Linux, Android, iOS, and Web — one download manager for all devices",
    "features.protocol.title": "Multi Protocol",
    "features.protocol.desc":
      "Support HTTP, HTTPS, BitTorrent, magnet, ed2k and more download protocols",
    "features.extension.title": "Extensible",
    "features.extension.desc":
      "Powerful JavaScript extension system — add YouTube, HuggingFace, cloud storage downloading and more",
    "features.api.title": "API Support",
    "features.api.desc":
      "RESTful API for automation, integration and remote download management",
    "features.open.title": "Open Source",
    "features.open.desc":
      "100% free and open source, community driven. No ads, no tracking.",

    // Extensions
    "extensions.title": "Powerful Extensions",
    "extensions.subtitle":
      "Extend Gopeed's download capabilities through the JavaScript extension system",
    "extensions.youtube.title": "YouTube Video Download",
    "extensions.youtube.desc":
      "Download YouTube videos and playlists in various qualities and formats, including 4K and 1080p.",
    "extensions.huggingface.title": "HuggingFace Model Download",
    "extensions.huggingface.desc":
      "Download AI model files from HuggingFace with resume support and automatic file verification.",
    "extensions.cloud.title": "Cloud Storage Download",
    "extensions.cloud.desc":
      "Download files from various cloud storage services, bypass speed limits, and batch download with ease.",
    "extensions.store": "Extension Store",
    "extensions.storeDesc":
      "Browse and install community-contributed download extensions",
    "extensions.devDocs": "Development Docs",
    "extensions.devDocsDesc":
      "Learn how to develop your own download extensions using JavaScript",

    // Downloads
    "downloads.title": "Download Gopeed",
    "downloads.subtitle": "Choose the version that fits your platform",
    "downloads.platform": "Platform",
    "downloads.os": "Operating System",
    "downloads.arch": "CPU Architecture",
    "downloads.type": "Type",
    "downloads.download": "Download",
    "downloads.size": "Size",
    "downloads.version": "Version",
    "downloads.installVia": "Install via command line",
    "downloads.installer": "Installer",
    "downloads.portable": "Portable",
    "downloads.package": "Package",
    "downloads.universal": "Universal",
    "downloads.file": "File",
    "downloads.preparing": "Preparing...",

    // Docs sidebar tabs
    "docs.tab.documentation": "Documentation",
    "docs.tab.apiReference": "API Reference",

    // Store
    "store.title": "Extension Store",
    "store.subtitle":
      "Browse and install community extensions for Gopeed — YouTube, HuggingFace, cloud storage and more",
    "store.search": "Search extensions...",
    "store.install": "Install",
    "store.installing": "Installing...",
    "store.installed": "Installed",
    "store.installs": "{count} installs",
    "store.stars": "{count} stars",
    "store.version": "v{version}",
    "store.noResults": "No extensions found",
    "store.noResultsDesc": "Try a different search term or check back later.",
    "store.loading": "Loading extensions...",
    "store.error": "Failed to load extensions",
    "store.viewSource": "View Source",
    "store.openGopeed": "Open in Gopeed",
    "store.sortBy": "Sort by",
    "store.sort.installs": "Most Installed",
    "store.sort.stars": "Most Stars",
    "store.sort.updated": "Recently Updated",
    "store.count.one": "{count} extension",
    "store.count.other": "{count} extensions",
    "store.copyUrl": "Copy install URL",
    "store.copied": "Copied!",
    "store.installFailed":
      "Auto-install failed. Please copy the URL and install manually in Gopeed.",
    "store.empty": "No extensions yet",
    "store.emptyDesc": "Extensions will appear here once synced from GitHub.",

    // Store detail page
    "store.detail.back": "Back to Store",
    "store.detail.install": "Install",
    "store.detail.copyUrl": "Copy URL",
    "store.detail.copied": "Copied!",
    "store.detail.viewSource": "View Source",
    "store.detail.installFailed":
      "Auto-install failed. Please copy the URL and install manually in Gopeed.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "No README available for this extension.",
    "store.detail.installs": "Installs",
    "store.detail.stars": "Stars",
    "store.detail.version": "Version",
    "store.detail.author": "Author",
    "store.detail.updated": "Updated",
    "store.detail.notFound": "Extension not found",
    "store.detail.notFoundDesc":
      "The extension you are looking for does not exist.",

    // Footer
    "footer.docs": "Documentation",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact Us",
    "footer.donate": "Donate",
    "footer.wechatFollow": "Follow official account for more information",
    "footer.copyright": "© {year} Gopeed. All rights reserved.",
  },
  zh: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - 免费现代化开源下载器 | 支持HTTP、BT种子、磁力和ed2k链接",
    "site.description":
      "Gopeed 是一款免费开源的现代化下载管理器，支持 HTTP、HTTPS、BitTorrent、磁力和 ed2k 链接下载。多线程高速下载，跨平台支持 Windows、macOS、Linux、Android 和 iOS。",

    // SEO-specific metadata
    "seo.keywords.en":
      "下载器,下载管理器,免费下载器,开源下载器,BT下载,磁力链接下载,ed2k下载,HTTP下载,多线程下载,Gopeed,种子下载,跨平台下载器,文件下载器,下载加速器",
    "seo.keywords.store":
      "Gopeed扩展,下载扩展,YouTube下载器,HuggingFace下载,网盘下载,浏览器扩展",

    // Navigation
    "nav.docs": "文档",
    "nav.store": "商店",
    "nav.api": "API",
    "nav.openMenu": "打开菜单",

    // Theme
    "theme.light": "浅色",
    "theme.dark": "深色",
    "theme.system": "系统",

    // Hero
    "hero.title": "现代化下载器",
    "hero.subtitle":
      "支持 HTTP、BT 种子、磁力链接和 ed2k 多协议下载，免费开源，覆盖全平台。",
    "hero.downloadNow": "立即下载",
    "hero.downloadFor": "下载 {platform} 版",
    "hero.moreVersions": "更多版本",
    "hero.extension": "扩展",
    "hero.previewAlt": "Gopeed 桌面端预览",
    "hero.preparing": "准备中...",

    // Features
    "features.title": "为什么选择 Gopeed？",
    "features.subtitle": "一个功能强大而轻量的下载管理器",
    "features.speed.title": "极速下载",
    "features.speed.desc": "多线程下载引擎，充分利用带宽，实现最大下载速度",
    "features.cross.title": "跨平台",
    "features.cross.desc":
      "支持 Windows、macOS、Linux、Android、iOS 和 Web，一个下载器覆盖所有设备",
    "features.protocol.title": "多协议",
    "features.protocol.desc":
      "支持 HTTP、HTTPS、BitTorrent、磁力、ed2k 等多种下载协议",
    "features.extension.title": "可扩展",
    "features.extension.desc":
      "强大的 JavaScript 扩展系统，轻松添加 YouTube、HuggingFace、网盘下载等功能",
    "features.api.title": "API 支持",
    "features.api.desc": "RESTful API 支持自动化、集成和远程下载管理",
    "features.open.title": "开源免费",
    "features.open.desc": "完全免费开源，社区驱动开发，无广告无追踪",

    // Extensions
    "extensions.title": "强大的扩展能力",
    "extensions.subtitle":
      "使用 JavaScript 编写扩展，轻松扩展 Gopeed 的下载能力",
    "extensions.youtube.title": "YouTube 视频下载",
    "extensions.youtube.desc":
      "下载 YouTube 视频和播放列表，支持 4K、1080p 等多种清晰度和格式。",
    "extensions.huggingface.title": "HuggingFace 模型下载",
    "extensions.huggingface.desc":
      "从 HuggingFace 下载 AI 模型文件，支持断点续传和自动验证文件完整性。",
    "extensions.cloud.title": "网盘文件下载",
    "extensions.cloud.desc":
      "支持各类网盘文件下载，突破速度限制，批量下载更便捷。",
    "extensions.store": "扩展商店",
    "extensions.storeDesc": "浏览和安装社区贡献的各类下载扩展",
    "extensions.devDocs": "开发文档",
    "extensions.devDocsDesc": "学习如何使用 JavaScript 开发自己的下载扩展",

    // Downloads
    "downloads.title": "选择你的平台",
    "downloads.subtitle": "支持所有主流平台，随时随地开始下载",
    "downloads.platform": "平台",
    "downloads.os": "操作系统",
    "downloads.arch": "CPU 架构",
    "downloads.type": "类型",
    "downloads.download": "立即下载",
    "downloads.size": "大小",
    "downloads.version": "版本",
    "downloads.installVia": "通过命令行安装",
    "downloads.installer": "安装包",
    "downloads.portable": "便携版",
    "downloads.package": "软件包",
    "downloads.universal": "通用版本",
    "downloads.file": "文件",
    "downloads.preparing": "准备中...",

    // Docs sidebar tabs
    "docs.tab.documentation": "文档",
    "docs.tab.apiReference": "API 参考",

    // Store
    "store.title": "扩展商店",
    "store.subtitle":
      "浏览并安装社区贡献的 Gopeed 扩展 — YouTube、HuggingFace、网盘下载等",
    "store.search": "搜索扩展...",
    "store.install": "安装",
    "store.installing": "安装中...",
    "store.installed": "已安装",
    "store.installs": "{count} 次安装",
    "store.stars": "{count} stars",
    "store.version": "v{version}",
    "store.noResults": "未找到扩展",
    "store.noResultsDesc": "尝试其他关键词或稍后再来。",
    "store.loading": "加载扩展中...",
    "store.error": "加载扩展失败",
    "store.viewSource": "查看源码",
    "store.openGopeed": "在 Gopeed 中打开",
    "store.sortBy": "排序方式",
    "store.sort.installs": "最多安装",
    "store.sort.stars": "最多 Stars",
    "store.sort.updated": "最近更新",
    "store.count.one": "{count} 个扩展",
    "store.count.other": "{count} 个扩展",
    "store.copyUrl": "复制安装地址",
    "store.copied": "已复制",
    "store.installFailed":
      "自动安装失败，请复制扩展地址，在 Gopeed 中手动安装。",
    "store.empty": "暂无扩展",
    "store.emptyDesc": "扩展将在从 GitHub 同步后显示。",

    // Store detail page
    "store.detail.back": "返回商店",
    "store.detail.install": "安装",
    "store.detail.copyUrl": "复制地址",
    "store.detail.copied": "已复制",
    "store.detail.viewSource": "查看源码",
    "store.detail.installFailed":
      "自动安装失败，请复制扩展地址，在 Gopeed 中手动安装。",
    "store.detail.readme": "README",
    "store.detail.noReadme": "此扩展暂无 README。",
    "store.detail.installs": "安装次数",
    "store.detail.stars": "Stars",
    "store.detail.version": "版本",
    "store.detail.author": "作者",
    "store.detail.updated": "更新时间",
    "store.detail.notFound": "扩展不存在",
    "store.detail.notFoundDesc": "您查找的扩展不存在。",

    // Footer
    "footer.docs": "文档",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.contact": "联系我们",
    "footer.donate": "捐赠",
    "footer.wechatFollow": "关注公众号获取更多资讯",
    "footer.copyright": "© {year} Gopeed. 保留所有权利。",
  },
  "zh-TW": {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - 免費現代化開源下載器 | 支援HTTP、BT種子、磁力和ed2k連結",
    "site.description":
      "Gopeed 是一款免費開源的現代化下載管理器，支援 HTTP、HTTPS、BitTorrent、磁力和 ed2k 連結下載。多執行緒高速下載，跨平台支援 Windows、macOS、Linux、Android 和 iOS。",

    // SEO-specific metadata
    "seo.keywords.en":
      "下載器,下載管理器,免費下載器,開源下載器,BT下載,磁力連結下載,ed2k下載,HTTP下載,多執行緒下載,Gopeed,種子下載,跨平台下載器,檔案下載器,下載加速器",
    "seo.keywords.store":
      "Gopeed擴充,下載擴充,YouTube下載器,HuggingFace下載,雲端硬碟下載,瀏覽器擴充",

    // Navigation
    "nav.docs": "文件",
    "nav.store": "商店",
    "nav.api": "API",
    "nav.openMenu": "開啟選單",

    // Theme
    "theme.light": "淺色",
    "theme.dark": "深色",
    "theme.system": "系統",

    // Hero
    "hero.title": "現代化下載器",
    "hero.subtitle":
      "支援 HTTP、BT 種子、磁力連結和 ed2k 多協定下載，免費開源，覆蓋全平台。",
    "hero.downloadNow": "立即下載",
    "hero.downloadFor": "下載 {platform} 版",
    "hero.moreVersions": "更多版本",
    "hero.extension": "擴充功能",
    "hero.previewAlt": "Gopeed 桌面端預覽",
    "hero.preparing": "準備中...",

    // Features
    "features.title": "為什麼選擇 Gopeed？",
    "features.subtitle": "一個功能強大而輕量的下載管理器",
    "features.speed.title": "極速下載",
    "features.speed.desc": "多執行緒下載引擎，充分利用頻寬，實現最大下載速度",
    "features.cross.title": "跨平台",
    "features.cross.desc":
      "支援 Windows、macOS、Linux、Android、iOS 和 Web，一個下載器覆蓋所有裝置",
    "features.protocol.title": "多協定",
    "features.protocol.desc":
      "支援 HTTP、HTTPS、BitTorrent、磁力、ed2k 等多種下載協定",
    "features.extension.title": "可擴充",
    "features.extension.desc":
      "強大的 JavaScript 擴充系統，輕鬆新增 YouTube、HuggingFace、網盤下載等功能",
    "features.api.title": "API 支援",
    "features.api.desc": "RESTful API 支援自動化、整合和遠端下載管理",
    "features.open.title": "開源免費",
    "features.open.desc": "完全免費開源，社群驅動開發，無廣告無追蹤",

    // Extensions
    "extensions.title": "強大的擴充能力",
    "extensions.subtitle":
      "使用 JavaScript 編寫擴充功能，輕鬆擴展 Gopeed 的下載能力",
    "extensions.youtube.title": "YouTube 影片下載",
    "extensions.youtube.desc":
      "下載 YouTube 影片和播放清單，支援 4K、1080p 等多種解析度和格式。",
    "extensions.huggingface.title": "HuggingFace 模型下載",
    "extensions.huggingface.desc":
      "從 HuggingFace 下載 AI 模型檔案，支援斷點續傳和自動驗證檔案完整性。",
    "extensions.cloud.title": "網盤檔案下載",
    "extensions.cloud.desc":
      "支援各類網盤檔案下載，突破速度限制，批次下載更便捷。",
    "extensions.store": "擴充商店",
    "extensions.storeDesc": "瀏覽和安裝社群貢獻的各類下載擴充功能",
    "extensions.devDocs": "開發文件",
    "extensions.devDocsDesc": "學習如何使用 JavaScript 開發自己的下載擴充功能",

    // Downloads
    "downloads.title": "選擇你的平台",
    "downloads.subtitle": "支援所有主流平台，隨時隨地開始下載",
    "downloads.platform": "平台",
    "downloads.os": "作業系統",
    "downloads.arch": "CPU 架構",
    "downloads.type": "類型",
    "downloads.download": "立即下載",
    "downloads.size": "大小",
    "downloads.version": "版本",
    "downloads.installVia": "透過命令列安裝",
    "downloads.installer": "安裝程式",
    "downloads.portable": "可攜版",
    "downloads.package": "軟體套件",
    "downloads.universal": "通用版本",
    "downloads.file": "檔案",
    "downloads.preparing": "準備中...",

    // Docs sidebar tabs
    "docs.tab.documentation": "文件",
    "docs.tab.apiReference": "API 參考",

    // Store
    "store.title": "擴充商店",
    "store.subtitle":
      "瀏覽並安裝社群貢獻的 Gopeed 擴充功能 — YouTube、HuggingFace、網盤下載等",
    "store.search": "搜尋擴充功能...",
    "store.install": "安裝",
    "store.installing": "安裝中...",
    "store.installed": "已安裝",
    "store.installs": "{count} 次安裝",
    "store.stars": "{count} stars",
    "store.version": "v{version}",
    "store.noResults": "未找到擴充功能",
    "store.noResultsDesc": "嘗試其他關鍵字或稍後再試。",
    "store.loading": "載入擴充功能中...",
    "store.error": "載入擴充功能失敗",
    "store.viewSource": "查看原始碼",
    "store.openGopeed": "在 Gopeed 中開啟",
    "store.sortBy": "排序方式",
    "store.sort.installs": "最多安裝",
    "store.sort.stars": "最多 Stars",
    "store.sort.updated": "最近更新",
    "store.count.one": "{count} 個擴充功能",
    "store.count.other": "{count} 個擴充功能",
    "store.copyUrl": "複製安裝地址",
    "store.copied": "已複製",
    "store.installFailed":
      "自動安裝失敗，請複製擴充功能地址，在 Gopeed 中手動安裝。",
    "store.empty": "暫無擴充功能",
    "store.emptyDesc": "擴充功能將在從 GitHub 同步後顯示。",

    // Store detail page
    "store.detail.back": "返回商店",
    "store.detail.install": "安裝",
    "store.detail.copyUrl": "複製地址",
    "store.detail.copied": "已複製",
    "store.detail.viewSource": "查看原始碼",
    "store.detail.installFailed":
      "自動安裝失敗，請複製擴充功能地址，在 Gopeed 中手動安裝。",
    "store.detail.readme": "README",
    "store.detail.noReadme": "此擴充功能暫無 README。",
    "store.detail.installs": "安裝次數",
    "store.detail.stars": "Stars",
    "store.detail.version": "版本",
    "store.detail.author": "作者",
    "store.detail.updated": "更新時間",
    "store.detail.notFound": "擴充功能不存在",
    "store.detail.notFoundDesc": "您查找的擴充功能不存在。",

    // Footer
    "footer.docs": "文件",
    "footer.privacy": "隱私權政策",
    "footer.terms": "服務條款",
    "footer.contact": "聯絡我們",
    "footer.donate": "捐贈",
    "footer.wechatFollow": "關注公眾號獲取更多資訊",
    "footer.copyright": "© {year} Gopeed. 保留所有權利。",
  },
  ja: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - 無料のモダンなオープンソースダウンロードマネージャー | HTTP、BitTorrent、マグネットリンク、ed2k対応",
    "site.description":
      "Gopeedは、HTTP、HTTPS、BitTorrent、マグネットリンク、ed2kリンクに対応した無料のオープンソースダウンロードマネージャーです。マルチスレッドによる高速ダウンロードで、Windows、macOS、Linux、Android、iOSに対応しています。GolangとFlutterで構築されています。",

    // SEO-specific metadata
    "seo.keywords.en":
      "ダウンロードマネージャー,無料ダウンロードマネージャー,オープンソースダウンローダー,BitTorrentクライアント,マグネットリンクダウンローダー,ed2kダウンローダー,HTTPダウンローダー,マルチスレッドダウンロード,Gopeed,トレントダウンローダー,クロスプラットフォームダウンロードマネージャー,ファイルダウンローダー,ダウンロード加速",
    "seo.keywords.store":
      "Gopeed拡張機能,ダウンロード拡張機能,YouTubeダウンローダー,HuggingFaceダウンローダー,クラウドストレージダウンローダー,ブラウザ拡張機能",

    // Navigation
    "nav.docs": "ドキュメント",
    "nav.store": "ストア",
    "nav.api": "API",
    "nav.openMenu": "メニューを開く",

    // Theme
    "theme.light": "ライト",
    "theme.dark": "ダーク",
    "theme.system": "システム",

    // Hero
    "hero.title": "モダンなダウンロードマネージャー",
    "hero.subtitle":
      "HTTP、BitTorrent、マグネットリンク、ed2kのマルチプロトコルダウンロードに対応。無料、オープンソース、全プラットフォームで利用可能です。",
    "hero.downloadNow": "今すぐダウンロード",
    "hero.downloadFor": "{platform}版をダウンロード",
    "hero.moreVersions": "その他のバージョン",
    "hero.extension": "拡張機能",
    "hero.previewAlt": "Gopeed デスクトッププレビュー",
    "hero.preparing": "準備中...",

    // Features
    "features.title": "なぜGopeedを選ぶのか？",
    "features.subtitle":
      "最先端の機能を備えた強力で軽量なダウンロードマネージャー",
    "features.speed.title": "超高速",
    "features.speed.desc":
      "マルチスレッドダウンロードエンジンが帯域幅を最大限に活用し、最速のダウンロード速度を実現します",
    "features.cross.title": "クロスプラットフォーム",
    "features.cross.desc":
      "Windows、macOS、Linux、Android、iOS、Webに対応。すべてのデバイスで使えるダウンロードマネージャー",
    "features.protocol.title": "マルチプロトコル",
    "features.protocol.desc":
      "HTTP、HTTPS、BitTorrent、マグネットリンク、ed2kなど、多くのダウンロードプロトコルに対応",
    "features.extension.title": "拡張性",
    "features.extension.desc":
      "強力なJavaScript拡張システムで、YouTube、HuggingFace、クラウドストレージからのダウンロードなどを追加可能",
    "features.api.title": "APIサポート",
    "features.api.desc":
      "RESTful APIによる自動化、統合、リモートダウンロード管理をサポート",
    "features.open.title": "オープンソース",
    "features.open.desc":
      "100%無料でオープンソース、コミュニティ主導。広告なし、トラッキングなし。",

    // Extensions
    "extensions.title": "強力な拡張機能",
    "extensions.subtitle":
      "JavaScript拡張システムでGopeedのダウンロード機能を拡張できます",
    "extensions.youtube.title": "YouTube動画ダウンロード",
    "extensions.youtube.desc":
      "YouTubeの動画とプレイリストを4K、1080pなど様々な画質と形式でダウンロードできます。",
    "extensions.huggingface.title": "HuggingFaceモデルダウンロード",
    "extensions.huggingface.desc":
      "HuggingFaceからAIモデルファイルをダウンロード。レジューム機能と自動ファイル検証に対応しています。",
    "extensions.cloud.title": "クラウドストレージダウンロード",
    "extensions.cloud.desc":
      "様々なクラウドストレージサービスからファイルをダウンロード。速度制限を回避し、簡単に一括ダウンロードできます。",
    "extensions.store": "拡張機能ストア",
    "extensions.storeDesc":
      "コミュニティが提供するダウンロード拡張機能を閲覧・インストール",
    "extensions.devDocs": "開発ドキュメント",
    "extensions.devDocsDesc":
      "JavaScriptを使って独自のダウンロード拡張機能を開発する方法を学ぶ",

    // Downloads
    "downloads.title": "Gopeedをダウンロード",
    "downloads.subtitle":
      "お使いのプラットフォームに合ったバージョンをお選びください",
    "downloads.platform": "プラットフォーム",
    "downloads.os": "オペレーティングシステム",
    "downloads.arch": "CPUアーキテクチャ",
    "downloads.type": "タイプ",
    "downloads.download": "ダウンロード",
    "downloads.size": "サイズ",
    "downloads.version": "バージョン",
    "downloads.installVia": "コマンドラインでインストール",
    "downloads.installer": "インストーラー",
    "downloads.portable": "ポータブル版",
    "downloads.package": "パッケージ",
    "downloads.universal": "ユニバーサル",
    "downloads.file": "ファイル",
    "downloads.preparing": "準備中...",

    // Docs sidebar tabs
    "docs.tab.documentation": "ドキュメント",
    "docs.tab.apiReference": "APIリファレンス",

    // Store
    "store.title": "拡張機能ストア",
    "store.subtitle":
      "Gopeedのコミュニティ拡張機能を閲覧・インストール — YouTube、HuggingFace、クラウドストレージなど",
    "store.search": "拡張機能を検索...",
    "store.install": "インストール",
    "store.installing": "インストール中...",
    "store.installed": "インストール済み",
    "store.installs": "{count} 回インストール",
    "store.stars": "{count} スター",
    "store.version": "v{version}",
    "store.noResults": "拡張機能が見つかりません",
    "store.noResultsDesc":
      "別の検索キーワードをお試しいただくか、後でもう一度ご確認ください。",
    "store.loading": "拡張機能を読み込み中...",
    "store.error": "拡張機能の読み込みに失敗しました",
    "store.viewSource": "ソースコードを表示",
    "store.openGopeed": "Gopeedで開く",
    "store.sortBy": "並び替え",
    "store.sort.installs": "インストール数順",
    "store.sort.stars": "スター数順",
    "store.sort.updated": "最近の更新順",
    "store.count.one": "{count} 件の拡張機能",
    "store.count.other": "{count} 件の拡張機能",
    "store.copyUrl": "インストールURLをコピー",
    "store.copied": "コピーしました！",
    "store.installFailed":
      "自動インストールに失敗しました。URLをコピーしてGopeedで手動インストールしてください。",
    "store.empty": "拡張機能はまだありません",
    "store.emptyDesc": "GitHubから同期されると、拡張機能がここに表示されます。",

    // Store detail page
    "store.detail.back": "ストアに戻る",
    "store.detail.install": "インストール",
    "store.detail.copyUrl": "URLをコピー",
    "store.detail.copied": "コピーしました！",
    "store.detail.viewSource": "ソースコードを表示",
    "store.detail.installFailed":
      "自動インストールに失敗しました。URLをコピーしてGopeedで手動インストールしてください。",
    "store.detail.readme": "README",
    "store.detail.noReadme": "この拡張機能のREADMEはありません。",
    "store.detail.installs": "インストール数",
    "store.detail.stars": "スター",
    "store.detail.version": "バージョン",
    "store.detail.author": "作者",
    "store.detail.updated": "更新日",
    "store.detail.notFound": "拡張機能が見つかりません",
    "store.detail.notFoundDesc": "お探しの拡張機能は存在しません。",

    // Footer
    "footer.docs": "ドキュメント",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.contact": "お問い合わせ",
    "footer.donate": "寄付",
    "footer.wechatFollow": "公式アカウントをフォローして最新情報を入手",
    "footer.copyright": "© {year} Gopeed. All rights reserved.",
  },
  ko: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - 무료 최신 오픈소스 다운로드 매니저 | HTTP, BitTorrent, 마그넷 및 ed2k 지원",
    "site.description":
      "Gopeed은 HTTP, HTTPS, BitTorrent, 마그넷 및 ed2k 링크를 지원하는 무료 오픈소스 다운로드 매니저입니다. 멀티스레드 고속 다운로드로 Windows, macOS, Linux, Android, iOS를 지원합니다. Golang과 Flutter로 제작되었습니다.",

    // SEO-specific metadata
    "seo.keywords.en":
      "다운로드 매니저,무료 다운로드 매니저,오픈소스 다운로더,BitTorrent 클라이언트,마그넷 링크 다운로더,ed2k 다운로더,HTTP 다운로더,멀티스레드 다운로드,Gopeed,토렌트 다운로더,크로스 플랫폼 다운로드 매니저,파일 다운로더,다운로드 가속기",
    "seo.keywords.store":
      "Gopeed 확장 프로그램,다운로드 확장 프로그램,YouTube 다운로더,HuggingFace 다운로더,클라우드 스토리지 다운로더,브라우저 확장 프로그램",

    // Navigation
    "nav.docs": "문서",
    "nav.store": "스토어",
    "nav.api": "API",
    "nav.openMenu": "메뉴 열기",

    // Theme
    "theme.light": "라이트",
    "theme.dark": "다크",
    "theme.system": "시스템",

    // Hero
    "hero.title": "최신 다운로드 매니저",
    "hero.subtitle":
      "HTTP, BitTorrent, 마그넷 링크, ed2k 멀티 프로토콜 다운로드를 지원합니다. 무료, 오픈소스, 모든 플랫폼에서 사용 가능합니다.",
    "hero.downloadNow": "지금 다운로드",
    "hero.downloadFor": "{platform} 버전 다운로드",
    "hero.moreVersions": "더 많은 버전",
    "hero.extension": "확장 프로그램",
    "hero.previewAlt": "Gopeed 데스크톱 미리보기",
    "hero.preparing": "준비 중...",

    // Features
    "features.title": "왜 Gopeed을 선택해야 하나요?",
    "features.subtitle":
      "최첨단 기능을 갖춘 강력하면서도 가벼운 다운로드 매니저",
    "features.speed.title": "초고속",
    "features.speed.desc":
      "멀티스레드 다운로드 엔진이 대역폭을 최대한 활용하여 가장 빠른 다운로드 속도를 제공합니다",
    "features.cross.title": "크로스 플랫폼",
    "features.cross.desc":
      "Windows, macOS, Linux, Android, iOS, Web을 지원합니다. 모든 기기에서 사용할 수 있는 하나의 다운로드 매니저",
    "features.protocol.title": "멀티 프로토콜",
    "features.protocol.desc":
      "HTTP, HTTPS, BitTorrent, 마그넷, ed2k 등 다양한 다운로드 프로토콜을 지원합니다",
    "features.extension.title": "확장성",
    "features.extension.desc":
      "강력한 JavaScript 확장 시스템으로 YouTube, HuggingFace, 클라우드 스토리지 다운로드 등을 추가할 수 있습니다",
    "features.api.title": "API 지원",
    "features.api.desc":
      "RESTful API를 통한 자동화, 통합 및 원격 다운로드 관리를 지원합니다",
    "features.open.title": "오픈소스",
    "features.open.desc":
      "100% 무료 오픈소스, 커뮤니티 주도. 광고 없음, 추적 없음.",

    // Extensions
    "extensions.title": "강력한 확장 프로그램",
    "extensions.subtitle":
      "JavaScript 확장 시스템을 통해 Gopeed의 다운로드 기능을 확장하세요",
    "extensions.youtube.title": "YouTube 동영상 다운로드",
    "extensions.youtube.desc":
      "YouTube 동영상과 재생목록을 4K, 1080p 등 다양한 화질과 형식으로 다운로드할 수 있습니다.",
    "extensions.huggingface.title": "HuggingFace 모델 다운로드",
    "extensions.huggingface.desc":
      "HuggingFace에서 AI 모델 파일을 다운로드합니다. 이어서 다운로드와 자동 파일 검증을 지원합니다.",
    "extensions.cloud.title": "클라우드 스토리지 다운로드",
    "extensions.cloud.desc":
      "다양한 클라우드 스토리지 서비스에서 파일을 다운로드하고, 속도 제한을 우회하며, 쉽게 일괄 다운로드할 수 있습니다.",
    "extensions.store": "확장 프로그램 스토어",
    "extensions.storeDesc":
      "커뮤니티에서 제공하는 다운로드 확장 프로그램을 둘러보고 설치하세요",
    "extensions.devDocs": "개발 문서",
    "extensions.devDocsDesc":
      "JavaScript를 사용하여 나만의 다운로드 확장 프로그램을 개발하는 방법을 알아보세요",

    // Downloads
    "downloads.title": "Gopeed 다운로드",
    "downloads.subtitle": "플랫폼에 맞는 버전을 선택하세요",
    "downloads.platform": "플랫폼",
    "downloads.os": "운영 체제",
    "downloads.arch": "CPU 아키텍처",
    "downloads.type": "유형",
    "downloads.download": "다운로드",
    "downloads.size": "크기",
    "downloads.version": "버전",
    "downloads.installVia": "명령줄로 설치",
    "downloads.installer": "설치 프로그램",
    "downloads.portable": "포터블",
    "downloads.package": "패키지",
    "downloads.universal": "범용",
    "downloads.file": "파일",
    "downloads.preparing": "준비 중...",

    // Docs sidebar tabs
    "docs.tab.documentation": "문서",
    "docs.tab.apiReference": "API 레퍼런스",

    // Store
    "store.title": "확장 프로그램 스토어",
    "store.subtitle":
      "Gopeed의 커뮤니티 확장 프로그램을 둘러보고 설치하세요 — YouTube, HuggingFace, 클라우드 스토리지 등",
    "store.search": "확장 프로그램 검색...",
    "store.install": "설치",
    "store.installing": "설치 중...",
    "store.installed": "설치됨",
    "store.installs": "{count}회 설치",
    "store.stars": "{count} 스타",
    "store.version": "v{version}",
    "store.noResults": "확장 프로그램을 찾을 수 없습니다",
    "store.noResultsDesc":
      "다른 검색어를 시도하거나 나중에 다시 확인해 주세요.",
    "store.loading": "확장 프로그램 불러오는 중...",
    "store.error": "확장 프로그램을 불러오지 못했습니다",
    "store.viewSource": "소스 코드 보기",
    "store.openGopeed": "Gopeed에서 열기",
    "store.sortBy": "정렬 기준",
    "store.sort.installs": "설치 수 순",
    "store.sort.stars": "스타 수 순",
    "store.sort.updated": "최근 업데이트 순",
    "store.count.one": "{count}개 확장 프로그램",
    "store.count.other": "{count}개 확장 프로그램",
    "store.copyUrl": "설치 URL 복사",
    "store.copied": "복사됨!",
    "store.installFailed":
      "자동 설치에 실패했습니다. URL을 복사하여 Gopeed에서 수동으로 설치해 주세요.",
    "store.empty": "확장 프로그램이 아직 없습니다",
    "store.emptyDesc":
      "GitHub에서 동기화되면 확장 프로그램이 여기에 표시됩니다.",

    // Store detail page
    "store.detail.back": "스토어로 돌아가기",
    "store.detail.install": "설치",
    "store.detail.copyUrl": "URL 복사",
    "store.detail.copied": "복사됨!",
    "store.detail.viewSource": "소스 코드 보기",
    "store.detail.installFailed":
      "자동 설치에 실패했습니다. URL을 복사하여 Gopeed에서 수동으로 설치해 주세요.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "이 확장 프로그램의 README가 없습니다.",
    "store.detail.installs": "설치 수",
    "store.detail.stars": "스타",
    "store.detail.version": "버전",
    "store.detail.author": "작성자",
    "store.detail.updated": "업데이트",
    "store.detail.notFound": "확장 프로그램을 찾을 수 없습니다",
    "store.detail.notFoundDesc": "찾으시는 확장 프로그램이 존재하지 않습니다.",

    // Footer
    "footer.docs": "문서",
    "footer.privacy": "개인정보 처리방침",
    "footer.terms": "이용약관",
    "footer.contact": "문의하기",
    "footer.donate": "기부",
    "footer.wechatFollow": "공식 계정을 팔로우하여 더 많은 정보를 받아보세요",
    "footer.copyright": "© {year} Gopeed. All rights reserved.",
  },
  es: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - Gestor de descargas gratuito, moderno y de código abierto | HTTP, BitTorrent, Magnet y ed2k",
    "site.description":
      "Gopeed es un gestor de descargas gratuito y de código abierto compatible con HTTP, HTTPS, BitTorrent, magnet y ed2k. Descargas multiproceso de alta velocidad en Windows, macOS, Linux, Android e iOS. Desarrollado con Golang y Flutter.",

    // SEO-specific metadata
    "seo.keywords.en":
      "gestor de descargas,gestor de descargas gratuito,descargador de código abierto,cliente BitTorrent,descargador de magnet,enlace ed2k,descargador HTTP,descarga multiproceso,Gopeed,descargador torrent,gestor de descargas multiplataforma,descargador de archivos,acelerador de descargas",
    "seo.keywords.store":
      "extensiones Gopeed,extensiones de descarga,descargador de YouTube,descargador de HuggingFace,descargador de almacenamiento en la nube,extensión de navegador",

    // Navigation
    "nav.docs": "Documentación",
    "nav.store": "Tienda",
    "nav.api": "API",
    "nav.openMenu": "Abrir menú",

    // Theme
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",

    // Hero
    "hero.title": "Gestor de descargas moderno",
    "hero.subtitle":
      "Compatible con descargas multiprotocolo HTTP, BitTorrent, magnet y ed2k. Gratuito, de código abierto y disponible en todas las plataformas.",
    "hero.downloadNow": "Descargar ahora",
    "hero.downloadFor": "Descargar para {platform}",
    "hero.moreVersions": "Más versiones",
    "hero.extension": "Extensión",
    "hero.previewAlt": "Vista previa de Gopeed en escritorio",
    "hero.preparing": "Preparando...",

    // Features
    "features.title": "¿Por qué elegir Gopeed?",
    "features.subtitle":
      "Un gestor de descargas potente y ligero con funciones de vanguardia",
    "features.speed.title": "Velocidad relámpago",
    "features.speed.desc":
      "El motor de descarga multiproceso maximiza tu ancho de banda para obtener la mayor velocidad de descarga",
    "features.cross.title": "Multiplataforma",
    "features.cross.desc":
      "Disponible en Windows, macOS, Linux, Android, iOS y Web: un solo gestor de descargas para todos tus dispositivos",
    "features.protocol.title": "Multiprotocolo",
    "features.protocol.desc":
      "Compatible con HTTP, HTTPS, BitTorrent, magnet, ed2k y más protocolos de descarga",
    "features.extension.title": "Extensible",
    "features.extension.desc":
      "Potente sistema de extensiones JavaScript: añade descargas de YouTube, HuggingFace, almacenamiento en la nube y más",
    "features.api.title": "Soporte API",
    "features.api.desc":
      "API RESTful para automatización, integración y gestión remota de descargas",
    "features.open.title": "Código abierto",
    "features.open.desc":
      "100% gratuito y de código abierto, impulsado por la comunidad. Sin anuncios, sin rastreo.",

    // Extensions
    "extensions.title": "Extensiones potentes",
    "extensions.subtitle":
      "Amplía las capacidades de descarga de Gopeed mediante el sistema de extensiones JavaScript",
    "extensions.youtube.title": "Descarga de vídeos de YouTube",
    "extensions.youtube.desc":
      "Descarga vídeos y listas de reproducción de YouTube en diversas calidades y formatos, incluyendo 4K y 1080p.",
    "extensions.huggingface.title": "Descarga de modelos de HuggingFace",
    "extensions.huggingface.desc":
      "Descarga archivos de modelos de IA desde HuggingFace con soporte de reanudación y verificación automática.",
    "extensions.cloud.title": "Descarga desde almacenamiento en la nube",
    "extensions.cloud.desc":
      "Descarga archivos de varios servicios de almacenamiento en la nube, evita límites de velocidad y descarga por lotes fácilmente.",
    "extensions.store": "Tienda de extensiones",
    "extensions.storeDesc":
      "Explora e instala extensiones de descarga contribuidas por la comunidad",
    "extensions.devDocs": "Documentación de desarrollo",
    "extensions.devDocsDesc":
      "Aprende a desarrollar tus propias extensiones de descarga con JavaScript",

    // Downloads
    "downloads.title": "Descargar Gopeed",
    "downloads.subtitle": "Elige la versión adecuada para tu plataforma",
    "downloads.platform": "Plataforma",
    "downloads.os": "Sistema operativo",
    "downloads.arch": "Arquitectura de CPU",
    "downloads.type": "Tipo",
    "downloads.download": "Descargar",
    "downloads.size": "Tamaño",
    "downloads.version": "Versión",
    "downloads.installVia": "Instalar mediante línea de comandos",
    "downloads.installer": "Instalador",
    "downloads.portable": "Portátil",
    "downloads.package": "Paquete",
    "downloads.universal": "Universal",
    "downloads.file": "Archivo",
    "downloads.preparing": "Preparando...",

    // Docs sidebar tabs
    "docs.tab.documentation": "Documentación",
    "docs.tab.apiReference": "Referencia API",

    // Store
    "store.title": "Tienda de extensiones",
    "store.subtitle":
      "Explora e instala extensiones de la comunidad para Gopeed — YouTube, HuggingFace, almacenamiento en la nube y más",
    "store.search": "Buscar extensiones...",
    "store.install": "Instalar",
    "store.installing": "Instalando...",
    "store.installed": "Instalado",
    "store.installs": "{count} instalaciones",
    "store.stars": "{count} estrellas",
    "store.version": "v{version}",
    "store.noResults": "No se encontraron extensiones",
    "store.noResultsDesc":
      "Intenta con otro término de búsqueda o vuelve más tarde.",
    "store.loading": "Cargando extensiones...",
    "store.error": "Error al cargar las extensiones",
    "store.viewSource": "Ver código fuente",
    "store.openGopeed": "Abrir en Gopeed",
    "store.sortBy": "Ordenar por",
    "store.sort.installs": "Más instaladas",
    "store.sort.stars": "Más estrellas",
    "store.sort.updated": "Recién actualizadas",
    "store.count.one": "{count} extensión",
    "store.count.other": "{count} extensiones",
    "store.copyUrl": "Copiar URL de instalación",
    "store.copied": "¡Copiado!",
    "store.installFailed":
      "La instalación automática falló. Copia la URL e instálala manualmente en Gopeed.",
    "store.empty": "Sin extensiones aún",
    "store.emptyDesc":
      "Las extensiones aparecerán aquí una vez sincronizadas desde GitHub.",

    // Store detail page
    "store.detail.back": "Volver a la tienda",
    "store.detail.install": "Instalar",
    "store.detail.copyUrl": "Copiar URL",
    "store.detail.copied": "¡Copiado!",
    "store.detail.viewSource": "Ver código fuente",
    "store.detail.installFailed":
      "La instalación automática falló. Copia la URL e instálala manualmente en Gopeed.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "No hay README disponible para esta extensión.",
    "store.detail.installs": "Instalaciones",
    "store.detail.stars": "Estrellas",
    "store.detail.version": "Versión",
    "store.detail.author": "Autor",
    "store.detail.updated": "Actualizado",
    "store.detail.notFound": "Extensión no encontrada",
    "store.detail.notFoundDesc": "La extensión que buscas no existe.",

    // Footer
    "footer.docs": "Documentación",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos de servicio",
    "footer.contact": "Contáctanos",
    "footer.donate": "Donar",
    "footer.wechatFollow": "Sigue la cuenta oficial para más información",
    "footer.copyright": "© {year} Gopeed. Todos los derechos reservados.",
  },
  pt: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - Gerenciador de Downloads Gratuito, Moderno e de Código Aberto | HTTP, BitTorrent, Magnet e ed2k",
    "site.description":
      "Gopeed é um gerenciador de downloads gratuito e de código aberto compatível com HTTP, HTTPS, BitTorrent, magnet e ed2k. Downloads multiprocesso de alta velocidade no Windows, macOS, Linux, Android e iOS. Desenvolvido com Golang e Flutter.",

    // SEO-specific metadata
    "seo.keywords.en":
      "gerenciador de downloads,gerenciador de downloads gratuito,downloader de código aberto,cliente BitTorrent,downloader de magnet,downloader ed2k,downloader HTTP,download multiprocesso,Gopeed,downloader torrent,gerenciador de downloads multiplataforma,downloader de arquivos,acelerador de downloads",
    "seo.keywords.store":
      "extensões Gopeed,extensões de download,downloader do YouTube,downloader do HuggingFace,downloader de armazenamento em nuvem,extensão de navegador",

    // Navigation
    "nav.docs": "Documentação",
    "nav.store": "Loja",
    "nav.api": "API",
    "nav.openMenu": "Abrir menu",

    // Theme
    "theme.light": "Claro",
    "theme.dark": "Escuro",
    "theme.system": "Sistema",

    // Hero
    "hero.title": "Gerenciador de Downloads Moderno",
    "hero.subtitle":
      "Suporta downloads multiprotocolo HTTP, BitTorrent, magnet e ed2k — gratuito, de código aberto e disponível em todas as plataformas.",
    "hero.downloadNow": "Baixar Agora",
    "hero.downloadFor": "Baixar para {platform}",
    "hero.moreVersions": "Mais Versões",
    "hero.extension": "Extensão",
    "hero.previewAlt": "Pré-visualização do Gopeed Desktop",
    "hero.preparing": "Preparando...",

    // Features
    "features.title": "Por que escolher o Gopeed?",
    "features.subtitle":
      "Um gerenciador de downloads poderoso e leve com recursos de ponta",
    "features.speed.title": "Velocidade Máxima",
    "features.speed.desc":
      "O motor de download multiprocesso maximiza sua banda larga para a velocidade de download mais rápida",
    "features.cross.title": "Multiplataforma",
    "features.cross.desc":
      "Disponível no Windows, macOS, Linux, Android, iOS e Web — um gerenciador de downloads para todos os dispositivos",
    "features.protocol.title": "Multiprotocolo",
    "features.protocol.desc":
      "Suporta HTTP, HTTPS, BitTorrent, magnet, ed2k e mais protocolos de download",
    "features.extension.title": "Extensível",
    "features.extension.desc":
      "Poderoso sistema de extensões JavaScript — adicione download do YouTube, HuggingFace, armazenamento em nuvem e mais",
    "features.api.title": "Suporte à API",
    "features.api.desc":
      "API RESTful para automação, integração e gerenciamento remoto de downloads",
    "features.open.title": "Código Aberto",
    "features.open.desc":
      "100% gratuito e de código aberto, movido pela comunidade. Sem anúncios, sem rastreamento.",

    // Extensions
    "extensions.title": "Extensões Poderosas",
    "extensions.subtitle":
      "Expanda os recursos de download do Gopeed através do sistema de extensões JavaScript",
    "extensions.youtube.title": "Download de Vídeos do YouTube",
    "extensions.youtube.desc":
      "Baixe vídeos e playlists do YouTube em várias qualidades e formatos, incluindo 4K e 1080p.",
    "extensions.huggingface.title": "Download de Modelos do HuggingFace",
    "extensions.huggingface.desc":
      "Baixe arquivos de modelos de IA do HuggingFace com suporte a retomada e verificação automática de arquivos.",
    "extensions.cloud.title": "Download de Armazenamento em Nuvem",
    "extensions.cloud.desc":
      "Baixe arquivos de vários serviços de armazenamento em nuvem, contorne limites de velocidade e baixe em lote com facilidade.",
    "extensions.store": "Loja de Extensões",
    "extensions.storeDesc":
      "Navegue e instale extensões de download contribuídas pela comunidade",
    "extensions.devDocs": "Documentação de Desenvolvimento",
    "extensions.devDocsDesc":
      "Aprenda como desenvolver suas próprias extensões de download usando JavaScript",

    // Downloads
    "downloads.title": "Baixar Gopeed",
    "downloads.subtitle": "Escolha a versão adequada para sua plataforma",
    "downloads.platform": "Plataforma",
    "downloads.os": "Sistema Operacional",
    "downloads.arch": "Arquitetura de CPU",
    "downloads.type": "Tipo",
    "downloads.download": "Baixar",
    "downloads.size": "Tamanho",
    "downloads.version": "Versão",
    "downloads.installVia": "Instalar via linha de comando",
    "downloads.installer": "Instalador",
    "downloads.portable": "Portátil",
    "downloads.package": "Pacote",
    "downloads.universal": "Universal",
    "downloads.file": "Arquivo",
    "downloads.preparing": "Preparando...",

    // Docs sidebar tabs
    "docs.tab.documentation": "Documentação",
    "docs.tab.apiReference": "Referência da API",

    // Store
    "store.title": "Loja de Extensões",
    "store.subtitle":
      "Navegue e instale extensões da comunidade para o Gopeed — YouTube, HuggingFace, armazenamento em nuvem e mais",
    "store.search": "Pesquisar extensões...",
    "store.install": "Instalar",
    "store.installing": "Instalando...",
    "store.installed": "Instalado",
    "store.installs": "{count} instalações",
    "store.stars": "{count} estrelas",
    "store.version": "v{version}",
    "store.noResults": "Nenhuma extensão encontrada",
    "store.noResultsDesc":
      "Tente um termo de pesquisa diferente ou verifique novamente mais tarde.",
    "store.loading": "Carregando extensões...",
    "store.error": "Falha ao carregar extensões",
    "store.viewSource": "Ver código-fonte",
    "store.openGopeed": "Abrir no Gopeed",
    "store.sortBy": "Ordenar por",
    "store.sort.installs": "Mais instaladas",
    "store.sort.stars": "Mais estrelas",
    "store.sort.updated": "Recentemente atualizadas",
    "store.count.one": "{count} extensão",
    "store.count.other": "{count} extensões",
    "store.copyUrl": "Copiar URL de instalação",
    "store.copied": "Copiado!",
    "store.installFailed":
      "A instalação automática falhou. Copie a URL e instale manualmente no Gopeed.",
    "store.empty": "Sem extensões ainda",
    "store.emptyDesc":
      "As extensões aparecerão aqui após a sincronização do GitHub.",

    // Store detail page
    "store.detail.back": "Voltar à loja",
    "store.detail.install": "Instalar",
    "store.detail.copyUrl": "Copiar URL",
    "store.detail.copied": "Copiado!",
    "store.detail.viewSource": "Ver código-fonte",
    "store.detail.installFailed":
      "A instalação automática falhou. Copie a URL e instale manualmente no Gopeed.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "Nenhum README disponível para esta extensão.",
    "store.detail.installs": "Instalações",
    "store.detail.stars": "Estrelas",
    "store.detail.version": "Versão",
    "store.detail.author": "Autor",
    "store.detail.updated": "Atualizado",
    "store.detail.notFound": "Extensão não encontrada",
    "store.detail.notFoundDesc": "A extensão que você procura não existe.",

    // Footer
    "footer.docs": "Documentação",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.contact": "Entre em Contato",
    "footer.donate": "Doar",
    "footer.wechatFollow": "Siga a conta oficial para mais informações",
    "footer.copyright": "© {year} Gopeed. Todos os direitos reservados.",
  },
  fr: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - Gestionnaire de téléchargement gratuit, moderne et open source | HTTP, BitTorrent, Magnet et ed2k",
    "site.description":
      "Gopeed est un gestionnaire de téléchargement gratuit et open source prenant en charge HTTP, HTTPS, BitTorrent, magnet et ed2k. Téléchargements multiprocessus haute vitesse sur Windows, macOS, Linux, Android et iOS. Développé avec Golang et Flutter.",

    // SEO-specific metadata
    "seo.keywords.en":
      "gestionnaire de téléchargement,gestionnaire de téléchargement gratuit,téléchargeur open source,client BitTorrent,téléchargeur de magnet,lien ed2k,téléchargeur HTTP,téléchargement multiprocessus,Gopeed,téléchargeur torrent,gestionnaire de téléchargement multiplateforme,téléchargeur de fichiers,accélérateur de téléchargement",
    "seo.keywords.store":
      "extensions Gopeed,extensions de téléchargement,téléchargeur YouTube,téléchargeur HuggingFace,téléchargeur de stockage cloud,extension de navigateur",

    // Navigation
    "nav.docs": "Documentation",
    "nav.store": "Boutique",
    "nav.api": "API",
    "nav.openMenu": "Ouvrir le menu",

    // Theme
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.system": "Système",

    // Hero
    "hero.title": "Gestionnaire de téléchargement moderne",
    "hero.subtitle":
      "Prend en charge les téléchargements multiprotocole HTTP, BitTorrent, magnet et ed2k — gratuit, open source et disponible sur toutes les plateformes.",
    "hero.downloadNow": "Télécharger maintenant",
    "hero.downloadFor": "Télécharger pour {platform}",
    "hero.moreVersions": "Plus de versions",
    "hero.extension": "Extension",
    "hero.previewAlt": "Aperçu de Gopeed sur ordinateur",
    "hero.preparing": "Préparation...",

    // Features
    "features.title": "Pourquoi choisir Gopeed ?",
    "features.subtitle":
      "Un gestionnaire de téléchargement puissant et léger avec des fonctionnalités de pointe",
    "features.speed.title": "Vitesse fulgurante",
    "features.speed.desc":
      "Le moteur de téléchargement multiprocessus maximise votre bande passante pour des vitesses de téléchargement optimales",
    "features.cross.title": "Multiplateforme",
    "features.cross.desc":
      "Disponible sur Windows, macOS, Linux, Android, iOS et Web — un seul gestionnaire pour tous vos appareils",
    "features.protocol.title": "Multiprotocole",
    "features.protocol.desc":
      "Prend en charge HTTP, HTTPS, BitTorrent, magnet, ed2k et d'autres protocoles de téléchargement",
    "features.extension.title": "Extensible",
    "features.extension.desc":
      "Puissant système d'extensions JavaScript — ajoutez le téléchargement YouTube, HuggingFace, stockage cloud et plus encore",
    "features.api.title": "Support API",
    "features.api.desc":
      "API RESTful pour l'automatisation, l'intégration et la gestion à distance des téléchargements",
    "features.open.title": "Open source",
    "features.open.desc":
      "100% gratuit et open source, propulsé par la communauté. Sans publicité, sans pistage.",

    // Extensions
    "extensions.title": "Extensions puissantes",
    "extensions.subtitle":
      "Étendez les capacités de téléchargement de Gopeed grâce au système d'extensions JavaScript",
    "extensions.youtube.title": "Téléchargement de vidéos YouTube",
    "extensions.youtube.desc":
      "Téléchargez des vidéos et des playlists YouTube dans diverses qualités et formats, y compris 4K et 1080p.",
    "extensions.huggingface.title": "Téléchargement de modèles HuggingFace",
    "extensions.huggingface.desc":
      "Téléchargez des fichiers de modèles IA depuis HuggingFace avec reprise et vérification automatique des fichiers.",
    "extensions.cloud.title": "Téléchargement depuis le stockage cloud",
    "extensions.cloud.desc":
      "Téléchargez des fichiers depuis divers services de stockage cloud, contournez les limites de vitesse et téléchargez par lots facilement.",
    "extensions.store": "Boutique d'extensions",
    "extensions.storeDesc":
      "Parcourez et installez des extensions de téléchargement contribuées par la communauté",
    "extensions.devDocs": "Documentation développeur",
    "extensions.devDocsDesc":
      "Apprenez à développer vos propres extensions de téléchargement avec JavaScript",

    // Downloads
    "downloads.title": "Télécharger Gopeed",
    "downloads.subtitle": "Choisissez la version adaptée à votre plateforme",
    "downloads.platform": "Plateforme",
    "downloads.os": "Système d'exploitation",
    "downloads.arch": "Architecture CPU",
    "downloads.type": "Type",
    "downloads.download": "Télécharger",
    "downloads.size": "Taille",
    "downloads.version": "Version",
    "downloads.installVia": "Installer via la ligne de commande",
    "downloads.installer": "Installateur",
    "downloads.portable": "Portable",
    "downloads.package": "Paquet",
    "downloads.universal": "Universel",
    "downloads.file": "Fichier",
    "downloads.preparing": "Préparation...",

    // Docs sidebar tabs
    "docs.tab.documentation": "Documentation",
    "docs.tab.apiReference": "Référence API",

    // Store
    "store.title": "Boutique d'extensions",
    "store.subtitle":
      "Parcourez et installez les extensions communautaires pour Gopeed — YouTube, HuggingFace, stockage cloud et plus",
    "store.search": "Rechercher des extensions...",
    "store.install": "Installer",
    "store.installing": "Installation...",
    "store.installed": "Installé",
    "store.installs": "{count} installations",
    "store.stars": "{count} étoiles",
    "store.version": "v{version}",
    "store.noResults": "Aucune extension trouvée",
    "store.noResultsDesc":
      "Essayez un autre terme de recherche ou revenez plus tard.",
    "store.loading": "Chargement des extensions...",
    "store.error": "Échec du chargement des extensions",
    "store.viewSource": "Voir le code source",
    "store.openGopeed": "Ouvrir dans Gopeed",
    "store.sortBy": "Trier par",
    "store.sort.installs": "Plus installées",
    "store.sort.stars": "Plus d'étoiles",
    "store.sort.updated": "Récemment mises à jour",
    "store.count.one": "{count} extension",
    "store.count.other": "{count} extensions",
    "store.copyUrl": "Copier l'URL d'installation",
    "store.copied": "Copié !",
    "store.installFailed":
      "L'installation automatique a échoué. Veuillez copier l'URL et installer manuellement dans Gopeed.",
    "store.empty": "Aucune extension pour le moment",
    "store.emptyDesc":
      "Les extensions apparaîtront ici une fois synchronisées depuis GitHub.",

    // Store detail page
    "store.detail.back": "Retour à la boutique",
    "store.detail.install": "Installer",
    "store.detail.copyUrl": "Copier l'URL",
    "store.detail.copied": "Copié !",
    "store.detail.viewSource": "Voir le code source",
    "store.detail.installFailed":
      "L'installation automatique a échoué. Veuillez copier l'URL et installer manuellement dans Gopeed.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "Aucun README disponible pour cette extension.",
    "store.detail.installs": "Installations",
    "store.detail.stars": "Étoiles",
    "store.detail.version": "Version",
    "store.detail.author": "Auteur",
    "store.detail.updated": "Mis à jour",
    "store.detail.notFound": "Extension non trouvée",
    "store.detail.notFoundDesc":
      "L'extension que vous recherchez n'existe pas.",

    // Footer
    "footer.docs": "Documentation",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.contact": "Nous contacter",
    "footer.donate": "Faire un don",
    "footer.wechatFollow": "Suivez le compte officiel pour plus d'informations",
    "footer.copyright": "© {year} Gopeed. Tous droits réservés.",
  },
  de: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - Kostenloser, moderner Open-Source-Download-Manager | HTTP, BitTorrent, Magnet und ed2k",
    "site.description":
      "Gopeed ist ein kostenloser Open-Source-Download-Manager mit Unterstützung für HTTP, HTTPS, BitTorrent, Magnet und ed2k. Multi-Thread-Hochgeschwindigkeits-Downloads auf Windows, macOS, Linux, Android und iOS. Entwickelt mit Golang und Flutter.",

    // SEO-specific metadata
    "seo.keywords.en":
      "Download-Manager,kostenloser Download-Manager,Open-Source-Downloader,BitTorrent-Client,Magnet-Link-Downloader,ed2k-Downloader,HTTP-Downloader,Multi-Thread-Download,Gopeed,Torrent-Downloader,plattformübergreifender Download-Manager,Datei-Downloader,Download-Beschleuniger",
    "seo.keywords.store":
      "Gopeed-Erweiterungen,Download-Erweiterungen,YouTube-Downloader,HuggingFace-Downloader,Cloud-Speicher-Downloader,Browser-Erweiterung",

    // Navigation
    "nav.docs": "Dokumentation",
    "nav.store": "Store",
    "nav.api": "API",
    "nav.openMenu": "Menü öffnen",

    // Theme
    "theme.light": "Hell",
    "theme.dark": "Dunkel",
    "theme.system": "System",

    // Hero
    "hero.title": "Moderner Download-Manager",
    "hero.subtitle":
      "Unterstützt HTTP-, BitTorrent-, Magnet- und ed2k-Multiprotokoll-Downloads — kostenlos, Open Source und auf jeder Plattform verfügbar.",
    "hero.downloadNow": "Jetzt herunterladen",
    "hero.downloadFor": "Herunterladen für {platform}",
    "hero.moreVersions": "Weitere Versionen",
    "hero.extension": "Erweiterung",
    "hero.previewAlt": "Gopeed Desktop-Vorschau",
    "hero.preparing": "Vorbereitung...",

    // Features
    "features.title": "Warum Gopeed wählen?",
    "features.subtitle":
      "Ein leistungsstarker und leichtgewichtiger Download-Manager mit modernsten Funktionen",
    "features.speed.title": "Blitzschnell",
    "features.speed.desc":
      "Die Multi-Thread-Download-Engine maximiert deine Bandbreite für die schnellsten Download-Geschwindigkeiten",
    "features.cross.title": "Plattformübergreifend",
    "features.cross.desc":
      "Verfügbar auf Windows, macOS, Linux, Android, iOS und Web — ein Download-Manager für alle Geräte",
    "features.protocol.title": "Multiprotokoll",
    "features.protocol.desc":
      "Unterstützt HTTP, HTTPS, BitTorrent, Magnet, ed2k und weitere Download-Protokolle",
    "features.extension.title": "Erweiterbar",
    "features.extension.desc":
      "Leistungsfähiges JavaScript-Erweiterungssystem — YouTube-, HuggingFace-, Cloud-Speicher-Downloads und mehr hinzufügen",
    "features.api.title": "API-Unterstützung",
    "features.api.desc":
      "RESTful API für Automatisierung, Integration und Remote-Download-Verwaltung",
    "features.open.title": "Open Source",
    "features.open.desc":
      "100% kostenlos und Open Source, Community-getrieben. Keine Werbung, kein Tracking.",

    // Extensions
    "extensions.title": "Leistungsstarke Erweiterungen",
    "extensions.subtitle":
      "Erweitern Sie Gopeeds Download-Funktionen durch das JavaScript-Erweiterungssystem",
    "extensions.youtube.title": "YouTube-Video-Download",
    "extensions.youtube.desc":
      "Laden Sie YouTube-Videos und Playlists in verschiedenen Qualitäten und Formaten herunter, einschließlich 4K und 1080p.",
    "extensions.huggingface.title": "HuggingFace-Modell-Download",
    "extensions.huggingface.desc":
      "Laden Sie KI-Modelldateien von HuggingFace mit Fortsetzungsunterstützung und automatischer Dateiüberprüfung herunter.",
    "extensions.cloud.title": "Cloud-Speicher-Download",
    "extensions.cloud.desc":
      "Laden Sie Dateien von verschiedenen Cloud-Speicherdiensten herunter, umgehen Sie Geschwindigkeitsbegrenzungen und laden Sie bequem stapelweise herunter.",
    "extensions.store": "Erweiterungs-Store",
    "extensions.storeDesc":
      "Durchsuchen und installieren Sie Community-Download-Erweiterungen",
    "extensions.devDocs": "Entwicklerdokumentation",
    "extensions.devDocsDesc":
      "Lernen Sie, wie Sie eigene Download-Erweiterungen mit JavaScript entwickeln",

    // Downloads
    "downloads.title": "Gopeed herunterladen",
    "downloads.subtitle": "Wählen Sie die Version für Ihre Plattform",
    "downloads.platform": "Plattform",
    "downloads.os": "Betriebssystem",
    "downloads.arch": "CPU-Architektur",
    "downloads.type": "Typ",
    "downloads.download": "Herunterladen",
    "downloads.size": "Größe",
    "downloads.version": "Version",
    "downloads.installVia": "Über Kommandozeile installieren",
    "downloads.installer": "Installationsprogramm",
    "downloads.portable": "Portable",
    "downloads.package": "Paket",
    "downloads.universal": "Universal",
    "downloads.file": "Datei",
    "downloads.preparing": "Vorbereitung...",

    // Docs sidebar tabs
    "docs.tab.documentation": "Dokumentation",
    "docs.tab.apiReference": "API-Referenz",

    // Store
    "store.title": "Erweiterungs-Store",
    "store.subtitle":
      "Durchsuchen und installieren Sie Community-Erweiterungen für Gopeed — YouTube, HuggingFace, Cloud-Speicher und mehr",
    "store.search": "Erweiterungen suchen...",
    "store.install": "Installieren",
    "store.installing": "Installation...",
    "store.installed": "Installiert",
    "store.installs": "{count} Installationen",
    "store.stars": "{count} Sterne",
    "store.version": "v{version}",
    "store.noResults": "Keine Erweiterungen gefunden",
    "store.noResultsDesc":
      "Versuchen Sie einen anderen Suchbegriff oder schauen Sie später vorbei.",
    "store.loading": "Erweiterungen werden geladen...",
    "store.error": "Erweiterungen konnten nicht geladen werden",
    "store.viewSource": "Quellcode anzeigen",
    "store.openGopeed": "In Gopeed öffnen",
    "store.sortBy": "Sortieren nach",
    "store.sort.installs": "Meistinstallierte",
    "store.sort.stars": "Meiste Sterne",
    "store.sort.updated": "Kürzlich aktualisiert",
    "store.count.one": "{count} Erweiterung",
    "store.count.other": "{count} Erweiterungen",
    "store.copyUrl": "Installations-URL kopieren",
    "store.copied": "Kopiert!",
    "store.installFailed":
      "Automatische Installation fehlgeschlagen. Bitte kopieren Sie die URL und installieren Sie manuell in Gopeed.",
    "store.empty": "Noch keine Erweiterungen",
    "store.emptyDesc":
      "Erweiterungen werden hier angezeigt, sobald sie von GitHub synchronisiert wurden.",

    // Store detail page
    "store.detail.back": "Zurück zum Store",
    "store.detail.install": "Installieren",
    "store.detail.copyUrl": "URL kopieren",
    "store.detail.copied": "Kopiert!",
    "store.detail.viewSource": "Quellcode anzeigen",
    "store.detail.installFailed":
      "Automatische Installation fehlgeschlagen. Bitte kopieren Sie die URL und installieren Sie manuell in Gopeed.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "Kein README für diese Erweiterung verfügbar.",
    "store.detail.installs": "Installationen",
    "store.detail.stars": "Sterne",
    "store.detail.version": "Version",
    "store.detail.author": "Autor",
    "store.detail.updated": "Aktualisiert",
    "store.detail.notFound": "Erweiterung nicht gefunden",
    "store.detail.notFoundDesc": "Die gesuchte Erweiterung existiert nicht.",

    // Footer
    "footer.docs": "Dokumentation",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.contact": "Kontakt",
    "footer.donate": "Spenden",
    "footer.wechatFollow":
      "Folgen Sie dem offiziellen Konto für weitere Informationen",
    "footer.copyright": "© {year} Gopeed. Alle Rechte vorbehalten.",
  },
  ru: {
    // Site
    "site.name": "Gopeed",
    "site.title":
      "Gopeed - Бесплатный современный менеджер загрузок с открытым исходным кодом | HTTP, BitTorrent, Magnet и ed2k",
    "site.description":
      "Gopeed — бесплатный менеджер загрузок с открытым исходным кодом, поддерживающий HTTP, HTTPS, BitTorrent, magnet и ed2k. Многопоточные загрузки на высокой скорости для Windows, macOS, Linux, Android и iOS. Создан на Golang и Flutter.",

    // SEO-specific metadata
    "seo.keywords.en":
      "менеджер загрузок,бесплатный менеджер загрузок,загрузчик с открытым исходным кодом,BitTorrent-клиент,загрузчик magnet-ссылок,ed2k-загрузчик,HTTP-загрузчик,многопоточная загрузка,Gopeed,торрент-загрузчик,кроссплатформенный менеджер загрузок,файловый загрузчик,акселератор загрузок",
    "seo.keywords.store":
      "расширения Gopeed,расширения для загрузок,загрузчик YouTube,загрузчик HuggingFace,загрузчик облачных хранилищ,расширение для браузера",

    // Navigation
    "nav.docs": "Документация",
    "nav.store": "Магазин",
    "nav.api": "API",
    "nav.openMenu": "Открыть меню",

    // Theme
    "theme.light": "Светлая",
    "theme.dark": "Тёмная",
    "theme.system": "Системная",

    // Hero
    "hero.title": "Современный менеджер загрузок",
    "hero.subtitle":
      "Поддержка многопротокольных загрузок HTTP, BitTorrent, magnet и ed2k — бесплатный, с открытым исходным кодом, доступен на всех платформах.",
    "hero.downloadNow": "Скачать сейчас",
    "hero.downloadFor": "Скачать для {platform}",
    "hero.moreVersions": "Другие версии",
    "hero.extension": "Расширение",
    "hero.previewAlt": "Предпросмотр Gopeed на компьютере",
    "hero.preparing": "Подготовка...",

    // Features
    "features.title": "Почему выбирают Gopeed?",
    "features.subtitle":
      "Мощный и лёгкий менеджер загрузок с передовыми функциями",
    "features.speed.title": "Молниеносная скорость",
    "features.speed.desc":
      "Многопоточный движок загрузки максимально использует вашу пропускную способность для достижения наивысшей скорости",
    "features.cross.title": "Кроссплатформенность",
    "features.cross.desc":
      "Доступен на Windows, macOS, Linux, Android, iOS и в веб — один менеджер загрузок для всех устройств",
    "features.protocol.title": "Мультипротокольность",
    "features.protocol.desc":
      "Поддержка HTTP, HTTPS, BitTorrent, magnet, ed2k и других протоколов загрузки",
    "features.extension.title": "Расширяемость",
    "features.extension.desc":
      "Мощная система расширений на JavaScript — добавляйте загрузку с YouTube, HuggingFace, облачных хранилищ и многое другое",
    "features.api.title": "Поддержка API",
    "features.api.desc":
      "RESTful API для автоматизации, интеграции и удалённого управления загрузками",
    "features.open.title": "Открытый исходный код",
    "features.open.desc":
      "100% бесплатно и с открытым исходным кодом, управляется сообществом. Без рекламы, без отслеживания.",

    // Extensions
    "extensions.title": "Мощные расширения",
    "extensions.subtitle":
      "Расширяйте возможности загрузки Gopeed с помощью системы расширений на JavaScript",
    "extensions.youtube.title": "Загрузка видео с YouTube",
    "extensions.youtube.desc":
      "Скачивайте видео и плейлисты с YouTube в различных качествах и форматах, включая 4K и 1080p.",
    "extensions.huggingface.title": "Загрузка моделей HuggingFace",
    "extensions.huggingface.desc":
      "Скачивайте файлы ИИ-моделей с HuggingFace с поддержкой возобновления и автоматической проверки файлов.",
    "extensions.cloud.title": "Загрузка из облачных хранилищ",
    "extensions.cloud.desc":
      "Скачивайте файлы из различных облачных хранилищ, обходите ограничения скорости и легко загружайте пакеты файлов.",
    "extensions.store": "Магазин расширений",
    "extensions.storeDesc":
      "Просматривайте и устанавливайте расширения для загрузок от сообщества",
    "extensions.devDocs": "Документация для разработчиков",
    "extensions.devDocsDesc":
      "Узнайте, как создавать собственные расширения для загрузок на JavaScript",

    // Downloads
    "downloads.title": "Скачать Gopeed",
    "downloads.subtitle": "Выберите версию для вашей платформы",
    "downloads.platform": "Платформа",
    "downloads.os": "Операционная система",
    "downloads.arch": "Архитектура процессора",
    "downloads.type": "Тип",
    "downloads.download": "Скачать",
    "downloads.size": "Размер",
    "downloads.version": "Версия",
    "downloads.installVia": "Установить через командную строку",
    "downloads.installer": "Установщик",
    "downloads.portable": "Портативная",
    "downloads.package": "Пакет",
    "downloads.universal": "Универсальная",
    "downloads.file": "Файл",
    "downloads.preparing": "Подготовка...",

    // Docs sidebar tabs
    "docs.tab.documentation": "Документация",
    "docs.tab.apiReference": "Справочник API",

    // Store
    "store.title": "Магазин расширений",
    "store.subtitle":
      "Просматривайте и устанавливайте расширения сообщества для Gopeed — YouTube, HuggingFace, облачные хранилища и другое",
    "store.search": "Поиск расширений...",
    "store.install": "Установить",
    "store.installing": "Установка...",
    "store.installed": "Установлено",
    "store.installs": "{count} установок",
    "store.stars": "{count} звёзд",
    "store.version": "v{version}",
    "store.noResults": "Расширения не найдены",
    "store.noResultsDesc":
      "Попробуйте другой поисковый запрос или зайдите позже.",
    "store.loading": "Загрузка расширений...",
    "store.error": "Не удалось загрузить расширения",
    "store.viewSource": "Просмотр исходного кода",
    "store.openGopeed": "Открыть в Gopeed",
    "store.sortBy": "Сортировка",
    "store.sort.installs": "По установкам",
    "store.sort.stars": "По звёздам",
    "store.sort.updated": "Недавно обновлённые",
    "store.count.one": "{count} расширение",
    "store.count.other": "{count} расширений",
    "store.copyUrl": "Копировать URL установки",
    "store.copied": "Скопировано!",
    "store.installFailed":
      "Автоматическая установка не удалась. Скопируйте URL и установите вручную в Gopeed.",
    "store.empty": "Расширений пока нет",
    "store.emptyDesc":
      "Расширения появятся здесь после синхронизации с GitHub.",

    // Store detail page
    "store.detail.back": "Вернуться в магазин",
    "store.detail.install": "Установить",
    "store.detail.copyUrl": "Копировать URL",
    "store.detail.copied": "Скопировано!",
    "store.detail.viewSource": "Просмотр исходного кода",
    "store.detail.installFailed":
      "Автоматическая установка не удалась. Скопируйте URL и установите вручную в Gopeed.",
    "store.detail.readme": "README",
    "store.detail.noReadme": "README для этого расширения недоступен.",
    "store.detail.installs": "Установки",
    "store.detail.stars": "Звёзды",
    "store.detail.version": "Версия",
    "store.detail.author": "Автор",
    "store.detail.updated": "Обновлено",
    "store.detail.notFound": "Расширение не найдено",
    "store.detail.notFoundDesc": "Расширение, которое вы ищете, не существует.",

    // Footer
    "footer.docs": "Документация",
    "footer.privacy": "Политика конфиденциальности",
    "footer.terms": "Условия использования",
    "footer.contact": "Связаться с нами",
    "footer.donate": "Поддержать",
    "footer.wechatFollow":
      "Подпишитесь на официальный аккаунт для получения дополнительной информации",
    "footer.copyright": "© {year} Gopeed. Все права защищены.",
  },
};

export function getTranslation(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>,
): string {
  let text = translations[locale]?.[key] || translations.en[key] || key;

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }

  return text;
}

export function useTranslation(locale: Locale) {
  return {
    t: (key: string, params?: Record<string, string | number>) =>
      getTranslation(locale, key, params),
    locale,
  };
}
