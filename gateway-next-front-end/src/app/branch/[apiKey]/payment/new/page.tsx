// "use client"

import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/u  i/input"
import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import InvoiceForm from "./InvoiceForm"

export default function NewPaymentPage(params: { apiKey: string }) {
  // const router = useRouter()
  // const [formData, setFormData] = useState({
  //   amount: "",
  //   processingFee: "2.5%",
  //   cardNumber: "",
  //   expiryDate: "",
  //   cvv: "",
  //   cardholderName: "",
  // })
  // const [errors, setErrors] = useState<Record<string, string>>({})

  // const handleBack = () => {
  //   router.push(`/branch/${params.apiKey}`)
  // }

  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/[^\d]/g, "")
  //   const formattedValue = value
  //     ? (Number.parseInt(value) / 100).toLocaleString("pt-BR", {
  //         style: "currency",
  //         currency: "BRL",
  //       })
  //     : ""

  //   setFormData({ ...formData, amount: formattedValue })
  // }

  // const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/\D/g, "")
  //   if (value.length <= 16) {
  //     const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim()
  //     setFormData({ ...formData, cardNumber: formattedValue })
  //   }
  // }

  // const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/\D/g, "")
  //   if (value.length <= 4) {
  //     let formattedValue = value
  //     if (value.length > 2) {
  //       formattedValue = value.replace(/^(\d{2})(\d)/, "$1/$2")
  //     }
  //     setFormData({ ...formData, expiryDate: formattedValue })
  //   }
  // }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {}

  //   // Validate amount
  //   if (!formData.amount) {
  //     newErrors.amount = "Valor é obrigatório"
  //   }

  //   // Validate card number
  //   if (!formData.cardNumber || formData.cardNumber.replace(/\D/g, "").length !== 16) {
  //     newErrors.cardNumber = "Número do cartão inválido"
  //   }

  //   // Validate expiry date
  //   if (!formData.expiryDate || formData.expiryDate.length !== 5) {
  //     newErrors.expiryDate = "Data de validade inválida"
  //   } else {
  //     const [month, year] = formData.expiryDate.split("/")
  //     if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
  //       newErrors.expiryDate = "Mês inválido"
  //     }
  //   }

  //   // Validate CVV
  //   if (!formData.cvv || formData.cvv.length < 3 || formData.cvv.length > 4) {
  //     newErrors.cvv = "CVV inválido"
  //   }

  //   // Validate cardholder name
  //   if (!formData.cardholderName) {
  //     newErrors.cardholderName = "Nome no cartão é obrigatório"
  //   }

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()

  //   if (validateForm()) {
  //     // In a real app, you would make an API call here
  //     // For now, we'll just redirect to the branch page
  //     router.push(`/branch/${params.apiKey}`)
  //   }
  // }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" 
        // onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Nova Fatura</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Detalhes da Transação</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceForm params={params}/>
          {/* <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor da Transação</Label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="R$ 0,00"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  required
                />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="processingFee">Taxa de Processamento</Label>
                <Input id="processingFee" name="processingFee" value={formData.processingFee} disabled />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Dados do Cartão</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      required
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Data de Validade</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      required
                    />
                    {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                    {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Nome no Cartão</Label>
                  <Input
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="Nome como aparece no cartão"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    required
                  />
                  {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                Cancelar
              </Button>
              <Button type="submit">Processar Pagamento</Button>
            </div>
          </form> */}
        </CardContent>
      </Card>
    </div>
  )
}
