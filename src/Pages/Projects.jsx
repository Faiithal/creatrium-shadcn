import React, { useEffect, useState } from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import ProjectItem from '../components/ui/ProjectItem'
import samplethumb from '../assets/SampleThumbnail.jpeg'
import { Button } from '../components/ui/button'
import { cn } from "@/lib/utils"
import { indexPopular, indexRecent, indexTopRated, show } from '../api/projects'
import { URL } from '../api/configuration'


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
      show(viewId).then((res) =>
      {
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
            <div className='w-full h-2/7 shadow-md p-5 flex flex-col items-center'>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Top Rated</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>
              <div>
                {topRated?.map((project) => {
                  return (
                    <SheetTrigger >
                      <ProjectItem key={project.id} onClick={() => setViewId(project.id)} thumbnail={'http://127.0.0.1:8000/storage/' + project.file_icon} name={project.name} />
                    </SheetTrigger>
                  )
                })}
              </div>

              <div className='w-full flex justify-end'>
                <Button>See More</Button>
              </div>
            </div>
          </div>

          <ViewProjectPanel
          response={viewData}
          authors={viewData && JSON.parse(viewData?.authors).map((e) => e)}
          title = {viewData?.name}
          categories = {viewData?.categories.map((e) => e.category)}
          thumbnails_source = {viewData && JSON.parse(viewData?.thumbnails).map((e) => 'http://127.0.0.1:8000/storage/' + e)}
          username = 'Nagatoro'
          date = 'February 4 2025'
          description = {viewData?.description}
          profilePic = 'SamplePic'
          file_type = {viewData?.file_extension}
          file_source={'http://127.0.0.1:8000/storage/' + viewData?.file}
          />
        </Sheet>
      </div>
    </>
  )
}
