import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt, CheckCircle2, Clock, XCircle } from "lucide-react"

export default function SPPPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Riwayat Pembayaran SPP</h1>
        <p className="text-muted-foreground">Lihat status dan riwayat pembayaran SPP Anda</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lunas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Bulan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu Pembayaran</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Bulan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belum Lunas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Bulan</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pembayaran</CardTitle>
          <CardDescription>Daftar pembayaran SPP Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: "Januari 2026", amount: "Rp 500.000", status: "Lunas", date: "15 Jan 2026" },
              { month: "Februari 2026", amount: "Rp 500.000", status: "Lunas", date: "15 Feb 2026" },
              { month: "Maret 2026", amount: "Rp 500.000", status: "Lunas", date: "15 Mar 2026" },
              { month: "April 2026", amount: "Rp 500.000", status: "Menunggu", date: "-" },
              { month: "Mei 2026", amount: "Rp 500.000", status: "Belum Lunas", date: "-" },
              { month: "Juni 2026", amount: "Rp 500.000", status: "Belum Lunas", date: "-" },
              { month: "Juli 2026", amount: "Rp 500.000", status: "Belum Lunas", date: "-" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Receipt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.month}</p>
                    <p className="text-sm text-muted-foreground">{item.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "Lunas" ? "bg-green-100 text-green-800" :
                    item.status === "Menunggu" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {item.status === "Lunas" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {item.status === "Menunggu" && <Clock className="h-3 w-3 mr-1" />}
                    {item.status === "Belum Lunas" && <XCircle className="h-3 w-3 mr-1" />}
                    {item.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
