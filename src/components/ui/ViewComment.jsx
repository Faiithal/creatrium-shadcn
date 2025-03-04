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
import { MessageCircleMore, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StorageURL } from '../../api/configuration'
import AddCommentPanel from './AddCommentPanel'
import dayjs from 'dayjs'

export default function ViewComment(props) {
    const [comments, setComments] = useState()

    // useEffect(() => {
    //     show(props.id).then((res) => {
    //         if (res?.ok)
    //             setComments(res.data.comments)
    //     })
    // }, [props.id])

    const onOpen = () => {
        // console.log(id)
        show(props.id).then((res) => {
            if (res?.ok) {
                setComments(res.data)
            }
        })
    }
    // Onclick = onOpen(props.id)
    return (
        <>
            <Dialog>
                <DialogTrigger asChild onClick={() => onOpen()} className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300'>
                    <MessageCircleMore strokeWidth={'1.3px'} color='black' />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comments</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea>
                        <div className='flex flex-col gap-4 max-h-96 mb-2'>
                            {comments?.length > 0 ?
                                comments?.map((user, index) =>
                                    <div key={index} className='w-full h-fit flex flex-col gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <Avatar>
                                                <AvatarImage src={`${StorageURL}${user.profile.image}`} />
                                                <AvatarFallback><img src={`../../${user?.profile?.gender}Fallback.png`} /></AvatarFallback>
                                            </Avatar>
                                            <span>{user.name}</span>
                                            <span>{dayjs(user.pivot.created_at).format('MMM D, YYYY h:mm A')}</span>
                                        </div>
                                        <div className='bg-stone-200 p-2 rounded-md'>
                                            <span>
                                                {user.pivot.content}
                                            </span>
                                        </div>
                                    </div>
                                )
                                :
                                <div>
                                    No comments yet
                                </div>
                            }
                        </div>
                    </ScrollArea>

                    <DialogFooter >
                        <AddCommentPanel id={props.id} onOpenChange={onOpen} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
