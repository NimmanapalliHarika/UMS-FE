/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/w9gsS6YM8gD
 */

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Logo from "../../../assets/Logo/logo.png";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const data = [
  {
    id: 1,
    question: "20+6=?",
    options: ["26", "20", "24", "28"],
    correctAnswer: "26",
  },
  {
    id: 2,
    question: "2+2=?",
    options: ["1", "2", "4", "3"],
    correctAnswer: "4",
  },
  {
    id: 3,
    question: "14/7 =?",
    options: ["5", "2", "4", "3"],
    correctAnswer: "2",
  },
  // Add more questions as needed
  {
    id: 4,
    question: "20*2",
    options: ["40", "30", "10", "0"],
    correctAnswer: "40",
  },
  {
    id: 5,
    question: "0-1",
    options: ["2", "-1", "0", "-2"],
    correctAnswer: "-1",
  },
];

export default function Assessmentpage({ assessments }) {
  const { assessment } = useParams();

  const selectedAssessment = assessments.find((a) => a.id === assessment);
  useEffect(() => {}, [selectedAssessment]);

  const assesmentRef = useRef(null);
  useGSAP(() => {
    gsap.from(assesmentRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
    });
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(data.length).fill(null)
  );
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrectAnswers, setIsCorrectAnswers] = useState(
    Array(data.length).fill(false)
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(data.length * 60); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          // Time is up, handle logic here (e.g., show quiz completed screen)
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts or the quiz is completed
    return () => clearInterval(timer);
  }, [questionIndex, timeLeft]);

  const handleTimeUp = () => {
    // Handle logic when time is up (e.g., show quiz completed screen)
    setQuestionIndex(data.length);
  };
  const question = data[questionIndex];

  const handleOptionChange = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmitAnswer = () => {
    // Logic to handle the submitted answer for the current question
    const isCorrect = selectedOptions[questionIndex] === question.correctAnswer;
    console.log(
      `Selected Option: ${selectedOptions[questionIndex]}, Correct Answer: ${question.correctAnswer}, Correct: ${isCorrect}`
    );

    // Update isCorrectAnswers for the current question
    const newIsCorrectAnswers = [...isCorrectAnswers];
    newIsCorrectAnswers[questionIndex] = isCorrect;
    setIsCorrectAnswers(newIsCorrectAnswers);

    // Update the score
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
    setQuestionIndex((prev) => prev + 1);
    // Move to the next question

    // Reset answerSubmitted for the new question
    setAnswerSubmitted(false);
  };

  // Check if all questions are answered
  const allQuestionsAnswered = selectedOptions.every(
    (option) => option !== null
  );

  //previous button
  const handlePrevButtonClick = () => {
    setQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  //next button
  const handleNextButtonClick = () => {
    if (questionIndex < data.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("The End");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#040404] dark:bg-gray-900">
      <header className="flex items-center h-10 mb-5 dark:bg-gray-900  w-[95%] fixed top-12">
        <nav className="flex items-center justify-between w-[100%]  px-10 py-0">
          <div className="flex gap-4">
            <div className=" h-[100px] w-[100px] flex items-center justify-center relative overflow-hidden">
              <img className="object-cover " src={Logo} alt="" />
            </div>

            <div className="flex items-center space-x-4">
              {/* <LayoutDashboardIcon className="w-6 h-6" /> */}
              <span className="text-xl font-semibold  py-2  text-[#B3CCC2] rounded-md ">
                {selectedAssessment.title}
              </span>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    alt="User avatar"
                    src="https://imgs.search.brave.com/J0ixr3aHGA8aitBrET8u4exc5KcrQl8PWXGrvAdsUY4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/YWJzdHJhY3QtdXNl/ci1mbGF0LTQucG5n"
                  />
                  {/* <AvatarFallback>JD</AvatarFallback> */}
                </Avatar>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </nav>
      </header>
      <div className="w-[75%] p-4 space-y-4 mt-5" ref={assesmentRef}>
        {questionIndex < data.length ? (
          <div className="flex flex-col p-6 bg-[#ECF0F1] rounded-lg shadow-md dark:bg-gray-800">
            <h1 className="mb-4 text-2xl font-bold text-center text-[#040404] dark:text-white">
              Assessment Questions
            </h1>
            <p className="text-right text-[#040404]">
              <b> Time Left</b>: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
            <br />
            <h2 className="text-lg font-bold text-[#040404] dark:text-white">{`Question ${question.id}`}</h2>
            <p className="mt-2  text-lg text-[#040404] dark:text-gray-400">
              {question.question}
            </p>
            <div className="mt-4 space-y-2">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`block  text-left dark:bg-gray-700 rounded-md p-3 cursor-pointer bg-gray-300 text-[#040404] font-semibold`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    value={option}
                    checked={option === selectedOptions[questionIndex]}
                    onChange={() => handleOptionChange(option)}
                    disabled={answerSubmitted}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6 space-x-4">
              <div className="flex gap-5">
                <button
                  onClick={handlePrevButtonClick}
                  className="px-4 py-2 text-sm font-medium text-[#A8ABBA] bg-[#040404] rounded-md hover:bg-[#B3CCC2]  hover:text-[#040404] focus:outline-none"
                >
                  Prev
                </button>
                {questionIndex === data.length - 1 ? (
                  <button
                    onClick={handleSubmitAnswer}
                    className={`px-4 py-2 text-sm font-medium text-[#A8ABBA] bg-[#040404] rounded-md hover:bg-[#B3CCC2]  hover:text-[#040404] focus:outline-none `}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNextButtonClick}
                    className="px-4 py-2 text-sm font-medium text-[#A8ABBA] bg-[#040404] rounded-md ]  hover:text-[#040404] hover:bg-[#B3CCC2] focus:outline-none"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col p-6 bg-[#ECF0F1] rounded-lg      shadow-md dark:bg-gray-800">
            <h1 className="mb-4 text-2xl font-bold text-center text-[#040404] dark:text-white">
              Assessment Submitted Successfully!
            </h1>
            <p className="text-lg text-center text-gray-700 dark:text-white">
              Thank you for completing the assessment.
            </p>
            <br />
            <div>
              <Link to="/studentui">
                <button className="px-6 py-3 text-lg  font-semibold rounded-md  bg-[#96b1a7] text-[#040404] hover:bg-[#040404] hover:text-[#ECF0F1] focus:outline-none">
                  Back To Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
