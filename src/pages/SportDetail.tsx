import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getSportById, getMatchesBySport, matchSchedule } from '@/data/sportsData';
import { PointsTable } from '@/components/PointsTable';
import { LiveStream } from '@/components/LiveStream';
import { ScheduleCard } from '@/components/ScheduleCard';

export default function SportDetail() {
  const { sportId } = useParams<{ sportId: string }>();
  const sport = sportId ? getSportById(sportId) : undefined;

  if (!sport) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Sport not found</h1>
          <Link to="/" className="text-accent hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Get matches for this sport
  const sportMatches = matchSchedule.filter(
    (match) =>
      match.sport.toLowerCase().replace(/\s+/g, '-') === sportId ||
      match.sport.toLowerCase() === sport.name.toLowerCase()
  );

  const backPath = {
    team: '/team-sports',
    individual: '/individual-sports',
    minor: '/minor-sports',
  }[sport.category];

  const categoryLabel = {
    team: 'Team Sports',
    individual: 'Individual Sports',
    minor: 'Minor Sports',
  }[sport.category];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {categoryLabel}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{sport.icon}</span>
            <div>
              <h1 className="section-title">{sport.name.toUpperCase()}</h1>
              <p className="text-muted-foreground">{sport.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Stream */}
            {sport.liveStreamUrl && (
              <LiveStream url={sport.liveStreamUrl} title={sport.name} />
            )}

            {/* Points Table (Team Sports Only) */}
            {sport.groups && sport.groups.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  📊 Points Table
                </h2>
                <PointsTable groups={sport.groups} />
              </div>
            )}
          </div>

          {/* Sidebar - Schedule */}
          <div>
            <div className="bg-card rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Match Schedule
              </h3>
              {sportMatches.length > 0 ? (
                <div className="space-y-3">
                  {sportMatches.map((match) => (
                    <ScheduleCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No matches scheduled yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
