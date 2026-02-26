import type { ReleaseAsset } from "@/lib/data";

// ============================================================
// 类型定义
// ============================================================

export type ParsedReleaseAsset = {
  platform: string;
  arch: string;
  packageType: string;
  fileType: string;
  os?: string;
  name: string;
  browser_download_url: string;
  size: number;
};

export type DownloadFile = {
  name: string;
  type: "url" | "command";
  content: string;
  size?: number;
};

export type PackageType = {
  id: string;
  name: string;
  files: DownloadFile[];
};

export type Architecture = {
  id: string;
  name: string;
  packageTypes: PackageType[];
};

export type OperatingSystem = {
  id: string;
  name: string;
  architectures: Architecture[];
};

export type PlatformDef = {
  id: string;
  name: string;
  /** icon 标识符，UI 层映射为实际组件 */
  icon: string;
  operatingSystems: OperatingSystem[];
};

// ============================================================
// 统一配置：架构、包类型、平台
// ============================================================

/** 架构显示名称映射 (asset 中的 arch → UI 显示名) */
export const ARCH_DISPLAY_NAMES: Record<string, string> = {
  // 通用架构命名
  amd64: "x64",
  arm64: "ARM64",
  "386": "x86",
  universal: "Universal",
  // Android 专用架构命名
  "arm64-v8a": "ARM64",
  "armeabi-v7a": "ARMv7",
  x86_64: "x64",
};

/** 架构排序优先级（数字越小越靠前） */
export const ARCH_SORT_ORDER: Record<string, number> = {
  amd64: 1,
  "386": 2,
  arm64: 3,
  // Android 专用
  x86_64: 1,
  "arm64-v8a": 3,
  "armeabi-v7a": 4,
  universal: 5,
};

/** 包类型排序优先级 */
export const PACKAGE_TYPE_ORDER: Record<string, number> = {
  flathub: 1,
  snap: 2,
  installer: 3,
  portable: 4,
  deb: 5,
  rpm: 6,
  appimage: 7,
  apk: 8,
  ipa: 9,
  qpkg: 10,
  zip: 11,
  docker: 12,
};

/**
 * 浏览器检测到的 arch → asset 中使用的 arch
 * 用于 Hero 自动下载和 Downloads 默认选中
 *
 * 仅需配置浏览器检测值与 asset 命名不一致的映射：
 * - Windows: 浏览器返回 x64，asset 用 amd64
 * - Android: 浏览器返回 arm64，asset 用 arm64-v8a
 * - iOS: 统一为 universal
 * - macOS/Linux: 浏览器检测值已与 asset 一致，无需映射
 */
const BROWSER_ARCH_TO_ASSET: Record<string, Record<string, string>> = {
  windows: { x64: "amd64" },
  android: { arm64: "arm64-v8a" },
  ios: { "*": "universal" },
};

export function normalizeArchForAsset(
  platform: string,
  browserArch: string,
): string {
  const platformMap = BROWSER_ARCH_TO_ASSET[platform];
  if (platformMap) {
    if (platformMap["*"]) return platformMap["*"];
    if (platformMap[browserArch]) return platformMap[browserArch];
  }
  // macOS 等平台保持原值 (arm64, amd64, universal)
  return browserArch;
}

// ============================================================
// Asset 文件名解析规则
// ============================================================

const findInName = (name: string, items: string[]) =>
  items.find((item) => name.includes(item));

const createResult = (
  platform: string,
  arch: string,
  packageType: string,
  fileType: string,
  os?: string,
) => ({ platform, arch, packageType, fileType, os });

