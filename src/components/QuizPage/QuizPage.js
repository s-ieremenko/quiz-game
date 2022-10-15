import React, { useEffect, useState } from 'react';

import styles from './QuizPage.module.css'
import Quiz from "../Quiz/Quiz";

const QuizPage = () => {
    const [quizes, setQuizes] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [isEnd, setIsEnd] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [quizesPerPage] = useState(5)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isNewGame, setIsNewGame] = useState(false)
    const [score, setScore] = useState(0)

    const url = 'https://opentdb.com/api.php?amount=50&category=27&type=multiple'

    const getQuizWithRandomAnswersOrder = (array) => {
        return array.map(item => ({
            ...item,
            allAnswers: shuffleArray([item.correct_answer, ...item.incorrect_answers])

        }))
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, {
                    mode: 'cors'
                })
                const data = await res.json()
                setQuizes(getQuizWithRandomAnswersOrder(data.results))
                setLoading(false)
            } catch (e) {
                setError(e)
            }
        }
        fetchData().then(resp => resp)

    }, [isNewGame])

    const clearSettings = () => {
        setIsEnd(false)
        setIsSubmitted(false)
        setCorrectAnswers([])
        setSelectedAnswers({})
    }

    const handleNextClick = () => {
        clearSettings()
        setCurrentPage(prev => prev + 1)
    }

    const handleNewGameClick = () => {
        clearSettings()
        setIsNewGame(true)
    }

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }

    const indexOfLastQuiz = currentPage * quizesPerPage
    const indexOfFirstQuiz = indexOfLastQuiz - quizesPerPage
    const currentQuizesList = quizes.slice(indexOfFirstQuiz, indexOfLastQuiz)

    const checkAnswersIsDisabled = Object.keys(selectedAnswers).length !== currentQuizesList.length

    const isLastPage = Math.ceil(quizes.length / quizesPerPage) === currentPage
    const nextButtonTitle = isLastPage ? 'New game' : 'Next quiz'


    const handleClick = () => {
        if (!checkAnswersIsDisabled) {
            const correctResults = currentQuizesList.filter(quiz => {
                return quiz.correct_answer === selectedAnswers?.[quiz.question]
            })
            correctResults && setCorrectAnswers(prev => [...prev, ...correctResults])
            setIsSubmitted(true)
            setIsEnd(true)
            setScore(prev => prev + correctResults.length)
        }
    }


    if (loading) {
        return <h3>loading ...</h3>
    }
    if (error) {
        return <h3>Error</h3>
    }


    return (
        <div className={styles.containerFluid}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    {currentQuizesList?.map(quiz => {
                        const {
                            question, allAnswers, correct_answer,
                        } = quiz

                        return <Quiz key={question} question={question} answers={allAnswers}
                                     selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}
                                     isSubmitted={isSubmitted} correct_answer={correct_answer}
                        />
                    })}
                    <footer>
                        {!isEnd && <button className={styles.checkButton} onClick={handleClick}
                                           disabled={checkAnswersIsDisabled}>CheckAnswers
                        </button>}
                        {isEnd &&
                            <>
                                <div className={styles.scoreContainer}>
                                    <p>Correct answers: {correctAnswers.length}/{currentQuizesList.length}</p>
                                    {isSubmitted && isLastPage && <p>Total correct answers: {score}/{quizes.length}</p>}
                                </div>
                                <button className={styles.startButton}
                                        onClick={isLastPage ? handleNewGameClick : handleNextClick}>{nextButtonTitle}</button>
                            </>}

                    </footer>


                </div>
            </div>
        </div>


    );
};

export default QuizPage;