import { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import { fetchGET, fetchQuizzes } from "./apiService";

function QuizManage() {
  // ---------------- QUESTIONS ----------------
  const [id, setId] = useState(1);
  const [currQuestionId, setCurrQuestionId] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [reload, setReload] = useState(false);

  // ---------------- QUIZZES ----------------
  const [quizzes, setQuizzes] = useState([]);

  // Load QUESTIONS
  useEffect(() => {
    fetchGET().then((data) => {
      setQuestions(data);

      const maxId = Math.max(...data.map(q => q.questionId || 0), 0);
      setId(maxId + 1);
    });
  }, [reload]);

  // Load QUIZZES
  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  const toggleReload = () => {
    setReload(!reload);
  };

  return (
    <div>
      <h1>Quiz App</h1>

      {/* ---------------- QUIZZES ---------------- */}
      <h2>Quizzes</h2>
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          style={{
            border: "1px solid blue",
            margin: "5px",
            padding: "5px"
          }}
        >
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
        </div>
      ))}

      {/* ---------------- QUESTIONS ---------------- */}
      <h2>Questions</h2>

      <QuestionList
        questions={questions}
        setCurrentQuestion={setCurrQuestionId}
        toggleReload={toggleReload}
      />

      <QuestionForm
        isEdit={false}
        toggleReload={toggleReload}
        newQuestionId={id}
      />

      <QuestionForm
        isEdit={true}
        currQuestionId={currQuestionId}
        toggleReload={toggleReload}
      />
    </div>
  );
}

export default QuizManage;