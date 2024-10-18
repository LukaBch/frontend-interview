import { Question } from "@/data/questions";
import { API_URL, PASSWORD, sleep, USERNAME } from "@/api/utils";
import { useEffect, useState } from "react";


export const loadQuestions = async (questionnaireId: number) => {
  const basicAuth = 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);
  
  const response = await fetch(`${API_URL}questionnaires/questions/?questionnaires=${questionnaireId}`, {
      method: 'GET',
      headers: {
          'Authorization': basicAuth,
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch questions');
  }

  const questionnaires = await response.json();
  return questionnaires;
};

export interface SharedQuestion {
  token: string;
  questionId: number;
}

export const useQuestions = (questionnaireId: number, sharedQuestion?: SharedQuestion) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (sharedQuestion) {
          const res = await loadQuestionWithSharingToken(questionnaireId, sharedQuestion.questionId, sharedQuestion.token);
          setQuestions([res]);
        } else {
          const res = await loadQuestions(questionnaireId);
          setQuestions(res);
        }
      } catch (e) {
        setError((e as Error).message);
      }
    };

    fetchQuestions();
  }, [questionnaireId, sharedQuestion?.token, sharedQuestion?.questionId]);

  return { questions, error };
};

export const loadQuestionWithSharingToken = async (
  questionnaireId: number,
  questionId: number,
  token: string,
) => {
  const response = await fetch(`${API_URL}questionnaires/questions/?questionnaires=${questionnaireId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
    },
  });

if (!response.ok) {
  throw new Error('Failed to fetch questions');
}

const questionnaires = await response.json();
return questionnaires.find((question: Question) => question.id === questionId);
};
