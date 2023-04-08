import { useState, useEffect } from "react";
import Image from "next/image";
import Moment from "react-moment";

import NewReply from "./newReply";

const Reply = ({ reply, currentUser, commentID }) => {
  const [showReply, setShowReply] = useState(false);
  const [scoreNumber, setScoreNumber] = useState(reply.score);

  useEffect(() => {
    setScoreNumber(reply.score);
  }, [reply.score]);

  const { author } = reply;
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded shadow-md p-4">
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
                <Moment date={reply.createdAt} fromNow />
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
            <div>
              <span className="font-semibold pe-2">@{author.name}</span>
              {reply.content}
            </div>
          </div>
        </div>
      </div>
      {showReply && <NewReply currentUser={currentUser} commentAuthor={author.name} commentID={commentID} />}
    </div>
  );
};

export default Reply;
