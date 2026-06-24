import React, { useState, useEffect } from "react";
import { fetchQuizzes } from "../apiService";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>

      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>

          <button>Start Quiz</button>
        </div>
      ))}
    </div>
  );
};

export default QuizListPage;