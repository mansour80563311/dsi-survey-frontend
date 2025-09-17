import { useEffect, useState } from "react";
import { getSurveyResults } from "../api/survey";
import ResultsChart from "../components/ResultsChart";

function AdminResultsPage({ currentUser }) {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      setError("⚠️ Vous n'avez pas accès à cette page.");
      setLoading(false);
      return;
    }

    async function fetchAllResults() {
      try {
        // Récupérer tous les sondages
        const res = await fetch("http://localhost:5000/api/surveys");
        const allSurveys = await res.json();

        // Pour chaque sondage, récupérer ses résultats
        const surveysWithResults = await Promise.all(
          allSurveys.map(async (survey) => {
            try {
              const resultsData = await getSurveyResults(survey.id);
              return { ...survey, results: resultsData.results };
            } catch {
              return { ...survey, results: [] };
            }
          })
        );

        setSurveys(surveysWithResults);
      } catch (err) {
        console.error(err);
        setError("❌ Impossible de récupérer les sondages ou résultats.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllResults();
  }, [currentUser]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Tableau complet des résultats</h1>
      {surveys.length === 0 && <p>Aucun sondage trouvé.</p>}

      {surveys.map((survey) => (
        <div key={survey.id} style={{ marginBottom: "40px" }}>
          <h2>{survey.title}</h2>
          <p>{survey.description}</p>

          {survey.results.length === 0 && <p>Pas encore de résultats</p>}

          {survey.results.map((q) => (
            <div key={q.questionId} style={{ marginBottom: "30px" }}>
              <h3>{q.text}</h3>
              <ResultsChart question={q} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminResultsPage;
