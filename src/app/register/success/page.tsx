"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${userId}`

  const handleCopy = useCallback(() => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink).then(() => {
        alert("Lien copié !");
      })
    }
  }, [inviteLink])

  const shareVia = useCallback((platform: string) => {
    if (!inviteLink) return

    let shareUrl = ""

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(inviteLink)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(inviteLink)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`
        break
      case "instagram":
        navigator.clipboard.writeText(inviteLink)
        alert("Lien copié ! Collez-le dans Instagram.")
        return
      case "email":
        shareUrl = `mailto:?subject=Je vous invite&body=${encodeURIComponent(inviteLink)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }, [inviteLink])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h1>
          <p className="text-gray-600 mb-6">
            Merci de vous être inscrit à notre essai gratuit d&apos;un mois.<br />
            Vous recevrez un e-mail dès le lancement de Catchub.
          </p>

          {/* Lien de parrainage */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm font-medium text-gray-500 mb-1">Votre lien de parrainage :</p>
            <p className="text-blue-600 break-all font-medium">{inviteLink}</p>
          </div>

          {/* Bouton copier */}
          <button
            onClick={handleCopy}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mb-6"
          >
            Copier le lien
          </button>

          {/* Séparateur */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <p className="mx-4 text-gray-500 font-medium">Partager via</p>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Boutons de partage */}
          <div className="grid grid-cols-5 gap-3 mb-6">
          {/* Facebook */}
<button onClick={() => shareVia("facebook")} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
  </svg>
</button>

{/* Instagram */}
<button onClick={() => shareVia("instagram")} className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm6.406-1.845a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z" />
  </svg>
</button>

{/* WhatsApp */}
<button onClick={() => shareVia("whatsapp")} className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
  </svg>
</button>

{/* LinkedIn */}
<button onClick={() => shareVia("linkedin")} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
</button>

{/* Email */}
<button onClick={() => shareVia("email")} className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
</button>

          </div>

          {/* Retour */}
          <Button asChild className="w-full mb-4">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>

          {/* Infos */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Comment ça marche ?</h3>
            <ul className="text-sm text-blue-700 text-left list-disc pl-4 space-y-1">
              <li>Partagez votre lien avec vos amis et votre réseau</li>
              <li>Vous recevez 500 points de fidélité pour chaque parrainage après le lancement officiel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}