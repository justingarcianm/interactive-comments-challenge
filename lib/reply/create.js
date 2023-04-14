export default async function createReply(content, authorId, commentID) {
  const data = await fetch("/api/replies/createReply", {
    method: "POST",
    body: JSON.stringify({ content, authorId, commentID }),
  });

  const res = await data.json();

  if (!res.ok) console.error(res.message);
}
