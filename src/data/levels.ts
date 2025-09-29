import { WorldData, LevelData } from '@/types/level';

const GAME_CONSTANTS = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 400,
  GROUND_Y: 350
};

// Savanna World Levels
const savannaLevels: LevelData[] = [
  {
    id: 'savanna-1',
    worldId: 'savanna',
    name: 'First Steps',
    description: 'Learn the basics of movement and jumping',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      // Ground platforms
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 300, height: 50, type: 'solid' },
      { x: 400, y: GAME_CONSTANTS.GROUND_Y, width: 400, height: 50, type: 'solid' },
      
      // Simple floating platforms
      { x: 300, y: 280, width: 120, height: 20, type: 'solid' },
      { x: 500, y: 220, width: 100, height: 20, type: 'solid' },
      { x: 700, y: 180, width: 120, height: 20, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 320, y: 250, type: 'leaf', power: 'speed' },
      { id: 'star1', x: 520, y: 190, type: 'star' },
      { id: 'leaf2', x: 720, y: 150, type: 'leaf', power: 'jump' }
    ],
    obstacles: [],
    goal: { x: 800, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 900, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 30
  },
  {
    id: 'savanna-2',
    worldId: 'savanna',
    name: 'Moving Bridges',
    description: 'Navigate moving platforms across the savanna',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' },
      { x: 300, y: 280, width: 80, height: 20, type: 'moving', movePath: [{ x: 300, y: 280 }, { x: 450, y: 280 }], moveSpeed: 2 },
      { x: 600, y: 200, width: 80, height: 20, type: 'moving', movePath: [{ x: 600, y: 200 }, { x: 600, y: 300 }], moveSpeed: 1.5 },
      { x: 800, y: 250, width: 100, height: 20, type: 'solid' },
      { x: 1000, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 350, y: 250, type: 'star' },
      { id: 'heart1', x: 620, y: 170, type: 'heart' },
      { id: 'leaf1', x: 830, y: 220, type: 'leaf', power: 'wisdom' }
    ],
    obstacles: [],
    goal: { x: 1100, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1200, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 45
  },
  {
    id: 'savanna-3',
    worldId: 'savanna',
    name: 'Sunset Challenge',
    description: 'Master bouncing platforms and breakable bridges',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 150, height: 50, type: 'solid' },
      { x: 250, y: 300, width: 60, height: 15, type: 'bounce', bounceStrength: -20 },
      { x: 400, y: 200, width: 80, height: 15, type: 'breakable', durability: 3 },
      { x: 600, y: 250, width: 60, height: 15, type: 'bounce', bounceStrength: -25 },
      { x: 800, y: 150, width: 100, height: 20, type: 'solid' },
      { x: 1050, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 270, y: 270, type: 'leaf', power: 'speed' },
      { id: 'star1', x: 420, y: 170, type: 'star' },
      { id: 'star2', x: 620, y: 220, type: 'star' },
      { id: 'heart1', x: 820, y: 120, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1150, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1300, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 60
  },
  {
    id: 'savanna-4',
    worldId: 'savanna',
    name: 'Acacia Heights',
    description: 'Climb the tall acacia trees with precision jumps',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 120, height: 50, type: 'solid' },
      { x: 200, y: 300, width: 40, height: 15, type: 'solid' },
      { x: 320, y: 250, width: 40, height: 15, type: 'breakable', durability: 2 },
      { x: 450, y: 200, width: 60, height: 15, type: 'bounce', bounceStrength: -22 },
      { x: 600, y: 150, width: 40, height: 15, type: 'moving', movePath: [{ x: 600, y: 150 }, { x: 750, y: 150 }], moveSpeed: 2.5 },
      { x: 850, y: 100, width: 80, height: 15, type: 'solid' },
      { x: 1000, y: 200, width: 60, height: 15, type: 'bounce', bounceStrength: -28 },
      { x: 1200, y: GAME_CONSTANTS.GROUND_Y, width: 150, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 220, y: 270, type: 'leaf', power: 'jump' },
      { id: 'star1', x: 340, y: 220, type: 'star' },
      { id: 'star2', x: 470, y: 170, type: 'star' },
      { id: 'heart1', x: 870, y: 70, type: 'heart' },
      { id: 'star3', x: 1020, y: 170, type: 'star' }
    ],
    obstacles: [],
    goal: { x: 1300, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1400, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 75
  },
  {
    id: 'savanna-5',
    worldId: 'savanna',
    name: 'The Great Migration',
    description: 'Follow the animal migration path across the plains',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 100, height: 50, type: 'solid' },
      { x: 200, y: 280, width: 80, height: 15, type: 'moving', movePath: [{ x: 200, y: 280 }, { x: 350, y: 280 }], moveSpeed: 3 },
      { x: 450, y: 220, width: 60, height: 15, type: 'breakable', durability: 1 },
      { x: 600, y: 300, width: 80, height: 15, type: 'moving', movePath: [{ x: 600, y: 300 }, { x: 600, y: 180 }], moveSpeed: 2 },
      { x: 800, y: 160, width: 60, height: 15, type: 'bounce', bounceStrength: -30 },
      { x: 950, y: 240, width: 80, height: 15, type: 'moving', movePath: [{ x: 950, y: 240 }, { x: 1100, y: 240 }], moveSpeed: 2.5 },
      { x: 1250, y: 200, width: 60, height: 15, type: 'breakable', durability: 2 },
      { x: 1400, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 220, y: 250, type: 'star' },
      { id: 'leaf1', x: 470, y: 190, type: 'leaf', power: 'speed' },
      { id: 'star2', x: 620, y: 270, type: 'star' },
      { id: 'star3', x: 820, y: 130, type: 'star' },
      { id: 'heart1', x: 970, y: 210, type: 'heart' },
      { id: 'leaf2', x: 1270, y: 170, type: 'leaf', power: 'wisdom' }
    ],
    obstacles: [],
    goal: { x: 1500, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1650, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 90
  }
];

