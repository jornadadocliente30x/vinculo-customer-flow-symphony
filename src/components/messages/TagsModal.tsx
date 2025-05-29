
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
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

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName,
      color: selectedColor,
    };

    setAvailableTags(prev => [...prev, newTag]);
    setNewTagName('');
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
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                      selectedColor === color.value ? 'border-gray-400' : 'border-transparent'
                    }`}
                    title={color.name}
                  />
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
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map((tag) => {
                const isSelected = currentTags.some(t => t.id === tag.id);
                const colorClasses = getColorClasses(tag.color);
                
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleToggleTag(tag)}
                    className={`${colorClasses.bg} ${colorClasses.text} px-3 py-1 rounded-full text-sm transition-all ${
                      isSelected ? 'ring-2 ring-brand-500 ring-offset-1' : 'hover:opacity-80'
                    }`}
                  >
                    {tag.name}
                  </button>
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
  );
}
