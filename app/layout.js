import 'bootstrap/dist/css/bootstrap.css'
import '../public/css/global.css'

export default function RootLayout({ children }){
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}