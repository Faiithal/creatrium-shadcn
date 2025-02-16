import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import samplePic from '../assets/sampleProfile.png'
import React, { useEffect, useState } from 'react'
import { Button } from "../components/ui/button"
import UploadDialog from "../components/ui/UploadDialog"
import dayjs from "dayjs"
import { index as historyIndex } from "../api/history"
import { userProjects } from "../api/profile"
import { checkToken } from "../api/auth"
import { StorageURL } from "../api/configuration"
import withAuth from "../high-order-component/withAuth"
import Home from "./Home"

function ClientHome() {
    const [recentViewed, setRecentViewed] = useState()
    const [recentProjects, setRecentProjects] = useState()
    const [favoriteProjects, setFavoriteProjects] = useState() // checks id so you have to get the cookie first 
    const [userData, setUserData] = useState()

    useEffect(() => {
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNkMDM4OTliYzZiZWY0MzE3Y2I4YTE2MjQwZDUwNTQwNWNkNDY2MzgxMzIxNjE2MWZjZDI0OTdjMWJlMzRmZmEwODBmOWJlMjgwMzNjMTUiLCJpYXQiOjE3MzkzNDA4MTYuNzI1OTIzLCJuYmYiOjE3MzkzNDA4MTYuNzI1OTI2LCJleHAiOjE3NzA4NzY4MTYuNTE3ODc2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HyoYdODpyzKXclRxDdcrwEdbrVuFHQI4PMFWGtOD9wD_0ywKABH-mJcOvPC_tb0xrg8GOSV3TxgddP1Vx7OXJ7fHoAo4zTv1NGr0zVgRclbUactDI31Q8JEbu5CEzP9Y_PpgG5EDfIy9RqY9HgRxWvuoo2tU1G0H_j-FqhiEThqJFILm2HMFPcFX8jmQfugBCfXgF5o4oOKyCNs7s8sqchO-_neLGkdunPbyGoM8sY6nWQpOOLZYAHL8JDrb_RT0prpgcZipZZUD0MH9Vm_RchzDtbgkkPrPpbH-pTQOrcI0fiwlJf_hYdW2IN6zzPMlFOUSakyCpEFf3ICRYfGx-H1kVMXn7sV57-KkZnCg4tYbTYuBOPsq8RYrYpZruxGQRF0eK6QfsYaECiO2hEyjBEkb0cxmcw4ryfdoWVXez1zoi4FUQ201dW6Dha4J4DMeLL0UE1ZLQy81mmTHJkFXRkb0HtzPnO1CzSyG3AUjZluG1MQFEQfEy0wS481YIOp-GMcy8700OHuzyDybwSwooYdCyD-7s7pydbqkG04ayo9g_CJnq9TGD8osBF8VFrzdg0IgdY3lPXZwBjtpZFbnUgu3RLrjgn94yK2I_Lsa8IDV6_VTWH-uPPtska7Rxc9OB0sRk-UpPOm7RzJhWjMpXcRUt7re4OzmvLT-b_tq9fE'
        // insert token
        getUserData(token).then((id) => getRecentProjects(id))
        getHistory(token)
    }, [])

    async function getUserData(token) {
        const user_id = checkToken(token).then((res) => {
            console.log(res)
            setUserData(res.data)
            return res.data.id
        })
        return await user_id
    }

    function getHistory(token) {
        historyIndex(token).then((res) => {
            console.log(res)
            setRecentViewed(res.data)
        }
        )
    }

    function getRecentProjects(id) {
        userProjects(id).then((res) => {
            console.log(res)
            setRecentProjects(res.data)
        }
        )
    }

    // reserved for favorite projects
    return (
        <>
            {/* Home Page */}

            <div className="bg-[#D4D4D4] w-full h-fit 2xl:h-screen ">
                <div className='px-16 py-10 flex flex-col gap-y-5 h-full '>
                    <div className='flex items-center justify-between gap-x-5'>
                        <div className='flex items-center gap-x-5'>
                            <Avatar className='size-40'>
                                <AvatarImage src={samplePic} />
                            </Avatar>
                            <h2 className='text-4xl font-[Inter] font-bold'>Welcome Nagatoro!</h2>
                        </div>
                        <UploadDialog />
                    </div>

                    <div className="flex justify-between gap-5 h-full">

                        {/* Recently Viewed Projects */}
                        <div className="w-1/2 rounded-3xl bg-white flex flex-col p-5 gap-3">
                            <h3 className="font-[Inter] font-medium text-xl">Recently Viewed</h3>
                            <div className="flex flex-col 2xl:flex-row justify-center items-center gap-3 2xl:h-1/2">
                                {recentViewed?.slice(0, 2).map((e) =>
                                    <img src={`${StorageURL}${e.file_icon}`} className='bg-gray-300 rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                )
                                }
                            </div>
                            {recentViewed?.length >= 2 &&

                                < div className="hidden 2xl:flex justify-center items-start gap-3 2xl:h-1/2">
                                    {recentViewed?.slice(2, 4).map((e) =>
                                        <img src={`${StorageURL}${e.file_icon}`} className='bg-gray-300 rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                    )
                                    }
                                </div>
                            }
                        </div>

                        {/* Recent Projects */}
                        <div className="w-1/2 rounded-3xl bg-white flex flex-col p-5 gap-3">
                            <h3 className='font-[Inter] font-medium text-xl'>Recent Projects</h3>
                            {/* <div className="flex flex-col xl:flex-row justify-center items-center gap-3 2xl:h-1/2">
                                <div className='bg-gray-300 w-[19rem] aspect-video max-w-full'></div>
                                <div className='bg-gray-300 w-[19rem] aspect-video max-w-full'></div>
                            </div>
                            <div className="hidden xl:flex justify-center items-start gap-3 2xl:h-1/2">
                                <div className='bg-gray-300 w-[19rem] aspect-video max-w-full'></div>
                                <div className='bg-gray-300 w-[19rem] aspect-video max-w-full'></div>
                            </div>
                             */}
                            <div className="flex flex-col xl:flex-row justify-center items-center gap-3 2xl:h-1/2">
                                {recentProjects?.slice(0, 2).map((e) =>
                                    <img src={`${StorageURL}${e.file_icon}`} className='bg-gray-300 rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                )
                                }
                            </div>
                            {recentProjects?.length >= 2 &&
                                < div className="hidden xl:flex justify-center items-start gap-3 2xl:h-1/2">
                                    {recentProjects?.slice(2, 4).map((e) =>
                                        <img src={`${StorageURL}${e.file_icon}`} className='bg-gray-300 rounded-md max-w-full w-[19rem] aspect-video object-cover shadow-md'></img>
                                    )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
export default withAuth(Home)