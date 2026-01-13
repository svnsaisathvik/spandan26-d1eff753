import { Video } from 'lucide-react';

interface LiveStreamProps {
  url: string;
  title: string;
}

export function LiveStream({ url, title }: LiveStreamProps) {
  // Extract video ID if it's a YouTube URL
  const getEmbedUrl = (inputUrl: string) => {
    if (inputUrl.includes('youtube.com/embed/')) {
      return inputUrl;
    }
    if (inputUrl.includes('youtube.com/watch?v=')) {
      const videoId = inputUrl.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (inputUrl.includes('youtu.be/')) {
      const videoId = inputUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return inputUrl;
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm">
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <Video className="w-5 h-5 text-primary-foreground" />
        <h4 className="font-semibold text-primary-foreground">Live Stream</h4>
        <span className="live-badge ml-auto">
          <span className="w-2 h-2 bg-current rounded-full" />
          LIVE
        </span>
      </div>
      <div className="aspect-video">
        <iframe
          src={getEmbedUrl(url)}
          title={`${title} Live Stream`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
