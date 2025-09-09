"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Building2, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react"
import { validateCNPJ } from "@/lib/validators"

// Mock data for branches
const mockBranches = [
  { id: 1, name: "Filial ABC Ltda", cnpj: "12.345.678/0001-90", apiKey: "abc123" },
  { id: 2, name: "Filial XYZ S.A.", cnpj: "98.765.432/0001-10", apiKey: "xyz456" },
  { id: 3, name: "Filial DEF Ltda", cnpj: "11.222.333/0001-44", apiKey: "def789" },
  { id: 4, name: "Filial GHI S.A.", cnpj: "44.555.666/0001-77", apiKey: "ghi012" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [searchCnpj, setSearchCnpj] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [branches, setBranches] = useState(mockBranches)
  const [error, setError] = useState("")

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 14) {
      let formattedValue = value
      if (value.length > 2) formattedValue = value.replace(/^(\d{2})(\d)/, "$1.$2")
      if (value.length > 5) formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      if (value.length > 8) formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      if (value.length > 12)
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
      setSearchCnpj(formattedValue)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (searchCnpj && !validateCNPJ(searchCnpj.replace(/\D/g, ""))) {
      setError("CNPJ inválido")
      return
    }

    // In a real app, you would make an API call here
    // For now, we'll just filter the mock data
    if (searchCnpj) {
      const filtered = mockBranches.filter((branch) =>
        branch.cnpj.replace(/\D/g, "").includes(searchCnpj.replace(/\D/g, "")),
      )
      setBranches(filtered)
    } else {
      setBranches(mockBranches)
    }
  }

  const handleSelectBranch = (apiKey: string) => {
    // In a real app, you would store the API key in a secure way
    // For now, we'll just redirect to the branch page
    router.push(`/branch/${apiKey}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Nova Filial</h1>
        <Button onClick={() => router.push("/branch/new")}>
          <Plus className="mr-2 h-4 w-4" /> Criar Filial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consulta de Filial</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Digite o CNPJ da filial"
                  value={searchCnpj}
                  onChange={handleCNPJChange}
                  className="w-full"
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" /> Buscar Filial
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {branches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">{branch.name}</h3>
                    <p className="text-sm text-muted-foreground">CNPJ: {branch.cnpj}</p>
                  </div>
                </div>
                <Button onClick={() => handleSelectBranch(branch.apiKey)} className="mt-2 md:mt-0">
                  Selecionar
                </Button>
              </div>
            ))}

            <div className="flex items-center justify-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="px-4">
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * 10 >= branches.length}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