/** 平台匹配 & 解析规则（顺序敏感，gopeed-web 需在 windows/macos/linux 之前） */
const PLATFORM_PARSE_RULES = [
  {
    match: "gopeed-web",
    parse: (name: string) => {
      const os = findInName(name, ["windows", "macos", "linux"]);
      const arch = findInName(name, ["amd64", "arm64", "386"]);
      return os && arch ? createResult("web", arch, "zip", "ZIP", os) : null;
    },
  },
  {
    match: "windows",
    parse: (name: string) => {
      const arch = findInName(name, ["arm64", "amd64"]);
      if (!arch) return null;
      if (name.endsWith(".exe"))
        return createResult("windows", arch, "installer", "EXE");
      if (name.includes("-portable.zip"))
        return createResult("windows", arch, "portable", "ZIP");
      return null;
    },
  },
  {
    match: "macos",
    parse: (name: string) => {
      const arch = findInName(name, ["arm64", "amd64"]) || "universal";
      return createResult("macos", arch, "installer", "DMG");
    },
  },
  {
    match: "linux",
    parse: (name: string) => {
      const arch = findInName(name, ["amd64", "arm64"]);
      if (!arch) return null;
      const packageType = name.includes(".deb")
        ? "deb"
        : name.includes(".rpm")
          ? "rpm"
          : name.includes("AppImage")
            ? "appimage"
            : "snap";
      const fileType =
        packageType.charAt(0).toUpperCase() + packageType.slice(1);
      return createResult("linux", arch, packageType, fileType);
    },
  },
  {
    match: "android",
    parse: (name: string) => {
      let arch =
        findInName(name, ["x86_64", "arm64-v8a", "armeabi"]) || "universal";
      if (arch === "armeabi") arch = "armeabi-v7a";
      return createResult("android", arch, "apk", "APK");
    },
  },
  {
    match: "ios",
    parse: () => createResult("ios", "universal", "ipa", "IPA"),
  },
  {
    match: "qnap",
    parse: (name: string) => {
      const arch = findInName(name, ["arm64", "amd64"]);
      return arch ? createResult("qnap", arch, "qpkg", "QPKG") : null;
    },
  },
  {
    match: "docker",
    parse: () => createResult("docker", "universal", "docker", "Docker"),
  },
];

export function parseReleaseAsset(
  asset: ReleaseAsset,
): ParsedReleaseAsset | null {
  const name = asset.name;

  for (const rule of PLATFORM_PARSE_RULES) {
    if (name.includes(rule.match)) {
      const parsed = rule.parse(name);
      if (!parsed) return null;
      return {
        ...parsed,
        name,
        browser_download_url: asset.browser_download_url,
        size: asset.size,
      };
    }
  }

  return null;
}

// ============================================================
// 平台定义 & buildPlatformsFromAssets
// ============================================================

/** 额外的命令行安装包（不来自 GitHub Release） */
const EXTRA_COMMAND_PACKAGES: Record<string, PackageType[]> = {
  linux: [
    {
      id: "flathub",
      name: "Flathub",
      files: [
        {
          name: "Flatpak",
          type: "command",
          content: "flatpak install flathub com.gopeed.Gopeed",
        },
      ],
    },
    {
      id: "snap",
      name: "Snap",
      files: [
        {
          name: "Snap",
          type: "command",
          content: "sudo snap install gopeed",
        },
      ],
    },
  ],
  docker: [
    {
      id: "docker",
      name: "Docker",
      files: [
        {
          name: "Docker",
          type: "command",
          content: "docker run --name gopeed -d -p 9999:9999 liwei2633/gopeed",
        },
      ],
    },
  ],
};

