// ResultsChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Alert } from "react-bootstrap";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function ResultsChart({ question }) {
  if (question.type === "SCALE") {
    return (
      <Alert variant="secondary">
        Moyenne : <strong>{question.results.average ? question.results.average.toFixed(2) : "0"}</strong>{" "}
        (sur {question.results.count} réponses)
      </Alert>
    );
  }

  if (question.type === "MULTIPLE") {
    if (!question.results || question.results.length === 0) {
      return <Alert variant="info">Pas encore de réponses.</Alert>;
    }

    const data = {
      labels: question.results.map((r) => r.label),
      datasets: [
        {
          label: "Votes",
          data: question.results.map((r) => r.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    return (
      <div style={{ maxWidth: "600px" }}>
        <Bar data={data} />
      </div>
    );
  }

  if (question.type === "TEXT") {
    if (!question.results || question.results.length === 0) {
      return <Alert variant="info">Pas encore de réponses.</Alert>;
    }

    return (
      <ul className="list-group">
        {question.results.map((r) => (
          <li key={r.id} className="list-group-item">
            {r.answerString}
          </li>
        ))}
      </ul>
    );
  }

  return <Alert variant="warning">Type de question inconnu</Alert>;
}

export default ResultsChart;
