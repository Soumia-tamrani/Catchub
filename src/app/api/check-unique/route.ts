import { NextResponse, type NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { field, value } = await request.json()

    if (!field || !value) {
      return NextResponse.json({ error: "Le champ et la valeur sont requis" }, { status: 400 })
    }

    let isUnique = true
    let message = ""

    if (field === "email") {
      const existingUser = await prisma.user.findUnique({
        where: { Email: value },
      })

      if (existingUser) {
        isUnique = false
        message = "Cet email est déjà utilisé. Veuillez utiliser un autre email."
      }
    } else if (field === "phone") {
      const existingUser = await prisma.user.findFirst({
        where: { Téléphone_mobile: value },
      })

      if (existingUser) {
        isUnique = false
        message = "Ce numéro de téléphone est déjà utilisé. Veuillez utiliser un autre numéro."
      }
    }

    return NextResponse.json({ isUnique, message })
  } catch (error) {
    console.error("Erreur lors de la vérification d'unicité:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la vérification" }, { status: 500 })
  }
}