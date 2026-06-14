import { useState } from "react";
import Question from "./Question";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function Quiz() {
  const [id, setId] = useState(1);
  const [currQuestionId, setCurrQuestionId] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "What is Virtual DOM?",
      options: [
        "A copy of the real DOM",
        "Database",
        "CSS Framework",
        "Programming Language"
      ],
      questionId:1
    }
  ]);

  

  const [questionInput, setQuestionInput] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const updateQuestion = (e, isEdit = false) => {
    e.preventDefault();

    const newQuestion = {
      "question": isEdit ? questionInputEdit : questionInput,
      "options": [isEdit ? option1Edit : option1, isEdit ? option2Edit : option2, isEdit ? option3Edit : option3, isEdit ? option4Edit : option4],
      "questionId": isEdit ? currQuestionId : (id + 1)
    };


    //const existingQuestion = questions.find(q => q.question.trim() === questionInput.trim());


    if (isEdit) {
      // EDIT
      const existingQuestion = questions.find(q => q.questionId === currQuestionId);
      setQuestions(
        questions.map(q =>
        q.questionId === currQuestionId ? newQuestion : q)
      );
    } else {
      // ADD
      setQuestions([...questions, newQuestion]);
      setId(id + 1);
    }

    // Clear inputs
    setQuestionInput("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
  };

  const deleteQuestion = (questionId) => {
    setQuestions(
      questions.filter(q => q.questionId !== questionId)
    );
  };

  const getQuestionById = (id) => {
    return questions.find(q => q.questionId === id);
  }

  return (
    <div>
      <h1>Quiz App</h1>

      <QuestionList questions={questions} questionInput={questionInput} option1={option1} option2={option2} option3={option3} option4={option4} setQuestionInput={setQuestionInput} setOption1={setOption1} setOption2={setOption2} setOption3={setOption3} setOption4={setOption4} deleteQuestion={deleteQuestion} />
      
      <QuestionForm updateQuestion={updateQuestion} questionInput={questionInput} option1={option1} option2={option2} option3={option3} option4={option4} />
      <QuestionForm updateQuestion={(e) => updateQuestion(e, true)} currQuestion={getQuestionById(currQuestionId)} questionInput={questionInput} option1={option1} option2={option2} option3={option3} option4={option4} />
    
    </div>
  );
}

export default Quiz;