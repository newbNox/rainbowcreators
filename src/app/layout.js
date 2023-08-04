import { SessionProvider } from "next-auth/react"
import "./css/global.scss"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Roboto } from 'next/font/google'
const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
})
config.autoAddCss = false

export default function RootLayout({ children }) {
    return (
        <SessionProvider session={session}>
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
        </SessionProvider>
    )
}