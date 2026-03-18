"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserInfo } from "@/components/user-info"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex items-center gap-4 p-2">
          <SidebarTrigger />
          <div className="flex-1" />
          <UserInfo />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
