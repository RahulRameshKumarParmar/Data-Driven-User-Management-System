import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'User Management',
  description: 'Dynamic User Management App'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
