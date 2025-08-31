import { Input , Button , Link} from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import * as z from"zod"
import { UserContext } from "../Context/UserContext";

export default function LoginPage() {
  const {userLogin , SetUserLogin} = useContext(UserContext)
   const [apiErro , setApiErro]=useState("")
  const navigate = useNavigate()
   const scheme =z.object( {
  email:z.email('email is required'),
  password:z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/ , " must includes 1 capiture latter at least & small letter at least & i spicial char at least  & 1 cnumber at least and min length 8"),
   })
  const { handleSubmit, register , formState:{errors}}=useForm({
    defaultValues:{
      email:"",
      password:"",
    },
   resolver:zodResolver(scheme)
  })
  function handleLogin(data){
    console.log(data)
      axios.post(`https://linked-posts.routemisr.com/users/signin` , data).then((res)=>{
      if(res.data.message === "success"){
         localStorage.setItem("useToken" , res.data.token)
      SetUserLogin(res.data.token)
        navigate("/")
          }})
          .catch((err)=> setApiErro(err.data))
    } 
  return (
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-md my-12 mx-auto " >
        {apiErro&&(<h1 className="text-center bg-red-500 text-white rounded-md my-2 p-2 font-bold">{apiErro}</h1>)}
          <div className="flex  flex-col gap-6  ">
            <h1 className="text-center">Login Now</h1>
            <Input variant="bordered" label="Email" type="email" {...register("email")} />
            {errors.email ?(<p className="text-red-600">{errors.email.message}</p>):""}
            <Input variant="bordered" label="password" type="password"  {...register("password")} />
             {errors.password ?(<p className="text-red-600">{errors.password.message}</p>):""}
              <Button type="submit" color="primary">
                Submit
                <Link href="/profile"></Link>
              </Button>
             </div>
             </form>
  )
}
