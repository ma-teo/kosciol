import { createContext } from 'react'

export const Data = createContext()
export const Logged = createContext()
export const Observer = createContext()
export const Site = createContext()

export const apiUrl = process.env.API_URL
export const mediaUrl = process.env.MEDIA_URL
export const siteKey = process.env.RECAPTCHA_SITE_KEY
