import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Lightbulb } from "lucide-react";

const Donate = () => {
  const impacts = [
    {
      icon: Users,
      title: "Accompagnements gratuits",
      description: "Offrir des consultations gratuites aux familles en difficulté",
    },
    {
      icon: BookOpen,
      title: "Ressources éducatives",
      description: "Créer et partager du contenu pédagogique accessible à tous",
    },
    {
      icon: Lightbulb,
      title: "Formation des professionnels",
      description: "Former nos intervenants aux dernières méthodes d'accompagnement",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Soutenez notre mission
          </h1>
          <p className="text-lg text-muted-foreground">
            Votre don permet d'accompagner plus de familles et de développer des ressources
            accessibles à tous les parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{impact.title}</h3>
                  <p className="text-sm text-muted-foreground">{impact.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Faire un don</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline">10€</Button>
              <Button variant="outline">25€</Button>
              <Button variant="outline">50€</Button>
            </div>
            <Button className="w-full" size="lg">
              Donner maintenant
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Paiement sécurisé - Reçu fiscal disponible
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donate;