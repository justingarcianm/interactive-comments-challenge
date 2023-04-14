import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import createComment from "@/lib/comments/create";

const NewComment = ({ currentUser }) => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleComment = async (e) => {
    e.preventDefault();
    const authorId = currentUser.id;
    createComment(content, authorId);
    router.refresh();
  };

  return (
    <div className="rounded shadow-md p-4 bg-very-light-gray">
      <form
        className="flex gap-4 justify-between items-start relative"
        onSubmit={handleComment}
      >
        <Image
          src={currentUser.imagePNG}
          priority
          alt={`${currentUser.name}'s avatar image`}
          width={50}
          height={50}
        />
        <textarea
          className="p-4 bg-transparent rounded flex-grow"
          rows={6}
          placeholder="Add a comment..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button
          disabled={content === ""}
          type="submit"
          className="px-6 py-2 rounded-lg bg-accent uppercase font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewComment;
