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

  const handleRemoveQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
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

  const handleRemoveOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation côté JS
    if (!title.trim()) {
      alert("⚠️ Le titre est obligatoire !");
      return;
    }
    if (questions.some((q) => !q.text.trim())) {
      alert("⚠️ Toutes les questions doivent avoir un texte !");
      return;
    }

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
            <div key={i} className="card p-3 mb-3 border position-relative">
              {/* Supprimer la question */}
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={() => handleRemoveQuestion(i)}
              ></button>

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
                    <div key={j} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Option ${j + 1}`}
                        value={opt}
                        onChange={(e) =>
                          handleChangeOption(i, j, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveOption(i, j)}
                      >
                        ❌
                      </button>
                    </div>
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
