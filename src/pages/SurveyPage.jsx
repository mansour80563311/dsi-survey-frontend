import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSurveyById, submitSurveyResponse } from "../api/survey";

function SurveyPage({ currentUser }) { // ✅ recevoir currentUser en props
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
        userId: currentUser.id, // ✅ utiliser l'utilisateur connecté
        answers,
      });

      if (res.error === "Vous avez déjà répondu à ce sondage") {
        setMessage("⚠️ Vous avez déjà répondu à ce sondage");
      } else {
        setMessage("✅ Merci pour vos réponses !");
      }

      // Redirection vers l'accueil après 2s
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue. Réessayez.");
    }
  }

  if (!survey) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>

      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}

      {!message && (
        <form onSubmit={handleSubmit}>
          {survey.questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "20px" }}>
              <p><strong>{q.text}</strong></p>

              {q.type === "SCALE" && (
                <input
                  type="number"
                  name={q.id}
                  min="1"
                  max="5"
                  required
                  placeholder="Notez entre 1 et 5"
                />
              )}

              {q.type === "MULTIPLE" &&
                q.options.map((opt) => (
                  <label key={opt.id} style={{ display: "block" }}>
                    <input type="checkbox" name={`${q.id}[]`} value={opt.id} />
                    {opt.label}
                  </label>
                ))}

              {q.type === "TEXT" && (
                <textarea
                  name={q.id}
                  rows="3"
                  cols="40"
                  placeholder="Votre réponse..."
                />
              )}
            </div>
          ))}
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
}

export default SurveyPage;
