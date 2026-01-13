import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Save, Video, Calendar, Trophy, Users } from 'lucide-react';
import { toast } from 'sonner';
import {
  useSports,
  useAllGroups,
  useAllTeams,
  useAllMatches,
  useUpdateSport,
  useUpdateTeam,
  useCreateTeam,
  useDeleteTeam,
  useCreateGroup,
  useDeleteGroup,
  useCreateMatch,
  useUpdateMatch,
  useDeleteMatch,
} from '@/hooks/useSportsData';

export default function Admin() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="section-title">ADMIN PANEL</h1>
          <p className="text-muted-foreground mt-2">
            Manage schedules, points tables, and live stream links
          </p>
        </div>

        <Tabs defaultValue="streams" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="streams" className="gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Live Streams</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="points" className="gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Points Table</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streams">
            <LiveStreamsTab />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleTab />
          </TabsContent>
          <TabsContent value="points">
            <PointsTableTab />
          </TabsContent>
          <TabsContent value="groups">
            <GroupsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LiveStreamsTab() {
  const { data: sports, isLoading } = useSports();
  const updateSport = useUpdateSport();

  const handleUpdateStream = (sportId: string, url: string) => {
    updateSport.mutate(
      { id: sportId, live_stream_url: url || null },
      {
        onSuccess: () => toast.success('Stream URL updated!'),
        onError: () => toast.error('Failed to update'),
      }
    );
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  const teamSports = sports?.filter((s) => s.category === 'team') || [];
  const individualSports = sports?.filter((s) => s.category === 'individual') || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Sports - Live Stream URLs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamSports.map((sport) => (
            <div key={sport.id} className="flex items-center gap-4">
              <span className="text-2xl w-10">{sport.icon}</span>
              <Label className="w-32 font-medium">{sport.name}</Label>
              <Input
                className="flex-1"
                placeholder="YouTube embed URL"
                defaultValue={sport.live_stream_url || ''}
                onBlur={(e) => handleUpdateStream(sport.id, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Individual Sports - Live Stream URLs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {individualSports.map((sport) => (
            <div key={sport.id} className="flex items-center gap-4">
              <span className="text-2xl w-10">{sport.icon}</span>
              <Label className="w-32 font-medium">{sport.name}</Label>
              <Input
                className="flex-1"
                placeholder="YouTube embed URL"
                defaultValue={sport.live_stream_url || ''}
                onBlur={(e) => handleUpdateStream(sport.id, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        💡 Tip: Use YouTube embed URLs like: https://www.youtube.com/embed/VIDEO_ID
      </p>
    </div>
  );
}

function ScheduleTab() {
  const { data: matches, isLoading: matchesLoading } = useAllMatches();
  const { data: sports } = useSports();
  const createMatch = useCreateMatch();
  const updateMatch = useUpdateMatch();
  const deleteMatch = useDeleteMatch();

  const [newMatch, setNewMatch] = useState({
    sport_id: '',
    match_name: '',
    match_date: '22',
    match_time: '',
    venue: '',
  });

  const handleAddMatch = () => {
    if (!newMatch.sport_id || !newMatch.match_name || !newMatch.match_time) {
      toast.error('Please fill sport, match name, and time');
      return;
    }
    createMatch.mutate(newMatch, {
      onSuccess: () => {
        toast.success('Match added!');
        setNewMatch({ sport_id: '', match_name: '', match_date: '22', match_time: '', venue: '' });
      },
      onError: () => toast.error('Failed to add match'),
    });
  };

  const handleDeleteMatch = (id: string) => {
    deleteMatch.mutate(id, {
      onSuccess: () => toast.success('Match deleted'),
      onError: () => toast.error('Failed to delete'),
    });
  };

  if (matchesLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Add New Match */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Match
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <Select value={newMatch.sport_id} onValueChange={(v) => setNewMatch({ ...newMatch, sport_id: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                {sports?.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.icon} {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Match Name"
              value={newMatch.match_name}
              onChange={(e) => setNewMatch({ ...newMatch, match_name: e.target.value })}
            />
            <Select value={newMatch.match_date} onValueChange={(v) => setNewMatch({ ...newMatch, match_date: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="22">Jan 22</SelectItem>
                <SelectItem value="23">Jan 23</SelectItem>
                <SelectItem value="24">Jan 24</SelectItem>
                <SelectItem value="25">Jan 25</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Time (e.g., 9:00 AM)"
              value={newMatch.match_time}
              onChange={(e) => setNewMatch({ ...newMatch, match_time: e.target.value })}
            />
            <Input
              placeholder="Venue (optional)"
              value={newMatch.venue}
              onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
            />
            <Button onClick={handleAddMatch} disabled={createMatch.isPending}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Matches */}
      <Card>
        <CardHeader>
          <CardTitle>All Matches ({matches?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {matches?.map((match: any) => (
              <div key={match.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                  {match.sports?.name}
                </span>
                <span className="font-medium flex-1">{match.match_name}</span>
                <span className="text-sm text-muted-foreground">Jan {match.match_date}</span>
                <span className="text-sm text-muted-foreground">{match.match_time}</span>
                <span className="text-sm text-muted-foreground">{match.venue || '-'}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteMatch(match.id)}
                  disabled={deleteMatch.isPending}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PointsTableTab() {
  const { data: groups } = useAllGroups();
  const { data: teams, isLoading } = useAllTeams();
  const { data: sports } = useSports();
  const updateTeam = useUpdateTeam();
  const createTeam = useCreateTeam();
  const deleteTeam = useDeleteTeam();

  const [newTeam, setNewTeam] = useState({ group_id: '', name: '' });

  const handleUpdateTeam = (team: any, field: string, value: number | string) => {
    updateTeam.mutate(
      { id: team.id, [field]: value },
      {
        onSuccess: () => toast.success('Updated!'),
        onError: () => toast.error('Failed to update'),
      }
    );
  };

  const handleAddTeam = () => {
    if (!newTeam.group_id || !newTeam.name) {
      toast.error('Select a group and enter team name');
      return;
    }
    createTeam.mutate(
      { ...newTeam, matches_played: 0, wins: 0, losses: 0, points: 0 },
      {
        onSuccess: () => {
          toast.success('Team added!');
          setNewTeam({ group_id: '', name: '' });
        },
        onError: () => toast.error('Failed to add team'),
      }
    );
  };

  const handleDeleteTeam = (id: string) => {
    deleteTeam.mutate(id, {
      onSuccess: () => toast.success('Team deleted'),
      onError: () => toast.error('Failed to delete'),
    });
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  // Group teams by group_id
  const teamsByGroup = teams?.reduce((acc: any, team: any) => {
    if (!acc[team.group_id]) acc[team.group_id] = [];
    acc[team.group_id].push(team);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Add New Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={newTeam.group_id} onValueChange={(v) => setNewTeam({ ...newTeam, group_id: v })}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                {groups?.map((group: any) => {
                  const sport = sports?.find((s) => s.id === group.sport_id);
                  return (
                    <SelectItem key={group.id} value={group.id}>
                      {sport?.icon} {sport?.name} - {group.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Input
              placeholder="Team Name"
              className="flex-1"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            />
            <Button onClick={handleAddTeam} disabled={createTeam.isPending}>
              <Plus className="w-4 h-4 mr-2" />
              Add Team
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Points Tables by Group */}
      {groups?.map((group: any) => {
        const sport = sports?.find((s) => s.id === group.sport_id);
        const groupTeams = teamsByGroup?.[group.id] || [];
        
        return (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{sport?.icon}</span>
                {sport?.name} - {group.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {groupTeams.length === 0 ? (
                <p className="text-muted-foreground text-sm">No teams in this group yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Team</th>
                        <th className="text-center py-2 w-20">Played</th>
                        <th className="text-center py-2 w-20">Wins</th>
                        <th className="text-center py-2 w-20">Losses</th>
                        <th className="text-center py-2 w-20">Points</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupTeams.map((team: any) => (
                        <tr key={team.id} className="border-b">
                          <td className="py-2 font-medium">{team.name}</td>
                          <td className="py-2">
                            <Input
                              type="number"
                              className="w-16 text-center mx-auto"
                              defaultValue={team.matches_played}
                              onBlur={(e) => handleUpdateTeam(team, 'matches_played', parseInt(e.target.value) || 0)}
                            />
                          </td>
                          <td className="py-2">
                            <Input
                              type="number"
                              className="w-16 text-center mx-auto"
                              defaultValue={team.wins}
                              onBlur={(e) => handleUpdateTeam(team, 'wins', parseInt(e.target.value) || 0)}
                            />
                          </td>
                          <td className="py-2">
                            <Input
                              type="number"
                              className="w-16 text-center mx-auto"
                              defaultValue={team.losses}
                              onBlur={(e) => handleUpdateTeam(team, 'losses', parseInt(e.target.value) || 0)}
                            />
                          </td>
                          <td className="py-2">
                            <Input
                              type="number"
                              className="w-16 text-center mx-auto"
                              defaultValue={team.points}
                              onBlur={(e) => handleUpdateTeam(team, 'points', parseInt(e.target.value) || 0)}
                            />
                          </td>
                          <td className="py-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTeam(team.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function GroupsTab() {
  const { data: groups, isLoading } = useAllGroups();
  const { data: sports } = useSports();
  const createGroup = useCreateGroup();
  const deleteGroup = useDeleteGroup();

  const [newGroup, setNewGroup] = useState({ sport_id: '', name: '' });

  const teamSports = sports?.filter((s) => s.category === 'team') || [];

  const handleAddGroup = () => {
    if (!newGroup.sport_id || !newGroup.name) {
      toast.error('Select a sport and enter group name');
      return;
    }
    createGroup.mutate(newGroup, {
      onSuccess: () => {
        toast.success('Group created!');
        setNewGroup({ sport_id: '', name: '' });
      },
      onError: () => toast.error('Failed to create group'),
    });
  };

  const handleDeleteGroup = (id: string) => {
    if (!confirm('This will also delete all teams in this group. Continue?')) return;
    deleteGroup.mutate(id, {
      onSuccess: () => toast.success('Group deleted'),
      onError: () => toast.error('Failed to delete'),
    });
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Group
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={newGroup.sport_id} onValueChange={(v) => setNewGroup({ ...newGroup, sport_id: v })}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Team Sport" />
              </SelectTrigger>
              <SelectContent>
                {teamSports.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.icon} {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Group Name (e.g., Group A)"
              className="flex-1"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            />
            <Button onClick={handleAddGroup} disabled={createGroup.isPending}>
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Groups ({groups?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups?.map((group: any) => {
              const sport = sports?.find((s) => s.id === group.sport_id);
              return (
                <div key={group.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sport?.icon}</span>
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{sport?.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
