import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// Shadcn Components
import { Button } from '../components/ui/button'
import { Input } from "../components/ui/input"
import { Label } from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-separator'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import background from '../assets/pexels-cottonbro-3584994.jpg'
import logo from '../assets/Creatrium_Logo.png'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import dayjs from 'dayjs'
//


export default function Register() {
    const form = useForm()
    const [date, setDate] = useState(dayjs());

    return (
        <>
            <div className="w-full h-screen bg-stone-300 flex flex-row justify-center max-xl:h-fit gap-2 p-2 font-[Inter]">
                <div className=" w-2/3 flex flex-col gap-5 p-6">
                    <div id='title' className='flex flex-col items-center gap-1'>
                        <h1 className='text-6xl font-display'>Creatrium</h1>
                        <h3 className='text-md font-[Inter]'>Welcome to Creatrium</h3>
                    </div>
                    <div id='registerForm' className=' w-full flex flex-col gap-5'>
                        <h2 className='text-3xl'>Register</h2>
                        <form className='flex w-full gap-10 justify-between'>
                            <div className="w-full flex flex-col gap-y-5">
                                <Input variant="default" placeholder="Username" />
                                <Input variant="default" type="Password" placeholder="Password" />
                                <Input variant="default" placeholder="First Name" />
                                <Input variant="default" placeholder="Middle Name (Optional)" />
                                <Input variant="default" placeholder="Last Name" />
                                <Input variant="default" placeholder="Affix. (Optional)" />
                            </div>
                            <Separator className="bg-black w-0.5 h-56 " orientation='vertical' />
                            <div className="w-full flex flex-col gap-5 items-center">
                                <Input variant="default" placeholder="Section" />
                                <Input variant="default" placeholder="Course" />
                                <Input variant="default" placeholder="Academic Year" />


                                {/* Birthdate Input Code */}

                                <Popover >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full h-10 justify-start text-left font-normal text-base",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? date.format("YYYY-MM-DD") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(v) => setDate(dayjs(v))}
                                            initalFocus 
                                        />
                                    </PopoverContent>
                                </Popover>

                                {/* Birthdate Input Code */}

                                <div className="w-3/4 flex flex-col gap-2">
                                    <Label>Gender</Label>
                                    <RadioGroup className="flex justify-between">
                                        <div className='flex gap-2 items-center'>
                                            <RadioGroupItem value='male' id='male' />
                                            <Label htmlFor='male'>Male</Label>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <RadioGroupItem value='female' id='female' />
                                            <Label htmlFor='female'>Female</Label>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <RadioGroupItem value='others' id='others' />
                                            <Label htmlFor='others'>Others</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className='w-4/5 flex justify-between'>
                                    <Separator className="h-0.5 bg-black w-2/5" />
                                    <Separator className="h-0.5 bg-black w-2/5" />
                                </div>
                                <Button >Register</Button>
                                <div className="flex items-center ">
                                    <h4>Already Have an Account?</h4>
                                    <Button variant='link' className='p-2 h-0 font-[Inter]'>Log in</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bg-slate-800 w-1/3 rounded-2xl max-xl:hidden">
                    <div className="w-full h-full bg-cover rounded-2xl p-3" style={{ backgroundImage: `url(${background})` }}>
                        <img src={logo} className='w-8' ></img>
                    </div>
                </div>
            </div>
        </>
    )
}
