import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SetupForm from "./SetupForm";
const AppContext = React.createContext();

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  computer: 19,
};
const API_ENDPOINT = "https://opentdb.com/api.php?";
const TempURL =
  "https://opentdb.com/api.php?amount=10&category=17&difficulty=hard&type=multiple";
const URL = "";

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetcQuestions = async (url) => {
    try {
      const responce = await axios.get(url);
      const data = responce.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setError(false);
        setIsLoading(false);
        setIsWaiting(false);
        console.log("DATA LENGTH : " + data.length);
      } else {
        setIsWaiting(true);
        setError(true);
      }
      setQuestions(data);
    } catch (error) {}
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;

    fetcQuestions(url);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const newIndex = oldIndex + 1;
      if (newIndex > questions.length - 1) {
        finish();
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  const handleOptionClick = (option, correct_answer) => {
    if (option === correct_answer) {
      setScore((oldScore) => oldScore + 1);
    }
    nextQuestion();
  };

  const finish = () => {
    setScore((currentScore) => {
      openModal(currentScore);
      return currentScore;
    });
  };

  const restartQuiz = (e) => {
    e.preventDefault();
    setScore(0);
    setIndex(0);
    setIsModalOpen(false);
    setIsWaiting(true);
    setIsLoading(false);
  };

  const openModal = (totalScore) => {
    setIsModalOpen(true);
  };
  return (
    <AppContext.Provider
      value={{
        isWaiting,
        questions,
        error,
        isLoading,
        quiz,
        index,
        score,
        isModalOpen,
        handleChange,
        handleSubmit,
        handleOptionClick,
        restartQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
