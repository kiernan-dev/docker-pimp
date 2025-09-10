'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, PlayCircle, Package, Box, Network, HardDrive, Layers, Settings } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface FilterTagsProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  showPopularOnly: boolean
  onTogglePopular: () => void
}

export default function FilterTags({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  showPopularOnly, 
  onTogglePopular 
}: FilterTagsProps) {
  
  // Icon mapping
  const iconMap = {
    PlayCircle,
    Package,
    Box,
    Network,
    HardDrive,
    Layers,
    Settings
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <Box className="w-4 h-4" />
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  }

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.15 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-6"
    >
      <div className="flex flex-wrap gap-2">
        {/* Popular Commands Filter */}
        <motion.button
          variants={tagVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePopular}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            showPopularOnly
              ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-700 dark:text-orange-300 shadow-lg'
              : 'bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-700/30'
          }`}
        >
          <span className="text-lg">⭐</span>
          <span>Popular</span>
          {showPopularOnly && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-1"
            >
              <X className="w-3 h-3" />
            </motion.div>
          )}
        </motion.button>

        {/* Category Filter Tags */}
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            variants={tagVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(activeCategory === category.id ? null : category.id)}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 text-blue-700 dark:text-blue-300 shadow-lg'
                : 'bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-700/30'
            }`}
          >
            {getIcon(category.icon)}
            <span>{category.name}</span>
            <span className="bg-white/30 dark:bg-gray-600/30 px-2 py-0.5 rounded-full text-xs">
              {category.count}
            </span>
            {activeCategory === category.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-1"
              >
                <X className="w-3 h-3" />
              </motion.div>
            )}
          </motion.button>
        ))}

        {/* Clear All Filters */}
        <AnimatePresence>
          {(activeCategory || showPopularOnly) && (
            <motion.button
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onCategoryChange(null)
                if (showPopularOnly) onTogglePopular()
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-500/20 border border-gray-400/30 text-gray-700 dark:text-gray-300 hover:bg-gray-500/30 transition-all duration-200 backdrop-blur-xl"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}