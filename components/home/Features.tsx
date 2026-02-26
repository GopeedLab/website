"use client";

import {
  CloudArrowDownIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export function Features() {
  const { t } = useLocale();

  const features = [
    {
      icon: CodeBracketIcon,
      title: t("features.open.title"),
      description: t("features.open.desc"),
    },
    {
      icon: CloudArrowDownIcon,
      title: t("features.protocol.title"),
      description: t("features.protocol.desc"),
    },
    {
      icon: ComputerDesktopIcon,
      title: t("features.cross.title"),
      description: t("features.cross.desc"),
    },
    {
      icon: PuzzlePieceIcon,
      title: t("features.extension.title"),
      description: t("features.extension.desc"),
    },
    {
      icon: WindowIcon,
      title: t("features.api.title"),
      description: t("features.api.desc"),
    },
    {
      icon: SparklesIcon,
      title: t("features.speed.title"),
      description: t("features.speed.desc"),
    },
  ];

  return (
    <section id="features" className="relative py-20 overflow-hidden">
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
                {t("features.title")}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-linear-to-b from-primary-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 group-hover:border-primary-500/50 transition-colors h-full flex flex-col">
                  <div className="absolute inset-0 bg-linear-to-b from-white/50 dark:from-white/5 to-transparent rounded-xl" />
                  <div className="relative flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-500/20 text-primary-600 dark:text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
