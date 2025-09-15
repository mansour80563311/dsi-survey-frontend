import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveyResults } from "../api/survey";
import ResultsChart from "../components/ResultsChart";

function ResultsPage() {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const data = await getSurveyResults(id);
        setResults(data);
      } catch (err) {
        console.error("Erreur de chargement résultats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!results) return <p>❌ Aucun résultat trouvé</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Résultats : {results.survey.title}</h1>

      {results.results.map((q) => (
        <div key={q.questionId} style={{ marginBottom: "30px" }}>
          <h3>{q.text}</h3>
          <ResultsChart question={q} />
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;
