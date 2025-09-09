// "use client"

import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
import { Building2 } from "lucide-react"
import { AuthForm } from "./AuthForm"
// import { validateCNPJ } from "@/lib/validators"

export default function LoginPage() {
  // const router = useRouter()
  // const [cnpj, setCnpj] = useState("")
  // const [password, setPassword] = useState("")
  // const [rememberMe, setRememberMe] = useState(false)
  // const [error, setError] = useState("")

  // const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/\D/g, "")
  //   if (value.length <= 14) {
  //     let formattedValue = value
  //     if (value.length > 2) formattedValue = value.replace(/^(\d{2})(\d)/, "$1.$2")
  //     if (value.length > 5) formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  //     if (value.length > 8) formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
  //     if (value.length > 12)
  //       formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
  //     setCnpj(formattedValue)
  //   }
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError("")

  //   const cleanCNPJ = cnpj.replace(/\D/g, "")
  //   if (!validateCNPJ(cleanCNPJ)) {
  //     setError("CNPJ inválido")
  //     return
  //   }

  //   if (!password) {
  //     setError("Senha é obrigatória")
  //     return
  //   }

  //   // In a real app, you would make an API call here
  //   // For now, we'll just redirect to the dashboard
  //   router.push("/dashboard")
  // }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar</CardDescription>
        </CardHeader>
        <AuthForm />
        {/* <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <div className="relative">
                <Input id="cnpj" placeholder="00.000.000/0000-00" value={cnpj} onChange={handleCNPJChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Lembrar-me
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="text-center text-sm">
              A empresa não tem uma conta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Registre-se
              </Link>
            </div>
          </CardFooter>
        </form> */}
      </Card>
    </div>
  )
}
