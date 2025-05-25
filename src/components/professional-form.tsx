// // "use client";

// // import type React from "react";
// // import { useState, useEffect } from "react";
// // import { registerProfessional } from "@/app/action";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   ArrowRight,
// //   Loader2,
// //   CheckCircle2,
// //   AlertCircle,
// //   User,
// //   Mail,
// //   MapPin,
// //   Briefcase,
// //   Shield,
// // } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import EmailVerification from "@/components/email-verification";
// // import { z } from "zod";
// // import { toast } from "sonner";
// // import { emailSchema, phoneSchema, formatMoroccanPhone } from "@/utils/validation"; 
// // import { useSearchParams } from "next/navigation";
// // import CountrySelector from "@/components/country-selector-pro";
// // import { cn } from "@/lib/utils";
// // import "react-phone-number-input/style.css";
// // import PhoneInput from "react-phone-number-input";
// // import { CountryCode } from "libphonenumber-js";
// // import { Alert, AlertDescription } from "./ui/alert";

// // const formSchema = z.object({
// //   firstName: z.string().min(1, "Le prénom est requis"),
// //   lastName: z.string().min(1, "Le nom est requis"),
// //   email: emailSchema,
// //   phone: phoneSchema, // Utilisation de phoneSchema
// //   city: z.string().optional(),
// //   country: z.string().min(1, "Le pays est requis"),
// //   sector: z.string().min(1, "Sélectionnez un secteur"),
// //   professionalInterests: z.array(z.string()).optional(),
// //   professionalChallenges: z.string().optional(),
// //   subscribedToNewsletter: z.boolean().default(false),
// //   referralSource: z.string().optional(),
// //   parrainId: z.string().optional(),
// // });

// // interface ProfessionalFormProps {
// //   utmSource?: string;
// //   utmMedium?: string;
// //   utmCampaign?: string;
// //   parrainId?: string;
// //   onStepChange?: (step: number) => void;
// // }

// // export default function ProfessionalForm({
// //   utmSource,
// //   utmMedium,
// //   utmCampaign,
// //   parrainId,
// //   onStepChange,
// // }: ProfessionalFormProps) {
// //   const [step, setStep] = useState(1);
// //   const router = useRouter();
// //   const [isEmailVerified, setIsEmailVerified] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isCheckingEmail, setIsCheckingEmail] = useState(false);
// //   const [isCheckingPhone, setIsCheckingPhone] = useState(false);
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const searchParams = useSearchParams();
// //   const ref = searchParams.get("ref") || "";
// //   const [success, setSuccess] = useState<string | null>(null);

// //   const fetchCountries = async () => {
// //     try {
// //       const res = await fetch("https://restcountries.com/v3.1/all");
// //       const data = await res.json();
// //       const countryList = data.map((country: any) => ({
// //         name: country.translations?.fra?.common || country.name.common,
// //         code: country.cca2,
// //         prefix: country.idd.root + (country.idd.suffixes?.[0] || ""),
// //       }));
// //       return countryList.sort((a: any, b: any) => a.name.localeCompare(b.name));
// //     } catch (error) {
// //       console.error("Erreur lors du chargement des pays :", error);
// //       return [];
// //     }
// //   };

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     city: "",
// //     country: "Maroc",
// //     selectedCountryCode: "MA",
// //     sector: "",
// //     professionalInterests: [] as string[],
// //     professionalChallenges: "",
// //     subscribedToNewsletter: false,
// //     referralSource: "",
// //     parrainId: ref || parrainId || "",
// //   });
// //   type Country = {
// //     name: string;
// //     code: string;
// //     prefix: string;
// //   };

// //   const [countries, setCountries] = useState<Country[]>([]);

// //   useEffect(() => {
// //     const loadCountries = async () => {
// //       const data = await fetchCountries();
// //       setCountries(data);

// //       const defaultCountry = data.find(
// //         (c: { name: string }) => c.name === "Maroc"
// //       );
// //       if (defaultCountry) {
// //         setFormData((prev) => ({
// //           ...prev,
// //           country: defaultCountry.name,
// //           phone: defaultCountry.prefix,
// //         }));
// //       }
// //     };

// //     loadCountries();
// //   }, []);

// //   useEffect(() => {
// //     if (onStepChange) onStepChange(step);
// //   }, [step, onStepChange]);

// //   useEffect(() => {
// //     if (ref && !formData.referralSource) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         parrainId: ref,
// //         referralSource: "FRIEND",
// //       }));
// //     }
// //   }, [ref]);

// //   const checkUnique = async (field: string, value: string) => {
// //     try {
// //       const response = await fetch("/api/check-unique", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ field, value }),
// //       });

// //       const data = await response.json();

// //       if (!data.isUnique) {
// //         setErrors((prev) => ({ ...prev, [field]: data.message }));
// //         return false;
// //       } else {
// //         setErrors((prev) => {
// //           const newErrors = { ...prev };
// //           delete newErrors[field];
// //           return newErrors;
// //         });
// //         return true;
// //       }
// //     } catch (error) {
// //       console.error(
// //         `Erreur lors de la vérification de l'unicité du ${field}:`,
// //         error
// //       );
// //       toast.error("Erreur réseau", {
// //         description: "Impossible de vérifier l'unicité. Veuillez réessayer.",
// //       });
// //       return true;
// //     }
// //   };

// //   const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
// //     const email = e.target.value.trim();
// //     if (!email) {
// //       setErrors((prev) => ({ ...prev, email: "L'email est requis" }));
// //       return;
// //     }
// //     try {
// //       emailSchema.parse(email);
// //       setIsCheckingEmail(true);
// //       await checkUnique("email", email);
// //       setIsCheckingEmail(false);
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         setErrors((prev) => ({ ...prev, email: error.errors[0].message }));
// //       }
// //     }
// //   };

// //   const handleContinue = async () => {
// //     try {
// //       setIsCheckingEmail(true);
// //       const verificationToken = Math.floor(
// //         100000 + Math.random() * 900000
// //       ).toString();
// //       sessionStorage.setItem(
// //         `verification_${formData.email}`,
// //         verificationToken
// //       );

// //       const emailContent = {
// //         to: formData.email,
// //         subject: "Vérification de votre adresse email",
// //         html: `
// //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
// //           <h2 style="color: #2563eb;">Vérification de votre adresse email</h2>
// //           <p>Merci de votre inscription ! Voici votre code :</p>
// //           <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
// //             ${verificationToken}
// //           </div>
// //           <p>Ce code est valable pendant 10 minutes.</p>
// //         </div>
// //       `,
// //       };

// //       const response = await fetch("/api/send-email", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(emailContent),
// //       });
// //       setSuccess("Code de vérification envoyé à votre adresse email");

// //       if (!response.ok) throw new Error("Échec de l’envoi du code");

// //       setStep(2);
// //     } catch (error) {
// //       console.error("Erreur :", error);
// //       toast.error("Erreur lors de l’envoi de l’email de vérification.");
// //     } finally {
// //       setIsCheckingEmail(false);
// //     }
// //   };

// //   const handlePhoneBlur = async () => {
// //     let phone = formData.phone.trim();
// //     if (!phone) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         phone: "Le numéro de téléphone est requis",
// //       }));
// //       return false;
// //     }

// //     const selected = countries.find((c) => c.name === formData.country);
// //     const countryCode = selected?.code; // code ISO (ex: "FR", "MA")

// //     // Normalisation pour les numéros marocains si le pays est Maroc
// //     if (countryCode === "MA") {
// //       phone = formatMoroccanPhone(phone);
// //       setFormData((prev) => ({ ...prev, phone }));
// //     }

