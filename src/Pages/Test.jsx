import React from 'react'
import { Button } from '../components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { DialogFooter } from '../components/ui/dialog'
import UploadForm from '../components/ui/UploadForm'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import SampleThumbnail from '../assets/SampleThumbnail.jpeg'


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Star, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ViewProjectPanel from '../components/ui/ViewProjectPanel'


export default function Test() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>

            <Dialog>
                <DialogTrigger>Upload Project</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload File</DialogTitle>
                        <DialogDescription>
                            Choose the type of project you are uploading:
                        </DialogDescription>
                    </DialogHeader>

                    <div className='w-full bg-[#A5A5A5] h-24 rounded-md flex justify-center items-center gap-3 p-4'>
                        <UploadForm type='pdf' />
                        <UploadForm type='web' />
                        <UploadForm type='image' />
                    </div>

                    <DialogFooter >
                        <DialogClose className='w-full flex justify-center'><div className='bg-contrast text-white rounded-md py-1.5 px-5'>Cancel</div></DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Sheet >
                <SheetTrigger>View Project</SheetTrigger>
                <ViewProjectPanel />
            </Sheet>
        </div>
    )
}
