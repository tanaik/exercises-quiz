import React, { useState,useEffect } from "react";
import { fetchGET,fetchPOST,fetchPUT } from "./apiService";

const QuestionForm = ({ updateQuestion, currQuestionId, isEdit,toggleReload,newQuestionId }) => {
    console.log(currQuestionId);

    const [questionInput, setQuestionInput] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(""); // C

    console.log(`Add form ${newQuestionId}`)
    useEffect(() => {
      if(isEdit && currQuestionId != 0) {
            fetchGET(currQuestionId).then(data => {
            console.log(data);
          
            setQuestionInput(data.question);
            setOption1(data.options[0]);
            setOption2(data.options[1]);
            setOption3(data.options[2]);
            setOption4(data.options[3]);
            setCorrectAnswer(data.correctAnswer);
         });
      }
        
      }, [currQuestionId]);

    const saveQuestion = (e) => {
        e.preventDefault();

        if(!isEdit) {
          const newQuestion = {
          "question": questionInput,
          "options": [option1, option2, option3, option4],
          "correctAnswer": correctAnswer, // C
          "questionId":18
         };
          fetchPOST(newQuestion)
          .then(() => {
            console.log("Question added successfully.");
            toggleReload();

          });
        }
        else
        {
          fetchPUT(currQuestionId, {
            "question": questionInput,
            "options": [option1, option2, option3, option4],
            "correctAnswer": correctAnswer, // C
          })
          .then(() => {
            console.log("Question updated successfully.");
            toggleReload();
          });
        }
        
    };

    return (
    <>
        <form>
        <input
          type="text"
          placeholder="Enter Question"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 1"
          value={option1}
          onChange={(e) =>  setOption1(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 2"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 3"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 4"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        />

        <br /><br />

      <input  // C
        type="number"
        min="1"
        max="4"
        placeholder="Correct Answer (1-4)"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />

        <br /><br />

        <button type="submit" onClick={saveQuestion}>
          {isEdit ? "Update" : "Add"} Question
        </button>
      </form>
    </>)
}
export default QuestionForm;