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
    <div style={{ padding: "20px" }}>
      <h1>Créer un utilisateur</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateUserPage;
