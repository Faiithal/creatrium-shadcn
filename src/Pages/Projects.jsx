import React, { useContext, useEffect, useState } from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import ProjectItem from '../components/ui/ProjectItem'
import samplethumb from '../assets/SampleThumbnail.jpeg'
import { Button } from '../components/ui/button'
import { cn } from "@/lib/utils"
import { indexPopular, indexRecent, indexTopRated, show } from '../api/projects'
import { StorageURL } from '../api/configuration'

import ViewProjectPanel from '../components/ui/ViewProjectPanel'
import { checkLike } from '../api/likes'
import { checkFavorite } from '../api/favorites'
import { store as storeHistory } from '../api/history'
import { show as checkUser } from '../api/profile'
import { AuthContext } from '../contexts/AuthContext'
import { useCookies } from 'react-cookie'
import withAuth from '../high-order-component/withAuth'

function Projects() {
  const [view, setView] = useState(false)
  const [popular, setPopular] = useState()
  const [topRated, setTopRated] = useState()
  const [recent, setRecent] = useState()
  const [viewData, setViewData] = useState()
  const [seeTopRated, setSeeTopRated] = useState(false)
  const [seePopular, setSeePopular] = useState(false)
  const [seeRecent, setSeeRecent] = useState(false)
  const [likeData, setLikeData] = useState()
  const [favoriteData, setFavoriteData] = useState()
  const [loading, setLoading] = useState()
  const [userData, setUserData] = useState()
  const { user } = useContext(AuthContext)
  const [cookies, setCookie, removeCookie] = useCookies()
  
  const [projectView, setProjectView] = useState(false)

  useEffect(() => {
  }, [user]
  )

  function getPopular() {
    indexPopular().then((res) => {
      setPopular(res.data)
    }
    )
  }

  function getTopRated() {
    indexTopRated().then((res) => {
      setTopRated(res.data)
    }
    )
  }

  function getRecent() {
    indexRecent().then((res) => {
      setRecent(res.data)
    }
    )
  }

  useEffect(() => {
    getPopular()
    getRecent()
    getTopRated()
  }, [])

  // grabs toggled project data
  const onOpen = (viewId) => {
    const token = cookies.token
    setLoading(true)
    if (viewId) {
      show(viewId).then((res) => {
        setViewData(res.data)
        storeHistory(res.data.id, token)
        // Checks Like

        checkUser(res.data.user_id).then((res) => {
          setUserData(res.data)
        })

        checkLike(res?.data.id, token).then((res) => {
    
          if (res?.ok) {
            setLikeData(res?.data)
          }
        }
        )

        checkFavorite(res?.data.id, token).then((res) => {
          if (res?.ok) {
            setFavoriteData(res?.data)
          }
        }
        ).finally(() => {
          setLoading(false)
        })

      }
      )
    }

  }

  return (
    <>
      <div className='w-full h-screen bg-main'>
          <div className='w-full flex flex-col bg-main '>
            <div className={
              cn('w-full h-[360px] shadow-md p-5 flex flex-col items-center overflow-hidden transition-all',
                seeTopRated && 'h-[800px]'
              )}>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Top Rated</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>
              <div className={cn('w-full relative top-56 flex justify-end z-10 transition-all', seeTopRated && 'top-[675px]')}>
                <Button onClick={() => setSeeTopRated(!seeTopRated)}>{seeTopRated ? 'See Less' : 'See More'}</Button>
              </div>
              <div className={cn('-translate-y-10 overflow-hidden w-full flex flex-wrap', !seeTopRated && 'h-50')}>
                {topRated?.map((project) => {
                  return (
                      <div className='w-fit' onClick={() => setProjectView(true)} key={project.id}>
                        <ProjectItem onClick={() => onOpen(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </div>
                  )
                })}
              </div>
            </div>

            <div className={
              cn('w-full h-[360px] shadow-md p-5 flex flex-col items-center overflow-hidden transition-all',
                seePopular && 'h-[800px]'
              )}>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Popular</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>
              <div className={cn('w-full relative top-56 flex justify-end z-10 transition-all', seePopular && 'top-[675px]')}>
                <Button onClick={() => setSeePopular(!seePopular)}>{seePopular ? 'See Less' : 'See More'}</Button>
              </div>
              <div className={cn('-translate-y-10 overflow-hidden w-full flex flex-wrap', !seePopular && 'h-50 w-full flex flex-wrap0')}>
                {popular?.map((project) => {
                  return (
                      <div onClick={() => setProjectView(true)} key={project.id}>
                        <ProjectItem onClick={() => onOpen(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </div>
                  )
                })}
              </div>
            </div>

            <div className={
              cn('w-full h-[360px] shadow-md p-5 flex flex-col items-center overflow-hidden transition-all',
                seeRecent && 'h-[800px]'
              )}>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Recent</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>
              <div className={cn('w-full relative top-56 flex justify-end z-10 transition-all', seeRecent && 'top-[675px]')}>
                <Button onClick={() => setSeeRecent(!seeRecent)}>{seeRecent ? 'See Less' : 'See More'}</Button>
              </div>
              <div className={cn('-translate-y-10 overflow-hidden w-full flex flex-wrap', !seeRecent && 'h-50 w-full flex flex-wrap')}>
                {recent?.map((project) => {
                  return (
                      <div onClick={() => setProjectView(true)} key={project.id}>
                        <ProjectItem onClick={() => onOpen(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </div>
                  )
                })}
              </div>
            </div>
          </div>

          <ViewProjectPanel
            open={projectView}
            setOpen={setProjectView}
            response={viewData}
            viewer_id={user?.id}
            creator_id={viewData?.user_id}
            fave_count={viewData?.user_favorites_count}
            like_count={viewData?.user_likes_count}
            id={viewData?.id}
            gender={userData?.profile?.gender}
            file_icon={`${StorageURL}${viewData?.file_icon}`}
            authors={viewData && JSON.parse(viewData?.authors)}
            title={viewData?.name}
            categories={viewData?.categories.map((e) => e.category)}
            thumbnails_source={(viewData) && (viewData.thumbnails != 'null' ? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : null)}
            username={userData?.user?.name} //saved for auth context
            date={viewData?.created_at}
            description={viewData?.description}
            profilePic={`${StorageURL}${userData?.profile?.image}`}
            file_type={viewData?.file_extension}
            file_source={`${StorageURL}` + viewData?.file}
            loading={loading}
            like_data={likeData?.id}
            favorite_data={favoriteData?.id}
          />
      </div>
    </>
  )
}

export default withAuth(Projects)