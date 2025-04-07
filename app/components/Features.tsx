'use client'

import { motion } from 'framer-motion'
import {
  CodeBracketIcon,
  CloudArrowDownIcon,
  PuzzlePieceIcon,
  WindowIcon,
  SparklesIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: CodeBracketIcon,
    title: '开源原生，轻量高效',
    description: '基于 Go 语言开发的原生应用，启动迅速、资源占用低。开放源代码，安全透明，社区共同维护。',
  },
  {
    icon: CloudArrowDownIcon,
    title: '多协议支持',
    description: '支持 HTTP、HTTPS、FTP、磁力链接、种子等多种下载协议，满足各类下载需求。内置优化的下载引擎，确保最佳下载速度。',
  },
  {
    icon: ComputerDesktopIcon,
    title: '全平台支持',
    description: '支持 Windows、macOS、Linux 和移动端，数据互通，界面统一。无论在任何设备上，都能获得一致的下载体验。',
  },
  {
    icon: PuzzlePieceIcon,
    title: '高度可定制',
    description: '提供丰富的 API 接口和插件系统，支持自定义下载行为、界面主题和功能扩展。让下载器完美适配你的使用习惯。',
  },
  {
    icon: WindowIcon,
    title: '浏览器深度集成',
    description: '完美支持主流浏览器，提供优雅的扩展插件。自动拦截下载请求，让下载体验更加流畅自然。',
  },
  {
    icon: SparklesIcon,
    title: '精致设计',
    description: '采用现代化 UI 设计，提供浅色/深色主题切换。简洁直观的操作界面，优雅的动画效果，带来愉悦的使用体验。',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-grid bg-[length:50px_50px] opacity-10" />
      
      {/* 装饰性光效 */}
      <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              为什么选择 Gopeed
            </span>
          </h2>
          <p className="text-gray-400">现代化的下载体验，始于卓越的设计理念</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 group-hover:border-primary-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-500/20 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 