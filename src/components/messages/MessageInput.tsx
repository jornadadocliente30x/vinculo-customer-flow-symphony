
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScriptsModal } from './ScriptsModal';
import { 
  Send, 
  Paperclip, 
  Image, 
  FileText, 
  Video, 
  Mic, 
  MicOff, 
  Square,
  Play,
  Pause,
  FileIcon,
  X
} from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'audio') => void;
  onAttachFile: (file: File, type: 'image' | 'video' | 'document') => void;
}

export function MessageInput({ onSendMessage, onAttachFile }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isScriptsModalOpen, setIsScriptsModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'document') => {
    const file = e.target.files?.[0];
    if (file) {
      onAttachFile(file, type);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const cancelRecording = () => {
    stopRecording();
    setRecordingTime(0);
    setAudioBlob(null);
  };

  const sendAudio = () => {
    if (audioBlob) {
      // Create a File object from the blob
      const audioFile = new File([audioBlob], 'audio-message.wav', { type: 'audio/wav' });
      onAttachFile(audioFile, 'document'); // Treating audio as document for now
      
      // Reset recording state
      setRecordingTime(0);
      setAudioBlob(null);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUseScript = (scriptContent: string) => {
    setMessage(scriptContent);
  };

  if (isRecording || audioBlob) {
    return (
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">
                {isRecording ? (isPaused ? 'Gravação pausada' : 'Gravando áudio...') : 'Áudio gravado'}
              </p>
              <p className="text-xs text-red-600">{formatTime(recordingTime)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isRecording && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={isPaused ? resumeRecording : pauseRecording}
                    >
                      {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isPaused ? 'Continuar' : 'Pausar'}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={stopRecording}
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Parar gravação</TooltipContent>
                </Tooltip>
              </>
            )}

            {audioBlob && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={playAudio}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Ouvir gravação</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelRecording}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Cancelar</TooltipContent>
            </Tooltip>

            {audioBlob && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    onClick={sendAudio}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Enviar áudio</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end space-x-3">
        <div className="flex space-x-1">
          {/* File attachments */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Anexar arquivo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => imageInputRef.current?.click()}
              >
                <Image className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enviar imagem</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => videoInputRef.current?.click()}
              >
                <Video className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enviar vídeo</TooltipContent>
          </Tooltip>

          {/* Scripts Modal Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsScriptsModalOpen(true)}
              >
                <FileText className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Scripts de mensagem</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
        </div>

        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={startRecording}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Gravar áudio</TooltipContent>
          </Tooltip>

          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            size="sm"
            className="bg-gradient-brand hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'document')}
        accept=".pdf,.doc,.docx,.txt"
      />
      
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'image')}
        accept="image/*"
      />
      
      <input
        ref={videoInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'video')}
        accept="video/*"
      />

      {/* Scripts Modal */}
      <ScriptsModal
        isOpen={isScriptsModalOpen}
        onClose={() => setIsScriptsModalOpen(false)}
        onUseScript={handleUseScript}
      />
    </div>
  );
}
