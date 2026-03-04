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
    <section
      id="features"
      className="relative py-20 overflow-hidden"
      aria-label={t("features.title")}
    >
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
            <h2 className="text-3xl section-heading mb-4">
              {t("features.title")}
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
                {/* Hover Glow Effect */}
                <div className="absolute -inset-0.5 bg-linear-to-br from-primary-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary-500/30 transition-colors duration-500 h-full flex flex-col overflow-hidden">
                  {/* Top Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary-500/0 to-transparent group-hover:via-primary-500/50 transition-all duration-500" />

                  {/* Inner Decorative Gradient */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors duration-500" />

                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-gradient-grid bg-[length:20px_20px] opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500" />

                  <div className="relative flex flex-col h-full z-10">
                    {/* Icon Container */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-primary-500/10 to-primary-500/5 border border-primary-500/20 text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300">
                      <feature.icon className="h-7 w-7" />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
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
