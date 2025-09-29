import { useEffect, useRef, useCallback } from 'react';
import { GameState, GameConstants, Collectible } from '@/types/game';

interface UseGameLoopProps {
  gameState: GameState;
  gameConstants: GameConstants;
  updateGimbo: (updates: any) => void;
  updateGameState: (updates: Partial<GameState>) => void;
  onCollectItem?: (item: Collectible) => void;
}

export const useGameLoop = ({ 
  gameState, 
  gameConstants, 
  updateGimbo,
  updateGameState,
  onCollectItem 
}: UseGameLoopProps) => {
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      keysPressed.current.add(event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      keysPressed.current.delete(event.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Collision detection
  const checkCollision = useCallback((entityA: any, entityB: any) => {
    return (
      entityA.position.x < entityB.x + entityB.width &&
      entityA.position.x + entityA.width > entityB.x &&
      entityA.position.y < entityB.y + entityB.height &&
      entityA.position.y + entityA.height > entityB.y
    );
  }, []);

  // Check collectible collisions
  const checkCollectibles = useCallback(() => {
    const gimboRect = {
      x: gameState.gimbo.position.x,
      y: gameState.gimbo.position.y,
      width: gameState.gimbo.width,
      height: gameState.gimbo.height
    };

    gameState.collectibles.forEach(collectible => {
      if (!collectible.collected) {
        const collectibleRect = {
          x: collectible.x,
          y: collectible.y,
          width: 20,
          height: 20
        };

        if (
          gimboRect.x < collectibleRect.x + collectibleRect.width &&
          gimboRect.x + gimboRect.width > collectibleRect.x &&
          gimboRect.y < collectibleRect.y + collectibleRect.height &&
          gimboRect.y + gimboRect.height > collectibleRect.y
        ) {
          // Mark as collected
          const updatedCollectibles = gameState.collectibles.map(c => 
            c.id === collectible.id ? { ...c, collected: true } : c
          );
          
          // Update stats
          const newStats = { ...gameState.gameStats };
          switch (collectible.type) {
            case 'leaf':
              newStats.leaves += 1;
              newStats.score += 10;
              break;
            case 'star':
              newStats.stars += 1;
              newStats.score += 50;
              break;
            case 'heart':
              newStats.hearts = Math.min(newStats.hearts + 1, 5);
              newStats.score += 25;
              break;
          }

          updateGameState({
            collectibles: updatedCollectibles,
            gameStats: newStats
          });

          if (onCollectItem) {
            onCollectItem(collectible);
          }
        }
      }
    });
  }, [gameState.gimbo, gameState.collectibles, gameState.gameStats, updateGameState, onCollectItem]);

  // Check level goal
  const checkLevelGoal = useCallback(() => {
    if (gameState.levelGoal.reached) return;

    const gimboRect = {
      x: gameState.gimbo.position.x,
      y: gameState.gimbo.position.y,
      width: gameState.gimbo.width,
      height: gameState.gimbo.height
    };

    if (
      gimboRect.x + gimboRect.width > gameState.levelGoal.x &&
      gimboRect.x < gameState.levelGoal.x + gameState.levelGoal.width &&
      gimboRect.y + gimboRect.height > gameState.levelGoal.y &&
      gimboRect.y < gameState.levelGoal.y + gameState.levelGoal.height
    ) {
      updateGameState({
        levelGoal: { ...gameState.levelGoal, reached: true },
        levelComplete: true
      });
    }
  }, [gameState.gimbo, gameState.levelGoal, updateGameState]);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.levelComplete) {
      return;
    }

    const gameLoop = () => {
      const { gimbo, platforms } = gameState;
      const keys = keysPressed.current;

      // Handle input
      let newVelocityX = 0;
      let newFacingDirection = gimbo.facingDirection;
      let shouldJump = false;
      let isStretching = false;

      if (keys.has('ArrowLeft') || keys.has('KeyA')) {
        newVelocityX = -gameConstants.MOVE_SPEED;
        newFacingDirection = 'left';
      }
      if (keys.has('ArrowRight') || keys.has('KeyD')) {
        newVelocityX = gameConstants.MOVE_SPEED;
        newFacingDirection = 'right';
      }
      if ((keys.has('Space') || keys.has('ArrowUp') || keys.has('KeyW')) && gimbo.isGrounded) {
        shouldJump = true;
      }
      if (keys.has('KeyS') || keys.has('ArrowDown')) {
        isStretching = true;
      }

      // Apply physics
      let newVelocityY = gimbo.velocity.y + gameConstants.GRAVITY;
      let newPositionX = gimbo.position.x + newVelocityX;
      let newPositionY = gimbo.position.y + newVelocityY;
      let newIsGrounded = false;

      if (shouldJump && gimbo.isGrounded) {
        newVelocityY = gameConstants.JUMP_STRENGTH;
        newIsGrounded = false;
        // Move Gimbo slightly up to prevent immediate re-grounding
        newPositionY = gimbo.position.y - 2;
      }

      // Check platform collisions
      const gimboNextFrame = {
        position: { x: newPositionX, y: newPositionY },
        width: gimbo.width,
        height: gimbo.height
      };

      platforms.forEach(platform => {
        if (checkCollision(gimboNextFrame, platform)) {
          // Landing on platform from above (only if falling down)
          if (gimbo.velocity.y >= 0 && gimbo.position.y + gimbo.height <= platform.y + 15) {
            newPositionY = platform.y - gimbo.height;
            newVelocityY = 0;
            newIsGrounded = true;
          }
          // Hitting platform from below (only if moving up)
          else if (gimbo.velocity.y < 0 && gimbo.position.y >= platform.y + platform.height - 15) {
            newPositionY = platform.y + platform.height;
            newVelocityY = 0;
          }
          // Hitting platform from the side
          else if (Math.abs(newVelocityX) > 0) {
            if (newVelocityX > 0) {
              newPositionX = platform.x - gimbo.width;
            } else {
              newPositionX = platform.x + platform.width;
            }
          }
        }
      });

      // Boundary checks
      if (newPositionX < 0) newPositionX = 0;
      if (newPositionX + gimbo.width > gameConstants.CANVAS_WIDTH * 2) {
        newPositionX = gameConstants.CANVAS_WIDTH * 2 - gimbo.width;
      }

      // Ground check (fallback)
      if (newPositionY + gimbo.height >= gameConstants.GROUND_Y) {
        newPositionY = gameConstants.GROUND_Y - gimbo.height;
        newVelocityY = 0;
        newIsGrounded = true;
      }

      // Don't override grounded state if we just jumped
      if (shouldJump && gimbo.isGrounded) {
        newIsGrounded = false;
      }

      // Neck stretching logic
      let newNeckLength = gimbo.neckLength;
      if (isStretching && newNeckLength < gimbo.maxNeckLength) {
        newNeckLength = Math.min(newNeckLength + 5, gimbo.maxNeckLength);
      } else if (!isStretching && newNeckLength > 0) {
        newNeckLength = Math.max(newNeckLength - 3, 0);
      }

      // Update Gimbo
      updateGimbo({
        position: { x: newPositionX, y: newPositionY },
        velocity: { x: newVelocityX, y: newVelocityY },
        isGrounded: newIsGrounded,
        isJumping: !newIsGrounded,
        facingDirection: newFacingDirection,
        neckLength: newNeckLength,
        isStretching
      });

      // Check interactions
      checkCollectibles();
      checkLevelGoal();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, gameConstants, updateGimbo, checkCollision, checkCollectibles, checkLevelGoal]);

  return keysPressed.current;
};