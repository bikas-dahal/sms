'use server'

import { getUserByUsername } from "@/data/auth/user";
import { prisma } from "@/lib/prisma";
import { RegisterSchema, RegisterType } from "@/types/auth";
import bcrypt from 'bcryptjs';

export async function register(data: RegisterType) {

    console.log('register', data)

    const parsedData = RegisterSchema.safeParse(data)

    if (!parsedData.success) {
        return { error: parsedData.error.errors[0].message }
    }

    const { name, surname, phone, password } = parsedData.data

    const existingUser = await getUserByUsername(`${name}.${phone}`)

    
    if (existingUser) {
        // throw new Error('User already exists')
        return { error: 'User already exists' }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                name,
                surname,
                phone,
                password: hashedPassword,
                username: `${name}.${phone}`,
                role: 'ADMIN'
            }
        })
        return { user }
    } catch (error) { 
        console.error('Error creating user:', error) 
        return { error: 'Failed to create user' } 
    
    }
    
}