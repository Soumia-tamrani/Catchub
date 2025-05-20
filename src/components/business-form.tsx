// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { registerBusiness } from "@/app/action"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowRight, Loader2, CheckCircle2, Building2, User, Mail, Check, AlertCircle, Info } from "lucide-react"
// import { useRouter } from "next/navigation"
// import EmailVerification from "@/components/email-verification"
// import { motion } from "framer-motion"
// import { updatedCountriesList, isValidEmail, isValidPhoneForCountry } from "@/lib/form-utils"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { useSearchParams } from "next/navigation"
// import CountrySelector from "@/components/country-selector"
// import PhoneInputWithFlag from "@/components/phone-input-with-flag"
// import { cn } from "@/lib/utils"
// import { useDebounce } from "@/hooks/use-debounce"

// interface BusinessFormProps {
//   utmSource?: string
//   utmMedium?: string
//   utmCampaign?: string
//   onStepChange?: (step: number) => void
//   parrainId?: string
// }

// export default function BusinessForm({
//   utmSource,
//   utmMedium,
//   utmCampaign,
//   onStepChange,
//   parrainId,
// }: BusinessFormProps) {
//   const [step, setStep] = useState(1)
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const urlParrainId = searchParams.get("ref")

//   const [isEmailVerified, setIsEmailVerified] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submissionError, setSubmissionError] = useState<string | null>(null)
//   const [isSuccess, setIsSuccess] = useState(false)
//   const [isCheckingPhone, setIsCheckingPhone] = useState(false)
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false)
//   const [isStep1Valid, setIsStep1Valid] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     companyName: "",
//     city: "",
//     country: "",
//     companySize: "",
//     sector: "",
//     otherSector: "",
//     mainNeed: "",
//     companyNeeds: [] as string[],
//     companyChallenges: "",
//     companyDescription: "",
//     companyWebsite: "",
//     companyFoundingYear: "",
//     subscribedToNewsletter: false,
//     referralSource: "",
//   })

//   const [validationErrors, setValidationErrors] = useState<{
//     firstName?: string
//     lastName?: string
//     email?: string
//     phone?: string
//     companyName?: string
//     city?: string
//     country?: string
//     companySize?: string
//   }>({})

//   const debouncedEmail = useDebounce(formData.email, 500)
//   const debouncedPhone = useDebounce(formData.phone, 500)

//   // Validate email on change
//   useEffect(() => {
//     if (formData.email && !isValidEmail(formData.email)) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         email: "Veuillez entrer une adresse email valide",
//       }))
//     } else {
//       setValidationErrors((prev) => {
//         const { email, ...rest } = prev
//         return rest
//       })
//     }
//   }, [formData.email])

//   // Validate phone on change
//   useEffect(() => {
//     if (formData.phone && formData.country) {
//       if (!isValidPhoneForCountry(formData.phone, formData.country)) {
//         const country = updatedCountriesList.find((c) => c.code === formData.country)
//         setValidationErrors((prev) => ({
//           ...prev,
//           phone: `Format invalide. Exemple: ${country?.example || ""}`,
//         }))
//       } else {
//         setValidationErrors((prev) => {
//           const { phone, ...rest } = prev
//           return rest
//         })
//       }
//     }
//   }, [formData.phone, formData.country])

//   // Check email uniqueness
//   useEffect(() => {
//     const checkEmailUniqueness = async () => {
//       if (debouncedEmail && isValidEmail(debouncedEmail)) {
//         setIsCheckingEmail(true)
//         try {
//           const response = await fetch("/api/check-unique", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ field: "email", value: debouncedEmail }),
//           })

//           const data = await response.json()

//           if (!data.isUnique) {
//             setValidationErrors((prev) => ({
//               ...prev,
//               email: data.message,
//             }))
//           }
//         } catch (error) {
//           console.error("Error checking email uniqueness:", error)
//         } finally {
//           setIsCheckingEmail(false)
//         }
//       }
//     }

//     checkEmailUniqueness()
//   }, [debouncedEmail])

//   // Check phone uniqueness
//   useEffect(() => {
//     const checkPhoneUniqueness = async () => {
//       if (debouncedPhone && formData.country && isValidPhoneForCountry(debouncedPhone, formData.country)) {
//         setIsCheckingPhone(true)
//         try {
//           const response = await fetch("/api/check-unique", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ field: "phone", value: debouncedPhone }),
//           })

//           const data = await response.json()

//           if (!data.isUnique) {
//             setValidationErrors((prev) => ({
//               ...prev,
//               phone: data.message,
//             }))
//           }
//         } catch (error) {
//           console.error("Error checking phone uniqueness:", error)
//         } finally {
//           setIsCheckingPhone(false)
//         }
//       }
//     }

//     checkPhoneUniqueness()
//   }, [debouncedPhone, formData.country])

//   // Update step change callback
//   useEffect(() => {
//     if (onStepChange) {
//       onStepChange(step)
//     }
//   }, [step, onStepChange])

//   // Validate Step 1 whenever formData or validationErrors change
//   useEffect(() => {
//     const requiredFields = ["firstName", "lastName", "email", "phone", "companyName", "city", "country", "companySize"]
//     const hasMissingFields = requiredFields.some((field) => !formData[field as keyof typeof formData])
//     const hasValidationErrors = Object.keys(validationErrors).length > 0
//     setIsStep1Valid(!hasMissingFields && !hasValidationErrors)
//   }, [formData, validationErrors])

//   const handleNeedChange = (need: string, checked: boolean) => {
//     setFormData((prev) => {
//       if (checked) {
//         return { ...prev, companyNeeds: [...prev.companyNeeds, need] }
//       } else {
//         return { ...prev, companyNeeds: prev.companyNeeds.filter((n) => n !== need) }
//       }
//     })
//   }

//   const validateStep1 = () => {
//     const requiredFields = ["firstName", "lastName", "email", "phone", "companyName", "city", "country", "companySize"]
//     const newErrors: Record<string, string> = {}

//     requiredFields.forEach((field) => {
//       if (!formData[field as keyof typeof formData]) {
//         newErrors[field] = `${
//           field.charAt(0).toUpperCase() +
//           field
//             .slice(1)
//             .replace(/([A-Z])/g, " $1")
//             .toLowerCase()
//         } est requis`
//       }
//     })

//     setValidationErrors((prev) => ({ ...prev, ...newErrors }))
//     return Object.keys(newErrors).length === 0 && Object.keys(validationErrors).length === 0
//   }

//   const validateStep3 = () => {
//     const requiredFields = ["sector", "mainNeed"]
//     const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])
//     if (formData.sector === "AUTRE" && !formData.otherSector) {
//       return false
//     }
//     return missingFields.length === 0
//   }

//   const handlePhoneBlur = () => {
//     const phone = formData.phone.trim()
//     if (!phone) {
//       setValidationErrors((prev) => ({ ...prev, phone: "Le numéro de téléphone est requis" }))
//       return
//     }

