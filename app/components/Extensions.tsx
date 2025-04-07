'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const examples = [
  {
    title: 'YouTube 视频下载',
    description: '轻松下载 YouTube 视频和播放列表，支持选择不同清晰度和格式。',
    image: '/images/youtube-extension.webp',
  },
  {
    title: 'HuggingFace 模型下载',
    description: '快速下载 AI 模型文件，支持断点续传，自动验证文件完整性。',
    image: '/images/huggingface-extension.webp',
  },
  {
    title: '网盘文件下载',
    description: '支持各类网盘的文件下载，突破速度限制，批量下载更便捷。',
    image: '/images/cloud-extension.webp',
  },
]

const links = [
  {
    title: '扩展商店',
    description: '浏览和安装社区贡献的各类下载扩展',
    href: 'https://gopeed.com/extensions',
  },
  {
    title: '开发文档',
    description: '学习如何使用 JavaScript 开发自己的下载扩展',
    href: 'https://gopeed.com/docs/extension',
  },
]

export function Extensions() {
  return (
    <section className="relative py-20 overflow-hidden">
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
              强大的扩展能力
            </span>
          </h2>
          <p className="text-gray-400">使用 JavaScript 编写扩展，轻松实现各类下载需求</p>
        </motion.div>

        {/* 扩展示例 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 group-hover:border-primary-500/50 transition-colors">
                <div className="relative h-48">
                  <Image
                    src={example.image}
                    alt={example.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{example.title}</h3>
                  <p className="text-gray-400">{example.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 链接区域 */}
        <div className="grid md:grid-cols-2 gap-8">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 group-hover:border-primary-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{link.title}</h3>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <p className="text-gray-400">{link.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 