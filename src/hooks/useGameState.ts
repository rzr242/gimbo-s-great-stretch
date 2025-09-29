import { useState, useCallback } from 'react';
import { GameState, Gimbo, Platform, Collectible, LevelGoal, GameConstants } from '@/types/game';

const GAME_CONSTANTS: GameConstants = {
  GRAVITY: 0.8,
  JUMP_STRENGTH: -15,
  MOVE_SPEED: 5,
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 400,
  GROUND_Y: 350
};

const createInitialGimbo = (): Gimbo => ({
  id: 'gimbo',
  position: { x: 100, y: GAME_CONSTANTS.GROUND_Y - 60 },
  velocity: { x: 0, y: 0 },
  width: 40,
  height: 60,
  isGrounded: true,
  isJumping: false,
  facingDirection: 'right',
  neckLength: 0,
  maxNeckLength: 100,
  isStretching: false
});

const createInitialPlatforms = (): Platform[] => [
  // Ground platforms
  { x: 0, y: GAME_CONSTANTS.GROUND_Y, width: 300, height: 50, type: 'solid' },
  { x: 400, y: GAME_CONSTANTS.GROUND_Y, width: 400, height: 50, type: 'solid' },
  
  // Floating platforms
  { x: 300, y: 280, width: 120, height: 20, type: 'solid' },
  { x: 500, y: 200, width: 100, height: 20, type: 'solid' },
  { x: 650, y: 150, width: 80, height: 20, type: 'solid' },
  { x: 800, y: 300, width: 100, height: 20, type: 'solid' },
  { x: 950, y: 250, width: 80, height: 20, type: 'solid' },
  { x: 1100, y: 200, width: 120, height: 20, type: 'solid' }
];

const createInitialCollectibles = (): Collectible[] => [
  { id: 'leaf1', x: 320, y: 250, type: 'leaf', collected: false, power: 'speed' },
  { id: 'leaf2', x: 520, y: 170, type: 'leaf', collected: false, power: 'jump' },
  { id: 'star1', x: 680, y: 120, type: 'star', collected: false },
  { id: 'heart1', x: 820, y: 270, type: 'heart', collected: false },
  { id: 'leaf3', x: 970, y: 220, type: 'leaf', collected: false, power: 'wisdom' },
  { id: 'star2', x: 1120, y: 170, type: 'star', collected: false }
];

const createLevelGoal = (): LevelGoal => ({
  x: 1200,
  y: GAME_CONSTANTS.GROUND_Y - 80,
  width: 60,
  height: 80,
  reached: false
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    gimbo: createInitialGimbo(),
    platforms: createInitialPlatforms(),
    collectibles: createInitialCollectibles(),
    levelGoal: createLevelGoal(),
    camera: { x: 0, y: 0 },
    gameStats: { leaves: 0, hearts: 3, stars: 0, score: 0 },
    isPlaying: false,
    isPaused: false,
    levelComplete: false
  });

  const updateGimbo = useCallback((updates: Partial<Gimbo>) => {
    setGameState(prev => ({
      ...prev,
      gimbo: { ...prev.gimbo, ...updates }
    }));
  }, []);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gimbo: createInitialGimbo(),
      collectibles: createInitialCollectibles(),
      levelGoal: createLevelGoal(),
      camera: { x: 0, y: 0 },
      gameStats: { leaves: 0, hearts: 3, stars: 0, score: 0 },
      isPlaying: false,
      isPaused: false,
      levelComplete: false
    }));
  }, []);

  return {
    gameState,
    gameConstants: GAME_CONSTANTS,
    updateGimbo,
    updateGameState,
    startGame,
    pauseGame,
    resetGame
  };
};