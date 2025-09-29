import { Collectible } from '@/types/game';

interface CollectiblesProps {
  collectibles: Collectible[];
  cameraX: number;
}

export const Collectibles = ({ collectibles, cameraX }: CollectiblesProps) => {
  const renderCollectible = (collectible: Collectible) => {
    if (collectible.collected) return null;
    
    const screenX = collectible.x - cameraX;
    const size = 16;
    
    return (
      <g key={collectible.id}>
        {/* Glow effect */}
        <circle
          cx={screenX + 10}
          cy={collectible.y + 10}
          r={size}
          fill="hsl(var(--primary))"
          opacity="0.2"
          className="animate-pulse"
        />
        
        {/* Main collectible */}
        <circle
          cx={screenX + 10}
          cy={collectible.y + 10}
          r={size - 4}
          fill={
            collectible.type === 'leaf' ? 'hsl(var(--accent))' :
            collectible.type === 'star' ? '#FFD700' :
            collectible.type === 'heart' ? 'hsl(var(--coral))' : 'hsl(var(--primary))'
          }
          stroke="white"
          strokeWidth="2"
        />
        
        {/* Icon/Symbol */}
        <text
          x={screenX + 10}
          y={collectible.y + 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fill="white"
          fontWeight="bold"
        >
          {collectible.type === 'leaf' ? '🍃' :
           collectible.type === 'star' ? '⭐' :
           collectible.type === 'heart' ? '❤️' : '?'}
        </text>
        
        {/* Power indicator for leaves */}
        {collectible.type === 'leaf' && collectible.power && (
          <text
            x={screenX + 10}
            y={collectible.y - 5}
            textAnchor="middle"
            fontSize="8"
            fill="hsl(var(--primary))"
            fontWeight="bold"
          >
            {collectible.power === 'speed' ? 'S' :
             collectible.power === 'jump' ? 'J' :
             collectible.power === 'wisdom' ? 'W' : ''}
          </text>
        )}
      </g>
    );
  };

  return (
    <g>
      {collectibles.map(renderCollectible)}
    </g>
  );
};