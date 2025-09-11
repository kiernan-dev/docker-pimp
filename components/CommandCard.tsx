'use client'

import { motion } from 'framer-motion'
import { Copy, Heart, Terminal, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState } from 'react'
import { DockerCommand } from '@/lib/dockerCommands'

interface CommandCardProps {
  command: DockerCommand
  isFavorite: boolean
  onToggleFavorite: (commandId: string) => void
}

export default function CommandCard({ command, isFavorite, onToggleFavorite }: CommandCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative group"
    >
      {/* Glassmorphic Card */}
      <div className="relative bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/40 rounded-2xl shadow-xl overflow-hidden">
        {/* Animated Gradient Background Overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(255,255,255,0.25) 0%, rgba(59,130,246,0.15) 50%, rgba(255,255,255,0.25) 100%)',
              'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0.25) 50%, rgba(168,85,247,0.15) 100%)',
              'linear-gradient(225deg, rgba(168,85,247,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(255,255,255,0.25) 100%)',
              'linear-gradient(315deg, rgba(255,255,255,0.25) 0%, rgba(168,85,247,0.15) 50%, rgba(59,130,246,0.15) 100%)',
              'linear-gradient(45deg, rgba(255,255,255,0.25) 0%, rgba(59,130,246,0.15) 50%, rgba(255,255,255,0.25) 100%)'
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Static Gradient Background Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-600/15 dark:to-transparent" />
        
        {/* Card Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-lg">
                  <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {command.command}
                  </h3>
                  {command.isPopular && (
                    <span className="inline-block mt-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                      Popular
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed min-h-[4.2rem]">
                {command.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggleFavorite(command.id)}
                className={`p-2 rounded-lg backdrop-blur-sm border transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500/20 border-red-400/30 text-red-600 dark:text-red-400 shadow-lg'
                    : 'bg-white/20 dark:bg-slate-700/40 border-white/20 dark:border-slate-500/40 text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-600/50'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(command.example)}
                className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 transition-all duration-200 backdrop-blur-sm shadow-lg"
                title="Copy example command"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Example Command */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Example:
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(command.example)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Copy
              </motion.button>
            </div>
            
            {/* Command Block with Glassmorphic Style */}
            <div className="relative group/code">
              <div className="bg-gray-900/80 dark:bg-black/60 backdrop-blur-sm border border-gray-700/50 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto">
                <code className="block">{command.example}</code>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => copyToClipboard(command.example)}
                className="absolute top-2 right-2 p-1 bg-gray-700/60 hover:bg-gray-600/80 rounded opacity-0 group-hover/code:opacity-100 transition-all duration-200 backdrop-blur-sm"
              >
                <Copy className="w-3 h-3 text-gray-300" />
              </motion.button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {command.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/20 dark:bg-slate-700/40 backdrop-blur-sm border border-white/20 dark:border-slate-500/30 text-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Expand Button */}
          {(command.syntax || command.flags) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center w-full p-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors rounded-lg bg-white/10 dark:bg-gray-700/10 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 hover:bg-white/20 dark:hover:bg-gray-600/20"
            >
              <span className="mr-2">
                {isExpanded ? 'Show less' : 'Show details'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </motion.button>
          )}
        </div>

        {/* Expanded Content */}
        <motion.div
          variants={contentVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 border-t border-white/10 dark:border-gray-700/20 pt-4">
            {/* Syntax */}
            {command.syntax && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Syntax:
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => copyToClipboard(command.syntax!)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Copy
                  </motion.button>
                </div>
                <div className="bg-gray-900/80 dark:bg-black/60 backdrop-blur-sm border border-gray-700/50 text-green-400 font-mono text-sm p-3 rounded-lg overflow-x-auto">
                  <code>{command.syntax}</code>
                </div>
              </div>
            )}

            {/* Flags */}
            {command.flags && command.flags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Common Options:
                </h4>
                <div className="space-y-2">
                  {command.flags.map((flag, index) => (
                    <motion.div
                      key={flag.flag}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start space-x-3 p-3 bg-white/10 dark:bg-gray-700/10 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg"
                    >
                      <code className="bg-white/20 dark:bg-gray-600/20 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-2 py-1 rounded font-mono text-sm flex-shrink-0 border border-white/20 dark:border-gray-500/20">
                        {flag.flag}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {flag.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}