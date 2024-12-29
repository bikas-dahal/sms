'use client'

import { register } from "@/actions/auth/register"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema, RegisterType } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"

const RegisterPage = () => {

    const [pending, startTransition] = useTransition()

    const form = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            password: '',
            phone: '',
            surname: ''
        }
    })

    const onSubmit = (data: RegisterType) => {
        startTransition(async () => {
            const res = await register(data)
            console.log('res', res)
        })
    }

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 bg-pink-300 h-screen">
        <div>
            Left intro part
        </div>
        <div>
            <Form {...form}> 
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                        name="name"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="name">First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name="surname"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name="phone"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number"  />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name="password"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={pending} type="submit">Register</Button>
                </form>
 
            </Form>
        </div>
    </div>
  )
}

export default RegisterPage