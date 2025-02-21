import React, { useContext, useEffect, useState } from 'react'
import { Menu, Search } from 'lucide-react'
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
import { StorageURL } from '../../api/configuration'

export default function NavigationBar() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies()
    const [userData, setUserData] = useState()
    const { logout, user } = useContext(AuthContext)
    const token = cookies.token

    useEffect(() => {
        if (user)
            setUserData(user)
    }, [user])

    const onSearch = (e) => {
        e.preventDefault()
        const searchInput = document.getElementById('search_query').value
        if (searchInput.trim().length !== 0) {
            navigate('results?search_query=' + encodeURIComponent(searchInput))
            document.getElementById('search_query').value = ''
        }
        else {
            navigate('/projects')
        }
    }

    return (

        <Sheet >
            {token &&
                <nav className='w-full h-24 flex items-center justify-between px-10 gap-12 bg-[#B08080]' style={{ background: 'linear-gradient(90deg, #B08080, #AF8484 31.08%, #968585 90.72%)' }}>

                    <div onClick={() => navigate('/home')} className='flex items-center gap-3 cursor-pointer'>
                        <img className='w-6' src={`${logo}`}></img>
                        <h3 className='text-3xl font-display text-slate-900 '>Creatrium</h3>
                    </div>

                    <div className='w-[47rem] max-lg:hidden h-fit p-2 flex items-center rounded-xl border-solid border-2 bg-opacity-30 bg-black px-3'>
                        <div className='flex gap-2 w-1/2 items-center'>
                            <div className='cursor-pointer p-1 rounded-full' onClick={(e) => onSearch(e)}>
                                <Search className=' hover:opacity-50 transition-all' color='black' />
                            </div>
                            <form onSubmit={(e) => onSearch(e)}>
                                <Input id='search_query' className='w-72 text-white' />
                            </form>
                        </div>
                        <div className='w-fit h-2/3 flex justify-around border-solid border-r-2 border-l-2 px-8'>
                            <Button variant='link' onClick={() => navigate('/home')} className='text-white font-[Inter] font-normal'>Home</Button>
                            <Button variant='link' onClick={() => navigate('/projects')} className='text-white font-[Inter] font-normal'>Projects</Button>
                            <Button variant='link' onClick={() => navigate('/my-projects')} className='text-white font-[Inter] font-normal'>My Projects</Button>
                        </div>
                    </div>
                    <SheetTrigger>
                        <div className='p-1 rounded-md hover:mix-blend-multiply transition-all hover:bg-contrast hover:bg-opacity-30'>
                            <Menu size={37} />
                        </div>
                    </SheetTrigger>
                    <SheetContent className='w-40 px-0 flex flex-col items-center justify-start bg-slate-900 border-none'>
                        <SheetTitle></SheetTitle>
                        <div onClick={() => navigate(`/profile/${userData?.id}`)}>
                            <SheetClose>
                                <Avatar className='size-14 border-2 border-black'>
                                    <AvatarImage src={`${StorageURL}${userData?.profile?.image}`} />
                                    <AvatarFallback><img src={`../../${userData?.profile?.gender}Fallback.png`} /></AvatarFallback>
                                </Avatar>
                            </SheetClose>
                        </div>
                        <div>


                            <SheetClose>
                                <div onClick={() => navigate(`/profile/${userData?.id}`)} className='w-40 bg-transparent hover:bg-slate-950 transition-all shadow-transparent py-2 text-white font-[Inter] text-xl'>Profile</div>
                            </SheetClose>
                            <Collapsible>
                                <CollapsibleTrigger>
                                    <div className='w-40 bg-transparent hover:bg-slate-950 transition-all shadow-transparent py-2 text-white font-[Inter] text-xl'>Settings</div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className='flex flex-col '>
                                    <SheetClose>
                                        <div onClick={() => navigate('/settings/profile')} className='bg-transparent text-white py-2 hover:bg-slate-950 transition-all shadow-transparent'>Profile</div>
                                    </SheetClose>
                                    {/* Add This if there's time */}
                                    <SheetClose>
                                        <div onClick={() => navigate('/settings/security')} className='bg-transparent text-white py-2 hover:bg-slate-950 transition-all shadow-transparent'>Security</div>
                                    </SheetClose>
                                </CollapsibleContent>
                            </Collapsible>
                            <SheetClose>
                                <div onClick={() => { logout() }} className='w-40 bg-transparent shadow-transparent hover:bg-slate-950 transition-all py-2 text-white font-[Inter] text-xl'>Log out</div>
                            </SheetClose>
                        </div>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </nav>
            }
            {/* allows the outside component to connect with other components */}
            <Outlet />
        </Sheet>

    )

}
