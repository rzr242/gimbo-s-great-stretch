import { useState, useCallback } from 'react';
import { GameState, Gimbo, Platform, GameConstants } from '@/types/game';

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
  { x: 650, y: 150, width: 80, height: 20, type: 'solid' }
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    gimbo: createInitialGimbo(),
    platforms: createInitialPlatforms(),
    camera: { x: 0, y: 0 },
    gameStats: { leaves: 0, hearts: 3, stars: 0, score: 0 },
    isPlaying: false,
    isPaused: false
  });

  const updateGimbo = useCallback((updates: Partial<Gimbo>) => {
    setGameState(prev => ({
      ...prev,
      gimbo: { ...prev.gimbo, ...updates }
    }));
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
      camera: { x: 0, y: 0 },
      isPlaying: false,
      isPaused: false
    }));
  }, []);

  return {
    gameState,
    gameConstants: GAME_CONSTANTS,
    updateGimbo,
    startGame,
    pauseGame,
    resetGame
  };
};