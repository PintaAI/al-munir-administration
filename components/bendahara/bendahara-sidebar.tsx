"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Users,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Wallet,
  Receipt,
  FileCheck,
  Briefcase,
  Trophy,
  Home,
  BookOpen,
  Shirt,
  DollarSign,
  FileText,
  BookMarked,
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

type BendaharaRole = "smk" | "smp" | "pondok"

interface BendaharaSidebarProps {
  role: BendaharaRole
}

export function BendaharaSidebar({ role }: BendaharaSidebarProps) {
  const pathname = usePathname()
  const basePath = `/dashboard/bendahara/${role}`
  const isTransaksiPath = pathname?.startsWith(`${basePath}/transaksi`)
  const [isTransaksiOpen, setIsTransaksiOpen] = React.useState(isTransaksiPath ?? false)

  React.useEffect(() => {
    if (isTransaksiPath) {
      setIsTransaksiOpen(true)
    }
  }, [isTransaksiPath])

  const getRoleTitle = () => {
    switch (role) {
      case "smk":
        return "Bendahara SMK"
      case "smp":
        return "Bendahara SMP"
      case "pondok":
        return "Bendahara Pondok"
      default:
        return "Bendahara"
    }
  }

  const getTransaksiItems = () => {
    switch (role) {
      case "smk":
        return [
          { href: "spp", label: "SPP", icon: Receipt },
          { href: "syahriah", label: "Syahriah", icon: Receipt },
          { href: "ujian", label: "Ujian", icon: FileCheck },
          { href: "pkl", label: "PKL", icon: Briefcase },
          { href: "lks", label: "LKS", icon: Trophy },
        ]
      case "smp":
        return [
          { href: "spp", label: "SPP", icon: Receipt },
          { href: "syahriah", label: "Syahriah", icon: Receipt },
          { href: "ujian", label: "Ujian", icon: FileCheck },
          { href: "buku-pendamping", label: "Buku Pendamping", icon: BookOpen },
          { href: "tka", label: "TKA", icon: BookMarked },
        ]
      case "pondok":
        return [
          { href: "uang-saku", label: "Uang Saku", icon: DollarSign },
          { href: "laundry", label: "Laundry", icon: Shirt },
        ]
      default:
        return []
    }
  }

  const transaksiItems = getTransaksiItems()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-lg font-semibold">{getRoleTitle()}</span>
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
                    <a href={basePath}>
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </a>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <a href={`${basePath}/santri-management`}>
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
                  <Wallet className="h-4 w-4" />
                  <span>Transaksi</span>
                  {isTransaksiOpen ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </SidebarMenuButton>
                {isTransaksiOpen && (
                  <SidebarMenuSub>
                    {transaksiItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <SidebarMenuSubItem key={item.href}>
                          <SidebarMenuSubButton
                            render={
                              <a href={`${basePath}/transaksi/${item.href}`}>
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                              </a>
                            }
                          />
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {role !== "pondok" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <a href={`${basePath}/laporan-keuangan`}>
                        <FileText className="h-4 w-4" />
                        <span>Laporan Keuangan</span>
                      </a>
                    }
                  />
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
