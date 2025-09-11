'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import Header from '@/components/Header'
import CommandCard from '@/components/CommandCard'
import SearchAndFilter from '@/components/SearchAndFilter'
import LoadingScreen from '@/components/LoadingScreen'
import { dockerCommands, categories, searchCommands } from '@/lib/dockerCommands'
import { FavoritesManager } from '@/lib/favorites'

export default function Home() {
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [cardMinHeight, setCardMinHeight] = useState<number | null>(null)
  const [isCalculatingHeights, setIsCalculatingHeights] = useState(false)
  
  // Refs for height calculation
  const gridRef = useRef<HTMLDivElement>(null)

  // Load favorites on mount
  useEffect(() => {
    setMounted(true)
    setFavorites(FavoritesManager.getFavorites())
  }, [])

  // Handle scroll to show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past roughly where the first card would be
      // Account for header (64px) + search bar (112px) + filters (80px) + some margin (200px)
      const scrollThreshold = 400
      setShowBackToTop(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filter commands based on current filters
  const filteredCommands = useMemo(() => {
    let commands = dockerCommands

    // Filter by search term (only if 2+ characters)
    if (searchTerm && searchTerm.length >= 2) {
      commands = searchCommands(searchTerm)
    }

    // Filter by categories
    if (activeCategories.length > 0) {
      commands = commands.filter(cmd => activeCategories.includes(cmd.category))
    }

    // Filter by favorites
    if (showFavorites) {
      commands = commands.filter(cmd => favorites.includes(cmd.id))
    }

    // Filter by popular commands
    if (showPopularOnly) {
      commands = commands.filter(cmd => cmd.isPopular)
    }

    return commands
  }, [searchTerm, activeCategories, showFavorites, showPopularOnly, favorites])

  // Handle favorite toggle
  const handleToggleFavorite = (commandId: string) => {
    const newFavorites = FavoritesManager.toggleFavorite(commandId)
    setFavorites(newFavorites)
  }

  // Handle category toggle
  const handleToggleCategory = (categoryId: string | null) => {
    if (categoryId === null) {
      // Clear all categories
      setActiveCategories([])
    } else {
      // Toggle the category
      setActiveCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      )
    }
  }

  // Height calculation function
  const calculateCardHeights = useCallback(() => {
    if (!gridRef.current) return
    
    setIsCalculatingHeights(true)
    
    // Small delay to ensure all cards are rendered
    setTimeout(() => {
      const cardElements = gridRef.current?.querySelectorAll('[data-card-content]')
      if (!cardElements || cardElements.length === 0) {
        setIsCalculatingHeights(false)
        return
      }
      
      let maxHeight = 0
      cardElements.forEach((card) => {
        const cardElement = card as HTMLElement
        // Get the actual height of the collapsed card
        const height = cardElement.getBoundingClientRect().height
        maxHeight = Math.max(maxHeight, height)
      })
      
      setCardMinHeight(maxHeight)
      setIsCalculatingHeights(false)
    }, 100)
  }, [])

  // Calculate heights when filtered commands change
  useEffect(() => {
    if (filteredCommands.length > 0 && mounted) {
      calculateCardHeights()
    }
  }, [filteredCommands, mounted, calculateCardHeights])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Container variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (!mounted) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Fixed Search Bar */}
      <div 
        className="fixed top-16 left-0 right-0 z-40 bg-white/5 dark:bg-slate-800/40 backdrop-blur-3xl border-b border-white/10 dark:border-slate-600/30"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFavorites={showFavorites}
            onToggleFavorites={() => setShowFavorites(!showFavorites)}
            totalResults={filteredCommands.length}
            showPopularOnly={showPopularOnly}
            onTogglePopular={() => setShowPopularOnly(!showPopularOnly)}
            activeCategories={activeCategories}
            onCategoryChange={handleToggleCategory}
            categories={categories}
            showFiltersOnly={false}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-6">
        {/* Scrollable Filters */}
        <div className="mb-6">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFavorites={showFavorites}
            onToggleFavorites={() => setShowFavorites(!showFavorites)}
            totalResults={filteredCommands.length}
            showPopularOnly={showPopularOnly}
            onTogglePopular={() => setShowPopularOnly(!showPopularOnly)}
            activeCategories={activeCategories}
            onCategoryChange={handleToggleCategory}
            categories={categories}
            showFiltersOnly={true}
          />
        </div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {activeCategories.length === 1
              ? categories.find(cat => cat.id === activeCategories[0])?.name
              : activeCategories.length > 1
              ? `${activeCategories.length} Categories Selected`
              : showFavorites
              ? 'Favorite Commands'
              : showPopularOnly
              ? 'Popular Commands'
              : 'All Docker Commands'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Commands Grid */}
        <div className="relative">
          {/* Loading Overlay */}
          <AnimatePresence>
            {isCalculatingHeights && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Optimizing layout...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {searchTerm.length === 1 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <div className="text-4xl mb-4">⌨️</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Keep typing...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter at least 2 characters to search
                </p>
              </motion.div>
            ) : filteredCommands.length > 0 ? (
              <motion.div
                ref={gridRef}
                key={`${activeCategories.join('-')}-${showFavorites}-${showPopularOnly}-${searchTerm}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-wrap gap-6"
              >
                {filteredCommands.map((command) => (
                  <motion.div 
                    key={command.id} 
                    variants={itemVariants}
                    className="w-full lg:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                  >
                    <CommandCard
                      command={command}
                      isFavorite={favorites.includes(command.id)}
                      onToggleFavorite={handleToggleFavorite}
                      minHeight={cardMinHeight}
                    />
                  </motion.div>
                ))}
              </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No commands found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your search terms or filters
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('')
                  setActiveCategories([])
                  setShowFavorites(false)
                  setShowPopularOnly(false)
                }}
                className="px-6 py-3 bg-docker-blue text-white rounded-lg hover:bg-docker-darkblue transition-colors"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Docker Pimp
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your ultimate Docker commands companion
              </p>
            </div>
            
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Built with ❤️ by <span className="font-medium text-docker-blue dark:text-docker-lightblue">Kiernan</span></p>
              <p className="mt-1">Journeyman Frontend Developer • Digital Innovator • Web3 Pioneer</p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-docker-blue dark:hover:text-docker-lightblue transition-colors"
                title="GitHub Repository"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-docker-blue dark:hover:text-docker-lightblue transition-colors"
                title="Docker Hub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185M24 10.893a9.07 9.07 0 01-3.14 1.787l-.9-1.559h-2.297c-.003 0-.003-.185-.003-.185V9.006c0-.102-.084-.186-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186h2.118a.186.186 0 00.186-.186v-1.887l2.297.001.9 1.559A8.993 8.993 0 0124 10.893M8.1 13.628h2.12c.102 0 .184-.084.184-.186v-1.888A.185.185 0 0010.22 11.37H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.964 0h2.119a.185.185 0 00.185-.186v-1.888a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {filteredCommands.length >= 5 && showBackToTop && (
          <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            boxShadow: [
              '0 4px 20px rgba(36, 150, 237, 0.4), 0 0 20px rgba(36, 150, 237, 0.2)',
              '0 6px 30px rgba(36, 150, 237, 0.6), 0 0 30px rgba(36, 150, 237, 0.4)',
              '0 4px 20px rgba(36, 150, 237, 0.4), 0 0 20px rgba(36, 150, 237, 0.2)'
            ]
          }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 8px 40px rgba(36, 150, 237, 0.8)'
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 text-white rounded-full backdrop-blur-xl border border-white/30 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(36, 150, 237, 0.2), rgba(29, 78, 216, 0.3))',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            default: { duration: 0.3, ease: 'easeOut' }
          }}
          title="Back to top"
        >
          <ChevronUp className="w-6 h-6 drop-shadow-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}