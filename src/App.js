import logo from "./logo.svg";
import "./App.css";
import SetupForm from "./SetupForm";
import { UseGlobalContext } from "./context";
import Loading from "./Loading";
import Modal from "./Modal";

function App() {
  const { isWaiting, isLoading, error, handleOptionClick, questions, index } =
    UseGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }
  if (isLoading) {
    return <Loading />;
  }
  const { incorrect_answers, correct_answer, question, difficulty } =
    questions[index];
  const options = [...incorrect_answers, correct_answer];
  return (
    <div className="App">
      <Modal />
      <div className="quiz-container">
        <p className="quiz-info">
          Total Questions: {questions.length} | Questions Answered: {index}
        </p>
        <div className="question">
          <p className="question-text">{question}</p>
          <ul className="options">
            {options.map((option, index) => {
              return (
                <li
                  key={index}
                  className="option"
                  onClick={() => handleOptionClick(option, correct_answer)}
                >
                  {index + 1 + " . " + option}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
