'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CommandLineIcon,
  CubeIcon,
  WindowIcon,
  GlobeAltIcon,
  ServerIcon,
  ArrowDownTrayIcon,
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

type Architecture = {
  name: string
  type: 'url' | 'command' // 区分下载链接和命令行
  content: string // 统一存储 url 或 command
  size?: number // 包大小，单位 byte
}

type Channel = {
  name: string
  type: string
  architectures: Architecture[]
}

type Platform = {
  id: string
  name: string
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
  channels: Channel[]
}

const platforms: Platform[] = [
  {
    id: 'windows',
    name: 'Windows',
    icon: WindowIcon,
    channels: [
      {
        name: '安装包',
        type: 'EXE',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-windows-amd64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
      {
        name: '便携版',
        type: 'Portable',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-windows-amd64-portable.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: ComputerDesktopIcon,
    channels: [
      {
        name: '安装包',
        type: 'DMG',
        architectures: [
          {
            name: 'universal',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-macos.dmg',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: CommandLineIcon,
    channels: [
      {
        name: 'Flathub',
        type: 'Flathub',
        architectures: [
          {
            name: 'amd64',
            type: 'command',
            content: 'flatpak install flathub com.gopeed.Gopeed',
          },
        ],
      },
      {
        name: 'Snap',
        type: 'SNAP',
        architectures: [
          {
            name: 'amd64',
            type: 'command',
            content: 'sudo snap install gopeed',
          },
        ],
      },
      {
        name: 'DEB包',
        type: 'DEB',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-linux-amd64.deb',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-linux-arm64.deb',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
      {
        name: 'AppImage',
        type: 'AppImage',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-linux-amd64.AppImage',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-linux-arm64.AppImage',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
  {
    id: 'android',
    name: 'Android',
    icon: DevicePhoneMobileIcon,
    channels: [
      {
        name: 'APK',
        type: 'APK',
        architectures: [
          {
            name: 'universal',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-android.apk',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'armeabi-v7a',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-android-armeabi-v7a.apk',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64-v8a',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-android-arm64-v8a.apk',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'x86_64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-android-x86_64.apk',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: DevicePhoneMobileIcon,
    channels: [
      {
        name: 'IPA',
        type: 'IPA',
        architectures: [
          {
            name: 'universal',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=Gopeed-v1.6.11-ios.ipa',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: CubeIcon,
    channels: [
      {
        name: 'Docker Hub',
        type: '-',
        architectures: [
          {
            name: 'universal',
            type: 'command',
            content: 'docker pull liwei2633/gopeed',
          },
        ],
      },
    ],
  },
  {
    id: 'qnap',
    name: 'Qnap',
    icon: ServerIcon,
    channels: [
      {
        name: 'QPKG',
        type: 'QPKG',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-v1.6.11-qnap-amd64.qpkg',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-v1.6.11-qnap-arm64.qpkg',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
  {
    id: 'web',
    name: 'Web',
    icon: GlobeAltIcon,
    channels: [
      {
        name: 'Windows',
        type: 'Windows',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-windows-amd64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-windows-arm64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: '386',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-windows-386.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
      {
        name: 'macOS',
        type: 'MacOS',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-macos-amd64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-macos-arm64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
      {
        name: 'Linux',
        type: 'Linux',
        architectures: [
          {
            name: 'amd64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-linux-amd64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: 'arm64',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-linux-arm64.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
          {
            name: '386',
            type: 'url',
            content: 'https://gopeed.com/api/download?tpl=gopeed-web-v1.6.11-linux-386.zip',
            size: 16 * 1024 * 1024, // 16MB
          },
        ],
      },
    ],
  },
]

export function Downloads() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  // 渲染单个下载卡片
  const renderDownloadCard = (channel: Channel, arch: Architecture) => {
    const commandId = `${arch.content}-${arch.name}`
    const isCommand = arch.type === 'command'
    const sizeInMB = arch.size ? (arch.size / 1024 / 1024).toFixed(1) : '0.0'

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
      >
        <div className="flex flex-col space-y-4">
          {/* 渠道名称 */}
          <div className="text-lg font-semibold text-white">
            {channel.name}
          </div>

          {/* 架构信息 */}
          <div className="text-sm text-gray-400">
            {arch.name}
          </div>

          {/* 下载/命令行区域 */}
          <div className="flex items-center justify-between pt-2">
            {isCommand ? (
              <>
                <code className="text-sm font-mono text-gray-300 truncate max-w-[80%]">
                  {arch.content}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard.writeText(arch.content)
                    setCopiedIndex(commandId)
                    setTimeout(() => setCopiedIndex(null), 2000)
                  }}
                  className="relative p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                >
                  {copiedIndex === commandId ? (
                    <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5 text-primary-400" />
                  )}
                </motion.button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="font-medium text-gray-300">{sizeInMB}</span>
                  <span className="text-gray-500">MB</span>
                </div>
                <motion.a
                  href={arch.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 text-primary-400" />
                </motion.a>
              </>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="downloads" className="relative py-20 overflow-hidden">
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              选择你的平台
            </span>
          </h2>
          <p className="text-gray-400">支持所有主流平台，随时随地开始下载</p>
        </motion.div>

        {/* 平台选择区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-12"
        >
          {platforms.map((platform, index) => (
            <motion.button
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlatform(selectedPlatform?.id === platform.id ? null : platform)}
              className={clsx(
                'relative p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border',
                selectedPlatform?.id === platform.id
                  ? 'bg-primary-500/20 border-primary-500/50 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-gray-300'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl" />
              <div className="flex flex-col items-center space-y-2">
                <platform.icon className="h-8 w-8" />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* 下载选项区域 */}
        {selectedPlatform && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            key={selectedPlatform.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {selectedPlatform.channels.flatMap((channel, channelIndex) =>
              channel.architectures.map((arch, archIndex) => (
                <motion.div
                  key={`${channelIndex}-${archIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (channelIndex + archIndex) * 0.1 }}
                >
                  {renderDownloadCard(channel, arch)}
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
} 