import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star, Euro } from "lucide-react";

const Services = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const professionals = [
    {
      id: 1,
      name: "Dr. Sarah Martin",
      type: "Psychologue",
      specialty: "Relations parent-enfant",
      rating: 4.9,
      reviews: 45,
      price: "Gratuit",
      priceType: "free",
      location: "Paris 15ème",
      availability: "Disponible cette semaine",
      nextSlot: "Demain 14h30",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Julie Dubois",
      type: "Coach parental",
      specialty: "Gestion des émotions",
      rating: 4.8,
      reviews: 32,
      price: "35€",
      priceType: "paid",
      location: "En ligne",
      availability: "Disponible aujourd'hui",
      nextSlot: "Aujourd'hui 16h00",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Marc Leclerc",
      type: "Assistant éducatif",
      specialty: "Troubles du comportement",
      rating: 4.7,
      reviews: 28,
      price: "25€",
      priceType: "paid",
      location: "Lyon",
      availability: "Disponible la semaine prochaine",
      nextSlot: "Lundi 10h00",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Dr. Marie Rousseau",
      type: "Psychologue",
      specialty: "Développement de l'enfant",
      rating: 5.0,
      reviews: 67,
      price: "Gratuit",
      priceType: "free",
      location: "Marseille",
      availability: "Disponible cette semaine",
      nextSlot: "Vendredi 11h15",
      image: "/placeholder.svg",
    },
  ];

  const filteredProfessionals = professionals.filter((prof) => {
    const typeMatch = selectedType === "all" || prof.type.toLowerCase().includes(selectedType);
    const priceMatch = selectedPrice === "all" || prof.priceType === selectedPrice;
    return typeMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Trouver un accompagnement
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos professionnels qualifiés et réservez votre accompagnement
            personnalisé selon vos besoins.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrer les accompagnements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Rechercher</Label>
                <Input
                  id="search"
                  placeholder="Nom, spécialité..."
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Type de professionnel</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="psychologue">Psychologue</SelectItem>
                    <SelectItem value="coach">Coach parental</SelectItem>
                    <SelectItem value="assistant">Assistant éducatif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tarification</Label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un tarif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les tarifs</SelectItem>
                    <SelectItem value="free">Gratuit</SelectItem>
                    <SelectItem value="paid">Payant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-accent-foreground">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{professional.name}</h3>
                      <p className="text-primary font-medium">{professional.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {professional.specialty}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={professional.priceType === 'free' ? 'secondary' : 'default'}
                    className="flex items-center space-x-1"
                  >
                    <Euro className="w-3 h-3" />
                    <span>{professional.price}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{professional.rating} ({professional.reviews} avis)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{professional.location}</span>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">{professional.availability}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Prochain créneau: {professional.nextSlot}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    Réserver maintenant
                  </Button>
                  <Button variant="outline">
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Aucun professionnel ne correspond à vos critères de recherche.
            </p>
            <Button
              onClick={() => {
                setSelectedType("all");
                setSelectedPrice("all");
              }}
              variant="outline"
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Information Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Comment ça marche ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choisissez votre professionnel</h3>
                <p className="text-sm text-muted-foreground">
                  Parcourez les profils et sélectionnez le professionnel qui correspond à vos besoins.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Réservez votre créneau</h3>
                <p className="text-sm text-muted-foreground">
                  Créez votre compte et réservez directement en ligne selon les disponibilités.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Commencez votre accompagnement</h3>
                <p className="text-sm text-muted-foreground">
                  Participez à votre séance en ligne ou en présentiel selon vos préférences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;