import { API_URL, BASIC_AUTH } from "@/api/utils";

export const getSharingToken = async (questionnaireId: number) => {  
  const response = await fetch(`${API_URL}questionnaires/token/`, {
      method: 'POST',
      headers: {
          'Authorization': BASIC_AUTH,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionnaire_id:questionnaireId }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }

  const questionnaires = await response.json();
  return questionnaires.token;
};
