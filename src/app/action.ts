"use server"

import { PrismaClient } from "@prisma/client"
import { z } from "zod"
// Supprimer l'import de isValidPhoneNumber

const prisma = new PrismaClient()

// Define the enums locally to match your schema
enum UserRole {
  PROFESSIONAL = "PROFESSIONAL",
  BUSINESS = "BUSINESS",
}

enum Secteur {
  TECHNOLOGIE = "TECHNOLOGIE",
  AGRO_HALIEUTIQUE = "AGRO_HALIEUTIQUE",
  COMMERCE = "COMMERCE",
  FINANCE = "FINANCE",
  SANTE = "SANTE",
  ÉNERGIE_DURABILITE = "ÉNERGIE_DURABILITE",
  TRANSPORT = "TRANSPORT",
  INDUSTRIE = "INDUSTRIE",
  COMMERCE_DISTRIBUTION = "COMMERCE_DISTRIBUTION",
  SERVICES_PROFESSIONNELS = "SERVICES_PROFESSIONNELS",
  TOURISME = "TOURISME",
  MEDIA_DIVERTISSEMENT = "MEDIA_DIVERTISSEMENT",
  EDUCATION = "EDUCATION",
  AUTRE = "AUTRE",
}

enum ProfessionalInterest {
  MENTORAT = "MENTORAT",
  RESEAUTAGE = "RESEAUTAGE",
  EMPLOI = "EMPLOI",
  FORMATION = "FORMATION",
  AUTRE = "AUTRE",
}

enum CompanyNeed {
  PRESENTATION_MARQUE = "PRESENTATION_MARQUE",
  RESEAU_B2B = "RESEAU_B2B",
  TALENTS_QUALIFIES = "TALENTS_QUALIFIES",
  PARTENARIATS_B2B = "PARTENARIATS_B2B",
  FREELANCES_PRESTATAIRES = "FREELANCES_PRESTATAIRES",
  VISIBILITE_MARKETING_DIGITAL = "VISIBILITE_MARKETING_DIGITAL",
  INVESTISSEMENTS = "INVESTISSEMENTS",
  MENTORAT = "MENTORAT",
  FORUMS_SECTORIELS = "FORUMS_SECTORIELS",
  AUTRE = "AUTRE",
}

enum CompanySize {
  LESS_THAN_10 = "LESS_THAN_10",
  BETWEEN_10_50 = "BETWEEN_10_50",
  BETWEEN_50_250 = "BETWEEN_50_250",
  MORE_THAN_250 = "MORE_THAN_250",
}

enum TypeContrat {
  CDI = "CDI",
  CDD = "CDD",
  FREELANCE = "FREELANCE",
  AUTRE = "AUTRE",
}

// Modifier le schéma de validation du téléphone pour utiliser une regex plus simple
const professionalLeadSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .refine((phone) => /^\+?[0-9\s-]{6,}$/.test(phone), {
      message: "Numéro de téléphone invalide",
    }),
  city: z.string().optional().default(""), // Renommé de "address" à "city"
  country: z.string().min(1, "Le pays est requis"), // Nouveau champ obligatoire
  sector: z.nativeEnum(Secteur),
  professionalInterests: z.array(z.nativeEnum(ProfessionalInterest)).min(1, "Sélectionnez au moins un intérêt"),
  professionalChallenges: z.string().optional().default(""),
  subscribedToNewsletter: z.boolean().default(false),
  referralSource: z.string().optional().default(""),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  emailVerified: z.boolean().default(false),
  contractType: z.nativeEnum(TypeContrat).optional().nullable(),
})

// Modifier également le schéma pour les entreprises
const businessLeadSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .refine((phone) => /^\+?[0-9\s-]{6,}$/.test(phone), {
      message: "Numéro de téléphone invalide",
    }),
  address: z.string().min(1, "L'adresse est requise"),
  sector: z.nativeEnum(Secteur),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  companySize: z.nativeEnum(CompanySize),
  companyNeeds: z.array(z.nativeEnum(CompanyNeed)).min(1, "Sélectionnez au moins un besoin"),
  companyChallenges: z.string().optional(),
  subscribedToNewsletter: z.boolean().default(false),
  referralSource: z.string().optional(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  emailVerified: z.boolean().default(false),
})

// Fonction pour vérifier l'unicité de l'email et du téléphone
async function checkUniqueEmailAndPhone(email: string, phone: string) {
  const existingUserWithEmail = await prisma.user.findUnique({
    where: { Email: email },
  })

  if (existingUserWithEmail) {
    return { isUnique: false, field: "email", message: "Cet email est déjà utilisé. Veuillez utiliser un autre email." }
  }

  const existingUserWithPhone = await prisma.user.findFirst({
    where: { Téléphone_mobile: phone },
  })

  if (existingUserWithPhone) {
    return {
      isUnique: false,
      field: "phone",
      message: "Ce numéro de téléphone est déjà utilisé. Veuillez utiliser un autre numéro.",
    }
  }

  return { isUnique: true }
}