// Jungle World Levels
const jungleLevels: LevelData[] = [
  {
    id: 'jungle-1',
    worldId: 'jungle',
    name: 'Vine Swinging',
    description: 'Navigate the dense jungle canopy',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' },
      { x: 300, y: 250, width: 80, height: 20, type: 'solid' },
      { x: 500, y: 180, width: 60, height: 15, type: 'breakable', durability: 2 },
      { x: 700, y: 220, width: 80, height: 20, type: 'moving', movePath: [{ x: 700, y: 220 }, { x: 700, y: 300 }], moveSpeed: 2 },
      { x: 900, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 320, y: 220, type: 'leaf', power: 'jump' },
      { id: 'star1', x: 520, y: 150, type: 'star' },
      { id: 'heart1', x: 720, y: 190, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1000, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1150, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 40,
    requiredStars: 3
  },
  {
    id: 'jungle-2',
    worldId: 'jungle',
    name: 'Canopy Heights',
    description: 'Reach for the treetops with bouncing leaves',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 150, height: 50, type: 'solid' },
      { x: 250, y: 280, width: 60, height: 15, type: 'bounce', bounceStrength: -22 },
      { x: 450, y: 200, width: 60, height: 15, type: 'bounce', bounceStrength: -25 },
      { x: 650, y: 120, width: 80, height: 20, type: 'solid' },
      { x: 850, y: 180, width: 60, height: 15, type: 'breakable', durability: 1 },
      { x: 1000, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 270, y: 250, type: 'star' },
      { id: 'leaf1', x: 470, y: 170, type: 'leaf', power: 'wisdom' },
      { id: 'star2', x: 670, y: 90, type: 'star' },
      { id: 'heart1', x: 870, y: 150, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1100, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1250, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 50,
    requiredStars: 6
  },
  {
    id: 'jungle-3',
    worldId: 'jungle',
    name: 'Temple Ruins',
    description: 'Ancient platforms hide jungle secrets',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 120, height: 50, type: 'solid' },
      { x: 220, y: 250, width: 80, height: 15, type: 'breakable', durability: 2 },
      { x: 400, y: 200, width: 60, height: 15, type: 'moving', movePath: [{ x: 400, y: 200 }, { x: 550, y: 200 }], moveSpeed: 1.5 },
      { x: 700, y: 150, width: 60, height: 15, type: 'bounce', bounceStrength: -30 },
      { x: 900, y: 100, width: 100, height: 20, type: 'solid' },
      { x: 1200, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 240, y: 220, type: 'leaf', power: 'speed' },
      { id: 'star1', x: 420, y: 170, type: 'star' },
      { id: 'star2', x: 720, y: 120, type: 'star' },
      { id: 'star3', x: 920, y: 70, type: 'star' },
      { id: 'heart1', x: 1250, y: GAME_CONSTANTS.GROUND_Y - 30, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1300, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1400, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 75,
    requiredStars: 9
  },
  {
    id: 'jungle-4',
    worldId: 'jungle',
    name: 'Monkey Business',
    description: 'Swing through the jungle like the monkeys do',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 100, height: 50, type: 'solid' },
      { x: 180, y: 280, width: 50, height: 15, type: 'moving', movePath: [{ x: 180, y: 280 }, { x: 280, y: 200 }], moveSpeed: 2 },
      { x: 350, y: 160, width: 60, height: 15, type: 'bounce', bounceStrength: -25 },
      { x: 500, y: 240, width: 50, height: 15, type: 'breakable', durability: 1 },
      { x: 650, y: 180, width: 60, height: 15, type: 'moving', movePath: [{ x: 650, y: 180 }, { x: 750, y: 120 }], moveSpeed: 2.5 },
      { x: 850, y: 200, width: 80, height: 15, type: 'bounce', bounceStrength: -28 },
      { x: 1050, y: 100, width: 60, height: 15, type: 'solid' },
      { x: 1200, y: GAME_CONSTANTS.GROUND_Y, width: 150, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 200, y: 250, type: 'star' },
      { id: 'leaf1', x: 370, y: 130, type: 'leaf', power: 'jump' },
      { id: 'star2', x: 520, y: 210, type: 'star' },
      { id: 'star3', x: 670, y: 150, type: 'star' },
      { id: 'heart1', x: 870, y: 170, type: 'heart' },
      { id: 'star4', x: 1070, y: 70, type: 'star' }
    ],
    obstacles: [],
    goal: { x: 1300, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1400, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 85,
    requiredStars: 12
  },
  {
    id: 'jungle-5',
    worldId: 'jungle',
    name: 'Heart of Darkness',
    description: 'The deepest part of the jungle holds the greatest treasures',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 80, height: 50, type: 'solid' },
      { x: 150, y: 300, width: 40, height: 15, type: 'breakable', durability: 1 },
      { x: 250, y: 240, width: 60, height: 15, type: 'moving', movePath: [{ x: 250, y: 240 }, { x: 380, y: 160 }], moveSpeed: 1.8 },
      { x: 450, y: 200, width: 50, height: 15, type: 'bounce', bounceStrength: -32 },
      { x: 600, y: 120, width: 40, height: 15, type: 'breakable', durability: 2 },
      { x: 750, y: 180, width: 60, height: 15, type: 'moving', movePath: [{ x: 750, y: 180 }, { x: 750, y: 280 }], moveSpeed: 3 },
      { x: 900, y: 100, width: 50, height: 15, type: 'bounce', bounceStrength: -35 },
      { x: 1100, y: 160, width: 80, height: 15, type: 'moving', movePath: [{ x: 1100, y: 160 }, { x: 1250, y: 160 }], moveSpeed: 2.2 },
      { x: 1400, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 170, y: 270, type: 'leaf', power: 'speed' },
      { id: 'star1', x: 270, y: 210, type: 'star' },
      { id: 'star2', x: 470, y: 170, type: 'star' },
      { id: 'star3', x: 620, y: 90, type: 'star' },
      { id: 'heart1', x: 770, y: 150, type: 'heart' },
      { id: 'star4', x: 920, y: 70, type: 'star' },
      { id: 'leaf2', x: 1120, y: 130, type: 'leaf', power: 'wisdom' }
    ],
    obstacles: [],
    goal: { x: 1500, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1650, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 120,
    requiredStars: 15
  }
];

