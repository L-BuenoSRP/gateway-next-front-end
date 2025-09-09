"use server";
// import { cookies } from "next/headers";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createInvoiceAction(params: { apiKey: string }, formData: FormData) {
  const { apiKey } = params;
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL environment variable is not set");
  }

  // const cookieStore = await cookies();
  // const apiKey = cookieStore.get("apiKey")?.value;
  
  if (!apiKey) {
    throw new Error("API key not found. Please login again.");
  }

  try {
    const amount = formData.get("amount")?.toString().replace(",", ".");
    const processingFee = formData
      .get("processingFee")
      ?.toString()
      .replace(",", ".");
    const cardNumber = formData.get("cardNumber")?.toString();
    const expiryDate = formData.get("expiryDate")?.toString();
    const [expireMonth, expireYear] = expiryDate?.toString().split("/") || [];
    const cvv = formData.get("cvv")?.toString();
    const cardholderName = formData.get("cardholderName")?.toString();

    const response = await fetch(`${apiUrl}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        amount: parseFloat(amount as string),
        processingFee: parseFloat(processingFee as string),
        cardNumber: cardNumber as string,
        expireMonth: parseInt(expireMonth),
        expireYear: parseInt(expireYear),
        cvv: cvv as string,
        cardholderName: cardholderName as string,
        paymentType: "credit_card",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Falha ao processar pagamento");
    }

    // redirect(`/branch/${apiKey}`);
    redirect(`/Account/${apiKey}/Invoice`);
  } catch (error) {
    console.error("Payment error:", error);
    throw new Error("Erro ao conectar com o servidor. Por favor, tente novamente.");
  }
}
