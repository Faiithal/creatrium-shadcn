import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import ProjectItem from '../components/ui/ProjectItem'
import samplethumb from '../assets/SampleThumbnail.jpeg'
import { Button } from '../components/ui/button'

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
  return (
    <>
      <div className='w-full h-screen bg-main'>
        <Sheet>
          <div className='w-full flex flex-col bg-main '>
            <div className='w-full h-2/7 shadow-md p-5 flex flex-col items-center'>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Popular</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>

              <Carousel className='w-[85%]'>
                <CarouselContent>
                  <CarouselItem onClick={() => setView(true)} className='flex gap-3 justify-center' >
                    {/* add a function that upon click grab the values of the current project and put them in a view project
                     / OR /
                      grab the index of the current value and just use the array variable made from the index function and use the index to find the data present inside it 
                     
                  */}
                    <SheetTrigger>
                      <ProjectItem thumbnail={samplethumb} name='[Insert Project Name]' />
                    </SheetTrigger>                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className='w-full flex justify-end'>
                <Button>See More</Button>
              </div>
            </div>
            <div className='w-full h-2/7 shadow-md p-5 flex flex-col items-center'>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Popular</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>
              <Carousel className='w-[85%]'>
                <CarouselContent>
                  <CarouselItem onClick={() => setView(!view)} className='flex gap-3 justify-center' >
                    <SheetTrigger>
                      <ProjectItem thumbnail={samplethumb} name='[Insert Project Name]' />
                    </SheetTrigger>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className='w-full flex justify-end'>
                <Button>See More</Button>
              </div>
            </div>
            <div className='w-full h-2/7 shadow-md p-5 flex flex-col items-center'>
              <div className='w-full flex flex-col'>
                <h1 className='text-3xl font-[Inter] font-extrabold'>Recently Uploaded</h1>
                <h2 className='font-bold font-[Inter]'>Past Month</h2>
              </div>
              <Carousel className='w-[85%]'>
                <CarouselContent>
                  <CarouselItem className='flex gap-3 justify-center' >
                    <SheetTrigger>
                      <ProjectItem thumbnail={samplethumb} name='[Insert Project Name]' />
                    </SheetTrigger>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className='w-full flex justify-end'>
                <Button>See More</Button>
              </div>
            </div>
          </div>

          <ViewProjectPanel />
        </Sheet>
      </div>
    </>
  )
}
