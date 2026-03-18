import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, CheckCircle2, Clock, Download, FileText } from "lucide-react"

export default function BukuPendampingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buku Pendamping</h1>
        <p className="text-muted-foreground">Buku pendamping pembelajaran dan materi tambahan</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Buku tersedia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sudah Dibaca</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Buku</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Dibaca</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Buku</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Books */}
      <Card>
        <CardHeader>
          <CardTitle>Buku Pendamping Tersedia</CardTitle>
          <CardDescription>Daftar buku pendamping untuk pembelajaran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Matematika SMP Kelas 7", author: "Kemendikbud", pages: 200, progress: 100, status: "Selesai" },
              { title: "Bahasa Indonesia SMP Kelas 7", author: "Kemendikbud", pages: 180, progress: 100, status: "Selesai" },
              { title: "IPA SMP Kelas 7", author: "Kemendikbud", pages: 220, progress: 75, status: "Sedang Dibaca" },
              { title: "Bahasa Inggris SMP Kelas 7", author: "Kemendikbud", pages: 160, progress: 40, status: "Sedang Dibaca" },
              { title: "IPS SMP Kelas 7", author: "Kemendikbud", pages: 190, progress: 0, status: "Belum Dibaca" },
              { title: "PKN SMP Kelas 7", author: "Kemendikbud", pages: 150, progress: 0, status: "Belum Dibaca" },
              { title: "Agama Islam SMP Kelas 7", author: "Kemenag", pages: 170, progress: 0, status: "Belum Dibaca" },
              { title: "Seni Budaya SMP Kelas 7", author: "Kemendikbud", pages: 140, progress: 0, status: "Belum Dibaca" },
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      item.status === "Selesai" ? "bg-green-100" :
                      item.status === "Sedang Dibaca" ? "bg-yellow-100" :
                      "bg-gray-100"
                    }`}>
                      <BookOpen className={`h-5 w-5 ${
                        item.status === "Selesai" ? "text-green-600" :
                        item.status === "Sedang Dibaca" ? "text-yellow-600" :
                        "text-gray-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.author} • {item.pages} Halaman</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === "Selesai" ? "bg-green-100 text-green-800" :
                      item.status === "Sedang Dibaca" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {item.status === "Selesai" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {item.status === "Sedang Dibaca" && <Clock className="h-3 w-3 mr-1" />}
                      {item.status}
                    </span>
                    <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                      <Download className="h-4 w-4 text-blue-600" />
                    </button>
                  </div>
                </div>
                {item.progress > 0 && (
                  <>
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
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Materi Tambahan</CardTitle>
          <CardDescription>Modul dan materi tambahan untuk pembelajaran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Modul Latihan Soal Matematika", type: "PDF", size: "2.5 MB", date: "15 Mar 2026" },
              { title: "Ringkasan Materi IPA", type: "PDF", size: "1.8 MB", date: "14 Mar 2026" },
              { title: "Kumpulan Soal Bahasa Inggris", type: "PDF", size: "3.2 MB", date: "13 Mar 2026" },
              { title: "Panduan Belajar Efektif", type: "PDF", size: "1.5 MB", date: "12 Mar 2026" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.size} • {item.date}</p>
                  </div>
                </div>
                <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                  <Download className="h-4 w-4 text-blue-600" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
