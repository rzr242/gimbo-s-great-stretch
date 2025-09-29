import { useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameLoop } from '@/hooks/useGameLoop';
import { Gimbo } from './Gimbo';
import { Collectibles } from './Collectibles';
import { LevelGoal } from './LevelGoal';
import { Platform } from '@/types/game';

interface GameCanvasProps {
  levelData?: any;
  worldTheme?: 'savanna' | 'jungle' | 'desert' | 'clouds';
  onStatsUpdate?: (stats: any) => void;
  onLevelComplete?: (completed: boolean, time: number, collectiblesFound: number, totalCollectibles: number) => void;
}

export const GameCanvas = ({ levelData, worldTheme = 'savanna', onStatsUpdate, onLevelComplete }: GameCanvasProps) => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const { gameState, gameConstants, updateGimbo, updateGameState, startGame, pauseGame } = useGameState();
  
  const keysPressed = useGameLoop({
    gameState,
    gameConstants,
    updateGimbo,
    updateGameState,
    onCollectItem: (collectible) => {
      console.log(`Collected ${collectible.type}:`, collectible.power || 'no power');
    }
  });

  // Update camera to follow Gimbo
  const cameraX = Math.max(0, Math.min(
    gameState.gimbo.position.x - gameConstants.CANVAS_WIDTH / 2,
    1600 - gameConstants.CANVAS_WIDTH // Extended world width
  ));

  // Update stats when they change
  useEffect(() => {
    if (onStatsUpdate) {
      onStatsUpdate(gameState.gameStats);
    }
  }, [gameState.gameStats, onStatsUpdate]);

  // Start game when component mounts
  useEffect(() => {
    if (!gameState.isPlaying) {
      startGame();
    }
  }, [gameState.isPlaying, startGame]);

  // Check for level completion
  useEffect(() => {
    if (gameState.levelComplete && onLevelComplete) {
      const completionTime = Date.now() / 1000; // Simple time calculation
      const totalCollectibles = gameState.collectibles.length;
      const collectiblesFound = gameState.collectibles.filter(c => c.collected).length;
      
      onLevelComplete(true, completionTime, collectiblesFound, totalCollectibles);
    }
  }, [gameState.levelComplete, onLevelComplete, gameState.collectibles]);

  // Get world-specific background gradient
  const getWorldBackground = () => {
    const gradients = {
      savanna: 'bg-gradient-savanna',
      jungle: 'bg-gradient-jungle', 
      desert: 'bg-gradient-desert',
      clouds: 'bg-gradient-clouds'
    };
    return gradients[worldTheme] || gradients.savanna;
  };

  const renderPlatform = (platform: Platform, index: number) => {
    const screenX = platform.x - cameraX;
    
    return (
      <g key={index}>
        <rect
          x={screenX}
          y={platform.y}
          width={platform.width}
          height={platform.height}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          rx="4"
        />
        {/* Add grass texture on top */}
        <line
          x1={screenX}
          y1={platform.y}
          x2={screenX + platform.width}
          y2={platform.y}
          stroke="hsl(var(--accent))"
          strokeWidth="3"
        />
      </g>
    );
  };

  return (
    <div className={`relative w-full h-full ${getWorldBackground()} overflow-hidden rounded-lg border-2 border-primary/20`}>
      <svg
        ref={canvasRef}
        width={gameConstants.CANVAS_WIDTH}
        height={gameConstants.CANVAS_HEIGHT}
        className="w-full h-full"
        viewBox={`0 0 ${gameConstants.CANVAS_WIDTH} ${gameConstants.CANVAS_HEIGHT}`}
      >
        {/* Background elements */}
        <defs>
          <pattern id="clouds" patternUnits="userSpaceOnUse" width="100" height="50">
            <circle cx="25" cy="25" r="15" fill="rgba(255,255,255,0.3)" />
            <circle cx="75" cy="25" r="20" fill="rgba(255,255,255,0.2)" />
          </pattern>
          <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Sky with moving clouds */}
        <rect width="100%" height="150" fill="url(#clouds)" opacity="0.5" />
        
        {/* Platforms */}
        {gameState.platforms.map(renderPlatform)}
        
        {/* Collectibles */}
        <Collectibles collectibles={gameState.collectibles} cameraX={cameraX} />
        
        {/* Level Goal */}
        <LevelGoal goal={gameState.levelGoal} cameraX={cameraX} />
        
        {/* Gimbo */}
        <Gimbo gimbo={gameState.gimbo} cameraX={cameraX} />
        
        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <g>
            <text x="10" y="20" fill="hsl(var(--foreground))" fontSize="12">
              Position: ({Math.round(gameState.gimbo.position.x)}, {Math.round(gameState.gimbo.position.y)})
            </text>
            <text x="10" y="35" fill="hsl(var(--foreground))" fontSize="12">
              Velocity: ({Math.round(gameState.gimbo.velocity.x)}, {Math.round(gameState.gimbo.velocity.y)})
            </text>
            <text x="10" y="50" fill="hsl(var(--foreground))" fontSize="12">
              Grounded: {gameState.gimbo.isGrounded ? 'Yes' : 'No'}
            </text>
            <text x="10" y="65" fill="hsl(var(--foreground))" fontSize="12">
              Neck: {Math.round(gameState.gimbo.neckLength)}px
            </text>
            <text x="10" y="80" fill="hsl(var(--foreground))" fontSize="12">
              Keys: {Array.from(keysPressed || new Set()).join(', ')}
            </text>
          </g>
        )}
      </svg>
      
      {/* Game controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-muted-foreground">
          Use WASD or Arrow keys to move • S/Down to stretch neck • Collect items and reach the flag!
        </div>
        <button
          onClick={pauseGame}
          className="bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded-lg text-sm transition-colors"
        >
          {gameState.isPaused ? '▶️' : '⏸️'}
        </button>
      </div>
    </div>
  );
};