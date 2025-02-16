import React, { useEffect, useState } from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import SampleThumbnail from '../../assets/SampleThumbnail.jpeg'
import SampleThumbnail2 from '../../assets/SampleThumbnail2.jpeg'
import SampleThumbnail3 from '../../assets/SampleThumbnail3.png'
import SamplePic from '../../assets/sampleProfile.png'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Ellipsis, Heart, LoaderCircle, Star, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { add as addLike, destroy as destroyLike } from '../../api/likes'
import { add as addFavorite, destroy as destroyFavorite } from '../../api/favorites'
import dayjs from 'dayjs'
// Example values

export default function ViewProjectPanel({
    response,
    id,
    file_icon,
    authors = "test",
    title = 'test',
    categories = ['Vtuber', 'ASMR'],
    username = 'Nagatoro',
    date = 'February 4, 2025',
    description = 'In August 2024, the Nimi Nightmare Twitter account was created. It was inactive until 3 January 2025, when its Twitter profile picture changed to a silhouette, and its profile description read "???". At the same time, a YouTube channel previously used by ASMR VTuber LemonLeaf changed its username to @niminightmare shortly after achieving 300,000 subscribers. On 14 January 2025, she made her first tweet, "konbakuwa! ⸜( *ˊ ᵕ ˋ* )⸝". The following day, she also opened a Bluesky account, and made her VTuber debut announcement. Her debut stream took place on YouTube on 17 January 2025 at 3 PM PST / 6 PM EST. She initially debuted in chibi form, with a full model forthcoming in the future. She also released a set of merch, including a 12.5" plush, stickers, and signed cards. The merch sold out almost instantly, and the plush and stickers were quickly re-released on a pre-order basis.'
    , profilePic = SamplePic,
    file_type = '', // 3 Options: '' (web), 'pdf' (adds pdf preview), 'png' (only shows thumbnails)
    file_source = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf",
    thumbnails_source,
    like_data,
    favorite_data,
    loading
}) {
    const [mainThumbnail, setMainThumbnail] = useState('')
    const [like, setLike] = useState(false) // Modify these 2 lines of code when connecting it to the database
    const [favorite, setFavorite] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [likeLoading, setLikeLoading] = useState(false)
    const [favoriteLoading, setFavoriteLoading] = useState(false)

    const navigate = useNavigate();

    const toggleLike = () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNkMDM4OTliYzZiZWY0MzE3Y2I4YTE2MjQwZDUwNTQwNWNkNDY2MzgxMzIxNjE2MWZjZDI0OTdjMWJlMzRmZmEwODBmOWJlMjgwMzNjMTUiLCJpYXQiOjE3MzkzNDA4MTYuNzI1OTIzLCJuYmYiOjE3MzkzNDA4MTYuNzI1OTI2LCJleHAiOjE3NzA4NzY4MTYuNTE3ODc2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HyoYdODpyzKXclRxDdcrwEdbrVuFHQI4PMFWGtOD9wD_0ywKABH-mJcOvPC_tb0xrg8GOSV3TxgddP1Vx7OXJ7fHoAo4zTv1NGr0zVgRclbUactDI31Q8JEbu5CEzP9Y_PpgG5EDfIy9RqY9HgRxWvuoo2tU1G0H_j-FqhiEThqJFILm2HMFPcFX8jmQfugBCfXgF5o4oOKyCNs7s8sqchO-_neLGkdunPbyGoM8sY6nWQpOOLZYAHL8JDrb_RT0prpgcZipZZUD0MH9Vm_RchzDtbgkkPrPpbH-pTQOrcI0fiwlJf_hYdW2IN6zzPMlFOUSakyCpEFf3ICRYfGx-H1kVMXn7sV57-KkZnCg4tYbTYuBOPsq8RYrYpZruxGQRF0eK6QfsYaECiO2hEyjBEkb0cxmcw4ryfdoWVXez1zoi4FUQ201dW6Dha4J4DMeLL0UE1ZLQy81mmTHJkFXRkb0HtzPnO1CzSyG3AUjZluG1MQFEQfEy0wS481YIOp-GMcy8700OHuzyDybwSwooYdCyD-7s7pydbqkG04ayo9g_CJnq9TGD8osBF8VFrzdg0IgdY3lPXZwBjtpZFbnUgu3RLrjgn94yK2I_Lsa8IDV6_VTWH-uPPtska7Rxc9OB0sRk-UpPOm7RzJhWjMpXcRUt7re4OzmvLT-b_tq9fE' //insert token here
        setLikeLoading(true)
        if (like) {
            destroyLike(id, token).then((res) =>
                console.log(res)
            ).finally(() => {
                setLike(!like)
                setLikeLoading(false)
            }
            )
        }
        else {
            addLike(id, token).then((res) =>
                console.log(res)
            ).finally(() => {
                setLike(!like)
                setLikeLoading(false)
            }
            )
        }
    }

    const toggleFavorite = () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNkMDM4OTliYzZiZWY0MzE3Y2I4YTE2MjQwZDUwNTQwNWNkNDY2MzgxMzIxNjE2MWZjZDI0OTdjMWJlMzRmZmEwODBmOWJlMjgwMzNjMTUiLCJpYXQiOjE3MzkzNDA4MTYuNzI1OTIzLCJuYmYiOjE3MzkzNDA4MTYuNzI1OTI2LCJleHAiOjE3NzA4NzY4MTYuNTE3ODc2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HyoYdODpyzKXclRxDdcrwEdbrVuFHQI4PMFWGtOD9wD_0ywKABH-mJcOvPC_tb0xrg8GOSV3TxgddP1Vx7OXJ7fHoAo4zTv1NGr0zVgRclbUactDI31Q8JEbu5CEzP9Y_PpgG5EDfIy9RqY9HgRxWvuoo2tU1G0H_j-FqhiEThqJFILm2HMFPcFX8jmQfugBCfXgF5o4oOKyCNs7s8sqchO-_neLGkdunPbyGoM8sY6nWQpOOLZYAHL8JDrb_RT0prpgcZipZZUD0MH9Vm_RchzDtbgkkPrPpbH-pTQOrcI0fiwlJf_hYdW2IN6zzPMlFOUSakyCpEFf3ICRYfGx-H1kVMXn7sV57-KkZnCg4tYbTYuBOPsq8RYrYpZruxGQRF0eK6QfsYaECiO2hEyjBEkb0cxmcw4ryfdoWVXez1zoi4FUQ201dW6Dha4J4DMeLL0UE1ZLQy81mmTHJkFXRkb0HtzPnO1CzSyG3AUjZluG1MQFEQfEy0wS481YIOp-GMcy8700OHuzyDybwSwooYdCyD-7s7pydbqkG04ayo9g_CJnq9TGD8osBF8VFrzdg0IgdY3lPXZwBjtpZFbnUgu3RLrjgn94yK2I_Lsa8IDV6_VTWH-uPPtska7Rxc9OB0sRk-UpPOm7RzJhWjMpXcRUt7re4OzmvLT-b_tq9fE' //insert token here
        setFavoriteLoading(true)
        if (favorite) {
            destroyFavorite(id, token).then((res) =>
                console.log(res)
            ).finally(() => {
                setFavorite(!favorite)
                setFavoriteLoading(false)
            }
            )
        }
        else {
            addFavorite(id, token).then((res) =>
                console.log(res)
            ).finally(() => {
                setFavorite(!favorite)
                setFavoriteLoading(false)
            }
            )
        }
    }

    useEffect(
        () => {
            setLike(like_data ? true : false)
            console.log(like_data)
        }
        , [like_data])

    useEffect(
        () => {
            setFavorite(favorite_data ? true : false)    
            console.log(favorite_data)
            
            
        }
        , [favorite_data])

    return (
        <SheetContent className='border-none h-fit flex flex-col items-end px-0 py-0 gap-0 bg-transparent' side='bottom'>
            <SheetClose className='text-white h-[5vh] w-12 flex justify-end items-center px-1 py-5'><X className='size-10' /></SheetClose>
            <ScrollArea className='bg-white h-[90vh] px-10 w-full'>
                {loading ?
                    <div className='w-[95vw] h-[95vh] flex justify-center items-center'>
                        <Oval
                            height="120"
                            width="120"
                            color="#622C2C"
                            secondaryColor="#D1C1C1"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>

                    :

                    <div className='flex flex-col gap-10 items-center pb-10'>
                        <SheetHeader className='w-full px-20 pt-7'>
                            <div className='flex justify-between'>
                                <SheetTitle className='text-3xl w-2/5 font-bold'>{title}</SheetTitle>
                                <h3>Category:{categories.map(
                                    (category) => { return " " + category }
                                )}</h3>
                            </div>
                            <div className='flex items-center gap-2 font-[Inter] text-sm'>
                                <Avatar>
                                    <AvatarImage src={profilePic} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h4>{username}</h4>
                                <h4 className='text-[#4c4c4c]'>{dayjs(date).format('MMMM D, YYYY')}</h4>
                            </div>
                        </SheetHeader>

                        {/* Fix this later, make into a theme */}
                        <div className='w-full h-[80vh] pb-11 flex justify-center'>
                            {thumbnails_source &&
                                <>

                                    <div className='w-2/12 h-full flex flex-col items-center justify-center  gap-3'>
                                        {thumbnails_source.map((path) => (
                                            <>
                                                <div key={path}>
                                                    <img onClick={() => setMainThumbnail(path)} className='w-[200px]  aspect-video rounded-md object-cover hover:brightness-50 transition-all shadow-md' src={path} />
                                                    {/* <div className='w-full h-full hover:bg-stone-400 -z-[-1] relative bottom-20'></div> */}
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>
                            }
                            <div className='w-8/12 p-8'>
                                <AspectRatio ratio={16 / 9}>
                                    <img src={mainThumbnail ? mainThumbnail : file_icon} className='object-cover w-full h-full rounded-md shadow-xl '></img>
                                </AspectRatio>
                            </div>

                            {/* Create a variant for this button for a more clean way of coding */}
                            <div className='w-fit h-full flex flex-col gap-3 items-center py-20'>
                                <Button asChild disabled={likeLoading} onClick={() => toggleLike()} className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300' size="icon"><Heart fill={like ? '#FF857A' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>
                                <Button asChild disabled={favoriteLoading} onClick={() => toggleFavorite()} className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300' size="icon"><Star fill={favorite ? '#FFE97B' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>

                                {/* Note After authentication is added, check user if they own the project*/}
                                <Popover>
                                    <PopoverTrigger>
                                        <Button asChild className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300' size="icon"><Ellipsis fill={favorite ? '#FFE97B' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent className={cn('h-30  flex flex-col gap-2 items-center w-30', deleteView && 'w-48 h-44 transition-all')}>
                                        <Button onClick={() => navigate(`edit/${id}`)} className='p-0 w-24'>Edit</Button>
                                        <Button className='p-0 w-24' variant='destructive' onClick={() => setDeleteView(!deleteView)}>Delete</Button>
                                        {deleteView &&
                                            <>
                                                <Separator />
                                                <div>
                                                    <Button className=' text-sm'>Confirm</Button>
                                                    <Button variant='outlined' onClick={() => setDeleteView(!deleteView)}>Cancel</Button>
                                                </div>
                                            </>
                                        }
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>


                        {/* Checks whether the file type is either a pdf or web link as links don't have file types */}
                        {/* Possible problem: Check for a better way to make this line better */}
                        {(file_type === 'pdf' || file_type === '') &&
                            <>
                                <div className='w-full flex flex-col gap-5 items-center'>
                                    <span className='w-4/5 flex justify-start font-bold text-xl'>File Preview:</span>
                                    <Separator className='w-4/5 h-0.5 bg-black' />
                                    {file_type === 'pdf' ?
                                        <object class="pdf"
                                            data={file_source}
                                            width="800"
                                            height="500">
                                        </object>
                                        :
                                        <iframe className='w-[800px] aspect-video' src={file_source} title="Website Preview">
                                        </iframe>
                                    }
                                </div>
                            </>

                        }
                        <div className='w-4/5 text-xl flex gap-2'>
                            <span className='font-bold'>Author/s:</span>
                            {(() => {
                                try {
                                    return JSON.parse(authors).reduce((prev, cur) => (prev + ', ' + cur))
                                } catch (e) {
                                    return authors
                                }
                            })()

                            }
                        </div>
                        <Separator className='w-4/5 h-0.5 bg-black' />
                        <div className='w-full gap-1 px-20 text-lg flex flex-col items-start'>
                            <span className='font-bold'>Description:</span>
                            <p className=' whitespace-pre-wrap'>{description}</p>
                        </div>
                    </div>
                }
            </ScrollArea>
        </SheetContent >
    )
}
