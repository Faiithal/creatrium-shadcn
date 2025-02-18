import React, { useContext, useEffect, useState } from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import ProjectItem from '../components/ui/ProjectItem'
import samplethumb from '../assets/SampleThumbnail.jpeg'
import { Button } from '../components/ui/button'
import { cn } from "@/lib/utils"
import { indexPopular, indexRecent, indexTopRated, show } from '../api/projects'
import { StorageURL } from '../api/configuration'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
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

  useEffect(() => {
    console.log(user)
  }, [user]
  )

  function getPopular() {
    indexPopular().then((res) => {
      console.log(res)
      setPopular(res.data)
    }
    )
  }
  function getPopular() {
    indexPopular().then((res) => {
      console.log(res)
      setPopular(res.data)
    }
    )
  }

  function getTopRated() {
    indexTopRated().then((res) => {
      console.log(res)
      setTopRated(res.data)
    }
    )
  }

  function getRecent() {
    indexRecent().then((res) => {
      console.log(res)
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
        console.log(res)
        setViewData(res.data)
        storeHistory(res.data.id, token)
        // Checks Like

        checkUser(res.data.user_id).then((res) => {
          console.log(res)
          setUserData(res.data)
        })

        checkLike(res?.data.id, token).then((res) => {
          console.log(res)
          if (res?.ok) {
            setLikeData(res?.data)
          }
        }
        )

        checkFavorite(res?.data.id, token).then((res) => {
          console.log(res)
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
        <Sheet>
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
              <div className={cn('-translate-y-10 overflow-hidden', !seeTopRated && 'h-50')}>
                {topRated?.map((project) => {
                  return (
                    <SheetTrigger key={project.id}>
                      <div key={project.id}>
                        <ProjectItem onClick={() => onOpen(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </div>
                    </SheetTrigger>
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
              <div className={cn('-translate-y-10 overflow-hidden', !seePopular && 'h-50')}>
                {popular?.map((project) => {
                  return (
                    <SheetTrigger key={project.id}>
                      <div key={project.id}>
                        <ProjectItem onClick={() => onOpen(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </div>
                    </SheetTrigger>
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
              <div className={cn('-translate-y-10 overflow-hidden', !seeRecent && 'h-50')}>
                {recent?.map((project) => {
                  return (
                    <SheetTrigger key={project.id}>
                      <div key={project.id}>
                        <ProjectItem onClick={() => onOpen(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </div>
                    </SheetTrigger>
                  )
                })}
              </div>
            </div>
          </div>

          <ViewProjectPanel
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
            thumbnails_source={(viewData) && (viewData.thumbnails != 'null' ? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : console.log('works'))}
            username={userData?.user?.name} //saved for auth context
            date={viewData?.created_at}
            description={viewData?.description}
            profilePic='SamplePic'
            file_type={viewData?.file_extension}
            file_source={`${StorageURL}` + viewData?.file}
            loading={loading}
            like_data={likeData?.id}
            favorite_data={favoriteData?.id}
          />
        </Sheet>
      </div>
    </>
  )
}

export default withAuth(Projects)