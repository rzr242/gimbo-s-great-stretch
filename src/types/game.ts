export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface GameEntity {
  id: string;
  position: Position;
  velocity: Velocity;
  width: number;
  height: number;
}

export interface Gimbo extends GameEntity {
  isGrounded: boolean;
  isJumping: boolean;
  facingDirection: 'left' | 'right';
  neckLength: number;
  maxNeckLength: number;
  isStretching: boolean;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'solid' | 'moving' | 'breakable';
}

export interface Collectible {
  id: string;
  x: number;
  y: number;
  type: 'leaf' | 'star' | 'heart';
  collected: boolean;
  power?: 'speed' | 'jump' | 'wisdom';
}

export interface LevelGoal {
  x: number;
  y: number;
  width: number;
  height: number;
  reached: boolean;
}

export interface GameState {
  gimbo: Gimbo;
  platforms: Platform[];
  collectibles: Collectible[];
  levelGoal: LevelGoal;
  camera: {
    x: number;
    y: number;
  };
  gameStats: {
    leaves: number;
    hearts: number;
    stars: number;
    score: number;
  };
  isPlaying: boolean;
  isPaused: boolean;
  levelComplete: boolean;
}

export interface GameConstants {
  GRAVITY: number;
  JUMP_STRENGTH: number;
  MOVE_SPEED: number;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
  GROUND_Y: number;
}