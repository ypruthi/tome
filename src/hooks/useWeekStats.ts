import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { Osdk } from "@osdk/client";
import { B2aDeliverables } from "@tome/sdk";

export function useWeekStats(
  deliverables: Osdk.Instance<typeof B2aDeliverables>[]
) {
  const today = new Date();
  const thisWeek = deliverables.filter((d) =>
    isWithinInterval(new Date(d.dueDate), {
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: endOfWeek(today, { weekStartsOn: 1 }),
    })
  );

  return {
    assignmentsDue: thisWeek.filter((d) => d.type === "assignment").length,
    examsThisWeek:  thisWeek.filter((d) => d.type === "exam").length,
    studyHours:     0,                    
    progress:       0,                    // placeholder until formula finalized
    upcoming:       thisWeek.slice(0, 3), // first 3 deadlines for the card
  };
}