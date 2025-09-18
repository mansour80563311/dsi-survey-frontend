import { useEffect, useState } from "react";
import { getSurveys } from "../api/survey";
import { useNavigate } from "react-router-dom";
import '../styles/global.css';

function HomePage({ currentUser }) {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSurveys().then(setSurveys);
  }, []);

  const handleClick = (surveyId) => {
    if (!currentUser) {
      // Non connecté → vers login
      navigate("/login");
    } else if (currentUser.role === "admin") {
      // Admin → voir les résultats
      navigate(`/survey/${surveyId}/results`);
    } else {
      // Utilisateur normal → répondre au sondage
      navigate(`/survey/${surveyId}`);
    }
  };

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
                  <p className="text-muted small">
                    📅 Créé le {new Date(survey.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleClick(survey.id)}
                  >
                    ➡️ {currentUser?.role === "admin" ? "Voir résultats" : "Répondre"}
                  </button>
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
