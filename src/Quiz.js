import { useContext, useState } from "react"
import AppContext from "./AppContext";
import Question from "./Question";
import { nanoid } from "nanoid";


export default function Quiz() {
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
   

    const { questions, setQuestions, checkAnswers, setCheckAnswers, startQuiz,setStartQuiz } = useContext(AppContext);

    function selectAnswer(id,buttonId) {
        setQuestions(oldQuestions => oldQuestions.map(question => {
            return question.answers[buttonId].answerId === id ?
                {...question, selected: question.answers[buttonId].answerId} :
                question
        }))
    }

    function countCorrectAnswers() {
        const correct = [];
        const result = questions.forEach((question) => {
            const selectedAnswer = question.selected;
            const correctAnswer = question.correct;
            question.answers.forEach((answer) => {
                if(answer.answerId === selectedAnswer && answer.answer === correctAnswer) {
                    correct.push(answer)
                } else if(answer.answer !== correctAnswer) {
                    setIncorrectAnswers(oldAnswers => {
                        return [
                            ...oldAnswers,
                            answer
                        ]
                    })
                }
            })
        })
        
        setCorrectAnswers(correct.length)
    }

    function viewAnswers() {
        setCheckAnswers(oldValue => !oldValue)
        setStartQuiz(oldValue => !oldValue)
        setQuestions(oldQuestions => oldQuestions.map(question => {
            return {...question, checked: question.selected}
        }))
        countCorrectAnswers()

    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

    function newGame() {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                let q = []
                data.results.forEach(question => {
                    q.push({
                        id:nanoid(),
                        answers:shuffleArray([...question.incorrect_answers, question.correct_answer]).map(item => {
                            return {answer:item, answerId:nanoid()}
                        }),
                        selected:"",
                        correct:question.correct_answer,
                        checked:"",
                        question:question.question})
                    })
                setQuestions(q)});
                setStartQuiz(true);
                setCheckAnswers(false);
                setCorrectAnswers(0);
                setIncorrectAnswers([]);
    }
    

    const questionsWithFourAnswers = questions.map(question => {
        return(
                <Question
                    question= {question}
                    title = {question.question}
                    answers = {question.answers}
                    select = {selectAnswer}
                    selected = {question.selected}
                    checkedAnswer = {question.checked}
                    correctAnswer = {question.correct}
                    id={question.id}
                    key={question.id}
                    incorrectAnswers={incorrectAnswers}
                    checkAnswers={checkAnswers}
                />
        )
    })

 
    return(
        <div className="opening-window">
            <div className="top-right-quiz"></div>
            <div className="main-content">
                {questionsWithFourAnswers}
            </div>
            <div className="result">
                {checkAnswers ? 
                    <h2>You Answered <strong>{correctAnswers}/5</strong> Questions Correctly</h2> :
                    <h1></h1>    
            }
            </div>
            <button className={startQuiz ? "check-answers" : "new-game"} onClick={startQuiz ? viewAnswers : newGame}>{startQuiz ? "Check Answers" : "New Game"}</button>
        </div>
    )
    
}