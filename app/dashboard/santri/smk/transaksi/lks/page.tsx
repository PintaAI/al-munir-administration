import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award, Calendar, Users } from "lucide-react"

export default function LKSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">LKS & Kompetisi</h1>
        <p className="text-muted-foreground">Lihat informasi Lomba Kompetensi Siswa dan kompetisi lainnya</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kompetisi</CardTitle>
            <Trophy className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Diikuti</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Juara 1</CardTitle>
            <Medal className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Penghargaan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Juara 2</CardTitle>
            <Medal className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Penghargaan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Juara 3</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Penghargaan</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Competitions */}
      <Card>
        <CardHeader>
          <CardTitle>Kompetisi Mendatang</CardTitle>
          <CardDescription>Kompetisi yang akan diikuti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "LKS Network System Administration", level: "Provinsi", date: "25 Apr 2026", location: "Jakarta", status: "Persiapan" },
              { name: "Kompetisi Cyber Security", level: "Nasional", date: "15 Jun 2026", location: "Bandung", status: "Pendaftaran" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.level} • {item.location} • {item.date}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competition History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Kompetisi</CardTitle>
          <CardDescription>Kompetisi yang telah diikuti dan hasilnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "LKS Network System Administration", level: "Kabupaten", date: "15 Feb 2026", location: "Depok", rank: "Juara 1", team: "Individu" },
              { name: "LKS Cyber Security", level: "Kabupaten", date: "10 Feb 2026", location: "Depok", rank: "Juara 1", team: "Tim (3 orang)" },
              { name: "Kompetisi Jaringan Komputer", level: "Provinsi", date: "20 Jan 2026", location: "Jakarta", rank: "Juara 2", team: "Individu" },
              { name: "LKS IT Network System Administration", level: "Nasional", date: "15 Nov 2025", location: "Surabaya", rank: "Juara 3", team: "Individu" },
              { name: "Kompetisi Robotik", level: "Kabupaten", date: "10 Oct 2025", location: "Depok", rank: "Finalis", team: "Tim (2 orang)" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    item.rank === "Juara 1" ? "bg-yellow-100" :
                    item.rank === "Juara 2" ? "bg-gray-100" :
                    item.rank === "Juara 3" ? "bg-orange-100" :
                    "bg-blue-100"
                  }`}>
                    {item.rank === "Juara 1" && <Medal className="h-5 w-5 text-yellow-600" />}
                    {item.rank === "Juara 2" && <Medal className="h-5 w-5 text-gray-400" />}
                    {item.rank === "Juara 3" && <Award className="h-5 w-5 text-orange-600" />}
                    {item.rank === "Finalis" && <Trophy className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.level} • {item.location} • {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.rank === "Juara 1" ? "bg-yellow-100 text-yellow-800" :
                    item.rank === "Juara 2" ? "bg-gray-100 text-gray-800" :
                    item.rank === "Juara 3" ? "bg-orange-100 text-orange-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {item.rank}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{item.team}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