// Desert World Levels
const desertLevels: LevelData[] = [
  {
    id: 'desert-1',
    worldId: 'desert',
    name: 'Dune Walker',
    description: 'Navigate the shifting sands',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 180, height: 50, type: 'solid' },
      { x: 300, y: 280, width: 100, height: 20, type: 'moving', movePath: [{ x: 300, y: 280 }, { x: 500, y: 280 }], moveSpeed: 1.8 },
      { x: 650, y: 200, width: 80, height: 20, type: 'solid' },
      { x: 850, y: 250, width: 60, height: 15, type: 'breakable', durability: 2 },
      { x: 1050, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 350, y: 250, type: 'star' },
      { id: 'leaf1', x: 670, y: 170, type: 'leaf', power: 'speed' },
      { id: 'heart1', x: 870, y: 220, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1150, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1300, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 45,
    requiredStars: 12
  },
  {
    id: 'desert-2',
    worldId: 'desert',
    name: 'Oasis Springs',
    description: 'Bounce between palm-shaded platforms',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 150, height: 50, type: 'solid' },
      { x: 250, y: 300, width: 60, height: 15, type: 'bounce', bounceStrength: -24 },
      { x: 450, y: 220, width: 80, height: 20, type: 'moving', movePath: [{ x: 450, y: 220 }, { x: 450, y: 300 }], moveSpeed: 2.5 },
      { x: 650, y: 150, width: 60, height: 15, type: 'bounce', bounceStrength: -28 },
      { x: 850, y: 200, width: 100, height: 20, type: 'solid' },
      { x: 1100, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 270, y: 270, type: 'leaf', power: 'jump' },
      { id: 'star1', x: 470, y: 190, type: 'star' },
      { id: 'star2', x: 670, y: 120, type: 'star' },
      { id: 'heart1', x: 870, y: 170, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1200, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1350, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 55,
    requiredStars: 15
  },
  {
    id: 'desert-3',
    worldId: 'desert',
    name: 'Pyramid Ascent',
    description: 'Scale the ancient pyramid',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 120, height: 50, type: 'solid' },
      { x: 250, y: 280, width: 80, height: 15, type: 'breakable', durability: 1 },
      { x: 450, y: 220, width: 60, height: 15, type: 'bounce', bounceStrength: -26 },
      { x: 650, y: 160, width: 80, height: 15, type: 'breakable', durability: 2 },
      { x: 850, y: 100, width: 60, height: 15, type: 'bounce', bounceStrength: -32 },
      { x: 1050, y: 50, width: 100, height: 20, type: 'solid' },
      { x: 1300, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 270, y: 250, type: 'star' },
      { id: 'leaf1', x: 470, y: 190, type: 'leaf', power: 'wisdom' },
      { id: 'star2', x: 670, y: 130, type: 'star' },
      { id: 'star3', x: 870, y: 70, type: 'star' },
      { id: 'heart1', x: 1070, y: 20, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1400, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1550, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 80,
    requiredStars: 18
  },
  {
    id: 'desert-4',
    worldId: 'desert',
    name: 'Sandstorm Escape',
    description: 'Race through the desert before the sandstorm hits',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 100, height: 50, type: 'solid' },
      { x: 180, y: 280, width: 60, height: 15, type: 'moving', movePath: [{ x: 180, y: 280 }, { x: 320, y: 280 }], moveSpeed: 3.5 },
      { x: 400, y: 200, width: 50, height: 15, type: 'bounce', bounceStrength: -30 },
      { x: 550, y: 240, width: 80, height: 15, type: 'moving', movePath: [{ x: 550, y: 240 }, { x: 700, y: 180 }], moveSpeed: 2.8 },
      { x: 850, y: 160, width: 60, height: 15, type: 'breakable', durability: 1 },
      { x: 1000, y: 220, width: 80, height: 15, type: 'bounce', bounceStrength: -35 },
      { x: 1200, y: 120, width: 100, height: 20, type: 'solid' },
      { x: 1450, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 200, y: 250, type: 'star' },
      { id: 'leaf1', x: 420, y: 170, type: 'leaf', power: 'speed' },
      { id: 'star2', x: 570, y: 210, type: 'star' },
      { id: 'star3', x: 870, y: 130, type: 'star' },
      { id: 'heart1', x: 1020, y: 190, type: 'heart' },
      { id: 'star4', x: 1220, y: 90, type: 'star' }
    ],
    obstacles: [],
    goal: { x: 1550, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1700, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 90,
    requiredStars: 21
  },
  {
    id: 'desert-5',
    worldId: 'desert',
    name: 'Pharaoh\'s Treasure',
    description: 'Reach the top of the great pyramid for ultimate treasure',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 80, height: 50, type: 'solid' },
      { x: 150, y: 320, width: 40, height: 15, type: 'breakable', durability: 1 },
      { x: 250, y: 280, width: 50, height: 15, type: 'bounce', bounceStrength: -28 },
      { x: 380, y: 220, width: 40, height: 15, type: 'moving', movePath: [{ x: 380, y: 220 }, { x: 480, y: 180 }], moveSpeed: 2.5 },
      { x: 550, y: 160, width: 50, height: 15, type: 'breakable', durability: 2 },
      { x: 680, y: 120, width: 40, height: 15, type: 'bounce', bounceStrength: -32 },
      { x: 800, y: 80, width: 60, height: 15, type: 'moving', movePath: [{ x: 800, y: 80 }, { x: 920, y: 80 }], moveSpeed: 3 },
      { x: 1000, y: 40, width: 50, height: 15, type: 'bounce', bounceStrength: -40 },
      { x: 1150, y: 10, width: 80, height: 20, type: 'solid' },
      { x: 1400, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 170, y: 290, type: 'star' },
      { id: 'leaf1', x: 270, y: 250, type: 'leaf', power: 'jump' },
      { id: 'star2', x: 400, y: 190, type: 'star' },
      { id: 'star3', x: 570, y: 130, type: 'star' },
      { id: 'star4', x: 700, y: 90, type: 'star' },
      { id: 'heart1', x: 820, y: 50, type: 'heart' },
      { id: 'star5', x: 1020, y: 10, type: 'star' },
      { id: 'leaf2', x: 1170, y: -20, type: 'leaf', power: 'wisdom' }
    ],
    obstacles: [],
    goal: { x: 1500, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1650, minY: -50, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 150,
    requiredStars: 24
  }
];

