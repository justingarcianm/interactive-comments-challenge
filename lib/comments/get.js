export default async function getComments() {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000";

  const res = await fetch(`${URL}/api/comments`);
  return await res.json();
}
