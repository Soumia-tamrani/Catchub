"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { registerProfessional } from "@/app/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, User, Mail, MapPin, Briefcase, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import EmailVerification from "@/components/email-verification"
import { z } from "zod"
import { toast } from "sonner"
import { emailSchema } from "@/utils/validation"
import { useSearchParams } from "next/navigation"
import CountrySelector from "@/components/country-selector"
import { cn } from "@/lib/utils"
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';




const formSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: emailSchema,
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  city: z.string().optional(),
  country: z.string().min(1, "Le pays est requis"),
  sector: z.string().min(1, "Sélectionnez un secteur"),
  professionalInterests: z.array(z.string()).min(1, "Sélectionnez au moins un intérêt"),
  professionalChallenges: z.string().optional(),
  subscribedToNewsletter: z.boolean().default(false),
  referralSource: z.string().optional(),
  parrainId: z.string().optional(),
})

interface ProfessionalFormProps {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  parrainId?: string
  onStepChange?: (step: number) => void
}

export default function ProfessionalForm({
  
  utmSource,
  utmMedium,
  utmCampaign,
  parrainId,
  onStepChange,
}: ProfessionalFormProps) {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [isCheckingPhone, setIsCheckingPhone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref") || ""
const fetchCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all")
    const data = await res.json()
    const countryList = data.map((country: any) => ({
      name: country.translations?.fra?.common || country.name.common,
      code: country.cca2,
      prefix: country.idd.root + (country.idd.suffixes?.[0] || ""),
    }))
    return countryList.sort((a: any, b: any) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Erreur lors du chargement des pays :", error)
    return []
  }
}

  // Initialiser avec le nom du pays "Maroc" par défaut
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+212", // Préfixe par défaut pour Maroc
    city: "",
    country: "Maroc", // Nom du pays par défaut
    sector: "",
    professionalInterests: [] as string[],
    professionalChallenges: "",
    subscribedToNewsletter: false,
    referralSource: "",
    parrainId: ref || parrainId || "",
  })
  const [countries, setCountries] = useState<{ name: string; code: string; prefix: string }[]>([])

  useEffect(() => {
  const loadCountries = async () => {
    const data = await fetchCountries()
    setCountries(data)

const defaultCountry = data.find((c: { name: string }) => c.name === "Maroc")
    if (defaultCountry) {
      setFormData(prev => ({
        ...prev,
        country: defaultCountry.name,
        phone: defaultCountry.prefix,
      }))
    }
  }

  loadCountries()
}, [])


  useEffect(() => {
    
    if (onStepChange) onStepChange(step)
  }, [step, onStepChange])

  useEffect(() => {
    if (ref && !formData.referralSource) {
      setFormData((prev) => ({
        ...prev,
        parrainId: ref,
        referralSource: "FRIEND",
      }))
    }
  }, [ref])

  const checkUnique = async (field: string, value: string) => {
    try {
      const response = await fetch("/api/check-unique", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
      })

      const data = await response.json()

      if (!data.isUnique) {
        setErrors((prev) => ({ ...prev, [field]: data.message }))
        return false
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
        return true
      }
    } catch (error) {
      console.error(`Erreur lors de la vérification de l'unicité du ${field}:`, error)
      toast.error("Erreur réseau", {
        description: "Impossible de vérifier l'unicité. Veuillez réessayer.",
      })
      return true
    }
  }

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value.trim()
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "L'email est requis" }))
      return
    }
    try {
      emailSchema.parse(email)
      setIsCheckingEmail(true)
      await checkUnique("email", email)
      setIsCheckingEmail(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, email: error.errors[0].message }))
      }
    }
  }
  const handleContinue = async () => {
  try {
    setIsCheckingEmail(true);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(`verification_${formData.email}`, verificationToken);

    const emailContent = {
      to: formData.email,
      subject: "Vérification de votre adresse email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Vérification de votre adresse email</h2>
          <p>Merci de votre inscription ! Voici votre code :</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
            ${verificationToken}
          </div>
          <p>Ce code est valable pendant 10 minutes.</p>
        </div>
      `,
    };

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailContent),
    });

    if (!response.ok) throw new Error("Échec de l’envoi du code");

   if (!response.ok) throw new Error("Échec de l’envoi du code");

// 👉 Indicateur pour afficher le message dans la page suivante
sessionStorage.setItem("codeSentSuccess", "true");

setStep(2);

  } catch (error) {
    console.error("Erreur :", error);
    toast.error("Erreur lors de l’envoi de l’email de vérification.");
  } finally {
    setIsCheckingEmail(false);
  }
};

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }))
    if (!value) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.phone
        return newErrors
      })
    }
  }

  const handlePhoneBlur = async () => {
    const phone = formData.phone.trim()
    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: "Le numéro de téléphone est requis" }))
      return
    }

    

    setIsCheckingPhone(true)
    const isUnique = await checkUnique("phone", phone)
    setIsCheckingPhone(false)
    return isUnique
  }

  const validateStep = (stepToValidate: number) => {
    try {
      const partialSchema =
        stepToValidate === 1
          ? formSchema.pick({
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              country: true,
            })
          : stepToValidate === 3
            ? formSchema.pick({
                sector: true,
                professionalInterests: true,
              })
            : z.object({})

      if (stepToValidate === 1 || stepToValidate === 3) {
        partialSchema.parse(formData)
      }

      if (stepToValidate === 1) {
        if (errors.email || errors.phone) {
          toast.error("Erreur de validation", {
            description: "Veuillez corriger les champs marqués en rouge avant de continuer",
          })
          return false
        }

         
      }

      if (stepToValidate === 3) {
        if (!formData.sector) {
          setErrors((prev) => ({ ...prev, sector: "Sélectionnez un secteur" }))
          return false
        }
        if (formData.professionalInterests.length === 0) {
          setErrors((prev) => ({ ...prev, professionalInterests: "Sélectionnez au moins un intérêt" }))
          return false
        }
      }

      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors((prev) => ({ ...prev, ...newErrors }))
        toast.error("Erreur de validation", {
          description: "Veuillez corriger les champs marqués en rouge avant de continuer",
        })
      }
      return false
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      professionalInterests: checked
        ? [...prev.professionalInterests, interest]
        : prev.professionalInterests.filter((i) => i !== interest),
    }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.professionalInterests
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!validateStep(step)) {
      setIsSubmitting(false)
      return
    }

    try {
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city || "",
        country: formData.country, // Stocke le nom du pays (par exemple, "Maroc")
        sector: formData.sector,
        professionalInterests: formData.professionalInterests,
        professionalChallenges: formData.professionalChallenges || "",
        subscribedToNewsletter: formData.subscribedToNewsletter,
        referralSource: formData.referralSource || "",
        emailVerified: isEmailVerified,
        utmSource: utmSource || "",
        utmMedium: utmMedium || "",
        utmCampaign: utmCampaign || "",
        parrainId: formData.parrainId || "",
      }

      const formDataObj = new FormData()
      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== "professionalInterests") {
          formDataObj.append(key, String(value))
        }
      })
      if (dataToSend.professionalInterests && dataToSend.professionalInterests.length > 0) {
        dataToSend.professionalInterests.forEach((interest) => {
          formDataObj.append("professionalInterests", interest)
        })
      }
      formDataObj.append("parrainId", dataToSend.parrainId || "")

      const result = await registerProfessional(formDataObj)

      if (result.error) {
        if (result.field === "email") {
          setErrors((prev) => ({ ...prev, email: result.error || "Cet email est déjà utilisé" }))
          toast.error("Email déjà utilisé", {
            description: result.error,
          })
        } else if (result.field === "phone") {
          setErrors((prev) => ({ ...prev, phone: result.error || "Ce numéro est déjà utilisé" }))
          toast.error("Téléphone déjà utilisé", {
            description: result.error,
          })
        } else {
          toast.error("Erreur", {
            description: result.error || "Une erreur est survenue",
          })
        }
        setIsSubmitting(false)
      } else if (result.success) {
        if (result.redirectTo) {
          router.push(result.redirectTo)
        } else {
          toast.success("Inscription réussie", {
            description: "Votre compte a été créé avec succès.",
          })
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error)
      toast.error("Erreur", {
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
      })
      setIsSubmitting(false)
    }
  }

  const renderProgressSteps = () => {
    const steps = [
      { number: 1, title: "Identité", icon: <User size={18} /> },
      { number: 2, title: "Vérification", icon: <Shield size={18} /> },
      { number: 3, title: "Profil", icon: <Briefcase size={18} /> },
    ]

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          {steps.map((stepItem) => (
            <div key={stepItem.number} className="flex flex-col items-center z-10">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-500",
                  step >= stepItem.number
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white scale-110"
                    : "bg-white border-gray-200 text-gray-400",
                )}
              >
                {step > stepItem.number ? (
                  <CheckCircle2 className="text-white animate-pulse" size={20} />
                ) : (
                  stepItem.icon
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-semibold mt-3 transition-colors duration-300",
                  step >= stepItem.number ? "text-gray-900" : "text-gray-500",
                )}
              >
                {stepItem.title}
              </span>
            </div>
          ))}
          <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  const nextStep = async () => {
    if (!validateStep(step)) return

    if (step === 1) {
      const isPhoneValid = await handlePhoneBlur()
      if (!isPhoneValid || errors.email || errors.phone) {
        toast.error("Erreur de validation", {
          description: "Veuillez corriger les champs marqués en rouge avant de continuer",
        })
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (isEmailVerified) {
        setStep(3)
      } else {
        toast.info("Vérification requise", {
          description: "Veuillez vérifier votre email avant de continuer",
        })
      }
    }
  }

  const handleEmailVerified = () => {
    setIsEmailVerified(true)
    toast.success("Email vérifié", {
      description: "Votre email a été vérifié avec succès",
    })
  }

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  // Gérer le changement de pays et mettre à jour le préfixe téléphonique
  const handleCountryChange = (countryName: string) => {
    setFormData((prev) => ({
      ...prev,
      country: countryName, // Stocker le nom du pays
    }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.country
      delete newErrors.phone
      return newErrors
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        {renderProgressSteps()}

        {/* Étape 1 - Identité */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <User className="mr-2 text-blue-600" size={24} />
                Informations personnelles
              </h2>
              <p className="text-gray-500 text-sm mt-2">Tous les champs marqués d'un * sont obligatoires</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center">
                  Prénom <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    onBlur={() =>
                      !formData.firstName &&
                      setErrors((prev) => ({ ...prev, firstName: "Le prénom est requis" }))
                    }
                    className={cn(
                      "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
                      errors.firstName && "border-red-500 focus:ring-red-100",
                    )}
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center">
                  Nom <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    onBlur={() =>
                      !formData.lastName && setErrors((prev) => ({ ...prev, lastName: "Le nom est requis" }))
                    }
                    className={cn(
                      "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
                      errors.lastName && "border-red-500 focus:ring-red-100",
                    )}
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={handleEmailBlur}
                    className={cn(
                      "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
                      errors.email && "border-red-500 focus:ring-red-100",
                    )}
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  {isCheckingEmail && (
                    <Loader2 className="absolute right-3 top-3.5 text-blue-500 animate-spin" size={18} />
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.email}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Format : exemple@domaine.com</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold text-gray-700 flex items-center">
                  Pays <span className="text-red-500 ml-1">*</span>
                </Label>
                <CountrySelector
  value={formData.country}
  onChange={handleCountryChange}
  onPrefixChange={(prefix) => setFormData((prev) => ({ ...prev, phone: prefix }))}
  error={errors.country}
  countries={countries} // ✅ injecte ici ta liste dynamique
/>

                {errors.country && (
                  <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.country}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                  Ville
                </Label>
                <div className="relative">
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  />
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
                  Téléphone <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className={cn("flex items-center rounded-lg border border-gray-300 bg-white h-12 overflow-hidden", errors.phone ? "border-red-500" : "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100")}>
                  <Input
                    id="phone"
                    onBlur={handlePhoneBlur}
                    placeholder="Numéro de téléphone"
                    className={cn("flex-1 border-0 rounded-r-lg h-full pl-2 pr-2 focus-visible:ring-0 focus-visible:ring-offset-0", errors.phone && "text-red-600")}
                  />
                  {isCheckingPhone && (
                    <Loader2 className="absolute right-3 top-3.5 text-blue-500 animate-spin" size={18} />
                  )}
                </div>
               {errors.phone && (
  <p className="text-red-500 text-xs flex items-center mt-1">
    <AlertCircle className="mr-1 h-4 w-4" /> {errors.phone}
  </p>
)}
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <Button
                type="button"
                onClick={handleContinue}
                disabled={isSubmitting || isCheckingEmail || isCheckingPhone}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
              >
                {isSubmitting || isCheckingEmail || isCheckingPhone ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        
        {/* Étape 2 - Vérification email */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Shield className="mr-2 text-blue-600" size={24} />
                Vérification de votre email
              </h2>
              <p className="text-gray-500 text-sm mt-2">Vérifiez votre adresse email pour continuer</p>
            </div>
            <EmailVerification email={formData.email} onVerified={handleEmailVerified} onBack={prevStep} />

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
              >
                Retour
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isEmailVerified}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isEmailVerified ? (
                  <>
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  "Vérifiez votre email"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Étape 3 - Profil */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Briefcase className="mr-2 text-blue-600" size={24} />
                Votre profil professionnel
              </h2>
              <p className="text-gray-500 text-sm mt-2">Parlez-nous de vos intérêts et objectifs professionnels</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sector" className="text-sm font-semibold text-gray-700 flex items-center">
                  Secteur d'activité <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData({ ...formData, sector: value })}
                  >
                    <SelectTrigger
                      className={cn(
                        "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
                        errors.sector && "border-red-500 focus:ring-red-100",
                      )}
                    >
                      <SelectValue placeholder="Sélectionnez votre secteur" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
                     <SelectItem value="TECHNOLOGIE">Technologie</SelectItem>
                     <SelectItem value="AGRO_HALIEUTIQUE">Agro-Halieutique</SelectItem>
                     <SelectItem value="FINANCE">Finance</SelectItem>
                     <SelectItem value="SANTE">Santé</SelectItem>
                     <SelectItem value="ENERGIE_DURABILITE">Énergie & Durabilité</SelectItem>
                     <SelectItem value="TRANSPORT">Transport</SelectItem>
                     <SelectItem value="INDUSTRIE">Industrie</SelectItem>
                     <SelectItem value="COMMERCE_DISTRIBUTION">Commerce & Distribution</SelectItem>
                    <SelectItem value="SERVICES_PROFESSIONNELS">Services Professionnels</SelectItem>
                    <SelectItem value="EDUCATION">Éducation</SelectItem>
                    <SelectItem value="TOURISME">Tourisme</SelectItem>
                    <SelectItem value="MEDIA_DIVERTISSEMENT">Média & Divertissement</SelectItem>
                     <SelectItem value="AUTRES">Autres</SelectItem>

                    </SelectContent>
                  </Select>
                  <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                {errors.sector && (
                  <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.sector}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  Centres d'intérêt professionnels <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="grid md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {["MENTORAT", "RESEAUTAGE", "EMPLOI", "FORMATION", "AUTRE"].map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center space-x-2 p-2 hover:bg-white rounded-md transition-all duration-200"
                    >
                      <Checkbox
                        id={`interest-${interest}`}
                        checked={formData.professionalInterests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        className="border-gray-300 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <Label htmlFor={`interest-${interest}`} className="text-sm text-gray-700 cursor-pointer">
                        {interest.charAt(0) + interest.slice(1).toLowerCase()}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.professionalInterests && (
                  <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.professionalInterests}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalChallenges" className="text-sm font-semibold text-gray-700">
                  Défis professionnels actuels
                </Label>
                <Textarea
                  id="professionalChallenges"
                  value={formData.professionalChallenges}
                  onChange={(e) => setFormData({ ...formData, professionalChallenges: e.target.value })}
                  rows={4}
                  placeholder="Décrivez brièvement vos défis professionnels..."
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralSource" className="text-sm font-semibold text-gray-700">
                  Comment avez-vous entendu parler de nous ?
                </Label>
                <div className="relative">
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
                  >
                    <SelectTrigger className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200">
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
                      <SelectItem value="SOCIAL_MEDIA">Réseaux sociaux</SelectItem>
                      <SelectItem value="SEARCH">Moteur de recherche</SelectItem>
                      <SelectItem value="FRIEND">Recommandation</SelectItem>
                      <SelectItem value="EVENT">Événement</SelectItem>
                      <SelectItem value="OTHER">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <Checkbox
                  id="subscribedToNewsletter"
                  checked={formData.subscribedToNewsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, subscribedToNewsletter: checked as boolean })
                  }
                  className="border-blue-300 text-blue-600 focus:ring-blue-500 rounded"
                />
                <Label htmlFor="subscribedToNewsletter" className="text-sm text-blue-900 font-medium">
                  Je souhaite recevoir la newsletter
                </Label>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
              >
                Retour
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Finalisation...
                  </>
                ) : (
                  "Finaliser l'inscription"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}