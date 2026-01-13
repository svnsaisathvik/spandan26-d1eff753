import { useSportsByCategory } from '@/hooks/useSportsData';
import { SportCard } from '@/components/SportCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function TeamSports() {
  const { data: sports, isLoading } = useSportsByCategory('team');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            With Points Table & Live Stream
          </div>
          <h1 className="section-title">TEAM SPORTS</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Compete as a team, win as a team. Each sport features group-wise points tables and live streaming.
          </p>
        </div>

        {/* Sports Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports?.map((sport) => (
              <SportCard key={sport.id} sport={sport} basePath="/team-sports" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