//     if (formData.country && !isValidPhoneForCountry(phone, formData.country)) {
//       const country = updatedCountriesList.find((c) => c.code === formData.country)
//       setValidationErrors((prev) => ({
//         ...prev,
//         phone: `Format invalide. Exemple: ${country?.example || ""}`,
//       }))
//       return
//     }

//     setValidationErrors((prev) => {
//       const { phone, ...rest } = prev
//       return rest
//     })
//   }

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     const country = updatedCountriesList.find((c) => c.code === formData.country)
//     const prefix = country?.prefix || ""

//     // Remove prefix if present to avoid duplication
//     let cleanValue = value.replace(prefix, "").replace(/\D/g, "") // Remove non-digits
//     // If the input starts with '0' and we're adding a prefix, remove the leading '0'
//     if (cleanValue.startsWith("0") && prefix) {
//       cleanValue = cleanValue.slice(1)
//     }
//     setFormData((prev) => ({
//       ...prev,
//       phone: prefix + cleanValue,
//     }))
//   }

//   const handleCountryChange = (countryCode: string) => {
//     const country = updatedCountriesList.find((c) => c.code === countryCode)
//     const prefix = country?.prefix || ""
//     const currentPhone = formData.phone.replace(prefix, "").replace(/\D/g, "")

//     setFormData((prev) => ({
//       ...prev,
//       country: countryCode,
//       phone: prefix + currentPhone,
//     }))
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev }
//       delete newErrors.country
//       delete newErrors.phone
//       return newErrors
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (step === 3) {
//       setIsSubmitting(true)
//       setSubmissionError(null)

//       const formDataObj = new FormData()
//       Object.entries(formData).forEach(([key, value]) => {
//         if (Array.isArray(value)) {
//           value.forEach((item) => formDataObj.append(key, item))
//         } else {
//           formDataObj.append(key, value.toString())
//         }
//       })

//       if (utmSource) formDataObj.append("utmSource", utmSource)
//       if (utmMedium) formDataObj.append("utmMedium", utmMedium)
//       if (utmCampaign) formDataObj.append("utmCampaign", utmCampaign)
//       formDataObj.append("emailVerified", isEmailVerified.toString())

//       // Use parrainId from props or URL
//       const effectiveParrainId = parrainId || urlParrainId
//       if (effectiveParrainId) {
//         formDataObj.append("parrainId", effectiveParrainId)
//       }

//       try {
//         const result = await registerBusiness(formDataObj)
//         if (result.success) {
//           setIsSuccess(true)
//           setTimeout(() => {
//             router.push(result.redirectTo || "/register/success")
//           }, 3000)
//         } else {
//           setSubmissionError(result.error || "Une erreur est survenue lors de l'inscription.")
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error)
//         setSubmissionError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
//       } finally {
//         setIsSubmitting(false)
//       }
//     }
//   }

//   const nextStep = async () => {
//     if (step === 1) {
//       const isValid = validateStep1()
//       if (!isValid) return
//       handlePhoneBlur()
//       if (Object.keys(validationErrors).length === 0) {
//         setStep(2)
//       }
//     } else if (step === 2 && isEmailVerified) {
//       setStep(3)
//     }
//   }

//   const prevStep = () => {
//     if (step > 1) {
//       setStep(step - 1)
//     }
//   }

//   const handleEmailVerified = () => {
//     setIsEmailVerified(true)
//     setTimeout(() => {
//       setStep(3)
//     }, 1000)
//   }

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   }

//   const renderProgressSteps = () => {
//     const steps = [
//       { number: 1, title: "Identité", icon: <User className="h-5 w-5" /> },
//       { number: 2, title: "Validation", icon: <Mail className="h-5 w-5" /> },
//       { number: 3, title: "Profil", icon: <Building2 className="h-5 w-5" /> },
//     ]

//     return (
//       <div className="mb-6">
//         <div className="flex items-center justify-between relative">
//           <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
//           {steps.map((item) => (
//             <div key={item.number} className="flex flex-col items-center z-10 relative">
//               <motion.div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
//                   step >= item.number
//                     ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md"
//                     : "bg-white border-2 border-gray-200 text-gray-400"
//                 }`}
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {step > item.number ? <Check className="h-6 w-6" /> : item.icon}
//               </motion.div>
//               <span className={`text-xs font-medium ${step >= item.number ? "text-indigo-700" : "text-gray-500"}`}>
//                 {item.title}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   const RequiredLabel = ({
//     htmlFor,
//     children,
//     tooltip,
//   }: { htmlFor: string; children: React.ReactNode; tooltip?: string }) => (
//     <div className="flex items-center">
//       <Label htmlFor={htmlFor} className="flex items-center text-sm font-semibold text-gray-700">
//         {children} <span className="text-red-500 ml-1">*</span>
//       </Label>
//       {tooltip && (
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
//             </TooltipTrigger>
//             <TooltipContent>
//               <p className="max-w-xs text-xs">{tooltip}</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       )}
//     </div>
//   )

//   const ErrorMessage = ({ message }: { message: string }) => (
//     <div className="flex items-center mt-1 text-sm text-red-500">
//       <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
//       <span>{message}</span>
//     </div>
//   )

//   return (
//     <form onSubmit={handleSubmit} className="py-6 px-8">
//       {renderProgressSteps()}

//       {isSuccess ? (
//         <motion.div
//           className="flex flex-col items-center justify-center space-y-4 text-center"
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//         >
//           <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
//             <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inscription réussie !</h3>
//           <p className="text-gray-600 dark:text-gray-300">
//             Merci pour votre inscription. Vous serez redirigé vers la page de confirmation.
//           </p>
//         </motion.div>
//       ) : (
//         <>
//           {submissionError && (
//             <motion.div
//               className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center"
//               initial="hidden"
//               animate="visible"
//               variants={fadeInUp}
//             >
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
//               <p className="text-sm text-red-500">{submissionError}</p>
//             </motion.div>
//           )}

