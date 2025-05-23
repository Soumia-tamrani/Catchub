import { NextResponse } from "next/server"; 
import { cookies } from "next/headers"; 
import { PrismaClient } from "@prisma/client"; 
import jwt from "jsonwebtoken"; 

const prisma = new PrismaClient(); 
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; 

function getUserFromToken(token) { 
  try { 
    return jwt.verify(token, JWT_SECRET); 
  } catch (err) { 
    return null; 
  } 
}

export async function POST() {
  // Utilisation de cookies() de manière asynchrone
  const cookieStore = await cookies(); // Attends que cookies() soit résolu
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Utilisateur non autorisé (pas de token)" },
      { status: 401 }
    );
  }

  const decoded = getUserFromToken(token);
  if (!decoded || !decoded.email) {
    return NextResponse.json(
      { error: "Token invalide ou expiré" },
      { status: 401 }
    );
  }

  const { email } = decoded;

  // Vérifie si l'utilisateur existe dans Professionnel ou PME
  const professionnel = await prisma.professionnel.findUnique({ where: { email } });
  const pme = await prisma.pme.findUnique({ where: { email } });

  if (!professionnel && !pme) {
    return NextResponse.json(
      { error: "Utilisateur non trouvé." },
      { status: 404 }
    );
  }

  // Génére le lien de parrainage
  const inviteLink = `http://localhost:3000/?ref=${encodeURIComponent(email)}`;

  return NextResponse.json({ link: inviteLink });
}