import { Button, form, Input, Link, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";
import { LuLoaderCircle } from "react-icons/lu";
export default function RegisterPage() {
 const [apiErro , setApiErro]=useState("")
 const [ isLoading , setIsLoading] = useState(false)

  const navigate = useNavigate()
  const schema= z.object({
    name:z.string().min(1 ,"Name is Required").max(20 , "the name is max length"), 
    email:z.email("invaild Email"),
    password:z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/ , " must includes 1 capiture latter at least & small letter at least & i spicial char at least  & 1 cnumber at least and min length 8"),
    rePassword:z.string(),
    dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/ , "invaild Date").refine((date)=>{const userDate = new Date(date); const  now = new Date() ; now.setHours(0,0,0,0) ; return userDate < now ; },"can not be future date"),
    gender:z.enum(["male" ,"female"], "gender must be on of male or female" ),
  }).refine((object)=>object.password ===  object.rePassword ,{error :" password and rePassword not matched" , path:["rePassword"]})
  const { handleSubmit, register , formState:{errors}} = useForm({
    defaultValues:{
    name : "",
    email:"",
    password:"",
    rePassword: "",
    dateOfBirth:"",
    gender: ""
    },
    resolver:zodResolver(schema)
    });
    function handleForm(form){
      
     console.log(form)
     axios.post(`https://linked-posts.routemisr.com/users/signup` , form).then((res)=>{
      if(res.data.message === "success"){
       
      navigate("/login")
    
      }}).catch((err)=> {setApiErro(err.response.data.error)})
     
    }  
  return ( 
    <>
      <div className="max-w-2xl py-5 mx-auto mt-4 shadow-2xl px-10 rounded-2xl">
        <form onSubmit={handleSubmit(handleForm)} className="max-w-md my-12 mx-auto" >
        {apiErro&&(<h1 className="text-center bg-red-500 text-white rounded-md my-2 p-2 font-bold">{apiErro}</h1>)}
          <div className="flex  flex-col gap-6 ">
            <h1 className="text-center">Register Now</h1>
            <Input variant="bordered" label="Name" type="name"  {...register("name")} />
            {errors.name ?(<p className="text-red-600">{errors.name.message}</p>):""}
            <Input variant="bordered" label="Email" type="email"  {...register("email")} />
             {errors.email ?(<p className="text-red-600">{errors.email.message}</p>):""}
            <Input variant="bordered" label="password" type="password"  {...register("password")} />
             {errors.password?(<p className="text-red-600">{errors.password.message}</p>):""}
            <Input variant="bordered" label="confirmPassword" type="password" {...register("rePassword")} />
             {errors.rePassword ?(<p className="text-red-600">{errors.rePassword.message}</p>):""}
            <Input variant="bordered" label="Date Of Birth" type="date" {...register("dateOfBirth")}  />
             {errors.dateOfBirth?(<p className="text-red-600">{errors.dateOfBirth.message}</p>):""}
            <Select variant="bordered" className="max-w-xs" label="Gender" {...register("gender")} >
              <SelectItem key={"male"}>male</SelectItem>
              <SelectItem key={"female"}>female</SelectItem>                                  
            </Select>
               {errors.gender ?(<p className="text-red-600">{errors.gender.message}</p>):""}         
               <>
              <Button type="submit" color="primary" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4">
                Submit
              </Button>
            </>
           {apiErro == "user already exists." ? <Link href="./login" className='underline cursor-pointer'>Login</Link> : ""}

          </div>
        </form>
      </div>
    </>
  );
}
