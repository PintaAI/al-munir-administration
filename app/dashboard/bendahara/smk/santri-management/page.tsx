"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

export default function SantriManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Santri Management</h1>
          <p className="text-slate-600">Kelola data santri SMK</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Santri
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Santri</CardTitle>
          <CardDescription>Kelola data santri SMK</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari santri..." className="pl-10" />
            </div>
          </div>
          <div className="text-center py-8 text-slate-500">
            Belum ada data santri
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