// //     // Validation avec phoneSchema
// //     try {
// //       phoneSchema.parse(phone);
// //       setErrors((prev) => {
// //         const newErrors = { ...prev };
// //         delete newErrors.phone;
// //         return newErrors;
// //       });
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         setErrors((prev) => ({
// //           ...prev,
// //           phone: error.errors[0].message,
// //         }));
// //         return false;
// //       }
// //     }

// //     // Vérification d'unicité
// //     setIsCheckingPhone(true);
// //     const isUnique = await checkUnique("phone", phone);
// //     setIsCheckingPhone(false);
// //     return isUnique;
// //   };

// //   const handlePhoneChange = (value?: string) => {
// //     setFormData((prev) => ({ ...prev, phone: value || "" }));
// //     if (!value) {
// //       setErrors((prev) => {
// //         const newErrors = { ...prev };
// //         delete newErrors.phone;
// //         return newErrors;
// //       });
// //     }
// //   };

// //   const validateStep = (stepToValidate: number) => {
// //     try {
// //       const partialSchema =
// //         stepToValidate === 1
// //           ? formSchema.pick({
// //               firstName: true,
// //               lastName: true,
// //               email: true,
// //               phone: true,
// //               country: true,
// //             })
// //           : stepToValidate === 3
// //           ? formSchema.pick({
// //               sector: true,
// //             })
// //           : z.object({});

// //       if (stepToValidate === 1) {
// //         // Normaliser le numéro pour le Maroc avant validation
// //         let phone = formData.phone;
// //         if (formData.country === "Maroc") {
// //           phone = formatMoroccanPhone(formData.phone);
// //         }
// //         partialSchema.parse({ ...formData, phone });
// //       } else if (stepToValidate === 3) {
// //         partialSchema.parse(formData);
// //       }

// //       if (stepToValidate === 1) {
// //         if (errors.email || errors.phone) {
// //           toast.error("Erreur de validation", {
// //             description:
// //               "Veuillez corriger les champs marqués en rouge avant de continuer",
// //           });
// //           return false;
// //         }
// //       }

// //       if (stepToValidate === 3) {
// //         if (!formData.sector) {
// //           setErrors((prev) => ({ ...prev, sector: "Sélectionnez un secteur" }));
// //           return false;
// //         }
// //         setErrors((prev) => {
// //           const newErrors = { ...prev };
// //           delete newErrors.professionalInterests;
// //           return newErrors;
// //         });
// //       }

// //       return true;
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         const newErrors: Record<string, string> = {};
// //         error.errors.forEach((err) => {
// //           if (err.path.length > 0) {
// //             newErrors[err.path[0]] = err.message;
// //           }
// //         });
// //         setErrors((prev) => ({ ...prev, ...newErrors }));
// //         toast.error("Erreur de validation", {
// //           description:
// //             "Veuillez corriger les champs marqués en rouge avant de continuer",
// //         });
// //       }
// //       return false;
// //     }
// //   };

// //   const handleInterestChange = (interest: string, checked: boolean) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       professionalInterests: checked
// //         ? [...prev.professionalInterests, interest]
// //         : prev.professionalInterests.filter((i) => i !== interest),
// //     }));
// //     setErrors((prev) => {
// //       const newErrors = { ...prev };
// //       delete newErrors.professionalInterests;
// //       return newErrors;
// //     });
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     if (!validateStep(step)) {
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     try {
// //       const dataToSend = {
// //         ...formData,
// //         professionalInterests: formData.professionalInterests || [],
// //       };

// //       const formDataObj = new FormData();
// //       Object.entries(dataToSend).forEach(([key, value]) => {
// //         if (key !== "professionalInterests") {
// //           formDataObj.append(key, String(value));
// //         }
// //       });
// //       if (
// //         dataToSend.professionalInterests &&
// //         dataToSend.professionalInterests.length > 0
// //       ) {
// //         dataToSend.professionalInterests.forEach((interest) => {
// //           formDataObj.append("professionalInterests", interest);
// //         });
// //       }
// //       formDataObj.append("parrainId", dataToSend.parrainId || "");

// //       const result = await registerProfessional(formDataObj);

// //       if (result.error) {
// //         if (result.field === "email") {
// //           setErrors((prev) => ({
// //             ...prev,
// //             email: result.error || "Cet email est déjà utilisé",
// //           }));
// //           toast.error("Email déjà utilisé", {
// //             description: result.error,
// //           });
// //         } else if (result.field === "phone") {
// //           setErrors((prev) => ({
// //             ...prev,
// //             phone: result.error || "Ce numéro est déjà utilisé",
// //           }));
// //           toast.error("Téléphone déjà utilisé", {
// //             description: result.error,
// //           });
// //         } else {
// //           toast.error("Erreur", {
// //             description: result.error || "Une erreur est survenue",
// //           });
// //         }
// //         setIsSubmitting(false);
// //       } else if (result.success) {
// //         if (result.redirectTo) {
// //           router.push(result.redirectTo);
// //         } else {
// //           toast.success("Inscription réussie", {
// //             description: "Votre compte a été créé avec succès.",
// //           });
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Erreur lors de l'inscription :", error);
// //       toast.error("Erreur", {
// //         description: "Une erreur inattendue est survenue. Veuillez réessayer.",
// //       });
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const renderProgressSteps = () => {
// //     const steps = [
// //       { number: 1, title: "Identité", icon: <User size={18} /> },
// //       { number: 2, title: "Vérification", icon: <Shield size={18} /> },
// //       { number: 3, title: "Profil", icon: <Briefcase size={18} /> },
// //     ];

// //     return (
// //       <div className="mb-12">
// //         <div className="flex items-center justify-between relative">
// //           {steps.map((stepItem) => (
// //             <div
// //               key={stepItem.number}
// //               className="flex flex-col items-center z-10"
// //             >
// //               <div
// //                 className={cn(
// //                   "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-500",
// //                   step >= stepItem.number
// //                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white scale-110"
// //                     : "bg-white border-gray-200 text-gray-400"
// //                 )}
// //               >
// //                 {step > stepItem.number ? (
// //                   <CheckCircle2
// //                     className="text-white animate-pulse"
// //                     size={20}
// //                   />
// //                 ) : (
// //                   stepItem.icon
// //                 )}
// //               </div>
// //               <span
// //                 className={cn(
// //                   "text-sm font-semibold mt-3 transition-colors duration-300",
// //                   step >= stepItem.number ? "text-gray-900" : "text-gray-500"
// //                 )}
// //               >
// //                 {stepItem.title}
// //               </span>
// //             </div>
// //           ))}
// //           <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-100 rounded-full">
// //             <div
// //               className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
// //               style={{ width: `${((step - 1) / 2) * 100}%` }}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const nextStep = async () => {
// //     if (!validateStep(step)) return;

// //     if (step === 1) {
// //       const isPhoneValid = await handlePhoneBlur();
// //       if (!isPhoneValid || errors.email || errors.phone) {
// //         toast.error("Erreur de validation", {
// //           description:
// //             "Veuillez corriger les champs marqués en rouge avant de continuer",
// //         });
// //         return;
// //       }
// //       setStep(2);
// //     } else if (step === 2) {
// //       if (isEmailVerified) {
// //         setStep(3);
// //       } else {
// //         toast.info("Vérification requise", {
// //           description: "Veuillez vérifier votre email avant de continuer",
// //         });
// //       }
// //     }
// //   };

// //   const handleEmailVerified = () => {
// //     setIsEmailVerified(true);
// //     toast.success("Email vérifié", {
// //       description: "Votre email a été vérifié avec succès",
// //     });
// //   };

// //   const prevStep = () => {
// //     setStep((prev) => Math.max(1, prev - 1));
// //   };

// //   const handleCountryChange = (countryName: string) => {
// //     const selected = countries.find((c) => c.name === countryName);
// //     if (!selected) return;

// //     setFormData((prev) => ({
// //       ...prev,
// //       country: selected.name,
// //       phone: selected.prefix,
// //       selectedCountryCode: selected.code,
// //     }));

// //     setErrors((prev) => {
// //       const newErrors = { ...prev };
// //       delete newErrors.country;
// //       delete newErrors.phone;
// //       return newErrors;
// //     });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
// //       <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
// //         {renderProgressSteps()}

// //         {/* Étape 1 - Identité */}
// //         {step === 1 && (
// //           <div className="space-y-8">
// //             <div className="border-b border-gray-100 pb-4">
// //               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
// //                 <User className="mr-2 text-blue-600" size={24} />
// //                 Informations personnelles
// //               </h2>
// //               <p className="text-gray-500 text-sm mt-2">
// //                 Tous les champs marqués d'un * sont obligatoires
// //               </p>
// //             </div>

// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="firstName"
// //                   className="text-sm font-semibold text-gray-700 flex items-center"
// //                 >
// //                   Prénom <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="firstName"
// //                     value={formData.firstName}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, firstName: e.target.value })
// //                     }
// //                     onBlur={() =>
// //                       !formData.firstName &&
// //                       setErrors((prev) => ({
// //                         ...prev,
// //                         firstName: "Le prénom est requis",
// //                       }))
// //                     }
// //                     className={cn(
// //                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
// //                       errors.firstName && "border-red-500 focus:ring-red-100"
// //                     )}
// //                   />
// //                   <User
// //                     className="absolute left-3 top-3.5 text-gray-400"
// //                     size={18}
// //                   />
// //                 </div>
// //                 {errors.firstName && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.firstName}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="lastName"
// //                   className="text-sm font-semibold text-gray-700 flex items-center"
// //                 >
// //                   Nom <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="lastName"
// //                     value={formData.lastName}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, lastName: e.target.value })
// //                     }
// //                     onBlur={() =>
// //                       !formData.lastName &&
// //                       setErrors((prev) => ({
// //                         ...prev,
// //                         lastName: "Le nom est requis",
// //                       }))
// //                     }
// //                     className={cn(
// //                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
// //                       errors.lastName && "border-red-500 focus:ring-red-100"
// //                     )}
// //                   />
// //                   <User
// //                     className="absolute left-3 top-3.5 text-gray-400"
// //                     size={18}
// //                   />
// //                 </div>
// //                 {errors.lastName && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.lastName}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="email"
// //                   className="text-sm font-semibold text-gray-700 flex items-center"
// //                 >
// //                   Email <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, email: e.target.value })
// //                     }
// //                     onBlur={handleEmailBlur}
// //                     className={cn(
// //                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
// //                       errors.email && "border-red-500 focus:ring-red-100"
// //                     )}
// //                   />
// //                   <Mail
// //                     className="absolute left-3 top-3.5 text-gray-400"
// //                     size={18}
// //                   />
// //                   {isCheckingEmail && (
// //                     <Loader2
// //                       className="absolute right-3 top-3.5 text-blue-500 animate-spin"
// //                       size={18}
// //                     />
// //                   )}
// //                 </div>
// //                 {errors.email && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.email}
// //                   </p>
// //                 )}
// //                 <p className="text-xs text-gray-500 mt-1">
// //                   Format : exemple@domaine.com
// //                 </p>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="country"
// //                   className="text-sm font-semibold text-gray-700 flex items-center"
// //                 >
// //                   Pays <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <CountrySelector
// //                   value={formData.country}
// //                   onChange={handleCountryChange}
// //                   onPrefixChange={(prefix) =>
// //                     setFormData((prev) => ({ ...prev, phone: prefix }))
// //                   }
// //                   error={errors.country}
// //                   countries={countries}
// //                 />
// //                 {errors.country && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.country}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="city"
// //                   className="text-sm font-semibold text-gray-700"
// //                 >
// //                   Ville
// //                 </Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="city"
// //                     value={formData.city}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, city: e.target.value })
// //                     }
// //                     className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
// //                   />
// //                   <MapPin
// //                     className="absolute left-3 top-3.5 text-gray-400"
// //                     size={18}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="phone"
// //                   className="text-sm font-semibold text-gray-700 flex items-center"
// //                 >
// //                   Téléphone <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <div
// //                   className={cn(
// //                     "rounded-lg bg-white h-12",
// //                     errors.phone ? "border border-red-500" : "border border-gray-300"
// //                   )}
// //                 >
// //                   <PhoneInput
// //                     defaultCountry={
// //                       (countries.find((c) => c.name === formData.country)?.code as CountryCode) || "MA"
// //                     }
// //                     value={formData.phone}
// //                     onChange={handlePhoneChange}
// //                     onBlur={handlePhoneBlur}
// //                     className="w-full border-none focus:outline-none focus:ring-0"
// //                     international
// //                     countryCallingCodeEditable={false}
// //                   />
// //                   {isCheckingPhone && (
// //                     <Loader2 className="ml-2 h-4 w-4 animate-spin text-blue-500" />
// //                   )}
// //                 </div>
// //                 {errors.phone && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.phone}
// //                   </p>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex justify-end pt-6 border-t border-gray-100">
// //               <Button
// //                 type="button"
// //                 onClick={handleContinue}
// //                 disabled={isSubmitting || isCheckingEmail || isCheckingPhone}
// //                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
// //               >
// //                 {isSubmitting || isCheckingEmail || isCheckingPhone ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// //                     Vérification...
// //                   </>
// //                 ) : (
// //                   <>
// //                     Continuer
// //                     <ArrowRight className="ml-2 h-5 w-5" />
// //                   </>
// //                 )}
// //               </Button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Étape 2 - Vérification email */}
// //         {step === 2 && (
// //           <div className="space-y-8">
// //             {success && (
// //               <Alert
// //                 variant="default"
// //                 className="mb-4 bg-green-50 border-green-200 text-green-800"
// //               >
// //                 <CheckCircle2 className="h-4 w-4 text-green-600" />
// //                 <AlertDescription>{success}</AlertDescription>
// //               </Alert>
// //             )}
// //             <div className="border-b border-gray-100 pb-4">
// //               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
// //                 <Shield className="mr-2 text-blue-600" size={24} />
// //                 Vérification de votre email
// //               </h2>
// //               <p className="text-gray-500 text-sm mt-2">
// //                 Vérifiez votre adresse email pour continuer
// //               </p>
// //             </div>
// //             <EmailVerification
// //               email={formData.email}
// //               onVerified={handleEmailVerified}
// //               onBack={prevStep}
// //             />

// //             <div className="flex justify-between pt-6 border-t border-gray-100">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={prevStep}
// //                 className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
// //               >
// //                 Retour
// //               </Button>

// //               <Button
// //                 type="button"
// //                 onClick={nextStep}
// //                 disabled={!isEmailVerified}
// //                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
// //               >
// //                 Suivant
// //                 <ArrowRight className="ml-2 h-5 w-5" />
// //               </Button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Étape 3 - Profil */}
// //         {step === 3 && (
// //           <div className="space-y-8">
// //             <div className="border-b border-gray-100 pb-4">
// //               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
// //                 <Briefcase className="mr-2 text-blue-600" size={24} />
// //                 Votre profil professionnel
// //               </h2>
// //               <p className="text-gray-500 text-sm mt-2">
// //                 Parlez-nous de vos intérêts et objectifs professionnels
// //               </p>
// //             </div>

// //             <div className="space-y-6">
// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="sector"
// //                   className="text-sm font-semibold text-gray-700 flex items-center"
// //                 >
// //                   Secteur d'activité{" "}
// //                   <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <div className="relative">
// //                   <Select
// //                     value={formData.sector}
// //                     onValueChange={(value) =>
// //                       setFormData({ ...formData, sector: value })
// //                     }
// //                   >
// //                     <SelectTrigger
// //                       className={cn(
// //                         "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
// //                         errors.sector && "border-red-500 focus:ring-red-100"
// //                       )}
// //                     >
// //                       <SelectValue placeholder="Sélectionnez votre secteur" />
// //                     </SelectTrigger>
// //                     <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
// //                       <SelectItem value="TECHNOLOGIE">Technologie</SelectItem>
// //                       <SelectItem value="AGRO_HALIEUTIQUE">
// //                         Agro-Halieutique
// //                       </SelectItem>
// //                       <SelectItem value="FINANCE">Finance</SelectItem>
// //                       <SelectItem value="SANTE">Santé</SelectItem>
// //                       <SelectItem value="ENERGIE_DURABILITE">
// //                         Énergie & Durabilité
// //                       </SelectItem>
// //                       <SelectItem value="TRANSPORT">Transport</SelectItem>
// //                       <SelectItem value="INDUSTRIE">Industrie</SelectItem>
// //                       <SelectItem value="COMMERCE_DISTRIBUTION">
// //                         Commerce & Distribution
// //                       </SelectItem>
// //                       <SelectItem value="SERVICES_PROFESSIONNELS">
// //                         Services Professionnels
// //                       </SelectItem>
// //                       <SelectItem value="EDUCATION">Éducation</SelectItem>
// //                       <SelectItem value="TOURISME">Tourisme</SelectItem>
// //                       <SelectItem value="MEDIA_DIVERTISSEMENT">
// //                         Média & Divertissement
// //                       </SelectItem>
// //                       <SelectItem value="AUTRES">Autres</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                   <Briefcase
// //                     className="absolute left-3 top-3.5 text-gray-400"
// //                     size={18}
// //                   />
// //                 </div>
// //                 {errors.sector && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.sector}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label className="text-sm font-semibold text-gray-700 flex items-center">
// //                   Centres d'intérêt professionnels
// //                 </Label>
// //                 <div className="grid md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
// //                   {[
// //                     "MENTORAT",
// //                     "RESEAUTAGE",
// //                     "EMPLOI",
// //                     "FORMATION",
// //                     "AUTRE",
// //                   ].map((interest) => (
// //                     <div
// //                       key={interest}
// //                       className="flex items-center space-x-2 p-2 hover:bg-white rounded-md transition-all duration-200"
// //                     >
// //                       <Checkbox
// //                         id={`interest-${interest}`}
// //                         checked={formData.professionalInterests.includes(
// //                           interest
// //                         )}
// //                         onCheckedChange={(checked) =>
// //                           handleInterestChange(interest, checked as boolean)
// //                         }
// //                         className="border-gray-300 text-blue-600 focus:ring-blue-500 rounded"
// //                       />
// //                       <Label
// //                         htmlFor={`interest-${interest}`}
// //                         className="text-sm text-gray-700 cursor-pointer"
// //                       >
// //                         {interest.charAt(0) + interest.slice(1).toLowerCase()}
// //                       </Label>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 {errors.professionalInterests && (
// //                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
// //                     <AlertCircle className="mr-1 h-4 w-4" />{" "}
// //                     {errors.professionalInterests}
// //                   </p>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="professionalChallenges"
// //                   className="text-sm font-semibold text-gray-700"
// //                 >
// //                   Défis professionnels actuels
// //                 </Label>
// //                 <Textarea
// //                   id="professionalChallenges"
// //                   value={formData.professionalChallenges}
// //                   onChange={(e) =>
// //                     setFormData({
// //                       ...formData,
// //                       professionalChallenges: e.target.value,
// //                     })
// //                   }
// //                   rows={4}
// //                   placeholder="Décrivez brièvement vos défis professionnels..."
// //                   className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 resize-none"
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="referralSource"
// //                   className="text-sm font-semibold text-gray-700"
// //                 >
// //                   Comment avez-vous entendu parler de nous ?
// //                 </Label>
// //                 <div className="relative">
// //                   <Select
// //                     value={formData.referralSource}
// //                     onValueChange={(value) =>
// //                       setFormData({ ...formData, referralSource: value })
// //                     }
// //                   >
// //                     <SelectTrigger className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200">
// //                       <SelectValue placeholder="Sélectionnez une option" />
// //                     </SelectTrigger>
// //                     <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
// //                       <SelectItem value="SOCIAL_MEDIA">
// //                         Réseaux sociaux
// //                       </SelectItem>
// //                       <SelectItem value="SEARCH">
// //                         Moteur de recherche
// //                       </SelectItem>
// //                       <SelectItem value="FRIEND">Recommandation</SelectItem>
// //                       <SelectItem value="EVENT">Événement</SelectItem>
// //                       <SelectItem value="OTHER">Autre</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                   <Briefcase
// //                     className="absolute left-3 top-3.5 text-gray-400"
// //                     size={18}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
// //                 <Checkbox
// //                   id="subscribedToNewsletter"
// //                   checked={formData.subscribedToNewsletter}
// //                   onCheckedChange={(checked) =>
// //                     setFormData({
// //                       ...formData,
// //                       subscribedToNewsletter: checked as boolean,
// //                     })
// //                   }
// //                   className="border-blue-300 text-blue-600 focus:ring-blue-500 rounded"
// //                 />
// //                 <Label
// //                   htmlFor="subscribedToNewsletter"
// //                   className="text-sm text-blue-900 font-medium"
// //                 >
// //                   Je souhaite recevoir la newsletter
// //                 </Label>
// //               </div>
// //             </div>

// //             <div className="flex justify-between pt-6 border-t border-gray-100">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={prevStep}
// //                 className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
// //               >
// //                 Retour
// //               </Button>
// //               <Button
// //                 type="submit"
// //                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// //                     Finalisation...
// //                   </>
// //                 ) : (
// //                   "Finaliser l'inscription"
// //                 )}
// //               </Button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </form>
// //   );
// // }

// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import { registerProfessional } from "@/app/action";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ArrowRight,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
//   User,
//   Mail,
//   MapPin,
//   Briefcase,
//   Shield,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import EmailVerification from "@/components/email-verification";
// import { z } from "zod";
// import { toast } from "sonner";
// import { emailSchema, phoneSchema, formatMoroccanPhone } from "@/utils/validation";
// import { useSearchParams } from "next/navigation";
// import CountrySelector from "@/components/country-selector-pro";
// import { cn } from "@/lib/utils";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import { CountryCode } from "libphonenumber-js";
// import { Alert, AlertDescription } from "./ui/alert";

// const formSchema = z.object({
//   firstName: z.string().min(1, "Le prénom est requis"),
//   lastName: z.string().min(1, "Le nom est requis"),
//   email: emailSchema,
//   phone: phoneSchema, // Utilisation de phoneSchema
//   city: z.string().optional(),
//   country: z.string().min(1, "Le pays est requis"),
//   sector: z.string().min(1, "Sélectionnez un secteur"),
//   professionalInterests: z.array(z.string()).optional(),
//   professionalChallenges: z.string().optional(),
//   subscribedToNewsletter: z.boolean().default(false),
//   referralSource: z.string().optional(),
//   parrainId: z.string().optional(),
// });

// interface ProfessionalFormProps {
//   utmSource?: string;
//   utmMedium?: string;
//   utmCampaign?: string;
//   parrainId?: string;
//   onStepChange?: (step: number) => void;
// }

// export default function ProfessionalForm({
//   utmSource,
//   utmMedium,
//   utmCampaign,
//   parrainId,
//   onStepChange,
// }: ProfessionalFormProps) {
//   const [step, setStep] = useState(1);
//   const router = useRouter();
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false);
//   const [isCheckingPhone, setIsCheckingPhone] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const searchParams = useSearchParams();
//   const ref = searchParams.get("ref") || "";
//   const [success, setSuccess] = useState<string | null>(null);

//   const fetchCountries = async () => {
//     try {
//       const res = await fetch("https://restcountries.com/v3.1/all");
//       const data = await res.json();
//       const countryList = data.map((country: any) => ({
//         name: country.translations?.fra?.common || country.name.common,
//         code: country.cca2,
//         prefix: country.idd.root + (country.idd.suffixes?.[0] || ""),
//       }));
//       return countryList.sort((a: any, b: any) => a.name.localeCompare(b.name));
//     } catch (error) {
//       console.error("Erreur lors du chargement des pays :", error);
//       return [];
//     }
//   };

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "Maroc",
//     selectedCountryCode: "MA",
//     sector: "",
//     professionalInterests: [] as string[],
//     professionalChallenges: "",
//     subscribedToNewsletter: false,
//     referralSource: "",
//     parrainId: ref || parrainId || "",
//   });
//   type Country = {
//     name: string;
//     code: string;
//     prefix: string;
//   };

//   const [countries, setCountries] = useState<Country[]>([]);

//   useEffect(() => {
//     const loadCountries = async () => {
//       const data = await fetchCountries();
//       setCountries(data);

//       const defaultCountry = data.find(
//         (c: { name: string }) => c.name === "Maroc"
//       );
//       if (defaultCountry) {
//         setFormData((prev) => ({
//           ...prev,
//           country: defaultCountry.name,
//           phone: defaultCountry.prefix,
//         }));
//       }
//     };

//     loadCountries();
//   }, []);

//   useEffect(() => {
//     if (onStepChange) onStepChange(step);
//   }, [step, onStepChange]);

//   useEffect(() => {
//     if (ref && !formData.referralSource) {
//       setFormData((prev) => ({
//         ...prev,
//         parrainId: ref,
//         referralSource: "FRIEND",
//       }));
//     }
//   }, [ref]);

//   const checkUnique = async (field: string, value: string) => {
//     try {
//       const response = await fetch("/api/check-unique", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ field, value }),
//       });

//       const data = await response.json();

//       if (!data.isUnique) {
//         setErrors((prev) => ({ ...prev, [field]: data.message }));
//         return false;
//       } else {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[field];
//           return newErrors;
//         });
//         return true;
//       }
//     } catch (error) {
//       console.error(
//         `Erreur lors de la vérification de l'unicité du ${field}:`,
//         error
//       );
//       toast.error("Erreur réseau", {
//         description: "Impossible de vérifier l'unicité. Veuillez réessayer.",
//       });
//       return true;
//     }
//   };

//   const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
//     const email = e.target.value.trim();
//     if (!email) {
//       setErrors((prev) => ({ ...prev, email: "L'email est requis" }));
//       return;
//     }
//     try {
//       emailSchema.parse(email);
//       setIsCheckingEmail(true);
//       await checkUnique("email", email);
//       setIsCheckingEmail(false);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setErrors((prev) => ({ ...prev, email: error.errors[0].message }));
//       }
//     }
//   };

//   const handleContinue = async () => {
//     try {
//       setIsCheckingEmail(true);
//       const verificationToken = Math.floor(
//         100000 + Math.random() * 900000
//       ).toString();
//       sessionStorage.setItem(
//         `verification_${formData.email}`,
//         verificationToken
//       );

//       const emailContent = {
//         to: formData.email,
//         subject: "Vérification de votre adresse email",
//         html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <h2 style="color: #2563eb;">Vérification de votre adresse email</h2>
//           <p>Merci de votre inscription ! Voici votre code :</p>
//           <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
//             ${verificationToken}
//           </div>
//           <p>Ce code est valable pendant 10 minutes.</p>
//         </div>
//       `,
//       };

//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(emailContent),
//       });
//       setSuccess("Code de vérification envoyé à votre adresse email");

//       if (!response.ok) throw new Error("Échec de l’envoi du code");

//       setStep(2);
//     } catch (error) {
//       console.error("Erreur :", error);
//       toast.error("Erreur lors de l’envoi de l’email de vérification.");
//     } finally {
//       setIsCheckingEmail(false);
//     }
//   };

//   const handlePhoneChange = (value?: string) => {
//     let phone = value || "";
//     if (formData.country === "Maroc") {
//       phone = formatMoroccanPhone(phone);
//     }
//     setFormData((prev) => ({ ...prev, phone }));
//     if (!phone) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors.phone;
//         return newErrors;
//       });
//     }
//   };

//   const handlePhoneBlur = async () => {
//     let phone = formData.phone.trim();
//     if (!phone) {
//       setErrors((prev) => ({
//         ...prev,
//         phone: "Le numéro de téléphone est requis",
//       }));
//       return false;
//     }

//     // Normalisation pour les numéros marocains si le pays est Maroc
//     if (formData.country === "Maroc") {
//       phone = formatMoroccanPhone(phone);
//       setFormData((prev) => ({ ...prev, phone }));
//     }

//     // Validation avec phoneSchema
//     try {
//       phoneSchema.parse(phone);
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors.phone;
//         return newErrors;
//       });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setErrors((prev) => ({
//           ...prev,
//           phone: error.errors[0].message,
//         }));
//         return false;
//       }
//     }

//     // Vérification d'unicité
//     setIsCheckingPhone(true);
//     const isUnique = await checkUnique("phone", phone);
//     setIsCheckingPhone(false);
//     return isUnique;
//   };

//   const validateStep = (stepToValidate: number) => {
//     try {
//       const partialSchema =
//         stepToValidate === 1
//           ? formSchema.pick({
//               firstName: true,
//               lastName: true,
//               email: true,
//               phone: true,
//               country: true,
//             })
//           : stepToValidate === 3
//           ? formSchema.pick({
//               sector: true,
//             })
//           : z.object({});

//       if (stepToValidate === 1) {
//         // Normaliser le numéro pour le Maroc avant validation
//         let phone = formData.phone;
//         if (formData.country === "Maroc") {
//           phone = formatMoroccanPhone(formData.phone);
//           setFormData((prev) => ({ ...prev, phone }));
//         }
//         partialSchema.parse({ ...formData, phone });
//       } else if (stepToValidate === 3) {
//         partialSchema.parse(formData);
//       }

//       if (stepToValidate === 1) {
//         if (errors.email || errors.phone) {
//           toast.error("Erreur de validation", {
//             description:
//               "Veuillez corriger les champs marqués en rouge avant de continuer",
//           });
//           return false;
//         }
//       }

//       if (stepToValidate === 3) {
//         if (!formData.sector) {
//           setErrors((prev) => ({ ...prev, sector: "Sélectionnez un secteur" }));
//           return false;
//         }
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors.professionalInterests;
//           return newErrors;
//         });
//       }

//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path.length > 0) {
//             newErrors[err.path[0]] = err.message;
//           }
//         });
//         setErrors((prev) => ({ ...prev, ...newErrors }));
//         toast.error("Erreur de validation", {
//           description:
//             "Veuillez corriger les champs marqués en rouge avant de continuer",
//         });
//       }
//       return false;
//     }
//   };

//   const handleInterestChange = (interest: string, checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       professionalInterests: checked
//         ? [...prev.professionalInterests, interest]
//         : prev.professionalInterests.filter((i) => i !== interest),
//     }));
//     setErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors.professionalInterests;
//       return newErrors;
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateStep(step)) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const dataToSend = {
//         ...formData,
//         professionalInterests: formData.professionalInterests || [],
//       };

//       const formDataObj = new FormData();
//       Object.entries(dataToSend).forEach(([key, value]) => {
//         if (key !== "professionalInterests") {
//           formDataObj.append(key, String(value));
//         }
//       });
//       if (
//         dataToSend.professionalInterests &&
//         dataToSend.professionalInterests.length > 0
//       ) {
//         dataToSend.professionalInterests.forEach((interest) => {
//           formDataObj.append("professionalInterests", interest);
//         });
//       }
//       formDataObj.append("parrainId", dataToSend.parrainId || "");

//       const result = await registerProfessional(formDataObj);

//       if (result.error) {
//         if (result.field === "email") {
//           setErrors((prev) => ({
//             ...prev,
//             email: result.error || "Cet email est déjà utilisé",
//           }));
//           toast.error("Email déjà utilisé", {
//             description: result.error,
//           });
//         } else if (result.field === "phone") {
//           setErrors((prev) => ({
//             ...prev,
//             phone: result.error || "Ce numéro est déjà utilisé",
//           }));
//           toast.error("Téléphone déjà utilisé", {
//             description: result.error,
//           });
//         } else {
//           toast.error("Erreur", {
//             description: result.error || "Une erreur est survenue",
//           });
//         }
//         setIsSubmitting(false);
//       } else if (result.success) {
//         if (result.redirectTo) {
//           router.push(result.redirectTo);
//         } else {
//           toast.success("Inscription réussie", {
//             description: "Votre compte a été créé avec succès.",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'inscription :", error);
//       toast.error("Erreur", {
//         description: "Une erreur inattendue est survenue. Veuillez réessayer.",
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const renderProgressSteps = () => {
//     const steps = [
//       { number: 1, title: "Identité", icon: <User size={18} /> },
//       { number: 2, title: "Vérification", icon: <Shield size={18} /> },
//       { number: 3, title: "Profil", icon: <Briefcase size={18} /> },
//     ];

//     return (
//       <div className="mb-12">
//         <div className="flex items-center justify-between relative">
//           {steps.map((stepItem) => (
//             <div
//               key={stepItem.number}
//               className="flex flex-col items-center z-10"
//             >
//               <div
//                 className={cn(
//                   "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-500",
//                   step >= stepItem.number
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white scale-110"
//                     : "bg-white border-gray-200 text-gray-400"
//                 )}
//               >
//                 {step > stepItem.number ? (
//                   <CheckCircle2
//                     className="text-white animate-pulse"
//                     size={20}
//                   />
//                 ) : (
//                   stepItem.icon
//                 )}
//               </div>
//               <span
//                 className={cn(
//                   "text-sm font-semibold mt-3 transition-colors duration-300",
//                   step >= stepItem.number ? "text-gray-900" : "text-gray-500"
//                 )}
//               >
//                 {stepItem.title}
//               </span>
//             </div>
//           ))}
//           <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-100 rounded-full">
//             <div
//               className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
//               style={{ width: `${((step - 1) / 2) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const nextStep = async () => {
//     if (!validateStep(step)) return;

//     if (step === 1) {
//       const isPhoneValid = await handlePhoneBlur();
//       if (!isPhoneValid || errors.email || errors.phone) {
//         toast.error("Erreur de validation", {
//           description:
//             "Veuillez corriger les champs marqués en rouge avant de continuer",
//         });
//         return;
//       }
//       setStep(2);
//     } else if (step === 2) {
//       if (isEmailVerified) {
//         setStep(3);
//       } else {
//         toast.info("Vérification requise", {
//           description: "Veuillez vérifier votre email avant de continuer",
//         });
//       }
//     }
//   };

//   const handleEmailVerified = () => {
//     setIsEmailVerified(true);
//     toast.success("Email vérifié", {
//       description: "Votre email a été vérifié avec succès",
//     });
//   };

//   const prevStep = () => {
//     setStep((prev) => Math.max(1, prev - 1));
//   };

//   const handleCountryChange = (countryName: string) => {
//     const selected = countries.find((c) => c.name === countryName);
//     if (!selected) return;

//     setFormData((prev) => ({
//       ...prev,
//       country: selected.name,
//       phone: selected.prefix,
//       selectedCountryCode: selected.code,
//     }));

//     setErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors.country;
//       delete newErrors.phone;
//       return newErrors;
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
//       <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
//         {renderProgressSteps()}

//         {/* Étape 1 - Identité */}
//         {step === 1 && (
//           <div className="space-y-8">
//             <div className="border-b border-gray-100 pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
//                 <User className="mr-2 text-blue-600" size={24} />
//                 Informations personnelles
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">
//                 Tous les champs marqués d'un * sont obligatoires
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="firstName"
//                   className="text-sm font-semibold text-gray-700 flex items-center"
//                 >
//                   Prénom <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="firstName"
//                     value={formData.firstName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, firstName: e.target.value })
//                     }
//                     onBlur={() =>
//                       !formData.firstName &&
//                       setErrors((prev) => ({
//                         ...prev,
//                         firstName: "Le prénom est requis",
//                       }))
//                     }
//                     className={cn(
//                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                       errors.firstName && "border-red-500 focus:ring-red-100"
//                     )}
//                   />
//                   <User
//                     className="absolute left-3 top-3.5 text-gray-400"
//                     size={18}
//                   />
//                 </div>
//                 {errors.firstName && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="lastName"
//                   className="text-sm font-semibold text-gray-700 flex items-center"
//                 >
//                   Nom <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="lastName"
//                     value={formData.lastName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, lastName: e.target.value })
//                     }
//                     onBlur={() =>
//                       !formData.lastName &&
//                       setErrors((prev) => ({
//                         ...prev,
//                         lastName: "Le nom est requis",
//                       }))
//                     }
//                     className={cn(
//                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                       errors.lastName && "border-red-500 focus:ring-red-100"
//                     )}
//                   />
//                   <User
//                     className="absolute left-3 top-3.5 text-gray-400"
//                     size={18}
//                   />
//                 </div>
//                 {errors.lastName && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.lastName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="email"
//                   className="text-sm font-semibold text-gray-700 flex items-center"
//                 >
//                   Email <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     onBlur={handleEmailBlur}
//                     className={cn(
//                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                       errors.email && "border-red-500 focus:ring-red-100"
//                     )}
//                   />
//                   <Mail
//                     className="absolute left-3 top-3.5 text-gray-400"
//                     size={18}
//                   />
//                   {isCheckingEmail && (
//                     <Loader2
//                       className="absolute right-3 top-3.5 text-blue-500 animate-spin"
//                       size={18}
//                     />
//                   )}
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.email}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">
//                   Format : exemple@domaine.com
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="country"
//                   className="text-sm font-semibold text-gray-700 flex items-center"
//                 >
//                   Pays <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <CountrySelector
//                   value={formData.country}
//                   onChange={handleCountryChange}
//                   onPrefixChange={(prefix) =>
//                     setFormData((prev) => ({ ...prev, phone: prefix }))
//                   }
//                   error={errors.country}
//                   countries={countries}
//                 />
//                 {errors.country && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.country}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="city"
//                   className="text-sm font-semibold text-gray-700"
//                 >
//                   Ville
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="city"
//                     value={formData.city}
//                     onChange={(e) =>
//                       setFormData({ ...formData, city: e.target.value })
//                     }
//                     className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                   />
//                   <MapPin
//                     className="absolute left-3 top-3.5 text-gray-400"
//                     size={18}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="phone"
//                   className="text-sm font-semibold text-gray-700 flex items-center"
//                 >
//                   Téléphone <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div
//                   className={cn(
//                     "rounded-lg bg-white h-12",
//                     errors.phone ? "border border-red-500" : "border border-gray-300"
//                   )}
//                 >
//                   <PhoneInput
//                     defaultCountry={
//                       (countries.find((c) => c.name === formData.country)?.code as CountryCode) || "MA"
//                     }
//                     value={formData.phone}
//                     onChange={handlePhoneChange}
//                     onBlur={handlePhoneBlur}
//                     className="w-full border-none focus:outline-none focus:ring-0"
//                     international
//                     countryCallingCodeEditable={false}
//                     placeholder="Entrez votre numéro (ex: 0571234567)"
//                   />
//                   {isCheckingPhone && (
//                     <Loader2 className="ml-2 h-4 w-4 animate-spin text-blue-500" />
//                   )}
//                 </div>
//                 {errors.phone && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.phone}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">
//                   Format pour le Maroc : 05XXXXXXXX ou +2125XXXXXXXX
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-end pt-6 border-t border-gray-100">
//               <Button
//                 type="button"
//                 onClick={handleContinue}
//                 disabled={isSubmitting || isCheckingEmail || isCheckingPhone}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
//               >
//                 {isSubmitting || isCheckingEmail || isCheckingPhone ? (
//                   <>
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Vérification...
//                   </>
//                 ) : (
//                   <>
//                     Continuer
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Étape 2 - Vérification email */}
//         {step === 2 && (
//           <div className="space-y-8">
//             {success && (
//               <Alert
//                 variant="default"
//                 className="mb-4 bg-green-50 border-green-200 text-green-800"
//               >
//                 <CheckCircle2 className="h-4 w-4 text-green-600" />
//                 <AlertDescription>{success}</AlertDescription>
//               </Alert>
//             )}
//             <div className="border-b border-gray-100 pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
//                 <Shield className="mr-2 text-blue-600" size={24} />
//                 Vérification de votre email
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">
//                 Vérifiez votre adresse email pour continuer
//               </p>
//             </div>
//             <EmailVerification
//               email={formData.email}
//               onVerified={handleEmailVerified}
//               onBack={prevStep}
//             />

//             <div className="flex justify-between pt-6 border-t border-gray-100">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
//               >
//                 Retour
//               </Button>

//               <Button
//                 type="button"
//                 onClick={nextStep}
//                 disabled={!isEmailVerified}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
//               >
//                 Suivant
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Étape 3 - Profil */}
//         {step === 3 && (
//           <div className="space-y-8">
//             <div className="border-b border-gray-100 pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
//                 <Briefcase className="mr-2 text-blue-600" size={24} />
//                 Votre profil professionnel
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">
//                 Parlez-nous de vos intérêts et objectifs professionnels
//               </p>
//             </div>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="sector"
//                   className="text-sm font-semibold text-gray-700 flex items-center"
//                 >
//                   Secteur d'activité{" "}
//                   <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Select
//                     value={formData.sector}
//                     onValueChange={(value) =>
//                       setFormData({ ...formData, sector: value })
//                     }
//                   >
//                     <SelectTrigger
//                       className={cn(
//                         "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                         errors.sector && "border-red-500 focus:ring-red-100"
//                       )}
//                     >
//                       <SelectValue placeholder="Sélectionnez votre secteur" />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
//                       <SelectItem value="TECHNOLOGIE">Technologie</SelectItem>
//                       <SelectItem value="AGRO_HALIEUTIQUE">
//                         Agro-Halieutique
//                       </SelectItem>
//                       <SelectItem value="FINANCE">Finance</SelectItem>
//                       <SelectItem value="SANTE">Santé</SelectItem>
//                       <SelectItem value="ENERGIE_DURABILITE">
//                         Énergie & Durabilité
//                       </SelectItem>
//                       <SelectItem value="TRANSPORT">Transport</SelectItem>
//                       <SelectItem value="INDUSTRIE">Industrie</SelectItem>
//                       <SelectItem value="COMMERCE_DISTRIBUTION">
//                         Commerce & Distribution
//                       </SelectItem>
//                       <SelectItem value="SERVICES_PROFESSIONNELS">
//                         Services Professionnels
//                       </SelectItem>
//                       <SelectItem value="EDUCATION">Éducation</SelectItem>
//                       <SelectItem value="TOURISME">Tourisme</SelectItem>
//                       <SelectItem value="MEDIA_DIVERTISSEMENT">
//                         Média & Divertissement
//                       </SelectItem>
//                       <SelectItem value="AUTRES">Autres</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Briefcase
//                     className="absolute left-3 top-3.5 text-gray-400"
//                     size={18}
//                   />
//                 </div>
//                 {errors.sector && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.sector}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-sm font-semibold text-gray-700 flex items-center">
//                   Centres d'intérêt professionnels
//                 </Label>
//                 <div className="grid md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
//                   {[
//                     "MENTORAT",
//                     "RESEAUTAGE",
//                     "EMPLOI",
//                     "FORMATION",
//                     "AUTRE",
//                   ].map((interest) => (
//                     <div
//                       key={interest}
//                       className="flex items-center space-x-2 p-2 hover:bg-white rounded-md transition-all duration-200"
//                     >
//                       <Checkbox
//                         id={`interest-${interest}`}
//                         checked={formData.professionalInterests.includes(
//                           interest
//                         )}
//                         onCheckedChange={(checked) =>
//                           handleInterestChange(interest, checked as boolean)
//                         }
//                         className="border-gray-300 text-blue-600 focus:ring-blue-500 rounded"
//                       />
//                       <Label
//                         htmlFor={`interest-${interest}`}
//                         className="text-sm text-gray-700 cursor-pointer"
//                       >
//                         {interest.charAt(0) + interest.slice(1).toLowerCase()}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//                 {errors.professionalInterests && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" />{" "}
//                     {errors.professionalInterests}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="professionalChallenges"
//                   className="text-sm font-semibold text-gray-700"
//                 >
//                   Défis professionnels actuels
//                 </Label>
//                 <Textarea
//                   id="professionalChallenges"
//                   value={formData.professionalChallenges}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       professionalChallenges: e.target.value,
//                     })
//                   }
//                   rows={4}
//                   placeholder="Décrivez brièvement vos défis professionnels..."
//                   className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 resize-none"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="referralSource"
//                   className="text-sm font-semibold text-gray-700"
//                 >
//                   Comment avez-vous entendu parler de nous ?
//                 </Label>
//                 <div className="relative">
//                   <Select
//                     value={formData.referralSource}
//                     onValueChange={(value) =>
//                       setFormData({ ...formData, referralSource: value })
//                     }
//                   >
//                     <SelectTrigger className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200">
//                       <SelectValue placeholder="Sélectionnez une option" />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
//                       <SelectItem value="SOCIAL_MEDIA">
//                         Réseaux sociaux
//                       </SelectItem>
//                       <SelectItem value="SEARCH">
//                         Moteur de recherche
//                       </SelectItem>
//                       <SelectItem value="FRIEND">Recommandation</SelectItem>
//                       <SelectItem value="EVENT">Événement</SelectItem>
//                       <SelectItem value="OTHER">Autre</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Briefcase
//                     className="absolute left-3 top-3.5 text-gray-400"
//                     size={18}
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
//                 <Checkbox
//                   id="subscribedToNewsletter"
//                   checked={formData.subscribedToNewsletter}
//                   onCheckedChange={(checked) =>
//                     setFormData({
//                       ...formData,
//                       subscribedToNewsletter: checked as boolean,
//                     })
//                   }
//                   className="border-blue-300 text-blue-600 focus:ring-blue-500 rounded"
//                 />
//                 <Label
//                   htmlFor="subscribedToNewsletter"
//                   className="text-sm text-blue-900 font-medium"
//                 >
//                   Je souhaite recevoir la newsletter
//                 </Label>
//               </div>
//             </div>

//             <div className="flex justify-between pt-6 border-t border-gray-100">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
//               >
//                 Retour
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Finalisation...
//                   </>
//                 ) : (
//                   "Finaliser l'inscription"
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </form>
//   );
// }
////////////////////////////////////////////////////////////////////////////////////////

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { registerProfessional } from "@/app/action"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowRight, Loader2, CheckCircle2, AlertCircle, User, Mail, MapPin, Briefcase, Shield } from "lucide-react"
// import { useRouter } from "next/navigation"
// import EmailVerification from "@/components/email-verification"
// import { z } from "zod"
// import { toast } from "sonner"
// import { emailSchema, phoneSchema } from "@/utils/validation"
// import { useSearchParams } from "next/navigation"
// import CountrySelector from "@/components/country-selector-pro"
// import { cn } from "@/lib/utils"
// import "react-phone-number-input/style.css"
// import PhoneInput from "react-phone-number-input"
// import { Alert, AlertDescription } from "./ui/alert"
// import {
//   updatedCountriesList,
//   isValidPhoneForCountry,
//   detectCountryFromPhone,
//   formatPhoneNumber,
// } from "@/lib/form-utils"

// const formSchema = z.object({
//   firstName: z.string().min(1, "Le prénom est requis"),
//   lastName: z.string().min(1, "Le nom est requis"),
//   email: emailSchema,
//   phone: phoneSchema,
//   city: z.string().optional(),
//   country: z.string().min(1, "Le pays est requis"),
//   sector: z.string().min(1, "Sélectionnez un secteur"),
//   professionalInterests: z.array(z.string()).optional(),
//   professionalChallenges: z.string().optional(),
//   subscribedToNewsletter: z.boolean().default(false),
//   referralSource: z.string().optional(),
//   parrainId: z.string().optional(),
// })

// interface ProfessionalFormProps {
//   utmSource?: string
//   utmMedium?: string
//   utmCampaign?: string
//   parrainId?: string
//   onStepChange?: (step: number) => void
// }

// export default function ProfessionalForm({
//   utmSource,
//   utmMedium,
//   utmCampaign,
//   parrainId,
//   onStepChange,
// }: ProfessionalFormProps) {
//   const [step, setStep] = useState(1)
//   const router = useRouter()
//   const [isEmailVerified, setIsEmailVerified] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false)
//   const [isCheckingPhone, setIsCheckingPhone] = useState(false)
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const searchParams = useSearchParams()
//   const ref = searchParams.get("ref") || ""
//   const [success, setSuccess] = useState<string | null>(null)

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "Maroc",
//     selectedCountryCode: "MA",
//     sector: "",
//     professionalInterests: [] as string[],
//     professionalChallenges: "",
//     subscribedToNewsletter: false,
//     referralSource: "",
//     parrainId: ref || parrainId || "",
//   })

//   // Convertir la liste des pays au format attendu par le composant CountrySelector
//   const countries = updatedCountriesList.map((country) => ({
//     name: country.name,
//     code: country.code,
//     prefix: country.prefix,
//     flag: country.flag,
//   }))

//   useEffect(() => {
//     // Définir le pays par défaut
//     const defaultCountry = countries.find((c) => c.name === "Maroc")
//     if (defaultCountry) {
//       setFormData((prev) => ({
//         ...prev,
//         country: defaultCountry.name,
//         selectedCountryCode: defaultCountry.code,
//         phone: "", // Initialiser avec une chaîne vide
//       }))
//     }
//   }, [])

//   useEffect(() => {
//     if (onStepChange) onStepChange(step)
//   }, [step, onStepChange])

//   useEffect(() => {
//     if (ref && !formData.referralSource) {
//       setFormData((prev) => ({
//         ...prev,
//         parrainId: ref,
//         referralSource: "FRIEND",
//       }))
//     }
//   }, [ref])

//   // Fonction pour nettoyer un numéro de téléphone (enlever espaces, tirets, etc.)
//   const cleanPhoneNumber = (phone: string): string => {
//     if (!phone) return ""
//     return phone.replace(/[\s\-()]/g, "")
//   }

//   // Fonction pour valider et formater le numéro selon le pays
//   const validateAndFormatPhone = (
//     phone: string,
//     countryCode: string,
//   ): { isValid: boolean; formatted: string; error?: string } => {
//     if (!phone) {
//       return { isValid: false, formatted: "", error: "Le numéro de téléphone est requis" }
//     }

//     const cleanPhone = cleanPhoneNumber(phone)
//     const country = updatedCountriesList.find((c) => c.code === countryCode)

//     if (!country) {
//       return { isValid: false, formatted: cleanPhone, error: "Pays non reconnu" }
//     }

//     // Vérifier si le numéro commence par le préfixe international ou par 0
//     let phoneToValidate = cleanPhone

//     // Si le numéro ne commence ni par + ni par 0, essayer d'ajouter le préfixe du pays
//     if (!phoneToValidate.startsWith("+") && !phoneToValidate.startsWith("0")) {
//       phoneToValidate = country.prefix + phoneToValidate
//     }

//     // Si le numéro commence par 0, le remplacer par le préfixe du pays
//     if (phoneToValidate.startsWith("0")) {
//       phoneToValidate = country.prefix + phoneToValidate.substring(1)
//     }

//     // Valider le numéro avec le regex du pays
//     const isValid = isValidPhoneForCountry(phoneToValidate, countryCode)

//     if (isValid) {
//       // Formater le numéro selon le format du pays
//       const formatted = formatPhoneNumber(phoneToValidate, countryCode)
//       return { isValid: true, formatted }
//     } else {
//       return {
//         isValid: false,
//         formatted: cleanPhone,
//         error: `Numéro invalide pour ${country.name}. Exemple: ${country.example}`,
//       }
//     }
//   }

//   const checkUnique = async (field: string, value: string) => {
//     try {
//       const response = await fetch("/api/check-unique", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ field, value }),
//       })

//       const data = await response.json()

//       if (!data.isUnique) {
//         setErrors((prev) => ({ ...prev, [field]: data.message }))
//         return false
//       } else {
//         setErrors((prev) => {
//           const newErrors = { ...prev }
//           delete newErrors[field]
//           return newErrors
//         })
//         return true
//       }
//     } catch (error) {
//       console.error(`Erreur lors de la vérification de l'unicité du ${field}:`, error)
//       toast.error("Erreur réseau", {
//         description: "Impossible de vérifier l'unicité. Veuillez réessayer.",
//       })
//       return true
//     }
//   }

//   const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
//     const email = e.target.value.trim()
//     if (!email) {
//       setErrors((prev) => ({ ...prev, email: "L'email est requis" }))
//       return
//     }
//     try {
//       emailSchema.parse(email)
//       setIsCheckingEmail(true)
//       await checkUnique("email", email)
//       setIsCheckingEmail(false)
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setErrors((prev) => ({ ...prev, email: error.errors[0].message }))
//       }
//     }
//   }

//   const handleContinue = async () => {
//     try {
//       setIsCheckingEmail(true)
//       const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
//       sessionStorage.setItem(`verification_${formData.email}`, verificationToken)

//       const emailContent = {
//         to: formData.email,
//         subject: "Vérification de votre adresse email",
//         html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <h2 style="color: #2563eb;">Vérification de votre adresse email</h2>
//           <p>Merci de votre inscription ! Voici votre code :</p>
//           <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
//             ${verificationToken}
//           </div>
//           <p>Ce code est valable pendant 10 minutes.</p>
//         </div>
//       `,
//       }

//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(emailContent),
//       })
//       setSuccess("Code de vérification envoyé à votre adresse email")

//       if (!response.ok) throw new Error("Échec de l'envoi du code")

//       setStep(2)
//     } catch (error) {
//       console.error("Erreur :", error)
//       toast.error("Erreur lors de l'envoi de l'email de vérification.")
//     } finally {
//       setIsCheckingEmail(false)
//     }
//   }

//   const handlePhoneChange = (value?: string) => {
//     // Si le numéro commence par +, essayer de détecter automatiquement le pays
//     if (value && value.startsWith("+")) {
//       const detectedCountryCode = detectCountryFromPhone(value)
//       if (detectedCountryCode) {
//         const detectedCountry = countries.find((c) => c.code === detectedCountryCode)
//         if (detectedCountry) {
//           setFormData((prev) => ({
//             ...prev,
//             country: detectedCountry.name,
//             selectedCountryCode: detectedCountry.code,
//           }))
//         }
//       }
//     }

//     // Mettre à jour le numéro de téléphone
//     setFormData((prev) => ({ ...prev, phone: value || "" }))

//     // Effacer les erreurs si le champ est vide
//     if (!value) {
//       setErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors.phone
//         return newErrors
//       })
//     }
//   }

//   const handlePhoneBlur = async () => {
//     const phone = formData.phone.trim()
//     if (!phone) {
//       setErrors((prev) => ({
//         ...prev,
//         phone: "Le numéro de téléphone est requis",
//       }))
//       return false
//     }

//     const countryCode = formData.selectedCountryCode
//     if (!countryCode) {
//       setErrors((prev) => ({
//         ...prev,
//         phone: "Pays non sélectionné",
//       }))
//       return false
//     }

//     // Valider et formater le numéro
//     const validation = validateAndFormatPhone(phone, countryCode)

//     if (!validation.isValid) {
//       setErrors((prev) => ({
//         ...prev,
//         phone: validation.error || "Numéro de téléphone invalide",
//       }))
//       return false
//     }

//     // Mettre à jour avec le numéro formaté
//     setFormData((prev) => ({ ...prev, phone: validation.formatted }))

//     // Effacer les erreurs
//     setErrors((prev) => {
//       const newErrors = { ...prev }
//       delete newErrors.phone
//       return newErrors
//     })

//     // Vérification d'unicité
//     setIsCheckingPhone(true)
//     const isUnique = await checkUnique("phone", validation.formatted)
//     setIsCheckingPhone(false)
//     return isUnique
//   }

//   const validateStep = (stepToValidate: number) => {
//     try {
//       const partialSchema =
//         stepToValidate === 1
//           ? formSchema.pick({
//               firstName: true,
//               lastName: true,
//               email: true,
//               phone: true,
//               country: true,
//             })
//           : stepToValidate === 3
//             ? formSchema.pick({
//                 sector: true,
//               })
//             : z.object({})

//       if (stepToValidate === 1) {
//         const phone = formData.phone
//         const countryCode = formData.selectedCountryCode

//         if (phone && countryCode) {
//           const validation = validateAndFormatPhone(phone, countryCode)
//           if (!validation.isValid) {
//             throw new z.ZodError([
//               {
//                 code: z.ZodIssueCode.custom,
//                 path: ["phone"],
//                 message: validation.error || "Numéro de téléphone invalide",
//               },
//             ])
//           }
//           setFormData((prev) => ({ ...prev, phone: validation.formatted }))
//         }

//         partialSchema.parse({ ...formData, phone: formData.phone })
//       } else if (stepToValidate === 3) {
//         partialSchema.parse(formData)
//       }

//       if (stepToValidate === 1) {
//         if (errors.email || errors.phone) {
//           toast.error("Erreur de validation", {
//             description: "Veuillez corriger les champs marqués en rouge avant de continuer",
//           })
//           return false
//         }
//       }

//       if (stepToValidate === 3) {
//         if (!formData.sector) {
//           setErrors((prev) => ({ ...prev, sector: "Sélectionnez un secteur" }))
//           return false
//         }
//         setErrors((prev) => {
//           const newErrors = { ...prev }
//           delete newErrors.professionalInterests
//           return newErrors
//         })
//       }

//       return true
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {}
//         error.errors.forEach((err) => {
//           if (err.path.length > 0) {
//             newErrors[err.path[0]] = err.message
//           }
//         })
//         setErrors((prev) => ({ ...prev, ...newErrors }))
//         toast.error("Erreur de validation", {
//           description: "Veuillez corriger les champs marqués en rouge avant de continuer",
//         })
//       }
//       return false
//     }
//   }

//   const handleInterestChange = (interest: string, checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       professionalInterests: checked
//         ? [...prev.professionalInterests, interest]
//         : prev.professionalInterests.filter((i) => i !== interest),
//     }))
//     setErrors((prev) => {
//       const newErrors = { ...prev }
//       delete newErrors.professionalInterests
//       return newErrors
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     if (!validateStep(step)) {
//       setIsSubmitting(false)
//       return
//     }

//     try {
//       const dataToSend = {
//         ...formData,
//         professionalInterests: formData.professionalInterests || [],
//       }

//       const formDataObj = new FormData()
//       Object.entries(dataToSend).forEach(([key, value]) => {
//         if (key !== "professionalInterests") {
//           formDataObj.append(key, String(value))
//         }
//       })
//       if (dataToSend.professionalInterests && dataToSend.professionalInterests.length > 0) {
//         dataToSend.professionalInterests.forEach((interest) => {
//           formDataObj.append("professionalInterests", interest)
//         })
//       }
//       formDataObj.append("parrainId", dataToSend.parrainId || "")

//       const result = await registerProfessional(formDataObj)

//       if (result.error) {
//         if (result.field === "email") {
//           setErrors((prev) => ({
//             ...prev,
//             email: result.error || "Cet email est déjà utilisé",
//           }))
//           toast.error("Email déjà utilisé", {
//             description: result.error,
//           })
//         } else if (result.field === "phone") {
//           setErrors((prev) => ({
//             ...prev,
//             phone: result.error || "Ce numéro est déjà utilisé",
//           }))
//           toast.error("Téléphone déjà utilisé", {
//             description: result.error,
//           })
//         } else {
//           toast.error("Erreur", {
//             description: result.error || "Une erreur est survenue",
//           })
//         }
//         setIsSubmitting(false)
//       } else if (result.success) {
//         if (result.redirectTo) {
//           router.push(result.redirectTo)
//         } else {
//           toast.success("Inscription réussie", {
//             description: "Votre compte a été créé avec succès.",
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'inscription :", error)
//       toast.error("Erreur", {
//         description: "Une erreur inattendue est survenue. Veuillez réessayer.",
//       })
//       setIsSubmitting(false)
//     }
//   }

//   const renderProgressSteps = () => {
//     const steps = [
//       { number: 1, title: "Identité", icon: <User size={18} /> },
//       { number: 2, title: "Vérification", icon: <Shield size={18} /> },
//       { number: 3, title: "Profil", icon: <Briefcase size={18} /> },
//     ]

//     return (
//       <div className="mb-12">
//         <div className="flex items-center justify-between relative">
//           {steps.map((stepItem) => (
//             <div key={stepItem.number} className="flex flex-col items-center z-10">
//               <div
//                 className={cn(
//                   "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-500",
//                   step >= stepItem.number
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white scale-110"
//                     : "bg-white border-gray-200 text-gray-400",
//                 )}
//               >
//                 {step > stepItem.number ? (
//                   <CheckCircle2 className="text-white animate-pulse" size={20} />
//                 ) : (
//                   stepItem.icon
//                 )}
//               </div>
//               <span
//                 className={cn(
//                   "text-sm font-semibold mt-3 transition-colors duration-300",
//                   step >= stepItem.number ? "text-gray-900" : "text-gray-500",
//                 )}
//               >
//                 {stepItem.title}
//               </span>
//             </div>
//           ))}
//           <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-100 rounded-full">
//             <div
//               className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
//               style={{ width: `${((step - 1) / 2) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const nextStep = async () => {
//     if (!validateStep(step)) return

//     if (step === 1) {
//       const isPhoneValid = await handlePhoneBlur()
//       if (!isPhoneValid || errors.email || errors.phone) {
//         toast.error("Erreur de validation", {
//           description: "Veuillez corriger les champs marqués en rouge avant de continuer",
//         })
//         return
//       }
//       setStep(2)
//     } else if (step === 2) {
//       if (isEmailVerified) {
//         setStep(3)
//       } else {
//         toast.info("Vérification requise", {
//           description: "Veuillez vérifier votre email avant de continuer",
//         })
//       }
//     }
//   }

//   const handleEmailVerified = () => {
//     setIsEmailVerified(true)
//     toast.success("Email vérifié", {
//       description: "Votre email a été vérifié avec succès",
//     })
//   }

//   const prevStep = () => {
//     setStep((prev) => Math.max(1, prev - 1))
//   }

//   const handleCountryChange = (countryName: string) => {
//     const selected = countries.find((c) => c.name === countryName)
//     if (!selected) return

//     setFormData((prev) => ({
//       ...prev,
//       country: selected.name,
//       selectedCountryCode: selected.code,
//       // Ne pas réinitialiser le téléphone pour permettre la détection automatique du pays
//     }))

//     setErrors((prev) => {
//       const newErrors = { ...prev }
//       delete newErrors.country
//       return newErrors
//     })
//   }

//   // Obtenir le code pays actuel pour PhoneInput
//   const getCurrentCountryCode = (): string => {
//     return formData.selectedCountryCode || "MA"
//   }

//   // Obtenir l'exemple de format pour le pays sélectionné
//   const getPhoneExample = (): string => {
//     const country = updatedCountriesList.find((c) => c.code === formData.selectedCountryCode)
//     return country?.example || "Format international"
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
//       <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
//         {renderProgressSteps()}

//         {/* Étape 1 - Identité */}
//         {step === 1 && (
//           <div className="space-y-8">
//             <div className="border-b border-gray-100 pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
//                 <User className="mr-2 text-blue-600" size={24} />
//                 Informations personnelles
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">Tous les champs marqués d'un * sont obligatoires</p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center">
//                   Prénom <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="firstName"
//                     value={formData.firstName}
//                     onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                     onBlur={() =>
//                       !formData.firstName &&
//                       setErrors((prev) => ({
//                         ...prev,
//                         firstName: "Le prénom est requis",
//                       }))
//                     }
//                     className={cn(
//                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                       errors.firstName && "border-red-500 focus:ring-red-100",
//                     )}
//                   />
//                   <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
//                 </div>
//                 {errors.firstName && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center">
//                   Nom <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="lastName"
//                     value={formData.lastName}
//                     onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                     onBlur={() =>
//                       !formData.lastName &&
//                       setErrors((prev) => ({
//                         ...prev,
//                         lastName: "Le nom est requis",
//                       }))
//                     }
//                     className={cn(
//                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                       errors.lastName && "border-red-500 focus:ring-red-100",
//                     )}
//                   />
//                   <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
//                 </div>
//                 {errors.lastName && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.lastName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
//                   Email <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     onBlur={handleEmailBlur}
//                     className={cn(
//                       "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                       errors.email && "border-red-500 focus:ring-red-100",
//                     )}
//                   />
//                   <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
//                   {isCheckingEmail && (
//                     <Loader2 className="absolute right-3 top-3.5 text-blue-500 animate-spin" size={18} />
//                   )}
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.email}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">Format : exemple@domaine.com</p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="country" className="text-sm font-semibold text-gray-700 flex items-center">
//                   Pays <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <CountrySelector
//                   value={formData.country}
//                   onChange={handleCountryChange}
//                   onPrefixChange={() => {}} // Pas besoin car on gère le préfixe différemment
//                   error={errors.country}
//                   countries={countries}
//                 />
//                 {errors.country && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.country}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
//                   Ville
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="city"
//                     value={formData.city}
//                     onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                     className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                   />
//                   <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
//                   Téléphone <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div
//                   className={cn(
//                     "rounded-lg bg-white h-12 border",
//                     errors.phone ? "border-red-500" : "border-gray-300 focus-within:border-blue-500",
//                   )}
//                 >
//                   <PhoneInput
//                     defaultCountry={getCurrentCountryCode() as any}
//                     value={formData.phone || undefined} // Passer undefined si vide pour éviter l'erreur E.164
//                     onChange={handlePhoneChange}
//                     onBlur={handlePhoneBlur}
//                     className="w-full h-full border-none focus:outline-none focus:ring-0"
//                     international
//                     countryCallingCodeEditable={false}
//                     placeholder="Entrez votre numéro de téléphone"
//                   />
//                   {isCheckingPhone && (
//                     <div className="absolute right-3 top-3 pointer-events-none">
//                       <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
//                     </div>
//                   )}
//                 </div>
//                 {errors.phone && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.phone}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">{getPhoneExample()}</p>
//               </div>
//             </div>

//             <div className="flex justify-end pt-6 border-t border-gray-100">
//               <Button
//                 type="button"
//                 onClick={handleContinue}
//                 disabled={isSubmitting || isCheckingEmail || isCheckingPhone}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
//               >
//                 {isSubmitting || isCheckingEmail || isCheckingPhone ? (
//                   <>
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Vérification...
//                   </>
//                 ) : (
//                   <>
//                     Continuer
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Étape 2 - Vérification email */}
//         {step === 2 && (
//           <div className="space-y-8">
//             {success && (
//               <Alert variant="default" className="mb-4 bg-green-50 border-green-200 text-green-800">
//                 <CheckCircle2 className="h-4 w-4 text-green-600" />
//                 <AlertDescription>{success}</AlertDescription>
//               </Alert>
//             )}
//             <div className="border-b border-gray-100 pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
//                 <Shield className="mr-2 text-blue-600" size={24} />
//                 Vérification de votre email
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">Vérifiez votre adresse email pour continuer</p>
//             </div>
//             <EmailVerification email={formData.email} onVerified={handleEmailVerified} onBack={prevStep} />

//             <div className="flex justify-between pt-6 border-t border-gray-100">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
//               >
//                 Retour
//               </Button>

//               <Button
//                 type="button"
//                 onClick={nextStep}
//                 disabled={!isEmailVerified}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
//               >
//                 Suivant
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Étape 3 - Profil */}
//         {step === 3 && (
//           <div className="space-y-8">
//             <div className="border-b border-gray-100 pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
//                 <Briefcase className="mr-2 text-blue-600" size={24} />
//                 Votre profil professionnel
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">Parlez-nous de vos intérêts et objectifs professionnels</p>
//             </div>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="sector" className="text-sm font-semibold text-gray-700 flex items-center">
//                   Secteur d'activité <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Select
//                     value={formData.sector}
//                     onValueChange={(value) => setFormData({ ...formData, sector: value })}
//                   >
//                     <SelectTrigger
//                       className={cn(
//                         "pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200",
//                         errors.sector && "border-red-500 focus:ring-red-100",
//                       )}
//                     >
//                       <SelectValue placeholder="Sélectionnez votre secteur" />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
//                       <SelectItem value="TECHNOLOGIE">Technologie</SelectItem>
//                       <SelectItem value="AGRO_HALIEUTIQUE">Agro-Halieutique</SelectItem>
//                       <SelectItem value="FINANCE">Finance</SelectItem>
//                       <SelectItem value="SANTE">Santé</SelectItem>
//                       <SelectItem value="ENERGIE_DURABILITE">Énergie & Durabilité</SelectItem>
//                       <SelectItem value="TRANSPORT">Transport</SelectItem>
//                       <SelectItem value="INDUSTRIE">Industrie</SelectItem>
//                       <SelectItem value="COMMERCE_DISTRIBUTION">Commerce & Distribution</SelectItem>
//                       <SelectItem value="SERVICES_PROFESSIONNELS">Services Professionnels</SelectItem>
//                       <SelectItem value="EDUCATION">Éducation</SelectItem>
//                       <SelectItem value="TOURISME">Tourisme</SelectItem>
//                       <SelectItem value="MEDIA_DIVERTISSEMENT">Média & Divertissement</SelectItem>
//                       <SelectItem value="AUTRES">Autres</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
//                 </div>
//                 {errors.sector && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.sector}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-sm font-semibold text-gray-700 flex items-center">
//                   Centres d'intérêt professionnels
//                 </Label>
//                 <div className="grid md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
//                   {["MENTORAT", "RESEAUTAGE", "EMPLOI", "FORMATION", "AUTRE"].map((interest) => (
//                     <div
//                       key={interest}
//                       className="flex items-center space-x-2 p-2 hover:bg-white rounded-md transition-all duration-200"
//                     >
//                       <Checkbox
//                         id={`interest-${interest}`}
//                         checked={formData.professionalInterests.includes(interest)}
//                         onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
//                         className="border-gray-300 text-blue-600 focus:ring-blue-500 rounded"
//                       />
//                       <Label htmlFor={`interest-${interest}`} className="text-sm text-gray-700 cursor-pointer">
//                         {interest.charAt(0) + interest.slice(1).toLowerCase()}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//                 {errors.professionalInterests && (
//                   <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//                     <AlertCircle className="mr-1 h-4 w-4" /> {errors.professionalInterests}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="professionalChallenges" className="text-sm font-semibold text-gray-700">
//                   Défis professionnels actuels
//                 </Label>
//                 <Textarea
//                   id="professionalChallenges"
//                   value={formData.professionalChallenges}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       professionalChallenges: e.target.value,
//                     })
//                   }
//                   rows={4}
//                   placeholder="Décrivez brièvement vos défis professionnels..."
//                   className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 resize-none"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="referralSource" className="text-sm font-semibold text-gray-700">
//                   Comment avez-vous entendu parler de nous ?
//                 </Label>
//                 <div className="relative">
//                   <Select
//                     value={formData.referralSource}
//                     onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
//                   >
//                     <SelectTrigger className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200">
//                       <SelectValue placeholder="Sélectionnez une option" />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-60 bg-white rounded-lg shadow-lg border-gray-100">
//                       <SelectItem value="SOCIAL_MEDIA">Réseaux sociaux</SelectItem>
//                       <SelectItem value="SEARCH">Moteur de recherche</SelectItem>
//                       <SelectItem value="FRIEND">Recommandation</SelectItem>
//                       <SelectItem value="EVENT">Événement</SelectItem>
//                       <SelectItem value="OTHER">Autre</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
//                 <Checkbox
//                   id="subscribedToNewsletter"
//                   checked={formData.subscribedToNewsletter}
//                   onCheckedChange={(checked) =>
//                     setFormData({
//                       ...formData,
//                       subscribedToNewsletter: checked as boolean,
//                     })
//                   }
//                   className="border-blue-300 text-blue-600 focus:ring-blue-500 rounded"
//                 />
//                 <Label htmlFor="subscribedToNewsletter" className="text-sm text-blue-900 font-medium">
//                   Je souhaite recevoir la newsletter
//                 </Label>
//               </div>
//             </div>

