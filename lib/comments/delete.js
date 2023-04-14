export default async function deleteComment(id) {
  const data = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });
  const res = await data.json();
  if (!res.ok) console.error(res.message);
}
