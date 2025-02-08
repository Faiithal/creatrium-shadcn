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
import { add } from '../../api/projects'
import $ from 'jquery'


const reader = new FileReader();



export default function UploadForm(props) {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(0)
    const [category, setCategory] = useState([])

    const onCreate = (e) => {
        e.preventDefault()
        if (!loading) {
            const body = new FormData(e.target)
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDU4YjFjOWZlZTBhMDczMWM2NTE0MGYyZGNlYTgwY2Y0NWIzN2MyZDFiZDlhMjg2ZmEzMGI2MDhkYjRiZmJhZmZmNmYxZDVkNmQ5YTQ2NTMiLCJpYXQiOjE3Mzg5NzY2MTUuMzk2MjMyLCJuYmYiOjE3Mzg5NzY2MTUuMzk2MjM0LCJleHAiOjE3NzA1MTI2MTUuMjE4MDc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.3zF61wJZc-OkO4IDZHQxfRd6x_GoVHCrLvbuS2sFZrWajflWR1hDw6Ja_yRB0MKtKXaWLAwqio5GX40DlvFe_krGKkmvB8iYKgo0lTg7dG7YqrhnnhGT9k8uPc3S6x5Eo2EjGwtnZ115o5QMxOjuV_BX0QXfJ9MAL85jiTpvF-DLyIbav0KjFaCVQRIHCQvpdBOU9hRmXfWx422Jat6ATrAQKGGM7oHlIl8-YngIFmry-0vQw9Ssk5s2yrwW0Bkh1X7a5vZEyhE0qqBBIZo-GrSkbb6WVO8Izd1Sxv9DAIB-H_0nZX3XlNyFcJ3C7s60Audb_utnUqJNG3oRQpauDCwb5tLpJQ2-dY2HTFjbi27qcKqpNVHgK7IHo6JHFuJeVavXr5vYrOdVyhjruttykcTC4uO31tEtJzdN98-xCTgJ9khPQC2SJNwswZOoBijcsHywrT1jNL6SBnyRmygjc0TGpWiWeSq6QrIgL5KeHVuZJgfcaCi5BmAFgDQ_Xgg0UfByn19YTdL7J7gcfEp6u9jo3gcAzRgY5FOIxfLELh4JRkjIxVITVh1qmJX1dwIWtHROWks2Ar3us99wYs-OGoJU3jQHeYE13qDWlETmcb1yz1VJTH-xswI-cUQXEIOC4hjdpCDX9Hyz3GKMAGtA3IrGjvRnByeKb8UbzdbE0HQ'
            body.set('visibility', +check)
            if (category.length !== 0) {
                category.forEach(e => {
                    body.append('categories[]', e)
                });
            }
            console.log(category)
            console.log(+check)
            add(body, token).then((response) => {
                console.log(response)
            })
        }
    }
    const [check, setCheck] = useState(false);
    return (
        <Dialog >
            <DialogTrigger className='bg-transparent h-2/3 w-1/3 text-white border-solid border-white border-2'>{props.type}</DialogTrigger>
            <DialogContent className='max-2xl:h-2/3 overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Upload Project</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => onCreate(e)} className='flex flex-col items-center gap-5' encType='multipart/form-data'>

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
                                <Input name="file" type='file'></Input>
                            </>
                        }
                        {props.type === 'web' &&
                            <>
                                <Label>Website link</Label>
                                <Input name='web_link'></Input>
                            </>
                        }
                        <Label>Thumbnails</Label>
                        <Input name='thumbnails[]' type='file' multiple></Input>
                        <Label>Title</Label>
                        <Input name='name' type='text'></Input>
                        <Label>Authors</Label>
                        <Input name='authors[]' type='text'></Input>
                        <Label>Category/Type</Label>
                        <ComboBox onSelect={(data) => setCategory(data)} />
                        <div className='flex gap-2'>
                            <Checkbox checked={check} onCheckedChange={() => setCheck(!check)} name='visibility' id='visibility' />
                            <Label htmlFor='visibility'>Show project publicly</Label>
                        </div>

                    </div>
                    {/* Ask sir on how to make one button dont do submit */}
                    <DialogFooter className='w-full flex justify-end'>
                        <DialogClose className='hover:bg-stone-200 rounded-md transition-all px-4 py-2 text-sm font-[Inter]' type='button'>Cancel</DialogClose>
                        <Button className='bg-contrast rounded-md hover:bg-highlight transition-all text-white px-4 py-2 text-sm font-[Inter]'>Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
