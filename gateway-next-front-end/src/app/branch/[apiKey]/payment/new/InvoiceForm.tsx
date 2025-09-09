"use client";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { CreditCard } from "lucide-react";
import { createInvoiceAction } from "./create-invoice-action";
// import { useState } from "react";

export default function InvoiceForm({ params }: { params: { apiKey: string } }) {
  // const [errors,
  // setErrors
  // ] = useState<Record<string, string>>({})
  return (
    <form action={(formData) => createInvoiceAction(params, formData)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Valor da Transação</Label>
          <Input id="amount" name="amount" type="number" step="0.01" min={0} placeholder="R$ 0,00" required />
          {/* {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="processingFee">Taxa de Processamento</Label>
          <Input
            id="processingFee"
            name="processingFee"
            type="number"
            step="0.01"
            min={0}
            placeholder="0,00 %"
            defaultValue={"10"}
            // value={formData.processingFee}
            disabled
          />
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
                placeholder="0000000000000000"
                defaultValue={"1234567890123456"}
                maxLength={16}
                required
              />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            {/* {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>} */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Data de Validade</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/AA"
                defaultValue={"01/2025"}
                required
              />
              {/* {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                defaultValue={"123"}
                maxLength={4}
                required
              />
              {/* {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>} */}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Nome no Cartão</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="Nome como aparece no cartão"
              defaultValue={"John Doe"}
              required
            />
            {/* {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>} */}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">Processar Pagamento</Button>
      </div>
    </form>
  );
}
