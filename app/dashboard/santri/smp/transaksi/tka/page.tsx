import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked, CheckCircle2, Clock, Target, BookOpen } from "lucide-react"

export default function TKAPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Program Tahfidz & Kitab</h1>
        <p className="text-muted-foreground">Lihat progres hafalan dan pembelajaran kitab</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Juz Selesai</CardTitle>
            <BookMarked className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Dari 30 Juz</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Bulan Ini</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Juz</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Setoran Hari Ini</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Halaman</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kitab Dipelajari</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Kitab</p>
          </CardContent>
        </Card>
      </div>

      {/* Tahfidz Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progres Tahfidz</CardTitle>
          <CardDescription>Progress hafalan Al-Quran Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { juz: "Juz 1", surah: "Al-Fatihah - Al-Baqarah", progress: 100, status: "Selesai" },
              { juz: "Juz 2", surah: "Al-Baqarah", progress: 100, status: "Selesai" },
              { juz: "Juz 3", surah: "Ali 'Imran", progress: 100, status: "Selesai" },
              { juz: "Juz 4", surah: "An-Nisa'", progress: 100, status: "Selesai" },
              { juz: "Juz 5", surah: "An-Nisa' - Al-Ma'idah", progress: 100, status: "Selesai" },
              { juz: "Juz 6", surah: "Al-Ma'idah", progress: 45, status: "Sedang Menghafal" },
              { juz: "Juz 7", surah: "Al-An'am", progress: 0, status: "Belum Dimulai" },
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      item.progress === 100 ? "bg-green-100" :
                      item.progress > 0 ? "bg-yellow-100" :
                      "bg-gray-100"
                    }`}>
                      <BookMarked className={`h-5 w-5 ${
                        item.progress === 100 ? "text-green-600" :
                        item.progress > 0 ? "text-yellow-600" :
                        "text-gray-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{item.juz}</p>
                      <p className="text-sm text-muted-foreground">{item.surah}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "Selesai" ? "bg-green-100 text-green-800" :
                    item.status === "Sedang Menghafal" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {item.status === "Selesai" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {item.status === "Sedang Menghafal" && <Clock className="h-3 w-3 mr-1" />}
                    {item.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      item.progress === 100 ? "bg-green-600" :
                      item.progress > 0 ? "bg-yellow-600" :
                      "bg-gray-400"
                    }`} 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.progress}% Selesai</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kitab Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Pembelajaran Kitab</CardTitle>
          <CardDescription>Kitab yang sedang Anda pelajari</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Kitab Al-Jurumiyah", halaman: "Halaman 1-30", progress: 60, ustadz: "Ustadz Ahmad" },
              { name: "Kitab Fathul Qarib", halaman: "Halaman 1-50", progress: 30, ustadz: "Ustadz Muhammad" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.halaman} • {item.ustadz}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-800">
                    {item.progress}%
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">Selesai</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
