// app/components/dev-discuss/QuestionList.jsx

import QuestionCard from "./QuestionCard";

export default function QuestionList({ questions }) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
}
