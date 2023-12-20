import React from "react"
import he from "he"

export default function Question(props) {
    function buttonClassName(id) {
        let buttonClass;
        
        props.checkedAnswer === props.answers[id].answerId ?
        props.correctAnswer === props.answers[id].answer ?
        buttonClass = "correct-button" :
        buttonClass = "checked-button" :
        props.selected === props.answers[id].answerId ?
        buttonClass = "answer-button-selected" :
        props.correctAnswer === props.answers[id].answer && props.checkAnswers === true ?
        buttonClass = "correct-button" :
        buttonClass = "answer-button"
        
        return buttonClass
    }
    return (
        <div>
            <h1 className="question-title">{he.decode(props.title)}</h1>
                <div className="quiz-container">
                    <button
                        className={buttonClassName(0)}
                        onClick={() => props.select(props.answers[0].answerId,0)}>{he.decode(props.answers[0].answer)}
                    </button>
                    <button 
                        className={buttonClassName(1)}
                        onClick={() => props.select(props.answers[1].answerId,1)}>{he.decode(props.answers[1].answer)}
                    </button>
                    <button 
                        className={buttonClassName(2)}
                        onClick={() => props.select(props.answers[2].answerId,2)}>{he.decode(props.answers[2].answer)}
                    </button>
                    <button 
                        className={buttonClassName(3)}
                        onClick={() => props.select(props.answers[3].answerId,3)}>{he.decode(props.answers[3].answer)}
                    </button>
                </div>      
            
        </div>    
    )
}