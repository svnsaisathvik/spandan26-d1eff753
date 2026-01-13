// Sports Fest Data - Edit this file to update all sports information

export type SportCategory = 'team' | 'individual' | 'minor';

export interface Team {
  name: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  points: number;
}

export interface Group {
  name: string;
  teams: Team[];
}

export interface Match {
  id: string;
  sport: string;
  sportCategory: SportCategory;
  matchName: string;
  date: string; // Format: "22", "23", "24", "25"
  time: string;
  venue?: string;
}

export interface Sport {
  id: string;
  name: string;
  category: SportCategory;
  icon: string;
  description: string;
  liveStreamUrl?: string;
  groups?: Group[]; // Only for team sports
}

// Team Sports Data
export const teamSports: Sport[] = [
  {
    id: 'cricket',
    name: 'Cricket',
    category: 'team',
    icon: '🏏',
    description: 'The gentleman\'s game with intense inter-department rivalry',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'Computer Science', matchesPlayed: 2, wins: 2, losses: 0, points: 4 },
          { name: 'Electronics', matchesPlayed: 2, wins: 1, losses: 1, points: 2 },
          { name: 'Mechanical', matchesPlayed: 2, wins: 0, losses: 2, points: 0 },
        ],
      },
      {
        name: 'Group B',
        teams: [
          { name: 'Civil', matchesPlayed: 2, wins: 2, losses: 0, points: 4 },
          { name: 'Chemical', matchesPlayed: 2, wins: 1, losses: 1, points: 2 },
          { name: 'Electrical', matchesPlayed: 2, wins: 0, losses: 2, points: 0 },
        ],
      },
    ],
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    category: 'team',
    icon: '🏐',
    description: 'High-flying action at the net',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'IT Department', matchesPlayed: 1, wins: 1, losses: 0, points: 2 },
          { name: 'Physics', matchesPlayed: 1, wins: 0, losses: 1, points: 0 },
        ],
      },
    ],
  },
  {
    id: 'football',
    name: 'Football',
    category: 'team',
    icon: '⚽',
    description: 'The beautiful game unites all departments',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'MBA', matchesPlayed: 2, wins: 1, losses: 1, points: 2 },
          { name: 'BBA', matchesPlayed: 2, wins: 1, losses: 1, points: 2 },
          { name: 'Commerce', matchesPlayed: 2, wins: 1, losses: 1, points: 2 },
        ],
      },
    ],
  },
  {
    id: 'throwball',
    name: 'Throwball',
    category: 'team',
    icon: '🤾',
    description: 'Fast-paced throwing action',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'Arts', matchesPlayed: 1, wins: 1, losses: 0, points: 2 },
          { name: 'Science', matchesPlayed: 1, wins: 0, losses: 1, points: 0 },
        ],
      },
    ],
  },
  {
    id: 'basketball',
    name: 'Basketball',
    category: 'team',
    icon: '🏀',
    description: 'Slam dunks and three-pointers',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'Engineering', matchesPlayed: 2, wins: 2, losses: 0, points: 4 },
          { name: 'Management', matchesPlayed: 2, wins: 1, losses: 1, points: 2 },
          { name: 'Law', matchesPlayed: 2, wins: 0, losses: 2, points: 0 },
        ],
      },
    ],
  },
];

