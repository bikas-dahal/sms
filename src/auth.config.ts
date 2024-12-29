import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from 'bcryptjs'

export default {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "name-phone",
                    type: "text",
                    placeholder: "hari-9846042783",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
    
            
    
            async authorize(credentials) {
              if (!credentials.username || !credentials.password) {
                return null;
              }
    
              console.log('credentials', credentials)
    
    
              const user = await prisma.user.findUnique({
                where: {
                  username: String(credentials.username),
                }
              })
    
              if (
                !user || !(await bcrypt.compare(String(credentials.password), user.password))
              ) {
                return null
              }
              return {
                id: user.id,
                phone: user.phone,
                name: user.name,
                role: user.role
              }
            }
        })
      ],
}