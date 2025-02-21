import React, { useContext } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../components/ui/button'
import { AuthContext } from '../contexts/AuthContext'
import withAuth from '../high-order-component/withAuth'
import { StorageURL } from '../api/configuration'
import { update } from '../api/profile'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'


function SecuritySettings() {
    const { user } = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies()

    const onUpdate = (e) => {
        e.preventDefault()
        const body = new FormData(e.target)
        const token = cookies.token

        body.get('name') === user?.name && body.delete('name')
        body.get('password') === '' && body.delete('password')
        body.get('password_confirmation') === '' && body.delete('password_confirmation')

        if ([...body.entries()].length > 0)
            update(body, token)
        else
            toast.info('No Changes have been made')
    }

    return (
        <div className='bg-[#D4D4D4] w-full flex flex-col items-center xl:h-screen xl:overflow-hidden'>
            <div className='w-full h-40 px-10 bg-[#BCBCBC] flex items-center gap-5'>
                <Avatar className='size-28'>
                    <AvatarImage src={`${StorageURL}${user?.profile?.image}`} />
                    <AvatarFallback><img src={`../../${user?.profile?.gender}Fallback.png`} /></AvatarFallback>
                </Avatar>
                <div className='flex flex-col justify-center'>
                    <span className='font-[Inter] text-xl font-medium'>{user?.name}</span>
                    <span className='font-[Inter]'>{`${user?.profile?.first_name} ${user?.profile?.middle_name ? user?.profile?.middle_name : ''} ${user?.profile?.last_name} ${user?.profile?.affix ? user?.profile.affix : ''}`}</span>
                </div>
            </div>
            <form onSubmit={(e) => onUpdate(e)} className='px-24 w-full lg:w-2/3 2xl:w-1/2 h-fit lg:h-full flex flex-col pb-20 xl:pb-0'>
                <div className='bg-[#D4D4D4] h-fit flex justify-center gap-3 lg:gap-20 items-end'>
                    <div className='w-3/5 h-full pt-10 flex flex-col gap-4 items-center justify-between '>
                        <div className='w-full flex flex-col gap-3'>
                            {/* Not gonna lie, this is a bad idea for identity Theft
                            <Label className='w-3/5'>Username</Label>
                            <Input defaultValue={user?.name} name='name' className='bg-white' /> */}
                            <Label className='w-3/5'>New Password</Label>
                            <Input type='password' name='password' className='bg-white' />
                            <Label className='w-3/5'>Password Confirmation</Label>
                            <Input name='password_confirmation' className='bg-white' />
                        </div>
                        <Button className='w-40 ml-auto'>Save</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default withAuth(SecuritySettings)