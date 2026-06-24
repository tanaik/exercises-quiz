import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import HomePage  from './quiz/HomePage'
import NotFoundPage from './quiz/NotFoundPage'
import QuizListPage from './quiz/QuizListPage'
import QuizPage from './quiz/QuizPage'
import ResultsPage from './quiz/ResultsPage'
import Navbar from './quiz/Navbar'
import QuizManage from './quizManage'

const App = () => {
  return (
    <>
    <Navbar/>
     <Routes>

      <Route path="/"             element={<HomePage />} />

    <Route path="/admin"        element={<QuizManage />} />

    <Route path="/quiz"         element={<QuizListPage />} />

    <Route path="/quiz/:id"     element={<QuizPage />} />

    <Route path="/results/:id"  element={<ResultsPage />} />

    <Route path="*"             element={<NotFoundPage />} />

    </Routes>
    </>
  )
}

export default App