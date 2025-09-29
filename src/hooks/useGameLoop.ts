import { useEffect, useRef } from 'react';
import { GameState, GameConstants } from '@/types/game';

interface UseGameLoopProps {
  gameState: GameState;
  gameConstants: GameConstants;
  updateGimbo: (updates: any) => void;
  onCollectItem?: (itemType: string) => void;
}

export const useGameLoop = ({ 
  gameState, 
  gameConstants, 
  updateGimbo,
  onCollectItem 
}: UseGameLoopProps) => {
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
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
  const checkCollision = (entityA: any, entityB: any) => {
    return (
      entityA.position.x < entityB.x + entityB.width &&
      entityA.position.x + entityA.width > entityB.x &&
      entityA.position.y < entityB.y + entityB.height &&
      entityA.position.y + entityA.height > entityB.y
    );
  };

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) {
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

      if (shouldJump) {
        newVelocityY = gameConstants.JUMP_STRENGTH;
      }

      // Check platform collisions
      const gimboNextFrame = {
        position: { x: newPositionX, y: newPositionY },
        width: gimbo.width,
        height: gimbo.height
      };

      platforms.forEach(platform => {
        if (checkCollision(gimboNextFrame, platform)) {
          // Landing on platform from above
          if (gimbo.velocity.y > 0 && gimbo.position.y + gimbo.height <= platform.y + 10) {
            newPositionY = platform.y - gimbo.height;
            newVelocityY = 0;
            newIsGrounded = true;
          }
          // Hitting platform from below
          else if (gimbo.velocity.y < 0 && gimbo.position.y >= platform.y + platform.height - 10) {
            newPositionY = platform.y + platform.height;
            newVelocityY = 0;
          }
          // Hitting platform from the side
          else if (newVelocityX !== 0) {
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
      if (newPositionX + gimbo.width > gameConstants.CANVAS_WIDTH) {
        newPositionX = gameConstants.CANVAS_WIDTH - gimbo.width;
      }

      // Ground check (fallback)
      if (newPositionY + gimbo.height > gameConstants.GROUND_Y) {
        newPositionY = gameConstants.GROUND_Y - gimbo.height;
        newVelocityY = 0;
        newIsGrounded = true;
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

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState, gameConstants, updateGimbo]);

  return keysPressed.current;
};