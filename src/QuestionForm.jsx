import React, { useState } from "react";
const QuestionForm = ({ updateQuestion, currQuestion, ...props }) => {
    console.log(currQuestion);
    return (
    <>
        <form onSubmit={(e) => updateQuestion(e, false)}>
        <input
          type="text"
          placeholder="Enter Question"
          value={props.questionInput}
          onChange={(e) => props.setQuestionInput(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 1"
          value={props.option1}
          onChange={(e) => props.setOption1(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 2"
          value={props.option2}
          onChange={(e) => props.setOption2(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 3"
          value={props.option3}
          onChange={(e) => props.setOption3(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 4"
          value={props.option4}
          onChange={(e) => props.setOption4(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Add Question
        </button>
      </form>
    </>)
}
export default QuestionForm;