/** 基础平台定义模板 */
function getBasePlatforms(): PlatformDef[] {
  return [
    {
      id: "windows",
      name: "Windows",
      icon: "windows",
      operatingSystems: [{ id: "windows", name: "Windows", architectures: [] }],
    },
    {
      id: "macos",
      name: "macOS",
      icon: "macos",
      operatingSystems: [{ id: "macos", name: "macOS", architectures: [] }],
    },
    {
      id: "linux",
      name: "Linux",
      icon: "linux",
      operatingSystems: [{ id: "linux", name: "Linux", architectures: [] }],
    },
    {
      id: "android",
      name: "Android",
      icon: "android",
      operatingSystems: [{ id: "android", name: "Android", architectures: [] }],
    },
    {
      id: "ios",
      name: "iOS",
      icon: "ios",
      operatingSystems: [{ id: "ios", name: "iOS", architectures: [] }],
    },
    {
      id: "docker",
      name: "Docker",
      icon: "docker",
      operatingSystems: [{ id: "docker", name: "Docker", architectures: [] }],
    },
    {
      id: "qnap",
      name: "QNAP",
      icon: "qnap",
      operatingSystems: [{ id: "qnap", name: "QNAP", architectures: [] }],
    },
    {
      id: "web",
      name: "Web",
      icon: "web",
      operatingSystems: [
        { id: "windows", name: "Windows", architectures: [] },
        { id: "macos", name: "macOS", architectures: [] },
        { id: "linux", name: "Linux", architectures: [] },
      ],
    },
  ];
}

/** 对架构列表按优先级排序 */
function sortArchitectures(archs: Architecture[]): void {
  archs.sort(
    (a, b) => (ARCH_SORT_ORDER[a.id] ?? 999) - (ARCH_SORT_ORDER[b.id] ?? 999),
  );
}

/** 对包类型列表按优先级排序 */
function sortPackageTypes(pkgs: PackageType[]): void {
  pkgs.sort(
    (a, b) =>
      (PACKAGE_TYPE_ORDER[a.id] ?? 999) - (PACKAGE_TYPE_ORDER[b.id] ?? 999),
  );
}

/**
 * 将 GitHub Release assets 转换为 Downloads 组件所需的平台结构
 */
export function buildPlatformsFromAssets(
  releaseAssets: ReleaseAsset[],
): PlatformDef[] {
  const basePlatforms = getBasePlatforms();

  // 第一步：解析所有 assets 并按 platform → key1 → key2 → files 分组
  // web: platform → os → arch → files
  // 其它: platform → arch → packageType → files
  type FileMap = Map<string, Map<string, Map<string, DownloadFile[]>>>;
  const assetMap: FileMap = new Map();

  const ensureArray = (
    map: FileMap,
    k1: string,
    k2: string,
    k3: string,
  ): DownloadFile[] => {
    if (!map.has(k1)) map.set(k1, new Map());
    const m1 = map.get(k1) as Map<string, Map<string, DownloadFile[]>>;
    if (!m1.has(k2)) m1.set(k2, new Map());
    const m2 = m1.get(k2) as Map<string, DownloadFile[]>;
    if (!m2.has(k3)) m2.set(k3, []);
    return m2.get(k3) as DownloadFile[];
  };

  for (const asset of releaseAssets) {
    const parsed = parseReleaseAsset(asset);
    if (!parsed) continue;

    const file: DownloadFile = {
      name: parsed.fileType,
      type: "url",
      content: parsed.name,
      size: parsed.size,
    };

    if (parsed.platform === "web") {
      if (!parsed.os) continue;
      ensureArray(assetMap, parsed.platform, parsed.os, parsed.arch).push(file);
    } else {
      ensureArray(
        assetMap,
        parsed.platform,
        parsed.arch,
        parsed.packageType,
      ).push(file);
    }
  }

  // 第二步：将分组数据填充到 basePlatforms 中
  for (const platform of basePlatforms) {
    if (platform.id === "web") {
      for (const os of platform.operatingSystems) {
        const osArchs = assetMap.get("web")?.get(os.id);
        if (!osArchs) continue;
        for (const [arch, files] of osArchs) {
          os.architectures.push({
            id: arch,
            name: ARCH_DISPLAY_NAMES[arch] ?? arch,
            packageTypes: [{ id: "zip", name: "", files }],
          });
        }
        sortArchitectures(os.architectures);
      }
    } else {
      const platformArchs = assetMap.get(platform.id);
      if (platformArchs) {
        for (const [arch, packageMap] of platformArchs) {
          const packageTypes: PackageType[] = [];
          for (const [pkgType, files] of packageMap) {
            packageTypes.push({ id: pkgType, name: "", files });
          }
          sortPackageTypes(packageTypes);

          const architecture: Architecture = {
            id: arch,
            name: ARCH_DISPLAY_NAMES[arch] ?? arch,
            packageTypes,
          };

          // 注入额外的命令行安装包
          const extraPkgs = EXTRA_COMMAND_PACKAGES[platform.id];
          if (extraPkgs) {
            for (const cmdPkg of extraPkgs) {
              if (!architecture.packageTypes.some((p) => p.id === cmdPkg.id)) {
                architecture.packageTypes.push(cmdPkg);
              }
            }
            sortPackageTypes(architecture.packageTypes);
          }

          platform.operatingSystems[0].architectures.push(architecture);
        }
        sortArchitectures(platform.operatingSystems[0].architectures);
      }
    }

    // Docker 特殊处理：即使没有 release asset，也添加命令行安装
    if (
      platform.id === "docker" &&
      platform.operatingSystems[0].architectures.length === 0
    ) {
      platform.operatingSystems[0].architectures.push({
        id: "universal",
        name: "Universal",
        packageTypes: EXTRA_COMMAND_PACKAGES.docker ?? [],
      });
    }
  }

  // 过滤掉没有任何架构的平台
  return basePlatforms.filter((p) =>
    p.operatingSystems.some((os) => os.architectures.length > 0),
  );
}

