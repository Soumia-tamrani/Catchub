"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

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
  TABLEAUX_BORD = "TABLEAUX_BORD",
  INSIGHTS_SECTORIELS = "INSIGHTS_SECTORIELS",
  OFFRES_EMPLOI = "OFFRES_EMPLOI",
  MENTORS_SECTORIELS = "MENTORS_SECTORIELS",
  FREELANCE_HUB = "FREELANCE_HUB",
}

enum CompanySize {
  STARTUP = "STARTUP",
  PME = "PME",
  GRANDE_ENTREPRISE = "GRANDE_ENTREPRISE",
}

enum TypeContrat {
  CDI = "CDI",
  CDD = "CDD",
  FREELANCE = "FREELANCE",
  AUTRE = "AUTRE",
}

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
  city: z.string().optional().default(""),
  country: z.string().min(1, "Le pays est requis"),
  sector: z.nativeEnum(Secteur),
  professionalInterests: z
    .array(z.nativeEnum(ProfessionalInterest))
    .optional()
    .default([]),
  professionalChallenges: z.string().optional().default(""),
  subscribedToNewsletter: z.boolean().default(false),
  referralSource: z.string().optional().default(""),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  emailVerified: z.boolean().default(false),
  contractType: z.nativeEnum(TypeContrat).optional().nullable(),
  parrainId: z.string().optional().nullable(),
});

const businessLeadSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  parrainId: z.string().optional().nullable(), //,mdfb
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .refine((phone) => /^\+?[0-9\s-]{6,}$/.test(phone), {
      message: "Numéro de téléphone invalide",
    }),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  companySize: z.enum(["STARTUP", "PME", "GRANDE_ENTREPRISE"]),
  sector: z.nativeEnum(Secteur),
  mainNeed: z.string().min(1, "Le besoin principal est requis"),
  otherSector: z.string().optional(),
  companyNeeds: z
    .array(
      z.enum([
        "PRESENTATION_MARQUE",
        "RESEAU_B2B",
        "TALENTS_QUALIFIES",
        "TABLEAUX_BORD",
        "INSIGHTS_SECTORIELS",
        "OFFRES_EMPLOI",
        "MENTORS_SECTORIELS",
        "FREELANCE_HUB",
      ])
    )
    .min(0)
    .default([]),
  companyChallenges: z.string().optional(),
  companyDescription: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyFoundingYear: z.string().optional(),
  subscribedToNewsletter: z.boolean().default(false),
  referralSource: z.string().optional(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  emailVerified: z.boolean().default(false),
});

async function checkUniqueEmailAndPhone(email: string, phone: string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ Email: email }, { Téléphone_mobile: phone }],
    },
  });
  if (existingUser) {
    if (existingUser.Email === email) {
      return {
        isUnique: false,
        field: "email",
        message: "Cet email est déjà utilisé.",
      };
    }
    if (existingUser.Téléphone_mobile === phone) {
      return {
        isUnique: false,
        field: "phone",
        message: "Ce numéro de téléphone est déjà utilisé.",
      };
    }
  }
  return { isUnique: true };
}

