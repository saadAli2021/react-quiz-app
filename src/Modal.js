import React from "react";
import { UseGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, restartQuiz, score } = UseGlobalContext();
  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="score">Total Score: {score}</div>
            <button className="restart-button" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
