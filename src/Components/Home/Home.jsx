import { PostContext } from '../Context/PostContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Comment from '../Comments/Comment'
import { Link } from 'react-router-dom'
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal'
import CreatePost from '../CreatePost/CreatePost'
import UpdataComment from '../UpdataComment/UpdataComment'
import { QueryClient, useQueryClient } from '@tanstack/react-query';

export default function Home(){
  const QueryClient = useQueryClient()
     async function getAllPosts(){
      
        return await axios.get(`https://linked-posts.routemisr.com/posts?limit=50` , {
          headers:{
            token:localStorage.getItem("useToken")
          }
        })
      }
const {isError , isLoading , error , data }=  useQuery({
    queryKey:["getPosts"],
    queryFn: getAllPosts,
    select:(data)=>data?.data?.posts
  })
if(isError){
  return <h3>{error.message}</h3>
}
if(isLoading){
  return <h3>{<div className="loader"></div>}</h3>
}
   QueryClient.invalidateQueries({queryKey:['getPosts']})

  return (
   <>
  <CreatePost/>
   {data?.map((post)=>(
          <Link  key={post.id}  to={`/postdetails/${post.id}`}>
 <div key={post.id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-blue-100 mx-auto p-4 mb-5 mt-[30px] '>
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-center gap-4'>
        <img className="size-[40px]" src={post?.user.photo} alt=''/>
        <p>{post.user.name}</p>
      </div>
      <div className='text-xs text-slate-400'>
        {post.createdAt}
       </div>
        </div>
   {post?.body &&<h2 className='mb-4'>{post?.body}</h2>}
   {post?.image &&<img src={post?.image} className='w-full rounded-md' alt={post?.title}/>}
    {/* </Link> */}
       {post?.comments.length>0  &&(<Comment comment={post.comments[0]}/>)}
     <CreateCommentModal postId={post.id}/>
{/* </Link> */}
   </div>
   </Link>
    
   ))}
   </>
  )
}