//           {step === 1 && (
//             <motion.div className="space-y-5" initial="hidden" animate="visible" variants={fadeInUp}>
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations personnelles</h3>
//                 <p className="text-gray-500 text-sm">
//                   Commençons par quelques informations de base vous concernant.
//                   <span className="text-red-500 ml-1">*</span>
//                   <span className="italic text-xs ml-1">Champs obligatoires</span>
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <RequiredLabel htmlFor="firstName">Prénom</RequiredLabel>
//                   <Input
//                     id="firstName"
//                     name="firstName"
//                     required
//                     value={formData.firstName}
//                     onChange={(e) => {
//                       setFormData({ ...formData, firstName: e.target.value })
//                       setValidationErrors((prev) => {
//                         const newErrors = { ...prev }
//                         delete newErrors.firstName
//                         return newErrors
//                       })
//                     }}
//                     onBlur={() => {
//                       if (!formData.firstName) {
//                         setValidationErrors((prev) => ({ ...prev, firstName: "Le prénom est requis" }))
//                       }
//                     }}
//                     className={cn(
//                       "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
//                       validationErrors.firstName && "border-red-500 focus:ring-red-100",
//                     )}
//                   />
//                   {validationErrors.firstName && <ErrorMessage message={validationErrors.firstName} />}
//                 </div>
//                 <div className="space-y-2">
//                   <RequiredLabel htmlFor="lastName">Nom</RequiredLabel>
//                   <Input
//                     id="lastName"
//                     name="lastName"
//                     required
//                     value={formData.lastName}
//                     onChange={(e) => {
//                       setFormData({ ...formData, lastName: e.target.value })
//                       setValidationErrors((prev) => {
//                         const newErrors = { ...prev }
//                         delete newErrors.lastName
//                         return newErrors
//                       })
//                     }}
//                     onBlur={() => {
//                       if (!formData.lastName) {
//                         setValidationErrors((prev) => ({ ...prev, lastName: "Le nom est requis" }))
//                       }
//                     }}
//                     className={cn(
//                       "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
//                       validationErrors.lastName && "border-red-500 focus:ring-red-100",
//                     )}
//                   />
//                   {validationErrors.lastName && <ErrorMessage message={validationErrors.lastName} />}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel
//                   htmlFor="email"
//                   tooltip="Utilisez une adresse email professionnelle valide. Elle sera vérifiée à l'étape suivante."
//                 >
//                   Email professionnel
//                 </RequiredLabel>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className={cn(
//                       "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
//                       validationErrors.email && "border-red-500 focus:ring-red-100",
//                     )}
//                   />
//                   {isCheckingEmail && (
//                     <Loader2 className="absolute right-3 top-3.5 text-indigo-500 animate-spin" size={18} />
//                   )}
//                 </div>
//                 {validationErrors.email && <ErrorMessage message={validationErrors.email} />}
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel htmlFor="country">Pays</RequiredLabel>
//                 <CountrySelector
//                   value={formData.country}
//                   onChange={handleCountryChange}
//                   onPrefixChange={(prefix) => setFormData((prev) => ({ ...prev, phone: prefix }))}
//                   error={validationErrors.country}
//                 />
//                 {validationErrors.country && <ErrorMessage message={validationErrors.country} />}
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel
//                   htmlFor="phone"
//                   tooltip="Le format du numéro dépend du pays sélectionné. Vous pouvez commencer par le préfixe international (+) ou par 0."
//                 >
//                   Téléphone de l'entreprise
//                 </RequiredLabel>
//                 <div
//                   className={cn(
//                     "flex items-center rounded-lg border border-gray-300 bg-white h-12 overflow-hidden",
//                     validationErrors.phone
//                       ? "border-red-500"
//                       : "focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100",
//                   )}
//                 >
//                   <PhoneInputWithFlag
//                     country={updatedCountriesList.find((c) => c.code === formData.country)?.name || ""}
//                     flag={updatedCountriesList.find((c) => c.code === formData.country)?.flag || ""}
//                     prefix={updatedCountriesList.find((c) => c.code === formData.country)?.prefix || ""}
//                   />
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     required
//                     value={
//                       formData.country &&
//                       formData.phone.startsWith(
//                         updatedCountriesList.find((c) => c.code === formData.country)?.prefix || "",
//                       )
//                         ? formData.phone.replace(
//                             updatedCountriesList.find((c) => c.code === formData.country)?.prefix || "",
//                             "",
//                           )
//                         : formData.phone
//                     }
//                     onChange={handlePhoneChange}
//                     onBlur={handlePhoneBlur}
//                     placeholder="Numéro de téléphone"
//                     className={cn(
//                       "flex-1 border-0 rounded-r-lg h-full pl-2 pr-2 focus-visible:ring-0 focus-visible:ring-offset-0",
//                       validationErrors.phone && "text-red-600",
//                     )}
//                   />
//                   {isCheckingPhone && (
//                     <Loader2 className="absolute right-3 top-3.5 text-indigo-500 animate-spin" size={18} />
//                   )}
//                 </div>
//                 {validationErrors.phone ? (
//                   <ErrorMessage message={validationErrors.phone} />
//                 ) : (
//                   formData.country && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       {updatedCountriesList.find((c) => c.code === formData.country)?.example || "Format international"}
//                     </p>
//                   )
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel htmlFor="companyName">Nom de l'entreprise</RequiredLabel>
//                 <Input
//                   id="companyName"
//                   name="companyName"
//                   required
//                   value={formData.companyName}
//                   onChange={(e) => {
//                     setFormData({ ...formData, companyName: e.target.value })
//                     setValidationErrors((prev) => {
//                       const newErrors = { ...prev }
//                       delete newErrors.companyName
//                       return newErrors
//                     })
//                   }}
//                   onBlur={() => {
//                     if (!formData.companyName) {
//                       setValidationErrors((prev) => ({ ...prev, companyName: "Le nom de l'entreprise est requis" }))
//                     }
//                   }}
//                   className={cn(
//                     "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
//                     validationErrors.companyName && "border-red-500 focus:ring-red-100",
//                   )}
//                 />
//                 {validationErrors.companyName && <ErrorMessage message={validationErrors.companyName} />}
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel htmlFor="city">Ville (Siège social)</RequiredLabel>
//                 <Input
//                   id="city"
//                   name="city"
//                   required
//                   placeholder="Ex: Paris"
//                   value={formData.city}
//                   onChange={(e) => {
//                     setFormData({ ...formData, city: e.target.value })
//                     setValidationErrors((prev) => {
//                       const newErrors = { ...prev }
//                       delete newErrors.city
//                       return newErrors
//                     })
//                   }}
//                   onBlur={() => {
//                     if (!formData.city) {
//                       setValidationErrors((prev) => ({ ...prev, city: "La ville est requise" }))
//                     }
//                   }}
//                   className={cn(
//                     "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
//                     validationErrors.city && "border-red-500 focus:ring-red-100",
//                   )}
//                 />
//                 {validationErrors.city && <ErrorMessage message={validationErrors.city} />}
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel htmlFor="companySize">Taille de l'entreprise</RequiredLabel>
//                 <Select
//                   name="companySize"
//                   value={formData.companySize}
//                   onValueChange={(value) => {
//                     setFormData({ ...formData, companySize: value })
//                     setValidationErrors((prev) => {
//                       const newErrors = { ...prev }
//                       delete newErrors.companySize
//                       return newErrors
//                     })
//                   }}
//                   required
//                 >
//                   <SelectTrigger
//                     className={cn(
//                       "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
//                       validationErrors.companySize && "border-red-500 focus:ring-red-100",
//                     )}
//                   >
//                     <SelectValue placeholder="Sélectionnez la taille" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="STARTUP">Startup</SelectItem>
//                     <SelectItem value="PME">PME</SelectItem>
//                     <SelectItem value="GRANDE_ENTREPRISE">Grande entreprise</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {validationErrors.companySize && <ErrorMessage message={validationErrors.companySize} />}
//               </div>

