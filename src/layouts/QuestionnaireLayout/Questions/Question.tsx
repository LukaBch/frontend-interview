import styles from "./Questions.module.css";
import { Question as QuestionType } from "@/data/questions";
import { Chip } from "@/lib/Chip";
import { Answers } from "./Answers";
import ShareQuestion from "./ShareQuestion";


interface QuestionProps {
  question: QuestionType;
}

const Question = ({ question }: QuestionProps) => {
  return (
    <div className={styles.card}>
      <Chip className={styles.status}>{question.status}</Chip>
      <h2>{question.text}</h2>
      <Answers question={question} />
      <ShareQuestion questionId={question.id} />
    </div>
  );
};

export default Question;
