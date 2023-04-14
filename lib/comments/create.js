export default async function createComment(content, authorId) {
  const data = await fetch("/api/comments/createComment", {
    method: "POST",
    body: JSON.stringify({ content, authorId }),
  });

  const res = await data.json();

  if (!res.ok) console.error(res.message);
}
