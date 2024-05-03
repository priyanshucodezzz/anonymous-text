'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {usePathname} from "next/navigation";
import Link from 'next/link';
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { toast, useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Page = () => {
  const { toast } = useToast();

  const [messageContent , setMessageContent] = useState('');

  const username = usePathname()?.split("/u/")[1]; 

  const sendMessage = async() => {
    try {
      const response = await axios.post<ApiResponse>(`/api/send-message`, {
        username,
        content: messageContent
      });
      setMessageContent('');
      toast({
        title: response.data.message,
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
        toast({
          title: "Error",
          description: axiosError.response?.data?.message || "Failed to send message",
          variant: "destructive"
        })
      }
  }
  const suggestMessages = () => {
    //working later...
  }
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl text-center font-bold mb-4">Public Profile Link</h1>

      <div className="mb-4 mt-10">
        <h2 className="text-lg font-semibold mb-2">Send anonymous message to {username}</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={messageContent}
            onChange={(e)=> setMessageContent(e.target.value)}
            placeholder='write your anonymous message here!!!'
            className="input border-black/30 border-[0.5px] rounded-md w-full min-h-[4.5rem] p-2 mr-2 focus:outline-0"
          />
        </div>
        <div className='flex justify-center mt-5 mb-10'>
          <Button onClick={(e) => {
              e.preventDefault();
              sendMessage();
          }}>Send it</Button>
        </div>
      </div>

      <Separator />

      <Button
        className="mt-4"
        onClick={(e) => {
          e.preventDefault();
          suggestMessages();
        }}
      >
       Suggest messages
      </Button>
        <h2 className='mt-4'>Click any message below to select it.</h2>

      <div className="mt-4 flex flex-col py-6 px-12 gap-6 border-black/30 border-[0.5px] rounded-md">
        <div>
          <h2 className='text-2xl font-semibold'>Messages</h2>
        </div>
        <div className='p-3 border-black/30 border-[0.5px] rounded-md'>
          <h3 className='text-center font-medium'>yu jo takta hai aasman ko tu koi rehta hai kya aasman mai kya</h3>
        </div>
        <div className='p-3 border-black/30 border-[0.5px] rounded-md'>
          <h3 className='text-center font-medium'>yu jo takta hai aasman ko tu koi rehta hai kya aasman mai kya</h3>
        </div>
        <div className='p-3 border-black/30 border-[0.5px] rounded-md'>
          <h3 className='text-center font-medium'>yu jo takta hai aasman ko tu koi rehta hai kya aasman mai kya</h3>
        </div>
      </div>

      <Separator />

      <div className='mt-8 flex flex-col items-center'>
      <h2 className='font-medium mb-4'>Get your message board</h2>
      <Link href={'/signup'} className='inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80'>Create your account</Link>
      </div>

    </div>
  )
}

export default Page;