export default async function createReply(data) {
  const reply = await fetch("/api/replies/createReply", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const res = await reply.json();

  if (res.ok) {
    return res;
  } else {
    return console.error(res.message);
  }
}
