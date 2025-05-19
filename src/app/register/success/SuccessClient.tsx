'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessClient() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const inviteLink = userId ? `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${userId}` : ""

  const handleCopy = useCallback(() => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink).then(() => {
        alert("Lien copié !")
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
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm font-medium text-gray-500 mb-1">Votre lien de parrainage :</p>
            <p className="text-blue-600 break-all font-medium">{inviteLink}</p>
          </div>
          <button onClick={handleCopy} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mb-6">
            Copier le lien
          </button>
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <p className="mx-4 text-gray-500 font-medium">Partager via</p>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {/* les boutons de partage (identiques à ton code) */}
            {/* ... */}
          </div>
          <Button asChild className="w-full mb-4">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
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
