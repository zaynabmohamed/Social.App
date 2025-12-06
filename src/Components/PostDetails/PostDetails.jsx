import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../Comments/Comment';
import UserPosts from '../UserPosts/UserPosts';
import UpdataPost from '../Updatapost/UpdataPost';
import { BsThreeDotsVertical } from "react-icons/bs";
import UpdataComment from '../UpdataComment/UpdataComment';
import CreatePost from '../CreatePost/CreatePost';
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal';
export default function PostDetails() {
 const { id } = useParams(); 

  console.log("Post ID:", id);
 async function getSinglePost(){
     return  await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
            token:localStorage.getItem("useToken")
        }
    })
    
}
   const {data, isLoading , isError , error  } =useQuery({
        queryKey:["getPosts"],
        queryFn:getSinglePost,
        select:(data)=>data?.data?.post
    })
    console.log(data)
  return (
    <>
    <div>
 <div className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-gray-200 mx-auto p-4 mb-5 mt-[30px] '>
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-center gap-4'>
        <img className="size-[40px]" src={data?.user?.photo} alt=''/>
        <p>{data?.user?.name}</p>
      </div>
      <div className='text-xs text-slate-400'>
        {data?.createdAt}
       </div>
        </div>
   {data?.body &&<h2 className='mb-4'>{data?.body}</h2>}
   {data?.image &&<img src={data?.image} className='w-full rounded-md' alt={data?.title}/>}
   </div>
   <UserPosts/>
<div className='w-[60%] mx-auto'>
{data?.comments.map((comment)=><Comment key={comment.id} comment={comment}/>)}      
<div className='w-[20%] mx-auto gap-3 p-4 flex'>
   <CreateCommentModal postId={id}/> 
      </div>
</div>
</div>

  </>
  )

}