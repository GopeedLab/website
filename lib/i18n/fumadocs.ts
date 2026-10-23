import { zhCN } from "@fumadocs/language/zh-cn";
import { zhTW } from "@fumadocs/language/zh-tw";
import { openapiTranslations } from "fumadocs-openapi/i18n";
import { uiTranslations } from "fumadocs-ui/i18n";
import { i18n, localeNames } from "@/lib/i18n";
import { russianTranslations } from "./fumadocs-ru";

export const fumadocsTranslations = i18n
  .translations()
  .extend(uiTranslations())
  .extend(openapiTranslations())
  .preset("zh", zhCN())
  .preset("zh-TW", zhTW())
  .add({
    en: { displayName: localeNames.en },
    zh: {
      displayName: localeNames.zh,
      "Back to Home(404 page)": "返回首页",
      "Page Not Found(404 page)": "页面未找到",
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)":
        "你要查找的页面可能已被移除、名称已变更，或暂时无法使用。",
      "Toggle Menu(mobile menu)(aria-label)": "展开或收起菜单",
    },
    "zh-TW": {
      displayName: localeNames["zh-TW"],
      "Back to Home(404 page)": "返回首頁",
      "Page Not Found(404 page)": "找不到頁面",
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)":
        "你要尋找的頁面可能已被移除、名稱已變更，或暫時無法使用。",
      "Toggle Menu(mobile menu)(aria-label)": "展開或收合選單",
    },
    ru: russianTranslations,
  });
