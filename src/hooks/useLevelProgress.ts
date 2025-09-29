import { useState, useCallback, useEffect } from 'react';
import { LevelProgress } from '@/types/level';

const STORAGE_KEY = 'gimbo-level-progress';

export const useLevelProgress = () => {
  const [levelProgress, setLevelProgress] = useState<Record<string, LevelProgress>>({});

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLevelProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load level progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((progress: Record<string, LevelProgress>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    setLevelProgress(progress);
  }, []);

  const updateLevelProgress = useCallback((levelId: string, updates: Partial<LevelProgress>) => {
    setLevelProgress(prev => {
      const current = prev[levelId] || {
        levelId,
        completed: false,
        bestTime: Infinity,
        stars: 0,
        collectiblesFound: 0,
        totalCollectibles: 0
      };

      const updated = { ...current, ...updates };
      
      // Calculate stars based on performance
      if (updates.completed && typeof updates.bestTime === 'number') {
        const level = getLevelById(levelId);
        if (level) {
          let stars = 1; // Base completion star
          if (updated.bestTime <= level.targetTime) stars = 2;
          if (updated.collectiblesFound === updated.totalCollectibles) stars = 3;
          updated.stars = Math.max(updated.stars, stars);
        }
      }

      const newProgress = { ...prev, [levelId]: updated };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  const getLevelProgress = useCallback((levelId: string): LevelProgress => {
    return levelProgress[levelId] || {
      levelId,
      completed: false,
      bestTime: Infinity,
      stars: 0,
      collectiblesFound: 0,
      totalCollectibles: 0
    };
  }, [levelProgress]);

  const getTotalStars = useCallback((): number => {
    return Object.values(levelProgress).reduce((total, progress) => total + progress.stars, 0);
  }, [levelProgress]);

  const getWorldProgress = useCallback((worldId: string) => {
    const worldLevels = Object.values(levelProgress).filter(p => p.levelId.startsWith(worldId));
    const completedLevels = worldLevels.filter(p => p.completed).length;
    const totalStars = worldLevels.reduce((sum, p) => sum + p.stars, 0);
    return { completedLevels, totalStars };
  }, [levelProgress]);

  const isLevelUnlocked = useCallback((levelId: string, requiredStars?: number): boolean => {
    if (!requiredStars) return true;
    return getTotalStars() >= requiredStars;
  }, [getTotalStars]);

  return {
    levelProgress,
    updateLevelProgress,
    getLevelProgress,
    getTotalStars,
    getWorldProgress,
    isLevelUnlocked
  };
};

// Helper function to get level by ID (will be moved to a utils file)
function getLevelById(levelId: string) {
  // This is a simplified version - in practice you'd import from your level data
  // For now, return a mock object with targetTime
  return { targetTime: 60 };
}