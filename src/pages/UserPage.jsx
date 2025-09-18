import { useState } from "react";
import { createUser } from "../api/survey";

function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser({ name, email, role });
      console.log("Réponse du backend:", user);
      setMessage(`✅ Utilisateur créé : ${user.name} (${user.email})`);
      setName("");
      setEmail("");
      setRole("user");
    } catch (err) {
      if (err.message.includes("déjà")) {
        setMessage("⚠️ Cet utilisateur est déjà enregistré !");
      } else {
        setMessage(`❌ ${err.message}`);
      }
    }
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">👤 Créer un utilisateur</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Adresse email</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rôle</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Créer
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-3 ${
              message.startsWith("✅")
                ? "alert-success"
                : message.startsWith("⚠️")
                ? "alert-warning"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUserPage;
