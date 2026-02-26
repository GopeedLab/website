"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  const footerLinks = [
    {
      name: t("footer.docs"),
      href: "/docs",
    },
    {
      name: t("footer.privacy"),
      href: "/privacy",
    },
    {
      name: t("footer.terms"),
      href: "/terms",
    },
  ];

  return (
    <footer className="mt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-8">
        <div className="m-auto md:w-11/12 lg:w-10/12 xl:w-9/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap py-8">
            {/* Left: WeChat QR Code */}
            <div className="mb-6 flex w-full flex-col items-center justify-center sm:mb-0 sm:w-3/12 sm:items-start">
              <div className="w-32 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/wechat-qrcode.png"
                  alt="WeChat Official Account"
                  width={256}
                  height={256}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {t("footer.wechatFollow")}
              </p>
            </div>

            {/* Center: Navigation Links and Social Icons */}
            <div className="flex w-full justify-center space-x-12 text-gray-600 dark:text-gray-300 sm:w-6/12 md:justify-start">
              <ul className="list-inside list-disc space-y-8">
                {footerLinks.slice(0, 2).map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:AnyGoGo@outlook.com"
                    className="transition hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {t("footer.contact")}
                  </a>
                </li>
              </ul>

              <ul className="space-y-8">
                <li>
                  <a
                    href="https://github.com/GopeedLab/gopeed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 transition hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <svg
                      role="img"
                      aria-label="GitHub"
                      viewBox="0 0 24 24"
                      className="w-5"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/ZUJCAedDXp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 transition hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <svg
                      role="img"
                      aria-label="Discord"
                      viewBox="0 0 24 24"
                      className="w-5"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>Discord</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/docs/donate"
                    className="flex items-center space-x-3 transition hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <svg
                      role="img"
                      aria-label="Donate"
                      viewBox="0 0 24 24"
                      className="w-5"
                      fill="currentColor"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>{t("footer.donate")}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Right: Copyright */}
            <div className="mt-16 w-full space-y-6 text-center sm:mt-0 sm:w-3/12 sm:text-left sm:flex sm:items-center">
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {t("footer.copyright", {
                  year: new Date().getFullYear().toString(),
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
