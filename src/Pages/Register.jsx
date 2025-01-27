import React from 'react'
import { useForm } from 'react-hook-form'
// Shadcn Components
import { Button } from '../components/ui/button'
import { Input } from "../components/ui/input"
import { Label } from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-separator'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

//


export default function Register() {
    const form = useForm()
    return (
        <>
            <div className="w-screen h-screen bg-stone-300 flex flex-row gap-2 p-2">
                <div className=" w-2/3 flex flex-col gap-8 items-center p-6">
                    <div id='title' className='flex flex-col items-center'>
                        <h1 className='text-6xl'>Creatrium</h1>
                        <h3 className='text-md'>Welcome to Creatrium</h3>
                    </div>
                    <div id='registerForm' className=' w-full flex flex-col gap-10'>
                        <h2 className='text-3xl'>Register</h2>
                        <form className='flex justify-around w-full'>
                            <div className="flex flex-col gap-y-5">
                                <Input variant="default" placeholder="Username" />
                                <Input variant="default" type="Password" placeholder="Password" />
                                <Input variant="default" placeholder="First Name" />
                                <Input variant="default" placeholder="Middle Name (Optional)" />
                                <Input variant="default" placeholder="Last Name" />
                                <Input variant="default" placeholder="Affix. (Optional)" />
                            </div>
                            <Separator className="bg-black w-0.5 h-56" orientation='vertical' />
                            <div className="flex flex-col gap-5 items-center">
                                <Input variant="default" placeholder="Section" />
                                <Input variant="default" placeholder="Course" />
                                <Input variant="default" placeholder="Birthdate" />
                                <div className="w-4/5 flex flex-col gap-2">
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
                                <div className='w-full flex justify-between'>
                                    <Separator className="h-0.5 bg-black w-2/5" />
                                    <Separator className="h-0.5 bg-black w-2/5" />
                                </div>
                                <Button>Register</Button>
                                <div className="flex items-center gap-2">
                                    <h4>Already Have an Account?</h4>
                                    <Button className="text-black hover:text-white bg-transparent shadow-none border-b-4 border-black">Log in</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bg-black w-1/3 rounded-2xl"></div>
            </div>
        </>
    )
}
