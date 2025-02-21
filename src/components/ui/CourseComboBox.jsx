import React, { useEffect, useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { index } from '../../api/courses'


export default function CourseComboBox(props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState()
    const [courses, setCourses] = useState();
    const [course, setCourse] = useState()

    useEffect(() => {
        index().then((res) => {
            if (res?.ok) {
                setCourses(res.data)
            }
        })
    }, []
    )

    useEffect(() => {
        props.onSelect(value)
    }, [value])

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className='w-3/5 max-w-64 xl:max-w-80 2xl:max-w-96 text-base gap-1 justify-start px-2 py-0 flex flex-wrap overflow-hidden' variant='outline'>
                    {course ? course : "Select Course"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder="search course" />
                        <CommandList>
                            <CommandEmpty>No Course Found</CommandEmpty>
                            <CommandGroup>
                                {courses?.map((entry) => (
                                    <CommandItem
                                        className=''
                                        key={entry.id}
                                        value={entry.id}
                                        onSelect={(e) => {
                                            setCourse(e === value ? "" : e)
                                            setValue(entry.id === value ? null : entry.id)
                                            setOpen(false)
                                        }}>
                                        {entry.course}
                                    </CommandItem>
                                ))}

                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}
