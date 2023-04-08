import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NewComment = ({ currentUser }) => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleComment = async (e) => {
    const authorId = currentUser.id;
    e.preventDefault();
    const data = await fetch("/api/comment/createComment", {
      method: "POST",
      body: JSON.stringify({ content, authorId }),
    });

    const res = await data.json();
    router.refresh();
    if (!res.ok) console.error(res.message);
  };

  return (
    <div className="rounded shadow-md p-4">
      <form className="flex gap-4 justify-between items-start relative" onSubmit={handleComment}>
        <Image src={currentUser.imagePNG} alt={`${currentUser.name}'s avatar image`} width={50} height={50} />
        <textarea className="rounded outline-none flex-grow" rows={6} placeholder="Add a comment..." onChange={(e) => setContent(e.target.value)} value={content} />
        <button disabled={content === ""} type="submit" className="px-6 py-2 rounded-lg bg-accent uppercase font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewComment;
