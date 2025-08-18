import { useState, useEffect } from "react";
import { useBlog, useTags } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { BlogPost, BlogPostCreate } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";

interface BlogPostEditorProps {
  postId?: number | null;
  onClose: () => void;
}

export const BlogPostEditor = ({ postId, onClose }: BlogPostEditorProps) => {
  const { toast } = useToast();
  const { fetchBlogPost, createBlogPost, updateBlogPost } = useBlog();
  const { tags } = useTags();
  
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<BlogPostCreate>({
    title: "",
    content: "",
    excerpt: "",
    published: false,
    featured: false,
    image: "",
    video: "",

    tags: [],
  });

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      const existingPost = await fetchBlogPost(postId.toString());
      setPost({
        title: existingPost.title,
        content: existingPost.content,
        excerpt: existingPost.excerpt,
        published: existingPost.published,
        featured: existingPost.featured,
        image: existingPost.image || "",
        video: existingPost.video || "",
        tags: existingPost.tags.map(tag => tag.id),
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (shouldPublish?: boolean) => {
    try {
      setLoading(true);
      
      const postData = {
        ...post,
        published: shouldPublish !== undefined ? shouldPublish : post.published,
      };

      if (postId) {
        await updateBlogPost(postId, postData);
        toast({
          title: "Article mis à jour",
          description: "L'article a été mis à jour avec succès.",
        });
      } else {
        await createBlogPost(postData);
        toast({
          title: "Article créé",
          description: "L'article a été créé avec succès.",
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTagToggle = (tagId: number) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const generateExcerpt = () => {
    const words = post.content.split(' ');
    const excerpt = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
    setPost(prev => ({ ...prev, excerpt }));
  };

  if (loading && postId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {postId ? "Modifier l'article" : "Nouvel article"}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              Brouillon
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={loading}
            >
              <Eye className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenu de l'article</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    placeholder="Titre de l'article..."
                    value={post.title}
                    onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Extrait</Label>
                  <div className="flex space-x-2">
                    <Textarea
                      id="excerpt"
                      placeholder="Résumé de l'article..."
                      value={post.excerpt}
                      onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="min-h-[100px]"
                    />
                    <Button
                      variant="outline"
                      onClick={generateExcerpt}
                      type="button"
                    >
                      Auto
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenu *</Label>
                  <Textarea
                    id="content"
                    placeholder="Rédigez votre article ici..."
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    className="min-h-[400px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image de prévisualisation (URL)</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://exemple.com/image.jpg"
                    value={post.image}
                    onChange={(e) => setPost(prev => ({ ...prev, image: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Cette image sera utilisée comme miniature et dans les prévisualisations
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video">Vidéo (URL)</Label>
                  <Input
                    id="video"
                    type="url"
                    placeholder="https://exemple.com/video.mp4"
                    value={post.video}
                    onChange={(e) => {
                      const url = e.target.value;
                      // Validation basique pour accepter uniquement les URLs de vidéo
                      if (url && !url.match(/\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)(\?.*)?$/i) && url.trim() !== "") {
                        toast({
                          title: "Format non supporté",
                          description: "Veuillez utiliser une URL de vidéo valide (.mp4, .webm, .ogg, etc.)",
                          variant: "destructive",
                        });
                        return;
                      }
                      setPost(prev => ({ ...prev, video: url }));
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Formats supportés : MP4, WebM, OGG, AVI, MOV, WMV, FLV, MKV
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publication Options */}
            <Card>
              <CardHeader>
                <CardTitle>Options de publication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={post.published}
                    onCheckedChange={(checked) => setPost(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Publié</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={post.featured}
                    onCheckedChange={(checked) => setPost(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Article en vedette</Label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag.id}`}
                        checked={post.tags.includes(tag.id)}
                        onCheckedChange={() => handleTagToggle(tag.id)}
                      />
                      <Label htmlFor={`tag-${tag.id}`} className="text-sm">
                        {tag.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};