//             <div className="flex justify-between pt-6 border-t border-gray-100">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-300 font-semibold"
//               >
//                 Retour
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Finalisation...
//                   </>
//                 ) : (
//                   "Finaliser l'inscription"
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </form>
//   )
// }




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
import { emailSchema, phoneSchema } from "@/utils/validation"
import { useSearchParams } from "next/navigation"
import CountrySelector from "@/components/country-selector-pro"
import { cn } from "@/lib/utils"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Alert, AlertDescription } from "./ui/alert"
import { updatedCountriesList, isValidPhoneForCountry } from "@/lib/form-utils"

const formSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: emailSchema,
  phone: phoneSchema,
  city: z.string().optional(),
  country: z.string().min(1, "Le pays est requis"),
  sector: z.string().min(1, "Sélectionnez un secteur"),
  professionalInterests: z.array(z.string()).optional(),
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
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "Maroc",
    selectedCountryCode: "MA",
    sector: "",
    professionalInterests: [] as string[],
    professionalChallenges: "",
    subscribedToNewsletter: false,
    referralSource: "",
    parrainId: ref || parrainId || "",
  })

  // Convertir la liste des pays au format attendu par le composant CountrySelector
  const countries = updatedCountriesList.map((country) => ({
    name: country.name,
    code: country.code,
    prefix: country.prefix,
    flag: country.flag,
  }))

  useEffect(() => {
    // Définir le pays par défaut
    const defaultCountry = countries.find((c) => c.name === "Maroc")
    if (defaultCountry) {
      setFormData((prev) => ({
        ...prev,
        country: defaultCountry.name,
        selectedCountryCode: defaultCountry.code,
        phone: "", // Initialiser avec une chaîne vide
      }))
    }
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

  // Fonction pour nettoyer un numéro de téléphone et compter uniquement les chiffres
  const cleanPhoneNumber = (phone: string): string => {
    if (!phone) return ""
    // Supprimer tous les caractères non numériques (espaces, tirets, parenthèses, points, +)
    return phone.replace(/\D/g, "")
  }

  // Fonction pour convertir au format E.164 strict (sans espaces)
  const toE164Format = (phone: string): string => {
    const cleaned = cleanPhoneNumber(phone)
    if (!cleaned) return ""

    // S'assurer que le numéro commence par +
    if (phone.startsWith("+")) {
      return "+" + cleaned
    }

    return cleaned
  }

  // Fonction pour obtenir les longueurs exactes par pays (en comptant uniquement les chiffres)
  const getPhoneLengthLimits = (countryCode: string): { exactLength?: number; min?: number; max?: number } => {
    const limits: Record<string, { exactLength?: number; min?: number; max?: number }> = {
      // Pays avec longueur exacte
      MA: { exactLength: 12 }, // +212 + 9 chiffres = 12 chiffres total
      FR: { exactLength: 11 }, // +33 + 9 chiffres = 11 chiffres total
      CA: { exactLength: 11 }, // +1 + 10 chiffres = 11 chiffres total
      US: { exactLength: 11 }, // +1 + 10 chiffres = 11 chiffres total
      ES: { exactLength: 11 }, // +34 + 9 chiffres = 11 chiffres total
      IT: { exactLength: 12 }, // +39 + 9 chiffres = 12 chiffres total
      BE: { exactLength: 11 }, // +32 + 9 chiffres = 11 chiffres total
      CH: { exactLength: 11 }, // +41 + 9 chiffres = 11 chiffres total
      DZ: { exactLength: 12 }, // +213 + 9 chiffres = 12 chiffres total
      TN: { exactLength: 11 }, // +216 + 8 chiffres = 11 chiffres total
      SN: { exactLength: 12 }, // +221 + 9 chiffres = 12 chiffres total
      CI: { exactLength: 13 }, // +225 + 10 chiffres = 13 chiffres total
      CM: { exactLength: 12 }, // +237 + 9 chiffres = 12 chiffres total

      // Pays avec plage de longueurs
      GB: { min: 13, max: 14 }, // +44 + 10-11 chiffres
      DE: { min: 12, max: 15 }, // +49 + 10-13 chiffres (variable selon la région)
    }

    return limits[countryCode] || { min: 10, max: 15 } // Valeurs par défaut
  }

  // Fonction pour valider le format selon le pays sélectionné avec vérification de longueur stricte
  const validatePhoneFormat = (phone: string, countryCode: string): { isValid: boolean; error?: string } => {
    if (!phone) {
      return { isValid: false, error: "Le numéro de téléphone est requis" }
    }

    const country = updatedCountriesList.find((c) => c.code === countryCode)
    if (!country) {
      return { isValid: false, error: "Pays non reconnu" }
    }

    // Nettoyer le numéro pour compter uniquement les chiffres
    const cleanPhone = cleanPhoneNumber(phone)

    // Obtenir les limites de longueur pour ce pays
    const limits = getPhoneLengthLimits(countryCode)

    // Vérifier la longueur selon le type de limite
    if (limits.exactLength) {
      // Longueur exacte requise
      if (cleanPhone.length !== limits.exactLength) {
        return { isValid: false, error: "Format invalide" }
      }
    } else if (limits.min && limits.max) {
      // Plage de longueurs
      if (cleanPhone.length < limits.min || cleanPhone.length > limits.max) {
        return { isValid: false, error: "Format invalide" }
      }
    }

    // Préparer le numéro pour la validation regex selon le pays SÉLECTIONNÉ
    let phoneToValidate = phone

    // Forcer le préfixe du pays sélectionné
    if (!phoneToValidate.startsWith(country.prefix)) {
      // Si le numéro commence par 0, le remplacer par le préfixe du pays sélectionné
      if (phoneToValidate.startsWith("0")) {
        phoneToValidate = country.prefix + phoneToValidate.substring(1)
      }
      // Si le numéro commence par un autre préfixe (+), vérifier s'il correspond au pays sélectionné
      else if (phoneToValidate.startsWith("+")) {
        if (!phoneToValidate.startsWith(country.prefix)) {
          return { isValid: false, error: "Format invalide pour " + country.name }
        }
      }
      // Sinon, ajouter le préfixe du pays sélectionné
      else {
        phoneToValidate = country.prefix + phoneToValidate
      }
    }

    // Valider le numéro avec le regex du pays sélectionné
    const isValid = isValidPhoneForCountry(phoneToValidate, countryCode)

    if (!isValid) {
      return { isValid: false, error: "Format invalide pour " + country.name }
    }

    return { isValid: true }
  }

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
      setIsCheckingEmail(true)
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
      sessionStorage.setItem(`verification_${formData.email}`, verificationToken)

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
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailContent),
      })
      setSuccess("Code de vérification envoyé à votre adresse email")

      if (!response.ok) throw new Error("Échec de l'envoi du code")

      setStep(2)
    } catch (error) {
      console.error("Erreur :", error)
      toast.error("Erreur lors de l'envoi de l'email de vérification.")
    } finally {
      setIsCheckingEmail(false)
    }
  }

  // Fonction pour gérer les changements du numéro de téléphone avec validation stricte par pays sélectionné
  const handlePhoneChange = (value?: string) => {
    // Convertir au format E.164 strict pour éviter l'erreur
    const cleanValue = value ? toE164Format(value) : ""

    // Mettre à jour le numéro de téléphone SANS changer le pays
    setFormData((prev) => ({ ...prev, phone: cleanValue }))

    // Valider immédiatement selon le pays SÉLECTIONNÉ dans la liste déroulante
    if (cleanValue && cleanValue.length >= 3) {
      const countryCode = formData.selectedCountryCode
      const validation = validatePhoneFormat(cleanValue, countryCode)

      if (!validation.isValid) {
        setErrors((prev) => ({
          ...prev,
          phone: validation.error || "Format invalide",
        }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.phone
          return newErrors
        })
      }
    } else {
      // Effacer les erreurs si le champ est vide ou trop court
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
      setErrors((prev) => ({
        ...prev,
        phone: "Le numéro de téléphone est requis",
      }))
      return false
    }

    const countryCode = formData.selectedCountryCode
    if (!countryCode) {
      setErrors((prev) => ({
        ...prev,
        phone: "Pays non sélectionné",
      }))
      return false
    }

    // Valider le format
    const validation = validatePhoneFormat(phone, countryCode)

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        phone: validation.error || "Format invalide",
      }))
      return false
    }

    // Effacer les erreurs
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.phone
      return newErrors
    })

    // Vérification d'unicité avec le numéro nettoyé
    setIsCheckingPhone(true)
    const cleanPhone = toE164Format(phone)
    const isUnique = await checkUnique("phone", cleanPhone)
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
              })
            : z.object({})

      if (stepToValidate === 1) {
        const phone = formData.phone
        const countryCode = formData.selectedCountryCode

        if (phone && countryCode) {
          const validation = validatePhoneFormat(phone, countryCode)
          if (!validation.isValid) {
            throw new z.ZodError([
              {
                code: z.ZodIssueCode.custom,
                path: ["phone"],
                message: validation.error || "Format invalide",
              },
            ])
          }
        }

        partialSchema.parse({ ...formData, phone: formData.phone })
      } else if (stepToValidate === 3) {
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
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.professionalInterests
          return newErrors
        })
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
        ...formData,
        phone: toE164Format(formData.phone), // S'assurer que le téléphone est au format E.164
        professionalInterests: formData.professionalInterests || [],
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
          setErrors((prev) => ({
            ...prev,
            email: result.error || "Cet email est déjà utilisé",
          }))
          toast.error("Email déjà utilisé", {
            description: result.error,
          })
        } else if (result.field === "phone") {
          setErrors((prev) => ({
            ...prev,
            phone: result.error || "Ce numéro est déjà utilisé",
          }))
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

  const handleCountryChange = (countryName: string) => {
    const selected = countries.find((c) => c.name === countryName)
    if (!selected) return

    setFormData((prev) => ({
      ...prev,
      country: selected.name,
      selectedCountryCode: selected.code,
    }))

    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.country
      delete newErrors.phone // Effacer l'erreur de téléphone lors du changement de pays
      return newErrors
    })

    // Revalider le téléphone avec le nouveau pays si il y en a un
    if (formData.phone) {
      setTimeout(() => {
        const validation = validatePhoneFormat(formData.phone, selected.code)
        if (!validation.isValid) {
          setErrors((prev) => ({
            ...prev,
            phone: validation.error || "Format invalide",
          }))
        }
      }, 0)
    }
  }

  // Obtenir le code pays actuel pour PhoneInput
  const getCurrentCountryCode = (): string => {
    return formData.selectedCountryCode || "MA"
  }

  // Obtenir l'exemple de format pour le pays sélectionné avec indication de longueur stricte
  const getPhoneExample = (): string => {
    const country = updatedCountriesList.find((c) => c.code === formData.selectedCountryCode)
    const limits = getPhoneLengthLimits(formData.selectedCountryCode)

    let lengthInfo = ""
    if (limits.exactLength) {
      lengthInfo = ` (exactement ${limits.exactLength} chiffres)`
    } else if (limits.min && limits.max) {
      lengthInfo = ` (${limits.min}-${limits.max} chiffres)`
    }

    const countryName = country?.name || "ce pays"
    return `Format pour ${countryName}${lengthInfo}`
  }

