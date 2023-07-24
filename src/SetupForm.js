import React from "react";
import { UseGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit } = UseGlobalContext();
  return (
    <div className="form-container">
      <form>
        <div className="form-row">
          <label htmlFor="category">Quiz Category:</label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={quiz.category}
          >
            <option value="sports">Sports</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
            <option value="computer">Computer</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="numOfQuestions">Number of Questions:</label>
          <input
            onChange={handleChange}
            type="number"
            id="numOfQuestions"
            name="amount"
            min="1"
            max="100"
            value={quiz.amount}
          />
        </div>
        <div className="form-row">
          <label htmlFor="difficulty">Difficulty Level:</label>
          <select
            id="difficulty"
            name="difficulty"
            onChange={handleChange}
            value={quiz.difficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-row">
          <button type="submit" onClick={handleSubmit}>
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupForm;
