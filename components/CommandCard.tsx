'use client'

import { motion } from 'framer-motion'
import { Copy, Heart, Terminal, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { DockerCommand } from '@/lib/dockerCommands'

interface CommandCardProps {
  command: DockerCommand
  isFavorite: boolean
  onToggleFavorite: (commandId: string) => void
  minHeight?: number | null
}

export default function CommandCard({ command, isFavorite, onToggleFavorite, minHeight }: CommandCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedFlags, setSelectedFlags] = useState<string[]>([])
  const [selectedCommand, setSelectedCommand] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [editableSyntax, setEditableSyntax] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Initialize editable syntax when component mounts
  useEffect(() => {
    setEditableSyntax(command.syntax || `${command.command} [OPTIONS]`)
  }, [command.syntax, command.command])

  // Common commands and images
  const commonCommands = command.command === 'docker run' ? [
    'bash', 'sh', '/bin/bash', '/bin/sh', 'python', 'node', 'nginx', 'apache2'
  ] : []

  const commonImages = command.command === 'docker run' ? [
    'ubuntu', 'nginx', 'node:16', 'node:18', 'python:3.9', 'python:3.11', 'alpine', 'redis', 'mysql', 'postgres'
  ] : command.command === 'docker pull' || command.command === 'docker push' ? [
    'ubuntu', 'nginx', 'node', 'python', 'alpine', 'redis', 'mysql', 'postgres'
  ] : []

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Toggle flag selection
  const toggleFlag = (flag: string) => {
    setSelectedFlags(prev => 
      prev.includes(flag)
        ? prev.filter(f => f !== flag)
        : [...prev, flag]
    )
  }

  // Toggle command selection
  const toggleCommand = (cmd: string) => {
    setSelectedCommand(prev => prev === cmd ? '' : cmd)
  }

  // Toggle image selection
  const toggleImage = (img: string) => {
    setSelectedImage(prev => prev === img ? '' : img)
  }

  // Build dynamic syntax with selected options
  const buildDynamicSyntax = () => {
    let syntax = command.syntax || `${command.command} [OPTIONS]`

    // Build flags string
    let flagsString = ''
    if (selectedFlags.length > 0) {
      const singleCharFlags = selectedFlags.filter(flag => flag.startsWith('-') && flag.length === 2 && flag !== '--')
      const multiCharFlags = selectedFlags.filter(flag => !singleCharFlags.includes(flag))

      // Combine single-char flags (e.g., -d -p becomes -dp)
      if (singleCharFlags.length > 0) {
        const combinedFlags = singleCharFlags.map(flag => flag.slice(1)).join('')
        flagsString += `-${combinedFlags}`
      }
      
      // Add multi-char flags separately
      if (multiCharFlags.length > 0) {
        if (flagsString) flagsString += ' '
        flagsString += multiCharFlags.join(' ')
      }
    }

    // Replace placeholders with selections
    if (syntax.includes('[OPTIONS]')) {
      syntax = syntax.replace('[OPTIONS]', flagsString || '[OPTIONS]')
    }
    
    if (selectedImage && syntax.includes('IMAGE')) {
      syntax = syntax.replace('IMAGE', selectedImage)
    }
    
    if (selectedCommand && syntax.includes('[COMMAND]')) {
      syntax = syntax.replace('[COMMAND]', selectedCommand)
    }

    return syntax
  }

  // Update editable syntax when selections change
  useEffect(() => {
    setEditableSyntax(buildDynamicSyntax())
  }, [selectedFlags, selectedCommand, selectedImage, command.syntax, command.command])

  // Auto-resize textarea when content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [editableSyntax])

  // Reset card state when command changes (due to search/filter)
  useEffect(() => {
    setIsExpanded(false)
    setSelectedFlags([])
    setSelectedCommand('')
    setSelectedImage('')
  }, [command.id])

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
        {/* Animated Gradient Background Overlay - Light Mode */}
        <motion.div 
          className="absolute inset-0 dark:hidden"
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
        
        {/* Animated Gradient Background Overlay - Dark Mode */}
        <motion.div 
          className="absolute inset-0 hidden dark:block"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(15,23,42,0.4) 0%, rgba(30,58,138,0.25) 50%, rgba(15,23,42,0.4) 100%)',
              'linear-gradient(135deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.4) 50%, rgba(88,28,135,0.25) 100%)',
              'linear-gradient(225deg, rgba(88,28,135,0.25) 0%, rgba(30,58,138,0.25) 50%, rgba(15,23,42,0.4) 100%)',
              'linear-gradient(315deg, rgba(15,23,42,0.4) 0%, rgba(88,28,135,0.25) 50%, rgba(30,58,138,0.25) 100%)',
              'linear-gradient(45deg, rgba(15,23,42,0.4) 0%, rgba(30,58,138,0.25) 50%, rgba(15,23,42,0.4) 100%)'
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
        <div 
          className="relative p-6 flex flex-col" 
          data-card-content
          style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
        >
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
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
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
              <div className="bg-gray-900/80 dark:bg-black/60 backdrop-blur-sm border border-gray-700/50 text-green-400 font-mono text-sm p-4 rounded-lg">
                <code className="block whitespace-pre-wrap break-words">{command.example}</code>
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

          {/* Expanded Content */}
          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            className="overflow-hidden"
          >
            <div className="px-0 pb-4 border-t border-white/10 dark:border-gray-700/20 pt-4">
              {/* Dynamic Syntax */}
              {command.syntax && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Syntax:
                      {selectedFlags.length > 0 && (
                        <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 font-normal">
                          ({selectedFlags.length} option{selectedFlags.length !== 1 ? 's' : ''} selected)
                        </span>
                      )}
                    </h4>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => copyToClipboard(editableSyntax)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Copy
                    </motion.button>
                  </div>
                  <div className="bg-gray-900/80 dark:bg-black/60 backdrop-blur-sm border border-gray-700/50 text-green-400 font-mono text-sm p-3 rounded-lg">
                    <textarea
                      ref={textareaRef}
                      value={editableSyntax}
                      onChange={(e) => {
                        setEditableSyntax(e.target.value)
                        // Auto-resize on change
                        e.target.style.height = 'auto'
                        e.target.style.height = e.target.scrollHeight + 'px'
                      }}
                      className="w-full bg-transparent text-green-400 font-mono text-sm resize-none outline-none border-none overflow-hidden break-words whitespace-pre-wrap"
                      style={{ 
                        minHeight: '1.5rem',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        lineHeight: '1.5',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                      spellCheck={false}
                    />
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
                      <motion.button
                        key={flag.flag}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleFlag(flag.flag)}
                        className={`flex items-start space-x-3 p-3 backdrop-blur-sm border rounded-lg transition-all duration-200 w-full text-left ${
                          selectedFlags.includes(flag.flag)
                            ? 'bg-blue-500/20 border-blue-400/40 shadow-lg ring-1 ring-blue-400/20'
                            : 'bg-white/10 dark:bg-gray-700/10 border-white/20 dark:border-gray-600/20 hover:bg-white/15 dark:hover:bg-gray-600/15'
                        }`}
                      >
                        <code className={`backdrop-blur-sm px-2 py-1 rounded font-mono text-sm flex-shrink-0 border transition-colors ${
                          selectedFlags.includes(flag.flag)
                            ? 'bg-blue-400/20 text-blue-600 dark:text-blue-300 border-blue-400/30'
                            : 'bg-white/20 dark:bg-gray-600/20 text-gray-800 dark:text-gray-200 border-white/20 dark:border-gray-500/20'
                        }`}>
                          {flag.flag}
                        </code>
                        <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                          {flag.description}
                        </p>
                        {selectedFlags.includes(flag.flag) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 }}
                            />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Images */}
              {commonImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Common Images:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {commonImages.map((image) => (
                      <motion.button
                        key={image}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleImage(image)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          selectedImage === image
                            ? 'bg-green-500/20 text-green-600 dark:text-green-300 border border-green-400/40 shadow-lg'
                            : 'bg-white/10 dark:bg-gray-700/10 text-gray-700 dark:text-gray-300 border border-white/20 dark:border-gray-600/20 hover:bg-white/15 dark:hover:bg-gray-600/15'
                        }`}
                      >
                        {image}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Commands */}
              {commonCommands.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Common Commands:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {commonCommands.map((cmd) => (
                      <motion.button
                        key={cmd}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleCommand(cmd)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          selectedCommand === cmd
                            ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-400/40 shadow-lg'
                            : 'bg-white/10 dark:bg-gray-700/10 text-gray-700 dark:text-gray-300 border border-white/20 dark:border-gray-600/20 hover:bg-white/15 dark:hover:bg-gray-600/15'
                        }`}
                      >
                        {cmd}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Expand Button */}
          <div className="mt-auto">
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
        </div>
      </div>
    </motion.div>
  )
}