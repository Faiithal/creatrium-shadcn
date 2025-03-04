import React, { useState } from 'react'
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
import { Plus } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from './button'
import { useCookies } from 'react-cookie'
import { store } from '../../api/comments'
import { toast } from 'react-toastify'


export default function AddCommentPanel(props) {
    const [cookies, useCookie, removeCookie] = useCookies()
    const [open, setOpen] = useState(false)
    const onComment = (e) => {
        e.preventDefault()
        const id = props.id
        const token = cookies.token
        const body = new FormData(e.target)
        store(body, id, token).then(res => {
            if (res?.ok) {
                toast.success('Comment added successfully')
                setOpen(false)
                props.onOpenChange()
                return
            }
            toast.error(res.message)
        }
        )

    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <Button onClick={() => setOpen(true)}><Plus /></Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Comment</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-3' onSubmit={(e) => onComment(e)}>
                    <Textarea name='content' type='text' />
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)} type='button' variant='outline'>Cancel</Button>
                        <Button>Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}
