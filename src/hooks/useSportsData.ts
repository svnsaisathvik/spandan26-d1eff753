import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Sport {
  id: string;
  name: string;
  category: 'team' | 'individual' | 'minor';
  icon: string;
  description: string | null;
  live_stream_url: string | null;
}

export interface Group {
  id: string;
  sport_id: string;
  name: string;
}

export interface Team {
  id: string;
  group_id: string;
  name: string;
  matches_played: number;
  wins: number;
  losses: number;
  points: number;
}

export interface Match {
  id: string;
  sport_id: string;
  match_name: string;
  match_date: string;
  match_time: string;
  venue: string | null;
}

// Fetch all sports
export function useSports() {
  return useQuery({
    queryKey: ['sports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sports')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Sport[];
    },
  });
}

// Fetch sports by category
export function useSportsByCategory(category: 'team' | 'individual' | 'minor') {
  return useQuery({
    queryKey: ['sports', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sports')
        .select('*')
        .eq('category', category)
        .order('name');
      if (error) throw error;
      return data as Sport[];
    },
  });
}

// Fetch single sport
export function useSport(sportId: string) {
  return useQuery({
    queryKey: ['sport', sportId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sports')
        .select('*')
        .eq('id', sportId)
        .maybeSingle();
      if (error) throw error;
      return data as Sport | null;
    },
    enabled: !!sportId,
  });
}

// Fetch groups for a sport
export function useGroups(sportId: string) {
  return useQuery({
    queryKey: ['groups', sportId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('sport_id', sportId)
        .order('name');
      if (error) throw error;
      return data as Group[];
    },
    enabled: !!sportId,
  });
}

// Fetch all groups
export function useAllGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Group[];
    },
  });
}

// Fetch teams for a group
export function useTeams(groupId: string) {
  return useQuery({
    queryKey: ['teams', groupId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('group_id', groupId)
        .order('points', { ascending: false });
      if (error) throw error;
      return data as Team[];
    },
    enabled: !!groupId,
  });
}

// Fetch all teams
export function useAllTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('points', { ascending: false });
      if (error) throw error;
      return data as Team[];
    },
  });
}

// Fetch matches by date
export function useMatchesByDate(date: string) {
  return useQuery({
    queryKey: ['matches', 'date', date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*, sports(name, category)')
        .eq('match_date', date)
        .order('match_time');
      if (error) throw error;
      return data;
    },
  });
}

// Fetch matches by sport
export function useMatchesBySport(sportId: string) {
  return useQuery({
    queryKey: ['matches', 'sport', sportId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('sport_id', sportId)
        .order('match_date')
        .order('match_time');
      if (error) throw error;
      return data as Match[];
    },
    enabled: !!sportId,
  });
}

// Fetch all matches
export function useAllMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*, sports(name, category)')
        .order('match_date')
        .order('match_time');
      if (error) throw error;
      return data;
    },
  });
}

// Mutations
export function useUpdateSport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sport: Partial<Sport> & { id: string }) => {
      const { error } = await supabase
        .from('sports')
        .update(sport)
        .eq('id', sport.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports'] });
      queryClient.invalidateQueries({ queryKey: ['sport'] });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (team: Partial<Team> & { id: string }) => {
      const { error } = await supabase
        .from('teams')
        .update(team)
        .eq('id', team.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (team: Omit<Team, 'id'>) => {
      const { error } = await supabase.from('teams').insert(team);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('teams').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (group: { sport_id: string; name: string }) => {
      const { error } = await supabase.from('groups').insert(group);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('groups').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (match: Omit<Match, 'id'>) => {
      const { error } = await supabase.from('matches').insert(match);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (match: Partial<Match> & { id: string }) => {
      const { error } = await supabase
        .from('matches')
        .update(match)
        .eq('id', match.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}

export function useDeleteMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('matches').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}
