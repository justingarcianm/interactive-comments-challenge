import { useState, useEffect } from "react";
import Image from "next/image";
import Moment from "react-moment";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";

import { GlobalState } from "@/context/global.context";
import NewReply from "./newReply";
import Edit from "./edit";
import Score from "./score";

const Reply = ({ reply, currentUser, commentID }) => {
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [theContent, setTheContent] = useState(reply.content);
  const [modifiedDate, setModifiedDate] = useState(reply.createdAt);
  const { prepDelete } = GlobalState();

  const updateStateData = (replyContent, replyDate) => {
    setTheContent(replyContent);
    setModifiedDate(replyDate);
    setShowEdit(!showEdit);
  };

  const { author } = reply;
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded shadow-md p-4 bg-very-light-gray">
        <div className="flex gap-4 items-start">
          <Score
            score={reply.score}
            id={reply.id}
            type={"reply"}
          />
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2 items-center relative">
                <Image
                  src={author.imagePNG}
                  alt={`${author.name}'s avatar image`}
                  width={25}
                  height={25}
                />
                <h3 className="font-semibold text-dark-blue">
                  {author.name}
                  {currentUser.id === author.id && <span className="py-1 px-2 rounded bg-moderate-blue font-semibold text-white ms-1 text-sm">you</span>}
                </h3>
                <Moment
                  date={modifiedDate}
                  fromNow
                />
              </div>
              <div className="flex gap-4 justify-end items-center">
                {currentUser.id === author.id ? (
                  <>
                    <button
                      className="text-delete flex gap-1 items-center"
                      onClick={() => prepDelete(reply.id, "reply", author.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      className="text-accent hover:text-light-grayish-blue flex gap-1 items-center"
                      onClick={() => setShowEdit(!showEdit)}
                    >
                      <FaPencilAlt /> Edit
                    </button>
                  </>
                ) : (
                  <button
                    className={`${showReply ? "text-light-grayish-blue" : "text-moderate-blue flex items-center gap-1 flex-nowrap"} hover:text-light-grayish-blue`}
                    onClick={() => setShowReply(!showReply)}
                  >
                    <TbArrowBackUp /> Reply
                  </button>
                )}
              </div>
            </div>
            <div>
              <span className={`${showEdit ? "text-light-grayish-blue" : "text-accent"} pe-1`}>@{author.name}</span>
              {showEdit ? (
                <Edit
                  currentUserId={currentUser.id}
                  currentContent={reply.content}
                  type={"reply"}
                  id={reply.id}
                  authorID={author.id}
                  updateStateData={updateStateData}
                />
              ) : (
                theContent
              )}
            </div>
          </div>
        </div>
      </div>
      {showReply && (
        <NewReply
          currentUser={currentUser}
          commentAuthor={author.name}
          commentID={commentID}
        />
      )}
    </div>
  );
};

export default Reply;
