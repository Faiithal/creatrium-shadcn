import React from 'react'
import MagnifyIcon from "./icons/MagnifyIcon"
import { Input } from "@/components/ui/input"
import logo from '../../assets/Creatrium_Logo.png'
import samplePic from '../../assets/sampleProfile.png'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export default function NavigationBar() {

    const navigate = useNavigate();

    return (
        <Sheet>
            <nav className='w-full h-24 flex items-center justify-between px-10 gap-12' style={{ background: 'linear-gradient(90deg, #B08080 0.84%, #AF8484 31.08%, #968585 90.72%)' }}>

                <div onClick={() => navigate('/home')} className='flex items-center gap-3 cursor-pointer'>
                    <img className='w-6' src={`${logo}`}></img>
                    <h3 className='text-3xl font-display text-black'>Creatrium</h3>
                </div>

                <div className='w-[47rem] max-lg:hidden h-fit p-2 flex items-center rounded-xl border-solid border-2 bg-opacity-30 bg-black px-3'>
                    <div className='flex w-1/2 items-center'>
                        <MagnifyIcon />
                        <Input className='w-72 text-white' />
                    </div>
                    <div className='w-fit h-2/3 flex justify-around border-solid border-r-2 border-l-2 px-8'>
                        <Button variant='link' onClick={() => Navigate()} className='text-white font-[Inter] font-normal'>Home</Button>
                        <Button variant='link' className='text-white font-[Inter] font-normal'>Projects</Button>
                        <Button variant='link' className='text-white font-[Inter] font-normal'>My Projects</Button>
                    </div>
                </div>
                <SheetTrigger>
                    <Avatar className='size-14 border-2 border-black'>
                        <AvatarImage src={samplePic} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent className='w-40 px-0 flex flex-col items-center justify-start bg-slate-900'>
                    <div onClick={() => navigate('/profile')}>
                        <SheetClose>
                            <Avatar className='size-14 border-2 border-black'>
                                <AvatarImage src={samplePic} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </SheetClose>
                    </div>
                    <Collapsible>
                        <CollapsibleTrigger>
                            <Button className='w-40 bg-transparent hover:bg-slate-950 text-white font-[Inter] text-xl'>Settings</Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='flex flex-col'>
                            <Button className='bg-transparent hover:bg-slate-950'>Profile</Button>
                            <Button className='bg-transparent hover:bg-slate-950'>Privacy</Button>
                            <Button className='bg-transparent hover:bg-slate-950'>Security</Button>
                        </CollapsibleContent>
                    </Collapsible>
                    <Button onClick={() => navigate('/')} className='w-40 bg-transparent hover:bg-slate-950 text-white font-[Inter] text-xl'>Log out</Button>
                </SheetContent>
            </nav>
            {/* allows the outside component to connect with other components */}
            <Outlet />
        </Sheet>
    )
}
