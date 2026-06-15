import React from "react";
import { fetchDELETE } from "./apiService";
const Question = (props) => {
    console.log(props.question);
    var question = {
        "question": props.question,
        "options": props.options,
        "questionId": props.questionId
    }
    
    const deleteQuestion = (questionId) => {
        fetchDELETE(questionId)
        .then(() => {
            console.log(`Question with ID ${questionId} deleted successfully.`);
            props.toggleReload();
        })
        .catch((error) => {
            console.error("Error deleting question:", error);
        });
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
            onClick={() => deleteQuestion(question.questionId)}
          >
            Delete
          </button>
          <button onClick={() => {
            console.log("Edit");
            console.log(question.questionId);
            props.setCurrentQuestion(question.questionId) 
            }}
          >Edit</button>
        </div>
   </>
  );
};

export default Question;