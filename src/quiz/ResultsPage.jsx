import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const ResultsPage = () => {
  const {id} = useParams();
  const location = useLocation();
  
   const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get("questionId");
  const quizId = queryParams.get("quizId");

  return (
    <div>{`ResultsPage-${id},${questionId},${quizId}`}</div>
  )
}

export default ResultsPage