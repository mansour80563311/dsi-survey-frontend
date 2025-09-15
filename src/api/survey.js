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


