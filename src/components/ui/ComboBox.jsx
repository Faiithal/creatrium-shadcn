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
import { index } from '../../api/categories'


export default function ComboBox(props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState([])
    const [categories, setCategories] = useState();
    const [category, setCategory] = useState([])

    
    useEffect(() => {
        if (props.defaultValue) {
            props.defaultValue.map((v) => {
                category.indexOf(v.category) === -1 && setCategory((e) => [...e, v.category])
                value.indexOf(v.id) === -1 && setValue((e) => [...e, v.id])
            })
        }
        else {
            console.log('false brother')
        }

    }, [props.defaultValue])

    useEffect(() => {
        props.onSelect(value)

    }, [value])

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className='min-h-fit max-h-9 gap-1 justify-start p-1 flex flex-wrap' variant='outline'>
                        {category.length ? category.map((e) => (
                            <span key={e} className='p-1 rounded-md bg-zinc-200'>{e}</span>
                        ))
                            : "Select a category"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder="search category" />
                        <CommandList>
                            <CommandEmpty>No Category Found</CommandEmpty>
                            <CommandGroup>
                                {categories?.map((entry) => (
                                    <CommandItem
                                        className=''
                                        key={entry.id}
                                        value={entry.id}
                                        onSelect={(label) => {
                                            value.indexOf(entry.id) !== -1 ? setValue(value.filter((e) => { return e != entry.id })) : setValue([...value, entry.id])
                                            category.indexOf(label) !== -1 ? setCategory(category.filter((e) => { return e != label })) : setCategory([...category, label])
                                        }}>
                                        {entry.category}
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
