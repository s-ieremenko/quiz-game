import React, { useEffect, useState } from 'react';
import styles from './QuizPage.module.css'
import Quiz from "../Quiz/Quiz";

const QuizPage = () => {
    const [quizes, setQuizes] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [isEnd, setIsEnd] = useState(false)


    const url = 'https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple'

    const getQuizWithRandomAnswersOrder = (array) => {
        return array.map(item => ({
            ...item,
            allAnswers: shuffleArray([item.correct_answer, ...item.incorrect_answers])

        }))
    }

    const fetchData = () => {
        fetch(url, {
            mode: 'cors'
        })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json()
                } else {
                    // setIsLoading(false)
                    // setIsError(true)
                    throw new Error(res.statusText)
                }
            }).then(res => {
            setQuizes(getQuizWithRandomAnswersOrder(res.results))


        }).catch(e => console.log(e))
    }


    useEffect(() => {
        fetchData()
    }, [])

    const handleStartClick = () => {
        setIsEnd(false)
        setIsSubmitted(false)
        setCorrectAnswers([])
        setSelectedAnswers({})
        fetchData()


    }

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }

    const isDisabled = Object.keys(selectedAnswers).length !== quizes.length

    const handleClick = () => {
        if (!isDisabled) {
            const correctResults = quizes.filter(quiz => {
                return quiz.correct_answer === selectedAnswers?.[quiz.question]
            })
            correctResults && setCorrectAnswers(prev => [...prev, ...correctResults])
            setIsSubmitted(true)
            setIsEnd(true)
        }


    }


    return (
        <div className={styles.containerFluid}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    {quizes?.map(quiz => {
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
                                           disabled={isDisabled}>CheckAnswers
                        </button>}
                        {isEnd &&
                            <>
                                <span>Correct answers: {correctAnswers.length}/{quizes.length}</span>
                                <button className={styles.startButton} onClick={handleStartClick}>Play again</button>
                            </>}
                    </footer>


                </div>
            </div>
        </div>


    );
};

export default QuizPage;