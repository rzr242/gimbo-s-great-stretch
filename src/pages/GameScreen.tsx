import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Pause, Play, Heart, Star, Leaf, RotateCcw, Trophy } from 'lucide-react';
import { GameCanvas } from '@/components/game/GameCanvas';
import { getLevelById, getWorldById } from '@/data/levels';
import { useLevelProgress } from '@/hooks/useLevelProgress';

const GameScreen = () => {
  const navigate = useNavigate();
  const { worldId, levelId } = useParams();
  const [isPaused, setIsPaused] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [levelCompleteData, setLevelCompleteData] = useState<any>(null);
  const [gameStats, setGameStats] = useState({
    leaves: 0,
    hearts: 3,
    stars: 0,
    score: 0
  });
  const [currentLevel, setCurrentLevel] = useState<any>(null);
  const [currentWorld, setCurrentWorld] = useState<any>(null);
  const { updateLevelProgress } = useLevelProgress();

  // Load level and world data
  useEffect(() => {
    if (levelId) {
      const level = getLevelById(levelId);
      setCurrentLevel(level);
      
      if (level) {
        const world = getWorldById(level.worldId);
        setCurrentWorld(world);
      }
    } else if (worldId) {
      // Fallback for old routes - load first level of world
      const world = getWorldById(worldId);
      if (world && world.levels.length > 0) {
        setCurrentLevel(world.levels[0]);
        setCurrentWorld(world);
      }
    }
  }, [worldId, levelId]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleBackToLevels = () => {
    navigate('/level-select');
  };

  const handleLevelComplete = (completed: boolean, time: number, collectiblesFound: number, totalCollectibles: number) => {
    if (completed && currentLevel) {
      setLevelCompleteData({
        time,
        collectiblesFound,
        totalCollectibles,
        stars: calculateStars(time, collectiblesFound, totalCollectibles)
      });
      setIsLevelComplete(true);
      
      // Update level progress
      updateLevelProgress(currentLevel.id, {
        completed: true,
        bestTime: time,
        collectiblesFound,
        totalCollectibles
      });
    }
  };

  const calculateStars = (time: number, collectiblesFound: number, totalCollectibles: number) => {
    let stars = 1; // Base completion star
    if (currentLevel && time <= currentLevel.targetTime) stars = 2;
    if (collectiblesFound === totalCollectibles) stars = 3;
    return stars;
  };

  const getNextLevel = () => {
    if (!currentWorld || !currentLevel) return null;
    const currentIndex = currentWorld.levels.findIndex((l: any) => l.id === currentLevel.id);
    if (currentIndex >= 0 && currentIndex < currentWorld.levels.length - 1) {
      return currentWorld.levels[currentIndex + 1];
    }
    return null;
  };

  const handleNextLevel = () => {
    const nextLevel = getNextLevel();
    if (nextLevel) {
      // Close the completion modal first
      setIsLevelComplete(false);
      setLevelCompleteData(null);
      // Then navigate to next level
      navigate(`/game/${currentWorld.id}/${nextLevel.id}`);
    } else {
      // No more levels in this world, go back to level select
      navigate('/level-select');
    }
  };

  const handleReplayLevel = () => {
    // Close the completion modal
    setIsLevelComplete(false);
    setLevelCompleteData(null);
    // Refresh the page to reload the level
    window.location.reload();
  };

  // Reset completion modal when level changes
  useEffect(() => {
    setIsLevelComplete(false);
    setLevelCompleteData(null);
  }, [levelId]);

  if (!currentLevel || !currentWorld) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Laddar nivå...</h2>
          <Button onClick={handleBackToLevels}>Tillbaka till Nivåval</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${currentWorld?.theme ? `bg-gradient-${currentWorld.theme}` : 'bg-gradient-savanna'} relative overflow-hidden`}>
      {/* Game UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          {/* Left: Back and Level Info */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBackToLevels}
              variant="outline"
              size="icon"
              className="bg-card/90 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Card className="bg-card/90 backdrop-blur-sm border-0 px-4 py-2">
              <h2 className="text-lg font-bold text-primary">{currentWorld.name}</h2>
              <p className="text-sm text-muted-foreground">{currentLevel.name}</p>
            </Card>
          </div>

          {/* Center: Game Stats */}
          <div className="flex items-center gap-4">
            <Card className="bg-card/90 backdrop-blur-sm border-0 px-3 py-2 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-accent" />
              <span className="text-lg font-semibold text-foreground">{gameStats.leaves}</span>
            </Card>
            
            <Card className="bg-card/90 backdrop-blur-sm border-0 px-3 py-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-coral" />
              <span className="text-lg font-semibold text-foreground">{gameStats.hearts}</span>
            </Card>
            
            <Card className="bg-card/90 backdrop-blur-sm border-0 px-3 py-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-semibold text-foreground">{gameStats.stars}</span>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm border-0 px-3 py-2">
              <span className="text-sm text-muted-foreground">Poäng: </span>
              <span className="text-lg font-bold text-primary">{gameStats.score.toLocaleString()}</span>
            </Card>
          </div>

          {/* Right: Pause Button */}
          <Button
            onClick={handlePause}
            variant="outline"
            size="icon"
            className="bg-card/90 backdrop-blur-sm border-secondary/20 hover:bg-secondary hover:text-secondary-foreground"
          >
            <Pause className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="pt-20 h-screen">
        <GameCanvas 
          levelData={currentLevel}
          worldTheme={currentWorld.theme}
          onStatsUpdate={setGameStats}
          onLevelComplete={handleLevelComplete}
        />
      </div>

      {/* Level Complete Overlay */}
      {isLevelComplete && levelCompleteData && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
          <Card className="bg-card/95 backdrop-blur-sm border-0 p-8 text-center shadow-hover max-w-md mx-4">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-primary mb-2">Nivå Klar!</h2>
              <p className="text-lg text-muted-foreground">{currentLevel.name}</p>
            </div>

            {/* Stats */}
            <div className="bg-muted/20 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tid</p>
                  <p className="font-bold">{Math.round(levelCompleteData.time)}s</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Föremål</p>
                  <p className="font-bold">{levelCompleteData.collectiblesFound}/{levelCompleteData.totalCollectibles}</p>
                </div>
              </div>
              
              {/* Stars */}
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < levelCompleteData.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {getNextLevel() && (
                <Button
                  onClick={handleNextLevel}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Nästa Nivå
                </Button>
              )}
              
              <Button
                onClick={handleReplayLevel}
                variant="outline"
                className="w-full border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground py-3 text-lg rounded-xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Spela Om
              </Button>
              
              <Button
                onClick={handleBackToLevels}
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground py-3 text-lg rounded-xl"
              >
                Tillbaka till Nivåer
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
          <Card className="bg-card/95 backdrop-blur-sm border-0 p-8 text-center shadow-hover max-w-md mx-4">
            <h2 className="text-3xl font-bold text-primary mb-6">Pausad</h2>
            <div className="space-y-4">
              <Button
                onClick={handlePause}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg rounded-xl"
              >
                Fortsätt Spela
              </Button>
              <Button
                onClick={handleBackToLevels}
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground py-3 text-lg rounded-xl"
              >
                Tillbaka till Nivåer
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Decorative game elements */}
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
};

export default GameScreen;