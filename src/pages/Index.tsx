import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen, Settings } from "lucide-react";
import gimboHero from "@/assets/gimbo-hero.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-savanna flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-6 text-center z-10">
        {/* Hero Section */}
        <div className="mb-8 animate-bounce">
          <img 
            src={gimboHero} 
            alt="Gimbo the Giraffe" 
            className="w-64 h-48 mx-auto mb-6 object-contain drop-shadow-2xl"
          />
        </div>

        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4 drop-shadow-lg">
            Gimbo's
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-secondary mb-6 drop-shadow-lg">
            Äventyr
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Följ med Gimbo giraffen på ett magiskt äventyr genom savannen, djungeln och molnen! 
            Använd hans långa hals för att lösa pussel och upptäck hemliga skatter.
          </p>
        </div>

        {/* Main Menu Cards */}
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-0 shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <Play className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-4">Starta Spelet</h3>
            <p className="text-muted-foreground mb-6">Börja ditt äventyr med Gimbo</p>
            <Button 
              onClick={() => navigate("/level-select")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-soft hover:shadow-glow transition-all duration-300"
            >
              Välj Nivå
            </Button>
          </Card>

          <Card className="p-8 bg-card/90 backdrop-blur-sm border-0 shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <BookOpen className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-4">Historien</h3>
            <p className="text-muted-foreground mb-6">Lär dig om Gimbos magiska värld</p>
            <Button 
              variant="outline"
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-lg py-6 rounded-xl transition-all duration-300"
            >
              Läs Mer
            </Button>
          </Card>

          <Card className="p-8 bg-card/90 backdrop-blur-sm border-0 shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <Settings className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-accent mb-4">Inställningar</h3>
            <p className="text-muted-foreground mb-6">Anpassa din spelupplevelse</p>
            <Button 
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg py-6 rounded-xl transition-all duration-300"
            >
              Inställningar
            </Button>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-foreground/60">
          <p className="text-lg">Ett magiskt plattformsspel för hela familjen</p>
        </div>
      </div>
    </div>
  );
};

export default Index;