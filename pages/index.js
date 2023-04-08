import Head from "next/head";
import { Inter } from "next/font/google";
import Comment from "@/components/comment";
import NewComment from "@/components/newComment";

const inter = Inter({ subsets: ["latin"] });

function Home({ comments, currentUser }) {
  console.log(comments);
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

export async function getStaticProps() {
  // const res = await fetch(`${process.env.BASE_URL}/api/comments`);
  const res = await fetch(`http://localhost:3000/api/comments`);
  const comments = await res.json();

  const resUser = await fetch(`http://localhost:3000/api/user`);
  const currentUser = await resUser.json();

  return {
    props: {
      comments,
      currentUser,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default Home;
