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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function ResultsChart({ question }) {
  if (question.type === "SCALE") {
    return (
      <p>
        Moyenne :{" "}
        <strong>
          {question.results.average
            ? question.results.average.toFixed(2)
            : "0"}
        </strong>{" "}
        (sur {question.results.count} réponses)
      </p>
    );
  }

  if (question.type === "MULTIPLE") {
    if (!question.results || question.results.length === 0) {
      return <p>Pas encore de réponses.</p>;
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
      <div style={{ maxWidth: "500px" }}>
        <Bar data={data} />
      </div>
    );
  }

  if (question.type === "TEXT") {
    if (!question.results || question.results.length === 0) {
      return <p>Pas encore de réponses.</p>;
    }

    return (
      <ul>
        {question.results.map((r) => (
          <li key={r.id}>{r.answerString}</li>
        ))}
      </ul>
    );
  }

  return <p>Type de question inconnu</p>;
}

export default ResultsChart;
