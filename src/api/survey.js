const Api_URL = 'http://localhost:5000/api';

export async function getSurveys() {
  const response = await fetch(`${Api_URL}/surveys`);
    return response.json();
}

export async function getSurveyById(id) {
  const response = await fetch(`${Api_URL}/surveys/${id}`);
    return response.json();
}

// Fonction pour créer un nouveau sondage
export async function createSurvey(surveyData) {
    const response = await fetch(`${Api_URL}/surveys`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify(surveyData),
    });
    return response.json();
}

// --- Users ---
export async function createUser(userData) {
  const response = await fetch(`${Api_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    // lève une erreur avec le message reçu du backend
    throw new Error(data.error || "Erreur lors de la création de l'utilisateur");
  }

  return data; // retourne l'utilisateur créé
}

export async function getUsers() {
  const response = await fetch(`${Api_URL}/users`);
  return response.json();
}

export async function submitSurveyResponse(surveyId, responses) {
    const response = await fetch(`${Api_URL}/surveys/${surveyId}/responses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(responses),
    });
    return response.json();
}

export async function getSurveyResults(surveyId) {
    const response = await fetch(`${Api_URL}/results/${surveyId}`);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des résultats");
    }
    return response.json();
}           


