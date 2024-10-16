import styles from "./QuestionnaireLayout.module.css";
import { SharedQuestion, useQuestions } from "@/api/questions";
import { Alert } from "@/lib/Alert";
import { Loader } from "@/lib/Loader";
import { Questions } from "@/layouts/QuestionnaireLayout/Questions";

interface QuestionnaireLayoutProps {
  questionnaireId: number;
  sharedQuestion?: SharedQuestion;
}

const QuestionnaireLayout = ({ questionnaireId, sharedQuestion }: QuestionnaireLayoutProps) => {
  const { questions, error } = useQuestions(questionnaireId, sharedQuestion);
  if (error)
    return (
      <main className={styles.alert}>
        <Alert color="danger">{error}</Alert>
      </main>
    );
  if (!questions) return <Loader />;
  return (
    <main className={styles.root}>
      <h1>Here is the questionnaire content:</h1>
      <Questions questions={questions} />
    </main>
  );
};

export default QuestionnaireLayout;
