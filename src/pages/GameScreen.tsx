import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pause, Leaf, Heart, Star } from "lucide-react";
import { useState } from "react";
import { GameCanvas } from "@/components/game/GameCanvas";

const GameScreen = () => {
  const navigate = useNavigate();
  const { worldId } = useParams();
  const [isPaused, setIsPaused] = useState(false);
  const [gameStats, setGameStats] = useState({
    leaves: 0,
    hearts: 3,
    stars: 0,
    score: 0
  });

  const worldNames: { [key: string]: string } = {
    savanna: "Savannen",
    jungle: "Djungeln", 
    desert: "Ökenruinerna",
    clouds: "Molnlandet"
  };

  const worldName = worldNames[worldId || ""] || "Okänd Värld";

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleBackToLevels = () => {
    navigate("/level-select");
  };

  return (
    <div className="min-h-screen bg-gradient-savanna relative overflow-hidden">
      {/* Game UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          {/* Left: Back and World Name */}
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
              <h2 className="text-xl font-bold text-primary">{worldName}</h2>
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
          onStatsUpdate={(stats) => setGameStats(stats)} 
        />
      </div>

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