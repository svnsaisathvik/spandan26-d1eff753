import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { getMatchesByDate, festDates } from '@/data/sportsData';
import { DateFilter } from '@/components/DateFilter';
import { ScheduleCard } from '@/components/ScheduleCard';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(festDates[0]);
  const matches = getMatchesByDate(selectedDate);

  // Group matches by category
  const teamMatches = matches.filter((m) => m.sportCategory === 'team');
  const individualMatches = matches.filter((m) => m.sportCategory === 'individual');
  const minorMatches = matches.filter((m) => m.sportCategory === 'minor');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            <Calendar className="w-4 h-4" />
            January 22-25, 2025
          </div>
          <h1 className="section-title">MATCH SCHEDULE</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Select a date to view all matches scheduled for that day.
          </p>
        </div>

        {/* Date Filter */}
        <div className="mb-10">
          <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        {/* Schedule Content */}
        {matches.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matches scheduled</h3>
            <p className="text-muted-foreground">
              Check back later for updates on this day's matches.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Team Sports */}
            {teamMatches.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  Team Sports
                  <span className="text-sm font-normal text-muted-foreground">
                    ({teamMatches.length} match{teamMatches.length > 1 ? 'es' : ''})
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMatches.map((match) => (
                    <ScheduleCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}

            {/* Individual Sports */}
            {individualMatches.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sport-green" />
                  Individual Sports
                  <span className="text-sm font-normal text-muted-foreground">
                    ({individualMatches.length} match{individualMatches.length > 1 ? 'es' : ''})
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {individualMatches.map((match) => (
                    <ScheduleCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}

            {/* Minor Sports */}
            {minorMatches.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  Minor Sports
                  <span className="text-sm font-normal text-muted-foreground">
                    ({minorMatches.length} match{minorMatches.length > 1 ? 'es' : ''})
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {minorMatches.map((match) => (
                    <ScheduleCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
