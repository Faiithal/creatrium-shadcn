import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import samplePic from '../assets/sampleProfile.png'
import React from 'react'
import { Button } from "../components/ui/button"





export default function ClientHome() {



    return (
        <>
            {/* Navbar -> For High Order Component */}



            {/* Home Page */}

            <div className="bg-[#D4D4D4] w-full h-fit 2xl:h-screen ">
                <div className='px-16 py-10 flex flex-col gap-y-5 h-full '>
                    <div className='flex items-center justify-between gap-x-5'>
                        <div className='flex items-center gap-x-5'>
                            <Avatar className='size-40'>
                                <AvatarImage src={samplePic} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2 className='text-4xl font-[Inter] font-bold'>Welcome Nagatoro!</h2>
                        </div>
                        <Button className='w-64 h-16 text-xl rounded-3xl bg-[#622c2c]'>Upload Project</Button>
                    </div>

                    <div className="flex justify-between gap-5 h-full">

                        {/* Recently Viewed Projects */}
                        <div className="w-1/2 rounded-3xl bg-white flex flex-col p-5 gap-3">
                            <h3 className="font-[Inter] font-medium text-xl">Recently Viewed</h3>
                            <div className="flex flex-col xl:flex-row justify-center items-center gap-3 2xl:h-1/2">
                                <div className='bg-gray-300 w-[19rem] h-44'></div>
                                <div className='bg-gray-300 w-[19rem] h-44'></div>
                            </div>
                            <div className="hidden xl:flex justify-center items-stretch gap-3 2xl:h-1/2">
                                <div className='bg-gray-300 w-[19rem] h-44'></div>
                                <div className='bg-gray-300 w-[19rem] h-44'></div>
                            </div>
                        </div>

                        {/* Recent Projects */}
                        <div className="w-2/5 max-2xl:w-1/2 rounded-3xl bg-white flex flex-col p-5 gap-3">
                            <h3 className='font-[Inter] font-medium text-xl'>Recent Projects</h3>
                            <div className="flex flex-col gap-3 items-center h-full">
                                <div className="2xl:h-1/2 flex flex-col justify-center">
                                    <div className='bg-gray-300 w-[19rem] h-44'></div>
                                </div>
                                <div className="2xl:h-1/2">
                                    <div className='bg-gray-300 w-[19rem] h-44'></div>
                                </div>
                            </div>
                        </div>

                        {/* Friends and Clock */}
                        <div className="w-1/4 max-2xl:hidden h-full flex flex-col gap-3">
                            <div className="w-full h-4/5 rounded-3xl bg-white p-5">
                                <h3 className='font-[Inter] font-medium text-xl'>Online Friends</h3>
                            </div>
                            <div className="w-full h-1/5 rounded-3xl bg-neutral-800 p-5">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
