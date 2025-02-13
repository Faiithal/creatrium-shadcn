import React, { useEffect, useState } from 'react'
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

export default function Projects() {
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
    const token = 
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNkMDM4OTliYzZiZWY0MzE3Y2I4YTE2MjQwZDUwNTQwNWNkNDY2MzgxMzIxNjE2MWZjZDI0OTdjMWJlMzRmZmEwODBmOWJlMjgwMzNjMTUiLCJpYXQiOjE3MzkzNDA4MTYuNzI1OTIzLCJuYmYiOjE3MzkzNDA4MTYuNzI1OTI2LCJleHAiOjE3NzA4NzY4MTYuNTE3ODc2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HyoYdODpyzKXclRxDdcrwEdbrVuFHQI4PMFWGtOD9wD_0ywKABH-mJcOvPC_tb0xrg8GOSV3TxgddP1Vx7OXJ7fHoAo4zTv1NGr0zVgRclbUactDI31Q8JEbu5CEzP9Y_PpgG5EDfIy9RqY9HgRxWvuoo2tU1G0H_j-FqhiEThqJFILm2HMFPcFX8jmQfugBCfXgF5o4oOKyCNs7s8sqchO-_neLGkdunPbyGoM8sY6nWQpOOLZYAHL8JDrb_RT0prpgcZipZZUD0MH9Vm_RchzDtbgkkPrPpbH-pTQOrcI0fiwlJf_hYdW2IN6zzPMlFOUSakyCpEFf3ICRYfGx-H1kVMXn7sV57-KkZnCg4tYbTYuBOPsq8RYrYpZruxGQRF0eK6QfsYaECiO2hEyjBEkb0cxmcw4ryfdoWVXez1zoi4FUQ201dW6Dha4J4DMeLL0UE1ZLQy81mmTHJkFXRkb0HtzPnO1CzSyG3AUjZluG1MQFEQfEy0wS481YIOp-GMcy8700OHuzyDybwSwooYdCyD-7s7pydbqkG04ayo9g_CJnq9TGD8osBF8VFrzdg0IgdY3lPXZwBjtpZFbnUgu3RLrjgn94yK2I_Lsa8IDV6_VTWH-uPPtska7Rxc9OB0sRk-UpPOm7RzJhWjMpXcRUt7re4OzmvLT-b_tq9fE'
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
          </div>

          <ViewProjectPanel
            response={viewData}
            id={viewData?.id}
            file_icon={`${StorageURL}${viewData?.file_icon}`}
            authors={viewData && JSON.parse(viewData?.authors)}
            title={viewData?.name}
            categories={viewData?.categories.map((e) => e.category)}
            thumbnails_source={(viewData) && (viewData.thumbnails != 'null' ? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : console.log('works'))}
            username={userData?.user?.name} //saved for auth context
            date='February 4 2025'
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
