import { useState, useEffect } from "react";
import Image from "next/image";
import Moment from "react-moment";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";

import { ModalState } from "@/context/modal.context";
import Reply from "./reply";
import NewReply from "./newReply";

const Comment = ({ comment, currentUser }) => {
  const { author, replies } = comment;
  const [showReply, setShowReply] = useState(false);
  const [scoreNumber, setScoreNumber] = useState(comment.score);
  const { showModal, prepDelete } = ModalState();

  useEffect(() => {
    setScoreNumber(comment.score);
  }, [comment.score]);

  return (
    <div>
      <div className="rounded shadow-md p-4 mb-6 bg-very-light-gray">
        <div className="flex gap-4">
          <div className="rounded-lg p-2 font-semibold flex flex-col gap-2 items-center bg-gray-200">
            <button className="text-accent-reverse">+</button>
            <span className="text-accent">{scoreNumber}</span>
            <button className="text-accent-reverse">-</button>
          </div>
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2 items-center relative">
                <Image src={author.imagePNG} alt={`${author.name}'s avatar image`} width={25} height={25} />
                <h3 className="font-semibold text-dark-blue">
                  {author.name}
                  {currentUser.id === author.id && <span className="py-1 px-2 rounded bg-moderate-blue font-semibold text-white ms-1 text-sm">you</span>}
                </h3>
                <Moment date={comment.createdAt} fromNow />
              </div>
              <div className="flex gap-4 justify-end items-center">
                {currentUser.id === author.id ? (
                  <>
                    <button className={`${showModal ? "text-pale-red" : "text-delete"} flex gap-1 items-center`} onClick={() => prepDelete(comment.id, "comment")}>
                      <FaTrash /> Delete
                    </button>
                    <button className="text-accent hover:text-light-grayish-blue flex gap-1 items-center">
                      {" "}
                      <FaPencilAlt /> Edit
                    </button>
                  </>
                ) : (
                  <button className={`${showReply ? "text-light-grayish-blue" : "text-moderate-blue flex items-center gap-1 flex-nowrap"} hover:text-light-grayish-blue`} onClick={() => setShowReply(!showReply)}>
                    <TbArrowBackUp /> Reply
                  </button>
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
