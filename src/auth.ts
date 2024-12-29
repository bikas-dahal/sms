import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
 
  
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    authorized: ({auth, request: { nextUrl }}) => {
      const isLoggedIn = auth?.user;

      const paths = ['/dashboard'];

      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path));

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/login', nextUrl.origin);

        redirectUrl.searchParams.append('callbackUrl', nextUrl.pathname);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      console.log('user', user)
      console.log('token', token)
      if (user) {
        token.id = user.id
        token.role = user.role
        return token
      }
      return token
    },
    
    session: async ( {session, token} ) => {

      console.log('object', token)
      console.log('ession', session)

      if (session?.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    }, 
    
  },
  ...authConfig,
})

