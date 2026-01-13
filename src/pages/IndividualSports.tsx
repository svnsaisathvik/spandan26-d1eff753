import { useSportsByCategory } from '@/hooks/useSportsData';
import { SportCard } from '@/components/SportCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function IndividualSports() {
  const { data: sports, isLoading } = useSportsByCategory('individual');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sport-green/10 text-sport-green text-sm font-medium mb-4">
            With Live Stream
          </div>
          <h1 className="section-title">INDIVIDUAL SPORTS</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            One-on-one battles of skill and strategy. Watch live streams and follow the schedule.
          </p>
        </div>

        {/* Sports Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports?.map((sport) => (
              <SportCard key={sport.id} sport={sport} basePath="/individual-sports" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
