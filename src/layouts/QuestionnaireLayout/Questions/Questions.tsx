import styles from "./Questions.module.css";
import { Question as QuestionType } from "@/data/questions";
import Question from "./Question";

interface QuestionsProps {
  questions: QuestionType[];
  questionnaireId: number;
}

const Questions = ({ questions, questionnaireId }: QuestionsProps) => {
  return (
    <div className={styles.root}>
      {questions.map((question) => (
        <Question key={question.id} question={question} questionnaireId={questionnaireId} />
      ))}
    </div>
  );
};

export default Questions;
