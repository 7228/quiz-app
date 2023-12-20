import { Link } from "react-router-dom"

export default function Home() {
    return(
        <div className="opening-window-home">
                <div className="top-right"></div>
                <div className="bottom-left"></div>
                <div className="quiz-main-content">
                    <h1 className="header">Quizzical</h1>
                    <h3 className="quiz-description">
                        Check Your General Knowledge Through This Quiz.
                    </h3>
                    <Link to="/quiz"><button className="start-quiz">Start Quiz</button></Link>
                </div> 
        </div>
    )
}