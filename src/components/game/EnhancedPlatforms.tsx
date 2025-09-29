import { LevelPlatform } from '@/types/level';
import { useEffect, useState } from 'react';

interface EnhancedPlatformsProps {
  platforms: LevelPlatform[];
  cameraX: number;
  gimboPosition?: { x: number; y: number };
  onPlatformUpdate?: (platformId: number, updates: Partial<LevelPlatform>) => void;
}

export const EnhancedPlatforms = ({ platforms, cameraX, gimboPosition, onPlatformUpdate }: EnhancedPlatformsProps) => {
  const [platformStates, setPlatformStates] = useState<Record<number, any>>({});

  // Update moving platforms
  useEffect(() => {
    const interval = setInterval(() => {
      platforms.forEach((platform, index) => {
        if (platform.type === 'moving' && platform.movePath && platform.moveSpeed) {
          const currentState = platformStates[index] || { pathIndex: 0, direction: 1, currentPos: platform.movePath[0] };
          const { pathIndex, direction } = currentState;
          const currentTarget = platform.movePath[pathIndex];
          const currentPos = currentState.currentPos || platform.movePath[0];

          // Calculate movement
          const dx = currentTarget.x - currentPos.x;
          const dy = currentTarget.y - currentPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < platform.moveSpeed) {
            // Reached target, move to next point
            let newIndex = pathIndex + direction;
            let newDirection = direction;

            if (newIndex >= platform.movePath.length) {
              newIndex = platform.movePath.length - 2;
              newDirection = -1;
            } else if (newIndex < 0) {
              newIndex = 1;
              newDirection = 1;
            }

            setPlatformStates(prev => ({
              ...prev,
              [index]: {
                pathIndex: newIndex,
                direction: newDirection,
                currentPos: platform.movePath[newIndex]
              }
            }));
          } else {
            // Move towards target
            const moveX = (dx / distance) * platform.moveSpeed;
            const moveY = (dy / distance) * platform.moveSpeed;
            const newPos = {
              x: currentPos.x + moveX,
              y: currentPos.y + moveY
            };

            setPlatformStates(prev => ({
              ...prev,
              [index]: {
                ...currentState,
                currentPos: newPos
              }
            }));
          }
        }
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [platforms, platformStates, onPlatformUpdate]);

  const renderPlatform = (platform: LevelPlatform, index: number) => {
    const state = platformStates[index];
    let renderX = platform.x;
    let renderY = platform.y;

    // Use current position for moving platforms
    if (platform.type === 'moving' && state?.currentPos) {
      renderX = state.currentPos.x;
      renderY = state.currentPos.y;
    }

    const screenX = renderX - cameraX;
    
    // Base platform styling
    let fill = "hsl(var(--muted))";
    let stroke = "hsl(var(--border))";
    let strokeWidth = "2";
    let opacity = "1";

    // Platform type specific styling
    switch (platform.type) {
      case 'moving':
        fill = "hsl(var(--secondary))";
        stroke = "hsl(var(--secondary-foreground))";
        break;
      case 'breakable':
        fill = "hsl(var(--destructive))";
        stroke = "hsl(var(--destructive-foreground))";
        opacity = "0.8";
        break;
      case 'bounce':
        fill = "hsl(var(--accent))";
        stroke = "hsl(var(--accent-foreground))";
        break;
      default:
        break;
    }

    return (
      <g key={`platform-${index}`}>
        <rect
          x={screenX}
          y={renderY}
          width={platform.width}
          height={platform.height}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={opacity}
          rx="4"
        />
        
        {/* Platform type indicators */}
        {platform.type === 'moving' && (
          <circle
            cx={screenX + platform.width / 2}
            cy={renderY + platform.height / 2}
            r="4"
            fill="white"
            opacity="0.8"
            className="animate-pulse"
          />
        )}
        
        {platform.type === 'breakable' && (
          <text
            x={screenX + platform.width / 2}
            y={renderY + platform.height / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fill="white"
            fontWeight="bold"
          >
            ⚠
          </text>
        )}
        
        {platform.type === 'bounce' && (
          <text
            x={screenX + platform.width / 2}
            y={renderY + platform.height / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fill="white"
            fontWeight="bold"
          >
            ↑
          </text>
        )}
      </g>
    );
  };

  return (
    <g>
      {platforms.map((platform, index) => renderPlatform(platform, index))}
    </g>
  );
};