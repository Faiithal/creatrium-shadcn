import React, { useEffect, useState } from 'react'
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
import { Button } from "@/components/ui/button"


export default function CampusComboBox(props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState()

    const campuses = [
        'Pasig', 'Pasay', 'Jala-Jala'
    ]

    useEffect(() => {
            props.onSelect(value)
        }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className='w-2/5 h-9 px-3 rounded-md flex items-center shadow-md bg-white'>
                    {value ? value : "Select campus"}
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Search Campus" />
                    <CommandList>
                        <CommandEmpty>No Campuses found.</CommandEmpty>
                        <CommandGroup>
                            {campuses.map((campus) =>
                                <CommandItem
                                    key={campus}
                                    onSelect={(e) => {
                                        setValue(e === value ? "" : e)
                                        setOpen(false)
                                    }}
                                >
                                    {campus}
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}
