import { festDates } from '@/data/sportsData';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const dateLabels: Record<string, string> = {
  '22': 'Jan 22',
  '23': 'Jan 23',
  '24': 'Jan 24',
  '25': 'Jan 25',
};

const dayLabels: Record<string, string> = {
  '22': 'Day 1',
  '23': 'Day 2',
  '24': 'Day 3',
  '25': 'Day 4',
};

export function DateFilter({ selectedDate, onDateChange }: DateFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {festDates.map((date) => (
        <button
          key={date}
          onClick={() => onDateChange(date)}
          className={`date-chip ${selectedDate === date ? 'date-chip-active' : 'date-chip-inactive'}`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs opacity-80">{dayLabels[date]}</span>
            <span className="font-bold">{dateLabels[date]}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
