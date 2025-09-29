import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Lock } from "lucide-react";
import worldSavanna from "@/assets/world-savanna.png";
import worldJungle from "@/assets/world-jungle.png";
import worldDesert from "@/assets/world-desert.png";
import worldClouds from "@/assets/world-clouds.png";

interface World {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  completed: boolean;
  stars: number;
  totalStars: number;
  gradient: string;
}

const worlds: World[] = [
  {
    id: "savanna",
    name: "Savannen",
    description: "Gimbos hemområde med grundläggande pussel och vänliga djur",
    image: worldSavanna,
    unlocked: true,
    completed: true,
    stars: 3,
    totalStars: 3,
    gradient: "bg-gradient-savanna"
  },
  {
    id: "jungle",
    name: "Djungeln",
    description: "Täta träd, giftiga växter och hemliga gångar väntar",
    image: worldJungle,
    unlocked: true,
    completed: false,
    stars: 1,
    totalStars: 3,
    gradient: "bg-gradient-jungle"
  },
  {
    id: "desert",
    name: "Ökenruinerna",
    description: "Gamla girafftempel med mystiska gåtor och forntida magi",
    image: worldDesert,
    unlocked: false,
    completed: false,
    stars: 0,
    totalStars: 3,
    gradient: "bg-gradient-desert"
  },
  {
    id: "clouds",
    name: "Molnlandet",
    description: "En drömlik värld där Gimbo grappler mellan flytande öar",
    image: worldClouds,
    unlocked: false,
    completed: false,
    stars: 0,
    totalStars: 3,
    gradient: "bg-gradient-clouds"
  }
];

const LevelSelect = () => {
  const navigate = useNavigate();

  // Update world unlock status based on stars
  useEffect(() => {
    const totalStars = getTotalStars();
    const updatedWorlds = worldsData.map(world => {
      const progress = getWorldProgress(world.id);
      const worldUnlocked = world.id === 'savanna' || totalStars >= (world.levels[0]?.requiredStars || 0);
      
      return {
        ...world,
        unlocked: worldUnlocked,
        completed: progress.completedLevels === world.levels.length,
        totalStars: progress.totalStars
      };
    });
    setWorlds(updatedWorlds);
  }, [getTotalStars, getWorldProgress]);

  const handleWorldSelect = (worldId: string) => {
    const world = worlds.find(w => w.id === worldId);
    if (world?.unlocked) {
      // Navigate to first level of the world
      const firstLevel = world.levels[0];
      if (firstLevel) {
        navigate(`/game/${worldId}/${firstLevel.id}`);
      }
    }
  };

  const renderStars = (stars: number, total: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-savanna p-6">
      {/* Header */}
      <div className="container mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="icon"
            className="bg-card/90 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold text-primary drop-shadow-lg">
            Välj Din Värld
          </h1>
        </div>
        
        <p className="text-lg text-foreground/80 max-w-2xl">
          Utforska Gimbos magiska världar! Varje värld har unika utmaningar och hemligheter att upptäcka.
        </p>
      </div>

      {/* World Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {worlds.map((world, index) => (
            <Card
              key={world.id}
              className={`relative overflow-hidden border-0 shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer group ${
                world.unlocked ? "hover:scale-105 hover:-translate-y-2" : "opacity-70"
              }`}
              onClick={() => handleWorldSelect(world)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 ${world.gradient} opacity-20`}></div>
              
              {/* Lock overlay for locked worlds */}
              {!world.unlocked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Lock className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Låst</p>
                    <p className="text-sm opacity-80">Slutför föregående värld</p>
                  </div>
                </div>
              )}

              <div className="relative z-0 p-8">
                {/* World Image */}
                <div className="mb-6">
                  <img
                    src={world.image}
                    alt={world.name}
                    className="w-32 h-32 mx-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* World Info */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-primary mb-2 drop-shadow-md">
                    {world.name}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {world.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-muted-foreground">
                    Framsteg: {world.stars}/{world.totalStars}
                  </div>
                  {renderStars(world.stars, world.totalStars)}
                </div>

                {/* Action Button */}
                <Button
                  disabled={!world.unlocked}
                  className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${
                    world.unlocked
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-glow"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {world.unlocked ? "Spela" : "Låst"}
                </Button>
              </div>

              {/* Completion Badge */}
              {world.completed && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-soft">
                  ✓ Klar
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Back to Menu */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="bg-card/90 backdrop-blur-sm border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg rounded-xl"
          >
            Tillbaka till Huvudmeny
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;