// ============================================================
// Hero 自动下载：匹配最优 asset
// ============================================================

export function getPreferredDownloadUrl(
  releaseAssets: ReleaseAsset[],
  platform: string,
  arch: string,
): string | null {
  const normalizedArch = normalizeArchForAsset(platform, arch);
  const parsedAssets = releaseAssets
    .map(parseReleaseAsset)
    .filter(Boolean) as ParsedReleaseAsset[];

  // 精确匹配
  let matching = parsedAssets.filter(
    (a) => a.platform === platform && a.arch === normalizedArch,
  );

  // macOS 回退到 universal
  if (
    !matching.length &&
    platform === "macos" &&
    normalizedArch !== "universal"
  ) {
    matching = parsedAssets.filter(
      (a) => a.platform === platform && a.arch === "universal",
    );
  }

  if (!matching.length) return null;

  const sorted = [...matching].sort(
    (a, b) =>
      (PACKAGE_TYPE_ORDER[a.packageType] ?? 999) -
      (PACKAGE_TYPE_ORDER[b.packageType] ?? 999),
  );

  return sorted[0]?.browser_download_url ?? null;
}

// ============================================================
// CDN 智能检测
// ============================================================

const CDN_DOMAINS = [
  "https://github.com",
  "https://fastgit.cc",
  "https://ghproxy.cc",
];

async function detectFastestCDN(): Promise<string> {
  const timeout = 3000;

  const promises = CDN_DOMAINS.map((domain) =>
    Promise.race([
      fetch(domain, { method: "HEAD", mode: "no-cors" }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout),
      ),
    ])
      .then(() => domain)
      .catch(() => null),
  );

  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
      return result.value;
    }
  }

  return CDN_DOMAINS[0];
}

function transformUrlWithCDN(url: string, cdnDomain: string): string {
  if (cdnDomain === CDN_DOMAINS[0] || !url.includes("github.com")) {
    return url;
  }
  return `${cdnDomain}/${url}`;
}

export async function getOptimizedDownloadUrl(url: string): Promise<string> {
  try {
    const fastestCDN = await detectFastestCDN();
    return transformUrlWithCDN(url, fastestCDN);
  } catch (error) {
    console.warn("Failed to optimize download URL:", error);
    return url;
  }
}
