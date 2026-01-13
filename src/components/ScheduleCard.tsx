import { Clock, MapPin } from 'lucide-react';
import type { Match } from '@/data/sportsData';

interface ScheduleCardProps {
  match: Match;
}

export function ScheduleCard({ match }: ScheduleCardProps) {
  const categoryStyles = {
    team: 'border-l-primary',
    individual: 'border-l-sport-green',
    minor: 'border-l-accent',
  };

  const categoryBadgeStyles = {
    team: 'bg-primary/10 text-primary',
    individual: 'bg-sport-green/10 text-sport-green',
    minor: 'bg-accent/10 text-accent',
  };

  const isFinal = match.matchName.toLowerCase().includes('final');

  return (
    <div
      className={`bg-card rounded-lg p-4 border-l-4 ${categoryStyles[match.sportCategory]} shadow-sm hover:shadow-md transition-shadow ${
        isFinal ? 'ring-2 ring-accent ring-offset-2' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryBadgeStyles[match.sportCategory]}`}>
              {match.sport}
            </span>
            {isFinal && (
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent text-accent-foreground">
                🏆 FINAL
              </span>
            )}
          </div>
          <h4 className="font-semibold text-foreground">{match.matchName}</h4>
        </div>
        <div className="text-right text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{match.time}</span>
          </div>
          {match.venue && (
            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{match.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
