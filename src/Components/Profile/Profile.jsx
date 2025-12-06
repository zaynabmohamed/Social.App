import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserPosts from '../UserPosts/UserPosts'
import ChangePassword from '../ChangePasswordModal/ChangePassword'
import UploadProfile from '../UploadProfile/UploadProfile'

export default function ProfilePage() {
   async function getUserData(){
    return await axios.get(`https://linked-posts.routemisr.com/users/profile-data` , {
     headers:{
      token:localStorage.getItem("useToken"),
     }
    })
  }
 const {data } = useQuery({
     queryKey:["userData"],
     queryFn:getUserData,
     select:(data)=>data?.data?.user
})
console.log(data)
  return (
    <>
    <div className='w-full md:w-[80%] lg:w-[60%] text-center mx-auto border-2 border-gray-700 rounded-lg p-4'>
     <img src={data?.photo} className='size-[50px] mx-auto '/>
     <p>Name: {data?.name}</p>
     <p>Gender: {data?.gender}</p>
     <p>Email: {data?.email}</p>
     <p>Birthday: {data?.dateOfBirth}</p>
    </div>
    <div className=' mx-auto  flex  flex-col justify-between item-center gap-3 border-slate-900  text-slate-800 p-3 w-full md:w-[80%] lg:w-[60%] my-12 text-center'>
   <ChangePassword/>
   <UploadProfile/>
 </div>
 <UserPosts id={data?._id}/>
    </>
  )
}
  


