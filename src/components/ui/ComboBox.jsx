import React, { useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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

const categories = [
    {
        value: "webdev",
        label: "Web Development",
    },
    {
        value: "I.T.",
        label: "Information Technology",
    },
    {
        value: "Auto",
        label: "Automotive",
    },
    {
        value: "STEM",
        label: "Science, Technology, Engineering, Mathematics",
    },
    {
        value: "DAD",
        label: "Digital Arts & Design",
    },
]


export default function ComboBox() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState([])
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className='gap-1 justify-start p-1' variant='outline'>
                        {value ? value.map((e) => (
                            <span className='p-1 rounded-md bg-zinc-200'>{e}</span>
                        ))

                            : "Select a category"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder="search framework" />
                        <CommandList>
                            <CommandEmpty>No Framework Found</CommandEmpty>
                            <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                        className=''
                                        key={category.value}
                                        value={category.value}
                                        onSelect={
                                            (currentValue) => {
                                                {
                                                    (value.indexOf(currentValue) != -1) ?
                                                        setValue(value.filter((e) => { return e != currentValue })) :
                                                        setValue([...value, currentValue])
                                                }
                                            }}>
                                        {category.label}
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
