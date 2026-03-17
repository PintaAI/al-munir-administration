"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Users,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
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
        <div className="flex items-center gap-2 px-2 py-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <a href="/dashboard/admin/user-management">
                      <Users className="h-4 w-4" />
                      <span>User Management</span>
                    </a>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <a href="/dashboard/admin/santri-management">
                      <GraduationCap className="h-4 w-4" />
                      <span>Santri Management</span>
                    </a>
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
                        render={
                          <a href="/dashboard/admin/transaksi/spp">
                            <span>SPP</span>
                          </a>
                        }
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        render={
                          <a href="/dashboard/admin/transaksi/syahriah">
                            <span>Syahriah</span>
                          </a>
                        }
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        render={
                          <a href="/dashboard/admin/transaksi/uang-saku">
                            <span>Uang Saku</span>
                          </a>
                        }
                      />
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        render={
                          <a href="/dashboard/admin/transaksi/laundry">
                            <span>Laundry</span>
                          </a>
                        }
                      />
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
