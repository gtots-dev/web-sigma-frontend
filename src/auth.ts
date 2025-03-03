import NextAuth from 'next-auth'
import { OptionsAuth } from './modules/shared/infrastructure/auth/options.auth'

export const { handlers, auth } = NextAuth(OptionsAuth)
