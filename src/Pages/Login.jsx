import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Eye, EyeOff, Undo2 } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import logo from '../assets/Creatrium_Logo.png'
import background from '../assets/pexels-cottonbro-3584994.jpg'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { login as loginRequest } from '../api/auth'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import withoutAuth from '../high-order-component/withoutAuth'


function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState()
    const navigate = useNavigate()
    const { user, login } = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies()

    const onLogin = (e) => {
        e.preventDefault()
        if (!loading) {
            const body = new FormData(e.target)
            setLoading(true)
            loginRequest(body).then(res => {
                if (res?.ok) {
                    login(res?.data?.user)
                    setCookie('token', res?.data?.token)
                    navigate('/home')
                }
                else {
                    toast.error(res.message)
                }
            }
            ).finally(
                setLoading(false)
            )
        }
    }

    return (
        <div className="w-full h-screen bg-stone-300 flex flex-row justify-center max-xl:h-fit gap-2 p-2 font-[Inter]">
            <div className="w-2/3 flex flex-col gap-5 items-center  p-6">
                <div className='w-full'>
                    <div className='w-full'>
                        <ChevronLeft onClick={() => navigate('../')} className='hover:bg-zinc-300 transition-all hover:mix-blend-multiply p-1 size-8 rounded-lg' />
                    </div>
                    <div id='title' className='flex flex-col items-center gap-1'>
                        <h1 className='text-6xl font-display'>Creatrium</h1>
                        <h3 className='text-md font-[Inter]'>Welcome to Creatrium</h3>
                    </div>
                </div>
                <div id='loginForm' className='w-1/2 flex flex-col gap-5'>
                    <h2 className='text-3xl'>Log in</h2>
                    <form onSubmit={(e) => onLogin(e)} className='flex w-full gap-10 item-center justify-between'>
                        <div className="w-full flex flex-col gap-y-5">
                            <Input name='name' variant="default" placeholder="Username" />
                            <div className="relative">
                                <Input
                                    variant="default"
                                    name='password'
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-600"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {/* Add a future feature for remembering the user */}
                                    <Checkbox id="remember" className="border-black" />
                                    <label htmlFor="remember" className="text-sm text-black cursor-pointer">
                                        Remember me
                                    </label>
                                </div>
                                {/* <button className="text-sm text-blue-600 underline">Forgot Password?</button> */}
                            </div>
                            <div className="w-full flex flex-col gap-5 items-center">
                                <Button disabled={loading} className="w-3/4">Log in</Button>
                                <div className="flex items-center">
                                    <h4>Don’t have an account?</h4>
                                    <Button type='button' variant='link' className='p-2 h-0 font-[Inter]' onClick={() => navigate('/Register')}>Register</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-slate-800 w-2/3 rounded-2xl max-xl:hidden">
                <div className="w-full h-full bg-cover rounded-2xl p-3" style={{ backgroundImage: `url(${background})` }}>
                    <img src={logo} className='w-8'></img>
                </div>
            </div>
        </div>
    )
}
export default withoutAuth(Login)