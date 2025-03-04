import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useContext, useEffect, useState } from 'react'
import UploadDialog from "../components/ui/UploadDialog"
import { index as historyIndex } from "../api/history"
import { userProjects } from "../api/profile"
import { StorageURL } from "../api/configuration"
import withAuth from "../high-order-component/withAuth"
import { AuthContext } from "../contexts/AuthContext"
import { useCookies } from "react-cookie"
import { onOpen } from '../api/onOpen'
import ViewProjectPanel from "../components/ui/ViewProjectPanel"
import { Oval } from 'react-loader-spinner'
import { BookDashed, FolderOpen } from "lucide-react"

function ClientHome() {
    const [recentViewed, setRecentViewed] = useState()
    const [recentProjects, setRecentProjects] = useState()
    const [favoriteProjects, setFavoriteProjects] = useState() // checks id so you have to get the cookie first 
    const { user } = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies()

    const [likeData, setLikeData] = useState()
    const [favoriteData, setFavoriteData] = useState()
    const [loading, setLoading] = useState()
    const [userProjectData, setUserProjectData] = useState()
    const [viewData, setViewData] = useState()
    const [loadingRecent, setLoadingRecent] = useState(true)
    const [loadingHistory, setLoadingHistory] = useState(true)
    const token = cookies.token

    const [projectView, setProjectView] = useState(false)

    useEffect(() => {
        if (user) {
            getRecentProjects(user?.id)
            getHistory(token)
        }
    }, [user])

    function getHistory(token) {
        historyIndex(token).then((res) => {
            setRecentViewed(res.data)
        }
        ).finally(() => setLoadingHistory(false))
    }

    function getRecentProjects(id) {
        userProjects(id).then((res) => {
            setRecentProjects(res.data)
        }
        ).finally(() => setLoadingRecent(false))
    }

    // reserved for favorite projects
    return (
        <>
            {/* Home Page */}
            <div className="bg-[#D4D4D4] w-full h-fit 2xl:h-screen ">
                <div className='px-16 py-10 flex flex-col gap-y-5 h-full '>
                    <div className='flex items-center justify-between gap-x-5'>
                        <div className='flex items-center gap-x-5'>
                            <Avatar className='size-40 shadow-md'>
                                <AvatarImage src={`${StorageURL}${user?.profile?.image}`} />
                                <AvatarFallback><img src={`../../${user?.profile?.gender}Fallback.png`} /></AvatarFallback>
                            </Avatar>
                            <h2 className='text-4xl font-[Inter] font-bold'>Welcome {user?.name}!</h2>
                        </div>
                        <UploadDialog />
                    </div>

                    <div className="flex justify-between gap-5 h-64 sm:h-80 md:h-[440px] 2xl:h-full">

                        {/* Recently Viewed Projects */}
                        <div className="w-1/2 rounded-3xl bg-white flex flex-col p-5 gap-3">
                            <h3 className="font-[Inter] font-medium text-xl">Recently Viewed</h3>

                            {loadingHistory ?
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
                                </div> :
                                <>
                                    {recentViewed.length === 0 ?
                                        <div className='w-full h-full flex flex-col justify-center items-center'>
                                            <BookDashed strokeWidth={0.2} size={48} className='size-48 stroke-red-900' />
                                            <span className='font-[Inter] text-lg font-medium text-red-800'>No History yet!</span>
                                            <span className='font-[Inter] w-72 text-xs font-medium text-red-800 text-wrap text-center'>Start exploring creations made by other students through the projects tab!</span>
                                        </div>
                                        :
                                        <>
                                            <div className="flex flex-col xl:flex-row justify-center items-center gap-3 2xl:h-1/2">
                                                {recentViewed?.slice(0, 2).map((project) =>
                                                    <div onClick={() => setProjectView(true)} key={project.id}>
                                                        <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='bg-gray-300 hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                                    </div>
                                                )
                                                }
                                            </div>
                                            {recentViewed?.length >= 2 &&

                                                <div className="hidden xl:flex justify-center items-start gap-3 2xl:h-1/2">
                                                    {recentViewed?.slice(2, 4).map((project) =>
                                                        <div onClick={() => setProjectView(true)} key={project.id}>
                                                            <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='bg-gray-300 hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </div>

                        {/* Recent Projects */}
                        <div className="w-1/2 rounded-3xl bg-white flex flex-col p-5 gap-3">
                            <h3 className='font-[Inter] font-medium text-xl'>Recent Projects</h3>

                            {loadingRecent ?
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
                                    {recentProjects.length === 0 ?
                                        <div className='w-full h-full flex flex-col justify-center items-center'>
                                            <FolderOpen strokeWidth={0.2} size={48} className='size-48 stroke-red-900' />
                                            <span className='font-[Inter] text-lg font-medium text-red-800'>No Projects yet!</span>
                                            <span className='font-[Inter] w-72 text-xs font-medium text-red-800 text-wrap text-center'>Start sharing your projects to other students through pressing the upload project button above!</span>
                                        </div>
                                        :
                                        <>
                                            <div className="flex flex-col xl:flex-row justify-center items-center gap-3 2xl:h-1/2">
                                                {recentProjects?.slice(0, 2).map((project) =>
                                                    <div onClick={() => setProjectView(true)} key={project.id}>
                                                        <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='bg-gray-300 hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                                    </div>
                                                )
                                                }
                                            </div>
                                            {recentProjects?.length >= 2 &&
                                                < div className="hidden xl:flex justify-center items-start gap-3 2xl:h-1/2">
                                                    {recentProjects?.slice(2, 4).map((project) =>
                                                        <div onClick={() => setProjectView(true)} key={project.id}>
                                                            <img onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} src={project.file_icon ? `${StorageURL}${project.file_icon}` : '../public/sample_thumbnail.png'} className='bg-gray-300 hover:bg-white hover:bg-opacity-35 hover:brightness-50 transition-all rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div >
            <ViewProjectPanel
                open={projectView}
                setOpen={setProjectView}
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
                profilePic={`${StorageURL}${userProjectData?.profile?.image}`}
                file_type={viewData?.file_extension}
                file_source={`${StorageURL}` + viewData?.file}
                loading={loading}
                like_data={likeData?.id}
                favorite_data={favoriteData?.id}
            />

        </>
    )
}
export default withAuth(ClientHome)