import Question from "./Question";

const QuestionList = ({ questions ,...props}) => {   

    const setCurrentQuestion = (questionId) => {
        props.setCurrentQuestion(questionId);
    }
    console.log(`Questions Component ${questions}`);
  return (
    <div>
      {questions != undefined && questions.map((q, index) => (
        <Question key = {q.questionId} {...q} setCurrentQuestion={setCurrentQuestion} toggleReload = {props.toggleReload}/>
      ))}
    </div>
  );
};

export default QuestionList;