export async function registerBusiness(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      companyName: formData.get("companyName") as string,
      companySize: formData.get("companySize") as string,
      sector: formData.get("sector") as string,
      mainNeed: formData.get("mainNeed") as string,
      otherSector: formData.get("otherSector") as string | null,
      companyNeeds: formData.getAll("companyNeeds") as string[],
      companyChallenges: formData.get("companyChallenges") as string | null,
      companyDescription: formData.get("companyDescription") as string | null,
      companyWebsite: formData.get("companyWebsite") as string | null,
      companyFoundingYear: formData.get("companyFoundingYear") as string | null,
      subscribedToNewsletter: formData.get("subscribedToNewsletter") === "true",
      parrainId: formData.get("parrainId") as string | null,
      referralSource: formData.get("referralSource") as string | null, //salma
      utmSource: formData.get("utmSource") as string | null,
      utmMedium: formData.get("utmMedium") as string | null,
      utmCampaign: formData.get("utmCampaign") as string | null,
      emailVerified: formData.get("emailVerified") === "true",
    };
    // salma
    if (rawData.parrainId && !rawData.referralSource) {
      rawData.referralSource = "FRIEND";
    }

    console.log("Raw form data:", rawData);

    const validated = businessLeadSchema.parse(rawData);
    console.log("Validated data:", validated);

    const existingUser = await prisma.user.findUnique({
      where: { Email: validated.email },
    });

    if (!existingUser) {
      const uniquenessCheck = await checkUniqueEmailAndPhone(
        validated.email,
        validated.phone
      );
      if (!uniquenessCheck.isUnique) {
        return {
          error: uniquenessCheck.message,
          field: uniquenessCheck.field,
        };
      }
    }

    if (existingUser) {
      const user = await prisma.user.update({
        where: { Email: validated.email },
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Téléphone_mobile: validated.phone,
          city: validated.city,
          country: validated.country,
          sector: validated.sector as any,
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
                companyDescription: validated.companyDescription || null,
                companyWebsite: validated.companyWebsite || null,
                companyFoundingYear: validated.companyFoundingYear || null,
                mainNeed: validated.mainNeed || null,
                otherSector: validated.otherSector || null,
                city: validated.city,
                country: validated.country,
              },
              update: {
                companyName: validated.companyName,
                companySize: validated.companySize as any,
                companyNeeds: validated.companyNeeds as any[],
                companyChallenges: validated.companyChallenges || null,
                companyDescription: validated.companyDescription || null,
                companyWebsite: validated.companyWebsite || null,
                companyFoundingYear: validated.companyFoundingYear || null,
                mainNeed: validated.mainNeed || null,
                otherSector: validated.otherSector || null,
                city: validated.city,
                country: validated.country,
              },
            },
          },
        },
      });
      return {
        success: true,
        user,
        redirectTo: `/register/success?userId=${user.id}`,
      };
    } else {
      const user = await prisma.user.create({
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Email: validated.email,
          Téléphone_mobile: validated.phone,
          role: UserRole.BUSINESS as any,
          city: validated.city,
          country: validated.country,
          sector: validated.sector as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          registeredForTrial: true,
          parrainId: validated.parrainId || null, //mdfb
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
              companyDescription: validated.companyDescription || null,
              companyWebsite: validated.companyWebsite || null,
              companyFoundingYear: validated.companyFoundingYear || null,
              mainNeed: validated.mainNeed || null,
              otherSector: validated.otherSector || null,
              city: validated.city,
              country: validated.country,
            },
          },
        },
      });
      return {
        success: true,
        user,
        redirectTo: `/register/success?userId=${user.id}`,
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return {
        error:
          "Validation failed: " +
          error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
        details: error.errors,
      };
    }
    console.error("Erreur inscription entreprise:", error);
    return { error: "Erreur lors de l'inscription. Veuillez réessayer." };
  }
}

