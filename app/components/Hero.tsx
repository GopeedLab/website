'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import { ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const browserExtensions = [
  {
    name: 'Chrome',
    href: 'https://chrome.google.com/webstore/detail/gopeed/extension-id',
    icon: '/images/chrome.svg',
  },
  {
    name: 'Edge',
    href: 'https://microsoftedge.microsoft.com/addons/detail/gopeed/extension-id',
    icon: '/images/edge.svg',
  },
  {
    name: 'Firefox',
    href: 'https://addons.mozilla.org/firefox/addon/gopeed/',
    icon: '/images/firefox.svg',
  },
]

export function Hero() {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const version = 'v1.6.11' // 当前版本号

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > 100)
  })

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-gradient-grid bg-[length:50px_50px] opacity-10" />
      
      {/* 动态渐变光效 */}
      <div className="absolute inset-0 bg-gradient-x from-primary-500/10 via-primary-300/5 to-primary-500/10" />
      
      {/* 装饰性圆形 */}
      <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute -bottom-20 -left-40 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧文本内容 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient-x">
                  一个现代化的下载器
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                支持全平台，界面简洁，下载快速，让下载体验更轻松
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:justify-start justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary-500/20"
                onClick={scrollToFeatures}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>立即下载</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-gray-300 hover:text-primary-500 px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all border border-gray-700/50"
                onClick={scrollToFeatures}
              >
                <span>查看更多版本</span>
                <ChevronDownIcon className="h-5 w-5" />
              </motion.button>
            </div>

            {/* 浏览器扩展链接 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              {browserExtensions.map((browser) => (
                <motion.a
                  key={browser.name}
                  href={browser.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Image
                    src={browser.icon}
                    alt={browser.name}
                    width={20}
                    height={20}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm">获取{browser.name}扩展</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 右侧预览图 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:h-[500px] h-[400px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full"
            >
              {/* 预览图装饰 */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/50 to-primary-600/50 opacity-50 blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent rounded-lg" />
              
              {/* 预览图 */}
              <div className="relative h-full">
                <Image
                  src="/images/desktop-preview.svg"
                  alt="Gopeed 桌面端预览"
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* 移动端预览 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 bottom-0 w-48 h-auto"
              >
                {/* 移动端预览装饰 */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-primary-500/50 to-primary-600/50 opacity-50 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent rounded-lg" />
                
                {/* 移动端预览图 */}
                <div className="relative">
                  <Image
                    src="/images/mobile-preview.svg"
                    alt="Gopeed 移动端预览"
                    width={192}
                    height={384}
                    className="object-contain relative"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="group px-4 py-2 backdrop-blur-sm"
          onClick={scrollToFeatures}
        >
          <div className="flex flex-col items-center text-primary-500 hover:text-primary-400 transition-colors">
            <ChevronDownIcon className="h-6 w-6" />
            <ChevronDownIcon className="h-6 w-6 -mt-3" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
} 