"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  FileText,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme-toggle"

export function AdminSidebar() {
  const pathname = usePathname()
  const isTransaksiPath = pathname?.startsWith("/dashboard/admin/transaksi")
  const [isTransaksiOpen, setIsTransaksiOpen] = React.useState(isTransaksiPath ?? false)

  React.useEffect(() => {
    if (isTransaksiPath) {
      setIsTransaksiOpen(true)
    }
  }, [isTransaksiPath])

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          <ModeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/user-management"}
                  render={
                    <Link href="/dashboard/admin/user-management">
                      <Users className="h-4 w-4" />
                      <span>User Management</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/santri-management"}
                  render={
                    <Link href="/dashboard/admin/santri-management">
                      <GraduationCap className="h-4 w-4" />
                      <span>Santri Management</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsTransaksiOpen(!isTransaksiOpen)}
                  isActive={isTransaksiOpen}
                >
                  {isTransaksiOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span>Transaksi</span>
                </SidebarMenuButton>
                {isTransaksiOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/dashboard/admin/transaksi/spp"}
                        render={
                          <Link href="/dashboard/admin/transaksi/spp">
                            <span>SPP</span>
                          </Link>
                        }
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/dashboard/admin/transaksi/syahriah"}
                        render={
                          <Link href="/dashboard/admin/transaksi/syahriah">
                            <span>Syahriah</span>
                          </Link>
                        }
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/dashboard/admin/transaksi/uang-saku"}
                        render={
                          <Link href="/dashboard/admin/transaksi/uang-saku">
                            <span>Uang Saku</span>
                          </Link>
                        }
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/dashboard/admin/transaksi/laundry"}
                        render={
                          <Link href="/dashboard/admin/transaksi/laundry">
                            <span>Laundry</span>
                          </Link>
                        }
                      />
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/laporan-keuangan"}
                  render={
                    <Link href="/dashboard/admin/laporan-keuangan">
                      <FileText className="h-4 w-4" />
                      <span>Laporan Keuangan</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
