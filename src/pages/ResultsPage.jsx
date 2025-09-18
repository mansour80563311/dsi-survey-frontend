// ResultsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveyResults } from "../api/survey";
import ResultsChart from "../components/ResultsChart";
import { Container, Card, Spinner, Alert } from "react-bootstrap";

function ResultsPage() {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const data = await getSurveyResults(id);
        console.log(data);
        setResults(data);
      } catch (err) {
        console.error("Erreur de chargement résultats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [id]);

  if (loading)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Chargement...</p>
      </Container>
    );

  if (!results) return (
    <Container className="py-5">
      <Alert variant="danger">❌ Aucun résultat trouvé</Alert>
    </Container>
  );

  return (
    <Container className="w-50 py-5">
      <h1 className="mb-4">📊 Résultats : {results.survey.title}</h1>
      

      {results.results.length === 0 && (
        <Alert variant="info">Pas encore de résultats pour ce sondage.</Alert>
      )}

      {results.results.map((q) => (
        <Card key={q.questionId} className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-3 fw-bold">{q.text}</Card.Subtitle>
            <ResultsChart question={q} />
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ResultsPage;