// Clouds World Levels
const cloudsLevels: LevelData[] = [
  {
    id: 'clouds-1',
    worldId: 'clouds',
    name: 'Sky Walker',
    description: 'Float among the fluffy clouds',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 150, height: 50, type: 'solid' },
      { x: 250, y: 250, width: 80, height: 15, type: 'bounce', bounceStrength: -20 },
      { x: 450, y: 180, width: 60, height: 15, type: 'moving', movePath: [{ x: 450, y: 180 }, { x: 600, y: 180 }], moveSpeed: 2 },
      { x: 750, y: 220, width: 80, height: 15, type: 'bounce', bounceStrength: -25 },
      { x: 950, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 270, y: 220, type: 'star' },
      { id: 'leaf1', x: 470, y: 150, type: 'leaf', power: 'jump' },
      { id: 'heart1', x: 770, y: 190, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1050, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1200, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 40,
    requiredStars: 21
  },
  {
    id: 'clouds-2',
    worldId: 'clouds',
    name: 'Storm Rider',
    description: 'Navigate through stormy weather',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 120, height: 50, type: 'solid' },
      { x: 220, y: 280, width: 60, height: 15, type: 'moving', movePath: [{ x: 220, y: 280 }, { x: 380, y: 280 }], moveSpeed: 3 },
      { x: 500, y: 200, width: 60, height: 15, type: 'breakable', durability: 1 },
      { x: 700, y: 150, width: 60, height: 15, type: 'bounce', bounceStrength: -28 },
      { x: 900, y: 100, width: 80, height: 20, type: 'moving', movePath: [{ x: 900, y: 100 }, { x: 900, y: 200 }], moveSpeed: 2.5 },
      { x: 1150, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'leaf1', x: 240, y: 250, type: 'leaf', power: 'speed' },
      { id: 'star1', x: 520, y: 170, type: 'star' },
      { id: 'star2', x: 720, y: 120, type: 'star' },
      { id: 'heart1', x: 920, y: 70, type: 'heart' }
    ],
    obstacles: [],
    goal: { x: 1250, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1400, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 60,
    requiredStars: 24
  },
  {
    id: 'clouds-3',
    worldId: 'clouds',
    name: 'Heaven\'s Gate',
    description: 'Reach the highest peaks of the sky',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 100, height: 50, type: 'solid' },
      { x: 200, y: 300, width: 60, height: 15, type: 'bounce', bounceStrength: -25 },
      { x: 400, y: 240, width: 60, height: 15, type: 'bounce', bounceStrength: -30 },
      { x: 600, y: 180, width: 60, height: 15, type: 'bounce', bounceStrength: -35 },
      { x: 800, y: 120, width: 60, height: 15, type: 'bounce', bounceStrength: -35 },
      { x: 1000, y: 60, width: 80, height: 20, type: 'moving', movePath: [{ x: 1000, y: 60 }, { x: 1150, y: 60 }], moveSpeed: 2 },
      { x: 1300, y: 20, width: 100, height: 20, type: 'solid' },
      { x: 1550, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 220, y: 270, type: 'star' },
      { id: 'star2', x: 420, y: 210, type: 'star' },
      { id: 'star3', x: 620, y: 150, type: 'star' },
      { id: 'leaf1', x: 820, y: 90, type: 'leaf', power: 'wisdom' },
      { id: 'heart1', x: 1020, y: 30, type: 'heart' },
      { id: 'star4', x: 1320, y: -10, type: 'star' }
    ],
    obstacles: [],
    goal: { x: 1650, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1800, minY: -50, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 90,
    requiredStars: 27
  },
  {
    id: 'clouds-4',
    worldId: 'clouds',
    name: 'Lightning Dancer',
    description: 'Dance through the lightning bolts in the storm clouds',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 80, height: 50, type: 'solid' },
      { x: 150, y: 300, width: 50, height: 15, type: 'moving', movePath: [{ x: 150, y: 300 }, { x: 280, y: 200 }], moveSpeed: 3.5 },
      { x: 350, y: 180, width: 40, height: 15, type: 'bounce', bounceStrength: -32 },
      { x: 480, y: 240, width: 60, height: 15, type: 'moving', movePath: [{ x: 480, y: 240 }, { x: 620, y: 120 }], moveSpeed: 2.8 },
      { x: 700, y: 160, width: 50, height: 15, type: 'breakable', durability: 1 },
      { x: 850, y: 100, width: 60, height: 15, type: 'bounce', bounceStrength: -38 },
      { x: 1000, y: 50, width: 80, height: 15, type: 'moving', movePath: [{ x: 1000, y: 50 }, { x: 1150, y: 80 }], moveSpeed: 3 },
      { x: 1300, y: 120, width: 100, height: 20, type: 'solid' },
      { x: 1550, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 170, y: 270, type: 'star' },
      { id: 'leaf1', x: 370, y: 150, type: 'leaf', power: 'speed' },
      { id: 'star2', x: 500, y: 210, type: 'star' },
      { id: 'star3', x: 720, y: 130, type: 'star' },
      { id: 'star4', x: 870, y: 70, type: 'star' },
      { id: 'heart1', x: 1020, y: 20, type: 'heart' },
      { id: 'star5', x: 1320, y: 90, type: 'star' }
    ],
    obstacles: [],
    goal: { x: 1650, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1800, minY: 0, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 105,
    requiredStars: 30
  },
  {
    id: 'clouds-5',
    worldId: 'clouds',
    name: 'Celestial Summit',
    description: 'Reach the very top of the sky realm where stars are born',
    startPosition: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
    platforms: [
      { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 60, height: 50, type: 'solid' },
      { x: 120, y: 320, width: 40, height: 15, type: 'bounce', bounceStrength: -30 },
      { x: 220, y: 280, width: 50, height: 15, type: 'moving', movePath: [{ x: 220, y: 280 }, { x: 350, y: 220 }], moveSpeed: 2.5 },
      { x: 420, y: 200, width: 40, height: 15, type: 'bounce', bounceStrength: -35 },
      { x: 540, y: 160, width: 50, height: 15, type: 'moving', movePath: [{ x: 540, y: 160 }, { x: 660, y: 100 }], moveSpeed: 3 },
      { x: 730, y: 80, width: 40, height: 15, type: 'bounce', bounceStrength: -40 },
      { x: 850, y: 40, width: 50, height: 15, type: 'moving', movePath: [{ x: 850, y: 40 }, { x: 980, y: 20 }], moveSpeed: 2.2 },
      { x: 1050, y: 0, width: 60, height: 15, type: 'bounce', bounceStrength: -45 },
      { x: 1200, y: -20, width: 80, height: 20, type: 'solid' },
      { x: 1400, y: 60, width: 100, height: 20, type: 'moving', movePath: [{ x: 1400, y: 60 }, { x: 1550, y: 60 }], moveSpeed: 2.8 },
      { x: 1700, y: GAME_CONSTANTS.GROUND_Y, width: 200, height: 50, type: 'solid' }
    ],
    collectibles: [
      { id: 'star1', x: 140, y: 290, type: 'star' },
      { id: 'star2', x: 240, y: 250, type: 'star' },
      { id: 'leaf1', x: 440, y: 170, type: 'leaf', power: 'jump' },
      { id: 'star3', x: 560, y: 130, type: 'star' },
      { id: 'star4', x: 750, y: 50, type: 'star' },
      { id: 'star5', x: 870, y: 10, type: 'star' },
      { id: 'heart1', x: 1070, y: -30, type: 'heart' },
      { id: 'star6', x: 1220, y: -50, type: 'star' },
      { id: 'leaf2', x: 1420, y: 30, type: 'leaf', power: 'wisdom' }
    ],
    obstacles: [],
    goal: { x: 1800, y: GAME_CONSTANTS.GROUND_Y - 80, width: 60, height: 80 },
    bounds: { minX: 0, maxX: 1950, minY: -80, maxY: GAME_CONSTANTS.CANVAS_HEIGHT },
    targetTime: 180,
    requiredStars: 33
  }
];

