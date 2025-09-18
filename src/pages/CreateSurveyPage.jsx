import { useState } from "react";
import { createSurvey } from "../api/survey";

function CreateSurveyPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", type: "TEXT", options: [] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", type: "TEXT", options: [] }]);
  };

  const handleChangeQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    if (field === "type" && value !== "MULTIPLE") {
      updated[index].options = [];
    }

    setQuestions(updated);
  };

  const handleAddOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleChangeOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const surveyData = { title, description, questions };
    console.log("Envoi surveyData :", surveyData);

    try {
      const res = await createSurvey(surveyData);
      alert("✅ Sondage créé !");
      console.log(res);
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la création du sondage");
    }
  };

  return (
    <div className="container w-50 py-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">📝 Créer un sondage</h2>

        <form onSubmit={handleSubmit}>
          {/* Champ Titre */}
          <div className="mb-3">
            <label className="form-label">Titre du sondage</label>
            <input
              type="text"
              className="form-control"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Champ Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Description du sondage"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Questions */}
          <h4 className="mt-4">Questions</h4>
          {questions.map((q, i) => (
            <div key={i} className="card p-3 mb-3 border">
              <div className="mb-3">
                <label className="form-label">Texte de la question</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Écrivez la question"
                  value={q.text}
                  onChange={(e) =>
                    handleChangeQuestion(i, "text", e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Type de question</label>
                <select
                  className="form-select"
                  value={q.type}
                  onChange={(e) =>
                    handleChangeQuestion(i, "type", e.target.value)
                  }
                >
                  <option value="TEXT">Texte libre</option>
                  <option value="SCALE">Échelle (1-5)</option>
                  <option value="MULTIPLE">Choix multiple</option>
                </select>
              </div>

              {q.type === "MULTIPLE" && (
                <div>
                  <h6>Options</h6>
                  {q.options.map((opt, j) => (
                    <input
                      key={j}
                      type="text"
                      className="form-control mb-2"
                      placeholder={`Option ${j + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleChangeOption(i, j, e.target.value)
                      }
                      required
                    />
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleAddOption(i)}
                  >
                    ➕ Ajouter une option
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Ajouter une nouvelle question */}
          <button
            type="button"
            className="btn btn-outline-success mb-3"
            onClick={handleAddQuestion}
          >
            ➕ Ajouter une question
          </button>

          {/* Bouton Submit */}
          <div>
            <button type="submit" className="btn btn-primary w-100">
              ✅ Créer le sondage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSurveyPage;