export async function registerProfessional(formData: FormData) {

  try {
    // Log the received form data for debugging
    console.log("Form data received:", Object.fromEntries(formData.entries()))

    // Get all professionalInterests values
    const professionalInterests = formData.getAll("professionalInterests")
    console.log("Professional interests:", professionalInterests)

    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      city: (formData.get("city") as string) || "", // Renommé de "address" à "city"
      country: formData.get("country") as string, // Nouveau champ
      sector: formData.get("sector") as string,
      professionalInterests: professionalInterests as string[],
      professionalChallenges: (formData.get("professionalChallenges") as string) || "",
      subscribedToNewsletter: formData.get("subscribedToNewsletter") === "true",
      referralSource: (formData.get("referralSource") as string) || "",
      utmSource: (formData.get("utmSource") as string) || null,
      utmMedium: (formData.get("utmMedium") as string) || null,
      utmCampaign: (formData.get("utmCampaign") as string) || null,
      emailVerified: formData.get("emailVerified") === "true",
      contractType: (formData.get("contractType") as string) || null,
    }

    console.log("Parsed data before validation:", rawData)

    // Validate the data
    try {
      const validated = professionalLeadSchema.parse(rawData)
      console.log("Validation successful:", validated)
    } catch (validationError) {
      console.error("Validation error:", validationError)
      if (validationError instanceof z.ZodError) {
        return {
          error:
            "Validation failed: " + validationError.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
          details: validationError.errors,
        }
      }
      throw validationError
    }

    const validated = professionalLeadSchema.parse(rawData)

    // Vérifier l'unicité avant de continuer (seulement pour les nouveaux utilisateurs)
    const existingUser = await prisma.user.findUnique({
      where: { Email: validated.email },
    })

    if (!existingUser) {
      const uniquenessCheck = await checkUniqueEmailAndPhone(validated.email, validated.phone)
      if (!uniquenessCheck.isUnique) {
        return {
          error: uniquenessCheck.message,
          field: uniquenessCheck.field,
        }
      }
    }

    // Déterminer le type de contrat si l'intérêt principal est l'emploi
    const typeContrat = validated.contractType || undefined

    if (existingUser) {
      const user = await prisma.user.update({
        where: { Email: validated.email },
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Téléphone_mobile: validated.phone,
          city: validated.city, // Renommé de "address" à "city"
          country: validated.country, // Nouveau champ
          sector: validated.sector as any,
          besoinPrincipal: ProfessionalInterest.EMPLOI as any,
          typeContrat: typeContrat as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          referralSource: validated.referralSource || null,
          utmSource: validated.utmSource || null,
          utmMedium: validated.utmMedium || null,
          utmCampaign: validated.utmCampaign || null,
          emailVerified: validated.emailVerified,
          professionalDetails: {
            upsert: {
              create: {
                professionalInterests: validated.professionalInterests as any[],
                professionalChallenges: validated.professionalChallenges || null,
                city: validated.city as any,
                country: validated.country,
              },
              update: {
                professionalInterests: validated.professionalInterests as any[],
                professionalChallenges: validated.professionalChallenges || null,
                city: validated.city as any,
                country: validated.country,
              },
            },
          },
        },
      })
      return { success: true, user }
    } else {
      const user = await prisma.user.create({
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Email: validated.email,
          Téléphone_mobile: validated.phone,
          role: UserRole.PROFESSIONAL as any,
          city: validated.city, // Renommé de "address" à "city"
          country: validated.country, // Nouveau champ
          sector: validated.sector as any,
          besoinPrincipal: ProfessionalInterest.EMPLOI as any,
          typeContrat: typeContrat as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          registeredForTrial: true,
          referralSource: validated.referralSource || null,
          utmSource: validated.utmSource || null,
          utmMedium: validated.utmMedium || null,
          utmCampaign: validated.utmCampaign || null,
          registrationDate: new Date(),
          ipAddress: "127.0.0.1",
          emailVerified: validated.emailVerified,
          professionalDetails: {
            create: {
              professionalInterests: validated.professionalInterests as any[],
              professionalChallenges: validated.professionalChallenges || null,
              city: validated.city as any,
              country: validated.country,
            },
          },
        },
      })
      return { success: true, user }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      }
    }
    console.error("Erreur inscription professionnel :", error)
    return { error: "Erreur lors de l'inscription. Veuillez réessayer." }
  }
}

