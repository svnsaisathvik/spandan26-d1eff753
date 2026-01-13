import type { Group } from '@/data/sportsData';

interface PointsTableProps {
  groups: Group[];
}

export function PointsTable({ groups }: PointsTableProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.name} className="bg-card rounded-xl overflow-hidden shadow-sm">
          <div className="bg-primary px-4 py-3">
            <h4 className="font-semibold text-primary-foreground">{group.name}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="points-table">
              <thead>
                <tr className="bg-secondary">
                  <th className="!bg-secondary !text-secondary-foreground">Team</th>
                  <th className="!bg-secondary !text-secondary-foreground text-center">P</th>
                  <th className="!bg-secondary !text-secondary-foreground text-center">W</th>
                  <th className="!bg-secondary !text-secondary-foreground text-center">L</th>
                  <th className="!bg-secondary !text-secondary-foreground text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <tr
                      key={team.name}
                      className={`${index === 0 ? 'bg-sport-green/10' : 'bg-card'} hover:bg-secondary/50 transition-colors`}
                    >
                      <td className="font-medium">
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <span className="w-5 h-5 rounded-full bg-sport-green text-sport-green-foreground flex items-center justify-center text-xs font-bold">
                              1
                            </span>
                          )}
                          {team.name}
                        </div>
                      </td>
                      <td className="text-center">{team.matchesPlayed}</td>
                      <td className="text-center text-sport-green font-semibold">{team.wins}</td>
                      <td className="text-center text-destructive font-semibold">{team.losses}</td>
                      <td className="text-center font-bold text-primary">{team.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
