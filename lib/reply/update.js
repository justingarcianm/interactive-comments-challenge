export default async function updateReply(data) {
  const reply = await fetch(`/api/replies/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });
  const res = await reply.json();
  if (!res.ok) console.error(res.message);
}
