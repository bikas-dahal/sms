'use server'
 
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { LoginForm, LoginSchema } from '@/types/auth'
import { redirect } from 'next/navigation'
import {  getUserByUsername } from '@/data/auth/user'


export async function login(values: LoginForm, callbackUrl?: string) {

        const validatedData = LoginSchema.safeParse(values)

        if (!validatedData.success) {
            return { error: validatedData.error.errors[0].message }
        }

        const { username, password } = validatedData.data

        const existingUser = await getUserByUsername(username)

        if (!existingUser) {
            return { error: 'Invalid credentials 😔' }
        }

        try {
            await signIn('credentials', {
                username,
                password,
                // redirect: false,
                redirectTo: callbackUrl || 'http://localhost:3000/dashboard',
            })

            return {
                success: "Logged in successfully 🤗"
            }
        } catch (error) {
            console.log('error', error);
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return {
                            error: 'Invalid credentials 😔'
                        }
                    default:
                        return {error: 'Something went wrong'}
                }
            }
            throw error;
        }
}

// export async function authenticate(prevState: any, formData: FormData) {
//     try {
//         const phone = formData.get('phone')
//         const password = formData.get('password')

//         const parsedData = LoginSchema.safeParse({
//             phone,
//             password
//         })

//         if (!parsedData.success) {
//             return { error: parsedData.error.errors[0].message }
//         }

//         const { data } = parsedData

//         await signIn('credentials', {
//             phone: data.phone,
//             password: data.password,
//             redirect: false,
//         })

//         redirect('/dashboard')
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return { error: 'Invalid credentials' }
//                 default:
//                     return { error: 'Something went wrong' }
//             }
//         }
//         throw error
//     }
// }