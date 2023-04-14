export default async function getUser() {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000";
  const resUser = await fetch(`${URL}/api/user`);
  return await resUser.json();
}
