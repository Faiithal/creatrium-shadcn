import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import samplePic from '../assets/sampleProfile.png'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '../components/ui/button'
import { ChevronRight, Heart, Scroll, Star } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import SampleThumbnail from '../assets/SampleThumbnail.jpeg'
import SampleThumbnail2 from '../assets/SampleThumbnail2.jpeg'
import SampleThumbnai3 from '../assets/SampleThumbnail3.png'


export default function Profile() {
    return (
        <>
            <div className='flex h-screen bg-[#D4D4D4]'>
                {/* Profile and Projects Container */}
                <div className='w-1/3 h-full flex flex-col items-center justify-between 2xl:justify-normal 2xl:gap-12 bg-[#bcbcbc] p-8'>

                    {/* Profile */}
                    <div className='flex flex-col items-center gap-3'>
                        <div className='flex flex-col items-center'>
                            <Avatar className='size-20 md:size-28 lg:size-36 xl:size-38 2xl:size-44'>
                                <AvatarImage src={samplePic} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h3 className='font-medium font-[Inter] text-[12px] md:text-lg xl:text-xl 2xl:text-3xl'>Nagatoro</h3>
                            <h4 className='font-medium font-[Inter] text-[10px] md:text-sm xl:text-md 2xl:text-xl text-center text-[#4c4c4c]'>John Michael B. Dumlao</h4>
                        </div>
                        <div className='flex gap-8'>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold font-[Inter] text-[10px] md:text-sm xl:text-md 2xl:text-xl'>100</h3>
                                <h4 className='font-medium font-[Inter] text-[#4c4c4c] text-[10px] md:text-sm xl:text-md 2xl:text-xl'>Likes</h4>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold font-[Inter] text-[10px] md:text-sm xl:text-md 2xl:text-xl'>100</h3>
                                <h4 className='font-medium font-[Inter] text-[#4c4c4c] text-[10px] md:text-sm xl:text-md 2xl:text-xl'>Favorites</h4>
                            </div>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className='w-full h-14 xl:h-1/2 xl:flex-col xl:items-start xl:justify-normal flex flex-row gap-2 justify-between items-center rounded-xl bg-neutral-800 p-5 ' >
                        <h3 className='text-white text-md xl:text-xl 2xl:text-2xl'>Projects</h3>
                        <Button className='xl:hidden hover:bg-zinc-900 bg-transparent p-2'><ChevronRight /></Button>
                        <div className='hidden w-full xl:flex flex-wrap justify-center gap-2 '>
                            <img className='w-[170px] aspect-[16/9] object-cover rounded-md shadow-md'></img>
                            {/* In the case there is more than 2 projects made that may or may not fit in the screen*/}
                            <img className='hidden w-[170px] 2xl:block object-cover rounded-md shadow-md'></img>
                            {/* In the case there is more than 4 projects made that may or may not fit in the screen*/}
                            <img className='hidden w-[170px] 3xl:block object-cover rounded-md shadow-md'></img>
                        </div>
                    </div>
                </div>

                {/* Recently Uploaded Projects Container */}
                <ScrollArea className='w-2/3'>
                    <div className='px-10 pt-5 flex flex-col gap-4 w-full h-full'>
                        <h1 className='font-medium font-[Inter] text-md md: text-xl xl:text-2xl 2xl:text-3xl'>Uploads</h1>

                        {/* Recently Uploaded Projects */}
                        <div className='flex flex-col gap-3 items-center'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-1'>
                                    <Avatar className='size-6 md:size-8 lg:size-10 xl:size-12 2xl:size-14 3xl:size-16'>
                                        <AvatarImage src={samplePic} />
                                    </Avatar>
                                    <h4 className='text-[0.5rem] sm:text-[0.65rem] md:text-sm lg:text-base 2xl:texl-lg 3xl:text-xl'>Nagatoro</h4>
                                    <h5 className='text-[0.5rem] text-[#4c4c4c] md:text-sm lg:text-base 2xl:texl-lg 3xl:text-xl'># days ago</h5>
                                </div>

                                <img className='w-[170px] sm:w-[240px] md:w-[310px] lg:w-[380px] xl:w-[430px] 2xl:w-[590px] 3xl:w-[690px] aspect-[16/9] object-cover rounded-md shadow-md' src={SampleThumbnail}></img>
                                <div className='bg-white w-full h-6 md:h-7 lg:h-8 xl:h-9 2xl:h-12 3xl:h-14 rounded-md -translate-y-4 flex items-center p-1'>
                                    <Button asChild className='size-5 md:size-6 lg:size-7 xl:size-8 2xl:size-10 3xl:size-11 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-100' size="icon"><Heart strokeWidth={'1.3px'} color='black' /></Button>
                                    <Button asChild className='size-5 md:size-6 lg:size-7 xl:size-8 2xl:size-10 3xl:size-11 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-100' size="icon"><Star strokeWidth={'1.3px'} color='black' /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}
