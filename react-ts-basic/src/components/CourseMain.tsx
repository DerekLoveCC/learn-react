import { useState } from "react";
import Header from "./Header";
import goalsImg from "./assets/goals.jpg";
import CourseGoalList from "./CourseGoalList";
import Goal from "./models/Goal";
import AddNewGoal from "./AddNewGoal";

export default function CourseMain() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleAddGoal(title: string, summary: string): void {
    setGoals((pre) => {
      const newGoal = {
        id: Math.random(),
        title: title,
        description: summary,
      };
      return [...pre, newGoal];
    });
  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
  }

  return (
    <main>
      <Header img={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your Course Goals</h1>
      </Header>
      <AddNewGoal onAddNew={handleAddGoal}></AddNewGoal>
      <CourseGoalList
        goals={goals}
        onDeleteGoal={handleDeleteGoal}
      ></CourseGoalList>
    </main>
  );
}
