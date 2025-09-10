'use client'

// Utility functions for managing favorites in localStorage
export class FavoritesManager {
  private static readonly STORAGE_KEY = 'docker-cheat-sheet-favorites'

  static getFavorites(): string[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error)
      return []
    }
  }

  static saveFavorites(favorites: string[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }

  static addFavorite(commandId: string): string[] {
    const favorites = this.getFavorites()
    if (!favorites.includes(commandId)) {
      favorites.push(commandId)
      this.saveFavorites(favorites)
    }
    return favorites
  }

  static removeFavorite(commandId: string): string[] {
    const favorites = this.getFavorites()
    const updatedFavorites = favorites.filter(id => id !== commandId)
    this.saveFavorites(updatedFavorites)
    return updatedFavorites
  }

  static toggleFavorite(commandId: string): string[] {
    const favorites = this.getFavorites()
    if (favorites.includes(commandId)) {
      return this.removeFavorite(commandId)
    } else {
      return this.addFavorite(commandId)
    }
  }

  static isFavorite(commandId: string): boolean {
    return this.getFavorites().includes(commandId)
  }

  static clearFavorites(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error)
    }
  }

  static exportFavorites(): string {
    const favorites = this.getFavorites()
    return JSON.stringify(favorites, null, 2)
  }

  static importFavorites(jsonString: string): boolean {
    try {
      const favorites = JSON.parse(jsonString)
      if (Array.isArray(favorites) && favorites.every(item => typeof item === 'string')) {
        this.saveFavorites(favorites)
        return true
      }
      return false
    } catch (error) {
      console.error('Error importing favorites:', error)
      return false
    }
  }
}