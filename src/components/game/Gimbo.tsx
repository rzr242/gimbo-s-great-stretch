import { Gimbo as GimboType } from '@/types/game';

interface GimboProps {
  gimbo: GimboType;
  cameraX: number;
}

export const Gimbo = ({ gimbo, cameraX }: GimboProps) => {
  const screenX = gimbo.position.x - cameraX;
  const neckHeight = gimbo.neckLength;

  return (
    <g>
      {/* Gimbo's body */}
      <ellipse
        cx={screenX + gimbo.width / 2}
        cy={gimbo.position.y + gimbo.height - 15}
        rx={gimbo.width / 2}
        ry={15}
        fill="hsl(var(--accent))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      
      {/* Gimbo's neck */}
      <rect
        x={screenX + gimbo.width / 2 - 5}
        y={gimbo.position.y + 10 - neckHeight}
        width={10}
        height={30 + neckHeight}
        fill="hsl(var(--accent))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        rx="5"
      />
      
      {/* Gimbo's head */}
      <ellipse
        cx={screenX + gimbo.width / 2}
        cy={gimbo.position.y + 10 - neckHeight}
        rx={12}
        ry={15}
        fill="hsl(var(--accent))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      
      {/* Eyes */}
      <circle
        cx={screenX + gimbo.width / 2 - 4}
        cy={gimbo.position.y + 5 - neckHeight}
        r="2"
        fill="black"
      />
      <circle
        cx={screenX + gimbo.width / 2 + 4}
        cy={gimbo.position.y + 5 - neckHeight}
        r="2"
        fill="black"
      />
      
      {/* Legs */}
      <line
        x1={screenX + gimbo.width / 2 - 8}
        y1={gimbo.position.y + gimbo.height - 5}
        x2={screenX + gimbo.width / 2 - 12}
        y2={gimbo.position.y + gimbo.height + 15}
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1={screenX + gimbo.width / 2 + 8}
        y1={gimbo.position.y + gimbo.height - 5}
        x2={screenX + gimbo.width / 2 + 12}
        y2={gimbo.position.y + gimbo.height + 15}
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Direction indicator */}
      {gimbo.facingDirection === 'right' ? (
        <polygon
          points={`${screenX + gimbo.width / 2 + 8},${gimbo.position.y + 8 - neckHeight} ${screenX + gimbo.width / 2 + 12},${gimbo.position.y + 10 - neckHeight} ${screenX + gimbo.width / 2 + 8},${gimbo.position.y + 12 - neckHeight}`}
          fill="hsl(var(--primary))"
        />
      ) : (
        <polygon
          points={`${screenX + gimbo.width / 2 - 8},${gimbo.position.y + 8 - neckHeight} ${screenX + gimbo.width / 2 - 12},${gimbo.position.y + 10 - neckHeight} ${screenX + gimbo.width / 2 - 8},${gimbo.position.y + 12 - neckHeight}`}
          fill="hsl(var(--primary))"
        />
      )}
      
      {/* Stretching indicator */}
      {gimbo.isStretching && (
        <text
          x={screenX + gimbo.width / 2}
          y={gimbo.position.y - 10 - neckHeight}
          textAnchor="middle"
          fontSize="12"
          fill="hsl(var(--primary))"
          fontWeight="bold"
        >
          ⬆️
        </text>
      )}
    </g>
  );
};