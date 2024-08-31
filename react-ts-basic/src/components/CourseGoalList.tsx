import { type ReactNode } from "react";
import CourseGoal from "./CourseGoal";
import Goal from "./models/Goal";
import { InfoBox } from "./InfoBox";

type CourseGoalListProps = {
  goals: Goal[];
  onDeleteGoal: (id: number) => void;
};

let infobox: ReactNode;

export default function CourseGoalList({
  goals,
  onDeleteGoal: handleDelete,
}: CourseGoalListProps) {
  if (goals.length === 0) {
    infobox = <InfoBox mode="hint">You don't have goals</InfoBox>;
  }
  if (goals.length > 3) {
    infobox = (
      <InfoBox mode="warning" severity="medium">You have too many goals on your plates</InfoBox>
    );
  }

  return (
    <>
      {infobox}
      <ul>
        {goals.map((g) => (
          <li key={g.id}>
            <CourseGoal
              id={g.id}
              title={g.title}
              description={g.description}
              onDelete={handleDelete}
            ></CourseGoal>
          </li>
        ))}
      </ul>
    </>
  );
}
