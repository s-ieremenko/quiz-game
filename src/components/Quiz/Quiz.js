import React from 'react';

import styles from './Quiz.module.css'

const Quiz = (props) => {
    const { question, answers, selectedAnswers, setSelectedAnswers, isSubmitted, correct_answer } = props

    const handleClick = (question, answer) => () => {
        setSelectedAnswers(prev => ({ ...prev, [question]: answer }))
    }


    const handleSelect = (answer) => {
        if (isSubmitted) {
            if (answer === correct_answer) {
                return 'green'
            } else if (answer === selectedAnswers[question]) {
                return 'wrong'
            }
        } else if (answer === selectedAnswers[question]) {
            return 'selectedButton'

        }
        return 'answerButton'
    }

    return (
        <section className={styles.quizContainer}>

            <h3>{question}</h3>
            <ul className={styles.answersList}>
                {answers.map(answer => {
                    return <li key={answer}>
                        <button
                            className={styles[handleSelect(answer)]}
                            onClick={handleClick(question, answer)}>{answer}</button>
                    </li>
                })}
            </ul>

        </section>

    );
};

export default Quiz;