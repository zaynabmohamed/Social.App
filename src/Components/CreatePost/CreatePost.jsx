import { Input } from "@heroui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillPicture } from "react-icons/ai";
import { MailIcon } from "../UpdataComment/UpdataComment";
export default function CreatePost() {
  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  const { register, handleSubmit } = form;
  async function CreatePost(form) {
    console.log(form);
    // console.log(form.image[0])
    const Data = new FormData();
    Data.append("body", form.body);
    Data.append("image", form.image[0]);
    try {
      const response = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        Data,
        {
          headers: {
            token: localStorage.getItem("useToken"),
          },
        }
      );
      console.log(response);
      toast.success("post Added success");
    } catch (err) {
      console.log(err);
      toast.error("Exist the error");
    }
  }
  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[60%] rounded-md  mx-auto p-4 mb-5 mt-[30px]">
        <form onSubmit={handleSubmit(CreatePost)}>
          <div>
            <input
              type="text"
              {...register("body")}
              className="w-full border-4 border-slate-900 rounded-lg p-4"
              placeholder="Post Details ....."
            />
          </div>
          <div>
            <Input
              type="file"
              {...register("image")}
              className="flex gap-1 p-1 cursor-pointer rounded-2xl my-2"
              id="photo"
              labelPlacement="outside"
              placeholder="Photo"
              startContent={
                <AiFillPicture className="text-2xl text-default-400 pointer-events-none shrink-0 " />
              }
            />
          </div>
          <div>
            <button className="bg-blue-900 cursor-pointer w-full p-3 text-white rounded-4xl">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
