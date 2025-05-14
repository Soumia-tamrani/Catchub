/**
 * Utilitaires pour la validation des formulaires
 */

// Liste des pays avec leurs codes, drapeaux, préfixes et patterns de validation
export const countriesList = [
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    prefix: "+33",
    phonePattern: "^(\\+33|0)[1-9][0-9]{8}$",
    example: "+33 6 12 34 56 78 ou 06 12 34 56 78",
    digitCount: 10,
  },
  {
    code: "MA",
    name: "Maroc",
    flag: "🇲🇦",
    prefix: "+212",
    phonePattern: "^(\\+212|0)[67][0-9]{8}$", // Uniquement 06 ou 07
    example: "+212 6 12 34 56 78 ou 06 12 34 56 78",
    digitCount: 10,
  },
  {
    code: "BE",
    name: "Belgique",
    flag: "🇧🇪",
    prefix: "+32",
    phonePattern: "^(\\+32|0)[1-9][0-9]{7,8}$",
    example: "+32 4 12 34 56 78 ou 04 12 34 56 78",
    digitCount: 9,
  },
  {
    code: "CH",
    name: "Suisse",
    flag: "🇨🇭",
    prefix: "+41",
    phonePattern: "^(\\+41|0)[1-9][0-9]{8}$",
    example: "+41 76 123 45 67 ou 076 123 45 67",
    digitCount: 10,
  },
  {
    code: "LU",
    name: "Luxembourg",
    flag: "🇱🇺",
    prefix: "+352",
    phonePattern: "^(\\+352|0)[1-9][0-9]{7,8}$",
    example: "+352 621 123 456 ou 621 123 456",
    digitCount: 9,
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    prefix: "+1",
    phonePattern: "^(\\+1|0)[2-9][0-9]{9}$",
    example: "+1 514 123 4567 ou 514 123 4567",
    digitCount: 10,
  },
  {
    code: "SN",
    name: "Sénégal",
    flag: "🇸🇳",
    prefix: "+221",
    phonePattern: "^(\\+221|0)[7-9][0-9]{8}$",
    example: "+221 77 123 45 67 ou 77 123 45 67",
    digitCount: 9,
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    prefix: "+225",
    phonePattern: "^(\\+225|0)[0-9]{10}$",
    example: "+225 07 12 34 56 78 ou 07 12 34 56 78",
    digitCount: 10,
  },
  {
    code: "CM",
    name: "Cameroun",
    flag: "🇨🇲",
    prefix: "+237",
    phonePattern: "^(\\+237|0)[2-9][0-9]{8}$",
    example: "+237 6 12 34 56 78 ou 6 12 34 56 78",
    digitCount: 9,
  },
  {
    code: "DZ",
    name: "Algérie",
    flag: "🇩🇿",
    prefix: "+213",
    phonePattern: "^(\\+213|0)[5-9][0-9]{8}$",
    example: "+213 5 12 34 56 78 ou 05 12 34 56 78",
    digitCount: 10,
  },
  {
    code: "TN",
    name: "Tunisie",
    flag: "🇹🇳",
    prefix: "+216",
    phonePattern: "^(\\+216|0)[0-9]{8}$",
    example: "+216 12 345 678 ou 12 345 678",
    digitCount: 8,
  },
  {
    code: "GB",
    name: "Royaume-Uni",
    flag: "🇬🇧",
    prefix: "+44",
    phonePattern: "^(\\+44|0)[1-9][0-9]{9,10}$",
    example: "+44 7123 456 789 ou 07123 456 789",
    digitCount: 11,
  },
  {
    code: "ES",
    name: "Espagne",
    flag: "🇪🇸",
    prefix: "+34",
    phonePattern: "^(\\+34|0)[6-9][0-9]{8}$",
    example: "+34 612 345 678 ou 612 345 678",
    digitCount: 9,
  },
  {
    code: "IT",
    name: "Italie",
    flag: "🇮🇹",
    prefix: "+39",
    phonePattern: "^(\\+39|0)[0-9]{9,10}$",
    example: "+39 312 345 6789 ou 312 345 6789",
    digitCount: 10,
  },
  {
    code: "DE",
    name: "Allemagne",
    flag: "🇩🇪",
    prefix: "+49",
    phonePattern: "^(\\+49|0)[1-9][0-9]{9,10}$",
    example: "+49 151 1234 5678 ou 0151 1234 5678",
    digitCount: 11,
  },
  {
    code: "US",
    name: "États-Unis",
    flag: "🇺🇸",
    prefix: "+1",
    phonePattern: "^(\\+1|0)[2-9][0-9]{9}$",
    example: "+1 212 555 1234 ou 212 555 1234",
    digitCount: 10,
  },
  // Autres pays à ajouter selon les besoins
].sort((a, b) => a.name.localeCompare(b.name)) // Tri par ordre alphabétique

/**
 * Valide si un email est syntaxiquement correct
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

/**
 * Valide un numéro de téléphone en fonction du pays sélectionné
 */
export const isValidPhoneForCountry = (phone: string, countryCode: string): boolean => {
  // Si le pays n'est pas dans notre liste, on accepte tous les formats (min 8 chiffres)
  if (!countryCode) {
    return /^\+?[0-9]{8,}$/.test(phone)
  }

  const country = countriesList.find((c) => c.code === countryCode)
  if (!country || !country.phonePattern) {
    return /^\+?[0-9]{8,}$/.test(phone)
  }

  const phoneRegex = new RegExp(country.phonePattern)
  return phoneRegex.test(phone)
}

/**
 * Détecte le pays en fonction du préfixe téléphonique
 */
export const detectCountryFromPhone = (phone: string): string | null => {
  // Nettoyer le numéro de téléphone
  const cleanPhone = phone.replace(/\s+/g, "")

  // Si le numéro commence par +, essayer de détecter le pays
  if (cleanPhone.startsWith("+")) {
    // Trier les pays par longueur de préfixe (du plus long au plus court) pour éviter les faux positifs
    const sortedCountries = [...countriesList].sort((a, b) => b.prefix.length - a.prefix.length)

    for (const country of sortedCountries) {
      if (cleanPhone.startsWith(country.prefix)) {
        return country.code
      }
    }
  }

  return null
}

/**
 * Formate un numéro de téléphone selon le format du pays
 */
export const formatPhoneNumber = (phone: string, countryCode: string): string => {
  // Nettoyer le numéro de téléphone
  const cleanPhone = phone.replace(/\s+/g, "")

  const country = countriesList.find((c) => c.code === countryCode)
  if (!country) return phone

  // Si le numéro ne commence pas par le préfixe du pays, on le laisse tel quel
  if (!cleanPhone.startsWith("+") && !cleanPhone.startsWith("0")) {
    return phone
  }

  // Formater selon le pays
  switch (countryCode) {
    case "FR":
      // Format français: +33 6 12 34 56 78 ou 06 12 34 56 78
      if (cleanPhone.startsWith("+33")) {
        return cleanPhone.replace(/(\+33)(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5 $6")
      } else if (cleanPhone.startsWith("0")) {
        return cleanPhone.replace(/^0(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, "0$1 $2 $3 $4 $5")
      }
      break
    case "MA":
      // Format marocain: +212 6 12 34 56 78 ou 06 12 34 56 78
      if (cleanPhone.startsWith("+212")) {
        return cleanPhone.replace(/(\+212)(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5 $6")
      } else if (cleanPhone.startsWith("0")) {
        return cleanPhone.replace(/^0(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, "0$1 $2 $3 $4 $5")
      }
      break
    // Ajouter d'autres cas spécifiques si nécessaire
  }

  return phone
}
