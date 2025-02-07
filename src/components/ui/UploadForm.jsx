import { React, useState } from 'react'
import { Button } from './button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { DialogFooter } from './dialog'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import ComboBox from './ComboBox'
import { Input } from ''

const reader = new FileReader();


export default function UploadForm(props) {
    const [preview, setPreview] = useState('')
    return (
        <Dialog >
            <DialogTrigger className='bg-transparent h-2/3 w-1/3 text-white border-solid border-white border-2'>{props.type}</DialogTrigger>
            <DialogContent className='max-2xl:h-2/3 overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Upload Project</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form className='flex flex-col items-center gap-5' encType='multipart/form-data'>

                    <div className='w-full flex flex-col gap-2'>
                        <Label>Main Icon</Label>
                        <div className='w-full flex justify-center'>
                            {preview &&
                                <img id='preview' className='aspect-[16/9] object-cover w-2/3 bg-gray-400 rounded-md' src={preview} />
                            }
                        </div>
                        <Input name='icon' type='file'
                            onChange={
                                (e) => {
                                    // console.log(URL.createObjectURL(e.target.files))
                                    reader.addEventListener(
                                        "load", () => {
                                            setPreview(reader.result)
                                        },
                                    )
                                    reader.readAsDataURL(e.target.files[0])
                                }
                            }
                        ></Input>
                        {props.type === 'pdf' &&
                            <>
                                <Label>File</Label>
                                <Input name='file' type='file'></Input>
                            </>
                        }
                        {props.type === 'web' &&
                            <>
                                <Label>Website link</Label>
                                <Input name='text'></Input>
                            </>
                        }
                        <Label>Thumbnails</Label>
                        <Input name='thumbnails' type='file' multiple></Input>
                        <Label>Title</Label>
                        <Input name='name' type='text'></Input>
                        <Label>Authors</Label>
                        <Input name='authors' type='text'></Input>
                        <Label>Category/Type</Label>
                        <ComboBox />
                        <div className='flex gap-2'>
                            <Checkbox id='visibility' />
                            <Label>Show project publicly</Label>
                        </div>
                    </div>

                    {/* Ask sir on how to make one button dont do submit */}
                    <DialogFooter className='w-full flex justify-end'>
                        <DialogClose asChild>Cancel</DialogClose>
                        <DialogClose>Create</DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
