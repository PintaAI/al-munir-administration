import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shirt, Clock, CheckCircle2, Package } from "lucide-react"

export default function LaundryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Status Laundry</h1>
        <p className="text-muted-foreground">Lihat status cucian dan riwayat laundry</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Diproses</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Item</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siap Diambil</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Item</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bulan Ini</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Item</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Laundry */}
      <Card>
        <CardHeader>
          <CardTitle>Cucian Sedang Diproses</CardTitle>
          <CardDescription>Item cucian yang sedang dalam proses pencucian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { item: "Kemeja Putih", type: "Cuci Kering", date: "17 Mar 2026", status: "Sedang Dicuci", progress: 60 },
              { item: "Celana Jeans", type: "Cuci Reguler", date: "16 Mar 2026", status: "Sedang Dikeringkan", progress: 80 },
              { item: "Jaket", type: "Cuci Kering", date: "15 Mar 2026", status: "Menunggu Setrika", progress: 90 },
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Shirt className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.item}</p>
                      <p className="text-sm text-muted-foreground">{item.type} • {item.date}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {item.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.progress}% Selesai</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ready to Pick Up */}
      <Card>
        <CardHeader>
          <CardTitle>Siap Diambil</CardTitle>
          <CardDescription>Item cucian yang sudah selesai dan siap diambil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { item: "Kaos Polos", type: "Cuci Reguler", date: "14 Mar 2026" },
              { item: "Celana Training", type: "Cuci Reguler", date: "13 Mar 2026" },
              { item: "Kemeja Batik", type: "Cuci Kering", date: "12 Mar 2026" },
              { item: "Sarung", type: "Cuci Reguler", date: "11 Mar 2026" },
              { item: "Peci", type: "Cuci Kering", date: "10 Mar 2026" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.item}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.date}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Siap Diambil
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
