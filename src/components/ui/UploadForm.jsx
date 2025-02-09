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
import { Checkbox } from "@/components/ui/checkbox"
import ComboBox from './ComboBox'
import { add } from '../../api/projects'
import { ToastContainer, toast } from 'react-toastify';
import { Textarea } from "@/components/ui/textarea"


const reader = new FileReader();

export default function UploadForm(props) {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(0)
    const [category, setCategory] = useState([])
    const [check, setCheck] = useState(false);
    const [errors, setErrors] = useState();



    const onCreate = (e) => {
        e.preventDefault()
        if (!loading) {
            setLoading(true)
            const authors = document.getElementById('authors').value
            const authorsArray = authors && authors.split(',')
            // console.log(authors.map((e) => e.trim()))
            const body = new FormData(e.target)
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2NlZmI2MmFjNjJiYmYxNzQ2NGQ1MTk1M2NjYjY4NjczYzRkMDBlMGExY2NiNzBjOTNiZTBlZWQ5ODc0ZjkyYmJiYzAwZDFkNmUzZTllOTIiLCJpYXQiOjE3MzkwNTg0NDYuNTgyNDIsIm5iZiI6MTczOTA1ODQ0Ni41ODI0MjMsImV4cCI6MTc3MDU5NDQ0Ni41NzAxNTcsInN1YiI6IjMiLCJzY29wZXMiOltdfQ.OYe5_3lVdGLSR-6bjChfEneDp6zZ8ZpPIovBszUgPI1Zht-87_b2rY-P4WJeuigE2DtKCxnF5ZfECQpkNuofC9nii77yNwI2qLO6j2t7kHxPmYpT5V79x2auRueprKWUa783GJisQPciZ9cjL8YzxTMI2N2iDTZXK2VU3zb-mxa1tVHGXKVGasTBUx_J_ZQIaX0eWOpUyCpnzo7mQxdst74ngglhA7x_EvRXSzwTT03IpBKq-02QKRNMa1vuyPaUpGew_laoSg2KBi_fJpNeApTWE_H7qS3owPH0K1bEam5S0wyupClWJ7xts0cN5oCCUwaUR_jsDXiqoXmTsa3fJQzGGu3m_ylla0lYa-OiEDbK-pJq5xKts4RFjXWkFgwotKNM3fVlC6nkDpMS8FAHUhpBy2W0C-fEdFKkBCV2m9AJohurgj1UqJpEC1PfjNt-q6P9SuA0lrIWOWyGR7T6RXBoWaMoWnsd6UMzyNZawWRqczSJ2A8jLG3PkaZPnV0ZCH518nizZxt1RG1pn7jMyP74RDZKldiOaWR-HCLIKs55pilqyLECNhgzZCN8T4yPtbpZXWbapLyfaf3rwGzVB5rGgdVdFIUPKlj7mre6FC-i_1_8UnL_rXD3HnFD1NKiyw_rYGe9KmVlVnnviogQZ-cxN5Kwkq2B4enWf1vEiFg'
            body.append('type', props.value)
            body.set('visibility', +check)
            authors ? body.set('authors[]', authorsArray.map((e) => e.trim())) : body.delete('authors[]')

            console.log(body.getAll)
            if (category.length !== 0) {
                category.forEach(e => {
                    body.append('categories[]', e)
                });
            }
            console.log(category)
            console.log(+check)


            add(body, token).then((res) => {
                if (res?.ok) {
                    toast.success("Project Successfully Uploaded")
                }
                else {
                    toast.error("Invalid input. Please ensure all fields are correctly filled.")
                    setErrors(res?.data)
                }
                console.log(res)
            }).finally(() => {
                setLoading(false)
            })
        }
    }
    return (
        <>

            <Dialog onOpenChange={() => setPreview(null)}>
                <DialogTrigger className='bg-transparent h-2/3 w-1/3 text-white border-solid border-white border-2'>{props.type}</DialogTrigger>
                <DialogContent className='max-2xl:h-2/3 overflow-y-auto'>
                    <DialogHeader>
                        <DialogTitle>Upload Project</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={(e) => onCreate(e)} className='flex flex-col items-center gap-5' encType='multipart/form-data'>

                        <div className='w-full flex flex-col gap-2'>
                            <Label>Main Icon {errors?.file_icon && <span className='text-red-500'>*{errors?.file_icon}*</span>}</Label>
                            <div className='w-full flex justify-center'>
                                {preview &&
                                    <img id='preview' className='aspect-[16/9] object-cover w-2/3 bg-gray-400 rounded-md' src={preview} />
                                }
                            </div>
                            <Input name='file_icon' type='file'
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
                            <DialogClose className='hover:bg-stone-200 rounded-md transition-all px-4 py-2 text-sm font-[Inter]' type='button'>Cancel</DialogClose>
                            <Button disabled={loading} className='bg-contrast rounded-md hover:bg-highlight transition-all text-white px-4 py-2 text-sm font-[Inter]'>Create</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
