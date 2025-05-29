
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioUrl: string;
  duration?: string;
  isOutbound?: boolean;
}

export function AudioPlayer({ audioUrl, duration = "0:00", isOutbound = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className={cn(
      "flex items-center space-x-3 p-3 rounded-2xl shadow-sm w-full max-w-[320px]",
      isOutbound 
        ? "bg-brand-500 text-white" 
        : "bg-white border border-gray-200"
    )}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Play/Pause Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className={cn(
          "h-10 w-10 rounded-full p-0 hover:scale-105 transition-transform flex-shrink-0",
          isOutbound 
            ? "bg-white/20 hover:bg-white/30 text-white" 
            : "bg-brand-500 hover:bg-brand-600 text-white"
        )}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
      </Button>

      {/* Waveform and Progress */}
      <div className="flex-1 space-y-2 min-w-0">
        {/* Waveform visualization (simplified) */}
        <div className="flex items-center space-x-1 h-6 overflow-hidden">
          {Array.from({ length: 35 }).map((_, i) => {
            const height = Math.random() * 16 + 4; // Random height between 4-20px
            const isActive = (i / 35) * 100 <= progress;
            return (
              <div
                key={i}
                className={cn(
                  "w-0.5 rounded-full transition-all duration-150 flex-shrink-0",
                  isOutbound
                    ? isActive 
                      ? "bg-white" 
                      : "bg-white/40"
                    : isActive 
                      ? "bg-brand-500" 
                      : "bg-gray-300"
                )}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>
        
        {/* Time Display */}
        <div className={cn(
          "flex justify-between text-xs",
          isOutbound ? "text-white/90" : "text-gray-500"
        )}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration) || duration}</span>
        </div>
      </div>

      {/* Download Button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0 hover:scale-105 transition-transform flex-shrink-0",
          isOutbound 
            ? "text-white/70 hover:text-white hover:bg-white/20" 
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        )}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
