import React from "react";
import DeleteComment from "../DeleteComment/DeleteComment";
import UpdataComment from "../UpdataComment/UpdataComment";

export default function Comment({ comment}) {
    if (!comment) {
    return <p>No comment available</p>;
  }
  const { commentCreator , content , createdAt , _id } = comment;
  console.log(comment)
  return (
    <>
    
      <div className="w-full rounded-md border-2 border-slate-900 bg-slate-800 text-white">
        <div className="flex justify-between">
          <div className="left flex gap-2 items-center">
            <img src={commentCreator?.photo} className="size-[40px]" alt="" />
            <p>{commentCreator?.name}</p>
          </div>
          <div>
            <div className="text-slate-300 text-sm py-3">{createdAt}</div>
          </div>
        </div>
        <div className="content px-12 m-auto p-2">{content}</div>
      </div>
      <div className="my-3 p-4 flex  gap-3 justify-items-end">
        <button className=" text-white p-2 rounded-md cursor-pointer w-[50%] ">
         <UpdataComment id={_id} />
        </button>
        <button className="p-2 rounded-md cursor-pointer w-[50%] ">
          <DeleteComment id={_id}/>
        </button>
      </div>
    </>
  );
}
