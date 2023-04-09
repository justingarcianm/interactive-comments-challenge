import { useState } from "react";
import { useRouter } from "next/navigation";

const Edit = ({ currentUserId, data, type, id, authorID }) => {
  const [content, setContent] = useState(data);
  const router = useRouter();

  const handleEdit = async (e) => {
    e.preventDefault();

    if (content === data || content === "") return;

    const currentDate = new Date();

    if (type === "comment") {
      const data = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ content, currentUserId, authorID, currentDate }),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });
      const res = await data.json();
      router.refresh();
      if (!res.ok) console.error(res.message);
    } else {
      const data = await fetch(`/api/replies/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ content, currentUserId, authorID, currentDate }),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });
      const res = await data.json();
      router.refresh();
      if (!res.ok) console.error(res.message);
    }
  };

  return (
    <form className="flex gap-4 justify-between items-start relative" onSubmit={handleEdit}>
      <textarea className="p-4 bg-transparent rounded flex-grow" rows={6} placeholder="Add a comment..." onChange={(e) => setContent(e.target.value)} defaultValue={data} />
      <button disabled={content === data} type="submit" className="px-6 py-2 rounded-lg bg-accent uppercase font-semibold">
        Submit
      </button>
    </form>
  );
};

export default Edit;
