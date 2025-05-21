"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function EmailVerification({
  email,
  onVerified,
  onBack,
}: EmailVerificationProps) {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  // Fonction pour formater le temps restant (mm:ss)
  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  // Effet pour gérer le compte à rebours
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (remainingTime === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [remainingTime, resendDisabled]);

  const sendVerificationEmail = async () => {
    setIsSending(true);
    setError(null);

    try {
      let verificationToken;
      const existingToken = sessionStorage.getItem(`verification_${email}`);

      if (existingToken) {
        verificationToken = existingToken;
      } else {
        verificationToken = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        sessionStorage.setItem(`verification_${email}`, verificationToken);
      }

      const emailContent = {
        to: email,
        subject: "Vérification de votre adresse email",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Vérification de votre adresse email</h2>
            <p>Merci de votre inscription ! Pour continuer, veuillez utiliser le code de vérification ci-dessous :</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
              ${verificationToken}
            </div>
            <p>Ce code est valable pendant 10 minutes.</p>
            <p>Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email.</p>
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

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email");
      }

      setSuccess("Code de vérification envoyé à votre adresse email");

      setRemainingTime(60);
      setResendDisabled(true);
    } catch (err) {
      console.error("Erreur:", err);
      setError(
        "Une erreur est survenue lors de l'envoi du code de vérification"
      );
    } finally {
      setIsSending(false);
    }
  };

  const verifyToken = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Récupérer le token stocké
      const storedToken = sessionStorage.getItem(`verification_${email}`);

      if (!storedToken) {
        throw new Error(
          "Le code de vérification a expiré. Veuillez demander un nouveau code."
        );
      }

      if (token === storedToken) {
        setIsVerified(true);
        setSuccess("Adresse email vérifiée avec succès !");

        // Nettoyer le token après vérification réussie
        sessionStorage.removeItem(`verification_${email}`);

        // Informer le composant parent que l'email est vérifié
        setTimeout(() => {
          onVerified();
        }, 1000);
      } else {
        throw new Error("Code de vérification incorrect");
      }
    } catch (err: any) {
      setError(
        err.message || "Une erreur est survenue lors de la vérification"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <Mail className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Nous devons vérifier votre adresse email pour continuer :
            </p>
            <p className="text-sm font-medium text-blue-900 mt-1">{email}</p>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert
          variant="default"
          className="mb-4 bg-green-50 border-green-200 text-green-800"
        >
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {isVerified ? (
        <div className="flex flex-col items-center justify-center py-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <p className="text-center font-medium">Vérification réussie !</p>
          <p className="text-center text-sm text-muted-foreground">
            Vous pouvez maintenant continuer
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label
              htmlFor="verificationToken"
              className="text-gray-700 font-medium"
            >
              Code de vérification
            </Label>
            <Input
              id="verificationToken"
              placeholder="Entrez le code à 6 chiffres"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              maxLength={6}
              className="h-12 text-center text-lg tracking-widest border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Vérifiez votre boîte de réception et saisissez le code à 6
              chiffres
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              type="button"
              onClick={verifyToken}
              disabled={token.length !== 6 || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Vérification...
                </>
              ) : (
                "Vérifier le code"
              )}
            </Button>

            {/* <Button
              type="button"
              variant="ghost"
              onClick={sendVerificationEmail}
              disabled={isSending || resendDisabled}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : resendDisabled ? (
                `Renvoyer le code (${formatTime(remainingTime)})`
              ) : (
                "Envoyer le code de vérification"
              )}
            </Button> */} 

        <Button //button de renvoi
  type="button"
  variant="ghost"
  onClick={sendVerificationEmail}
  disabled={isSending || resendDisabled}
  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
>
  {isSending ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Envoi en cours...
    </>
  ) : (
    `Renvoyer le code${resendDisabled ? ` (${formatTime(remainingTime)})` : ""}`
  )}
</Button>
            
         <Button //button de retour
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-blue-600 font-medium bg-white transition-colors duration-150 hover:bg-blue-50 hover:border-gray-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 active:scale-[0.98]"
            style={{ width: '150px' }} // largeur fixe
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>



          </div>
        </>
      )}
    </div>
  );
}
