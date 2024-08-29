import CourseGoal from "./CourseGoal";
import Goal from "./models/Goal";

type CourseGoalListProps = {
  goals: Goal[];
};

export default function CourseGoalList({ goals }: CourseGoalListProps) {
  return (
    <ul>
      {goals.map((g) => (
        <li key={g.id}>
          <CourseGoal title={g.title} description={g.description}></CourseGoal>
        </li>
      ))}
    </ul>
  );
}
