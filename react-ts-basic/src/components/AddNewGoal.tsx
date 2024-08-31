import { FormEvent, useRef } from "react";

type AddNewGoalProps = {
  onAddNew: (title: string, summary: string) => void;
};

export default function AddNewGoal({ onAddNew }: AddNewGoalProps) {
  const summary = useRef<HTMLInputElement>(null);
  const goal = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const summaryVal = summary.current!.value;
    const goalVal = goal.current!.value;
    onAddNew(goalVal, summaryVal);
    event.currentTarget.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" ref={goal}></input>
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" ref={summary}></input>
      </p>
      <button>Add Goal</button>
    </form>
  );
}
