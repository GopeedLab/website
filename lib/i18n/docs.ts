import type { Locale } from "./config";

export const docsCopy = {
  en: {
    title: "API Reference",
    description:
      "Explore the Gopeed HTTP API, request parameters and responses.",
    intro:
      "Use these endpoints to manage your Gopeed instance. API names and descriptions follow the upstream English specification.",
    integration: "Learn how to enable the API and use the SDKs",
    playground:
      "Set the server URL to your Gopeed instance and enter your X-Api-Token when required. Requests run in your browser; access to a local instance depends on your browser permissions and the server's CORS configuration.",
    spec: "Download OpenAPI specification",
    groups: {
      info: "Info",
      tasks: "Tasks",
      config: "Config",
      extensions: "Extensions",
    },
  },
  zh: {
    title: "API 参考",
    description: "查阅 Gopeed HTTP API 的请求参数与响应结构。",
    intro: "通过这些接口管理你的 Gopeed 实例。接口名称和描述沿用上游英文规范。",
    integration: "了解如何启用 API 和使用 SDK",
    playground:
      "将服务器地址设为你的 Gopeed 实例，并按需填写 X-Api-Token。请求由浏览器直接发送；访问本地实例取决于浏览器权限和服务器的 CORS 配置。",
    spec: "下载 OpenAPI 规范",
    groups: {
      info: "服务信息",
      tasks: "任务",
      config: "配置",
      extensions: "扩展",
    },
  },
  "zh-TW": {
    title: "API 參考",
    description: "查閱 Gopeed HTTP API 的請求參數與回應結構。",
    intro:
      "透過這些介面管理你的 Gopeed 執行個體。介面名稱與描述沿用上游英文規範。",
    integration: "瞭解如何啟用 API 與使用 SDK",
    playground:
      "將伺服器位址設為你的 Gopeed 執行個體，並視需要填入 X-Api-Token。請求由瀏覽器直接傳送；存取本機執行個體取決於瀏覽器權限及伺服器的 CORS 設定。",
    spec: "下載 OpenAPI 規範",
    groups: {
      info: "服務資訊",
      tasks: "任務",
      config: "設定",
      extensions: "擴充套件",
    },
  },
  ru: {
    title: "Справочник API",
    description: "Параметры запросов и структура ответов HTTP API Gopeed.",
    intro:
      "Эти методы позволяют управлять вашим экземпляром Gopeed. Названия и описания методов приведены на английском языке из исходной спецификации.",
    integration: "Как включить API и использовать SDK",
    playground:
      "Укажите адрес вашего экземпляра Gopeed и при необходимости X-Api-Token. Запросы отправляются из браузера; доступ к локальному экземпляру зависит от разрешений браузера и настроек CORS сервера.",
    spec: "Скачать спецификацию OpenAPI",
    groups: {
      info: "Информация",
      tasks: "Задачи",
      config: "Настройки",
      extensions: "Расширения",
    },
  },
} satisfies Record<
  Locale,
  {
    title: string;
    description: string;
    intro: string;
    integration: string;
    playground: string;
    spec: string;
    groups: Record<string, string>;
  }
>;
