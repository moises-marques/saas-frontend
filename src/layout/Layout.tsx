// frontend/src/layout/Layout.tsx
import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

type LayoutProps = {
  children: React.ReactNode
  email?: string
}

export default function Layout({ children, email }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={email} />
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 md:col-span-1">
          <Sidebar />
        </div>
        <main className="col-span-6 md:col-span-5">{children}</main>
      </div>
    </div>
  )
}
