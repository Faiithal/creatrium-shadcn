import React, { useContext, useEffect, useState } from 'react'
import UploadDialog from '../components/ui/UploadDialog'
import ProjectItem from '../components/ui/ProjectItem'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import ViewProjectPanel from '../components/ui/ViewProjectPanel'
import { userProjects } from "../api/profile"
import { StorageURL } from '../api/configuration'
import { onOpen } from '../api/onOpen'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../contexts/AuthContext'
import withAuth from '../high-order-component/withAuth'
import { Oval } from 'react-loader-spinner'


function UserProject() {
    const [likeData, setLikeData] = useState()
    const [favoriteData, setFavoriteData] = useState()
    const [loading, setLoading] = useState()
    const [userProjectData, setUserProjectData] = useState()
    const [viewData, setViewData] = useState()
    const [cookies, setCookie, removeCookie] = useCookies()
    const { user } = useContext(AuthContext)
    const [loadingRecent, setLoadingRecent] = useState(true)

    const [recentProjects, setRecentProjects] = useState(true)

    function getRecentProjects(id) {
        userProjects(id).then((res) => {
            setRecentProjects(res.data)
        }
        ).finally(() => setLoadingRecent(false))
    }

    useEffect(() => {
        if (user) {
            const token = cookies.token
            getRecentProjects(user?.id)
        }
    }, [user])

    return (
        <Sheet>
            <div className='w-full h-screen bg-[#D4D4D4] flex flex-col items-center'>
                <div className='w-full h-40 px-20 flex justify-between items-center' style={{ background: 'linear-gradient(90deg, #B08080 0.84%, #AF8484 31.08%, #968585 90.72%)' }} >
                    <div className='flex flex-col items-center'>
                        <h2 className='text-white font-[Inter] font-bold text-3xl'>Your Projects</h2>
                        <h3 className='font-medium'>A gateway to creativity</h3>
                    </div>
                    <UploadDialog />
                </div>
                <ScrollArea className='w-5/6 h-full justify-center items-start'>
                    <div className='w-full h-full flex justify-center flex-wrap items-start gap-y-2'>
                        {loadingRecent ?
                            <div className='w-full h-96 flex justify-center items-center'>
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
                                {recentProjects?.map((project) =>
                                    <SheetTrigger key={project.id}>
                                        <ProjectItem onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                                    </SheetTrigger>
                                )}
                            </>
                        }
                    </div>
                </ScrollArea>
            </div>
            <ViewProjectPanel
                response={viewData}
                id={viewData?.id}
                viewer_id={user?.id}
                creator_id={viewData?.user_id}
                file_icon={`${StorageURL}${viewData?.file_icon}`}
                gender={user?.profile?.gender}
                authors={viewData && JSON.parse(viewData?.authors)}
                title={viewData?.name}
                categories={viewData?.categories.map((e) => e.category)}
                thumbnails_source={(viewData) && (viewData.thumbnails != 'null' ? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : null)}
                username={userProjectData?.user?.name} //saved for auth context
                date={viewData?.created_at}
                description={viewData?.description}
                profilePic='SamplePic'
                file_type={viewData?.file_extension}
                file_source={`${StorageURL}` + viewData?.file}
                loading={loading}
                like_data={likeData?.id}
                favorite_data={favoriteData?.id} />
        </Sheet>
    )
}
export default withAuth(UserProject)