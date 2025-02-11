import React from 'react'
import SampleThumbnail from '../../assets/SampleThumbnail.jpeg'
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function ProjectItem(props) {
    return (
        <>
            <div key={props.key} onClick={props.onClick} className='w-fit flex flex-col items-center gap-3 hover:bg-white hover:brightness-50 hover:bg-opacity-35 rounded-xl p-3 transition-all'>
                <div className='w-[270px]'>
                    <AspectRatio ratio={16 / 9}>
                        <img src={props.thumbnail} className='object-cover w-full h-full rounded-md shadow-md'></img>
                    </AspectRatio>
                </div>
                <h3 className='bg-[#777777] w-60 h-9 rounded-2xl text-ellipsis whitespace-nowrap overflow-hidden py-1 px-2 text-white'>{props.name}</h3>
            </div>
        </>
    )
}

// <img className='aspect-[16 / 9], w-[270px] object-cover' src={''}>
