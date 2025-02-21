import { React, useEffect, useState } from 'react'
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
import { Checkbox } from "@/components/ui/checkbox"
import ComboBox from './ComboBox'
import { add } from '../../api/projects'
import { ToastContainer, toast } from 'react-toastify';
import { Textarea } from "@/components/ui/textarea"
import { useCookies } from 'react-cookie'


const reader = new FileReader();

export default function UploadForm(props) {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(0)
    const [category, setCategory] = useState([])
    const [check, setCheck] = useState(false)
    const [errors, setErrors] = useState()
    const [cookies, setCookie, removeCookie] = useCookies()

    const onCreate = (e) => {
        e.preventDefault()
        if (!loading) {
            setLoading(true)
            const authors = document.getElementById('authors').value
            const authorsArray = authors && authors.split(',')
            // console(e) => e.trim()))
            const body = new FormData(e.target)
            const token = cookies.token
            body.append('type', props.value)
            body.set('visibility', +check)
            authors ? body.set('authors[]', JSON.stringify(authorsArray.map((e) => e.trim()))) : body.delete('authors[]')

            if (category.length !== 0) {
                category.forEach(e => {
                    body.append('categories[]', e)
                });
            }


            add(body, token).then((res) => {
                if (!res?.ok) {
                    setErrors(res?.data)
                }
            }).finally(() => {
                setLoading(false)
            })
            props.setOpen(false)
        }
    }

    useEffect(() => console.log('asdfasdfa'), [props.open])

    return (
        <>
            <Dialog open={props.open} onOpenChange={
                () => {
                    props.setOpen(false)
                    setPreview(null)
                }}>
                <Button onClick={() => {
                    props.setOpen(true)

                }
                } className='bg-transparent hover:bg-zinc-500 h-2/3 w-1/3 text-white border-solid border-white border-2'>{props.type}</Button>
                <DialogContent className='h-2/3 overflow-y-auto'>
                    <DialogHeader>
                        <DialogTitle>Upload Project</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={(e) => onCreate(e)} className='flex flex-col items-center gap-5' encType='multipart/form-data'>

                        <div className='w-full h-fit flex flex-col gap-2'>
                            <Label>Main Icon {errors?.file_icon && <span className='text-red-500'>*{errors?.file_icon}*</span>}</Label>
                            <div className='w-full flex justify-center'>
                                {preview &&
                                    <img id='preview' className='aspect-[16/9] object-cover w-2/3 bg-gray-400 rounded-md' src={preview} />
                                }
                            </div>
                            <Input name='file_icon' type='file'
                                onChange={
                                    (e) => {
                                        // consolee.target.files))
                                        reader.addEventListener(
                                            "load", () => {
                                                setPreview(reader.result)
                                            },
                                        )
                                        reader.readAsDataURL(e.target.files[0])
                                    }
                                }
                            ></Input>
                            {props.type === 'PDF' &&
                                <>
                                    <Label>File {errors?.file && <span className='text-red-500'>*{errors?.file}*</span>}</Label>
                                    <Input name="file" type='file'></Input>
                                </>
                            }
                            {props.type === 'WEB' &&
                                <>
                                    <Label>Website link {errors?.web_link && <span className='text-red-500'>*{errors?.web_link}*</span>}</Label>
                                    <Input name='web_link'></Input>
                                </>
                            }
                            <Label>Thumbnails
                                {
                                    errors &&
                                    <div className='flex flex-col gap-1 mt-1'>
                                        {errors?.thumbnails && <span className='text-red-500'> *{errors?.thumbnails}*</span>}
                                        {Object.keys(errors).some((error) => {
                                            return error.startsWith('thumbnails.')
                                        }
                                        ) && <span className='text-red-500'> *One of the files is not an image*</span>
                                        }

                                    </div>
                                }
                            </Label>
                            <Input name='thumbnails[]' type='file' multiple></Input>
                            <Label>Title {errors?.name && <span className='text-red-500'>*{errors?.name}*</span>}</Label>
                            <Input name='name' type='text'></Input>
                            <Label>Description {errors?.desription && <span className='text-red-500'>*{errors?.description}*</span>}</Label>
                            <Textarea name='description' type='text'></Textarea>
                            <Label>Authors {errors?.authors && <span className='text-red-500'>*{errors?.authors}*</span>}</Label>
                            <Input id='authors' name='authors[]' type='text' placeholder='Enter authors (e.g., John Doe, Jane Smith, Alex Johnson)'></Input>
                            <Label>Category/Type {errors?.categories && <span className='text-red-500'>*{errors?.categories}*</span>}</Label>
                            <ComboBox onSelect={(data) => setCategory(data)} />
                            <div className='flex gap-2'>
                                <Checkbox checked={check} onCheckedChange={() => setCheck(!check)} name='visibility' id='visibility' />
                                <Label htmlFor='visibility'>Show project publicly</Label>
                            </div>

                        </div>
                        {/* Ask sir on how to make one button dont do submit */}
                        <DialogFooter className='w-full flex justify-end'>
                            <Button onClick={() => props.setOpen(false)} className='hover:bg-stone-200 bg-white text-black rounded-md transition-all px-4 py-2 text-sm font-[Inter]' type='button'>Cancel</Button>
                            <Button disabled={loading} className='bg-contrast rounded-md hover:bg-highlight transition-all text-white px-4 py-2 text-sm font-[Inter]'>Create</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
