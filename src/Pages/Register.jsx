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
import $ from 'jquery'

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

// API

import { register } from '../api/auth'

//


export default function Register() {
    const form = useForm()
    const [date, setDate] = useState(dayjs());

    const onRegister = (e) => {
        e.preventDefault()
        const name = $("#inpUsername").val()
        const password = $("#inpPassword").val()
        const password_confirmation = $("#inpConfirmPassword").val()
        const first_name = $("#inpFirstName").val()
        const middle_name = $("#inpMiddleName").val()
        const last_name = $("#inpLastName").val()
        const affix = $("#inpAffix").val()
        const section = $("#inpSection").val()
        const campus = +$("#inpCampus").val()
        const course = +$("#inpCourse").val()
        const acadYear = $("#inpAcademicYear").val()
        const gender = $("input[name=gender]:checked", "genderForm").val()
        const birth_date = date.format("YYYY-MM-DD")

        register({
            name,
            password,
            password_confirmation,
            first_name,
            middle_name,
            last_name,
            affix,
            section,
            course,
            acadYear,
            gender,
            birth_date
        }
        ).then(response => {
            console.log(response)
        }
        )
    }

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
                        <form onSubmit={(e) => onRegister(e)} className='flex w-full gap-10 justify-between'>
                            <div className="w-full flex flex-col gap-y-5">
                                <Input required variant="default" id='inpUsername' placeholder="Username" />
                                <Input required variant="default" type="Password" id='inpPassword' placeholder="Password" />
                                <Input required variant="default" type="Password" id='inpConfirmPassword' placeholder="Confirm Password" />

                                <Input required variant="default" id='inpFirstName' placeholder="First Name" />
                                <Input variant="default" id='inpMiddleName' placeholder="Middle Name (Optional)" />
                                <div className='flex gap-2'>
                                    <Input className='w-2/3' required variant="default" id='inpLastName' placeholder="Last Name" />
                                    <Input className='w-1/3' variant="default" id='inpAffix' placeholder="Affix. (Optional)" />
                                </div>


                            </div>
                            <Separator className="bg-black w-0.5 h-56 " orientation='vertical' />
                            <div className="w-full flex flex-col gap-5 items-center">
                                <Input required variant="default" id='inpSection' placeholder="Section" />
                                <div className='flex gap-2'>
                                    <Input className='w-1/2' variant="default" id='inpCampus' placeholder="Campus" />
                                    <Input className='w-1/2' required variant="default" id='inpCourse' placeholder="Course" />
                                </div>
                                <Input required variant="default" id='inpAcademicYear' placeholder="Academic Year (i.e. 2024, 2025, ...)" />

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
                                    <RadioGroup className="flex justify-between" id='genderForm'>
                                        <div className='flex gap-2 items-center'>
                                            <RadioGroupItem value='male' name='gender' id='male' />
                                            <Label htmlFor='male'>Male</Label>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <RadioGroupItem value='female' name='gender' id='female' />
                                            <Label htmlFor='female'>Female</Label>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <RadioGroupItem value='others' name='gender' id='others' />
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