//               <div className="mt-8">
//                 <Button
//                   type="button"
//                   onClick={nextStep}
//                   className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
//                   disabled={!isStep1Valid || isCheckingPhone || isCheckingEmail}
//                 >
//                   {isCheckingPhone || isCheckingEmail ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Vérification...
//                     </>
//                   ) : (
//                     <>
//                       Continuer <ArrowRight className="ml-2 h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </motion.div>
//           )}

//           {step === 2 && (
//             <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
//               <div className="mb-6 text-center">
//                 <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Mail className="h-8 w-8 text-indigo-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">Vérification d'email</h3>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Nous devons vérifier votre adresse email avant de continuer
//                 </p>
//               </div>

//               <EmailVerification email={formData.email} onVerified={handleEmailVerified} onBack={prevStep} />

//               {isEmailVerified && (
//                 <div className="flex items-center justify-center mt-4 text-green-600">
//                   <CheckCircle2 className="h-5 w-5 mr-2" />
//                   <span>Email vérifié avec succès!</span>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {step === 3 && (
//             <motion.div className="space-y-5" initial="hidden" animate="visible" variants={fadeInUp}>
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Profil entreprise</h3>
//                 <p className="text-gray-500 text-sm">
//                   Parlez-nous un peu plus de votre entreprise.
//                   <span className="text-red-500 ml-1">*</span>
//                   <span className="italic text-xs ml-1">Champs obligatoires</span>
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <RequiredLabel htmlFor="sector">Secteur d'activité</RequiredLabel>
//                 <Select
//                   name="sector"
//                   value={formData.sector}
//                   onValueChange={(value) => setFormData({ ...formData, sector: value })}
//                   required
//                 >
//                   <SelectTrigger className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200">
//                     <SelectValue placeholder="Sélectionnez votre secteur" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="TECHNOLOGIE">Technologie</SelectItem>
//                     <SelectItem value="AGRO_HALIEUTIQUE">Agro-Halieutique</SelectItem>
//                     <SelectItem value="COMMERCE">Commerce</SelectItem>
//                     <SelectItem value="FINANCE">Finance</SelectItem>
//                     <SelectItem value="SANTE">Santé</SelectItem>
//                     <SelectItem value="ÉNERGIE_DURABILITE">Énergie & Durabilité</SelectItem>
//                     <SelectItem value="TRANSPORT">Transport</SelectItem>
//                     <SelectItem value="INDUSTRIE">Industrie</SelectItem>
//                     <SelectItem value="COMMERCE_DISTRIBUTION">Commerce & Distribution</SelectItem>
//                     <SelectItem value="SERVICES_PROFESSIONNELS">Services Professionnels</SelectItem>
//                     <SelectItem value="EDUCATION">Éducation</SelectItem>
//                     <SelectItem value="TOURISME">Tourisme</SelectItem>
//                     <SelectItem value="MEDIA_DIVERTISSEMENT">Média & Divertissement</SelectItem>
//                     <SelectItem value="AUTRE">Autre</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {formData.sector === "AUTRE" && (
//                 <div className="space-y-2">
//                   <RequiredLabel htmlFor="otherSector">Précisez votre secteur</RequiredLabel>
//                   <Input
//                     id="otherSector"
//                     name="otherSector"
//                     required
//                     value={formData.otherSector}
//                     onChange={(e) => setFormData({ ...formData, otherSector: e.target.value })}
//                     placeholder="Veuillez préciser votre secteur d'activité"
//                     className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
//                   />
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <RequiredLabel
//                   htmlFor="mainNeed"
//                   tooltip="Sélectionnez le besoin principal qui correspond le mieux à vos objectifs actuels."
//                 >
//                   Besoin principal
//                 </RequiredLabel>
//                 <Select
//                   name="mainNeed"
//                   value={formData.mainNeed}
//                   onValueChange={(value) => setFormData({ ...formData, mainNeed: value })}
//                   required
//                 >
//                   <SelectTrigger className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200">
//                     <SelectValue placeholder="Dites-nous en plus sur vos besoins !" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="PRESENTATION_MARQUE">Présenter votre marque, votre vitrine</SelectItem>
//                     <SelectItem value="RESEAU_B2B">Développer votre réseau B2B</SelectItem>
//                     <SelectItem value="TALENTS_QUALIFIES">Attirer des talents qualifiés grâce au matching</SelectItem>
//                     <SelectItem value="TABLEAUX_BORD">
//                       Suivre vos performances via des tableaux de bord analytiques
//                     </SelectItem>
//                     <SelectItem value="INSIGHTS_SECTORIELS">
//                       Accéder à des insights sectoriels et des rapports de tendances
//                     </SelectItem>
//                     <SelectItem value="OFFRES_EMPLOI">
//                       Accéder aux offres d'emploi disponibles sur la plateforme
//                     </SelectItem>
//                     <SelectItem value="MENTORS_SECTORIELS">Être mis en relation avec des mentors sectoriels</SelectItem>
//                     <SelectItem value="FREELANCE_HUB">
//                       Accéder au Freelance & Consulting Hub pour publier des missions
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="companyWebsite">Site web de l'entreprise (optionnel)</Label>
//                 <Input
//                   id="companyWebsite"
//                   name="companyWebsite"
//                   placeholder="https://example.com"
//                   value={formData.companyWebsite}
//                   onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
//                   className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="companyDescription">Description de l'entreprise (optionnel)</Label>
//                 <Textarea
//                   id="companyDescription"
//                   name="companyDescription"
//                   placeholder="Une brève description de votre entreprise et de ses activités"
//                   className="min-h-[80px] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition-all duration-200"
//                   value={formData.companyDescription}
//                   onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="companyFoundingYear">Année de fondation (optionnel)</Label>
//                 <Input
//                   id="companyFoundingYear"
//                   name="companyFoundingYear"
//                   placeholder="Ex: 2010"
//                   value={formData.companyFoundingYear}
//                   onChange={(e) => setFormData({ ...formData, companyFoundingYear: e.target.value })}
//                   className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
//                 />
//               </div>

