import { Playfair_Display, Lato, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-lato',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata = {
  title: "Zerlin Khadijah's Ear Piercing Ceremony",
  description: "You are warmly invited to celebrate Khadijah's Ear Piercing Ceremony on 29th April 2025 at Simnaz, Muzhappilangad.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
