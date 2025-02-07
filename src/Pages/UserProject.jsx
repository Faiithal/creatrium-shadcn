import React from 'react'
import UploadForm from '../components/ui/UploadForm'
import UploadDialog from '../components/ui/UploadDialog'
import ProjectItem from '../components/ui/ProjectItem'
import { ScrollArea } from "@/components/ui/scroll-area"
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

export default function UserProject() {
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
                        <SheetTrigger>
                            <ProjectItem />
                        </SheetTrigger>
                        <SheetTrigger>
                            <ProjectItem />
                        </SheetTrigger>
                        <SheetTrigger>
                            <ProjectItem />
                        </SheetTrigger>
                        <SheetTrigger>
                            <ProjectItem />
                        </SheetTrigger>
                    </div>
                </ScrollArea>
            </div>
            <ViewProjectPanel />
        </Sheet>
    )
}
