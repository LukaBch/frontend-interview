import { API_URL, BASIC_AUTH } from "@/api/utils";
import { useEffect, useState } from "react";
import { Questionnaire } from "@/data/questionnaires";

export const loadQuestionnaires = async () => {  
    const response = await fetch(`${API_URL}questionnaires/questionnaires/`, {
      method: 'GET',
      headers: {
        'Authorization': BASIC_AUTH,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch questionnaires');
    }
  
    const questionnaires = await response.json();
    return questionnaires;
  };

export const useQuestionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const res = await loadQuestionnaires();
        setQuestionnaires(res);
      } catch (e) {
        setError((e as Error).message);
      }
    };

    fetchQuestionnaires();
  }, []);

  return { questionnaires, error };
};
