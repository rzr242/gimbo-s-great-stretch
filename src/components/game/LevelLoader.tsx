import { useEffect } from 'react';
import { LevelData, LevelPlatform, LevelCollectible } from '@/types/level';
import { Platform, Collectible, Gimbo } from '@/types/game';

interface LevelLoaderProps {
  levelData: LevelData;
  onLevelLoaded: (platforms: Platform[], collectibles: Collectible[], gimboStart: Partial<Gimbo>) => void;
}

export const LevelLoader = ({ levelData, onLevelLoaded }: LevelLoaderProps) => {
  useEffect(() => {
    // Convert level platforms to game platforms
    const platforms: Platform[] = levelData.platforms.map((levelPlatform: LevelPlatform) => ({
      x: levelPlatform.x,
      y: levelPlatform.y,
      width: levelPlatform.width,
      height: levelPlatform.height,
      type: levelPlatform.type === 'moving' || levelPlatform.type === 'breakable' || levelPlatform.type === 'bounce' 
        ? 'solid' // For now, treat special platforms as solid
        : levelPlatform.type
    }));

    // Convert level collectibles to game collectibles
    const collectibles: Collectible[] = levelData.collectibles.map((levelCollectible: LevelCollectible) => ({
      id: levelCollectible.id,
      x: levelCollectible.x,
      y: levelCollectible.y,
      type: levelCollectible.type,
      collected: false,
      power: levelCollectible.power
    }));

    // Set Gimbo's starting position
    const gimboStart: Partial<Gimbo> = {
      position: { x: levelData.startPosition.x, y: levelData.startPosition.y }
    };

    onLevelLoaded(platforms, collectibles, gimboStart);
  }, [levelData, onLevelLoaded]);

  return null; // This component doesn't render anything
};