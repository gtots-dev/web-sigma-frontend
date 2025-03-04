import NextAuth from 'next-auth'
import { OptionsAuth } from './modules/authentication/infrastructure/auth/options.auth'

export const { handlers, auth } = NextAuth(OptionsAuth)
