import Head from "next/head";
import Comment from "@/components/comment";
import NewComment from "@/components/newComment";
import axios from "axios";

function Home({ comments, currentUser }) {
  // console.log(comments);
  return (
    <>
      <Head>
        <title>Interactive Comments Section </title>
      </Head>
      <main className="mx-auto max-w-3xl p-8 flex flex-col gap-6 min-h-screen">
        <section className="flex flex-col gap-6">
          {comments && comments.length ? (
            comments.map((comment) => <Comment key={comment.id} comment={comment} currentUser={currentUser} />)
          ) : (
            <>
              <h3>No Comments</h3>
            </>
          )}
        </section>

        <section className="">
          <NewComment currentUser={currentUser} />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000";

  const res = await fetch(`${URL}/api/comments`);
  const comments = await res.json();

  const resUser = await fetch(`${URL}/api/user`);
  const currentUser = await resUser.json();

  return {
    props: {
      comments,
      currentUser,
    },
  };
}

export default Home;
