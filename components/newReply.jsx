import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import createReply from "@/lib/reply/create";

const NewReply = ({ commentAuthor, currentUser, commentID, replyToID }) => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleReply = async (e) => {
    e.preventDefault();

    const data = {
      content,
      replyToID,
      authorId: currentUser.id,
      commentID,
    };
    const createdReply = await createReply(data);
    console.log(createdReply);

    router.refresh();
  };

  return (
    <div className="rounded shadow-md p-4 bg-very-light-gray">
      <form
        className="flex gap-4 justify-between items-start relative"
        onSubmit={handleReply}
      >
        <Image
          src={currentUser.imagePNG}
          alt={`${currentUser.name}'s avatar image`}
          width={50}
          height={50}
        />
        <textarea
          className="p-4 rounded flex-grow outline-none bg-transparent"
          rows={4}
          placeholder={`@${commentAuthor} `}
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

export default NewReply;
