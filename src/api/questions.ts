import { Question, QUESTIONNAIRE_ID, questions } from "@/data/questions";
import { sleep } from "@/api/utils";
import { SHARING_TOKEN } from "@/data/token";
import { useEffect, useState } from "react";

export const loadQuestions = async (questionnaireId: number) => {
  await sleep(1000);
  if (questionnaireId !== QUESTIONNAIRE_ID)
    throw Error("Unknown questionnaire.");
  return questions;
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
          const res = await loadQuestionWithSharingToken(sharedQuestion.questionId, sharedQuestion.token);
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
  questionId: number,
  token: string,
) => {
  await sleep(1000);
  if (token != SHARING_TOKEN) throw Error("Wrong token");
  const question = questions.find((q) => q.id === questionId);
  if (!question) throw Error("Unknown question.");
  return question;
};
