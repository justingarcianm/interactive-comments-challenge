import { useState, useEffect } from "react";
import Image from "next/image";
import Moment from "react-moment";

import Reply from "./reply";
import NewReply from "./newReply";

const Comment = ({ comment, currentUser }) => {
  const { author, replies } = comment;
  const [showReply, setShowReply] = useState(false);
  const [scoreNumber, setScoreNumber] = useState(comment.score);

  useEffect(() => {
    setScoreNumber(comment.score);
  }, [comment.score]);

  return (
    <div>
      <div className="rounded shadow-md p-4 mb-6">
        <div className="flex gap-4">
          <div className="rounded-lg p-2 flex flex-col gap-2 items-center bg-gray-200">
            <button>+</button>
            <span>{scoreNumber}</span>
            <button>-</button>
          </div>
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2 items-center relative">
                <Image src={author.imagePNG} alt={`${author.name}'s avatar image`} width={25} height={25} />
                <h3 className="font-bold">
                  {author.name}
                  {currentUser.id === author.id && <span className="py-1 px-2 rounded bg-purple-500 font-semibold text-white ms-1 text-sm">you</span>}
                </h3>
                <Moment date={comment.createdAt} fromNow />
              </div>
              <div className="flex gap-4 justify-end items-center">
                {currentUser.id === author.id ? (
                  <>
                    <button>Delete</button>
                    <button>Edit</button>
                  </>
                ) : (
                  <button onClick={() => setShowReply(!showReply)}>Reply</button>
                )}
              </div>
            </div>
            <div>{comment.content}</div>
          </div>
        </div>
      </div>
      {showReply && <NewReply currentUser={currentUser} commentAuthor={author.name} commentID={comment.id} />}
      {replies && replies.length ? (
        <div className="border-l-2 border-gray-300 my-6 ms-7">
          <div className="max-w-xl me-0 ms-auto flex flex-col gap-6">
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} currentUser={currentUser} commentID={comment.id} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
