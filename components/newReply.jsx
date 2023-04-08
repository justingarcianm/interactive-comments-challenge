import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NewReply = ({ commentAuthor, currentUser, commentID }) => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleReply = async (e) => {
    const authorId = currentUser.id;
    e.preventDefault();
    const data = await fetch("/api/reply/createReply", {
      method: "POST",
      body: JSON.stringify({ content, authorId, commentID }),
    });

    const res = await data.json();
    router.refresh();
    if (!res.ok) console.error(res.message);
  };

  return (
    <div className="rounded shadow-md p-4">
      <form className="flex gap-4 justify-between items-start relative" onSubmit={handleReply}>
        <Image src={currentUser.imagePNG} alt={`${currentUser.name}'s avatar image`} width={50} height={50} />
        <textarea className="rounded flex-grow focus-visible:border-none focus:border-none" rows={6} placeholder={`@${commentAuthor} `} onChange={(e) => setContent(e.target.value)} value={content} />
        <button disabled={content === ""} type="submit" className="px-6 py-2 rounded-lg bg-accent uppercase font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewReply;
