import { useState } from "react";
import { IconButton } from "@/lib/Button";
import { getSharingToken } from "@/api/token";

const NOTIFICATION_DURATION = 1000;

interface ShareQuestionProps {
  questionId: number;
  questionnaireId: number;
}

const ShareQuestion = ({ questionId, questionnaireId }: ShareQuestionProps) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    getSharingToken(questionnaireId)
      .then((sharingToken) => {
        const shareLink = `${window.location.href}?questionId=${questionId}&token=${sharingToken}`;
        return navigator.clipboard.writeText(shareLink);
      })
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), NOTIFICATION_DURATION);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), NOTIFICATION_DURATION);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      <IconButton ariaLabel="Share" disabled={isLoading} onClick={handleShare}>
        <div>Share question</div>
      </IconButton>
      {copied && (
        <span style={{ color: 'green' }}>✅ Link copied</span>
      )}
      {error && (
        <span style={{ color: 'red' }}>❌ Fail</span>
      )}
    </div>
  );
};

export default ShareQuestion;
