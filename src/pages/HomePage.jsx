import { useEffect, useState } from "react";
import { getSurveys } from "../api/survey";
import { Link } from "react-router-dom";
import '../styles/global.css';

function HomePage() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    getSurveys().then(setSurveys);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">📋 Sondages disponibles</h1>

      {surveys.length === 0 ? (
        <p className="text-center text-muted">Aucun sondage disponible.</p>
      ) : (
        <div className="row">
          {surveys.map((survey) => (
            <div key={survey.id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{survey.title}</h5>
                  <p className="card-text text-muted">
                    {survey.description || "Pas de description."}
                  </p>
                  <Link
                    to={`/survey/${survey.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    ➡️ Répondre
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
