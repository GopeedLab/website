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
      "block w-full text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap px-3 py-2 md:p-0 rounded-md hover:bg-gray-100 md:hover:bg-transparent dark:hover:bg-white/5 md:dark:hover:bg-transparent";

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
      <div className="flex items-center justify-start gap-2 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {item.icon}
        {item.label && (
          <span className="text-sm font-medium">{item.label}</span>
        )}
      </div>
    );

    const buttonClass =
      "relative group flex items-center w-full md:w-auto h-9 px-3 md:px-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer";

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <a href={item.href} className={buttonClass} onClick={onClick}>
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
          scrolled ? "md:backdrop-blur-none" : ""
        }`}
      >
        <motion.div
          initial="top"
          animate={scrolled ? "scrolled" : "top"}
          variants={headerVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative flex items-center justify-between rounded-2xl w-full px-4 py-2 ${
            scrolled
              ? "md:bg-white/40 md:dark:bg-black/30 md:backdrop-blur-3xl md:drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:border md:border-white/40 md:dark:border-white/10"
              : ""
          }`}
        >
          {/* Left: Logo + Navigation Links */}
          <div className="flex items-center gap-2 md:gap-8 z-10">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="relative w-7 h-7 md:w-8 md:h-8">
                <div className="absolute inset-0 bg-primary-500 rounded-lg blur-[8px] opacity-40" />
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
          <div className="hidden md:flex items-center space-x-1 z-10">
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
                className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Switch language"
              >
                <LanguageIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white/40 dark:bg-black/30 backdrop-blur-3xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-xl border border-white/40 dark:border-white/10 p-1 flex flex-col gap-0.5 z-10 transition-all">
                  {locales.map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                        loc === locale
                          ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                    >
                      <span>{localeNames[loc]}</span>
                      {loc === locale && (
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 text-primary-600 dark:text-primary-400"
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
                className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {mounted && (
                  <ThemeIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/40 dark:bg-black/30 backdrop-blur-3xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-xl border border-white/40 dark:border-white/10 p-1 flex flex-col gap-0.5 z-10 transition-all">
                  {themeOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                        theme === option.value
                          ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100"
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
          <div className="md:hidden flex items-center gap-1 z-10">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setMobileMenuOpen(false);
                }}
                className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <LanguageIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white/40 dark:bg-black/30 backdrop-blur-3xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-xl border border-white/40 dark:border-white/10 p-1 flex flex-col gap-0.5 z-10 transition-all">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                        loc === locale
                          ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                    >
                      <span>{localeNames[loc]}</span>
                      {loc === locale && (
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 text-primary-600 dark:text-primary-400"
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
              className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {mounted && (
                <ThemeIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            <button
              type="button"
              className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangMenuOpen(false);
              }}
            >
              <span className="sr-only">{t("nav.openMenu")}</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
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
          className="md:hidden overflow-hidden mt-2 z-10 relative"
        >
          <div className="w-full bg-white/40 dark:bg-black/30 backdrop-blur-3xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-4 border border-white/40 dark:border-white/10">
            <div className="flex flex-col gap-4">
              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
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
              <div className="flex flex-col gap-1 items-start">
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
