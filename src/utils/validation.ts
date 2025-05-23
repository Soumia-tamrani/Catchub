// Validation des emails et numéros de téléphone
import { z } from "zod"

// Validation d'email
export const emailSchema = z
  .string()
  .min(1, "L'email est requis")
  .email("Format d'email invalide")
  .refine((email) => {
    // Vérification supplémentaire pour les emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }, "Format d'email invalide")

// Validation de téléphone par pays
export const phoneValidationByCountry = {
  // Format marocain: +212 X XX XX XX XX ou 06 XX XX XX XX
  MA: (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, "")
    const moroccanMobileRegex = /^(?:\+212|212|0)[5-7][0-9]{8}$/
    return moroccanMobileRegex.test(cleanPhone)
  },
  // Format français: +33 X XX XX XX XX ou 0X XX XX XX XX
  FR: (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, "")
    const frenchMobileRegex = /^(?:\+33|33|0)[1-9][0-9]{8}$/
    return frenchMobileRegex.test(cleanPhone)
  },
  // Format international général
  INTL: (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, "")
    const intlPhoneRegex = /^\+?[0-9]{6,15}$/
    return intlPhoneRegex.test(cleanPhone)
  },
}

// Fonction pour formater un numéro de téléphone marocain
export const formatMoroccanPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\s+/g, "").replace(/[^\d]/g, "")

  // Si le numéro commence par 0
  if (cleanPhone.startsWith("0") && cleanPhone.length === 10) {
    return `+212${cleanPhone.substring(1)}`
  }

  // Si le numéro commence par 212
  if (cleanPhone.startsWith("212") && cleanPhone.length === 12) {
    return `+${cleanPhone}`
  }

  // Si le numéro commence déjà par +212
  if (cleanPhone.startsWith("212") && cleanPhone.length === 11) {
    return `+${cleanPhone}`
  }

  // Si c'est juste les 9 chiffres après l'indicatif
  if (
    cleanPhone.length === 9 &&
    (cleanPhone.startsWith("6") || cleanPhone.startsWith("7") || cleanPhone.startsWith("5"))
  ) {
    return `+212${cleanPhone}`
  }

  return phone
}

// Schéma de validation du téléphone avec détection automatique du pays
export const phoneSchema = z
  .string()
  .min(1, "Le numéro de téléphone est requis")
  .refine((phone) => {
    // Essayer de détecter le pays et valider en conséquence
    const cleanPhone = phone.replace(/\s+/g, "")

    // Détection Maroc
    if (
      cleanPhone.startsWith("+212") ||
      cleanPhone.startsWith("212") ||
      (cleanPhone.startsWith("0") &&
        (cleanPhone.charAt(1) === "6" || cleanPhone.charAt(1) === "7" || cleanPhone.charAt(1) === "5"))
    ) {
      return phoneValidationByCountry.MA(phone)
    }

    // Détection France
    if (
      cleanPhone.startsWith("+33") ||
      cleanPhone.startsWith("33") ||
      (cleanPhone.startsWith("0") && cleanPhone.length === 10)
    ) {
      return phoneValidationByCountry.FR(phone)
    }

    // Validation internationale par défaut
    return phoneValidationByCountry.INTL(phone)
  }, "Numéro de téléphone invalide. Veuillez vérifier le format.")
