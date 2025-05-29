
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Download, Play, Pause, FileText, Image as ImageIcon } from 'lucide-react';
import { MessageAttachment } from '@/types/messages';
import { cn } from '@/lib/utils';

interface MessageAttachmentProps {
  attachment: MessageAttachment;
  isOutbound?: boolean;
}

export function MessageAttachmentComponent({ attachment, isOutbound = false }: MessageAttachmentProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Simular progresso do áudio
    if (!isPlaying) {
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderAttachment = () => {
    switch (attachment.type) {
      case 'audio':
        return (
          <div className={cn(
            "flex items-center space-x-3 p-3 rounded-lg max-w-xs",
            isOutbound ? "bg-white/20" : "bg-white border"
          )}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAudio}
              className={cn(
                "h-10 w-10 rounded-full",
                isOutbound ? "text-white hover:bg-white/20" : "text-brand-600 hover:bg-brand-50"
              )}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-sm font-medium",
                  isOutbound ? "text-white" : "text-gray-900"
                )}>
                  Áudio
                </span>
                <span className={cn(
                  "text-xs",
                  isOutbound ? "text-white/70" : "text-gray-500"
                )}>
                  0:32
                </span>
              </div>
              
              <div className={cn(
                "w-full h-1 rounded-full",
                isOutbound ? "bg-white/30" : "bg-gray-200"
              )}>
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    isOutbound ? "bg-white" : "bg-brand-600"
                  )}
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="relative">
            <img
              src={attachment.thumbnail || attachment.url}
              alt={attachment.filename}
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsImageModalOpen(true)}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        );

      case 'video':
        return (
          <div className="relative max-w-xs">
            <video
              src={attachment.url}
              className="w-full rounded-lg"
              controls
              poster={attachment.thumbnail}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        );

      case 'document':
        return (
          <div className={cn(
            "flex items-center space-x-3 p-3 rounded-lg max-w-xs border",
            isOutbound ? "bg-white/20 border-white/30" : "bg-white border-gray-200"
          )}>
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              isOutbound ? "bg-white/20" : "bg-gray-100"
            )}>
              <FileText className={cn(
                "h-5 w-5",
                isOutbound ? "text-white" : "text-gray-600"
              )} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium truncate",
                isOutbound ? "text-white" : "text-gray-900"
              )}>
                {attachment.filename}
              </p>
              <p className={cn(
                "text-xs",
                isOutbound ? "text-white/70" : "text-gray-500"
              )}>
                {formatFileSize(attachment.size)}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className={cn(
                "h-8 w-8 p-0",
                isOutbound ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderAttachment()}
      
      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <img
              src={attachment.url}
              alt={attachment.filename}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="absolute top-2 right-2">
              <Button onClick={handleDownload} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
