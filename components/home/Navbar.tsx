"use client";

import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  ComputerDesktopIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { setLocalePreference } from "@/lib/locale-preference";

interface NavbarProps {
  version?: string;
  stars?: string;
}

// Menu item types
type NavLinkItem = {
  type: "link";
  key: string;
  href: string;
  labelKey: string;
  external?: boolean;
};

type NavIconButtonItem = {
  type: "icon-button";
  key: string;
  href: string;
  icon: ReactNode;
  label?: string;
  external?: boolean;
};

export function Navbar({ version = "", stars = "" }: NavbarProps) {
  const { locale, t, locales, localeNames } = useLocale();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll event (only on desktop to avoid mobile jank)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if mobile device
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const headerVariants = {
    top: { y: 0, opacity: 1 },
    scrolled: { y: 0, opacity: 1 },
  };

  const switchLocale = (newLocale: string) => {
    setLangMenuOpen(false);

    // Save user's locale preference before navigation
    setLocalePreference(newLocale as Locale);

    // Preserve the current path segment (e.g. /store, /docs/...) when switching locale.
    // Current pathname looks like: "/" | "/zh" | "/zh-TW" | "/store" | "/zh/store" etc.
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter(Boolean); // remove empty strings

    // If the first segment is a known locale prefix, strip it
    const knownLocales = locales as readonly string[];
    const withoutLocale =
      segments.length > 0 && knownLocales.includes(segments[0])
        ? segments.slice(1)
        : segments;

    const rest = withoutLocale.length > 0 ? `/${withoutLocale.join("/")}` : "";

    if (newLocale === "en") {
      window.location.href = rest || "/";
    } else {
      window.location.href = `/${newLocale}${rest}`;
    }
  };

  const ThemeIcon = mounted
    ? resolvedTheme === "dark"
      ? MoonIcon
      : SunIcon
    : SunIcon;

  const docsUrl = locale === "en" ? "/docs" : `/${locale}/docs`;
  const storeUrl = locale === "en" ? "/store" : `/${locale}/store`;

  // Unified navigation data - used by both desktop and mobile
  const navLinks: NavLinkItem[] = [
    {
      type: "link",
      key: "store",
      href: storeUrl,
      labelKey: "nav.store",
      external: false,
    },
    {
      type: "link",
      key: "docs",
      href: docsUrl,
      labelKey: "nav.docs",
      external: false,
    },
    {
      type: "link",
      key: "api",
      href: "/docs/openapi",
      labelKey: "nav.api",
      external: true,
    },
  ];

  const navIconButtons: NavIconButtonItem[] = [
    {
      type: "icon-button",
      key: "github",
      href: "https://github.com/GopeedLab/gopeed",
      icon: <Github className="h-5 w-5" />,
      label: stars || undefined,
      external: true,
    },
    ...(version
      ? [
          {
            type: "icon-button" as const,
            key: "version",
            href: "#downloads",
            icon: <TagIcon className="h-5 w-5" />,
            label: version,
            external: false,
          },
        ]
      : []),
  ];

  const themeOptions = [
    {
      value: "light",
      label: t("theme.light"),
      icon: SunIcon,
    },
    { value: "dark", label: t("theme.dark"), icon: MoonIcon },
    {
      value: "system",
      label: t("theme.system"),
      icon: ComputerDesktopIcon,
    },
  ];

  // Reusable link component - used by both desktop and mobile
  const NavLinkComponent = ({
    item,
    onClick,
  }: {
    item: NavLinkItem;
    onClick?: () => void;
  }) => {
    const className =
      "text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap";

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} inline-flex items-center gap-1`}
          onClick={onClick}
        >
          {t(item.labelKey)}
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 opacity-60" />
        </a>
      );
    }
    return (
      <Link href={item.href} className={className} onClick={onClick}>
        {t(item.labelKey)}
      </Link>
    );
  };

  // Reusable icon button component - used by both desktop and mobile
  const NavIconButtonComponent = ({
    item,
    onClick,
  }: {
    item: NavIconButtonItem;
    onClick?: () => void;
  }) => {
    const content = (
      <>
        <span className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-white/10 shadow-lg" />
        <div className="relative flex items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {item.icon}
          {item.label && (
            <span className="text-sm font-semibold">{item.label}</span>
          )}
        </div>
      </>
    );

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center h-10 px-3 rounded-lg cursor-pointer"
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <a
        href={item.href}
        className="relative group flex items-center h-10 px-3 rounded-lg cursor-pointer"
        onClick={onClick}
      >
        {content}
      </a>
    );
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`left-0 right-0 z-50 transition-all duration-300 absolute top-4 md:top-4 ${
        scrolled ? "md:fixed" : "md:absolute"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "md:backdrop-blur-xl" : ""
        }`}
      >
        <motion.div
          initial="top"
          animate={scrolled ? "scrolled" : "top"}
          variants={headerVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative flex items-center justify-between rounded-2xl w-full px-4 py-2 ${
            scrolled
              ? "md:bg-white/60 md:dark:bg-gray-900/60 md:backdrop-blur-xl md:border md:border-gray-200/60 md:dark:border-white/15 md:shadow-lg"
              : ""
          }`}
        >
          {/* Left: Logo + Navigation Links */}
          <div className="flex items-center gap-2 md:gap-8 z-10">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="relative w-7 h-7 md:w-8 md:h-8">
                <div className="absolute inset-0 bg-primary-500 rounded-lg blur opacity-60" />
                <Image
                  src="/images/logo.png"
                  fill
                  alt="Logo"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-lg md:text-xl font-bold bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Gopeed
              </span>
            </a>

            {/* Navigation Links - Next to Logo */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <NavLinkComponent key={item.key} item={item} />
              ))}
            </div>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-2 z-10">
            {/* Icon Buttons */}
            {navIconButtons.map((item) => (
              <NavIconButtonComponent key={item.key} item={item} />
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setThemeMenuOpen(false);
                }}
                className="relative group flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer"
                aria-label="Switch language"
              >
                <span className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-white/10 shadow-lg" />
                <LanguageIcon className="h-5 w-5 relative text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-200/60 dark:border-white/15 shadow-xl overflow-hidden">
                  {locales.map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                        loc === locale
                          ? "bg-primary-500/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400"
                      }`}
                    >
                      <span>{localeNames[loc]}</span>
                      {loc === locale && (
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setThemeMenuOpen(!themeMenuOpen);
                  setLangMenuOpen(false);
                }}
                className="relative group flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer"
                aria-label="Toggle theme"
              >
                <span className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-white/10 shadow-lg" />
                {mounted && (
                  <ThemeIcon className="h-5 w-5 relative text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                )}
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-200/60 dark:border-white/15 shadow-xl overflow-hidden">
                  {themeOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                        theme === option.value
                          ? "bg-primary-500/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400"
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                }}
                className="relative group p-2 rounded-lg cursor-pointer"
              >
                <span className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-white/10 shadow-lg" />
                <LanguageIcon className="h-5 w-5 relative text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-200/60 dark:border-white/15 shadow-xl overflow-hidden">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                        loc === locale
                          ? "bg-primary-500/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400"
                      }`}
                    >
                      <span>{localeNames[loc]}</span>
                      {loc === locale && (
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Theme Toggle */}
            <button
              type="button"
              className="relative group p-2 rounded-lg cursor-pointer"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <span className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-white/10 shadow-lg" />
              {mounted && (
                <ThemeIcon className="h-5 w-5 relative text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              )}
            </button>

            <button
              type="button"
              className="relative group p-2 rounded-lg cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-white/10 shadow-lg" />
              <span className="sr-only">{t("nav.openMenu")}</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 relative text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              ) : (
                <Bars3Icon className="h-5 w-5 relative text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden mt-2 flex justify-end"
        >
          <div className="relative w-fit min-w-48 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-white/10 shadow-xl">
            <div className="flex flex-col gap-4">
              {/* Navigation Links */}
              <div className="flex flex-col gap-3">
                {navLinks.map((item) => (
                  <NavLinkComponent
                    key={item.key}
                    item={item}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>

              <div className="h-px bg-gray-200 dark:bg-white/10" />

              {/* Icon Buttons - Vertical layout, width fit content */}
              <div className="flex flex-col gap-2 items-start">
                {navIconButtons.map((item) => (
                  <NavIconButtonComponent
                    key={item.key}
                    item={item}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
