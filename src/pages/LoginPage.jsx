import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // réinitialiser le message

    try {
      // Appel backend pour login
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json(); // lire le corps JSON UNE seule fois

      if (!res.ok) {
        // Si le backend renvoie une erreur
        setMessage(`❌ ${data.error || "Erreur de connexion"}`);
        return;
      }

      // Utilisateur trouvé
      console.log("Utilisateur connecté:", data);
      setCurrentUser(data); // stocker l'utilisateur globalement
      setMessage(`✅ Bienvenue ${data.name} (${data.role})`);

      // Redirection selon rôle
      if (data.role === "admin") navigate("/admin");
      else navigate("/"); // page d'accueil pour les utilisateurs

    } catch (err) {
      console.error(err);
      setMessage("❌ Impossible de contacter le serveur");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
