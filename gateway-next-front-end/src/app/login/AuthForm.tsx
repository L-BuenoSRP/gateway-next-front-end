import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/card";
import { Link } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
// import { useState } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    'use server'

    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
        throw new Error('API_URL environment variable is not set')
    }

    const cnpj = formData.get('cnpj')
    const password = formData.get('password')

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cnpj, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Falha ao fazer login')
        }

        const data = await response.json()
        const apiKey = data.apiKey

        const cookieStore = await cookies()
        cookieStore.set('cnpj', cnpj as string)
        cookieStore.set('apiKey', apiKey as string)

        redirect('/dashboard')
    } catch (error) {
      
        console.error('Login error:', error)
        const errorMessage = 'Erro ao conectar com o servidor'
        throw new Error(errorMessage)

        //use a native alert message in server side screen error to throw the error
        // alert(errorMessage)

        // Return error object that can be handled on client side
        // return {
        //     error: true,
        //     message: errorMessage
        // }


    }
}
export function AuthForm() {
    // const [error] = useState("");

    return (
        <form action={loginAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <div className="relative">
                <Input id="cnpj" placeholder="00.000.000/0000-00" 
                required />
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
                  required
                />
              </div>
            </div>
            {/* {error && <div className="text-sm text-red-500">{error}</div>} */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
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
        </form>
    )
}