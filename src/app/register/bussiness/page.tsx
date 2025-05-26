"use client";

import BusinessForm from "@/components/business-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, Suspense } from "react"; // Import Suspense
import { motion } from "framer-motion";

// Fallback component for Suspense
function BusinessRegisterPageFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}

// Main component wrapped in Suspense
function BusinessRegisterPageContent() {
  const searchParams = useSearchParams();
  const parrainId = searchParams.get("ref") || "";
  const utmSource = "";
  const utmMedium = "";
  const utmCampaign = "";
  const [currentStep, setCurrentStep] = useState(1);

  const onStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const getBusinessFormTitle = () => {
    if (currentStep === 1) return "Informations personnelles";
    if (currentStep === 2) return "Vérification email";
    return "Profil entreprise";
  };

  const getBusinessFormDescription = () => {
    if (currentStep === 1) return "Renseignez vos informations et celles de votre entreprise.";
    if (currentStep === 2) return "Confirmez votre adresse email pour sécuriser votre compte.";
    return "Complétez le profil de votre entreprise pour personnaliser votre expérience.";
  };

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
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full h-auto fill-gray-50"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </header>
      <div className="max-w-6xl mx-auto">
        <Card className="border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {getBusinessFormTitle()}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1 text-sm">
              {getBusinessFormDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <BusinessForm
              utmSource={utmSource}
              utmMedium={utmMedium}
              utmCampaign={utmCampaign}
              onStepChange={onStepChange}
              parrainId={parrainId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function BusinessRegisterPage() {
  return (
    <Suspense fallback={<BusinessRegisterPageFallback />}>
      <BusinessRegisterPageContent />
    </Suspense>
  );
}