export const worldsData: WorldData[] = [
  {
    id: 'savanna',
    name: 'Afrikansk Savann',
    description: 'Gimbos hem i den gyllene savannen',
    theme: 'savanna',
    levels: savannaLevels,
    unlocked: true,
    completed: false,
    totalStars: 0
  },
  {
    id: 'jungle',
    name: 'Regnskogens Djungel',
    description: 'Täta träd och mystiska stigar',
    theme: 'jungle',
    levels: jungleLevels,
    unlocked: false,
    completed: false,
    totalStars: 0
  },
  {
    id: 'desert',
    name: 'Saharas Öken',
    description: 'Heta sanddyner och glittrande oaser',
    theme: 'desert',
    levels: desertLevels,
    unlocked: false,
    completed: false,
    totalStars: 0
  },
  {
    id: 'clouds',
    name: 'Himlens Moln',
    description: 'Flyt bland molnen högt över jorden',
    theme: 'clouds',
    levels: cloudsLevels,
    unlocked: false,
    completed: false,
    totalStars: 0
  }
];

export const getLevelById = (levelId: string): LevelData | undefined => {
  for (const world of worldsData) {
    const level = world.levels.find(l => l.id === levelId);
    if (level) return level;
  }
  return undefined;
};

export const getWorldById = (worldId: string): WorldData | undefined => {
  return worldsData.find(w => w.id === worldId);
};