// Individual Sports Data
export const individualSports: Sport[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    category: 'individual',
    icon: '🏸',
    description: 'Swift racket action on the court',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'chess',
    name: 'Chess',
    category: 'individual',
    icon: '♟️',
    description: 'Battle of minds on 64 squares',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    category: 'individual',
    icon: '🏓',
    description: 'Lightning-fast rallies',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

// Minor Sports Data
export const minorSports: Sport[] = [
  {
    id: 'gully-cricket',
    name: 'Gully Cricket',
    category: 'minor',
    icon: '🏏',
    description: 'Street-style cricket fun',
  },
  {
    id: 'pentathlon',
    name: 'Pentathlon',
    category: 'minor',
    icon: '🏃',
    description: 'Five events, one champion',
  },
  {
    id: 'tug-of-war',
    name: 'Tug of War',
    category: 'minor',
    icon: '🪢',
    description: 'Ultimate test of team strength',
  },
  {
    id: 'carrom',
    name: 'Carrom',
    category: 'minor',
    icon: '🎯',
    description: 'Precision and strategy on the board',
  },
];

// All Sports Combined
export const allSports = [...teamSports, ...individualSports, ...minorSports];

// Match Schedule Data
export const matchSchedule: Match[] = [
  // Day 1 - 22nd
  { id: '1', sport: 'Cricket', sportCategory: 'team', matchName: 'CS vs Electronics', date: '22', time: '9:00 AM', venue: 'Main Ground' },
  { id: '2', sport: 'Football', sportCategory: 'team', matchName: 'MBA vs BBA', date: '22', time: '10:30 AM', venue: 'Football Field' },
  { id: '3', sport: 'Badminton', sportCategory: 'individual', matchName: 'Quarter Finals', date: '22', time: '2:00 PM', venue: 'Indoor Stadium' },
  { id: '4', sport: 'Chess', sportCategory: 'individual', matchName: 'Round 1', date: '22', time: '3:00 PM', venue: 'Library Hall' },
  { id: '5', sport: 'Gully Cricket', sportCategory: 'minor', matchName: 'Prelims', date: '22', time: '4:00 PM', venue: 'Back Ground' },

  // Day 2 - 23rd
  { id: '6', sport: 'Volleyball', sportCategory: 'team', matchName: 'IT vs Physics', date: '23', time: '9:00 AM', venue: 'Volleyball Court' },
  { id: '7', sport: 'Cricket', sportCategory: 'team', matchName: 'Mechanical vs Electronics', date: '23', time: '10:00 AM', venue: 'Main Ground' },
  { id: '8', sport: 'Table Tennis', sportCategory: 'individual', matchName: 'Semi Finals', date: '23', time: '2:00 PM', venue: 'TT Room' },
  { id: '9', sport: 'Throwball', sportCategory: 'team', matchName: 'Arts vs Science', date: '23', time: '3:30 PM', venue: 'Court 2' },
  { id: '10', sport: 'Tug of War', sportCategory: 'minor', matchName: 'Preliminary Round', date: '23', time: '5:00 PM', venue: 'Open Ground' },

  // Day 3 - 24th
  { id: '11', sport: 'Basketball', sportCategory: 'team', matchName: 'Engineering vs Management', date: '24', time: '9:00 AM', venue: 'Basketball Court' },
  { id: '12', sport: 'Football', sportCategory: 'team', matchName: 'Semi Final 1', date: '24', time: '10:30 AM', venue: 'Football Field' },
  { id: '13', sport: 'Badminton', sportCategory: 'individual', matchName: 'Semi Finals', date: '24', time: '2:00 PM', venue: 'Indoor Stadium' },
  { id: '14', sport: 'Chess', sportCategory: 'individual', matchName: 'Semi Finals', date: '24', time: '3:00 PM', venue: 'Library Hall' },
  { id: '15', sport: 'Pentathlon', sportCategory: 'minor', matchName: 'All Events', date: '24', time: '4:00 PM', venue: 'Athletic Track' },
  { id: '16', sport: 'Carrom', sportCategory: 'minor', matchName: 'Finals', date: '24', time: '5:00 PM', venue: 'Common Room' },

  // Day 4 - 25th
  { id: '17', sport: 'Cricket', sportCategory: 'team', matchName: 'GRAND FINAL', date: '25', time: '9:00 AM', venue: 'Main Ground' },
  { id: '18', sport: 'Football', sportCategory: 'team', matchName: 'GRAND FINAL', date: '25', time: '11:00 AM', venue: 'Football Field' },
  { id: '19', sport: 'Basketball', sportCategory: 'team', matchName: 'GRAND FINAL', date: '25', time: '2:00 PM', venue: 'Basketball Court' },
  { id: '20', sport: 'Badminton', sportCategory: 'individual', matchName: 'GRAND FINAL', date: '25', time: '3:30 PM', venue: 'Indoor Stadium' },
  { id: '21', sport: 'Table Tennis', sportCategory: 'individual', matchName: 'GRAND FINAL', date: '25', time: '4:30 PM', venue: 'TT Room' },
  { id: '22', sport: 'Tug of War', sportCategory: 'minor', matchName: 'GRAND FINAL', date: '25', time: '5:30 PM', venue: 'Open Ground' },
];

export const festDates = ['22', '23', '24', '25'];

export function getMatchesByDate(date: string): Match[] {
  return matchSchedule.filter((match) => match.date === date);
}

export function getMatchesBySport(sportId: string): Match[] {
  const sport = allSports.find((s) => s.id === sportId);
  if (!sport) return [];
  return matchSchedule.filter((match) => match.sport.toLowerCase().replace(' ', '-') === sportId || match.sport === sport.name);
}

export function getSportById(sportId: string): Sport | undefined {
  return allSports.find((s) => s.id === sportId);
}
