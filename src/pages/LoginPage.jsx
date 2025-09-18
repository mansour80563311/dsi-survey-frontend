import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "Erreur de connexion"}`);
        return;
      }

      console.log("Utilisateur connecté:", data);
      setCurrentUser(data);
      setMessage(`✅ Bienvenue ${data.name} (${data.role})`);

      if (data.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("❌ Impossible de contacter le serveur");
    }
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">🔐 Connexion</h2>

        <form onSubmit={handleLogin}>
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

          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-3 ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
