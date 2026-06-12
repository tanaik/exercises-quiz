import { useState } from "react";

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

  const [questionInputEdit, setQuestionInputEdit] = useState("");
  const [option1Edit, setOption1Edit] = useState("");
  const [option2Edit, setOption2Edit] = useState("");
  const [option3Edit, setOption3Edit] = useState("");
  const [option4Edit, setOption4Edit] = useState("");

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

  const deleteQuestion = (questionText) => {
    setQuestions(
      questions.filter(q => q.question !== questionText)
    );
  };

  return (
    <div>
      <h1>Quiz App</h1>

      {questions.map((q, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            margin: "5px",
            padding: "5px"
          }}
        >
          <h3>{q.questionId}{". "}{q.question}</h3>

          <ul>
            {q.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>

          <button
            onClick={() => deleteQuestion(q.question)}
          >
            Delete
          </button>
          <button onClick={() => {
            console.log("Edit"),
            setCurrQuestionId(q.questionId)
            var currQues = questions.find(ques => ques.questionId === q.questionId);
            setQuestionInputEdit(currQues.question);
            setOption1Edit(currQues.options[0]);
            setOption2Edit(currQues.options[1]);
            setOption3Edit(currQues.options[2]);
            setOption4Edit(currQues.options[3]);
            }}
          >Edit</button>
        </div>
      ))}

      <form onSubmit={(e) => updateQuestion(e, false)}>
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
          onChange={(e) => setOption1(e.target.value)}
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

        <button type="submit">
          Add Question
        </button>
      </form>

       <form onSubmit={(e) => updateQuestion(e, true)}>r
        {currQuestionId != 0 && <span>{currQuestionId}. </span>} 
        <input
          type="text"
          placeholder="Enter Question"
          value={questionInputEdit}
          onChange={(e) => setQuestionInputEdit(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 1"
          value={option1Edit}
          onChange={(e) => setOption1Edit(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 2"
          value={option2Edit}
          onChange={(e) => setOption2Edit(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 3"
          value={option3Edit}
          onChange={(e) => setOption3Edit(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option 4"
          value={option4Edit}
          onChange={(e) => setOption4Edit(e.target.value)}
        />

        <br /><br />

        <button 
          type="submit" 
          disabled={currQuestionId == 0}>
          
          Update Question
        </button>
      </form>
    </div>
  );
}

export default Quiz;