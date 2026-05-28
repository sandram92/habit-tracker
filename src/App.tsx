import { useState } from "react";
import { Header } from "./componenets/Header";
import { HabitForm } from "./componenets/HabitForm";
import { HabitList } from "./componenets/HabitList";
import { HabitProvider } from "./context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });
  return (
    <div className="max-w-2xl mx-auto p-4 flex-col gap-4">
      <HabitProvider>
        <div className="my-4">
          <Header
            visibleDates={visibleDates}
            onNext={() => setWeekOffset((o) => o + 1)}
            onPrev={() => setWeekOffset((o) => o - 1)}
          />
        </div>
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
}
