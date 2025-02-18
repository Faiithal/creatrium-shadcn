import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import samplePic from '../assets/sampleProfile.png'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '../components/ui/button'
import { ChevronRight, Heart, Scroll, Star } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import SampleThumbnail from '../assets/SampleThumbnail.jpeg'
import { checkToken } from '../api/auth'
import { userProjects } from '../api/profile'
import { StorageURL } from '../api/configuration'
import dayjs from 'dayjs'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import { checkLike } from '../api/likes'
import { checkFavorite } from '../api/favorites'
import { show as checkUser } from '../api/profile'
import { useParams } from 'react-router-dom'
import ViewProjectPanel from '../components/ui/ViewProjectPanel'
import { onOpen } from '../api/onOpen'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../contexts/AuthContext'
import withAuth from '../high-order-component/withAuth'
import { checkProjectLikeFavorite } from '../api/projects'

import { add as addLike, destroy as destroyLike } from '../api/likes'
import { add as addFavorite, destroy as destroyFavorite } from '../api/favorites'
import { Oval } from 'react-loader-spinner'


function Profile() {
    const [recentProjects, setRecentProjects] = useState()
    const [userData, setUserData] = useState()
    const [viewMore, setViewMore] = useState(false)
    const params = useParams()
    const [openPanel, setOpenPanel] = useState(false)


    const [likeData, setLikeData] = useState()
    const [favoriteData, setFavoriteData] = useState()
    const [loading, setLoading] = useState()
    const [userProjectData, setUserProjectData] = useState()
    const [viewData, setViewData] = useState()
    const [cookies, setCookie, removeCookie] = useCookies()
    const { user } = useContext(AuthContext)

    const [like, setLike] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingRecent, setLoadingRecent] = useState(true)

    const token = cookies.token
    const id = params.id

    const toggleLike = (projectId) => {
        if (like) {
            destroyLike(projectId, token).finally(() => {
                setLike(!like)
            }
            )
        }
        else {
            addLike(projectId, token).finally(() => {
                setLike(!like)
            }
            )
        }
    }

    const toggleFavorite = (projectId) => {
        if (favorite) {
            destroyFavorite(projectId, token).finally(() => {
                setFavorite(!favorite)
            }
            )
        }
        else {
            addFavorite(projectId, token).finally(() => {
                setFavorite(!favorite)
            }
            )
        }
    }

    async function getUserData(id) {
        checkUser(id).then((res) => {
            setUserData(res.data)
        }).finally(() => setLoadingUser(false))
    }

    function getRecentProjects(id, token) {
        checkProjectLikeFavorite(id, token).then((res) => {
            setRecentProjects(res.data)
        }
        ).finally(() => setLoadingRecent(false))
    }

    useEffect(() => {

        getUserData(id)
        getRecentProjects(id, token)
    }, [])

    useEffect(() => {
        getRecentProjects(id, token)
    }, [like, favorite])

    return (
        <>
            <Sheet open={openPanel} onOpenChange={setOpenPanel}>
                <div className='flex h-screen bg-[#D4D4D4]'>

                    {/* Profile and Projects Container */}
                    <div className='w-1/3 h-full flex flex-col items-center justify-between 2xl:justify-normal 2xl:gap-12 bg-[#bcbcbc] p-8'>
                        {loadingUser ?
                            <div className="w-full h-full flex justify-center items-center">
                                <Oval
                                    height="120"
                                    width="120"
                                    color="#622C2C"
                                    secondaryColor="#D1C1C1"
                                    ariaLabel="oval-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                            :

                            <>
                                {/* Profile */}
                                <div className='flex flex-col items-center gap-3'>
                                    <div className='flex flex-col items-center'>
                                        <Avatar className='size-20 md:size-28 lg:size-36 xl:size-38 2xl:size-44 shadow-md'>
                                            <AvatarImage src={`${StorageURL}${userData?.profile?.image}`} />
                                            <AvatarFallback><img src={`../../${userData?.profile?.gender}Fallback.png`} /></AvatarFallback>
                                        </Avatar>
                                        <h3 className='font-medium font-[Inter] text-[12px] md:text-lg xl:text-xl 2xl:text-3xl'>{userData?.name}</h3>
                                        <h4 className='font-medium font-[Inter] text-[10px] md:text-sm xl:text-md 2xl:text-xl text-center text-[#4c4c4c]'>{`${userData?.profile?.first_name} ${userData?.profile?.middle_name ? userData?.profile?.middle_name : ''} ${userData?.profile?.last_name} ${userData?.profile?.affix ? userData?.profile.affix : ''}`}</h4>
                                    </div>
                                </div>

                                {/* Projects */}
                                <div className='w-full h-14 xl:h-2/3 xl:flex-col xl:items-start xl:justify-normal flex flex-row gap-2 justify-between items-center rounded-xl bg-neutral-800 p-5 ' >
                                    <div className='w-full flex flex-row items-center justify-between'>
                                        <h3 className='text-white text-md xl:text-xl 2xl:text-2xl'>Projects</h3>

                                        <Button onClick={() => setViewMore(true)} className='hover:bg-zinc-900 bg-transparent p-2'><ChevronRight /></Button>
                                    </div>
                                    {loadingRecent ?
                                <div className="w-full h-96 flex justify-center items-center">
                                    <Oval
                                        height="120"
                                        width="120"
                                        color="#622C2C"
                                        secondaryColor="#D1C1C1"
                                        ariaLabel="oval-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                                :
                                    <div className='hidden w-full xl:flex flex-wrap justify-center gap-2 '>
                                        {recentProjects?.slice(0, 3).map((project) =>
                                            <SheetTrigger key={project.id}>
                                                <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} key={project?.id} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='w-[170px] hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all aspect-video object-cover rounded-md shadow-md'></img>
                                            </SheetTrigger>
                                        )}
                                        {recentProjects?.length >= 3 && recentProjects?.slice(3, 6).map((project) =>
                                            /* In the case there is more than 2 projects made that may or may not fit in the screen*/
                                            <SheetTrigger key={project.id}>
                                                <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} key={project?.id} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='hidden  w-[170px] hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all aspect-video 2xl:block object-cover rounded-md shadow-md'></img>
                                            </SheetTrigger>
                                        )}
                                        {recentProjects?.length >= 6 && recentProjects?.slice(6, 9).map((project) =>
                                            /* In the case there is more than 2 projects made that may or may not fit in the screen*/
                                            <SheetTrigger key={project.id}>
                                                <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} key={project?.id} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='hidden  w-[170px] hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all 3xl:block object-cover rounded-md shadow-md'></img>
                                            </SheetTrigger>
                                        )}
                                        {/* In the case there is more than 4 projects made that may or may not fit in the screen*/}
                                    </div>
                                    }
                                </div>
                            </>
                        }
                    </div>

                    {/* Recently Uploaded Projects Container */}
                    <ScrollArea className='w-2/3'>
                        <div className='px-10 pt-5 flex flex-col gap-4 w-full h-full'>
                            <h1 className='font-medium font-[Inter] text-md md: text-xl xl:text-2xl 2xl:text-3xl'>Uploads</h1>

                            {loadingRecent ?
                                <div className="w-full h-96 flex justify-center items-center">
                                    <Oval
                                        height="120"
                                        width="120"
                                        color="#622C2C"
                                        secondaryColor="#D1C1C1"
                                        ariaLabel="oval-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                                :
                                <>
                                    {recentProjects && recentProjects?.map((project) =>
                                        <div key={project?.id} className='flex flex-col gap-3 items-center'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-1'>
                                                    <Avatar className='size-6 md:size-8 lg:size-10 xl:size-12 2xl:size-14 3xl:size-16'>
                                                        <AvatarImage src={`${StorageURL}${userData?.profile?.image}`} />
                                                        <AvatarFallback><img src={`../../${userData?.profile?.gender}Fallback.png`} /></AvatarFallback>
                                                    </Avatar>
                                                    <h4 className='text-[0.5rem] sm:text-[0.65rem] md:text-sm lg:text-base 2xl:texl-lg 3xl:text-xl'>{userData?.name}</h4>
                                                    <h5 className='text-[0.5rem] text-[#4c4c4c] md:text-sm lg:text-base 2xl:texl-lg 3xl:text-xl'>{dayjs(project?.created_at).format('MMMM D, YYYY')}</h5>
                                                </div>

                                                <img className='w-[170px] sm:w-[240px] md:w-[310px] lg:w-[380px] xl:w-[430px] 2xl:w-[590px] 3xl:w-[690px] aspect-[16/9] object-cover rounded-md shadow-md' src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'}></img>
                                                <div className='bg-white w-[170px] sm:w-[240px] md:w-[310px] lg:w-[380px] xl:w-[430px] 2xl:w-[590px] 3xl:w-[690px] h-12 md:h-14 lg:h-16 xl:h-[4.5rem] 2xl:h-20 3xl:h-[5.5rem] rounded-md -translate-y-4 flex flex-col justify-center p-1.5 xl:p-2 '>
                                                    <span className='h-24 w-full text-[0.5rem] md:text-sm lg:text-base 2xl:texl-lg 3xl:text-xl text-ellipsis whitespace-nowrap overflow-hidden'>{project?.name}</span>
                                                    <div>
                                                        <Button onClick={() => toggleLike(project?.id)} asChild className='size-5 md:size-6 lg:size-7 xl:size-8 2xl:size-10 3xl:size-11 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-100' size="icon"><Heart fill={project?.like ? '#FF857A' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>
                                                        <Button onClick={() => toggleFavorite(project?.id)} asChild className='size-5 md:size-6 lg:size-7 xl:size-8 2xl:size-10 3xl:size-11 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-100' size="icon"><Star fill={project?.favorite ? '#FFE97B' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    </ScrollArea>
                </div >
                <Dialog open={viewMore} onOpenChange={() => setViewMore(false)} >
                    <DialogContent className='p-5 gap-0 flex-none max-w-none w-[50vw] h-48 md:h-56 lg:h-60 xl:h-64 2xl:h-80 3xl:h-96'>
                        <ScrollArea className='h-full  w-full'>
                            <div asChild className='h-full flex flex-wrap items-start gap-1 content-start justify-evenly'>
                                {recentProjects && recentProjects?.map((project) =>
                                    <SheetTrigger key={project.id}>
                                        <img
                                            onClick={() => {
                                                setOpenPanel(true)
                                                onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)
                                            }
                                            } alt={project.name} key={project?.id} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px] 3xl:w-[200px] hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all aspect-video object-cover rounded-md  shadow-md'></img>
                                    </SheetTrigger>
                                )}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                <ViewProjectPanel
                    response={viewData}
                    id={viewData?.id}
                    viewer_id={user?.id}
                    gender={userProjectData?.profile?.gender}
                    creator_id={viewData?.user_id}
                    fave_count={viewData?.user_favorites_count}
                    like_count={viewData?.user_likes_count}
                    file_icon={`${StorageURL}${viewData?.file_icon}`}
                    authors={viewData && JSON.parse(viewData?.authors)}
                    title={viewData?.name}
                    categories={viewData?.categories.map((e) => e.category)}
                    thumbnails_source={(viewData) && (viewData.thumbnails != 'null' ? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : null)}
                    username={userProjectData?.user?.name} //saved for auth context
                    date={viewData?.created_at}
                    description={viewData?.description}
                    profilePic={userProjectData?.user?.image}
                    file_type={viewData?.file_extension}
                    file_source={`${StorageURL}` + viewData?.file}
                    loading={loading}
                    like_data={likeData?.id}
                    favorite_data={favoriteData?.id}
                />
            </Sheet>
        </>
    )
}
export default withAuth(Profile)