import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBlogPosts, useTags } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Tag as TagIcon, FileText } from "lucide-react";
import { BlogPostEditor } from "@/components/blog/BlogPostEditor";
import { TagManager } from "@/components/blog/TagManager";

const BlogAdmin = () => {
  const { isAdmin } = useAuth();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    published: "" as string,
    featured: "" as string,  
    tag: "",
  });

  const { posts, loading: postsLoading, refetch: refetchPosts } = useBlogPosts({
    search: filters.search,
    published: filters.published === "true" ? true : filters.published === "false" ? false : undefined,
    featured: filters.featured === "true" ? true : filters.featured === "false" ? false : undefined,
    tag: filters.tag || undefined,
  });
  const { tags } = useTags();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-destructive mb-2">Accès refusé</h1>
            <p className="text-muted-foreground">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreatePost = () => {
    setSelectedPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (id: number) => {
    setSelectedPost(id);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedPost(null);
    refetchPosts();
  };

  if (showEditor) {
    return (
      <BlogPostEditor
        postId={selectedPost}
        onClose={handleCloseEditor}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Administration du blog</h1>
            <p className="text-muted-foreground mt-2">
              Gérez vos articles, tags et ressources du blog.
            </p>
          </div>
          <Button onClick={handleCreatePost} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nouvel article</span>
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Articles</span>
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center space-x-2">
              <TagIcon className="w-4 h-4" />
              <span>Tags</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Rechercher</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Titre ou contenu..."
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Statut</Label>
                    {
                      filters.published && (
                        <Select value={filters.published} onValueChange={(value) => setFilters(prev => ({ ...prev, published: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tous les statuts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Tous les statuts</SelectItem>
                            <SelectItem value="true">Publié</SelectItem>
                            <SelectItem value="false">Brouillon</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    }

                  </div>

                  <div className="space-y-2">
                    <Label>En vedette</Label>
                    {
                      filters.featured && (
                        <Select value={filters.featured} onValueChange={(value) => setFilters(prev => ({ ...prev, featured: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Tous</SelectItem>
                            <SelectItem value="true">En vedette</SelectItem>
                            <SelectItem value="false">Normal</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    }

                  </div>

                  <div className="space-y-2">
                    <Label>Tag</Label>
                    {
                      filters.tag && (
                        <Select value={filters.tag} onValueChange={(value) => setFilters(prev => ({ ...prev, tag: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tous les tags" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Tous les tags</SelectItem>
                            {tags.map((tag) => (
                              <SelectItem key={tag.id} value={tag.uuid}>
                                {tag.name} - 
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                    }

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            {postsLoading ? (
              <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {posts && posts.items && (posts?.items.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {post.featured && (
                              <Badge variant="secondary">En vedette</Badge>
                            )}
                            <Badge variant={post.published ? "default" : "outline"}>
                              {post.published ? "Publié" : "Brouillon"}
                            </Badge>
                            {post.tags.map((tag) => (
                              <Badge key={tag.id} variant="outline">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Par {post.author.username}</span>
                            <span>•</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{post.read_time} min de lecture</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPost(post.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tags">
            <TagManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogAdmin;