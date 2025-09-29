export interface LevelPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'solid' | 'moving' | 'breakable' | 'bounce';
  // Moving platform properties
  movePath?: { x: number; y: number }[];
  moveSpeed?: number;
  // Breakable platform properties
  durability?: number;
  // Bounce platform properties
  bounceStrength?: number;
}

export interface LevelCollectible {
  id: string;
  x: number;
  y: number;
  type: 'leaf' | 'star' | 'heart';
  power?: 'speed' | 'jump' | 'wisdom';
}

export interface LevelObstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'spike' | 'wind' | 'quicksand';
}

export interface LevelData {
  id: string;
  worldId: string;
  name: string;
  description: string;
  startPosition: { x: number; y: number };
  platforms: LevelPlatform[];
  collectibles: LevelCollectible[];
  obstacles: LevelObstacle[];
  goal: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  targetTime: number; // seconds for 3 stars
  requiredStars?: number; // stars needed to unlock
}

export interface WorldData {
  id: string;
  name: string;
  description: string;
  theme: 'savanna' | 'jungle' | 'desert' | 'clouds';
  levels: LevelData[];
  unlocked: boolean;
  completed: boolean;
  totalStars: number;
}

export interface LevelProgress {
  levelId: string;
  completed: boolean;
  bestTime: number;
  stars: number;
  collectiblesFound: number;
  totalCollectibles: number;
}