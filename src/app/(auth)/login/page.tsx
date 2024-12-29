'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  login } from "@/actions/auth/login"
import {  LoginForm, LoginSchema } from '@/types/auth'
import {  useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"




export default function LoginPage() {

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [pending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')


    const { handleSubmit, register, formState: { errors }, reset } = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data: LoginForm) => {
        setError('')
        setSuccess('')

        startTransition( async () => {
            try {
                const { error, success } = await login(data, callbackUrl!)
                reset()
                setError(error)
                setSuccess(success)
            } catch (error) {
                setError('Something went wrong')
            }
        })


    }

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    School Management System
                </div>
            </div>
            <div className="p-4 lg:p-8 h-full flex items-center">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your phone and password to login to your account
                        </CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register("username")} />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Logging in...' : 'Login'}
            </Button>
        </form>
                </Card>
            </div>
        </div>
    )
}