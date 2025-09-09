"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

export default function NewBranchPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cnpjPrefix: "12.345.678",
    cnpjSuffix: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCNPJSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      let formattedValue = value
      if (value.length > 2) formattedValue = value.replace(/^(\d{2})(\d)/, "$1-$2")
      setFormData({ ...formData, cnpjSuffix: formattedValue })
    }
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 8) {
      let formattedValue = value
      if (value.length > 5) formattedValue = value.replace(/^(\d{5})(\d)/, "$1-$2")
      setFormData({ ...formData, cep: formattedValue })
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 11) {
      let formattedValue = value
      if (value.length > 0) formattedValue = value.replace(/^(\d{2})(\d)/, "($1) $2")
      if (value.length > 6) formattedValue = formattedValue.replace(/^($$\d{2}$$ \d{4})(\d)/, "$1-$2")
      setFormData({ ...formData, telefone: formattedValue })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate CNPJ suffix
    if (!formData.cnpjSuffix || formData.cnpjSuffix.replace(/\D/g, "").length !== 4) {
      newErrors.cnpjSuffix = "Sufixo do CNPJ inválido"
    }

    // Validate address
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório"
    if (!formData.bairro) newErrors.bairro = "Bairro é obrigatório"
    if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória"
    if (!formData.estado) newErrors.estado = "Estado é obrigatório"

    // Validate CEP
    if (!formData.cep || formData.cep.replace(/\D/g, "").length !== 8) {
      newErrors.cep = "CEP inválido"
    }

    // Validate phone
    if (!formData.telefone || formData.telefone.replace(/\D/g, "").length < 10) {
      newErrors.telefone = "Telefone inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would make an API call here
      // For now, we'll just redirect to the dashboard
      router.push("/dashboard")
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Cadastrar Nova Filial</CardTitle>
          </div>
          <CardDescription>Preencha os dados da filial</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ da Filial</Label>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">
                  {formData.cnpjPrefix}/
                </span>
                <Input
                  id="cnpjSuffix"
                  name="cnpjSuffix"
                  placeholder="0000-00"
                  value={formData.cnpjSuffix}
                  onChange={handleCNPJSuffixChange}
                  className="rounded-l-none"
                  required
                />
              </div>
              {errors.cnpjSuffix && <p className="text-sm text-red-500">{errors.cnpjSuffix}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                placeholder="Rua, Número"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
              {errors.endereco && <p className="text-sm text-red-500">{errors.endereco}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  name="complemento"
                  placeholder="Apto, Sala, etc"
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  name="bairro"
                  placeholder="Bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  required
                />
                {errors.bairro && <p className="text-sm text-red-500">{errors.bairro}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  placeholder="Cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                />
                {errors.cidade && <p className="text-sm text-red-500">{errors.cidade}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  name="estado"
                  placeholder="UF"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />
                {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleCEPChange}
                required
              />
              {errors.cep && <p className="text-sm text-red-500">{errors.cep}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                placeholder="(00) 0000-0000"
                value={formData.telefone}
                onChange={handlePhoneChange}
                required
              />
              {errors.telefone && <p className="text-sm text-red-500">{errors.telefone}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Filial</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
