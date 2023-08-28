import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Providers from './components/Providers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContextProvider } from './context/context'; // Adjust the path as needed

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MyContextProvider>
    <Providers>
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer />
        {children}
        
        </body>
    </html>
    </Providers>
    </MyContextProvider>

  )
}
