import type { Locale } from "../i18n";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Site
    "site.name": "Gopeed",
    "site.title": "Gopeed - A Modern Download Manager",
    "site.description":
      "A modern download manager that supports all platforms. Built with Golang and Flutter.",

    // Navigation
    "nav.docs": "Docs",
    "nav.store": "Store",
    "nav.openMenu": "Open menu",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Hero
    "hero.title": "A Modern Downloader Manager",
    "hero.subtitle":
      "Cross-platform, clean interface, fast downloads. Download experience made easy.",
    "hero.downloadNow": "Download Now",
    "hero.downloadFor": "Download for {platform}",
    "hero.moreVersions": "More Versions",
    "hero.extension": "Extension",
    "hero.previewAlt": "Gopeed Desktop Preview",
    "hero.preparing": "Preparing...",

    // Features
    "features.title": "Why Choose Gopeed?",
    "features.subtitle":
      "A powerful yet lightweight downloader with amazing features",
    "features.speed.title": "Lightning Fast",
    "features.speed.desc": "Multi-threaded download engine for maximum speed",
    "features.cross.title": "Cross Platform",
    "features.cross.desc":
      "Available on Windows, macOS, Linux, Android, iOS, and Web",
    "features.protocol.title": "Multi Protocol",
    "features.protocol.desc":
      "Support HTTP, BitTorrent, Magnet and more protocols",
    "features.extension.title": "Extensible",
    "features.extension.desc": "Powerful extension system based on JavaScript",
    "features.api.title": "API Support",
    "features.api.desc": "RESTful API for automation and integration",
    "features.open.title": "Open Source",
    "features.open.desc": "Free and open source, community driven development",

    // Extensions
    "extensions.title": "Powerful Extensions",
    "extensions.subtitle": "Extend functionality through the extension system",
    "extensions.youtube.title": "YouTube Video Download",
    "extensions.youtube.desc":
      "Easily download YouTube videos and playlists, supporting different quality and formats.",
    "extensions.huggingface.title": "HuggingFace Model Download",
    "extensions.huggingface.desc":
      "Quickly download AI model files with resume support and automatic file verification.",
    "extensions.cloud.title": "Cloud Storage Download",
    "extensions.cloud.desc":
      "Support various cloud storage file downloads, break speed limits, batch download made easy.",
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
    "site.title": "Gopeed - 现代化下载器",
    "site.description":
      "一款支持全平台的现代化下载器，使用 Golang 和 Flutter 构建。",

    // Navigation
    "nav.docs": "文档",
    "nav.store": "商店",
    "nav.openMenu": "打开菜单",

    // Theme
    "theme.light": "浅色",
    "theme.dark": "深色",
    "theme.system": "系统",

    // Hero
    "hero.title": "一款现代化下载器",
    "hero.subtitle": "支持全平台，界面简洁，下载快速，让下载体验更轻松",
    "hero.downloadNow": "立即下载",
    "hero.downloadFor": "下载 {platform} 版",
    "hero.moreVersions": "更多版本",
    "hero.extension": "扩展",
    "hero.previewAlt": "Gopeed 桌面端预览",
    "hero.preparing": "准备中...",

    // Features
    "features.title": "为什么选择 Gopeed？",
    "features.subtitle": "一个功能强大而轻量的下载器",
    "features.speed.title": "极速下载",
    "features.speed.desc": "多线程下载引擎，实现最大下载速度",
    "features.cross.title": "跨平台",
    "features.cross.desc": "支持 Windows、macOS、Linux、Android、iOS 和 Web",
    "features.protocol.title": "多协议",
    "features.protocol.desc": "支持 HTTP、BitTorrent、磁力链接等多种协议",
    "features.extension.title": "可扩展",
    "features.extension.desc": "基于 JavaScript 的强大扩展系统",
    "features.api.title": "API 支持",
    "features.api.desc": "RESTful API 支持自动化和集成",
    "features.open.title": "开源免费",
    "features.open.desc": "开源免费，社区驱动开发",

    // Extensions
    "extensions.title": "强大的扩展能力",
    "extensions.subtitle": "使用 JavaScript 编写扩展，轻松实现各类下载需求",
    "extensions.youtube.title": "YouTube 视频下载",
    "extensions.youtube.desc":
      "轻松下载 YouTube 视频和播放列表，支持选择不同清晰度和格式。",
    "extensions.huggingface.title": "HuggingFace 模型下载",
    "extensions.huggingface.desc":
      "快速下载 AI 模型文件，支持断点续传，自动验证文件完整性。",
    "extensions.cloud.title": "网盘文件下载",
    "extensions.cloud.desc":
      "支持各类网盘的文件下载，突破速度限制，批量下载更便捷。",
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
    "site.title": "Gopeed - 現代化下載器",
    "site.description":
      "一款支援全平台的現代化下載器，使用 Golang 和 Flutter 建構。",

    // Navigation
    "nav.docs": "文件",
    "nav.store": "商店",
    "nav.openMenu": "開啟選單",

    // Theme
    "theme.light": "淺色",
    "theme.dark": "深色",
    "theme.system": "系統",

    // Hero
    "hero.title": "一款現代化下載器",
    "hero.subtitle": "支援全平台，介面簡潔，下載快速，讓下載體驗更輕鬆",
    "hero.downloadNow": "立即下載",
    "hero.downloadFor": "下載 {platform} 版",
    "hero.moreVersions": "更多版本",
    "hero.extension": "擴充功能",
    "hero.previewAlt": "Gopeed 桌面端預覽",
    "hero.preparing": "準備中...",

    // Features
    "features.title": "為什麼選擇 Gopeed？",
    "features.subtitle": "一個功能強大而輕量的下載器",
    "features.speed.title": "極速下載",
    "features.speed.desc": "多執行緒下載引擎，實現最大下載速度",
    "features.cross.title": "跨平台",
    "features.cross.desc": "支援 Windows、macOS、Linux、Android、iOS 和 Web",
    "features.protocol.title": "多協定",
    "features.protocol.desc": "支援 HTTP、BitTorrent、磁力連結等多種協定",
    "features.extension.title": "可擴充",
    "features.extension.desc": "基於 JavaScript 的強大擴充系統",
    "features.api.title": "API 支援",
    "features.api.desc": "RESTful API 支援自動化和整合",
    "features.open.title": "開源免費",
    "features.open.desc": "開源免費，社群驅動開發",

    // Extensions
    "extensions.title": "強大的擴充能力",
    "extensions.subtitle": "使用 JavaScript 編寫擴充功能，輕鬆實現各類下載需求",
    "extensions.youtube.title": "YouTube 影片下載",
    "extensions.youtube.desc":
      "輕鬆下載 YouTube 影片和播放清單，支援選擇不同解析度和格式。",
    "extensions.huggingface.title": "HuggingFace 模型下載",
    "extensions.huggingface.desc":
      "快速下載 AI 模型檔案，支援斷點續傳，自動驗證檔案完整性。",
    "extensions.cloud.title": "網盤檔案下載",
    "extensions.cloud.desc":
      "支援各類網盤的檔案下載，突破速度限制，批次下載更便捷。",
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

    // Footer
    "footer.docs": "文件",
    "footer.privacy": "隱私權政策",
    "footer.terms": "服務條款",
    "footer.contact": "聯絡我們",
    "footer.donate": "捐贈",
    "footer.wechatFollow": "關注公眾號獲取更多資訊",
    "footer.copyright": "© {year} Gopeed. 保留所有權利。",
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
