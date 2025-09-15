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

    // reset options if type is not MULTIPLE
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

    const surveyData = {
      title,
      description,
      questions,
    };

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
    <div>
      <h1>Créer un nouveau sondage</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <h2>Questions</h2>
        {questions.map((q, i) => (
          <div key={i} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <input
              type="text"
              placeholder="Texte de la question"
              value={q.text}
              onChange={(e) => handleChangeQuestion(i, "text", e.target.value)}
              required
            />
            <select
              value={q.type}
              onChange={(e) => handleChangeQuestion(i, "type", e.target.value)}
            >
              <option value="TEXT">Texte libre</option>
              <option value="SCALE">Échelle (1-5)</option>
              <option value="MULTIPLE">Choix multiple</option>
            </select>

            {q.type === "MULTIPLE" && (
              <div>
                <h4>Options</h4>
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    type="text"
                    placeholder={`Option ${j + 1}`}
                    value={opt}
                    onChange={(e) => handleChangeOption(i, j, e.target.value)}
                    required
                  />
                ))}
                <button type="button" onClick={() => handleAddOption(i)}>
                  ➕ Ajouter option
                </button>
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          ➕ Ajouter question
        </button>
        <br />
        <button type="submit">Créer le sondage</button>
      </form>
    </div>
  );
}

export default CreateSurveyPage;