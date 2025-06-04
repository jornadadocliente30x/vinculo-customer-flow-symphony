
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Image, Video, Music } from 'lucide-react';

interface FileUploadSectionProps {
  label: string;
  files: File[];
  onFileUpload: (files: FileList | null) => void;
  onFileRemove: (index: number) => void;
  id: string;
}

export function FileUploadSection({ 
  label, 
  files, 
  onFileUpload, 
  onFileRemove, 
  id 
}: FileUploadSectionProps) {
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <input
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          onChange={(e) => onFileUpload(e.target.files)}
          className="hidden"
          id={id}
        />
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">
            Clique para fazer upload de imagens, vídeos, áudios ou PDFs
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <Label>Arquivos Anexados:</Label>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                {getFileIcon(file)}
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFileRemove(index)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
