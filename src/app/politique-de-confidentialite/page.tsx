'use client'

import Link from 'next/link'

export default function PolitiqueDeConfidentialite() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-700" id="top">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de confidentialité</h1>

      <p className="mb-4">
        Nous prenons la confidentialité de vos données très au sérieux. Cette politique explique
        quelles données nous collectons, pourquoi, et comment nous les utilisons.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">1. Données collectées</h2>
      <p className="mb-4">
        Lors de votre inscription, nous collectons votre nom, prénom, email, numéro de téléphone,
        secteur d’activité et besoin principal. Ces données sont nécessaires pour personnaliser
        votre expérience et vous proposer des services adaptés.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">2. Utilisation des données</h2>
      <p className="mb-4">
        Les données sont utilisées exclusivement dans le cadre de la plateforme, pour :
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>vous authentifier et sécuriser votre compte ;</li>
        <li>personnaliser le contenu et les recommandations ;</li>
        <li>vous contacter en cas de besoin (email, SMS) ;</li>
        <li>analyser l’utilisation de la plateforme (statistiques).</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">3. Partage des données</h2>
      <p className="mb-4">
        Vos données ne sont jamais vendues. Elles peuvent être partagées avec des prestataires
        techniques (hébergement, envoi d’emails/SMS) dans le respect du RGPD.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">4. Durée de conservation</h2>
      <p className="mb-4">
        Vos données sont conservées tant que votre compte est actif. Vous pouvez demander leur
        suppression à tout moment.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">5. Sécurité</h2>
      <p className="mb-4">
        Nous mettons en œuvre des mesures de sécurité pour protéger vos données (chiffrement,
        contrôle d’accès, etc.).
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">6. Vos droits</h2>
      <p className="mb-4">
        Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition et
        de suppression de vos données.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">7. Contact</h2>
      <p className="mb-4">
        Pour toute question concernant vos données personnelles, vous pouvez nous contacter à :
        contact@pltf.com
      </p>

      <div className="mt-12 pt-6 border-t border-indigo-100 flex justify-between items-center">
        <p className="text-sm text-gray-500">Dernière mise à jour : Mai 2025</p>
        <Link
          href="/"
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}