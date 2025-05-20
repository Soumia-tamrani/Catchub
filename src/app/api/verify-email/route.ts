import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token depuis les paramètres de requête
    const token = request.nextUrl.searchParams.get("token")

    if (!token) {
      return NextResponse.redirect(new URL("/register?error=missing_token", request.url))
    }

    // Déchiffrer le token pour obtenir les informations
    const decryptedToken = await decrypt(token)
    const payload = JSON.parse(decryptedToken)

    // Vérifier si le token a expiré
    if (payload.exp < Date.now()) {
      return NextResponse.redirect(new URL("/register?error=expired_token", request.url))
    }

    const { email } = payload

    // Vérifier si le token correspond à celui stocké dans les cookies
    const storedToken = cookies().get(`email_verification_${email}`)?.value

    if (!storedToken || storedToken !== token) {
      return NextResponse.redirect(new URL("/register?error=invalid_token", request.url))
    }

    // Mettre à jour le statut de vérification de l'email dans la base de données
    await prisma.user.updateMany({
      where: { Email: email },
      data: { emailVerified: true },
    })

    // Supprimer le cookie de vérification
    cookies().delete(`email_verification_${email}`)

    // Rediriger vers la page de succès avec l'email vérifié
    return NextResponse.redirect(new URL(`/register?verified=${email}`, request.url))
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error)
    return NextResponse.redirect(new URL("/register?error=verification_failed", request.url))
  }
}