export async function registerProfessional(formData: FormData) {
  try {
    console.log("Form data received:", Object.fromEntries(formData.entries()));
    const professionalInterests = formData.getAll("professionalInterests");

    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      city: (formData.get("city") as string) || "",
      country: formData.get("country") as string,
      sector: formData.get("sector") as string,
      professionalInterests: professionalInterests as string[],
      professionalChallenges:
        (formData.get("professionalChallenges") as string) || "",
      subscribedToNewsletter: formData.get("subscribedToNewsletter") === "true",
      referralSource: (formData.get("referralSource") as string) || "",
      utmSource: (formData.get("utmSource") as string) || null,
      utmMedium: (formData.get("utmMedium") as string) || null,
      utmCampaign: (formData.get("utmCampaign") as string) || null,
      emailVerified: formData.get("emailVerified") === "true",
      contractType: (formData.get("contractType") as string) || null,
      parrainId: formData.get("parrainId") as string | null,
    };

    console.log("Parsed data before validation:", rawData);
    // salma
    if (rawData.parrainId && !rawData.referralSource) {
      rawData.referralSource = "FRIEND";
    }

    const validated = professionalLeadSchema.parse(rawData);
    console.log("Validation successful:", validated);
    // ajout salma : vérification que l'ID du parrain existe
    let parrainUserId: string | null = null;

    if (validated.parrainId) {
      const parrainUser = await prisma.user.findUnique({
        where: { id: validated.parrainId },
      });
      if (parrainUser) {
        parrainUserId = parrainUser.id;
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { Email: validated.email },
    });

    if (!existingUser) {
      const uniquenessCheck = await checkUniqueEmailAndPhone(
        validated.email,
        validated.phone
      );
      if (!uniquenessCheck.isUnique) {
        return {
          error: uniquenessCheck.message,
          field: uniquenessCheck.field,
        };
      }
    }

    if (validated.parrainId) {
      const parrainUser = await prisma.user.findUnique({
        where: { id: validated.parrainId },
      });
      if (parrainUser) {
        parrainUserId = parrainUser.id;
      }
    }

    if (existingUser) {
      const user = await prisma.user.update({
        where: { Email: validated.email },
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Téléphone_mobile: validated.phone,
          city: validated.city,
          country: validated.country,
          sector: validated.sector as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          parrainId: parrainUserId, //  salma
          referralSource: validated.referralSource || null,
          utmSource: validated.utmSource || null,
          utmMedium: validated.utmMedium || null,
          utmCampaign: validated.utmCampaign || null,
          emailVerified: validated.emailVerified,
          professionalDetails: {
            upsert: {
              create: {
                professionalInterests: validated.professionalInterests as any[],
                professionalChallenges:
                  validated.professionalChallenges || null,
                city: validated.city,
                country: validated.country,
              },
              update: {
                professionalInterests: validated.professionalInterests as any[],
                professionalChallenges:
                  validated.professionalChallenges || null,
                city: validated.city,
                country: validated.country,
              },
            },
          },
        },
      });
      return {
        success: true,
        user,
        redirectTo: `/register/success?userId=${user.id}`,
      };
    } else {
      const user = await prisma.user.create({
        data: {
          Prénom: validated.firstName,
          Nom: validated.lastName,
          Email: validated.email,
          Téléphone_mobile: validated.phone,
          role: UserRole.PROFESSIONAL as any,
          city: validated.city,
          country: validated.country,
          sector: validated.sector as any,
          subscribedToNewsletter: validated.subscribedToNewsletter,
          registeredForTrial: true,
          referralSource: validated.referralSource || null,
          utmSource: validated.utmSource || null,
          utmMedium: validated.utmMedium || null,
          utmCampaign: validated.utmCampaign || null,
          registrationDate: new Date(),
          ipAddress: "127.0.0.1",
          emailVerified: validated.emailVerified,
          parrainId: parrainUserId,
          professionalDetails: {
            create: {
              professionalInterests: validated.professionalInterests as any[],
              professionalChallenges: validated.professionalChallenges || null,
              city: validated.city,
              country: validated.country,
            },
          },
        },
      });
      return {
        success: true,
        user,
        redirectTo: `/register/success?userId=${user.id}`,
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return {
        error:
          "Validation failed: " +
          error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
        details: error.errors,
      };
    }
    console.error("Erreur inscription professionnel:", error);
    return { error: "Erreur lors de l'inscription. Veuillez réessayer." };
  }
}

export async function verifyEmail(email: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error("Erreur vérification email:", error);
    return { error: "Erreur lors de l'envoi du code de vérification" };
  }
}

export async function confirmVerificationCode(email: string, code: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await prisma.user.update({
      where: { Email: email },
      data: { emailVerified: true },
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur confirmation code:", error);
    return { error: "Code de vérification invalide" };
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    if (!email || !z.string().email().safeParse(email).success) {
      return { error: "Email invalide" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { Email: email },
        data: { subscribedToNewsletter: true },
      });
    } else {
      await prisma.user.create({
        data: {
          Email: email,
          Prénom: name || "Unknown",
          Nom: "",
          role: UserRole.PROFESSIONAL as any,
          city: "",
          country: "",
          sector: Secteur.AUTRE as any,
          subscribedToNewsletter: true,
          Téléphone_mobile: "+0000000000",
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur newsletter:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }
}