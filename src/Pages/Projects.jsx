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

export default function Projects() {
  const [view, setView] = useState(false)
  const [popular, setPopular] = useState()
  const [topRated, setTopRated] = useState()
  const [recent, setRecent] = useState()
  const [viewId, setViewId] = useState()
  const [viewData, setViewData] = useState()
  const [seeTopRated, setSeeTopRated] = useState(false)
  const [seePopular, setSeePopular] = useState(false)
  const [seeRecent, setSeeRecent] = useState(false)

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
  useEffect(() => {
    if (viewId) {
      show(viewId).then((res) => {
        console.log(res)
        setViewData(res.data)
      }
      )
    }
  }, [viewId])

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
                    <>
                      <SheetTrigger >
                        <ProjectItem key={project.id} onClick={() => setViewId(project.id)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                      </SheetTrigger>
                    </>
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
            thumbnails_source={(viewData) && (viewData.thumbnails != 'null'? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : console.log('works'))}
            username='Nagatoro' //saved for auth context
            date='February 4 2025'
            description={viewData?.description}
            profilePic='SamplePic'
            file_type={viewData?.file_extension}
            file_source={`${StorageURL}` + viewData?.file}
          />
        </Sheet>
      </div>
    </>
  )
}
