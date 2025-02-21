import React, { useContext, useEffect, useState } from 'react'
import withAuth from '../high-order-component/withAuth'
import { useSearchParams } from 'react-router-dom'
import { search } from '../api/projects'
import { Separator } from '@radix-ui/react-separator'
import ProjectItem from '../components/ui/ProjectItem'
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import { StorageURL } from '../api/configuration'
import { onOpen } from '../api/onOpen'
import { useCookies } from 'react-cookie'
import ViewProjectPanel from '../components/ui/ViewProjectPanel'
import { AuthContext } from '../contexts/AuthContext'



function SearchProject() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchBody, setSearchBody] = useState()
    const [searchResults, setsearchResults] = useState()

    const [likeData, setLikeData] = useState()
    const [favoriteData, setFavoriteData] = useState()
    const [loading, setLoading] = useState()
    const [userProjectData, setUserProjectData] = useState()
    const [viewData, setViewData] = useState()
    const [cookies, setCookie, removeCookie] = useCookies()
    const { user } = useContext(AuthContext)


    useEffect(() => {
        // add index in case of empty string
        setSearchBody(searchParams.get('search_query'))
    }, [searchParams])

    useEffect(() => {
        if (searchBody)
            search(searchBody).then((res) => {
                setsearchResults(res.data)
            })
    }, [searchBody])

    return (
        <div className='bg-[#D9D9D9] w-full min-h-screen max-h-fit  p-10'>

            <div className='flex flex-col'>
                <span className='text-4xl font-bold font-[Inter]'>Search Results</span>
                <span className='font-[Inter] indent-5'>for {searchBody} </span>
            </div>
            <Sheet>
                <div className='w-full h-fit flex flex-wrap justify-center'>

                    {searchResults && searchResults?.map((project) =>
                        <>
                            <SheetTrigger key={project.id}>
                                <ProjectItem onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading, cookies.token)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                            </SheetTrigger>
                        </>
                    )}
                </div>
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
                    username={userProjectData?.user?.name}
                    date={viewData?.created_at}
                    description={viewData?.description}
                    profilePic={`${StorageURL}${userProjectData?.profile?.image}`}
                    file_type={viewData?.file_extension}
                    file_source={`${StorageURL}` + viewData?.file}
                    loading={loading}
                    like_data={likeData?.id}
                    favorite_data={favoriteData?.id}
                />
            </Sheet>
        </div>
    )
}

export default withAuth(SearchProject)
