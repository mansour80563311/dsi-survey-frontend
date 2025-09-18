import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSurveyById, submitSurveyResponse } from "../api/survey";

function SurveyPage({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSurveyById(id).then(setSurvey);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentUser) {
      setMessage("❌ Vous devez être connecté pour répondre.");
      return;
    }

    const formData = new FormData(e.target);
    const answers = [];

    formData.forEach((value, key) => {
      if (key.endsWith("[]")) {
        const questionId = parseInt(key.replace("[]", ""), 10);
        answers.push({ questionId, type: "MULTIPLE", value });
      } else {
        const questionId = parseInt(key, 10);
        const q = survey.questions.find((qq) => qq.id === questionId);
        answers.push({ questionId, type: q.type, value });
      }
    });

    try {
      const res = await submitSurveyResponse(id, {
        userId: currentUser.id,
        answers,
      });

      if (res.error === "Vous avez déjà répondu à ce sondage") {
        setMessage("⚠️ Vous avez déjà répondu à ce sondage");
      } else {
        setMessage("✅ Merci pour vos réponses !");
      }

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue. Réessayez.");
    }
  }

  if (!survey) return <p className="text-center my-4">⏳ Chargement...</p>;

  return (
    <div className="container w-50 py-4">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title text-center mb-3">{survey.title}</h1>
          <p className="text-muted text-center">{survey.description}</p>

          {message && (
            <div
              className={`alert ${
                message.startsWith("✅")
                  ? "alert-success"
                  : message.startsWith("⚠️")
                  ? "alert-warning"
                  : "alert-danger"
              } text-center`}
            >
              {message}
            </div>
          )}

          {!message && (
            <form onSubmit={handleSubmit}>
              {survey.questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <label className="form-label fw-bold">{q.text}</label>

                  {q.type === "SCALE" && (
                    <input
                      type="number"
                      name={q.id}
                      min="1"
                      max="5"
                      required
                      className="form-control"
                      placeholder="Notez entre 1 et 5"
                    />
                  )}

                  {q.type === "MULTIPLE" &&
                    q.options.map((opt) => (
                      <div className="form-check" key={opt.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={`${q.id}[]`}
                          value={opt.id}
                          id={`opt-${opt.id}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`opt-${opt.id}`}
                        >
                          {opt.label}
                        </label>
                      </div>
                    ))}

                  {q.type === "TEXT" && (
                    <textarea
                      name={q.id}
                      rows="3"
                      className="form-control"
                      placeholder="Votre réponse..."
                    />
                  )}
                </div>
              ))}

              <button type="submit" className="btn btn-primary w-100">
                📤 Envoyer mes réponses
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;
