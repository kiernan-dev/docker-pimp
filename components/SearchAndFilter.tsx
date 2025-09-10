'use client'

import { motion } from 'framer-motion'
import { Search, X, Star, Heart, PlayCircle, Package, Box, Network, HardDrive, Layers, Settings, Key, Globe, Users, Cloud, Server, Puzzle, Lock } from 'lucide-react'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  showFavorites: boolean
  onToggleFavorites: () => void
  totalResults: number
  showPopularOnly: boolean
  onTogglePopular: () => void
  activeCategories: string[]
  onCategoryChange: (categoryId: string | null) => void
  categories: Category[]
  showFiltersOnly?: boolean
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  showFavorites,
  onToggleFavorites,
  totalResults,
  showPopularOnly,
  onTogglePopular,
  activeCategories,
  onCategoryChange,
  categories,
  showFiltersOnly = false
}: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(true)

  // Icon mapping
  const iconMap = {
    PlayCircle,
    Package,
    Box,
    Network,
    HardDrive,
    Layers,
    Settings,
    Key,
    Globe,
    Cluster: Users, // Using Users icon for Cluster
    Cloud,
    Stack: Layers, // Using Layers icon for Stack
    Server,
    Puzzle,
    Lock
  }

  const getIcon = (iconName: string, small = false) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    const iconClass = small ? "w-3 h-3" : "w-4 h-4"
    return IconComponent ? <IconComponent className={iconClass} /> : <Box className={iconClass} />
  }

  const totalCommands = categories.reduce((sum, cat) => sum + cat.count, 0)

  // Show only search bar for fixed header
  if (!showFiltersOnly) {
    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Docker commands, descriptions, or tags..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-white/10 dark:bg-slate-700/30 backdrop-blur-xl border border-white/30 dark:border-slate-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 shadow-xl text-lg ring-1 ring-white/20 dark:ring-slate-400/20"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
          }}
        />
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-white/20 dark:hover:bg-gray-700/20 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    )
  }

  // Show only filters for scrollable section
  return (

    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Filter by Category
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {totalResults} result{totalResults !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Category Filter Bubbles */}
      <div className="flex flex-wrap gap-1.5">
        {/* All Commands */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(null)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm border text-xs ${
            activeCategories.length === 0
              ? 'bg-docker-blue/20 border-docker-blue/30 text-docker-blue dark:text-docker-lightblue shadow-lg'
              : 'bg-white/20 dark:bg-slate-700/40 border-white/20 dark:border-slate-500/40 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-slate-600/50'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span className="font-medium">All Commands</span>
          <span className="text-xs opacity-75 bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
            {totalCommands}
          </span>
        </motion.button>

        {/* Category Filters */}
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm border text-xs ${
              activeCategories.includes(category.id)
                ? 'bg-docker-blue/20 border-docker-blue/30 text-docker-blue dark:text-docker-lightblue shadow-lg'
                : 'bg-white/20 dark:bg-slate-700/40 border-white/20 dark:border-slate-500/40 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-slate-600/50'
            }`}
          >
            {getIcon(category.icon, true)}
            <span className="font-medium">{category.name}</span>
            <span className="text-xs opacity-75 bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Additional Filter Bubbles */}
      <div className="flex flex-wrap gap-1.5">
        {/* Favorites Filter */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleFavorites}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm border text-xs ${
            showFavorites
              ? 'bg-red-100/50 dark:bg-red-900/40 text-red-600 dark:text-red-300 border-red-300/50 dark:border-red-600/50 shadow-lg'
              : 'bg-white/20 dark:bg-slate-700/40 border-white/20 dark:border-slate-500/40 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-slate-600/50'
          }`}
        >
          <Heart className={`w-3 h-3 ${showFavorites ? 'fill-current' : ''}`} />
          <span className="font-medium">Favorites Only</span>
        </motion.button>

        {/* Popular Commands Filter */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePopular}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm border text-xs ${
            showPopularOnly
              ? 'bg-orange-100/50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 border-orange-300/50 dark:border-orange-600/50 shadow-lg'
              : 'bg-white/20 dark:bg-slate-700/40 border-white/20 dark:border-slate-500/40 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-slate-600/50'
          }`}
        >
          <Star className={`w-3 h-3 ${showPopularOnly ? 'fill-current' : ''}`} />
          <span className="font-medium">Popular Commands</span>
        </motion.button>

        {/* Clear All Filters */}
        {(searchTerm || showFavorites || showPopularOnly || activeCategories.length > 0) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onSearchChange('')
              onCategoryChange(null) // This will clear all categories
              if (showFavorites) onToggleFavorites()
              if (showPopularOnly) onTogglePopular()
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-all duration-200 border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm text-xs"
          >
            <X className="w-3 h-3" />
            <span className="font-medium">Clear All</span>
          </motion.button>
        )}
      </div>
    </div>
  )
}