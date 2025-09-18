// AdminResultsPage.jsx
import { useEffect, useState } from "react";
import { getSurveyResults } from "../api/survey";
import ResultsChart from "../components/ResultsChart";
import { Container, Card, Spinner, Alert } from "react-bootstrap";

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
        const res = await fetch("http://localhost:5000/api/surveys");
        const allSurveys = await res.json();

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

  if (loading)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Chargement...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="w-50 py-5">
      <h1 className="mb-4">📊 Tableau complet des résultats</h1>
      {surveys.length === 0 && <Alert variant="info">Aucun sondage trouvé.</Alert>}

      {surveys.map((survey) => (
        <Card key={survey.id} className="mb-5 shadow-sm">
          <Card.Body>
            <Card.Title>{survey.title}</Card.Title>
            <Card.Text className="text-muted">{survey.description}</Card.Text>

            {survey.results.length === 0 && <Alert variant="info">Pas encore de résultats</Alert>}

            {survey.results.map((q) => (
              <Card key={q.questionId} className="mb-4">
                <Card.Body>
                  <Card.Subtitle className="mb-3">{q.text}</Card.Subtitle>
                  <ResultsChart question={q} />
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default AdminResultsPage;
