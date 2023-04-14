import { useState, useEffect } from "react";
import Head from "next/head";
import { Rubik } from "next/font/google";

import { GlobalState } from "@/context/global.context";
import Comment from "@/components/comment";
import NewComment from "@/components/newComment";
import Modal from "@/components/modal";

import getComments from "@/lib/comments/get";
import getUser from "@/lib/user/get";

const font = Rubik({
  subsets: ["latin"],
  display: "swap",
});

function Home({ comments, user }) {
  // console.log(comments);
  const { showModal, currentUser, setCurrentUser, currentComments, setCurrentComments } = GlobalState();

  useEffect(() => {
    setCurrentUser(user);
  }, [user, setCurrentUser]);

  return (
    <>
      <Head>
        <title>Interactive Comments Section </title>
      </Head>
      <main className={`${font.className} bg-light-gray relative`}>
        <div className="mx-auto max-w-3xl p-8 flex flex-col gap-6 min-h-screen">
          <section className="flex flex-col gap-6">
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  currentUser={currentUser}
                />
              ))}
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
  const comments = await getComments();
  const user = await getUser();

  return {
    props: {
      comments,
      user,
    },
  };
}

export default Home;
