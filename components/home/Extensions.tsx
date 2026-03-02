"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

export function Extensions() {
  const { t, locale } = useLocale();
  const storeUrl = locale === "en" ? "/store" : `/${locale}/store`;

  const examples = [
    {
      title: t("extensions.youtube.title"),
      description: t("extensions.youtube.desc"),
      image: "/images/youtube-extension.svg",
    },
    {
      title: t("extensions.huggingface.title"),
      description: t("extensions.huggingface.desc"),
      image: "/images/huggingface-extension.svg",
    },
    {
      title: t("extensions.cloud.title"),
      description: t("extensions.cloud.desc"),
      image: "/images/cloud-extension.svg",
    },
  ];

  const links = [
    {
      title: t("extensions.store"),
      description: t("extensions.storeDesc"),
      href: storeUrl,
    },
    {
      title: t("extensions.devDocs"),
      description: t("extensions.devDocsDesc"),
      href: "/docs/dev-extension",
    },
  ];

  return (
    <section id="extensions" className="relative py-20 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-grid bg-[length:50px_50px] opacity-5 dark:opacity-10" />

      {/* Decorative Light Effects */}
      <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {t("extensions.title")}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("extensions.subtitle")}
            </p>
          </motion.div>

          {/* Extension Examples */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {examples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-full"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-0.5 bg-linear-to-br from-primary-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary-500/30 transition-colors duration-500 h-full flex flex-col">
                  {/* Top Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary-500/0 to-transparent group-hover:via-primary-500/50 transition-all duration-500 z-20" />

                  {/* Inner Decorative Gradient */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors duration-500 z-10 pointer-events-none" />

                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-gradient-grid bg-[length:20px_20px] opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none" />

                  <div className="relative h-48 z-10">
                    <Image
                      src={example.image}
                      alt={example.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {example.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 flex-grow leading-relaxed">
                      {example.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Links Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {links.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-full block"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-0.5 bg-linear-to-br from-primary-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary-500/30 transition-colors duration-500 h-full overflow-hidden">
                  {/* Top Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary-500/0 to-transparent group-hover:via-primary-500/50 transition-all duration-500" />

                  {/* Inner Decorative Gradient */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors duration-500" />

                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-gradient-grid bg-[length:20px_20px] opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {link.title}
                      </h3>
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary-600 dark:text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