//               <div className="space-y-3">
//                 <Label>Besoins additionnels (optionnel)</Label>
//                 <div className="grid sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
//                   {[
//                     {
//                       id: "need-brand",
//                       value: "PRESENTATION_MARQUE",
//                       label: "Présentation de marque",
//                       desc: "Augmentez votre visibilité",
//                     },
//                     { id: "need-b2b", value: "RESEAU_B2B", label: "Réseau B2B", desc: "Développez vos partenariats" },
//                     {
//                       id: "need-recruitment",
//                       value: "TALENTS_QUALIFIES",
//                       label: "Talents qualifiés",
//                       desc: "Recrutez les meilleurs",
//                     },
//                     {
//                       id: "need-analytics",
//                       value: "TABLEAUX_BORD",
//                       label: "Tableaux de bord",
//                       desc: "Suivez vos performances",
//                     },
//                     {
//                       id: "need-insights",
//                       value: "INSIGHTS_SECTORIELS",
//                       label: "Insights sectoriels",
//                       desc: "Accédez aux tendances",
//                     },
//                     {
//                       id: "need-mentoring",
//                       value: "MENTORS_SECTORIELS",
//                       label: "Mentors sectoriels",
//                       desc: "Bénéficiez d'expertise",
//                     },
//                     {
//                       id: "need-freelance",
//                       value: "FREELANCE_HUB",
//                       label: "Freelance Hub",
//                       desc: "Publiez des missions",
//                     },
//                   ].map((need) => (
//                     <div key={need.id} className="flex items-start space-x-2">
//                       <Checkbox
//                         id={need.id}
//                         className="mt-1 border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded"
//                         checked={formData.companyNeeds.includes(need.value)}
//                         onCheckedChange={(checked) => handleNeedChange(need.value, checked as boolean)}
//                       />
//                       <div>
//                         <Label htmlFor={need.id} className="font-medium text-gray-700">
//                           {need.label}
//                         </Label>
//                         <p className="text-xs text-gray-500">{need.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="companyChallenges">Défis actuels de votre entreprise (optionnel)</Label>
//                 <Textarea
//                   id="companyChallenges"
//                   name="companyChallenges"
//                   placeholder="Quels sont les principaux défis auxquels votre entreprise fait face actuellement?"
//                   className="min-h-[80px] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition-all duration-200"
//                   value={formData.companyChallenges}
//                   onChange={(e) => setFormData({ ...formData, companyChallenges: e.target.value })}
//                 />
//               </div>

//               <div className="flex items-center space-x-2 mt-4">
//                 <Checkbox
//                   id="subscribedToNewsletter"
//                   checked={formData.subscribedToNewsletter}
//                   onCheckedChange={(checked) =>
//                     setFormData({ ...formData, subscribedToNewsletter: checked as boolean })
//                   }
//                   className="border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded"
//                 />
//                 <Label htmlFor="subscribedToNewsletter" className="text-sm text-gray-600">
//                   Je souhaite recevoir des informations sur les événements et opportunités
//                 </Label>
//               </div>

//               <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={prevStep}
//                   className="order-1 sm:order-none border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
//                 >
//                   Retour
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting || !validateStep3()}
//                   className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg shadow-md transition-all duration-300 font-semibold text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Traitement...
//                     </>
//                   ) : (
//                     "Finaliser l'inscription"
//                   )}
//                 </Button>
//               </div>
//             </motion.div>
//           )}
//         </>
//       )}
//     </form>
//   )
// }
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { registerBusiness } from "@/app/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Loader2, CheckCircle2, Building2, User, Mail, Check, AlertCircle, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import EmailVerification from "@/components/email-verification"
import { motion } from "framer-motion"
import { updatedCountriesList, isValidEmail, isValidPhoneForCountry } from "@/lib/form-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSearchParams } from "next/navigation"
import CountrySelector from "@/components/country-selector"
import PhoneInputWithFlag from "@/components/phone-input-with-flag"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

interface BusinessFormProps {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  onStepChange?: (step: number) => void
  parrainId?: string
}

