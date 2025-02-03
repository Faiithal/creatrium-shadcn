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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function Test() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Dialog>
                <DialogTrigger><Button>Upload Project</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Project</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <form className='flex flex-col items-center gap-5' encType='multipart/form-data'>

                        <img className='aspect-[16/9] object-cover w-full bg-gray-400 rounded-md' />    
                        <div className='w-full flex flex-col gap-2'>
                            
                            <Input type='file'></Input>
                            <Label>Title</Label>
                            <Input name='name' type='text'></Input>
                            <Label>Authors</Label>
                            <Input name='authors' type='text'></Input>
                            <Label>Category/Type</Label>
                            <Popover>
                                <PopoverTrigger>
                                    <Input name='category_id' type='text'></Input>
                                </PopoverTrigger>
                                <PopoverContent>Place content for the popover here.</PopoverContent>
                            </Popover>

                        </div>
                    </form>

                    <DialogFooter>
                        <DialogClose><Button>Cancel</Button></DialogClose>
                        <DialogClose><Button>Create</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
