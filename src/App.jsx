import { useState } from "react";
import Question from "./Question";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import { fetchGET } from "./apiService";
function Quiz() {
  const [id, setId] = useState(1);
  const [currQuestionId, setCurrQuestionId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);


  const [questions, setQuestions] = useState([
  ]);

  if(!isLoaded) {
    fetchGET().then(data => {
      setQuestions(data);
      setIsLoaded(true);
    });
  }

 

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

      <QuestionList questions={questions}  deleteQuestion={deleteQuestion} setCurrentQuestion={setCurrQuestionId}/>
      
      <QuestionForm updateQuestion={updateQuestion} />
      <QuestionForm updateQuestion={(e) => updateQuestion(e, true)} currQuestion={getQuestionById(currQuestionId)} />
    
    </div>
  );
}

export default Quiz;