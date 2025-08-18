import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Calendar, Clock, User, Tag, Search, Filter } from "lucide-react";
import { useBlogPosts, useTags } from "@/hooks/useBlog";
import { useNavigate } from "react-router-dom";
import { BlogFilters } from "@/types/blog";
import { getArticleCategory, getArticleAuthor, getArticleDate, getArticleReadTime } from "@/utils/blogHelpers";

const Blog = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BlogFilters>({
    search: "",
    tag: "",
    page: 1,
    limit: 10,
  });

  const { posts, loading, error } = useBlogPosts(filters);
  const { tags } = useTags();

  const mockArticles = [
    {
      id: 1,
      title: "Comment gérer les crises de colère de votre enfant",
      excerpt: "Des stratégies pratiques pour accompagner votre enfant lors des moments difficiles et l'aider à exprimer ses émotions de manière constructive.",
      author: "Dr. Sarah Martin",
      date: "15 novembre 2024",
      readTime: "5 min",
      category: "Gestion des émotions",
      image: "/placeholder.svg",
      featured: true,
    },
    {
      id: 2,
      title: "L'importance de la routine dans le développement de l'enfant",
      excerpt: "Découvrez pourquoi établir des routines stables aide votre enfant à se sentir en sécurité et à mieux se développer.",
      author: "Julie Dubois",
      date: "12 novembre 2024",
      readTime: "7 min",
      category: "Développement",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      id: 3,
      title: "Communication positive : 10 phrases à adopter",
      excerpt: "Transformez votre façon de communiquer avec votre enfant grâce à ces phrases bienveillantes qui renforcent la confiance.",
      author: "Marc Leclerc",
      date: "8 novembre 2024",
      readTime: "4 min",
      category: "Communication",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      id: 4,
      title: "Gérer les écrans : trouver le bon équilibre",
      excerpt: "Conseils pratiques pour établir une relation saine avec les écrans et protéger le développement de votre enfant.",
      author: "Dr. Marie Rousseau",
      date: "5 novembre 2024",
      readTime: "6 min",
      category: "Éducation numérique",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      id: 5,
      title: "Les bienfaits du jeu libre pour l'enfant",
      excerpt: "Pourquoi laisser votre enfant jouer librement est essentiel pour son développement créatif et émotionnel.",
      author: "Sophie Laurent",
      date: "2 novembre 2024",
      readTime: "5 min",
      category: "Développement",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      id: 6,
      title: "Préparer son enfant à l'arrivée d'un petit frère ou d'une petite sœur",
      excerpt: "Guide complet pour accompagner votre enfant dans cette transition importante de sa vie familiale.",
      author: "Dr. Sarah Martin",
      date: "30 octobre 2024",
      readTime: "8 min",
      category: "Fratrie",
      image: "/placeholder.svg",
      featured: false,
    },
  ];

  // Use real data if available, otherwise fall back to mock data
  const displayArticles = posts?.items || mockArticles;
  const displayTags = tags.length > 0 ? tags : [];

  const handleReadArticle = (slug?: string) => {
    if (slug) {
      navigate(`/blog/${slug}`);
    }
  };

  const categories = [
    "Toutes les catégories",
    "Gestion des émotions",
    "Développement",
    "Communication",
    "Éducation numérique",
    "Fratrie",
  ];

  const resources = [
    {
      title: "Guide de la communication bienveillante",
      type: "PDF",
      description: "Un guide complet avec des outils pratiques pour améliorer la communication parent-enfant.",
    },
    {
      title: "Webinaire : Gérer les émotions difficiles",
      type: "Vidéo",
      description: "Enregistrement de notre webinaire sur l'accompagnement des émotions intenses chez l'enfant.",
    },
    {
      title: "Podcast : Paroles de parents",
      type: "Audio",
      description: "Série de témoignages et conseils d'experts pour accompagner les défis du quotidien parental.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ressources et conseils
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos articles, guides et ressources pour vous accompagner
            dans votre parcours parental au quotidien.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Rechercher un article..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={index === 0 ? "all" : category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Trier par</Label>
                <Select defaultValue="recent">
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récent</SelectItem>
                    <SelectItem value="popular">Plus populaire</SelectItem>
                    <SelectItem value="alphabetical">Alphabétique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {displayArticles
              .filter(article => article.featured)
              .map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="aspect-video bg-accent"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge>{getArticleCategory(article)}</Badge>
                      <Badge variant="secondary">Article vedette</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{getArticleAuthor(article)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{getArticleDate(article)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{getArticleReadTime(article)}</span>
                        </div>
                      </div>
                      <Button>Lire l'article</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {/* Regular Articles */}
            <div className="grid gap-6">
              {displayArticles
                .filter(article => !article.featured)
                .map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="aspect-video md:aspect-square bg-accent rounded-lg"></div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline">{getArticleCategory(article)}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                             <span>{getArticleAuthor(article)}</span>
                             <span>•</span>
                             <span>{getArticleDate(article)}</span>
                             <span>•</span>
                             <span>{getArticleReadTime(article)}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Lire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Recevez nos derniers conseils et articles directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Votre adresse email" type="email" />
                  <Button className="w-full">S'abonner</Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Catégories populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Autres ressources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Voir toutes les ressources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;