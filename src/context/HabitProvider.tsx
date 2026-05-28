import { type ReactNode } from "react";
import { isSameDay } from "date-fns";
import { HabitContext } from "../context/useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Habit = { id: string; name: string; completions: Date[] };

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

  function addHabit(name: string) {
    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((curr) =>
      curr.map((h) => {
        if (h.id !== id) return h;

        const alreadyDone = h.completions.some((c) => isSameDay(c, date));
        const completions = alreadyDone
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date];

        return { ...h, completions };
      }),
    );
  }

  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((habit) => habit.id !== id));
  }
  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext>
  );
}
