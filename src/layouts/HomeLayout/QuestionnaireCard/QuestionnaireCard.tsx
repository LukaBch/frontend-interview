import styles from "./QuestionnaireCard.module.css";
import { Card } from "@/lib/Card";
import { useQuestionnaires } from "@/api/questionnaires";
import { Questionnaire } from "@/data/questionnaires";

const QuestionnaireCard = () => {
  const { questionnaires, error } = useQuestionnaires();

  if (error) {
    return <p>Error fetching questionnaires: {error}</p>;
  }

  return (
    <div className={styles.cardContainer}>
      {questionnaires.map((questionnaire: Questionnaire) => (
        <Card
          key={questionnaire.id}
          href={`/questionnaire/${questionnaire.id}`}
          title={questionnaire.name}
        />
      ))}
    </div>
  );
};

export default QuestionnaireCard;
