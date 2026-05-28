import { HabitItem } from "./HabitItem";
import { useHabits } from "../context/useHabits";

export type Habit = { id: string; name: string; completions: Date[] };

type HabitList = {
 visibleDates: Date[]
}

export function HabitList({visibleDates}:HabitList ) {
  const { habits } = useHabits();

  if (habits?.length === 0) {
    return (
      <div className="text-center text-zinc-500 italic py-12">
        No habbits yet. Add one above to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits?.map((habit) => (
        <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
      ))}
    </div>
  );
}
