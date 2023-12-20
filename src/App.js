import React from "react"
import Question from "./Question"
import {nanoid} from 'nanoid'
import { Route, Routes } from "react-router"
import Home from "./Home"
import AppContext from "./AppContext"
import Quiz from "./Quiz"

export default function App() {
    const [startQuiz, setStartQuiz] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    
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
                setQuestions(q)})
                setStartQuiz(true)
                setCheckAnswers(false)
    }
    
    React.useEffect(() => {
        newGame()
    },[])
      
      
    let answersId = [];
    questions.map(question => {
        question.answers.map(ans => {
            answersId.push({
                answer:ans,
                answerId:nanoid()
            })
        })
    })
                                                                                            
    return(

       <div className="main">
            <AppContext.Provider value={{
                questions, setQuestions,
                startQuiz, setStartQuiz,
                checkAnswers, setCheckAnswers,
                }}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/quiz" element={<Quiz />}></Route>
                </Routes>
            </AppContext.Provider>
       </div>       
    )
}
