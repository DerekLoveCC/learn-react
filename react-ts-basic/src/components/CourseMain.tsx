import { useState } from "react";
import Header from "./Header";
import goalsImg from "./assets/goals.jpg";
import CourseGoalList from "./CourseGoalList";
import Goal from "./models/Goal";

export default function CourseMain() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleAddGoal(): void {
    setGoals((pre) => {
      const newGoal = {
        id: Math.random(),
        title: "sss",
        description: "descriptin sss",
      };
      return [...pre, newGoal];
    });
  }

  return (
    <main>
      <Header img={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your Course Goals</h1>
      </Header>
      <button onClick={handleAddGoal}>Add Goal</button>
      <CourseGoalList goals={goals}></CourseGoalList>
    </main>
  );
}
