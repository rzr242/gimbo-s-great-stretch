import { useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameLoop } from '@/hooks/useGameLoop';
import { Gimbo } from './Gimbo';
import { Platform } from '@/types/game';

interface GameCanvasProps {
  onStatsUpdate?: (stats: any) => void;
}

export const GameCanvas = ({ onStatsUpdate }: GameCanvasProps) => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const { gameState, gameConstants, updateGimbo, startGame, pauseGame } = useGameState();
  
  useGameLoop({
    gameState,
    gameConstants,
    updateGimbo,
    onCollectItem: (itemType: string) => {
      // Handle item collection logic here
      console.log('Collected:', itemType);
    }
  });

  // Update camera to follow Gimbo
  const cameraX = Math.max(0, Math.min(
    gameState.gimbo.position.x - gameConstants.CANVAS_WIDTH / 2,
    800 // Max world width for now
  ));

  // Start game automatically when component mounts
  useEffect(() => {
    if (!gameState.isPlaying) {
      startGame();
    }
  }, [gameState.isPlaying, startGame]);

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
    <div className="relative w-full h-full bg-gradient-savanna overflow-hidden rounded-lg border-2 border-primary/20">
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
        </defs>
        
        {/* Sky with moving clouds */}
        <rect width="100%" height="150" fill="url(#clouds)" opacity="0.5" />
        
        {/* Platforms */}
        {gameState.platforms.map(renderPlatform)}
        
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
          </g>
        )}
      </svg>
      
      {/* Game controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-muted-foreground">
          Use WASD or Arrow keys to move, S/Down to stretch neck
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