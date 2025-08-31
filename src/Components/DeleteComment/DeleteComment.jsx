import { Button } from '@heroui/react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

export default function DeleteComment({id}) {
    const QueryClient = useQueryClient()
  async function Delete() {
    return await axios
      .delete(`https://linked-posts.routemisr.com/comments/${id}`, {
        headers: {
          token: localStorage.getItem("useToken"),
        },
      })
      .then((res) => {
        console.log(res);
        if(res.data.message === "success"){
        toast.success("Post is Deleted");
        QueryClient.invalidateQueries({queryKey:["userpost"]})
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        toast.error("Post Not Found");
      });
  }
  return (
    <>
    
           <Button
            className="my-4 w-full"
            color="primary"
            variant="flat"
            onClick={Delete}
          >
            Delete Comment
          </Button>
    </>
  )
}
