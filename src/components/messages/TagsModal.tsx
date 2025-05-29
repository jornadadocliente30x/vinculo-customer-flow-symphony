
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Plus, Edit, Trash2 } from 'lucide-react';
import { Tag } from '@/types/messages';
import { mockTags } from '@/data/mockConversations';

interface TagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  currentTags: Tag[];
  onUpdateTags: (tags: Tag[]) => void;
}

const tagColors = [
  { name: 'Azul', value: 'blue' as const, bg: 'bg-blue-100', text: 'text-blue-800' },
  { name: 'Verde', value: 'green' as const, bg: 'bg-green-100', text: 'text-green-800' },
  { name: 'Amarelo', value: 'yellow' as const, bg: 'bg-yellow-100', text: 'text-yellow-800' },
  { name: 'Roxo', value: 'purple' as const, bg: 'bg-purple-100', text: 'text-purple-800' },
];

export function TagsModal({ isOpen, onClose, conversationId, currentTags, onUpdateTags }: TagsModalProps) {
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState<Tag['color']>('blue');
  const [availableTags, setAvailableTags] = useState(mockTags);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editTagName, setEditTagName] = useState('');
  const [editTagColor, setEditTagColor] = useState<Tag['color']>('blue');

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: `tag_${Date.now()}`,
      name: newTagName,
      color: selectedColor,
    };

    setAvailableTags(prev => [...prev, newTag]);
    setNewTagName('');
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setEditTagName(tag.name);
    setEditTagColor(tag.color);
  };

  const handleSaveEdit = () => {
    if (!editingTag || !editTagName.trim()) return;

    const updatedTag = {
      ...editingTag,
      name: editTagName,
      color: editTagColor,
    };

    setAvailableTags(prev => 
      prev.map(tag => tag.id === editingTag.id ? updatedTag : tag)
    );

    // Atualizar também nas tags selecionadas se necessário
    if (currentTags.some(t => t.id === editingTag.id)) {
      const updatedCurrentTags = currentTags.map(tag => 
        tag.id === editingTag.id ? updatedTag : tag
      );
      onUpdateTags(updatedCurrentTags);
    }

    setEditingTag(null);
    setEditTagName('');
  };

  const handleDeleteTag = (tagId: string) => {
    if (confirm('Tem certeza que deseja excluir esta tag?')) {
      setAvailableTags(prev => prev.filter(tag => tag.id !== tagId));
      
      // Remover das tags selecionadas também
      if (currentTags.some(t => t.id === tagId)) {
        onUpdateTags(currentTags.filter(tag => tag.id !== tagId));
      }
    }
  };

  const handleToggleTag = (tag: Tag) => {
    const isSelected = currentTags.some(t => t.id === tag.id);
    if (isSelected) {
      onUpdateTags(currentTags.filter(t => t.id !== tag.id));
    } else {
      onUpdateTags([...currentTags, tag]);
    }
  };

  const getColorClasses = (color: Tag['color']) => {
    const colorConfig = tagColors.find(c => c.value === color);
    return colorConfig ? { bg: colorConfig.bg, text: colorConfig.text } : { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gerenciar Tags</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Create New Tag */}
            <div className="space-y-3">
              <Label>Criar Nova Tag</Label>
              <Input
                placeholder="Nome da tag"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
              
              <div>
                <Label className="text-sm">Cor</Label>
                <div className="flex gap-2 mt-2">
                  {tagColors.map((color) => (
                    <Tooltip key={color.value}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setSelectedColor(color.value)}
                          className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                            selectedColor === color.value ? 'border-gray-400' : 'border-transparent'
                          }`}
                          title={color.name}
                        />
                      </TooltipTrigger>
                      <TooltipContent>{color.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <Button onClick={handleCreateTag} size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Criar Tag
              </Button>
            </div>

            {/* Available Tags */}
            <div>
              <Label className="text-sm">Tags Disponíveis</Label>
              <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                {availableTags.map((tag) => {
                  const isSelected = currentTags.some(t => t.id === tag.id);
                  const colorClasses = getColorClasses(tag.color);
                  
                  return (
                    <div key={tag.id} className="flex items-center justify-between p-2 border rounded">
                      {editingTag?.id === tag.id ? (
                        <div className="flex-1 flex items-center space-x-2">
                          <Input
                            value={editTagName}
                            onChange={(e) => setEditTagName(e.target.value)}
                            className="flex-1"
                            size="sm"
                          />
                          <div className="flex gap-1">
                            {tagColors.map((color) => (
                              <button
                                key={color.value}
                                onClick={() => setEditTagColor(color.value)}
                                className={`w-6 h-6 rounded-full ${color.bg} border ${
                                  editTagColor === color.value ? 'border-gray-400' : 'border-transparent'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" onClick={handleSaveEdit}>
                              ✓
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setEditingTag(null)}
                            >
                              ✕
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToggleTag(tag)}
                            className={`${colorClasses.bg} ${colorClasses.text} px-3 py-1 rounded-full text-sm transition-all flex-1 text-left ${
                              isSelected ? 'ring-2 ring-brand-500 ring-offset-1' : 'hover:opacity-80'
                            }`}
                          >
                            {tag.name}
                          </button>
                          
                          <div className="flex space-x-1 ml-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditTag(tag)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Editar tag</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteTag(tag.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Excluir tag</TooltipContent>
                            </Tooltip>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Tags */}
            {currentTags.length > 0 && (
              <div>
                <Label className="text-sm">Tags Selecionadas</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentTags.map((tag) => {
                    const colorClasses = getColorClasses(tag.color);
                    return (
                      <Badge
                        key={tag.id}
                        className={`${colorClasses.bg} ${colorClasses.text} border-none`}
                      >
                        {tag.name}
                        <button
                          onClick={() => handleToggleTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
