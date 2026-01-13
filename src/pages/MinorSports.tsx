import { useSportsByCategory } from '@/hooks/useSportsData';
import { SportCard } from '@/components/SportCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function MinorSports() {
  const { data: sports, isLoading } = useSportsByCategory('minor');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Schedule Only
          </div>
          <h1 className="section-title">MINOR SPORTS</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Fun events that bring everyone together. Check out the schedules for these exciting activities.
          </p>
        </div>

        {/* Sports Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports?.map((sport) => (
              <SportCard key={sport.id} sport={sport} basePath="/minor-sports" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
