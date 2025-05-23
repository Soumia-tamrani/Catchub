import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // ⚠️ à sécuriser en production

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "Token manquant." }, { status: 400 });
    }

    // Étape 1 — Vérifier le token en base
    const emailVerification = await prisma.emailVerification.findUnique({ where: { token } });

    if (!emailVerification) {
      return NextResponse.json({ success: false, message: "Token invalide." }, { status: 400 });
    }

    if (new Date() > emailVerification.expiresAt) {
      return NextResponse.json({ success: false, message: "Token expiré." }, { status: 400 });
    }

    const email = emailVerification.email;

    // Étape 2 — Chercher l'utilisateur (professionnel ou PME)
    const professionnel = await prisma.professionnel.findUnique({ where: { email } });
    const pme = await prisma.pme.findUnique({ where: { email } });

    if (professionnel) {
      await prisma.professionnel.update({
        where: { email },
        data: { emailVerifie: true },
      });
    } else if (pme) {
      await prisma.pme.update({
        where: { email },
        data: { emailVerifie: true },
      });
    } else {
      return NextResponse.json({ success: false, message: "Utilisateur introuvable." }, { status: 404 });
    }

    // Étape 3 — Supprimer le token de vérification
    await prisma.emailVerification.delete({ where: { token } });

    // Étape 4 — Générer le JWT avec email + role + userId
    const jwtToken = jwt.sign(
      {
        email,
        role: professionnel ? "PROFESSIONNEL" : "PME",
        userId: professionnel?.id || pme?.id,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Étape 5 — Créer la réponse avec le cookie sécurisé
    const response = NextResponse.json({ success: true, message: "Email vérifié avec succès." });

    response.cookies.set("auth_token", jwtToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (error) {
    console.error("Erreur lors de la vérification :", error);
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}