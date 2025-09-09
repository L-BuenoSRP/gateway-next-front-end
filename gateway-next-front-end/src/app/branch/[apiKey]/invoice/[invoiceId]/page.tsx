"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Clock } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/validators"

// Mock data for invoice details
const mockInvoiceDetails = {
  id: "2025001",
  amount: 1250.0,
  dueDate: "2025-03-15",
  status: "processing",
  transactionId: "TRX-2025001-ABC123",
  transactionDate: "2025-03-10T14:30:25",
  paymentMethod: "Cartão de Crédito",
  gateway: "Full Cycle Pay",
  steps: [
    {
      id: 1,
      title: "Pagamento Iniciado",
      timestamp: "2025-03-10T14:30:25",
      description: "Transação iniciada pelo usuário",
      completed: true,
    },
    {
      id: 2,
      title: "Autorização",
      timestamp: "2025-03-10T14:30:28",
      description: "Pagamento autorizado pela operadora",
      completed: true,
    },
    {
      id: 3,
      title: "Processamento",
      timestamp: "2025-03-10T14:30:30",
      description: "Transação em processamento",
      completed: false,
    },
  ],
}

export default function InvoiceDetailsPage({
  params,
}: {
  params: { apiKey: string; invoiceId: string }
}) {
  const router = useRouter()

  const handleBack = () => {
    router.push(`/branch/${params.apiKey}`)
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Detalhes da Fatura #{params.invoiceId}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status do Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Status do Pagamento</p>
            <p className="font-medium text-lg">
              {mockInvoiceDetails.status === "paid"
                ? "Pago"
                : mockInvoiceDetails.status === "processing"
                  ? "Processando"
                  : "Pendente"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor</p>
            <p className="font-medium text-lg">{formatCurrency(mockInvoiceDetails.amount)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Data de Vencimento</p>
            <p className="font-medium text-lg">{formatDate(mockInvoiceDetails.dueDate)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Transação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">ID da Transação</p>
            <p className="font-medium">{mockInvoiceDetails.transactionId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Método de Pagamento</p>
            <p className="font-medium">{mockInvoiceDetails.paymentMethod}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Data da Transação</p>
            <p className="font-medium">{formatDateTime(mockInvoiceDetails.transactionDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Gateway</p>
            <p className="font-medium">{mockInvoiceDetails.gateway}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processo de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockInvoiceDetails.steps.map((step
            // , index
          ) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="mt-0.5">
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Clock className="h-6 w-6 text-amber-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{formatDateTime(step.timestamp)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
