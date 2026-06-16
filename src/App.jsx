import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import HomePage  from './quiz/HomePage'
import NotFoundPage from './quiz/NotFoundPage'
import QuizListPage from './quiz/QuizListPage'
import QuizPage from './quiz/QuizPage'
import ResultsPage from './quiz/ResultsPage'
import Navbar from './quiz/Navbar'

const App = () => {
  return (
    <>
    <Navbar/>
     <Routes>

      {/* exact path "/" → HomePage */}
      <Route path="/"             element={<HomePage />} />

      {/* "/quiz" → QuizListPage */}
      <Route path="/quiz"         element={<QuizListPage />} />

      {/* "/quiz/1" or "/quiz/42" → QuizPage (:id is a URL param) */}
      <Route path="/quiz/:id"     element={<QuizPage />} />

      {/* "/results/1" → ResultsPage */}
      <Route path="/results/:id"  element={<ResultsPage />} />

      {/* "*" catches ALL unmatched URLs → 404 page */}
      <Route path="*"             element={<NotFoundPage />} />

    </Routes>
    </>
  )
}

export default App