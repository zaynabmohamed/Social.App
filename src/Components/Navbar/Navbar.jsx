import React, { useContext } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar} from "@heroui/react";
import { MdOutlineLightMode , MdOutlineDarkMode } from "react-icons/md";
import { UserContext } from '../Context/UserContext'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        className='text-white'
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarPage() {
  const { userLogin, SetUserLogin} = useContext(UserContext)
   
   function signOut(){
     function getUserData(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data` , {
     headers:{
      token:localStorage.getItem("useToken"),
     }
    })
  }

 const {data , isError , isLoading , error} = useQuery({
     queryKey:["userData"],
     queryFn:getUserData,
     select:(data)=>data?.data?.user,
})
console.log(data)
  }
  return (
    <div className='conatiner'>
       <Navbar className='bg-blue-950 me-[40px]'>
      <NavbarBrand >
        <AcmeLogo />
       <Link href='/' className='cursor-pointer'> <p className="font-bold text-inherit text-white">Social App </p></Link>
      </NavbarBrand>
      {userLogin  !== null ? <span onClick={signOut} className='text-amber-50' variant="flat" >
           <NavbarItem>
          <Link href="/register" className='text-amber-50 cursor-pointer '  variant="flat" >
            Sign Up
          </Link>
       <Link className='cursor-pointer mx-3' href="/profile">Profile</Link>

        </NavbarItem>
          </span>:  (<NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex ">
          <Link href="/login" className='cursor-pointer'>Login </Link>
        </NavbarItem> */}
        <NavbarItem>
          <Link href="/register" className='text-amber-50 cursor-pointer '  variant="flat" >
            Sign Up
          </Link>
        </NavbarItem>
                <Link className='cursor-pointer' href="/profile">Profile</Link>
                
        </NavbarContent>
        
      )}

        </Navbar>
    </div>
    
  )
}
