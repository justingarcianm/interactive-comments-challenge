import Head from "next/head";
import { Rubik } from "next/font/google";

import { ModalState } from "@/context/modal.context";
import Comment from "@/components/comment";
import NewComment from "@/components/newComment";
import Modal from "@/components/modal";

const font = Rubik({
  subsets: ["latin"],
  display: "swap",
});

function Home({ comments, currentUser }) {
  // console.log(comments);
  const { showModal } = ModalState();

  return (
    <>
      <Head>
        <title>Interactive Comments Section </title>
      </Head>
      <main className={`${font.className} bg-light-gray relative`}>
        <div className="mx-auto max-w-3xl p-8 flex flex-col gap-6 min-h-screen">
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
        </div>
        {showModal && <Modal currentUserId={currentUser.id} />}
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
