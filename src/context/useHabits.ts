import { createContext, useContext,  } from "react";

export type Habit = { id: string; name: string; completions: Date[] };

type Context = {
  habits: Habit[];
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
  addHabit: (name: string) => void;
};


export const HabitContext = createContext<null | Context>(null);

export function useHabits() {
  const habitContext = useContext(HabitContext);
  if (habitContext == null) throw new Error("Null context");

  return habitContext
}
