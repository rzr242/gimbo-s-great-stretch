import { LevelGoal as LevelGoalType } from '@/types/game';

interface LevelGoalProps {
  goal: LevelGoalType;
  cameraX: number;
}

export const LevelGoal = ({ goal, cameraX }: LevelGoalProps) => {
  const screenX = goal.x - cameraX;
  
  return (
    <g>
      {/* Goal base */}
      <rect
        x={screenX}
        y={goal.y}
        width={goal.width}
        height={goal.height}
        fill="url(#goalGradient)"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        rx="8"
        className="animate-pulse"
      />
      
      {/* Goal flag */}
      <polygon
        points={`${screenX + 10},${goal.y + 10} ${screenX + 40},${goal.y + 20} ${screenX + 10},${goal.y + 30}`}
        fill="hsl(var(--accent))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      
      {/* Goal pole */}
      <line
        x1={screenX + 10}
        y1={goal.y + 10}
        x2={screenX + 10}
        y2={goal.y + goal.height - 10}
        stroke="hsl(var(--primary))"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Success message */}
      {goal.reached && (
        <text
          x={screenX + goal.width / 2}
          y={goal.y - 20}
          textAnchor="middle"
          fontSize="16"
          fill="hsl(var(--primary))"
          fontWeight="bold"
          className="animate-bounce"
        >
          🎉 Bra Jobbat! 🎉
        </text>
      )}
      
      {/* Sparkling effect */}
      <circle
        cx={screenX + goal.width / 2}
        cy={goal.y + 15}
        r="3"
        fill="white"
        opacity="0.8"
        className="animate-ping"
      />
      <circle
        cx={screenX + goal.width - 10}
        cy={goal.y + 25}
        r="2"
        fill="white"
        opacity="0.6"
        className="animate-ping"
        style={{ animationDelay: '0.5s' }}
      />
    </g>
  );
};