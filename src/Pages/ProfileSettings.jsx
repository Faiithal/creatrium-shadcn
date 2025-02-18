import React, { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CourseComboBox from '../components/ui/CourseComboBox'
import CampusComboBox from '../components/ui/CampusComboBox'
import { AuthContext } from '../contexts/AuthContext'
import withAuth from '../high-order-component/withAuth'
import Profile from './Profile'
import dayjs from 'dayjs'
import { update } from '../api/profile'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { StorageURL } from '../api/configuration'


 function ProfileSettings() {
    const [genderChoice, setGenderChoice] = useState()
    const [course, setCourse] = useState()
    const [campus, setCampus] = useState()
    const {user} = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies()

    const onUpdate = (e) => {
        e.preventDefault()
        const body = new FormData(e.target)
        const token = cookies.token
        course && body.append('course', course)
        campus && body.append('campus', campus)
        genderChoice && body.append('gender', genderChoice)


        update(body, token).then((res) => {
            if(res?.ok){
                toast.success('Successfully Updated Profile!')
            }
            else{
                toast.error('Something went wrong!')
            }
        })
    }

    return (
        <div className='bg-[#D4D4D4] w-full flex flex-col xl:h-screen xl:overflow-hidden'>
            <div className='w-full h-40 px-10 bg-[#BCBCBC] flex items-center gap-5'>
                <Avatar className='size-28'>
                    <AvatarImage src={`${StorageURL}${user?.profile?.image}`} />
                    <AvatarFallback><img src={`../../${user?.profile?.gender}Fallback.png`} /></AvatarFallback>
                </Avatar>
                <div className='flex flex-col justify-center'>
                    <span className='font-[Inter] text-xl'>{user?.name}</span>
                    <span className='font-[Inter]'>{`${user?.profile?.first_name} ${user?.profile?.middle_name ? user?.profile?.middle_name : ''} ${user?.profile?.last_name} ${user?.profile?.affix ? user?.profile.affix : ''}`}</span>
                </div>
            </div>
            <form  onSubmit={(e) => onUpdate(e)} className='px-24 h-fit lg:h-full flex flex-col pb-20 xl:pb-0' encType='multipart/form-data'>
                <div className='bg-[#D4D4D4] h-fit flex flex-col lg:flex-row gap-3 lg:gap-20 items-start'>
                    <div className='w-full h-full pt-10 flex flex-col gap-3 items-start'>
                        <Label>First Name</Label>
                        <Input defaultValue={user?.profile?.first_name} name='first_name' className='w-full bg-white' />
                        <Label>Middle Name</Label>
                        <Input defaultValue={user?.profile?.middle_name} name='middle_name' className='w-full bg-white' />
                        <Label>Last Name</Label>
                        <Input defaultValue={user?.profile?.last_name} name='last_name' className='w-full bg-white' />
                        <Label>Affix</Label>
                        <Input defaultValue={user?.profile?.affix} name='affix' className='w-full bg-white' />
                        <Label>Birth date</Label>
                        <Input defaultValue={user && dayjs(user?.profile?.birth_date).format("YYYY-MM-DD")} type='date' name='birth_date' className='w-fit bg-white' />
                    </div>
                    <div className='w-full h-full lg:pt-10 flex flex-col gap-4 xl:justify-between'>
                        <div className='flex flex-col gap-3'>
                            <Label>Section</Label>
                            <Input defaultValue={user?.profile?.section} name='section' className='bg-white' />
                            <Label>Academic year</Label>
                            <Input defaultValue={user?.profile?.academic_year} name='academic_year' className='bg-white' />
                            <Label>Course</Label>
                            <CourseComboBox onSelect={setCourse}/>
                            <Label>Campus</Label>
                            <CampusComboBox onSelect={setCampus}/>
                            <Label>Gender</Label>
                            <RadioGroup required defaultValue={genderChoice} onValueChange={setGenderChoice} className="w-2/3 flex justify-between" id='genderForm'>
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
                        <Button className='w-40 ml-auto'>Save</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default withAuth(ProfileSettings)