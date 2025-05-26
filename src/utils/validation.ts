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


// import { type CountryCode, parsePhoneNumberFromString } from "libphonenumber-js"
// }

// // Formats de téléphone par pays avec exemples
// export const PHONE_FORMATS = {
//   MA: {
//     name: "Maroc",
//     formats: ["+212XXXXXXXXX", "0XXXXXXXXX"],
//     examples: ["+212612345678", "0612345678"],
//     regex: /^(\+212|0)[5-7]\d{8}$/,
//   },
//   FR: {
//     name: "France",
//     formats: ["+33XXXXXXXXX", "0XXXXXXXXX"],
//     examples: ["+33612345678", "0612345678"],
//     regex: /^(\+33|0)[1-9]\d{8}$/,
//   },
//   CA: {
//     name: "Canada",
//     formats: ["+1XXXXXXXXXX", "XXXXXXXXXX"],
//     examples: ["+15141234567", "5141234567"],
//     regex: /^(\+1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
//   },
//   US: {
//     name: "États-Unis",
//     formats: ["+1XXXXXXXXXX", "XXXXXXXXXX"],
//     examples: ["+12125551234", "2125551234"],
//     regex: /^(\+1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
//   },
//   GB: {
//     name: "Royaume-Uni",
//     formats: ["+44XXXXXXXXXX", "0XXXXXXXXXX"],
//     examples: ["+447700123456", "07700123456"],
//     regex: /^(\+44|0)[1-9]\d{8,9}$/,
//   },
//   DE: {
//     name: "Allemagne",
//     formats: ["+49XXXXXXXXXXX", "0XXXXXXXXXXX"],
//     examples: ["+4915112345678", "015112345678"],
//     regex: /^(\+49|0)[1-9]\d{9,11}$/,
//   },
//   ES: {
//     name: "Espagne",
//     formats: ["+34XXXXXXXXX", "XXXXXXXXX"],
//     examples: ["+34612345678", "612345678"],
//     regex: /^(\+34)?[6-9]\d{8}$/,
//   },
//   IT: {
//     name: "Italie",
//     formats: ["+39XXXXXXXXXX", "XXXXXXXXXX"],
//     examples: ["+393123456789", "3123456789"],
//     regex: /^(\+39)?3\d{8,9}$/,
//   },
//   BE: {
//     name: "Belgique",
//     formats: ["+32XXXXXXXXX", "0XXXXXXXXX"],
//     examples: ["+32471234567", "0471234567"],
//     regex: /^(\+32|0)[4-9]\d{7,8}$/,
//   },
//   CH: {
//     name: "Suisse",
//     formats: ["+41XXXXXXXXX", "0XXXXXXXXX"],
//     examples: ["+41791234567", "0791234567"],
//     regex: /^(\+41|0)[7-8]\d{8}$/,
//   },
// }

// // Fonction pour nettoyer un numéro de téléphone
// export const cleanPhoneNumber = (phone: string): string => {
//   if (!phone) return ""
//   return phone.replace(/[\s\-$$$$.]/g, "")
// }

// // Fonction pour formater un numéro marocain
// export const formatMoroccanPhone = (phone: string): string => {
//   const cleaned = cleanPhoneNumber(phone)

//   // Si le numéro commence par +212, le retourner tel quel
//   if (cleaned.startsWith("+212")) {
//     return cleaned
//   }

//   // Si le numéro commence par 212, ajouter le +
//   if (cleaned.startsWith("212")) {
//     return "+" + cleaned
//   }

//   // Si le numéro commence par 0, remplacer par +212
//   if (cleaned.startsWith("0")) {
//     return "+212" + cleaned.substring(1)
//   }

//   // Si le numéro ne commence par aucun préfixe, ajouter +212
//   if (cleaned.match(/^[5-7]\d{8}$/)) {
//     return "+212" + cleaned
//   }

//   return cleaned
// }

// // Fonction pour valider et formater un numéro selon le pays
// export const validateAndFormatPhone = (
//   phone: string,
//   countryCode: CountryCode,
// ): { isValid: boolean; formatted: string; error?: string } => {
//   if (!phone) {
//     return { isValid: false, formatted: "", error: "Le numéro de téléphone est requis" }
//   }

