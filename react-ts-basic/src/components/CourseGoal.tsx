type CourseGoalProps = {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
};

export default function CourseGoal({
  title,
  description,
  id,
  onDelete,
}: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
}
