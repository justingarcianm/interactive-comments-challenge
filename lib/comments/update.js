export default async function updateComment(data) {
  const comments = await fetch(`/api/comments/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });
  const res = await comments.json();
  if (!res.ok) console.error(res.message);
}
