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
import { ChevronDown, ChevronUp } from 'lucide-react'


export default function TypeComboBox(props) {
    const [open, setOpen] = useState(false)

    const [value, setValue] = useState()

    const type = [
        'pdf', 'web', 'img'
    ]

    useEffect(() => {
        props.onSelect(value)
    }, [value])

    useEffect(() => {
            if (props.currentType == 'pdf') {
                setValue('pdf')
            }
            else if (props.currentFile !== '') {
                setValue('web')
            }
            else {
                setValue('img')
            }
    }, [props.currentType])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className='flex w-96'>
                    <div className='bg-white p-1.5 w-3/5 px-2.5 rounded-lg'>
                        {value ? value : "Select a project type"}
                    </div>
                    <div className='bg-contrast size-9 -translate-x-9 rounded-lg flex justify-center items-center'>
                        {open ? <ChevronUp color='white' /> : <ChevronDown color='white' />}
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-40'>
                <Command>
                    <CommandInput placeholder="Search type" />
                    <CommandList>
                        <CommandEmpty>No type found.</CommandEmpty>
                        <CommandGroup >
                            {type.map((type) =>
                                <CommandItem
                                    key={type}
                                    onSelect={(e) => {
                                        setValue(e === value ? "" : e)
                                        setOpen(false)
                                    }}
                                >
                                    {type}
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}
