import React from "react";

const Question = (props) => {
    console.log(props.question);
    var question = {
        "question": props.question,
        "options": props.options,
        "questionId": props.questionId
    }

    
  return (
    <>
         <div
          key={question.questionId}
          style={{
            border: "1px solid black",
            margin: "5px",
            padding: "5px"
          }}
        >
          <h3>{question.questionId}{". "}{question.question}</h3>

          <ul>
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>

          <button
            onClick={() => props.deleteQuestion(question.questionId)}
          >
            Delete
          </button>
          <button onClick={() => {
            console.log("Edit");
            props.setCurrentQuestion(question.questionId) 
            }}
          >Edit</button>
        </div>
   </>
  );
};

export default Question;