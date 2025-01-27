import React from 'react'

export default function temp() {
  return (
    <Form>
                            <form>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render = { ({field}) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jane Doe" { ...field } />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
  )
}
