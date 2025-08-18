import { useState } from "react";
import { useTags, useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TagManager = () => {
  const { toast } = useToast();
  const { tags, refetch } = useTags();
  const { createTag } = useBlog();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTag, setEditingTag] = useState<number | null>(null);
  const [newTag, setNewTag] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  });

  const handleCreateTag = async () => {
    if (!newTag.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du tag est requis",
        variant: "destructive",
      });
      return;
    }

    try {
      await createTag(newTag);
      setNewTag({ name: "", description: "", color: "#3b82f6" });
      setShowCreateForm(false);
      refetch();
      toast({
        title: "Tag créé",
        description: "Le tag a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le tag",
        variant: "destructive",
      });
    }
  };

  const colorOptions = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Yellow
    "#ef4444", // Red
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#f97316", // Orange
    "#84cc16", // Lime
  ];

  return (
    <div className="space-y-6">
      {/* Create Tag Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Créer un nouveau tag</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tagName">Nom du tag *</Label>
                <Input
                  id="tagName"
                  placeholder="Ex: Développement"
                  value={newTag.name}
                  onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Couleur</Label>
                <div className="flex items-center space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 ${
                        newTag.color === color ? "border-foreground" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewTag(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagDescription">Description</Label>
              <Textarea
                id="tagDescription"
                placeholder="Description du tag (optionnel)"
                value={newTag.description}
                onChange={(e) => setNewTag(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button onClick={handleCreateTag}>
                <Save className="w-4 h-4 mr-2" />
                Créer le tag
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tags existants</CardTitle>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau tag
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun tag créé pour le moment.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowCreateForm(true)}
              >
                Créer le premier tag
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: tag.color || "#3b82f6" }}
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{tag.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {tag.posts_count} article{tag.posts_count !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      {tag.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {tag.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTag(tag.id)}
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};