import Question from "./Question";

const QuestionList = ({ questions ,...props}) => {   

    const setCurrentQuestion = (questionId) => {
        var currQues = questions.find(ques => ques.questionId === questionId);
        props.setQuestionInput(currQues.question);
        props.setOption1(currQues.options[0]);
        props.setOption2(currQues.options[1]);
        props.setOption3(currQues.options[2]);
        props.setOption4(currQues.options[3]);
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