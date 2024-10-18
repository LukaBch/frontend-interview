import Head from "next/head";
import { useRouter } from "next/router";
import { Loader } from "@/lib/Loader";
import { QuestionnaireLayout } from "@/layouts/QuestionnaireLayout";
import { getQuestionnaireInfoFromQuery } from "./getQuestionnaireInfoFromQuery";


export default function Questionnaire() {
  const { isReady, query } = useRouter();
  if (!isReady) return <Loader />;
  const {questionnaireId, sharedQuestion} = getQuestionnaireInfoFromQuery(query);
  return (
    <>
      <Head>
        <title>Questionnaire</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuestionnaireLayout questionnaireId={questionnaireId} sharedQuestion={sharedQuestion} />
    </>
  );
}
