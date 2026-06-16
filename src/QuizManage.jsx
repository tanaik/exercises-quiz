import { useState,useEffect } from "react";
import Question from "./Question";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import { fetchGET } from "./apiService";
function QuizManage() {
  const [id, setId] = useState(1);
  const [currQuestionId, setCurrQuestionId] = useState(0);
  const [questions, setQuestions] = useState([
  ]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchGET().then(data => {
      

      var x = questions.map(q => q.questionId);
      var y = Math.max(...x)
      console.log(y)
      setId(1 + 1);
      setQuestions(data); 
    });
  }, [reload]);

  const toggleReload = () =>
  {
    setReload(!reload);
  }
 

  const updateQuestion = (e, isEdit = false) => {
    e.preventDefault();

    const newQuestion = {
      "question": isEdit ? questionInputEdit : questionInput,
      "options": [isEdit ? option1Edit : option1, isEdit ? option2Edit : option2, isEdit ? option3Edit : option3, isEdit ? option4Edit : option4],
      "questionId": isEdit ? currQuestionId : (id + 1)
    };

  };

  return (
    <div>
      <h1>Quiz App</h1>

      <QuestionList questions={questions} setCurrentQuestion={setCurrQuestionId} toggleReload = {toggleReload}/>
      
      <QuestionForm updateQuestion={(e) => updateQuestion(e, false)} isEdit={false} toggleReload = {toggleReload} newQuestionId = {id}/>
      <QuestionForm updateQuestion={(e) => updateQuestion(e, true)} isEdit={true} currQuestionId={currQuestionId} toggleReload = {toggleReload} />
    
    </div>
  );
}

export default QuizManage;