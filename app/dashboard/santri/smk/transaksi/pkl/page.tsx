import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, Clock, CheckCircle2, Building2 } from "lucide-react"

export default function PKLPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Informasi PKL</h1>
        <p className="text-muted-foreground">Lihat informasi dan jadwal Praktik Kerja Lapangan (PKL)</p>
      </div>

      {/* PKL Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status PKL</CardTitle>
          <CardDescription>Informasi status PKL Anda saat ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tempat PKL</p>
                  <p className="font-semibold text-lg">PT. Teknologi Nusantara</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <p className="font-semibold text-lg">Jakarta Selatan</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Divisi</p>
                  <p className="font-semibold text-lg">Network & Infrastructure</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durasi PKL</p>
                  <p className="font-semibold text-lg">6 Bulan</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-lg">Sedang Berjalan</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sisa Waktu</p>
                  <p className="font-semibold text-lg">3 Bulan</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal PKL</CardTitle>
          <CardDescription>Jadwal kehadiran dan aktivitas PKL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Senin - Jumat</p>
                  <p className="text-sm text-muted-foreground">Hari Kerja</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">08:00 - 16:00</p>
                  <p className="text-sm text-muted-foreground">WIB</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sabtu - Minggu</p>
                  <p className="text-sm text-muted-foreground">Libur</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-muted-foreground">-</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas PKL</CardTitle>
          <CardDescription>Daftar aktivitas yang telah dilakukan selama PKL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { activity: "Instalasi Jaringan LAN", date: "17 Mar 2026", status: "Selesai", category: "Network" },
              { activity: "Konfigurasi Router", date: "16 Mar 2026", status: "Selesai", category: "Network" },
              { activity: "Troubleshooting Koneksi Internet", date: "15 Mar 2026", status: "Selesai", category: "Support" },
              { activity: "Maintenance Server", date: "14 Mar 2026", status: "Selesai", category: "Infrastructure" },
              { activity: "Dokumentasi Jaringan", date: "13 Mar 2026", status: "Selesai", category: "Documentation" },
              { activity: "Instalasi Access Point", date: "12 Mar 2026", status: "Selesai", category: "Network" },
              { activity: "Konfigurasi Firewall", date: "11 Mar 2026", status: "Selesai", category: "Security" },
              { activity: "Monitoring Jaringan", date: "10 Mar 2026", status: "Selesai", category: "Monitoring" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.activity}</p>
                    <p className="text-sm text-muted-foreground">{item.category} • {item.date}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
