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
