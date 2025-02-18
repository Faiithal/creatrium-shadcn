import React, { useContext, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import logo from '../../assets/Creatrium_Logo.png'
import samplePic from '../../assets/sampleProfile.png'
import { Sheet, SheetClose, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext'
import { useCookies } from 'react-cookie'
import { checkToken } from '../../api/auth'

export default function NavigationBar() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies()
    const [userData, setUserData] = useState()
    const token = cookies.token
    const { logout } = useContext(AuthContext)


    useEffect(() => {
        if (token)
            checkToken(token).then(res => {
                if (res?.ok) {
                    setUserData(res?.data)
                }
            })
    }, [token])

    const onSearch = () => {
        const searchInput = document.getElementById('search_query').value
        if (searchInput)
            navigate('results?search_query=' + encodeURIComponent(searchInput))
    }

    return (

        <Sheet >
            {token &&
                <nav className='w-full h-24 flex items-center justify-between px-10 gap-12' style={{ background: 'linear-gradient(90deg, #B08080 0.84%, #AF8484 31.08%, #968585 90.72%)' }}>

                    <div onClick={() => navigate('/home')} className='flex items-center gap-3 cursor-pointer'>
                        <img className='w-6' src={`${logo}`}></img>
                        <h3 className='text-3xl font-display text-black'>Creatrium</h3>
                    </div>

                    <div className='w-[47rem] max-lg:hidden h-fit p-2 flex items-center rounded-xl border-solid border-2 bg-opacity-30 bg-black px-3'>
                        <div className='flex gap-2 w-1/2 items-center'>
                            <div className='cursor-pointer p-1 rounded-full' onClick={() => onSearch()}>
                                <Search className=' hover:opacity-50 transition-all' color='black' />
                            </div>
                            <Input id='search_query' className='w-72 text-white' />
                        </div>
                        <div className='w-fit h-2/3 flex justify-around border-solid border-r-2 border-l-2 px-8'>
                            <Button variant='link' onClick={() => navigate('/home')} className='text-white font-[Inter] font-normal'>Home</Button>
                            <Button variant='link' onClick={() => navigate('/projects')} className='text-white font-[Inter] font-normal'>Projects</Button>
                            <Button variant='link' onClick={() => navigate('/my-projects')} className='text-white font-[Inter] font-normal'>My Projects</Button>
                        </div>
                    </div>
                    <SheetTrigger>
                        <Avatar className='size-14 border-2 border-black'>
                            <AvatarImage src={userData?.profile?.image} />
                            <AvatarFallback><img src={`../../${userData?.profile?.gender}Fallback.png`} /></AvatarFallback>
                        </Avatar>
                    </SheetTrigger>
                    <SheetContent className='w-40 px-0 flex flex-col items-center justify-start bg-slate-900 border-none'>
                        <SheetTitle></SheetTitle>
                        <div onClick={() => navigate(`/profile/${userData?.id}`)}>
                            <SheetClose>
                                <Avatar className='size-14 border-2 border-black'>
                                    <AvatarImage src={userData?.profile?.image} />
                                    <AvatarFallback><img src={`../../${userData?.profile?.gender}Fallback.png`} /></AvatarFallback>
                                </Avatar>
                            </SheetClose>
                        </div>
                        <SheetClose>
                            <div onClick={() => navigate(`/profile/${userData?.id}`)} className='w-40 bg-transparent hover:bg-slate-950 shadow-transparent py-2 text-white font-[Inter] text-xl'>Profile</div>
                        </SheetClose>
                        <Collapsible>
                            <CollapsibleTrigger>
                                <div className='w-40 bg-transparent hover:bg-slate-950 shadow-transparent py-2 text-white font-[Inter] text-xl'>Settings</div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className='flex flex-col '>
                                <SheetClose>
                                    <div onClick={() => navigate('/settings/profile')} className='bg-transparent text-white py-2 hover:bg-slate-950 shadow-transparent'>Profile</div>
                                </SheetClose>
                                {/* Add This if there's time */}
                                <SheetClose>
                                    <div onClick={() => navigate('/settings/security')} className='bg-transparent text-white py-2 hover:bg-slate-950 shadow-transparent'>Security</div>
                                </SheetClose>
                            </CollapsibleContent>
                        </Collapsible>
                        <SheetClose>
                            <div onClick={() => { logout() }} className='w-40 bg-transparent shadow-transparent hover:bg-slate-950 py-2 text-white font-[Inter] text-xl'>Log out</div>
                        </SheetClose>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </nav>
            }
            {/* allows the outside component to connect with other components */}
            <Outlet />
        </Sheet>

    )

}
