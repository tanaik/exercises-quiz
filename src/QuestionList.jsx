import Question from "./Question";

const QuestionList = ({ questions ,...props}) => {   

    const setCurrentQuestion = (questionId) => {
        props.setCurrentQuestion(questionId);
    }
    console.log(props.deleteQuestion);
  return (
    <div>
      {questions.map((q, index) => (
        <Question key = {q.questionId} {...q} setCurrentQuestion={setCurrentQuestion} deleteQuestion={props.deleteQuestion} />
      ))}
    </div>
  );
};

export default QuestionList;