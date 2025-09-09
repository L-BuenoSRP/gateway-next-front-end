"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, Plus } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/validators"

// Mock data for invoices
const mockInvoices = [
  { id: "2025001", amount: 1250.0, dueDate: "2025-03-15", status: "pending" },
  { id: "2025002", amount: 2780.0, dueDate: "2025-02-28", status: "paid" },
  { id: "2025003", amount: 3450.0, dueDate: "2025-02-15", status: "paid" },
]

// Mock data for branch
const mockBranch = {
  name: "Filial São Paulo",
  cnpj: "12.345.678/0001-00",
}

export default function BranchPage({ params }: { params: { apiKey: string } }) {
  const router = useRouter()
  const [invoices, setInvoices] = useState(mockInvoices)

  const handleViewInvoice = (invoiceId: string) => {
    router.push(`/branch/${params.apiKey}/invoice/${invoiceId}`)
  }

  const handleNewPayment = () => {
    router.push(`/branch/${params.apiKey}/payment/new`)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{mockBranch.name}</h1>
          <p className="text-muted-foreground">CNPJ: {mockBranch.cnpj}</p>
        </div>
        <Button onClick={handleNewPayment}>
          <Plus className="mr-2 h-4 w-4" /> Novo Pagamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faturas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleViewInvoice(invoice.id)}
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Fatura #{invoice.id}</h3>
                  <p className="text-sm text-muted-foreground">Vencimento: {formatDate(invoice.dueDate)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 md:mt-0">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                  <span className={`text-sm ${invoice.status === "paid" ? "text-green-500" : "text-amber-500"}`}>
                    {invoice.status === "paid" ? "Pago" : "Pendente"}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
