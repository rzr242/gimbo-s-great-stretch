import { useState, useEffect, useRef } from 'react';
import { Gimbo } from '@/types/game';
import { LevelData } from '@/types/level';

interface CameraState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  shake: { x: number; y: number };
}

export const useEnhancedCamera = (gimbo: Gimbo, levelData?: LevelData, canvasWidth: number = 800) => {
  const [camera, setCamera] = useState<CameraState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    shake: { x: 0, y: 0 }
  });
  
  const shakeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Calculate target camera position to center Gimbo
    const targetX = Math.max(0, gimbo.position.x - canvasWidth / 2);
    const targetY = 0; // Keep Y camera fixed for now
    
    // Apply level bounds if available
    let boundedTargetX = targetX;
    if (levelData) {
      boundedTargetX = Math.max(levelData.bounds.minX, Math.min(targetX, levelData.bounds.maxX - canvasWidth));
    }

    setCamera(prev => ({
      ...prev,
      targetX: boundedTargetX,
      targetY
    }));
  }, [gimbo.position.x, gimbo.position.y, levelData, canvasWidth]);

  // Smooth camera following
  useEffect(() => {
    const smoothFollow = () => {
      setCamera(prev => {
        const smoothness = 0.1;
        const newX = prev.x + (prev.targetX - prev.x) * smoothness;
        const newY = prev.y + (prev.targetY - prev.y) * smoothness;
        
        return {
          ...prev,
          x: newX + prev.shake.x,
          y: newY + prev.shake.y
        };
      });
    };

    const interval = setInterval(smoothFollow, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  const shakeCamera = (intensity: number = 10, duration: number = 300) => {
    // Clear existing shake
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
    }

    const startShake = () => {
      const shakeX = (Math.random() - 0.5) * intensity;
      const shakeY = (Math.random() - 0.5) * intensity;
      
      setCamera(prev => ({
        ...prev,
        shake: { x: shakeX, y: shakeY }
      }));
    };

    // Start shaking
    const shakeInterval = setInterval(startShake, 16);
    
    // Stop shaking after duration
    shakeTimeoutRef.current = setTimeout(() => {
      clearInterval(shakeInterval);
      setCamera(prev => ({
        ...prev,
        shake: { x: 0, y: 0 }
      }));
    }, duration);
  };

  const transitionToPosition = (x: number, y: number, duration: number = 1000) => {
    const startX = camera.x;
    const startY = camera.y;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const easedProgress = easeInOutQuad(progress);
      
      const newX = startX + (x - startX) * easedProgress;
      const newY = startY + (y - startY) * easedProgress;
      
      setCamera(prev => ({
        ...prev,
        x: newX,
        y: newY,
        targetX: newX,
        targetY: newY
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return {
    camera: { x: camera.x, y: camera.y },
    shakeCamera,
    transitionToPosition
  };
};