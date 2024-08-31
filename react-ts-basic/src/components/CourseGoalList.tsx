import CourseGoal from "./CourseGoal";
import Goal from "./models/Goal";

type CourseGoalListProps = {
  goals: Goal[];
  onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
  goals,
  onDeleteGoal: handleDelete,
}: CourseGoalListProps) {
  return (
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
  );
}
