import React, { useEffect, useState } from 'react'
import UploadForm from './UploadForm'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import { show } from '../../api/comments'
import { MessageCircleMore } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ViewComment(props) {
    const [comments, setComments] = useState()

    // useEffect(() => {
    //     show(props.id).then((res) => {
    //         if (res?.ok)
    //             setComments(res.data.comments)
    //     })
    // }, [props.id])

    const onOpen = (id) => {
        show(id).then((res) => {
            if (res?.ok)
                setComments(res.data.comments)
        })
    }
    // Onclick = onOpen(props.id)
    return (
        <>
            <Dialog>
                <DialogTrigger asChild onClick={() => { }} className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300' size="icon">
                    <MessageCircleMore strokeWidth={'1.3px'} color='black' />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comments</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea>
                        <div className='flex flex-col gap-4 max-h-96'>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                            <div className='w-full h-fit flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Faithal</span>
                                </div>
                                <div className='bg-stone-200 p-2 rounded-md'>
                                    <span>
                                        "This is exactly what I was looking for!"
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter ></DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
