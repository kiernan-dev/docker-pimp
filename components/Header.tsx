'use client'

import { motion } from 'framer-motion'
import { Terminal, Github, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 dark:bg-slate-800/40 backdrop-blur-3xl supports-[backdrop-filter]:bg-white/5 border-b border-white/10 dark:border-slate-600/30"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent dark:from-white/5 dark:via-white/2 dark:to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-xl shadow-lg ring-1 ring-white/20 dark:ring-white/10">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Docker Pimp
              </h1>
              <p className="text-sm text-gray-600/80 dark:text-gray-400/80 hidden sm:block font-medium">
                Your Ultimate Docker Companion
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="relative p-2.5 rounded-xl bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm ring-1 ring-white/30 dark:ring-slate-500/40 hover:bg-white/30 dark:hover:bg-slate-600/60 transition-all duration-300 group overflow-hidden"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {darkMode ? 
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200 relative z-10" /> : 
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200 relative z-10" />
              }
            </motion.button>

            {/* GitHub Link */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2.5 rounded-xl bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm ring-1 ring-white/30 dark:ring-slate-500/40 hover:bg-white/30 dark:hover:bg-slate-600/60 transition-all duration-300 group overflow-hidden"
              title="View on GitHub"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Github className="w-5 h-5 text-gray-700 dark:text-gray-200 relative z-10" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}