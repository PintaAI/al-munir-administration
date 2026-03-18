import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export default function UjianPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jadwal & Hasil Ujian</h1>
        <p className="text-muted-foreground">Lihat jadwal ujian dan hasil nilai Anda</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ujian Minggu Ini</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Ujian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.5</div>
            <p className="text-xs text-muted-foreground">Semester ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Tertinggi</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">Matematika</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perlu Perhatian</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Mata pelajaran</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal Ujian Mendatang</CardTitle>
          <CardDescription>Ujian yang akan datang dalam waktu dekat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { subject: "Bahasa Indonesia", date: "20 Mar 2026", time: "08:00 - 10:00", room: "R.101", type: "Ujian Tengah Semester" },
              { subject: "Matematika", date: "22 Mar 2026", time: "08:00 - 10:00", room: "R.102", type: "Ujian Tengah Semester" },
              { subject: "Bahasa Inggris", date: "25 Mar 2026", time: "08:00 - 10:00", room: "R.103", type: "Ujian Tengah Semester" },
              { subject: "IPA", date: "28 Mar 2026", time: "08:00 - 11:00", room: "Lab IPA", type: "Praktik" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.time}</p>
                  <p className="text-xs text-muted-foreground">{item.room}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam Results */}
      <Card>
        <CardHeader>
          <CardTitle>Hasil Ujian</CardTitle>
          <CardDescription>Riwayat nilai ujian Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { subject: "Matematika", score: 95, date: "15 Feb 2026", type: "Ujian Harian" },
              { subject: "Bahasa Indonesia", score: 88, date: "14 Feb 2026", type: "Ujian Harian" },
              { subject: "Bahasa Inggris", score: 82, date: "13 Feb 2026", type: "Ujian Harian" },
              { subject: "IPA", score: 90, date: "12 Feb 2026", type: "Praktik" },
              { subject: "PKN", score: 85, date: "11 Feb 2026", type: "Ujian Harian" },
              { subject: "Agama", score: 92, date: "10 Feb 2026", type: "Ujian Harian" },
              { subject: "IPS", score: 78, date: "09 Feb 2026", type: "Ujian Harian" },
              { subject: "Seni Budaya", score: 80, date: "08 Feb 2026", type: "Ujian Harian" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                    item.score >= 90 ? "bg-green-100 text-green-800" :
                    item.score >= 80 ? "bg-blue-100 text-blue-800" :
                    item.score >= 70 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
