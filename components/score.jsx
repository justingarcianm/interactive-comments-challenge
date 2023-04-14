import { useState } from "react";

import updateComment from "@/lib/comments/update";
import updateReply from "@/lib/reply/update";

const Score = ({ score, id, type }) => {
  const [updating, setUpdating] = useState(false);
  const [currentScore, setCurrentScore] = useState(score);

  const updateScore = (operator) => {
    setUpdating(true);

    let updatedScore = currentScore;

    if (operator === "+") {
      updatedScore++;
    }
    if (operator === "-") {
      updatedScore--;
    }
    console.log(updatedScore);

    const data = {
      id,
      score: updatedScore,
    };

    console.log(data, type);

    if (type === "comment") {
      updateComment(data);
    }

    if (type === "reply") {
      updateReply(data);
    }

    setCurrentScore(updatedScore);
    setUpdating(false);
  };

  return (
    <div className="rounded-lg p-2 font-semibold flex flex-col gap-2 items-center bg-gray-200 justify-start">
      <button
        className="text-accent-reverse"
        disabled={updating}
        onClick={() => updateScore("+")}
      >
        +
      </button>
      <span className="text-accent">{currentScore}</span>
      <button
        className="text-accent-reverse"
        disabled={updating}
        onClick={() => updateScore("-")}
      >
        -
      </button>
    </div>
  );
};

export default Score;
