import React, { useEffect, useState } from 'react'
import UploadForm from '../components/ui/UploadForm'
import UploadDialog from '../components/ui/UploadDialog'
import ProjectItem from '../components/ui/ProjectItem'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import ViewProjectPanel from '../components/ui/ViewProjectPanel'
import { userProjects } from "../api/profile"
import { checkToken } from '../api/auth'
import { StorageURL } from '../api/configuration'
import { onOpen } from '../api/onOpen'


export default function UserProject() {
    const [likeData, setLikeData] = useState()
    const [favoriteData, setFavoriteData] = useState()
    const [loading, setLoading] = useState()
    const [userProjectData, setUserProjectData] = useState()
    const [viewData, setViewData] = useState()


    const [userData, setUserData] = useState()
    const [recentProjects, setRecentProjects] = useState()

    async function getUserData(token) {
        const user_id = checkToken(token).then((res) => {
            console.log(res)
            setUserData(res.data)
            return res.data.id
        })
        return await user_id
    }
    function getRecentProjects(id) {
        userProjects(id).then((res) => {
            console.log(res)
            setRecentProjects(res.data)
        }
        )
    }

    useEffect(() => {
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNkMDM4OTliYzZiZWY0MzE3Y2I4YTE2MjQwZDUwNTQwNWNkNDY2MzgxMzIxNjE2MWZjZDI0OTdjMWJlMzRmZmEwODBmOWJlMjgwMzNjMTUiLCJpYXQiOjE3MzkzNDA4MTYuNzI1OTIzLCJuYmYiOjE3MzkzNDA4MTYuNzI1OTI2LCJleHAiOjE3NzA4NzY4MTYuNTE3ODc2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HyoYdODpyzKXclRxDdcrwEdbrVuFHQI4PMFWGtOD9wD_0ywKABH-mJcOvPC_tb0xrg8GOSV3TxgddP1Vx7OXJ7fHoAo4zTv1NGr0zVgRclbUactDI31Q8JEbu5CEzP9Y_PpgG5EDfIy9RqY9HgRxWvuoo2tU1G0H_j-FqhiEThqJFILm2HMFPcFX8jmQfugBCfXgF5o4oOKyCNs7s8sqchO-_neLGkdunPbyGoM8sY6nWQpOOLZYAHL8JDrb_RT0prpgcZipZZUD0MH9Vm_RchzDtbgkkPrPpbH-pTQOrcI0fiwlJf_hYdW2IN6zzPMlFOUSakyCpEFf3ICRYfGx-H1kVMXn7sV57-KkZnCg4tYbTYuBOPsq8RYrYpZruxGQRF0eK6QfsYaECiO2hEyjBEkb0cxmcw4ryfdoWVXez1zoi4FUQ201dW6Dha4J4DMeLL0UE1ZLQy81mmTHJkFXRkb0HtzPnO1CzSyG3AUjZluG1MQFEQfEy0wS481YIOp-GMcy8700OHuzyDybwSwooYdCyD-7s7pydbqkG04ayo9g_CJnq9TGD8osBF8VFrzdg0IgdY3lPXZwBjtpZFbnUgu3RLrjgn94yK2I_Lsa8IDV6_VTWH-uPPtska7Rxc9OB0sRk-UpPOm7RzJhWjMpXcRUt7re4OzmvLT-b_tq9fE'
        // insert token
        getUserData(token).then((id) => getRecentProjects(id))
    }, [])

    return (
        <Sheet>
            <div className='w-full h-screen bg-[#D4D4D4] flex flex-col items-center'>
                <div className='w-full h-40 px-20 flex justify-between items-center' style={{ background: 'linear-gradient(90deg, #B08080 0.84%, #AF8484 31.08%, #968585 90.72%)' }} >
                    <div className='flex flex-col items-center'>
                        <h2 className='text-white font-[Inter] font-bold text-3xl'>Your Projects</h2>
                        <h3 className='font-medium'>A gateway to creativity</h3>
                    </div>
                    <UploadDialog />
                </div>
                <ScrollArea className='w-5/6 h-full justify-center items-start'>
                    <div className='w-full h-full flex justify-center flex-wrap items-start gap-y-2'>
                        {recentProjects?.map((project) =>
                            <SheetTrigger>
                                <ProjectItem onClick={() => onOpen(project.id, setViewData, setUserProjectData, setLikeData, setFavoriteData, setLoading)} thumbnail={`${StorageURL}` + project.file_icon} name={project.name} />
                            </SheetTrigger>
                        )}
                    </div>
                </ScrollArea>
            </div>
            <ViewProjectPanel
                response={viewData}
                id={viewData?.id}
                file_icon={`${StorageURL}${viewData?.file_icon}`}
                authors={viewData && JSON.parse(viewData?.authors)}
                title={viewData?.name}
                categories={viewData?.categories.map((e) => e.category)}
                thumbnails_source={(viewData) && (viewData.thumbnails != 'null' ? JSON.parse(viewData?.thumbnails).map((e) => `${StorageURL}` + e) : console.log('works'))}
                username={userProjectData?.user?.name} //saved for auth context
                date={viewData?.created_at}
                description={viewData?.description}
                profilePic='SamplePic'
                file_type={viewData?.file_extension}
                file_source={`${StorageURL}` + viewData?.file}
                loading={loading}
                like_data={likeData?.id}
                favorite_data={favoriteData?.id} />
        </Sheet>
    )
}
