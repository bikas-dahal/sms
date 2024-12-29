import { prisma } from '@/lib/prisma';
import 'server-only';

export const getUserByUsername = async (username: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                username
            }
        })

    } catch (error) {
        console.log('error', error);
        return {
            error: 'Something went wrong'
        }
    }
}