return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        {renderProgressSteps()}

        {/* Étape 1 - Identité */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <User className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
                Informations personnelles
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Tous les champs marqués d'un * sont obligatoires</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  Prénom <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    onBlur={() =>
                      !formData.firstName &&
                      setErrors((prev) => ({
                        ...prev,
                        firstName: "Le prénom est requis",
                      }))
                    }
                    className={cn(
                      "pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-200",
                      errors.firstName && "border-red-500 dark:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/50",
                    )}
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  Nom <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    onBlur={() =>
                      !formData.lastName &&
                      setErrors((prev) => ({
                        ...prev,
                        lastName: "Le nom est requis",
                      }))
                    }
                    className={cn(
                      "pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-200",
                      errors.lastName && "border-red-500 dark:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/50",
                    )}
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
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
                      "pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-200",
                      errors.email && "border-red-500 dark:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/50",
                    )}
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                  {isCheckingEmail && (
                    <Loader2 className="absolute right-3 top-3.5 text-blue-500 dark:text-blue-400 animate-spin" size={18} />
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.email}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Format : exemple@domaine.com</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  Pays <span className="text-red-500 ml-1">*</span>
                </Label>
                <CountrySelector
                  value={formData.country}
                  onChange={handleCountryChange}
                  onPrefixChange={() => {}} // Pas besoin car on gère le préfixe différemment
                  error={errors.country}
                  countries={countries}
                />
                {errors.country && (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.country}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Ville
                </Label>
                <div className="relative">
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-200"
                  />
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  Téléphone <span className="text-red-500 ml-1">*</span>
                </Label>
                <div
                  className={cn(
                    "rounded-lg bg-white dark:bg-gray-800 h-12 border",
                    errors.phone ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400",
                  )}
                >
                  <PhoneInput
                    defaultCountry={getCurrentCountryCode() as any}
                    value={formData.phone || undefined} // Passer undefined si vide pour éviter l'erreur E.164
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    className="w-full h-full border-none focus:outline-none focus:ring-0"
                    international
                    countryCallingCodeEditable={false}
                    placeholder="Entrez votre numéro de téléphone"
                  />
                  {isCheckingPhone && (
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500 dark:text-blue-400" />
                    </div>
                  )}
                </div>
                {errors.phone ? (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.phone}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{getPhoneExample()}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                type="button"
                onClick={handleContinue}
                disabled={isSubmitting || isCheckingEmail || isCheckingPhone}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-400 dark:hover:to-indigo-400 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white dark:text-gray-100"
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
            {success && (
              <Alert variant="default" className="mb-4 bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Shield className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
                Vérification de votre email
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Vérifiez votre adresse email pour continuer</p>
            </div>
            <EmailVerification email={formData.email} onVerified={handleEmailVerified} onBack={prevStep} />

            <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg shadow-sm transition-all duration-300 font-semibold"
              >
                Retour
              </Button>

              <Button
                type="button"
                onClick={nextStep}
                disabled={!isEmailVerified}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-400 dark:hover:to-indigo-400 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white dark:text-gray-100 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Suivant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Étape 3 - Profil */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Briefcase className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
                Votre profil professionnel
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Parlez-nous de vos intérêts et objectifs professionnels</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sector" className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  Secteur d'activité <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData({ ...formData, sector: value })}
                  >
                    <SelectTrigger
                      className={cn(
                        "pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-200",
                        errors.sector && "border-red-500 dark:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/50",
                      )}
                    >
                      <SelectValue placeholder="Sélectionnez votre secteur" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-gray-100 dark:border-gray-700">
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
                  <Briefcase className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                </div>
                {errors.sector && (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.sector}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  Centres d'intérêt professionnels
                </Label>
                <div className="grid md:grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                  {["MENTORAT", "RESEAUTAGE", "EMPLOI", "FORMATION", "AUTRE"].map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center space-x-2 p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-all duration-200"
                    >
                      <Checkbox
                        id={`interest-${interest}`}
                        checked={formData.professionalInterests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        className="border-gray-300 dark:border-gray-500 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded"
                      />
                      <Label htmlFor={`interest-${interest}`} className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                        {interest.charAt(0) + interest.slice(1).toLowerCase()}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.professionalInterests && (
                  <p className="text-red-500 dark:text-red-400 text-xs flex items-center mt-1 animate-in fade-in">
                    <AlertCircle className="mr-1 h-4 w-4" /> {errors.professionalInterests}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalChallenges" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Défis professionnels actuels
                </Label>
                <Textarea
                  id="professionalChallenges"
                  value={formData.professionalChallenges}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalChallenges: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Décrivez brièvement vos défis professionnels..."
                  className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 rounded-lg transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralSource" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Comment avez-vous entendu parler de nous ?
                </Label>
                <div className="relative">
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
                  >
                    <SelectTrigger className="pl-10 h-12 rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-200">
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-gray-100 dark:border-gray-700">
                      <SelectItem value="SOCIAL_MEDIA">Réseaux sociaux</SelectItem>
                      <SelectItem value="SEARCH">Moteur de recherche</SelectItem>
                      <SelectItem value="FRIEND">Recommandation</SelectItem>
                      <SelectItem value="EVENT">Événement</SelectItem>
                      <SelectItem value="OTHER">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <Briefcase className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg border border-blue-100 dark:border-blue-700">
                <Checkbox
                  id="subscribedToNewsletter"
                  checked={formData.subscribedToNewsletter}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      subscribedToNewsletter: checked as boolean,
                    })
                  }
                  className="border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded"
                />
                <Label htmlFor="subscribedToNewsletter" className="text-sm text-blue-900 dark:text-blue-200 font-medium">
                  Je souhaite recevoir la newsletter
                </Label>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg shadow-sm transition-all duration-300 font-semibold"
              >
                Retour
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-400 dark:hover:to-indigo-400 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold text-white dark:text-gray-100"
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
