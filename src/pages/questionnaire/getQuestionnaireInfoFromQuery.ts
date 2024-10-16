import { ParsedUrlQuery } from 'querystring';
import { SharedQuestion } from "@/api/questions";

interface ParsedUrl {
  questionnaireId: number;
  sharedQuestion?: SharedQuestion;
}

export const getQuestionnaireInfoFromQuery = (query: ParsedUrlQuery): ParsedUrl => {
  const token = query.token as string;
  const questionId = parseInt(query.questionId as string);
  return {
    questionnaireId: parseInt(query.questionnaireId as string),
    sharedQuestion: token && questionId ? { token, questionId } : undefined,
  };
};