export async function registerBusiness(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      sector: formData.get("sector"),
      companyName: formData.get("companyName"),
      companySize: formData.get("companySize"),
      companyNeeds: formData.getAll("companyNeeds"),
      companyChallenges: formData.get("companyChallenges"),
      subscribedToNewsletter: formData.get("subscribedToNewsletter") === "on",
      referralSource: formData.get("referralSource"),
      utmSource: formData.get("utmSource"),
      utmMedium: formData.get("utmMedium"),
      utmCampaign: formData.get("utmCampaign"),
      emailVerified: formData.get("emailVerified") === "true",
    }

    const validated = businessLeadSchema.parse(rawData)

    // Vérifier l'unicité avant de continuer (seulement pour les nouveaux utilisateurs)
    const existingUser = await prisma.user.findUnique({
      where: { Email: validated.email },
    })

    if (!existingUser) {
      const uniquenessCheck = await checkUniqueEmailAndPhone(validated.email, validated.phone)
      if (!uniquenessCheck.isUnique) {
        return {
          error: uniquenessCheck.message,
          field: uniquenessCheck.field,
        }
      }
    }

    if (existingUser) {
      const user = await prisma.user.update({
        where: { Email: validated.email },
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Téléphone_mobile: validated.phone,
          city: validated.address,
          sector: validated.sector as any,
          besoinPrincipal: ProfessionalInterest.AUTRE as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          referralSource: validated.referralSource || null,
          utmSource: validated.utmSource || null,
          utmMedium: validated.utmMedium || null,
          utmCampaign: validated.utmCampaign || null,
          emailVerified: validated.emailVerified,
          companyDetails: {
            upsert: {
              create: {
                companyName: validated.companyName,
                companySize: validated.companySize as any,
                companyNeeds: validated.companyNeeds as any[],
                companyChallenges: validated.companyChallenges || null,
                city: validated.address as any, // Ajout du champ city pour les entreprises
                country: null, // Peut être ajouté si besoin dans le formulaire
              },
              update: {
                companyName: validated.companyName,
                companySize: validated.companySize as any,
                companyNeeds: validated.companyNeeds as any[],
                companyChallenges: validated.companyChallenges || null,
                city: validated.address as any, // Ajout du champ city pour les entreprises
                country: null, // Peut être ajouté si besoin dans le formulaire
              },
            },
          },
        },
      })
      return { success: true, user }
    } else {
      const user = await prisma.user.create({
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Email: validated.email,
          Téléphone_mobile: validated.phone,
          role: UserRole.BUSINESS as any,
          city: validated.address,
          sector: validated.sector as any,
          besoinPrincipal: ProfessionalInterest.AUTRE as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          registeredForTrial: true,
          referralSource: validated.referralSource || null,
          utmSource: validated.utmSource || null,
          utmMedium: validated.utmMedium || null,
          utmCampaign: validated.utmCampaign || null,
          registrationDate: new Date(),
          ipAddress: "127.0.0.1",
          emailVerified: validated.emailVerified,
          companyDetails: {
            create: {
              companyName: validated.companyName,
              companySize: validated.companySize as any,
              companyNeeds: validated.companyNeeds as any[],
              companyChallenges: validated.companyChallenges || null,
              city: validated.address as any, // Ajout du champ city pour les entreprises
              country: null , // Peut être ajouté si besoin dans le formulaire
            },
          },
        },
      })
      return { success: true, user }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      }
    }
    console.error("Erreur inscription entreprise :", error)
    return { error: "Erreur lors de l'inscription. Veuillez réessayer." }
  }
}

// Les autres fonctions restent inchangées
export async function verifyEmail(email: string) {
  try {
    // Envoyer l'email de vérification ici
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true }
  } catch (error) {
    console.error("Erreur vérification email :", error)
    return { error: "Erreur lors de l'envoi du code de vérification" }
  }
}

export async function confirmVerificationCode(email: string, code: string) {
  try {
    // Vérifier le code ici
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await prisma.user.update({
      where: { Email: email },
      data: { emailVerified: true },
    })

    return { success: true }
  } catch (error) {
    console.error("Erreur confirmation code :", error)
    return { error: "Code de vérification invalide" }
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !z.string().email().safeParse(email).success) {
    return { error: "Email invalide" }
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { Email: email } })

    if (existingUser) {
      await prisma.user.update({
        where: { Email: email },
        data: { subscribedToNewsletter: true },
      })
    } else {
      await prisma.user.create({
        data: {
          Email: email,
          Prénom: "",
          Nom: "",
          role: UserRole.PROFESSIONAL as any,
          city: "",
          sector: Secteur.AUTRE as any,
          besoinPrincipal: ProfessionalInterest.AUTRE as any,
          subscribedToNewsletter: true,
          Téléphone_mobile: "+0000000000", // Ajout d'un numéro par défaut car maintenant obligatoire
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur newsletter :", error)
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }
}