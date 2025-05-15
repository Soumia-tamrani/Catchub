"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, Building2, CheckCircle, Star, Gift, Clock, Zap, ArrowLeft } from "lucide-react"
import ProfessionalForm from "@/components/professional-form"
import { motion } from "framer-motion"
import BusinessForm from "@/components/business-form"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [hoverPro, setHoverPro] = useState(false)
  const [hoverBiz, setHoverBiz] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  // Récupération du parrainId depuis l'URL
  const searchParams = useSearchParams()
  const parrainId = searchParams.get("ref") || ""

  // Get UTM parameters if available
  const utmSource = ""
  const utmMedium = ""
  const utmCampaign = ""

  // Define totalSpots and remainingSpots
  const totalSpots = 100
  const remainingSpots = 25
  const percentageTaken = ((totalSpots - remainingSpots) / totalSpots) * 100

  const onStepChange = (step: number) => {
    setCurrentStep(step)
  }

  // Fonction pour afficher le titre approprié selon l'étape du formulaire entreprise
  const getBusinessFormTitle = () => {
    if (currentStep === 1) return "Informations personnelles"
    if (currentStep === 2) return "Vérification email"
    return "Profil entreprise"
  }

  // Fonction pour afficher la description appropriée selon l'étape du formulaire entreprise
  const getBusinessFormDescription = () => {
    if (currentStep === 1) return "Renseignez vos informations et celles de votre entreprise."
    if (currentStep === 2) return "Confirmez votre adresse email pour sécuriser votre compte."
    return "Complétez le profil de votre entreprise pour personnaliser votre expérience."
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative w-full bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800 py-16 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/20"></div>
          <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-white/20"></div>
          <div className="absolute bottom-5 left-1/3 w-32 h-32 rounded-full bg-white/20"></div>
        </div>

        {/* Header content */}
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-lg border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-semibold text-sm tracking-wide">Retour à l'accueil</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              Lancez votre avenir dès maintenant
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Profitez d'un mois gratuit pour explorer nos services et concrétiser vos ambitions.
            </p>
          </motion.div>

          {!activeTab && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-8 text-center"
            >
              <div className="inline-block bg-white/10 backdrop-blur-lg px-6 py-4 rounded-xl border border-white/20 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-1">Choisissez votre profil</h2>
                <p className="text-white/80 text-sm max-w-sm">
                  Sélectionnez le profil qui correspond le mieux à vos objectifs.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto fill-gray-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {!activeTab ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative"
                onMouseEnter={() => setHoverPro(true)}
                onMouseLeave={() => setHoverPro(false)}
              >
                <button
                  onClick={() => setActiveTab("professional")}
                  className={`w-full flex flex-col items-center justify-start p-8 rounded-2xl border-2 transition-all duration-300 bg-white shadow-lg ${
                    hoverPro
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl"
                      : "border-gray-100 shadow-md"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                      hoverPro ? "bg-blue-600" : "bg-blue-100"
                    }`}
                  >
                    <UserRound
                      className={`h-8 w-8 transition-all duration-300 ${hoverPro ? "text-white" : "text-blue-600"}`}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Professionnel</h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed mb-6 max-w-xs">
                    Idéal pour les freelances, indépendants et particuliers souhaitant booster leur carrière.
                  </p>

                  <div className="space-y-3 text-left w-full">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Offres d'emploi exclusives</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Mentorat personnalisé</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Événements de networking</span>
                    </div>
                  </div>

                  <div
                    className={`mt-8 py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300 ${
                      hoverPro
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    S'inscrire gratuitement
                  </div>
                </button>

                {hoverPro && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                  >
                    Populaire
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onMouseEnter={() => setHoverBiz(true)}
                onMouseLeave={() => setHoverBiz(false)}
              >
                <button
                  onClick={() => setActiveTab("business")}
                  className={`w-full flex flex-col items-center justify-start p-8 rounded-2xl border-2 transition-all duration-300 bg-white shadow-lg ${
                    hoverBiz
                      ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-xl"
                      : "border-gray-100 shadow-md"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                      hoverBiz ? "bg-indigo-600" : "bg-indigo-100"
                    }`}
                  >
                    <Building2
                      className={`h-8 w-8 transition-all duration-300 ${hoverBiz ? "text-white" : "text-indigo-600"}`}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Entreprise</h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed mb-6 max-w-xs">
                    Parfait pour les entreprises cherchant à recruter et développer leur réseau B2B.
                  </p>

                  <div className="space-y-3 text-left w-full">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Accès à des talents qualifiés</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Partenariats B2B stratégiques</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Visibilité de marque accrue</span>
                    </div>
                  </div>

                  <div
                    className={`mt-8 py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300 ${
                      hoverBiz
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    S'inscrire gratuitement
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Early access benefits */}
            <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
              <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">Avantages de l'accès anticipé</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Gift className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">1 mois gratuit</h4>
                  <p className="text-sm text-gray-600 mt-1">Sans engagement</p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Accès prioritaire</h4>
                  <p className="text-sm text-gray-600 mt-1">Avant le lancement public</p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Fonctionnalités VIP</h4>
                  <p className="text-sm text-gray-600 mt-1">Exclusives aux premiers</p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Offre limitée</h4>
                  <p className="text-sm text-gray-600 mt-1">Places restreintes</p>
                </div>
              </div>
            </div>

            {/* Remaining spots indicator */}
            <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Places disponibles pour l'accès anticipé</h4>
                  <p className="text-gray-600 mt-1">
                    Seulement <span className="text-blue-600 font-bold">{remainingSpots}</span> places sur {totalSpots}{" "}
                    restantes
                  </p>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentageTaken}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>0</span>
                    <span>{totalSpots}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                En vous inscrivant, vous acceptez nos{" "}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Conditions d'utilisation
                </a>{" "}
                et notre{" "}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Politique de confidentialité
                </a>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {activeTab === "professional" ? "Inscription Professionnel" : getBusinessFormTitle()}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1 text-sm">
                    {activeTab === "professional"
                      ? "Rejoignez notre communauté pour accéder à des opportunités uniques."
                      : getBusinessFormDescription()}
                  </CardDescription>
                </div>
                <button
                  onClick={() => setActiveTab(null)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline underline-offset-4 transition-colors"
                >
                  Changer de profil
                </button>
              </CardHeader>

              <CardContent className="p-0">
                {activeTab === "professional" ? (
                  <div className="w-full">
                    <ProfessionalForm utmSource={utmSource} utmMedium={utmMedium} utmCampaign={utmCampaign} parrainId={parrainId}  />
                  </div>
                ) : (
                  <div className="w-full">
                    <BusinessForm
                      utmSource={utmSource}
                      utmMedium={utmMedium}
                      utmCampaign={utmCampaign}
                      onStepChange={onStepChange}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