//   const cleaned = cleanPhoneNumber(phone)
//   const countryFormat = PHONE_FORMATS[countryCode as keyof typeof PHONE_FORMATS]

//   try {
//     // Cas spécial pour le Maroc
//     if (countryCode === "MA") {
//       const moroccanFormatted = formatMoroccanPhone(cleaned)
//       const parsed = parsePhoneNumberFromString(moroccanFormatted, countryCode)

//       if (parsed && parsed.isValid()) {
//         return { isValid: true, formatted: parsed.format("E.164") }
//       } else {
//         return {
//           isValid: false,
//           formatted: cleaned,
//           error: `Numéro marocain invalide. Formats acceptés: ${countryFormat?.formats.join(", ") || "Format inconnu"}`,
//         }
//       }
//     }

//     // Pour les autres pays
//     let phoneToValidate = cleaned

//     // Essayer d'abord avec le numéro tel quel
//     let parsed = parsePhoneNumberFromString(phoneToValidate, countryCode)

//     // Si ça ne marche pas et que le pays a un format spécifique, essayer avec le préfixe
//     if (!parsed || !parsed.isValid()) {
//       const countryPrefix = getCountryPrefix(countryCode)
//       if (countryPrefix && !phoneToValidate.startsWith(countryPrefix)) {
//         // Pour les numéros locaux, ajouter le préfixe du pays
//         if (countryCode === "FR" && phoneToValidate.startsWith("0")) {
//           phoneToValidate = "+33" + phoneToValidate.substring(1)
//         } else if (countryCode === "GB" && phoneToValidate.startsWith("0")) {
//           phoneToValidate = "+44" + phoneToValidate.substring(1)
//         } else if (countryCode === "DE" && phoneToValidate.startsWith("0")) {
//           phoneToValidate = "+49" + phoneToValidate.substring(1)
//         } else if (countryCode === "BE" && phoneToValidate.startsWith("0")) {
//           phoneToValidate = "+32" + phoneToValidate.substring(1)
//         } else if (countryCode === "CH" && phoneToValidate.startsWith("0")) {
//           phoneToValidate = "+41" + phoneToValidate.substring(1)
//         } else if ((countryCode === "US" || countryCode === "CA") && !phoneToValidate.startsWith("+1")) {
//           phoneToValidate = "+1" + phoneToValidate
//         } else if (countryCode === "ES" && !phoneToValidate.startsWith("+34")) {
//           phoneToValidate = "+34" + phoneToValidate
//         } else if (countryCode === "IT" && !phoneToValidate.startsWith("+39")) {
//           phoneToValidate = "+39" + phoneToValidate
//         }

//         parsed = parsePhoneNumberFromString(phoneToValidate, countryCode)
//       }
//     }

//     if (parsed && parsed.isValid()) {
//       return { isValid: true, formatted: parsed.format("E.164") }
//     } else {
//       return {
//         isValid: false,
//         formatted: cleaned,
//         error: `Numéro invalide pour ${countryFormat?.name || countryCode}. Formats acceptés: ${countryFormat?.formats.join(", ") || "Format inconnu"}`,
//       }
//     }
//   } catch (error) {
//     return {
//       isValid: false,
//       formatted: cleaned,
//       error: "Format de numéro invalide",
//     }
//   }
// }

// // Fonction pour obtenir le préfixe d'un pays
// const getCountryPrefix = (countryCode: CountryCode): string => {
//   const prefixes: Record<string, string> = {
//     MA: "+212",
//     FR: "+33",
//     CA: "+1",
//     US: "+1",
//     GB: "+44",
//     DE: "+49",
//     ES: "+34",
//     IT: "+39",
//     BE: "+32",
//     CH: "+41",
//   }
//   return prefixes[countryCode] || ""
// }

// // Fonction pour obtenir des exemples de formats pour un pays
// export const getPhoneExamples = (countryCode: keyof typeof PHONE_FORMATS): string[] => {
//   return PHONE_FORMATS[countryCode]?.examples || []
// }

// // Fonction pour obtenir la description des formats pour un pays
// export const getPhoneFormatsDescription = (countryCode: keyof typeof PHONE_FORMATS): string => {
//   const format = PHONE_FORMATS[countryCode]
//   if (!format) return "Formats non disponibles"

//   return `Formats acceptés pour ${format.name}: ${format.formats.join(", ")}`
// }