export default function BusinessForm({
  utmSource,
  utmMedium,
  utmCampaign,
  onStepChange,
  parrainId,
}: BusinessFormProps) {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlParrainId = searchParams.get("ref")

  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCheckingPhone, setIsCheckingPhone] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [isStep1Valid, setIsStep1Valid] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    city: "",
    country: "",
    companySize: "",
    sector: "",
    otherSector: "",
    mainNeed: "",
    companyNeeds: [] as string[],
    companyChallenges: "",
    companyDescription: "",
    companyWebsite: "",
    companyFoundingYear: "",
    subscribedToNewsletter: false,
    referralSource: "",
  })

  const [validationErrors, setValidationErrors] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    companyName?: string
    city?: string
    country?: string
    companySize?: string
  }>({})

  const debouncedEmail = useDebounce(formData.email, 500)
  const debouncedPhone = useDebounce(formData.phone, 500)

  // Validate email on change
  useEffect(() => {
    if (formData.email && !isValidEmail(formData.email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Veuillez entrer une adresse email valide",
      }))
    } else {
      setValidationErrors((prev) => {
        const { email, ...rest } = prev
        return rest
      })
    }
  }, [formData.email])

  // Validate phone on change
  useEffect(() => {
    if (formData.phone && formData.country) {
      if (!isValidPhoneForCountry(formData.phone, formData.country)) {
        const country = updatedCountriesList.find((c) => c.code === formData.country)
        setValidationErrors((prev) => ({
          ...prev,
          phone: `Format invalide. Exemple: ${country?.example || ""}`,
        }))
      } else {
        setValidationErrors((prev) => {
          const { phone, ...rest } = prev
          return rest
        })
      }
    }
  }, [formData.phone, formData.country])

  // Check email uniqueness
  useEffect(() => {
    const checkEmailUniqueness = async () => {
      if (debouncedEmail && isValidEmail(debouncedEmail)) {
        setIsCheckingEmail(true)
        try {
          const response = await fetch("/api/check-unique", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ field: "email", value: debouncedEmail }),
          })

          const data = await response.json()

          if (!data.isUnique) {
            setValidationErrors((prev) => ({
              ...prev,
              email: data.message,
            }))
          }
        } catch (error) {
          console.error("Error checking email uniqueness:", error)
        } finally {
          setIsCheckingEmail(false)
        }
      }
    }

    checkEmailUniqueness()
  }, [debouncedEmail])

  // Check phone uniqueness
  useEffect(() => {
    const checkPhoneUniqueness = async () => {
      if (debouncedPhone && formData.country && isValidPhoneForCountry(debouncedPhone, formData.country)) {
        setIsCheckingPhone(true)
        try {
          const response = await fetch("/api/check-unique", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ field: "phone", value: debouncedPhone }),
          })

          const data = await response.json()

          if (!data.isUnique) {
            setValidationErrors((prev) => ({
              ...prev,
              phone: data.message,
            }))
          }
        } catch (error) {
          console.error("Error checking phone uniqueness:", error)
        } finally {
          setIsCheckingPhone(false)
        }
      }
    }

    checkPhoneUniqueness()
  }, [debouncedPhone, formData.country])

  // Update step change callback
  useEffect(() => {
    if (onStepChange) {
      onStepChange(step)
    }
  }, [step, onStepChange])

  // Validate Step 1 whenever formData or validationErrors change
  useEffect(() => {
    const requiredFields = ["firstName", "lastName", "email", "phone", "companyName", "city", "country", "companySize"]
    const hasMissingFields = requiredFields.some((field) => !formData[field as keyof typeof formData])
    const hasValidationErrors = Object.keys(validationErrors).length > 0
    setIsStep1Valid(!hasMissingFields && !hasValidationErrors)
  }, [formData, validationErrors])

  const handleNeedChange = (need: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, companyNeeds: [...prev.companyNeeds, need] }
      } else {
        return { ...prev, companyNeeds: prev.companyNeeds.filter((n) => n !== need) }
      }
    })
  }

  const validateStep1 = () => {
    const requiredFields = ["firstName", "lastName", "email", "phone", "companyName", "city", "country", "companySize"]
    const newErrors: Record<string, string> = {}

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() +
          field
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()
        } est requis`
      }
    })

    setValidationErrors((prev) => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0 && Object.keys(validationErrors).length === 0
  }

  const validateStep3 = () => {
    const requiredFields = ["sector", "mainNeed"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])
    if (formData.sector === "AUTRE" && !formData.otherSector) {
      return false
    }
    return missingFields.length === 0
  }

  const handlePhoneBlur = () => {
    const phone = formData.phone.trim()
    if (!phone) {
      setValidationErrors((prev) => ({ ...prev, phone: "Le numéro de téléphone est requis" }))
      return
    }

    if (formData.country && !isValidPhoneForCountry(phone, formData.country)) {
      const country = updatedCountriesList.find((c) => c.code === formData.country)
      setValidationErrors((prev) => ({
        ...prev,
        phone: `Format invalide. Exemple: ${country?.example || ""}`,
      }))
      return
    }

    setValidationErrors((prev) => {
      const { phone, ...rest } = prev
      return rest
    })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const country = updatedCountriesList.find((c) => c.code === formData.country)
    const prefix = country?.prefix || ""

    // Remove prefix if present to avoid duplication
    let cleanValue = value.replace(prefix, "").replace(/\D/g, "") // Remove non-digits
    // If the input starts with '0' and we're adding a prefix, remove the leading '0'
    if (cleanValue.startsWith("0") && prefix) {
      cleanValue = cleanValue.slice(1)
    }
    setFormData((prev) => ({
      ...prev,
      phone: prefix + cleanValue,
    }))
  }

  const handleCountryChange = (countryCode: string) => {
    const country = updatedCountriesList.find((c) => c.code === countryCode)
    const prefix = country?.prefix || ""
    const currentPhone = formData.phone.replace(prefix, "").replace(/\D/g, "")

    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      phone: prefix + currentPhone,
    }))
    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.country
      delete newErrors.phone
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step === 3) {
      setIsSubmitting(true)
      setSubmissionError(null)

      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formDataObj.append(key, item))
        } else {
          formDataObj.append(key, value.toString())
        }
      })

      if (utmSource) formDataObj.append("utmSource", utmSource)
      if (utmMedium) formDataObj.append("utmMedium", utmMedium)
      if (utmCampaign) formDataObj.append("utmCampaign", utmCampaign)
      formDataObj.append("emailVerified", isEmailVerified.toString())

      // Use parrainId from props or URL
      const effectiveParrainId = parrainId || urlParrainId
      if (effectiveParrainId) {
        formDataObj.append("parrainId", effectiveParrainId)
      }

      try {
        const result = await registerBusiness(formDataObj)
        if (result.success) {
          setIsSuccess(true)
          setTimeout(() => {
            router.push(result.redirectTo || "/register/success")
          }, 3000)
        } else {
          setSubmissionError(result.error || "Une erreur est survenue lors de l'inscription.")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setSubmissionError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const nextStep = async () => {
    if (step === 1) {
      const isValid = validateStep1()
      if (!isValid) return
      handlePhoneBlur()
      if (Object.keys(validationErrors).length === 0) {
        setStep(2)
      }
    } else if (step === 2 && isEmailVerified) {
      setStep(3)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleEmailVerified = () => {
    setIsEmailVerified(true)
    setTimeout(() => {
      setStep(3)
    }, 1000)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const renderProgressSteps = () => {
    const steps = [
      { number: 1, title: "Identité", icon: <User className="h-5 w-5" /> },
      { number: 2, title: "Validation", icon: <Mail className="h-5 w-5" /> },
      { number: 3, title: "Profil", icon: <Building2 className="h-5 w-5" /> },
    ]

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          {steps.map((item) => (
            <div key={item.number} className="flex flex-col items-center z-10 relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  step >= item.number
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-400"
                }`}
              >
                {step > item.number ? <Check className="h-6 w-6" /> : item.icon}
              </div>
              <span className={`text-xs font-medium ${step >= item.number ? "text-indigo-700" : "text-gray-500"}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const RequiredLabel = ({
    htmlFor,
    children,
    tooltip,
  }: { htmlFor: string; children: React.ReactNode; tooltip?: string }) => (
    <div className="flex items-center">
      <Label htmlFor={htmlFor} className="flex items-center text-sm font-semibold text-gray-700">
        {children} <span className="text-red-500 ml-1">*</span>
      </Label>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center mt-1 text-sm text-red-500">
      <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="py-6 px-8">
      {renderProgressSteps()}

      {isSuccess ? (
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inscription réussie !</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Merci pour votre inscription. Vous serez redirigé vers la page de confirmation.
          </p>
        </motion.div>
      ) : (
        <>
          {submissionError && (
            <motion.div
              className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-500">{submissionError}</p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div className="space-y-5" initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations personnelles</h3>
                <p className="text-gray-500 text-sm">
                  Commençons par quelques informations de base vous concernant.
                  <span className="text-red-500 ml-1">*</span>
                  <span className="italic text-xs ml-1">Champs obligatoires</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <RequiredLabel htmlFor="firstName">Prénom</RequiredLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value })
                      setValidationErrors((prev) => {
                        const newErrors = { ...prev }
                        delete newErrors.firstName
                        return newErrors
                      })
                    }}
                    onBlur={() => {
                      if (!formData.firstName) {
                        setValidationErrors((prev) => ({ ...prev, firstName: "Le prénom est requis" }))
                      }
                    }}
                    className={cn(
                      "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
                      validationErrors.firstName && "border-red-500 focus:ring-red-100",
                    )}
                  />
                  {validationErrors.firstName && <ErrorMessage message={validationErrors.firstName} />}
                </div>
                <div className="space-y-2">
                  <RequiredLabel htmlFor="lastName">Nom</RequiredLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value })
                      setValidationErrors((prev) => {
                        const newErrors = { ...prev }
                        delete newErrors.lastName
                        return newErrors
                      })
                    }}
                    onBlur={() => {
                      if (!formData.lastName) {
                        setValidationErrors((prev) => ({ ...prev, lastName: "Le nom est requis" }))
                      }
                    }}
                    className={cn(
                      "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
                      validationErrors.lastName && "border-red-500 focus:ring-red-100",
                    )}
                  />
                  {validationErrors.lastName && <ErrorMessage message={validationErrors.lastName} />}
                </div>
              </div>

              <div className="space-y-2">
                <RequiredLabel
                  htmlFor="email"
                  tooltip="Utilisez une adresse email professionnelle valide. Elle sera vérifiée à l'étape suivante."
                >
                  Email professionnel
                </RequiredLabel>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
                      validationErrors.email && "border-red-500 focus:ring-red-100",
                    )}
                  />
                  {isCheckingEmail && (
                    <Loader2 className="absolute right-3 top-3.5 text-indigo-500 animate-spin" size={18} />
                  )}
                </div>
                {validationErrors.email && <ErrorMessage message={validationErrors.email} />}
              </div>

              <div className="space-y-2">
                <RequiredLabel htmlFor="country">Pays</RequiredLabel>
                <CountrySelector
                  value={formData.country}
                  onChange={handleCountryChange}
                  onPrefixChange={(prefix) => setFormData((prev) => ({ ...prev, phone: prefix }))}
                  error={validationErrors.country}
                />
                {validationErrors.country && <ErrorMessage message={validationErrors.country} />}
              </div>

              <div className="space-y-2">
                <RequiredLabel
                  htmlFor="phone"
                  tooltip="Le format du numéro dépend du pays sélectionné. Vous pouvez commencer par le préfixe international (+) ou par 0."
                >
                  Téléphone de l'entreprise
                </RequiredLabel>
                <div
                  className={cn(
                    "flex items-center rounded-lg border border-gray-300 bg-white h-12 overflow-hidden",
                    validationErrors.phone
                      ? "border-red-500"
                      : "focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100",
                  )}
                >
                  <PhoneInputWithFlag
                    country={updatedCountriesList.find((c) => c.code === formData.country)?.name || ""}
                    flag={updatedCountriesList.find((c) => c.code === formData.country)?.flag || ""}
                    prefix={updatedCountriesList.find((c) => c.code === formData.country)?.prefix || ""}
                  />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={
                      formData.country &&
                      formData.phone.startsWith(
                        updatedCountriesList.find((c) => c.code === formData.country)?.prefix || "",
                      )
                        ? formData.phone.replace(
                            updatedCountriesList.find((c) => c.code === formData.country)?.prefix || "",
                            "",
                          )
                        : formData.phone
                    }
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    placeholder="Numéro de téléphone"
                    className={cn(
                      "flex-1 border-0 rounded-r-lg h-full pl-2 pr-2 focus-visible:ring-0 focus-visible:ring-offset-0",
                      validationErrors.phone && "text-red-600",
                    )}
                  />
                  {isCheckingPhone && (
                    <Loader2 className="absolute right-3 top-3.5 text-indigo-500 animate-spin" size={18} />
                  )}
                </div>
                {validationErrors.phone ? (
                  <ErrorMessage message={validationErrors.phone} />
                ) : (
                  formData.country && (
                    <p className="text-xs text-gray-500 mt-1">
                      {updatedCountriesList.find((c) => c.code === formData.country)?.example || "Format international"}
                    </p>
                  )
                )}
              </div>

              <div className="space-y-2">
                <RequiredLabel htmlFor="companyName">Nom de l'entreprise</RequiredLabel>
                <Input
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => {
                    setFormData({ ...formData, companyName: e.target.value })
                    setValidationErrors((prev) => {
                      const newErrors = { ...prev }
                      delete newErrors.companyName
                      return newErrors
                    })
                  }}
                  onBlur={() => {
                    if (!formData.companyName) {
                      setValidationErrors((prev) => ({ ...prev, companyName: "Le nom de l'entreprise est requis" }))
                    }
                  }}
                  className={cn(
                    "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
                    validationErrors.companyName && "border-red-500 focus:ring-red-100",
                  )}
                />
                {validationErrors.companyName && <ErrorMessage message={validationErrors.companyName} />}
              </div>

              <div className="space-y-2">
                <RequiredLabel htmlFor="city">Ville (Siège social)</RequiredLabel>
                <Input
                  id="city"
                  name="city"
                  required
                  placeholder="Ex: Paris"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value })
                    setValidationErrors((prev) => {
                      const newErrors = { ...prev }
                      delete newErrors.city
                      return newErrors
                    })
                  }}
                  onBlur={() => {
                    if (!formData.city) {
                      setValidationErrors((prev) => ({ ...prev, city: "La ville est requise" }))
                    }
                  }}
                  className={cn(
                    "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
                    validationErrors.city && "border-red-500 focus:ring-red-100",
                  )}
                />
                {validationErrors.city && <ErrorMessage message={validationErrors.city} />}
              </div>

              <div className="space-y-2">
                <RequiredLabel htmlFor="companySize">Taille de l'entreprise</RequiredLabel>
                <Select
                  name="companySize"
                  value={formData.companySize}
                  onValueChange={(value) => {
                    setFormData({ ...formData, companySize: value })
                    setValidationErrors((prev) => {
                      const newErrors = { ...prev }
                      delete newErrors.companySize
                      return newErrors
                    })
                  }}
                  required
                >
                  <SelectTrigger
                    className={cn(
                      "h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200",
                      validationErrors.companySize && "border-red-500 focus:ring-red-100",
                    )}
                  >
                    <SelectValue placeholder="Sélectionnez la taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STARTUP">Startup</SelectItem>
                    <SelectItem value="PME">PME</SelectItem>
                    <SelectItem value="GRANDE_ENTREPRISE">Grande entreprise</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.companySize && <ErrorMessage message={validationErrors.companySize} />}
              </div>

              <div className="mt-8">
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
                  disabled={!isStep1Valid || isCheckingPhone || isCheckingEmail}
                >
                  {isCheckingPhone || isCheckingEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    <>
                      Continuer <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Vérification d'email</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Nous devons vérifier votre adresse email avant de continuer
                </p>
              </div>

              <EmailVerification email={formData.email} onVerified={handleEmailVerified} onBack={prevStep} />

              {isEmailVerified && (
                <div className="flex items-center justify-center mt-4 text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span>Email vérifié avec succès!</span>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div className="space-y-5" initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profil entreprise</h3>
                <p className="text-gray-500 text-sm">
                  Parlez-nous un peu plus de votre entreprise.
                  <span className="text-red-500 ml-1">*</span>
                  <span className="italic text-xs ml-1">Champs obligatoires</span>
                </p>
              </div>

              <div className="space-y-2">
                <RequiredLabel htmlFor="sector">Secteur d'activité</RequiredLabel>
                <Select
                  name="sector"
                  value={formData.sector}
                  onValueChange={(value) => setFormData({ ...formData, sector: value })}
                  required
                >
                  <SelectTrigger className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200">
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TECHNOLOGIE">Technologie</SelectItem>
                    <SelectItem value="AGRO_HALIEUTIQUE">Agro-Halieutique</SelectItem>
                    <SelectItem value="COMMERCE">Commerce</SelectItem>
                    <SelectItem value="FINANCE">Finance</SelectItem>
                    <SelectItem value="SANTE">Santé</SelectItem>
                    <SelectItem value="ÉNERGIE_DURABILITE">Énergie & Durabilité</SelectItem>
                    <SelectItem value="TRANSPORT">Transport</SelectItem>
                    <SelectItem value="INDUSTRIE">Industrie</SelectItem>
                    <SelectItem value="COMMERCE_DISTRIBUTION">Commerce & Distribution</SelectItem>
                    <SelectItem value="SERVICES_PROFESSIONNELS">Services Professionnels</SelectItem>
                    <SelectItem value="EDUCATION">Éducation</SelectItem>
                    <SelectItem value="TOURISME">Tourisme</SelectItem>
                    <SelectItem value="MEDIA_DIVERTISSEMENT">Média & Divertissement</SelectItem>
                    <SelectItem value="AUTRE">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.sector === "AUTRE" && (
                <div className="space-y-2">
                  <RequiredLabel htmlFor="otherSector">Précisez votre secteur</RequiredLabel>
                  <Input
                    id="otherSector"
                    name="otherSector"
                    required
                    value={formData.otherSector}
                    onChange={(e) => setFormData({ ...formData, otherSector: e.target.value })}
                    placeholder="Veuillez préciser votre secteur d'activité"
                    className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                  />
                </div>
              )}

              <div className="space-y-2">
                <RequiredLabel
                  htmlFor="mainNeed"
                  tooltip="Sélectionnez le besoin principal qui correspond le mieux à vos objectifs actuels."
                >
                  Besoin principal
                </RequiredLabel>
                <Select
                  name="mainNeed"
                  value={formData.mainNeed}
                  onValueChange={(value) => setFormData({ ...formData, mainNeed: value })}
                  required
                >
                  <SelectTrigger className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200">
                    <SelectValue placeholder="Dites-nous en plus sur vos besoins !" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRESENTATION_MARQUE">Présenter votre marque, votre vitrine</SelectItem>
                    <SelectItem value="RESEAU_B2B">Développer votre réseau B2B</SelectItem>
                    <SelectItem value="TALENTS_QUALIFIES">Attirer des talents qualifiés grâce au matching</SelectItem>
                    <SelectItem value="TABLEAUX_BORD">
                      Suivre vos performances via des tableaux de bord analytiques
                    </SelectItem>
                    <SelectItem value="INSIGHTS_SECTORIELS">
                      Accéder à des insights sectoriels et des rapports de tendances
                    </SelectItem>
                    <SelectItem value="OFFRES_EMPLOI">
                      Accéder aux offres d'emploi disponibles sur la plateforme
                    </SelectItem>
                    <SelectItem value="MENTORS_SECTORIELS">Être mis en relation avec des mentors sectoriels</SelectItem>
                    <SelectItem value="FREELANCE_HUB">
                      Accéder au Freelance & Consulting Hub pour publier des missions
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Site web de l'entreprise (optionnel)</Label>
                <Input
                  id="companyWebsite"
                  name="companyWebsite"
                  placeholder="https://example.com"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                  className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyDescription">Description de l'entreprise (optionnel)</Label>
                <Textarea
                  id="companyDescription"
                  name="companyDescription"
                  placeholder="Une brève description de votre entreprise et de ses activités"
                  className="min-h-[80px] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition-all duration-200"
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyFoundingYear">Année de fondation (optionnel)</Label>
                <Input
                  id="companyFoundingYear"
                  name="companyFoundingYear"
                  placeholder="Ex: 2010"
                  value={formData.companyFoundingYear}
                  onChange={(e) => setFormData({ ...formData, companyFoundingYear: e.target.value })}
                  className="h-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <Label>Besoins additionnels (optionnel)</Label>
                <div className="grid sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {[
                    {
                      id: "need-brand",
                      value: "PRESENTATION_MARQUE",
                      label: "Présentation de marque",
                      desc: "Augmentez votre visibilité",
                    },
                    { id: "need-b2b", value: "RESEAU_B2B", label: "Réseau B2B", desc: "Développez vos partenariats" },
                    {
                      id: "need-recruitment",
                      value: "TALENTS_QUALIFIES",
                      label: "Talents qualifiés",
                      desc: "Recrutez les meilleurs",
                    },
                    {
                      id: "need-analytics",
                      value: "TABLEAUX_BORD",
                      label: "Tableaux de bord",
                      desc: "Suivez vos performances",
                    },
                    {
                      id: "need-insights",
                      value: "INSIGHTS_SECTORIELS",
                      label: "Insights sectoriels",
                      desc: "Accédez aux tendances",
                    },
                    {
                      id: "need-mentoring",
                      value: "MENTORS_SECTORIELS",
                      label: "Mentors sectoriels",
                      desc: "Bénéficiez d'expertise",
                    },
                    {
                      id: "need-freelance",
                      value: "FREELANCE_HUB",
                      label: "Freelance Hub",
                      desc: "Publiez des missions",
                    },
                  ].map((need) => (
                    <div key={need.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={need.id}
                        className="mt-1 border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded"
                        checked={formData.companyNeeds.includes(need.value)}
                        onCheckedChange={(checked) => handleNeedChange(need.value, checked as boolean)}
                      />
                      <div>
                        <Label htmlFor={need.id} className="font-medium text-gray-700">
                          {need.label}
                        </Label>
                        <p className="text-xs text-gray-500">{need.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyChallenges">Défis actuels de votre entreprise (optionnel)</Label>
                <Textarea
                  id="companyChallenges"
                  name="companyChallenges"
                  placeholder="Quels sont les principaux défis auxquels votre entreprise fait face actuellement?"
                  className="min-h-[80px] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition-all duration-200"
                  value={formData.companyChallenges}
                  onChange={(e) => setFormData({ ...formData, companyChallenges: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="subscribedToNewsletter"
                  checked={formData.subscribedToNewsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, subscribedToNewsletter: checked as boolean })
                  }
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded"
                />
                <Label htmlFor="subscribedToNewsletter" className="text-sm text-gray-600">
                  Je souhaite recevoir des informations sur les événements et opportunités
                </Label>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="order-1 sm:order-none border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
                >
                  Retour
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !validateStep3()}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg shadow-md transition-all duration-300 font-semibold text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    "Finaliser l'inscription"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </form>
  )
}


