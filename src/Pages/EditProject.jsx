import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/Label'
import { Checkbox } from "@/components/ui/checkbox"
import TypeComboBox from '../components/ui/TypeComboBox'
import { Type } from 'lucide-react'
import { Button } from '../components/ui/button'
export default function EditProject() {

    const [type, setType] = useState()
    const [visibility, setVisibility] = useState(false)
    const [addThumbnails, setAddThumbnails] = useState(false)
    // Create Code to Authenticate the User first and the project they've chosen to edit

    return (
        <div classname=' w-full h-full'>
            <form className='bg-[#D9D9D9] flex flex-col items-center gap-10 px-20 py-10'>
                <div className='w-full flex flex-col gap-1.5 justify-start '>
                    <Label>Type:</Label>
                    <TypeComboBox onSelect={setType} className={' '} />
                </div>
                <div className='w-full h-fit px-6 flex gap-14 flex-wrap lg:flex-nowrap '>
                    <div className='w-full h-fit flex flex-col gap-5'>
                        <img className='bg-[#323647] object-cover aspect-video w-full rounded-md' />
                        <div className='flex flex-col gap-2'>
                            <Label>Upload Icon</Label>
                            <Input type='file' className='bg-white' />
                            <div className='flex gap-2 items-center'>
                                <Checkbox className='bg-white' />
                                <Label>Make project public</Label>
                            </div>
                        </div>

                    </div>
                    <div className='w-full h-fit flex flex-col gap-1.5'>
                        <Label>Title:</Label>
                        <Input className='bg-white' />
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


                        <Label>Type:</Label>
                        <Input className='bg-white' />
                        <Label>Author/s:</Label>
                        <Input className='bg-white' />
                        <Label>Description:</Label>
                        <Input className='h-44 bg-white' />
                    </div>
                </div>
                <div className='bg-slate-400 h-64 w-full'>
                    <Label className='text-xl'>Current Thumbnails</Label>
                    {/* Insert Array map here */}
                    <div className='flex gap-2 items-center'>
                        <Checkbox checked={addThumbnails} onCheckedChange={() => setAddThumbnails(!addThumbnails)} className='bg-white' />
                        <Label>Upload Thumbnails</Label>
                    </div>

                </div>
                {addThumbnails &&
                    <div className='w-full h-[450px] bg-black px-6'>
                        <div className='w-full h-full bg-red-400'>
                        </div>
                    </div>

                }

                <Button>
                    
                </Button>

            </form>
        </div>
    )
}
