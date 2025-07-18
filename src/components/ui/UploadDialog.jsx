import React, { useEffect, useState } from 'react'
import UploadForm from './UploadForm'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import { ToastContainer, toast } from 'react-toastify';

export default function UploadDialog() {
    const [openPDF, setOpenPDF] = useState(false)
    const [openWEB, setOpenWEB] = useState(false)
    const [openIMG, setOpenIMG] = useState(false)

    return (
        <>
        
        <Dialog>
            <DialogTrigger><div className='w-64 h-16 text-xl rounded-3xl bg-contrast hover:bg-highlight transition-all text-white font-[Inter] flex items-center justify-center font-bold'>Upload Project</div></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Choose the type of project you are uploading:
                    </DialogDescription>
                </DialogHeader>

                <div className='w-full bg-[#A5A5A5] h-24 rounded-md flex justify-center items-center gap-3 p-4'>
                    <UploadForm open={openPDF} setOpen={setOpenPDF} type='PDF' value='pdf'/>
                    <UploadForm open={openWEB} setOpen={setOpenWEB} type='WEB' value='web' />
                    <UploadForm open={openIMG} setOpen={setOpenIMG} type='IMAGE' value='img'/>
                </div>

                <DialogFooter >
                    <DialogClose className='w-full flex justify-center'><div className='bg-contrast hover:bg-highlight transition-all text-sm text-white rounded-md py-2 px-5'>Cancel</div></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}
