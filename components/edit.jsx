import { useState } from "react";

import updateComment from "@/lib/comments/update";
import updateReply from "@/lib/reply/update";

const Edit = ({ currentUserId, currentContent, type, id, authorID, updateStateData }) => {
  const [content, setContent] = useState(currentContent);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (content === currentContent || content === "") return;

    const date = new Date();

    const data = {
      id,
      content,
      currentUserId,
      date,
      authorID,
    };

    if (type === "comment") {
      updateComment(data);
    }
    if (type === "reply") {
      updateReply(data);
    }

    updateStateData(content, date);
  };

  return (
    <form
      className="flex gap-4 justify-between items-start relative"
      onSubmit={handleEdit}
    >
      <textarea
        className="p-4 bg-transparent rounded flex-grow"
        rows={6}
        placeholder="Add a comment..."
        onChange={(e) => setContent(e.target.value)}
        defaultValue={currentContent}
      />
      <button
        disabled={content === currentContent}
        type="submit"
        className="px-6 py-2 rounded-lg bg-accent uppercase font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default Edit;
