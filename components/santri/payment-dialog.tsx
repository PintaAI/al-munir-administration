"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, CreditCard, AlertCircle } from "lucide-react"

interface PaymentDialogProps {
  tagihanId?: string
  transaksiId?: string
  jenis: string
  label: string
  amount: string
  onPaymentComplete?: () => void
  trigger: React.ReactNode
}

export function PaymentDialog({
  tagihanId,
  transaksiId,
  jenis,
  label,
  amount,
  onPaymentComplete,
  trigger,
}: PaymentDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    setLoading(true)
    setError(null)

    try {
      // Determine which API to call based on whether we have tagihanId or transaksiId
      if (tagihanId) {
        // For tagihan (SPP, Syahriah), we need to create a transaction
        const response = await fetch("/api/transaksi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tagihanId,
            status: "LUNAS",
            tanggalBayar: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Payment failed")
        }
      } else if (transaksiId) {
        // For existing transactions (Laundry, Ujian, PKL, LKS), update the status
        const response = await fetch(`/api/transaksi/${transaksiId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "LUNAS",
            tanggalBayar: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Payment failed")
        }
      }

      setOpen(false)
      onPaymentComplete?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during payment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              Konfirmasi Pembayaran
            </DialogTitle>
            <DialogDescription className="text-sm">
              Anda akan melakukan pembayaran untuk tagihan berikut:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/50 to-muted/30 p-4 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Jenis Tagihan</span>
                <span className="font-medium text-sm">{jenis}</span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Keterangan</span>
                <span className="font-medium text-sm text-right max-w-[60%]">{label}</span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Jumlah</span>
                <span className="font-bold text-xl text-primary">{amount}</span>
              </div>
            </div>
            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="w-full sm:w-auto rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Bayar Sekarang
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
