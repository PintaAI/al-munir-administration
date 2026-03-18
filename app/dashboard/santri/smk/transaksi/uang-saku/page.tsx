import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowDown, ArrowUp, TrendingUp } from "lucide-react"

export default function UangSakuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kelola Uang Saku</h1>
        <p className="text-muted-foreground">Lihat saldo dan riwayat transaksi uang saku</p>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Saat Ini</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 500.000</div>
            <p className="text-xs text-muted-foreground">Tersedia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <ArrowDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.500.000</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.000.000</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>Daftar transaksi uang saku Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "in", description: "Top-up Uang Saku", amount: "Rp 500.000", date: "17 Mar 2026", balance: "Rp 500.000" },
              { type: "out", description: "Pembelian Jajan", amount: "Rp 20.000", date: "16 Mar 2026", balance: "Rp 0" },
              { type: "out", description: "Pembelian ATK", amount: "Rp 50.000", date: "15 Mar 2026", balance: "Rp 20.000" },
              { type: "in", description: "Top-up Uang Saku", amount: "Rp 500.000", date: "10 Mar 2026", balance: "Rp 70.000" },
              { type: "out", description: "Pembelian Makan", amount: "Rp 30.000", date: "09 Mar 2026", balance: "Rp 570.000" },
              { type: "out", description: "Pembelian Minuman", amount: "Rp 10.000", date: "08 Mar 2026", balance: "Rp 600.000" },
              { type: "in", description: "Top-up Uang Saku", amount: "Rp 500.000", date: "05 Mar 2026", balance: "Rp 610.000" },
              { type: "out", description: "Pembelian Buku", amount: "Rp 75.000", date: "04 Mar 2026", balance: "Rp 110.000" },
              { type: "in", description: "Top-up Uang Saku", amount: "Rp 500.000", date: "01 Mar 2026", balance: "Rp 185.000" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${item.type === "in" ? "bg-green-100" : "bg-red-100"}`}>
                    {item.type === "in" ? (
                      <ArrowDown className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUp className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${item.type === "in" ? "text-green-600" : "text-red-600"}`}>
                    {item.type === "in" ? "+" : "-"}{item.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">Saldo: {item.balance}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
