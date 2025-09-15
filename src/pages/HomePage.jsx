import { useEffect, useState } from "react";
import { getSurveys } from "../api/survey";
import { Link } from "react-router-dom";

function HomePage() {
    const [surveys, setSurveys] = useState([]);
    useEffect(() => {
        getSurveys().then(setSurveys);
    }, []); 
    // list of surveys with links to individual survey pages(liste des sondages)
    return (
        <div>
            <h1>Available Surveys</h1>      
            <ul>
                {surveys.map((survey) => (  
                    <li key={survey.id}>    
                        <Link to={`/survey/${survey.id}`}>{survey.title}</Link> 
                    </li>
                ))}     
            </ul>
        </div>
    );
}       
export default HomePage;