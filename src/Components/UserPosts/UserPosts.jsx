import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";
import CreateCommentModal from "../CreateCommentModal/CreateCommentModal";
import UpdataPost from "../Updatapost/UpdataPost";
// import { Button, Input, ModalBody } from "@heroui/react";
// import toast from "react-hot-toast";
// import PostDetails from "../PostDetails/PostDetails";
// import UpdataComment from "../UpdataComment/UpdataComment";
// import DeleteComment from "../DeleteComment/DeleteComment";

export default function UserPosts({id}) {
   async function GetUserPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/users/${id}/posts?limit=20`,
      {
        headers: {
          token: localStorage.getItem("useToken"),
        },
      }
    );
  }
  const { data, isError, isLoading, error  } = useQuery({
    queryKey: ["userpost"],
    queryFn: GetUserPosts,
    // select:(data)=>data?.data?.posts
  });
  console.log(data?.data?.posts);
  return (
    <>
      {data?.data.posts.map((post) => (
        <div
          key={post.id}
          className="w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 mx-auto p-4 mb-5 mt-[30px] "
        >
          <Link to={`/postdetails/${post.id}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <img className="size-[40px]" src={post?.user.photo} alt="" />
                <p>{post?.user.name}</p>
              </div>
              <div className="text-xs text-slate-900">{post?.createdAt}</div>
            </div>
            {post?.body && (
              <h2 className="mb-4 w-full rounded-lg">{post?.body}</h2>
            )}
            {post?.image && (
              <img
                src={post?.image}
                className="w-full rounded-md"
                alt={post.body}
              />
            )}
         {post?.comments.length >0 &&(<Comment comment={post.comments[0]}/>)}
         </Link>
         {data?.data?.posts && <CreateCommentModal postId={post.id}/>}
         <div>
           <UpdataPost id={post.id} /> 
         </div>
          
      </div>
      ))}
     
    </>
  );
}
