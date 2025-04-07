'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const version = 'v1.6.11' // 当前版本号

const navigation = [
  { name: '首页', href: '#' },
  { name: '特性', href: '#features' },
  { name: '扩展', href: '#extensions' },
  { name: '下载', href: '#downloads' },
]

const rightNavigation = [
  {
    name: 'GitHub',
    href: 'https://github.com/GopeedLab/gopeed',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5 text-gray-300 group-hover:text-primary-400 transition-colors"
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    badge: '83.5k',
    external: true,
  },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-8 z-50"
    >
      <nav className="mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary-500 rounded-lg blur opacity-60" />
              <div className="relative bg-gray-900 rounded-lg border border-primary-500/50 w-full h-full flex items-center justify-center text-primary-500 font-bold text-base">
                G
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Gopeed
            </span>
          </a>

          {/* 中间导航区域 */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/[0.05] shadow-lg" />
              <div className="relative flex items-center px-6 h-12 space-x-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative group px-4 py-2 text-base font-semibold"
                  >
                    <span className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 rounded-full transition-colors duration-200" />
                    <span className="relative text-gray-200 group-hover:text-primary-400 transition-colors">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧导航区域 - 桌面端 */}
          <div className="hidden md:flex items-center space-x-2">
            {/* 版本提醒 */}
            <motion.a
              href="#downloads"
              className="relative group flex items-center space-x-2 px-4 py-2 rounded-full"
            >
              <span className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/[0.05] shadow-lg" />
              <div className="relative flex items-center space-x-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-primary-400 transition-colors">{version}</span>
                </div>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary-500/10 text-primary-400">NEW</span>
              </div>
            </motion.a>
            {rightNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="relative group flex items-center space-x-2 px-4 py-2 rounded-full"
              >
                <span className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/[0.05] shadow-lg" />
                <div className="relative flex items-center space-x-2">
                  {item.icon}
                  {item.badge && (
                    <span className="relative text-gray-300 group-hover:text-primary-400 transition-colors text-base font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              type="button"
              className="relative group p-2 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/[0.05] shadow-lg" />
              <span className="sr-only">打开主菜单</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 relative text-gray-200 group-hover:text-primary-400 transition-colors" />
              ) : (
                <Bars3Icon className="h-5 w-5 relative text-gray-200 group-hover:text-primary-400 transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden mt-2"
        >
          <div className="relative bg-white/[0.03] backdrop-blur-md rounded-2xl p-2 border border-white/[0.05] shadow-lg">
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group block px-4 py-2 text-base font-semibold rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 rounded-xl transition-colors duration-200" />
                  <span className="relative text-gray-200 group-hover:text-primary-400 transition-colors">
                    {item.name}
                  </span>
                </a>
              ))}

              <div className="h-px bg-white/[0.05] my-2" />
              
              {/* 移动端版本提醒 */}
              <a
                href="#downloads"
                className="relative group flex items-center space-x-2 px-4 py-2 text-base font-semibold rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 rounded-xl transition-colors duration-200" />
                <div className="relative flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-primary-400 transition-colors">{version}</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary-500/10 text-primary-400">NEW</span>
                </div>
              </a>

              {rightNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="relative group flex items-center space-x-2 px-4 py-2 text-base font-semibold rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 rounded-xl transition-colors duration-200" />
                  <div className="relative flex items-center gap-2">
                    {item.icon}
                    <span className="text-gray-300 group-hover:text-primary-400 transition-colors">{item.name}</span>
                    {item.badge && (
                      <span className="text-gray-300 group-hover:text-primary-400 transition-colors">{item.badge}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
} 