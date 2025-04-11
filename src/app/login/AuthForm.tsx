// "use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/card";
import { Link } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    'use server'

    // const apiKey = formData.get('apiKey')

    // const cookesStore = await cookies()
    // cookesStore.set('apiKey', apiKey as string)
    const apiUrl = process.env.API_URL;

    const cnpj = formData.get('cnpj')
    // const password = formData.get('password')

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnpj }),
    });

    if (!response.ok) {
        return { error: 'Falha ao fazer login' }
    }
    
    const cookieStore = await cookies()
    cookieStore.set('cnpj', cnpj as string)

    redirect('/dashboard')
}
export function AuthForm() {
    const [error] = useState("");

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
            {error && <div className="text-sm text-red-500">{error}</div>}
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