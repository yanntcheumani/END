import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici sera implémentée la logique d'envoi du formulaire
    console.log("Formulaire soumis");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question, un besoin particulier ? Notre équipe est là pour vous accompagner
            et répondre à toutes vos interrogations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email *</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet de votre demande *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Demande d'information</SelectItem>
                        <SelectItem value="appointment">Prise de rendez-vous</SelectItem>
                        <SelectItem value="partnership">Partenariat professionnel</SelectItem>
                        <SelectItem value="technical">Support technique</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Votre message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Décrivez votre demande en détail..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@ensemblenousdevenons.fr</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-muted-foreground">01 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">
                      123 Rue de l'Accompagnement<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Horaires d'ouverture</p>
                    <p className="text-muted-foreground">
                      Lundi - Vendredi : 9h00 - 18h00<br />
                      Samedi : 9h00 - 12h00<br />
                      Dimanche : Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Comment réserver un accompagnement ?</h4>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez réserver directement en ligne via notre page "Trouver un accompagnement"
                    après avoir créé votre compte.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Les consultations sont-elles remboursées ?</h4>
                  <p className="text-sm text-muted-foreground">
                    Certaines consultations peuvent être prises en charge. Renseignez-vous auprès
                    de votre mutuelle ou contactez-nous pour plus d'informations.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Puis-je annuler un rendez-vous ?</h4>
                  <p className="text-sm text-muted-foreground">
                    Oui, vous pouvez annuler ou reporter votre rendez-vous jusqu'à 24h avant
                    la séance via votre espace personnel.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rejoignez notre équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Vous êtes psychologue, coach parental ou assistant éducatif ?
                  Rejoignez notre réseau de professionnels.
                </p>
                <Button variant="outline" className="w-full">
                  Devenir partenaire
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;