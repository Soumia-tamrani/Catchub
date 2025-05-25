"use server"

import nodemailer from "nodemailer"

// Configuration du transporteur d'email
// Pour le développement, nous utilisons un service de test
 const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email", // Service de test pour le développement
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "test@example.com",
    pass: process.env.EMAIL_PASSWORD || "password123",
  },
})

// Pour la production, utilisez un service comme SendGrid:
// const transporter = nodemailer.createTransport({
//   service: "SendGrid",
//   auth: {
//     user: process.env.SENDGRID_USER,
//     pass: process.env.SENDGRID_API_KEY,
//   },
// });

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    console.log(`Tentative d'envoi d'email à: ${to}`)

    // Envoi de l'email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Votre Entreprise" <noreply@votreentreprise.com>',
      to,
      subject,
      html,
    })

    console.log(`Email envoyé: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    // En développement, simulons un succès pour pouvoir tester
    if (process.env.NODE_ENV === "development") {
      console.log("Mode développement: simulation d'envoi d'email réussi")
      return { success: true, simulated: true }
    }
    throw new Error(`Échec de l'envoi de l'email: ${error instanceof Error ? error.message : String(error)}`)
  }
}
