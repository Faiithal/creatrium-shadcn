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
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ChevronLeft, ChevronRight } from "lucide-react"
import dayjs from 'dayjs'
import $ from 'jquery'

// API

import { register } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import CampusComboBox from '../components/ui/CampusComboBox'
import CourseComboBox from '../components/ui/CourseComboBox'
import withoutAuth from '../high-order-component/withoutAuth'

//
function isEmpty(str) {
    return (!str || str.length === 0);
}

function Register() {
    const form = useForm()
    const [date, setDate] = useState(dayjs())
    const [genderChoice, setGenderChoice] = useState()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState()
    const [course, setCourse] = useState()
    const [campus, setCampus] = useState()
    const navigate = useNavigate()

    const onRegister = (e) => {
        e.preventDefault()

        //Fix this later
        if (!loading) {
            const body = {
                name: $("#inpUsername").val(),
                password: $("#inpPassword").val(),
                password_confirmation: $("#inpConfirmPassword").val(),
                first_name: $("#inpFirstName").val(),
                middle_name: $("#inpMiddleName").val(),
                last_name: $("#inpLastName").val(),
                affix: $("#inpAffix").val(),
                section: $("#inpSection").val(),
                campus: campus,
                course: course,
                academic_year: $("#inpAcademicYear").val(),
                gender: genderChoice,
                birth_date: $("#inpBirthDate").val()
            }
            if (isEmpty(body.middle_name)) {
                delete body.middle_name
            }
            if (isEmpty(body.affix)) {
                delete body.affix
            }

            setLoading(true)
            register(body).then(response => {
                if (response?.ok) {
                    navigate('/login')
                }
                else {
                    setErrors(response?.data)
                }
            }
            ).finally(() => {
                setLoading(false)
            }
            )
        }
    }

    return (
        <>
            <Dialog>
                <div className="w-full h-screen bg-stone-300 flex flex-row justify-center max-xl:h-fit gap-2 p-2 font-[Inter]">
                    <div className=" w-2/3 flex flex-col gap-5 p-6">
                        <div className='w-full'>
                            <div className='w-full'>
                                <ChevronLeft onClick={() => navigate('../')} className='hover:bg-zinc-300 transition-all hover:mix-blend-multiply p-1 size-8 rounded-lg' />
                            </div>
                            <div id='title' className='flex flex-col items-center gap-1'>
                                <h1 className='text-6xl font-display'>Creatrium</h1>
                                <h3 className='text-md font-[Inter]'>Welcome to Creatrium</h3>
                            </div>
                        </div>
                        <div id='registerForm' className=' w-full flex flex-col gap-5'>
                            <h2 className='text-3xl'>Register</h2>
                            <form onSubmit={(e) => onRegister(e)} className='flex w-full gap-10 justify-between' >
                                <div className="w-full flex flex-col gap-y-3">
                                    <div>
                                        <Input required variant="default" id='inpUsername' placeholder="Username" />
                                        {errors?.name && <span className='text-red-500 text-xs'>{errors?.name}</span>}
                                    </div>
                                    <div>
                                        <Input required variant="default" type="Password" id='inpPassword' placeholder="Password" />
                                        {errors?.password && <span className='text-red-500 text-xs'>{errors?.password}</span>}
                                    </div>
                                    <div>
                                        <Input required variant="default" type="Password" id='inpConfirmPassword' placeholder="Confirm Password" />
                                    </div>
                                    <div>
                                        <Input required variant="default" id='inpFirstName' placeholder="First Name" />
                                        {errors?.first_name && <span className='text-red-500 text-xs'>{errors?.first_name}</span>}
                                    </div>
                                    <div>
                                        <Input variant="default" id='inpMiddleName' placeholder="Middle Name (Optional)" />
                                        {errors?.middle_name && <span className='text-red-500 text-xs'>{errors?.middle_name}</span>}
                                    </div>
                                    <div>
                                        <div className='flex gap-2'>
                                            <Input className='w-2/3' required variant="default" id='inpLastName' placeholder="Last Name" />
                                            <Input className='w-1/3' variant="default" id='inpAffix' placeholder="Affix. (Optional)" />
                                        </div>
                                        {errors?.last_name && <span className='text-red-500 text-xs'>{errors?.last_name}</span>}
                                        {errors?.affix && <span className='text-red-500 text-xs'>{errors?.affix}</span>}
                                    </div>

                                </div>
                                <Separator className="bg-black w-0.5 h-56 " orientation='vertical' />
                                <div className="w-full flex flex-col gap-3 items-center">

                                    <div className='w-full'>
                                        <div className='flex gap-2 items-center'>
                                            <CampusComboBox onSelect={setCampus} />
                                            <CourseComboBox onSelect={setCourse} />
                                        </div>
                                        {errors?.campus && <span className='text-red-500 text-xs'>{errors?.campus}</span>}
                                        {errors?.course && <span className='text-red-500 text-xs'>{errors?.course}</span>}
                                    </div>
                                    <div className='w-full'>
                                        <Input required variant="default" id='inpSection' placeholder="Section" />
                                        {errors?.section && <span className='text-red-500 text-xs'>{errors?.section}</span>}
                                    </div>
                                    <div className='w-full'>
                                        <Input required variant="default" id='inpAcademicYear' placeholder="Academic Year (i.e. '2024', ...)" />
                                        {errors?.academic_year && <span className='text-red-500 text-xs'>{errors?.academic_year}</span>}
                                    </div>

                                    <div className="w-3/4 flex flex-col gap-2" >
                                        <div>
                                            <Label>Gender </Label>
                                            {errors?.gender && <span className='text-red-500 text-xs'>{errors?.gender}</span>}
                                        </div>
                                        <RadioGroup required value={genderChoice} onValueChange={setGenderChoice} className="flex justify-between" id='genderForm'>
                                            <div className='flex gap-2 items-center'>
                                                <RadioGroupItem value={1} name='gender' id='male' />
                                                <Label htmlFor='male'>Male</Label>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <RadioGroupItem value={2} name='gender' id='female' />
                                                <Label htmlFor='female'>Female</Label>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <RadioGroupItem value={3} name='gender' id='others' />
                                                <Label htmlFor='others'>Others</Label>
                                            </div>
                                        </RadioGroup>

                                    </div>
                                    <div className='w-4/5 flex justify-between'>
                                        <Separator className="h-0.5 bg-black w-2/5" />
                                        <Separator className="h-0.5 bg-black w-2/5" />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Checkbox required id='tos' />
                                        <Label htmlFor='tos'>I accept the Terms and Conditions</Label>
                                        <DialogTrigger className='rounded-full -translate-x-3 hover:bg-opacity-25 hover:bg-stone-400 p-2'><ChevronRight size={17} /></DialogTrigger>
                                    </div>
                                    <Button disabled={loading} >Register</Button>
                                    <div className="flex items-center ">
                                        <h4>Already Have an Account?</h4>
                                        <Button type='button' onClick={() => navigate('/login')} variant='link' className='p-2 h-0 font-[Inter]'>Log in</Button>
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
                {/* Terms and Conditions */}
                <DialogContent className='h-2/3 overflow-auto'>
                    <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                        <DialogDescription>
                            <div className='flex flex-col gap-2'>
                                {/* [Placeholder Text] */}
                                <h2>1. Acceptance of Terms</h2>
                                <p>By creating an account or using the platform, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please refrain from using the platform.</p>

                                <h2>2. User Responsibilities</h2>
                                <ul>
                                    <li>You are responsible for ensuring that the content you upload does not violate any copyright, trademark, or intellectual property rights of others.</li>
                                    <li>You must not upload content that is illegal, offensive, defamatory, or violates any applicable laws.</li>
                                    <li>You agree to keep your account information secure and not share your login credentials with others.</li>
                                </ul>

                                <h2>3. Content Ownership & License</h2>
                                <ul>
                                    <li>You retain ownership of any projects, images, text, or other content you upload to the platform.</li>
                                    <li>By uploading content, you grant Creatrium a non-exclusive, worldwide, royalty-free license to display, distribute, and promote your content on the platform.</li>
                                    <li>We do not claim ownership of your projects but may use them for promotional purposes (with proper attribution).</li>
                                </ul>

                                <h2>4. Storage and Availability</h2>
                                <ul>
                                    <li>We strive to maintain reliable storage for your projects but do not guarantee permanent availability.</li>
                                    <li>Users are encouraged to maintain their own backups of uploaded content.</li>
                                    <li>We reserve the right to remove content that violates these Terms or is reported by other users.</li>
                                </ul>

                                <h2>5. User Conduct</h2>
                                <ul>
                                    <li>Users must not engage in fraudulent activities, hacking, spamming, or any activity that disrupts the platform.</li>
                                    <li>Respect the intellectual property and privacy of other users.</li>
                                </ul>

                                <h2>6. Termination of Access</h2>
                                <ul>
                                    <li>We reserve the right to suspend or terminate any user account that violates these Terms without prior notice.</li>
                                </ul>

                                <h2>7. Liability and Disclaimers</h2>
                                <ul>
                                    <li>The platform is provided "as is" without warranties of any kind.</li>
                                    <li>We are not responsible for any loss of data, security breaches, or damages resulting from your use of the platform.</li>
                                    <li>We do not endorse or verify the accuracy of any user-uploaded content.</li>
                                </ul>

                                <h2>8. Modifications to Terms</h2>
                                <ul>
                                    <li>We may update these Terms from time to time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the new Terms.</li>
                                </ul>

                                <h2>9. Governing Law</h2>
                                <ul>
                                    <li>These Terms shall be governed by and interpreted in accordance with the laws of Philippines.</li>
                                </ul>

                                <h2>10. Contact Information</h2>
                                <ul>
                                    <li>For any questions regarding these Terms, please contact us at [Insert Contact Information].</li>
                                </ul>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default withoutAuth(Register)