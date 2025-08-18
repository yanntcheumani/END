import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Users, Heart, Shield, Clock, Award } from "lucide-react";

const Home = () => {
  const testimonials = [
    {
      name: "Marie L.",
      text: "Grâce à l'accompagnement reçu, j'ai retrouvé confiance en mes capacités de maman. L'équipe est formidable !",
      rating: 5,
    },
    {
      name: "Pierre M.",
      text: "Les conseils du psychologue nous ont aidés à mieux comprendre notre fils. Un service précieux.",
      rating: 5,
    },
    {
      name: "Sophie D.",
      text: "L'association nous a accompagnés dans un moment difficile. Merci pour votre écoute et vos conseils.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Professionnels qualifiés",
      description: "Psychologues, coachs de vie et assistants spécialisés pour enfants",
    },
    {
      icon: Heart,
      title: "Accompagnement personnalisé",
      description: "Chaque famille est unique, notre approche s'adapte à vos besoins",
    },
    {
      icon: Shield,
      title: "Environnement bienveillant",
      description: "Un cadre sécurisé et chaleureux pour vous et vos enfants",
    },
    {
      icon: Clock,
      title: "Créneaux flexibles",
      description: "Horaires adaptés aux contraintes des familles",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/20 to-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ensemble Nous Devenons
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Accompagner les parents pour mieux éduquer leurs enfants avec des
              professionnels qualifiés dans un environnement bienveillant et
              chaleureux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/services">Trouver un accompagnement</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre mission est de vous accompagner dans votre rôle de parent
              avec empathie et professionnalisme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nos accompagnements
            </h2>
            <p className="text-lg text-muted-foreground">
              Des professionnels à votre écoute pour vous accompagner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Consultation psychologique
                </h3>
                <p className="text-muted-foreground mb-4">
                  Accompagnement par des psychologues spécialisés dans les
                  relations parent-enfant.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    À partir de gratuit
                  </span>
                  <Button variant="outline" size="sm">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Coaching parental</h3>
                <p className="text-muted-foreground mb-4">
                  Coaching personnalisé pour développer vos compétences
                  parentales.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    À partir de 30€
                  </span>
                  <Button variant="outline" size="sm">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Assistance éducative
                </h3>
                <p className="text-muted-foreground mb-4">
                  Aide pratique dans la gestion du quotidien avec vos enfants.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    À partir de 25€
                  </span>
                  <Button variant="outline" size="sm">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Témoignages de parents
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez l'expérience des familles que nous accompagnons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Prêt à commencer votre accompagnement ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Rejoignez les nombreuses familles qui nous font confiance pour les
            accompagner dans leur parcours parental.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="text-lg px-8"
            >
              <Link to="/services">Commencer maintenant</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;