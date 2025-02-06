import React, { useState } from 'react'
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
import { Heart, Star, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
// Example values

export default function ViewProjectPanel({
    authors = "test",
    title = 'Nimi Nightmare: An introduction',
    categories = ['Vtuber', 'ASMR'],
    username = 'Nagatoro',
    date = 'February 4, 2025',
    description = 'In August 2024, the Nimi Nightmare Twitter account was created. It was inactive until 3 January 2025, when its Twitter profile picture changed to a silhouette, and its profile description read "???". At the same time, a YouTube channel previously used by ASMR VTuber LemonLeaf changed its username to @niminightmare shortly after achieving 300,000 subscribers. On 14 January 2025, she made her first tweet, "konbakuwa! ⸜( *ˊ ᵕ ˋ* )⸝". The following day, she also opened a Bluesky account, and made her VTuber debut announcement. Her debut stream took place on YouTube on 17 January 2025 at 3 PM PST / 6 PM EST. She initially debuted in chibi form, with a full model forthcoming in the future. She also released a set of merch, including a 12.5" plush, stickers, and signed cards. The merch sold out almost instantly, and the plush and stickers were quickly re-released on a pre-order basis.'
    , profilePic = SamplePic,
    file_type = '', // 3 Options: '' (web), 'pdf' (adds pdf preview), 'png' (only shows thumbnails)
    file_source = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf",
    file_link = "https://edge.mfi.org.ph",
    thumbnails_source = [
        SampleThumbnail,
        SampleThumbnail2,
        // Why is it that when importing it work instead of just using a string path?
        // '../../assets/SampleThumbnail3.png', 
        SampleThumbnail3
    ]
}) {
    const [mainThumbnail, setMainThumbnail] = useState('')
    const [like, setLike] = useState(false) // Modify these 2 lines of code when connecting it to the database
    const [favorite, setFavorite] = useState(false)
    return (
        <SheetContent className='border-none h-fit flex flex-col items-end px-0 py-0 gap-0 bg-transparent' side='bottom'>
            <SheetClose className='text-white h-[5vh] w-12 flex justify-end items-center px-1 py-5'><X className='size-10' /></SheetClose>
            <ScrollArea className='bg-white h-[90vh] px-10'>
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
                            <h4 className='text-[#4c4c4c]'>{date}</h4>
                        </div>
                    </SheetHeader>

                    {/* Fix this later, make into a theme */}
                    <div className='w-full h-[80vh] pb-11 flex justify-center'>
                        <div className='w-2/12 h-full flex flex-col items-center justify-center  gap-3'>
                            {thumbnails_source.map((path) => (
                                <>
                                    <div>
                                        <img onClick={() => setMainThumbnail(path)} className='w-2/3 aspect-video rounded-md object-cover hover:brightness-50 transition-all shadow-md' src={path} />
                                        {/* <div className='w-full h-full hover:bg-stone-400 -z-[-1] relative bottom-20'></div> */}
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className='w-8/12 p-8'>
                            <AspectRatio ratio={16 / 9}>
                                <img src={mainThumbnail ? mainThumbnail : thumbnails_source[0]} className='object-cover w-full h-full rounded-md shadow-xl '></img>
                            </AspectRatio>
                        </div>

                        {/* Create a variant for this button for a more clean way of coding */}
                        <div className='w-fit h-full flex flex-col gap-3 items-center py-20'>
                            <Button asChild onClick={() => setLike(!like)} className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300' size="icon"><Heart fill={like ? '#FF857A' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>
                            <Button asChild onClick={() => setFavorite(!favorite)} className='size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 3xl:size-13 rounded-full bg-transparent shadow-none p-1 lg:p-1.5 hover:bg-stone-300' size="icon"><Star fill={favorite ? '#FFE97B' : 'none'} strokeWidth={'1.3px'} color='black' /></Button>
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
                                    <iframe className='w-[800px] aspect-video' src={file_link} title="Website Preview">
                                    </iframe>
                                }
                            </div>
                        </>

                    }
                    <div className='w-4/5 text-xl flex gap-2'>
                        <span className='font-bold'>Author/s:</span>
                        {authors}
                    </div>
                    <Separator className='w-4/5 h-0.5 bg-black' />
                    <div className='px-20 text-lg'>
                        {description}
                    </div>
                </div>
            </ScrollArea>
        </SheetContent >
    )
}
