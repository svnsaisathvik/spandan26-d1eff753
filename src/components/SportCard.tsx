import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Sport } from '@/data/sportsData';

interface SportCardProps {
  sport: Sport;
  basePath: string;
}

export function SportCard({ sport, basePath }: SportCardProps) {
  const categoryClass = {
    team: 'sport-card-team',
    individual: 'sport-card-individual',
    minor: 'sport-card-minor',
  }[sport.category];

  return (
    <Link to={`${basePath}/${sport.id}`} className="block">
      <div className={`sport-card ${categoryClass} group`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{sport.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {sport.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {sport.description}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
        </div>
        
        {sport.liveStreamUrl && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="live-badge">
              <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
              Live Stream Available
            </span>
          </div>
        )}
        
        {sport.groups && sport.groups.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {sport.groups.length} Group{sport.groups.length > 1 ? 's' : ''} • Points Table
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
