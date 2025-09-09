"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2 } from "lucide-react"
import { validateCNPJ } from "@/lib/validators"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cnpj: "",
    razaoSocial: "",
    nomeFantasia: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 14) {
      let formattedValue = value
      if (value.length > 2) formattedValue = value.replace(/^(\d{2})(\d)/, "$1.$2")
      if (value.length > 5) formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      if (value.length > 8) formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      if (value.length > 12)
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
      setFormData({ ...formData, cnpj: formattedValue })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate CNPJ
    if (!validateCNPJ(formData.cnpj.replace(/\D/g, ""))) {
      newErrors.cnpj = "CNPJ inválido"
    }

    // Validate other fields
    if (!formData.razaoSocial) newErrors.razaoSocial = "Razão Social é obrigatória"
    if (!formData.nomeFantasia) newErrors.nomeFantasia = "Nome Fantasia é obrigatório"

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    // Validate password
    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória"
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres"
    }

    // Validate password confirmation
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem"
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      newErrors.terms = "Você deve aceitar os termos"
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Cadastro de Empresa</CardTitle>
          <CardDescription>Preencha os dados da sua empresa matriz</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={handleCNPJChange}
                  required
                />
                {errors.cnpj && <p className="text-sm text-red-500">{errors.cnpj}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="razaoSocial">Razão Social</Label>
                <Input
                  id="razaoSocial"
                  name="razaoSocial"
                  placeholder="Razão Social da Empresa"
                  value={formData.razaoSocial}
                  onChange={handleChange}
                  required
                />
                {errors.razaoSocial && <p className="text-sm text-red-500">{errors.razaoSocial}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                <Input
                  id="nomeFantasia"
                  name="nomeFantasia"
                  placeholder="Nome Fantasia"
                  value={formData.nomeFantasia}
                  onChange={handleChange}
                  required
                />
                {errors.nomeFantasia && <p className="text-sm text-red-500">{errors.nomeFantasia}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Corporativo</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                {errors.senha && <p className="text-sm text-red-500">{errors.senha}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
                {errors.confirmarSenha && <p className="text-sm text-red-500">{errors.confirmarSenha}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                Concordo com os{" "}
                <Link href="#" className="text-primary hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="#" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Cadastrar Empresa
            </Button>
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/" className="text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
