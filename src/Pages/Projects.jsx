import React from 'react'
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

export default function Projects() {
  return (
    <>
    <div className='w-full h-screen bg-main'>
      <div className='w-full flex flex-col bg-main '>
        <div className='w-full h-2/7 shadow-md p-5 flex flex-col items-center'>
          <div className='w-full flex flex-col'>
            <h1 className='text-3xl font-[Inter] font-extrabold'>Popular</h1>
            <h2 className='font-bold font-[Inter]'>Past Month</h2>
          </div>

          <Carousel className='w-[85%]'>
            <CarouselContent>
              <CarouselItem className='flex gap-3 justify-center' >
                <ProjectItem thumbnail={samplethumb} name='[Insert Project Name]'/> 
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious/>
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
              <CarouselItem className='flex gap-3 justify-center' >
                <ProjectItem thumbnail={samplethumb} name='[Insert Project Name]'/>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious/>
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
                <ProjectItem thumbnail={samplethumb} name='[Insert Project Name]'/>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext />
          </Carousel>
          <div className='w-full flex justify-end'>
            <Button>See More</Button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
