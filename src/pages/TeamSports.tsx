import { useSportsByCategory, useGroups, useTeams, type Sport } from '@/hooks/useSportsData';
import { SportCard } from '@/components/SportCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy } from 'lucide-react';

export default function TeamSports() {
  const { data: sports, isLoading } = useSportsByCategory('team');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sports?.map((sport) => (
              <SportCard key={sport.id} sport={sport} basePath="/team-sports" />
            ))}
          </div>
        )}

        {/* Points Tables Section */}
        {!isLoading && sports && sports.length > 0 && (
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-accent" />
              <h2 className="section-title text-3xl md:text-4xl">POINTS TABLES</h2>
            </div>
            
            {sports.map((sport) => (
              <SportPointsTable key={sport.id} sport={sport} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SportPointsTable({ sport }: { sport: Sport }) {
  const { data: groups, isLoading } = useGroups(sport.id);

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl p-4 sm:p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden">
      {/* Sport Header */}
      <div className="bg-primary px-4 sm:px-6 py-4 flex items-center gap-3">
        <span className="text-2xl sm:text-3xl">{sport.icon}</span>
        <h3 className="text-lg sm:text-xl font-bold text-primary-foreground">{sport.name}</h3>
      </div>

      {/* Groups */}
      <div className="p-4 sm:p-6 space-y-6">
        {groups.map((group) => (
          <GroupTable key={group.id} groupId={group.id} groupName={group.name} sport={sport} />
        ))}
      </div>
    </div>
  );
}

function GroupTable({ groupId, groupName, sport }: { groupId: string; groupName: string; sport: Sport }) {
  const { data: teams, isLoading } = useTeams(groupId);

  if (isLoading) {
    return <Skeleton className="h-32 w-full rounded-lg" />;
  }

  if (!teams || teams.length === 0) {
    return (
      <div className="text-muted-foreground text-sm p-4 bg-secondary/30 rounded-lg">
        No teams added yet for {groupName}
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {/* Group Name */}
      <div className="bg-secondary px-4 py-2">
        <h4 className="font-semibold text-secondary-foreground text-sm sm:text-base">{groupName}</h4>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold min-w-[120px]">Team</TableHead>
              <TableHead className="text-center font-semibold w-12">P</TableHead>
              <TableHead className="text-center font-semibold w-12">W</TableHead>
              <TableHead className="text-center font-semibold w-12">D</TableHead>
              <TableHead className="text-center font-semibold w-12">L</TableHead>
              <TableHead className="text-center font-semibold w-14">Pts</TableHead>
              {sport.uses_nrr && <TableHead className="text-center font-semibold w-16">NRR</TableHead>}
              {sport.uses_gd && <TableHead className="text-center font-semibold w-14">GD</TableHead>}
              {sport.uses_pd && <TableHead className="text-center font-semibold w-14">PD</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.id}
                className={index === 0 ? 'bg-sport-green/10' : ''}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <span className="w-5 h-5 rounded-full bg-sport-green text-sport-green-foreground flex items-center justify-center text-xs font-bold shrink-0">
                        1
                      </span>
                    )}
                    <span className="truncate">{team.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{team.matches_played}</TableCell>
                <TableCell className="text-center text-sport-green font-semibold">{team.wins}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.draws}</TableCell>
                <TableCell className="text-center text-destructive font-semibold">{team.losses}</TableCell>
                <TableCell className="text-center font-bold text-primary">{team.points}</TableCell>
                {sport.uses_nrr && (
                  <TableCell className="text-center text-sm">{team.net_run_rate?.toFixed(3)}</TableCell>
                )}
                {sport.uses_gd && (
                  <TableCell className="text-center text-sm">
                    {(team.goal_difference ?? 0) > 0 ? `+${team.goal_difference}` : team.goal_difference}
                  </TableCell>
                )}
                {sport.uses_pd && (
                  <TableCell className="text-center text-sm">
                    {(team.point_difference ?? 0) > 0 ? `+${team.point_difference}` : team.point_difference}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
