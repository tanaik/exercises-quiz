import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Quiz App</h1>

      <Link to="/quiz">
        <button>Take Quiz</button>
      </Link>

    </div>
  );
}

export default HomePage;