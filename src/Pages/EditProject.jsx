import React, { useEffect, useState } from 'react'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/Label'
import { Checkbox } from "@/components/ui/checkbox"
import TypeComboBox from '../components/ui/TypeComboBox'
import { Type } from 'lucide-react'
import { Button } from '../components/ui/button'
import { ScrollArea } from '../components/ui/scroll-area'
import { useNavigate, useParams } from 'react-router-dom'
import { show } from '../api/projects'
import { Textarea } from '../components/ui/textarea'
import ComboBox from '../components/ui/ComboBox'
import { StorageURL } from '../api/configuration'
import { Oval } from 'react-loader-spinner'

export default function EditProject() {

    const [type, setType] = useState()
    const [visibility, setVisibility] = useState(false)
    const [categories, setCategories] = useState(false)
    const [addThumbnails, setAddThumbnails] = useState(false)
    const [currentProject, setCurrentProject] = useState()
    const [thumbnailPreviews, setThumbnailPreviews] = useState([])
    const [iconPreview, setIconPreview] = useState()

    const navigate = useNavigate()
    const params = useParams()

    // Create Code to Authenticate the User first and the project they've chosen to edit

    useEffect(() => {
        show(params.id).then((res) => {
            console.log(res)
            if (res?.ok) {
                setCurrentProject(res?.data)
            }
        }
        )
    }
        , [])

    return (
        <div className=' w-full h-full'>
            <form className='bg-[#D9D9D9] flex flex-col items-center gap-10 px-20 py-10'>
                {
                    currentProject ?
                        <>
                            <div className='w-full flex flex-col gap-1.5 justify-start '>
                                <Label>Type:</Label>
                                <TypeComboBox currentType={currentProject?.file_extension} currentFile={currentProject?.file} onSelect={setType} className={' '} />
                            </div>
                            <div className='w-full h-fit px-6 flex gap-14 flex-wrap lg:flex-nowrap '>
                                <div className='w-full h-fit flex flex-col gap-5'>
                                    <img className='bg-[#323647] object-cover aspect-video w-full rounded-md shadow-md' src={iconPreview ? iconPreview : `${StorageURL}${currentProject?.file_icon}`} />
                                    <div className='flex flex-col gap-2'>
                                        <Label>Upload Icon</Label>
                                        <Input
                                            onChange={
                                                (e) => {
                                                    const reader = new FileReader()

                                                    reader.addEventListener(
                                                        'load', () => {
                                                            setIconPreview(reader.result)
                                                        }
                                                    )

                                                    reader.readAsDataURL(e.target.files[0])
                                                }
                                            }
                                            type='file'
                                            className='bg-white'
                                        />
                                        <div className='flex gap-2 items-center'>
                                            <Checkbox className='bg-white' />
                                            <Label>Make project public</Label>
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full h-fit flex flex-col gap-1.5'>
                                    <Label>Title:</Label>
                                    <Input name='name' placeholder={currentProject?.name} className='bg-white' />
                                    {(() => {
                                        switch (type) {
                                            case 'pdf':
                                                return (
                                                    <>
                                                        <Label>Project File:</Label>
                                                        <Input type='file' className='bg-white' />
                                                    </>
                                                )

                                            case 'web':
                                                return (
                                                    <>
                                                        <Label>Project Website Link:</Label>
                                                        <Input className='bg-white' />
                                                    </>
                                                )

                                        }

                                    })()
                                    }


                                    <Label>Categories:</Label>
                                    <ComboBox defaultValue={currentProject?.categories} onSelect={setCategories} />
                                    <Label>Author/s:</Label>
                                    <Input placeholder={
                                        (() => {
                                            if (currentProject) {
                                                try {
                                                    return JSON.parse(JSON.parse(currentProject?.authors)).reduce((prev, cur) => (prev + ', ' + cur))
                                                }
                                                catch (e) {
                                                    return JSON.parse(currentProject?.authors)
                                                }
                                            }
                                        })()} className='bg-white' />
                                    <Label>Description:</Label>
                                    <Textarea placeholder={currentProject?.description} className='h-44 bg-white text-' />
                                </div>
                            </div>
                            <div className='h-72 w-full flex flex-col gap-2'>
                                {/* Insert Array map here and incase if there's no thumbnails*/}
                                {currentProject?.thumbnails !== 'null' &&
                                    <>
                                        <Label className='text-xl'>Current Thumbnails</Label>
                                        <div className='bg-white w-full flex items-center p-6 gap-2 h-48 rounded-md overflow-x-scroll ' >
                                            {currentProject && JSON.parse(currentProject?.thumbnails).map((thumbnail) =>
                                                <img src={`${StorageURL}${thumbnail}`} className='aspect-video h-full bg-[#323647] shadow-md rounded-md object-cover'></img>
                                            )}
                                        </div>
                                    </>
                                }
                                <div className='flex gap-2 items-center mt-4'>
                                    <Checkbox checked={addThumbnails} onCheckedChange={() => setAddThumbnails(!addThumbnails)} id='addThumbnailView' className='bg-white' />
                                    <Label htmlFor='addThumbnailView'>Upload Thumbnails</Label>
                                </div>

                            </div>
                            {addThumbnails &&
                                <div className='w-full h-[450px] px-6 '>
                                    <div className='w-full h-full bg-gradient-to-b from-[#323647] to-[#4d4654] flex flex-col justify-center gap-4 px-14 py-9 rounded-lg'>
                                        <div className='md:flex justify-between'>
                                            <Label className='bg-white flex items-center w-48 rounded-md justify-center text-xl'>New Thumbnails</Label>
                                            {/* <Button className='bg-contrast text-xl w-28 h-10'>Upload</Button> */}
                                            <Input onChange={
                                                (e) => {
                                                    setThumbnailPreviews([])
                                                    Array.prototype.forEach.call(e.target.files, (file) => {
                                                        const reader = new FileReader()
                                                        reader.addEventListener(
                                                            "load", () => {
                                                                setThumbnailPreviews(prev => [...prev, reader.result])

                                                            },
                                                        )

                                                        reader.readAsDataURL(file);
                                                    })
                                                }
                                            } className='bg-white w-64' type='file' multiple />
                                        </div>
                                        <div className='bg-white w-full h-72 rounded-lg p-10 flex gap-2 overflow-x-scroll'>

                                            {thumbnailPreviews !== 0 && console.log(thumbnailPreviews)}
                                            {thumbnailPreviews !== 0 ?
                                                thumbnailPreviews?.map((e) => <img src={e} className='aspect-video h-full shadow-md bg-[#323647] rounded-md object-cover'></img>)
                                                :
                                                'adf'
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='w-full flex gap-2 justify-end'>
                                <Button onClick={() => navigate(-1)} type='button'>Go Back</Button>
                                <Button>Update</Button>
                            </div>
                        </>
                        :
                        <div className='w-full h-screen flex justify-center items-center'>
                            <Oval
                                height="120"
                                width="120"
                                color="#622C2C"
                                secondaryColor="#D1C1C1"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                }
            </form>
        </div>
    )
}
