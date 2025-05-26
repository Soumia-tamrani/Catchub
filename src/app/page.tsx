// "use client"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ArrowRight, CheckCircle, Users, Building2, Calendar, Mail, Globe, Shield, Target } from "lucide-react"
// import { useState, useEffect } from "react"

// export default function Home() {
//   const [isSubscribed, setIsSubscribed] = useState(false) // New state for subscription status

//   // Use localStorage to persist dark mode preference across pages


//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value
//     const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value

//     if (email && name) {
//       setIsSubscribed(true) // Set subscription status to true
//       e.currentTarget.reset() // Reset form
//       // Optionally, send data to backend here
//       setTimeout(() => setIsSubscribed(false), 5000) // Hide message after 5 seconds
//     } else {
//       alert("Veuillez remplir tous les champs.")
//     }
//   }


//   return (
//     <div
//       className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500`}
//     >
//       {/* Header Section */}
//       <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-8">
// <div className="flex items-center gap-2">
//       <img
//         src="/logo.png"
//         alt="Catchub Logo"
//         className="h-10 w-auto hover:opacity-90 transition-opacity duration-300"
//       />
//     </div>
//           <nav className="hidden md:flex items-center">
//             <div className="flex space-x-1">
//               <Link
//                 href="#features"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 Fonctionnalités
//               </Link>
//               <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
//               <Link
//                 href="#benefits"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 Avantages
//               </Link>
//               <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
//               <Link
//                 href="#faq"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 FAQ
//               </Link>
//             </div>
//           </nav>
//           <div className="flex items-center gap-5">
     
//             <Link href="/register">
//               <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 transform duration-300 text-white font-medium px-5 py-2 rounded-lg">
//                 Essai Gratuit
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//             <div className="flex flex-col justify-center space-y-6">
//               <div className="space-y-4">
//                 <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//                   <span>Lancé en 2025</span>
//                 </div>
//                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white animate-fade-in-up">
//                   Connectez-vous. <br className="hidden sm:inline" />
//                   <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Collaborez.
//                   </span>{" "}
//                   Réussissez.
//                 </h1>
//                 <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-lg md:text-xl animate-fade-in-up delay-100">
//                   La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités
//                   d'affaires durables.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up delay-200">
//                 <Link href="/register">
//                   <Button
//                     size="lg"
//                     className="gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 transform hover:scale-105 group"
//                   >
//                     Réservez votre place{" "}
//                     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </Link>
//                 <Link href="#features">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="gap-1.5 border-blue-200 dark:border-purple-400/30 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                   >
//                     Découvrir
//                   </Button>
//                 </Link>
//               </div>
//               <div className="flex items-center gap-4 mt-2 animate-fade-in-up delay-300">
//                 <div className="flex -space-x-2">
//                   {[20, 40, 60].map((opacity, i) => (
//                     <div
//                       key={i}
//                       className="w-8 h-8 rounded-full bg-blue-500/20 dark:bg-purple-500/30 animate-float"
//                       style={{
//                         animationDelay: `${i * 0.2}s`,
//                         opacity: opacity / 100,
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-sm text-blue-600 dark:text-blue-300">
//                   Places limitées — Réservez dès maintenant pour garantir votre accès.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center justify-center animate-fade-in delay-200">
//               <div className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-blue-100/50 to-white dark:from-purple-900/30 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transition-shadow duration-500">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center space-y-3 bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg backdrop-blur transition-all duration-500 group-hover:scale-105">
//                     <div className="inline-flex mb-2 justify-center items-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-full">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-blue-600 dark:text-purple-400"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <polygon points="5 3 19 12 5 21 5 3" />
//                       </svg>
//                     </div>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">Vidéo explicative</p>
//                     <p className="text-gray-600 dark:text-gray-300 font-medium">Découvrez notre plateforme</p>
//                     <Link href="/register">
//                       <Button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105">
//                         Réserver maintenant
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 left-0 w-full h-full bg-grid-blue-200/10 dark:bg-grid-purple-900/10"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>Fonctionnalités</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Une plateforme complète pour votre succès professionnel
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 Découvrez comment notre plateforme peut transformer votre réseau professionnel et accélérer votre
//                 croissance
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//             {[
//               {
//                 icon: Users,
//                 title: "Réseautage Ciblé",
//                 desc: "Connectez-vous avec des professionnels et des entreprises de votre secteur grâce à notre algorithme de matching avancé.",
//               },
//               {
//                 icon: Building2,
//                 title: "Opportunités B2B",
//                 desc: "Trouvez des partenaires commerciaux, fournisseurs et clients potentiels adaptés à vos besoins spécifiques.",
//               },
//               {
//                 icon: Calendar,
//                 title: "Événements Exclusifs",
//                 desc: "Participez à des événements de networking et des formations exclusives pour développer vos compétences.",
//               },
//               {
//                 icon: Globe,
//                 title: "Visibilité Internationale",
//                 desc: "Étendez votre présence professionnelle au-delà des frontières et accédez à un réseau mondial.",
//               },
//               {
//                 icon: Shield,
//                 title: "Sécurité des Données",
//                 desc: "Vos informations professionnelles sont protégées avec les standards de sécurité les plus élevés.",
//               },
//               {
//                 icon: Target,
//                 title: "Analytics Avancés",
//                 desc: "Suivez et analysez vos interactions et opportunités avec des outils d'analyse intuitifs.",
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-start space-y-3 border border-blue-100 dark:border-purple-900/30 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 transform group hover:border-blue-200 dark:hover:border-purple-500/30"
//               >
//                 <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-blue-200/50 dark:group-hover:bg-purple-900/50 transition-colors">
//                   <feature.icon className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section id="benefits" className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800/50">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>Avantages</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Pourquoi nous choisir
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 Les avantages qui font la différence pour votre carrière ou votre entreprise
//               </p>
//             </div>
//           </div>
// <div className="grid gap-8 mt-16 md:grid-cols-2 max-w-7xl mx-auto px-4">            <div
//               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-left hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
//               style={{ animationDelay: "0.1s" }}
//             >
              
//               <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full mb-6">
//                 <Users className="h-6 w-6 text-[#1cd5f5] dark:text-purple-400" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Professionnels</h3>
//               <div className="space-y-4">
//                 {[
//                   "Accédez à des opportunités de mentorat exclusives",
//                   "Développez vos compétences avec des formations ciblées",
//                   "Élargissez votre réseau professionnel stratégiquement",
//                   "Trouvez des opportunités d'emploi cachées",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5  text-[#1cd5f5] dark:text-purple-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-600 dark:text-gray-300">{item}</p>
//                   </div>
//                 ))}
//               </div>
              
//                             <div className="flex justify-end mt-6"> 
//                               <Link href="/register/professional"> 
//                               <div className="inline-flex items-center justify-center p-3 bg-blue-950 rounded-full">
//                                  <ArrowRight className="h-6 w-6 text-white" /> 
//                                  </div> 
//                                  </Link> 
//                                  </div>
            

//             </div>
//             <div
//               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-right hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-purple-900/30 rounded-full mb-6">
//                 <Building2 className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Entreprises</h3>
//               <div className="space-y-4">
//                 {[
//                   "Présentez votre marque à un public ciblé et qualifié",
//                   "Développez votre réseau B2B stratégiquement",
//                   "Trouvez des talents qualifiés pour vos besoins",
//                   "Accédez à de nouveaux marchés et financements",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-start space-x-3">
// <CheckCircle className="h-5 w-5 text-[#1cd5f5] dark:text-purple-400 flex-shrink-0 mt-1" />       
//              <p className="text-gray-600 dark:text-gray-300">{item}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-end mt-6">
//                  <Link href="/register/bussiness"> 
//                  <div className="inline-flex items-center justify-center p-3 bg-blue-950 rounded-full"> 
//                   <ArrowRight className="h-6 w-6 text-white" />
//                    </div>
//                     </Link>
//                     </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-400 to-purple-600">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
//             <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm text-white animate-pulse">
//               <span className="font-medium">Offre limitée</span>
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white">
//                 Prêt à transformer votre réseau professionnel?
//               </h2>
//               <p className="text-blue-100 text-lg md:text-xl">
//                 Réservez votre place pour un essai gratuit d'un mois et découvrez tous les avantages de notre
//                 plateforme.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
//               <Link href="/register" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   className="w-full gap-1.5 bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/40 transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                 >
//                   Réserver maintenant <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <Link href="#features" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="w-full bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700
//              dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100 dark:hover:bg-gray-100 shadow-lg shadow-blue-800/30
//              border-white hover:border-blue-200
//              transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                 >
//                   En savoir plus
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>FAQ</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Questions fréquentes
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">Trouvez les réponses à vos questions</p>
//             </div>
//           </div>
//           <div className="grid gap-6 mt-12 max-w-4xl mx-auto">
//             {[
//               {
//                 question: "Qu'est-ce qui est inclus dans l'essai gratuit?",
//                 answer:
//                   "L'essai gratuit d'un mois vous donne accès à toutes les fonctionnalités de la plateforme sans restriction, y compris les événements exclusifs et les opportunités de networking.",
//               },
//               {
//                 question: "Comment fonctionne l'inscription?",
//                 answer:
//                   "Remplissez simplement le formulaire d'inscription, choisissez votre profil (professionnel ou entreprise) et suivez les étapes guidées pour compléter votre profil et commencer à explorer la plateforme.",
//               },
//               {
//                 question: "Dois-je fournir mes informations bancaires?",
//                 answer:
//                   "Oui, mais vous ne serez pas débité pendant la période d'essai. Vous pourrez annuler à tout moment avant la fin de l'essai gratuit sans aucun frais.",
//               },
//               {
//                 question: "Quand la plateforme sera-t-elle officiellement lancée?",
//                 answer:
//                   "La version complète sera lancée après la phase d'essai. Les premiers utilisateurs (Early adopters) bénéficieront d'un mois gratuit et seront informés par email dès que la plateforme sera lancée.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-purple-500/30"
//               >
//                 <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.question}</h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{item.answer}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 items-center max-w-5xl mx-auto">
//             <div className="animate-fade-in-left">
//               <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 mb-4">
//                 <span>Newsletter</span>
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Restez informé
//               </h2>
//               <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
//                 Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles, mises à jour et offres
//                 exclusives.
//               </p>
//               <div className="mt-4 flex flex-col gap-2">
//                 {[
//                   "Conseils de réseautage professionnels",
//                   "Invitations aux événements exclusifs",
//                   "Opportunités professionnelles exclusives",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-blue-600 dark:text-purple-400" />
//                     <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg animate-fade-in-right">
//               {isSubscribed ? (
//                 <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
//                   <div className="p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full">
//                     <CheckCircle className="h-8 w-8 text-blue-600 dark:text-purple-400" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Inscription réussie !
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Merci de vous être abonné à notre newsletter. Vous recevrez bientôt nos dernières mises à jour et offres exclusives.
//                   </p>
//                   <Button
//                     onClick={() => setIsSubscribed(false)}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
//                   >
//                     S'abonner à nouveau
//                   </Button>
//                 </div>
//               ) : (
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="email"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
//                     >
//                       Adresse email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="nom@example.com"
//                         className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="name"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
//                     >
//                       Votre nom
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       placeholder="Jean Dupont"
//                       className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
//                       required
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
//                   >
//                     S'abonner à la newsletter
//                   </Button>
//                   <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
//                     En vous inscrivant, vous acceptez notre politique de confidentialité.
//                   </p>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
        
//       <footer className="border-t border-blue-100 dark:border-gray-800 py-12 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Catchub
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires.
//               </p>
//             </div>
//             {[
//               {
//                 title: "Plateforme",
//                 links: [
//                   { name: "Fonctionnalités", href: "#features" },
//                   { name: "Avantages", href: "#benefits" },
//                   { name: "FAQ", href: "#faq" },
//                 ],
//               },
//               {
//                 title: "Légal",
//                 links: [
//                   { name: "Conditions d'utilisation", href: "#" },
//                   { name: "Politique de confidentialité", href: "#" },
//                   { name: "Cookies", href: "#" },
//                 ],
//               },
//             ].map((section, i) => (
//               <div key={i} className="space-y-4">
//                 <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{section.title}</h4>
//                 <ul className="space-y-2">
//                   {section.links.map((link, j) => (
//                     <li key={j}>
//                       <Link
//                         href={link.href}
//                         className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-100 dark:border-gray-800 mt-8 pt-8">
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
//               © {new Date().getFullYear()} Catchub. Tous droits réservés.
//             </p>
//             <div className="flex gap-4">
//               {[
//                 { name: "LinkedIn", href: "#", icon: "LinkedIn" },
//                 {
//                   name: "Facebook",
//                   href: "https://www.facebook.com/share/1BWU5gLuo7/",
//                   icon: "Facebook",
//                 },
//                 {
//                   name: "Instagram",
//                   href: "https://www.instagram.com/joincatchub?igsh=MW5rZ3hzMXQwNTBjYQ==",
//                   icon: "Instagram",
//                 },
//                 {
//                   name: "Twitter",
//                   href: "https://x.com/JoinCatchub?t=68YH3hKHnPHlHBhGbv_4xw&s=09",
//                   icon: "Twitter",
//                 },
//                 {
//                   name: "TikTok",
//                   href: "https://www.tiktok.com/@catchub?_t=ZM-8wBW9gBF5FN&_r=1",
//                   icon: "TikTok",
//                 },
//               ].map((social, i) => (
//                 <Link
//                   key={i}
//                   href={social.href}
//                   className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors hover:-translate-y-0.5 transform"
//                   aria-label={social.name}
//                 >
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     {social.icon === "LinkedIn" && (
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     )}
//                     {social.icon === "Facebook" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "Instagram" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.324a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm5.25-10.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "Twitter" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M8.404 20.513c7.404 0 11.454-6.135 11.454-11.454 0-.174 0-.347-.01-.519A8.197 8.197 0 0022 4.39a8.073 8.073 0 01-2.318.635 4.043 4.043 0 001.772-2.23 8.097 8.097 0 01-2.565.982 4.026 4.026 0 00-6.856 3.672 11.427 11.427 0 01-8.3-4.204 4.026 4.026 0 001.247 5.375 4.003 4.003 0 01-1.823-.503v.05a4.026 4.026 0 003.23 3.948 4.02 4.02 0 01-1.818.069 4.027 4.027 0 003.758 2.794 8.077 8.077 0 01-5.007 1.727 8.14 8.14 0 01-.958-.058 11.392 11.392 0 006.174 1.807"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "TikTok" && (
//                       <path
//                         d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0z"
//                       />
//                     )}
//                   </svg>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//     </div>
//   )
// }

// "use client"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ArrowRight, CheckCircle, Users, Building2, Calendar, Mail, Globe, Shield, Target } from "lucide-react"
// import { useState, useEffect } from "react"
// import CookieBanner from "@/components/cookieBanner";// ajout cookies
// import Analytics from '@/components/Analytics';// ajout cookies
// export default function Home() {
//   const [darkMode, setDarkMode] = useState(false)
//   const [isSubscribed, setIsSubscribed] = useState(false) // New state for subscription status

//   // Use localStorage to persist dark mode preference across pages
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme")
//     if (storedTheme) {
//       setDarkMode(storedTheme === "dark")
//       document.documentElement.classList.toggle("dark", storedTheme === "dark")
//     } else {
//       const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//       setDarkMode(systemPrefersDark)
//       document.documentElement.classList.toggle("dark", systemPrefersDark)
//     }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("theme", darkMode ? "dark" : "light")
//     document.documentElement.classList.toggle("dark", darkMode)
//   }, [darkMode])

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value
//     const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value

//     if (email && name) {
//       setIsSubscribed(true) // Set subscription status to true
//       e.currentTarget.reset() // Reset form
//       // Optionally, send data to backend here
//       setTimeout(() => setIsSubscribed(false), 5000) // Hide message after 5 seconds
//     } else {
//       alert("Veuillez remplir tous les champs.")
//     }
//   }

//   return (
//     <div
//       className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500`}
//     >
//       {/* Header Section */}
//       <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-8">
//           <div className="flex items-center gap-2">
//             <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
//               Catchub
//             </span>
//           </div>
//           <nav className="hidden md:flex items-center">
//             <div className="flex space-x-1">
//               <Link
//                 href="#features"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 Fonctionnalités
//               </Link>
//               <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
//               <Link
//                 href="#benefits"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 Avantages
//               </Link>
//               <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
//               <Link
//                 href="#faq"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 FAQ
//               </Link>
//             </div>
//           </nav>
//           <div className="flex items-center gap-5">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 transition-colors"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-yellow-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-blue-600"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               )}
//             </button>
//             <Link href="/register">
//               <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 transform duration-300 text-white font-medium px-5 py-2 rounded-lg">
//                 Essai Gratuit
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//             <div className="flex flex-col justify-center space-y-6">
//               <div className="space-y-4">
//                 <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//                   <span>Lancé en 2025</span>
//                 </div>
//                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white animate-fade-in-up">
//                   Connectez-vous. <br className="hidden sm:inline" />
//                   <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Collaborez.
//                   </span>{" "}
//                   Réussissez.
//                 </h1>
//                 <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-lg md:text-xl animate-fade-in-up delay-100">
//                   La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités
//                   d'affaires durables.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up delay-200">
//                 <Link href="/register">
//                   <Button
//                     size="lg"
//                     className="gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 transform hover:scale-105 group"
//                   >
//                     Réservez votre place{" "}
//                     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </Link>
//                 <Link href="#features">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="gap-1.5 border-blue-200 dark:border-purple-400/30 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                   >
//                     Découvrir
//                   </Button>
//                 </Link>
//               </div>
//               <div className="flex items-center gap-4 mt-2 animate-fade-in-up delay-300">
//                 <div className="flex -space-x-2">
//                   {[20, 40, 60].map((opacity, i) => (
//                     <div
//                       key={i}
//                       className="w-8 h-8 rounded-full bg-blue-500/20 dark:bg-purple-500/30 animate-float"
//                       style={{
//                         animationDelay: `${i * 0.2}s`,
//                         opacity: opacity / 100,
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-sm text-blue-600 dark:text-blue-300">
//                   Places limitées — Réservez dès maintenant pour garantir votre accès.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center justify-center animate-fade-in delay-200">
//               <div className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-blue-100/50 to-white dark:from-purple-900/30 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transition-shadow duration-500">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center space-y-3 bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg backdrop-blur transition-all duration-500 group-hover:scale-105">
//                     <div className="inline-flex mb-2 justify-center items-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-full">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-blue-600 dark:text-purple-400"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <polygon points="5 3 19 12 5 21 5 3" />
//                       </svg>
//                     </div>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">Vidéo explicative</p>
//                     <p className="text-gray-600 dark:text-gray-300 font-medium">Découvrez notre plateforme</p>
//                     <Link href="/register">
//                       <Button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105">
//                         Réserver maintenant
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 left-0 w-full h-full bg-grid-blue-200/10 dark:bg-grid-purple-900/10"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>Fonctionnalités</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Une plateforme complète pour votre succès professionnel
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 Découvrez comment notre plateforme peut transformer votre réseau professionnel et accélérer votre
//                 croissance
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//             {[
//               {
//                 icon: Users,
//                 title: "Réseautage Ciblé",
//                 desc: "Connectez-vous avec des professionnels et des entreprises de votre secteur grâce à notre algorithme de matching avancé.",
//               },
//               {
//                 icon: Building2,
//                 title: "Opportunités B2B",
//                 desc: "Trouvez des partenaires commerciaux, fournisseurs et clients potentiels adaptés à vos besoins spécifiques.",
//               },
//               {
//                 icon: Calendar,
//                 title: "Événements Exclusifs",
//                 desc: "Participez à des événements de networking et des formations exclusives pour développer vos compétences.",
//               },
//               {
//                 icon: Globe,
//                 title: "Visibilité Internationale",
//                 desc: "Étendez votre présence professionnelle au-delà des frontières et accédez à un réseau mondial.",
//               },
//               {
//                 icon: Shield,
//                 title: "Sécurité des Données",
//                 desc: "Vos informations professionnelles sont protégées avec les standards de sécurité les plus élevés.",
//               },
//               {
//                 icon: Target,
//                 title: "Analytics Avancés",
//                 desc: "Suivez et analysez vos interactions et opportunités avec des outils d'analyse intuitifs.",
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-start space-y-3 border border-blue-100 dark:border-purple-900/30 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 transform group hover:border-blue-200 dark:hover:border-purple-500/30"
//               >
//                 <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-blue-200/50 dark:group-hover:bg-purple-900/50 transition-colors">
//                   <feature.icon className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section id="benefits" className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800/50">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>Avantages</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Pourquoi nous choisir
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 Les avantages qui font la différence pour votre carrière ou votre entreprise
//               </p>
//             </div>
//           </div>
//           <div className="grid gap-8 mt-16 md:grid-cols-2">
//             <div
//               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-left hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full mb-6">
//                 <Users className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Professionnels</h3>
//               <div className="space-y-4">
//                 {[
//                   "Accédez à des opportunités de mentorat exclusives",
//                   "Développez vos compétences avec des formations ciblées",
//                   "Élargissez votre réseau professionnel stratégiquement",
//                   "Trouvez des opportunités d'emploi cachées",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5 text-blue-600 dark:text-purple-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-600 dark:text-gray-300">{item}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div
//               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-right hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full mb-6">
//                 <Building2 className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Entreprises</h3>
//               <div className="space-y-4">
//                 {[
//                   "Présentez votre marque à un public ciblé et qualifié",
//                   "Développez votre réseau B2B stratégiquement",
//                   "Trouvez des talents qualifiés pour vos besoins",
//                   "Accédez à de nouveaux marchés et financements",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5 text-blue-600 dark:text-purple-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-600 dark:text-gray-300">{item}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-400 to-purple-600">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
//             <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm text-white animate-pulse">
//               <span className="font-medium">Offre limitée</span>
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white">
//                 Prêt à transformer votre réseau professionnel?
//               </h2>
//               <p className="text-blue-100 text-lg md:text-xl">
//                 Réservez votre place pour un essai gratuit d'un mois et découvrez tous les avantages de notre
//                 plateforme.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
//               <Link href="/register" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   className="w-full gap-1.5 bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/40 transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                 >
//                   Réserver maintenant <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <Link href="#features" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="w-full bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700
//              dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100 dark:hover:bg-gray-100 shadow-lg shadow-blue-800/30
//              border-white hover:border-blue-200
//              transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                 >
//                   En savoir plus
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>FAQ</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Questions fréquentes
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">Trouvez les réponses à vos questions</p>
//             </div>
//           </div>
//           <div className="grid gap-6 mt-12 max-w-4xl mx-auto">
//             {[
//               {
//                 question: "Qu'est-ce qui est inclus dans l'essai gratuit?",
//                 answer:
//                   "L'essai gratuit d'un mois vous donne accès à toutes les fonctionnalités de la plateforme sans restriction, y compris les événements exclusifs et les opportunités de networking.",
//               },
//               {
//                 question: "Comment fonctionne l'inscription?",
//                 answer:
//                   "Remplissez simplement le formulaire d'inscription, choisissez votre profil (professionnel ou entreprise) et suivez les étapes guidées pour compléter votre profil et commencer à explorer la plateforme.",
//               },
//               {
//                 question: "Dois-je fournir mes informations bancaires?",
//                 answer:
//                   "Oui, mais vous ne serez pas débité pendant la période d'essai. Vous pourrez annuler à tout moment avant la fin de l'essai gratuit sans aucun frais.",
//               },
//               {
//                 question: "Quand la plateforme sera-t-elle officiellement lancée?",
//                 answer:
//                   "La version complète sera lancée après la phase d'essai. Les premiers utilisateurs (Early adopters) bénéficieront d'un mois gratuit et seront informés par email dès que la plateforme sera lancée.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-purple-500/30"
//               >
//                 <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.question}</h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{item.answer}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 items-center max-w-5xl mx-auto">
//             <div className="animate-fade-in-left">
//               <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 mb-4">
//                 <span>Newsletter</span>
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Restez informé
//               </h2>
//               <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
//                 Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles, mises à jour et offres
//                 exclusives.
//               </p>
//               <div className="mt-4 flex flex-col gap-2">
//                 {[
//                   "Conseils de réseautage professionnels",
//                   "Invitations aux événements exclusifs",
//                   "Opportunités professionnelles exclusives",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-blue-600 dark:text-purple-400" />
//                     <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg animate-fade-in-right">
//               {isSubscribed ? (
//                 <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
//                   <div className="p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full">
//                     <CheckCircle className="h-8 w-8 text-blue-600 dark:text-purple-400" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Inscription réussie !
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Merci de vous être abonné à notre newsletter. Vous recevrez bientôt nos dernières mises à jour et offres exclusives.
//                   </p>
//                   <Button
//                     onClick={() => setIsSubscribed(false)}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
//                   >
//                     S'abonner à nouveau
//                   </Button>
//                 </div>
//               ) : (
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="email"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
//                     >
//                       Adresse email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="nom@example.com"
//                         className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="name"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
//                     >
//                       Votre nom
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       placeholder="Jean Dupont"
//                       className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
//                       required
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
//                   >
//                     S'abonner à la newsletter
//                   </Button>
//                   <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
//                     En vous inscrivant, vous acceptez notre politique de confidentialité.
//                   </p>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
        
//       <footer className="border-t border-blue-100 dark:border-gray-800 py-12 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Catchub
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires.
//               </p>
//             </div>
//             {[
//               {
//                 title: "Plateforme",
//                 links: [
//                   { name: "Fonctionnalités", href: "#features" },
//                   { name: "Avantages", href: "#benefits" },
//                   { name: "FAQ", href: "#faq" },
//                 ],
//               },
//               {
//                 title: "Légal",
//                 links: [
//                   { name: "Conditions d'utilisation", href: "#" },
//                   { name: "Politique de confidentialité", href: "#" },
//                   { name: "Cookies", href: "#" },
//                 ],
//               },
//             ].map((section, i) => (
//               <div key={i} className="space-y-4">
//                 <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{section.title}</h4>
//                 <ul className="space-y-2">
//                   {section.links.map((link, j) => (
//                     <li key={j}>
//                       <Link
//                         href={link.href}
//                         className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-100 dark:border-gray-800 mt-8 pt-8">
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
//               © {new Date().getFullYear()} Catchub. Tous droits réservés.
//             </p>
//             <div className="flex gap-4">
//               {[
//                 { name: "LinkedIn", href: "#", icon: "LinkedIn" },
//                 {
//                   name: "Facebook",
//                   href: "https://www.facebook.com/share/1BWU5gLuo7/",
//                   icon: "Facebook",
//                 },
//                 {
//                   name: "Instagram",
//                   href: "https://www.instagram.com/joincatchub?igsh=MW5rZ3hzMXQwNTBjYQ==",
//                   icon: "Instagram",
//                 },
//                 {
//                   name: "Twitter",
//                   href: "https://x.com/JoinCatchub?t=68YH3hKHnPHlHBhGbv_4xw&s=09",
//                   icon: "Twitter",
//                 },
//                 {
//                   name: "TikTok",
//                   href: "https://www.tiktok.com/@catchub?_t=ZM-8wBW9gBF5FN&_r=1",
//                   icon: "TikTok",
//                 },
//               ].map((social, i) => (
//                 <Link
//                   key={i}
//                   href={social.href}
//                   className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors hover:-translate-y-0.5 transform"
//                   aria-label={social.name}
//                 >
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     {social.icon === "LinkedIn" && (
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     )}
//                     {social.icon === "Facebook" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "Instagram" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.324a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm5.25-10.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "Twitter" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M8.404 20.513c7.404 0 11.454-6.135 11.454-11.454 0-.174 0-.347-.01-.519A8.197 8.197 0 0022 4.39a8.073 8.073 0 01-2.318.635 4.043 4.043 0 001.772-2.23 8.097 8.097 0 01-2.565.982 4.026 4.026 0 00-6.856 3.672 11.427 11.427 0 01-8.3-4.204 4.026 4.026 0 001.247 5.375 4.003 4.003 0 01-1.823-.503v.05a4.026 4.026 0 003.23 3.948 4.02 4.02 0 01-1.818.069 4.027 4.027 0 003.758 2.794 8.077 8.077 0 01-5.007 1.727 8.14 8.14 0 01-.958-.058 11.392 11.392 0 006.174 1.807"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "TikTok" && (
//                       <path
//                         d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0z"
//                       />
//                     )}
//                   </svg>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* Bannière cookies */}
//       <CookieBanner />
//       </footer>
//  {/* Analytics */}
//       <Analytics />
//     </div>
//   )
// }

// "use client"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ArrowRight, CheckCircle, Users, Building2, Calendar, Mail, Globe, Shield, Target } from "lucide-react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import CookieBanner from "@/components/cookieBanner"; // Ajout cookies
// import Analytics from '@/components/Analytics'; // Ajout analytics

// export default function Home() {
//   const [isSubscribed, setIsSubscribed] = useState(false) // New state for subscription status

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value
//     const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value

//     if (email && name) {
//       setIsSubscribed(true) // Set subscription status to true
//       e.currentTarget.reset() // Reset form
//       // Optionally, send data to backend here
//       setTimeout(() => setIsSubscribed(false), 5000) // Hide message after 5 seconds
//     } else {
//       alert("Veuillez remplir tous les champs.")
//     }
//   }

//   return (
//     <div
//       className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500`}
//     >
//       {/* Header Section */}
//       <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-8">
//           <div className="flex items-center gap-2">
//             <img
//               src="/logo.png"
//               alt="Catchub Logo"
//               className="h-10 w-auto hover:opacity-90 transition-opacity duration-300"
//             />
//           </div>
//           <nav className="hidden md:flex items-center">
//             <div className="flex space-x-1">
//               <Link
//                 href="#features"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 Fonctionnalités
//               </Link>
//               <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
//               <Link
//                 href="#benefits"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition Uall hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 Avantages
//               </Link>
//               <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
//               <Link
//                 href="#faq"
//                 className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-all hover:scale-105 transform relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all"
//               >
//                 FAQ
//               </Link>
//             </div>
//           </nav>
//           <div className="flex items-center gap-5">
//             <Link href="/register">
//               <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 transform duration-300 text-white font-medium px-5 py-2 rounded-lg">
//                 Essai Gratuit
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//             <div className="flex flex-col justify-center space-y-6">
//               <div className="space-y-4">
//                 <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//                   <span>Lancé en 2025</span>
//                 </div>
//                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white animate-fade-in-up">
//                   Connectez-vous. <br className="hidden sm:inline" />
//                   <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Collaborez.
//                   </span>{" "}
//                   Réussissez.
//                 </h1>
//                 <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-lg md:text-xl animate-fade-in-up delay-100">
//                   La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités
//                   d'affaires durables.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up delay-200">
//                 <Link href="/register">
//                   <Button
//                     size="lg"
//                     className="gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 transform hover:scale-105 group"
//                   >
//                     Réservez votre place{" "}
//                     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </Link>
//                 <Link href="#features">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="gap-1.5 border-blue-200 dark:border-purple-400/30 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                   >
//                     Découvrir
//                   </Button>
//                 </Link>
//               </div>
//               <div className="flex items-center gap-4 mt-2 animate-fade-in-up delay-300">
//                 <div className="flex -space-x-2">
//                   {[20, 40, 60].map((opacity, i) => (
//                     <div
//                       key={i}
//                       className="w-8 h-8 rounded-full bg-blue-500/20 dark:bg-purple-500/30 animate-float"
//                       style={{
//                         animationDelay: `${i * 0.2}s`,
//                         opacity: opacity / 100,
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-sm text-blue-600 dark:text-blue-300">
//                   Places limitées — Réservez dès maintenant pour garantir votre accès.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center justify-center animate-fade-in delay-200">
//               <div className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-blue-100/50 to-white dark:from-purple-900/30 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transition-shadow duration-500">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center space-y-3 bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg backdrop-blur transition-all duration-500 group-hover:scale-105">
//                     <div className="inline-flex mb-2 justify-center items-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-full">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-blue-600 dark:text-purple-400"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <polygon points="5 3 19 12 5 21 5 3" />
//                       </svg>
//                     </div>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">Vidéo explicative</p>
//                     <p className="text-gray-600 dark:text-gray-300 font-medium">Découvrez notre plateforme</p>
//                     <Link href="/register">
//                       <Button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105">
//                         Réserver maintenant
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 left-0 w-full h-full bg-grid-blue-200/10 dark:bg-grid-purple-900/10"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>Fonctionnalités</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Une plateforme complète pour votre succès professionnel
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 Découvrez comment notre plateforme peut transformer votre réseau professionnel et accélérer votre
//                 croissance
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//             {[
//               {
//                 icon: Users,
//                 title: "Réseautage Ciblé",
//                 desc: "Connectez-vous avec des professionnels et des entreprises de votre secteur grâce à notre algorithme de matching avancé.",
//               },
//               {
//                 icon: Building2,
//                 title: "Opportunités B2B",
//                 desc: "Trouvez des partenaires commerciaux, fournisseurs et clients potentiels adaptés à vos besoins spécifiques.",
//               },
//               {
//                 icon: Calendar,
//                 title: "Événements Exclusifs",
//                 desc: "Participez à des événements de networking et des formations exclusives pour développer vos compétences.",
//               },
//               {
//                 icon: Globe,
//                 title: "Visibilité Internationale",
//                 desc: "Étendez votre présence professionnelle au-delà des frontières et accédez à un réseau mondial.",
//               },
//               {
//                 icon: Shield,
//                 title: "Sécurité des Données",
//                 desc: "Vos informations professionnelles sont protégées avec les standards de sécurité les plus élevés.",
//               },
//               {
//                 icon: Target,
//                 title: "Analytics Avancés",
//                 desc: "Suivez et analysez vos interactions et opportunités avec des outils d'analyse intuitifs.",
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-start space-y-3 border border-blue-100 dark:border-purple-900/30 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 transform group hover:border-blue-200 dark:hover:border-purple-500/30"
//               >
//                 <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-blue-200/50 dark:group-hover:bg-purple-900/50 transition-colors">
//                   <feature.icon className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section id="benefits" className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800/50">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>Avantages</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Pourquoi nous choisir
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 Les avantages qui font la différence pour votre carrière ou votre entreprise
//               </p>
//             </div>
//           </div>
//           <div className="grid gap-8 mt-16 md:grid-cols-2 max-w-7xl mx-auto px-4">
//             <div
//               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-left hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full mb-6">
//                 <Users className="h-6 w-6 text-[#1cd5f5] dark:text-purple-400" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Professionnels</h3>
//               <div className="space-y-4">
//                 {[
//                   "Accédez à des opportunités de mentorat exclusives",
//                   "Développez vos compétences avec des formations ciblées",
//                   "Élargissez votre réseau professionnel stratégiquement",
//                   "Trouvez des opportunités d'emploi cachées",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5 text-[#1cd5f5] dark:text-purple-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-600 dark:text-gray-300">{item}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-end mt-6">
//                 <Link href="/register/professional">
//                   <div className="inline-flex items-center justify-center p-3 bg-blue-950 rounded-full">
//                     <ArrowRight className="h-6 w-6 text-white" />
//                   </div>
//                 </Link>
//               </div>
//             </div>
//             <div
//               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-right hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-purple-900/30 rounded-full mb-6">
//                 <Building2 className="h-6 w-6 text-blue-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Entreprises</h3>
//               <div className="space-y-4">
//                 {[
//                   "Présentez votre marque à un public ciblé et qualifié",
//                   "Développez votre réseau B2B stratégiquement",
//                   "Trouvez des talents qualifiés pour vos besoins",
//                   "Accédez à de nouveaux marchés et financements",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5 text-[#1cd5f5] dark:text-purple-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-600 dark:text-gray-300">{item}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-end mt-6">
//                 <Link href="/register/bussiness">
//                   <div className="inline-flex items-center justify-center p-3 bg-blue-950 rounded-full">
//                     <ArrowRight className="h-6 w-6 text-white" />
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-400 to-purple-600">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
//             <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm text-white animate-pulse">
//               <span className="font-medium">Offre limitée</span>
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white">
//                 Prêt à transformer votre réseau professionnel?
//               </h2>
//               <p className="text-blue-100 text-lg md:text-xl">
//                 Réservez votre place pour un essai gratuit d'un mois et découvrez tous les avantages de notre
//                 plateforme.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
//               <Link href="/register" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   className="w-full gap-1.5 bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/40 transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                 >
//                   Réserver maintenant <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <Link href="#features" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="w-full bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700
//              dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100 dark:hover:bg-gray-100 shadow-lg shadow-blue-800/30
//              border-white hover:border-blue-200
//              transition-all hover:-translate-y-0.5 transform hover:scale-105"
//                 >
//                   En savoir plus
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
//               <span>FAQ</span>
//             </div>
//             <div className="space-y-2 max-w-3xl">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Questions fréquentes
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">Trouvez les réponses à vos questions</p>
//             </div>
//           </div>
//           <div className="grid gap-6 mt-12 max-w-4xl mx-auto">
//             {[
//               {
//                 question: "Qu'est-ce qui est inclus dans l'essai gratuit?",
//                 answer:
//                   "L'essai gratuit d'un mois vous donne accès à toutes les fonctionnalités de la plateforme sans restriction, y compris les événements exclusifs et les opportunités de networking.",
//               },
//               {
//                 question: "Comment fonctionne l'inscription?",
//                 answer:
//                   "Remplissez simplement le formulaire d'inscription, choisissez votre profil (professionnel ou entreprise) et suivez les étapes guidées pour compléter votre profil et commencer à explorer la plateforme.",
//               },
//               {
//                 question: "Dois-je fournir mes informations bancaires?",
//                 answer:
//                   "Oui, mais vous ne serez pas débité pendant la période d'essai. Vous pourrez annuler à tout moment avant la fin de l'essai gratuit sans aucun frais.",
//               },
//               {
//                 question: "Quand la plateforme sera-t-elle officiellement lancée?",
//                 answer:
//                   "La version complète sera lancée après la phase d'essai. Les premiers utilisateurs (Early adopters) bénéficieront d'un mois gratuit et seront informés par email dès que la plateforme sera lancée.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-purple-500/30"
//               >
//                 <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.question}</h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{item.answer}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 items-center max-w-5xl mx-auto">
//             <div className="animate-fade-in-left">
//               <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 mb-4">
//                 <span>Newsletter</span>
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
//                 Restez informé
//               </h2>
//               <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
//                 Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles, mises à jour et offres
//                 exclusives.
//               </p>
//               <div className="mt-4 flex flex-col gap-2">
//                 {[
//                   "Conseils de réseautage professionnels",
//                   "Invitations aux événements exclusifs",
//                   "Opportunités professionnelles exclusives",
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-blue-600 dark:text-purple-400" />
//                     <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg animate-fade-in-right">
//               {isSubscribed ? (
//                 <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
//                   <div className="p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full">
//                     <CheckCircle className="h-8 w-8 text-blue-600 dark:text-purple-400" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Inscription réussie !
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Merci de vous être abonné à notre newsletter. Vous recevrez bientôt nos dernières mises à jour et offres exclusives.
//                   </p>
//                   <Button
//                     onClick={() => setIsSubscribed(false)}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
//                   >
//                     S'abonner à nouveau
//                   </Button>
//                 </div>
//               ) : (
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="email"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
//                     >
//                       Adresse email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="nom@example.com"
//                         className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="name"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
//                     >
//                       Votre nom
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       placeholder="Jean Dupont"
//                       className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
//                       required
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
//                   >
//                     S'abonner à la newsletter
//                   </Button>
//                   <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
//                     En vous inscrivant, vous acceptez notre politique de confidentialité.
//                   </p>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-blue-100 dark:border-gray-800 py-12 bg-[#013959] dark:bg-gray-900">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <img
//                   src="/logo.png"
//                   alt="Catchub Logo"
//                   className="h-7 w-auto hover:opacity-90 transition-opacity duration-300"
//                 />
//               </div>
//               <p className="text-sm text-gray-200 dark:text-gray-200">
//                 La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires.
//               </p>
//             </div>
//             {[
//               {
//                 title: "Plateforme",
//                 links: [
//                   { name: "Fonctionnalités", href: "#features" },
//                   { name: "Avantages", href: "#benefits" },
//                   { name: "FAQ", href: "#faq" },
//                 ],
//               },
//               {
//                 title: "Légal",
//                 links: [
//                   { name: "Conditions d'utilisation", href: "#" },
//                   { name: "Politique de confidentialité", href: "#" },
//                   { name: "Cookies", href: "#" },
//                 ],
//               },
//             ].map((section, i) => (
//               <div key={i} className="space-y-4">
//                 <h4 className="font-semibold text-sm text-white dark:text-white">{section.title}</h4>
//                 <ul className="space-y-2">
//                   {section.links.map((link, j) => (
//                     <li key={j}>
//                       <Link
//                         href={link.href}
//                         className="text-sm text-gray-300 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-100 dark:border-gray-800 mt-8 pt-8">
//             <p className="text-sm text-gray-300 dark:text-gray-400 mb-4 md:mb-0">
//               © {new Date().getFullYear()} Catchub. Tous droits réservés.
//             </p>
//             <div className="flex gap-4">
//               {[
//                 { name: "LinkedIn", href: "#", icon: "LinkedIn" },
//                 {
//                   name: "Facebook",
//                   href: "https://www.facebook.com/share/1BWU5gLuo7/",
//                   icon: "Facebook",
//                 },
//                 {
//                   name: "Instagram",
//                   href: "https://www.instagram.com/joincatchub?igsh=MW5rZ3hzMXQwNTBjYQ==",
//                   icon: "Instagram",
//                 },
//                 {
//                   name: "Twitter",
//                   href: "https://x.com/JoinCatchub?t=68YH3hKHnPHlHBhGbv_4xw&s=09",
//                   icon: "Twitter",
//                 },
//                 {
//                   name: "TikTok",
//                   href: "https://www.tiktok.com/@catchub?_t=ZM-8wBW9gBF5FN&_r=1",
//                   icon: "TikTok",
//                 },
//               ].map((social, i) => (
//                 <Link
//                   key={i}
//                   href={social.href}
//                   className="text-gray-300 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors hover:-translate-y-0.5 transform"
//                   aria-label={social.name}
//                 >
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     {social.icon === "LinkedIn" && (
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     )}
//                     {social.icon === "Facebook" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "Instagram" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.324a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm5.25-10.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "Twitter" && (
//                       <path
//                         fillRule="evenodd"
//                         d="M8.404 20.513c7.404 0 11.454-6.135 11.454-11.454 0-.174 0-.347-.01-.519A8.197 8.197 0 0022 4.39a8.073 8.073 0 01-2.318.635 4.043 4.043 0 001.772-2.23 8.097 8.097 0 01-2.565.982 4.026 4.026 0 00-6.856 3.672 11.427 11.427 0 01-8.3-4.204 4.026 4.026 0 001.247 5.375 4.003 4.003 0 01-1.823-.503v.05a4.026 4.026 0 003.23 3.948 4.02 4.02 0 01-1.818.069 4.027 4.027 0 003.758 2.794 8.077 8.077 0 01-5.007 1.727 8.14 8.14 0 01-.958-.058 11.392 11.392 0 006.174 1.807"
//                         clipRule="evenodd"
//                       />
//                     )}
//                     {social.icon === "TikTok" && (
//                       <path
//                         d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0z"
//                       />
//                     )}
//                   </svg>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           {/* Bannière cookies */}
//           <CookieBanner />
//         </div>
//       </footer>

//       {/* Analytics */}
//       <Analytics />
//     </div>
//   )
// }

"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Building2, Calendar, Mail, Globe, Shield, Target } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import CookieBanner from "@/components/cookieBanner"; // Ajout cookies
import Analytics from '@/components/Analytics'; // Ajout analytics

const navItems = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Avantages", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
];

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false) // New state for subscription status
  const [activeSection, setActiveSection] = useState("");        

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value
    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value

    if (email && name) {
      setIsSubscribed(true) // Set subscription status to true
      e.currentTarget.reset() // Reset form
      // Optionally, send data to backend here
      setTimeout(() => setIsSubscribed(false), 5000) // Hide message after 5 seconds
    } else {
      alert("Veuillez remplir tous les champs.")
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500`}
    >
      {/* Header Section */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm font-[Montserrat, sans-serif]">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Catchub Logo"
            className="h-10 w-auto hover:opacity-90 transition-opacity duration-300"
          />
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center font-[Montserrat, sans-serif]">
          <div className="flex space-x-1">
            {navItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <a
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all transform relative
                    ${
                      activeSection === item.href
                        ? "text-[#1CD5F5] font-semibold after:w-full"
                        : "text-slate-900 dark:text-blue-300"
                    }
                    hover:text-[#1CD5F5] hover:font-semibold hover:scale-105
                    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#1CD5F5] after:transition-all`}
                >
                  {item.label}
                </a>
                {index < navItems.length - 1 && (
                  <div className="h-4 w-px bg-blue-200 dark:bg-blue-700 self-center mx-1"></div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-5">
          <a href="/register">
             <button 
              style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.03em' }}
            className="bg-[#003E5D] hover:bg-[#005F86] shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 transform duration-300 text-white font-medium px-5 py-2 rounded-lg font-montserrat">
            Essai Gratuit
            </button>
          </a>
        </div>
      </div>
    </header>

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                
                <h1
  style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.002em' }}
  className="text-2xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none animate-fade-in-up"
>
  <span className="text-[#003E5D]">
    Connectez vous. <br className="hidden sm:inline" />
    Collaborez.
  </span>{" "}
  <span className="text-[#27D5F7]">Réussissez.</span>
</h1>

<p
  style={{ fontFamily: 'Montserrat, sans-serif' }}
  className="max-w-[600px] text-lg md:text-xl animate-fade-in-up delay-100 text-[#8F9BA8]"
>
  La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires durables.
</p>



              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up delay-200">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="gap-1.5 bg-[#003E5D] hover:bg-[#005F86] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:shadow-none active:translate-y-0 transition-all transform group"
                  >
                    Réservez votre place{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-1.5 border-[#003E5D] text-bg-[#003E5D] hover:bg-[#D9E7F0] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:shadow-none active:translate-y-0 transition-all transform group"
                  >
                    Découvrir
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-2 animate-fade-in-up delay-300">
              </div>
            </div>
            <div className="flex items-center justify-center animate-fade-in delay-200">
              <div className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-blue-100/50 to-white dark:from-purple-900/30 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transition-shadow duration-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3 bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg backdrop-blur transition-all duration-500 group-hover:scale-105">
                    <div className="inline-flex mb-2 justify-center items-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 dark:text-purple-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">Vidéo explicative</p>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Découvrez notre plateforme</p>
                    <Link href="/register">
                      <Button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105">
                        Réserver maintenant
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-grid-blue-200/10 dark:bg-grid-purple-900/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
              <span>Fonctionnalités</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
                Une plateforme complète pour votre succès professionnel
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Découvrez comment notre plateforme peut transformer votre réseau professionnel et accélérer votre
                croissance
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Users,
                title: "Réseautage Ciblé",
                desc: "Connectez-vous avec des professionnels et des entreprises de votre secteur grâce à notre algorithme de matching avancé.",
              },
              {
                icon: Building2,
                title: "Opportunités B2B",
                desc: "Trouvez des partenaires commerciaux, fournisseurs et clients potentiels adaptés à vos besoins spécifiques.",
              },
              {
                icon: Calendar,
                title: "Événements Exclusifs",
                desc: "Participez à des événements de networking et des formations exclusives pour développer vos compétences.",
              },
              {
                icon: Globe,
                title: "Visibilité Internationale",
                desc: "Étendez votre présence professionnelle au-delà des frontières et accédez à un réseau mondial.",
              },
              {
                icon: Shield,
                title: "Sécurité des Données",
                desc: "Vos informations professionnelles sont protégées avec les standards de sécurité les plus élevés.",
              },
              {
                icon: Target,
                title: "Analytics Avancés",
                desc: "Suivez et analysez vos interactions et opportunités avec des outils d'analyse intuitifs.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-start space-y-3 border border-blue-100 dark:border-purple-900/30 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 transform group hover:border-blue-200 dark:hover:border-purple-500/30"
              >
                <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-blue-200/50 dark:group-hover:bg-purple-900/50 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
              <span>Avantages</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
                Pourquoi nous choisir
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Les avantages qui font la différence pour votre carrière ou votre entreprise
              </p>
            </div>
          </div>
          <div className="grid gap-8 mt-16 md:grid-cols-2 max-w-7xl mx-auto px-4">
            <div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-left hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full mb-6">
                <Users className="h-6 w-6 text-[#1cd5f5] dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Professionnels</h3>
              <div className="space-y-4">
                {[
                  "Accédez à des opportunités de mentorat exclusives",
                  "Développez vos compétences avec des formations ciblées",
                  "Élargissez votre réseau professionnel stratégiquement",
                  "Trouvez des opportunités d'emploi cachées",
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#1cd5f5] dark:text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Link href="/register/professional">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-950 rounded-full">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-purple-900/30 animate-fade-in-right hover:border-blue-200 dark:hover:border-purple-500/30 transition-all"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-purple-900/30 rounded-full mb-6">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pour les Entreprises</h3>
              <div className="space-y-4">
                {[
                  "Présentez votre marque à un public ciblé et qualifié",
                  "Développez votre réseau B2B stratégiquement",
                  "Trouvez des talents qualifiés pour vos besoins",
                  "Accédez à de nouveaux marchés et financements",
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#1cd5f5] dark:text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Link href="/register/bussiness">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-950 rounded-full">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-400 to-purple-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm text-white animate-pulse">
              <span className="font-medium">Offre limitée</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white">
                Prêt à transformer votre réseau professionnel?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl">
                Réservez votre place pour un essai gratuit d'un mois et découvrez tous les avantages de notre
                plateforme.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full gap-1.5 bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/40 transition-all hover:-translate-y-0.5 transform hover:scale-105"
                >
                  Réserver maintenant <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700
             dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100 dark:hover:bg-gray-100 shadow-lg shadow-blue-800/30
             border-white hover:border-blue-200
             transition-all hover:-translate-y-0.5 transform hover:scale-105"
                >
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 animate-fade-in">
              <span>FAQ</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
                Questions fréquentes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Trouvez les réponses à vos questions</p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 max-w-4xl mx-auto">
            {[
              {
                question: "Qu'est-ce qui est inclus dans l'essai gratuit?",
                answer:
                  "L'essai gratuit d'un mois vous donne accès à toutes les fonctionnalités de la plateforme sans restriction, y compris les événements exclusifs et les opportunités de networking.",
              },
              {
                question: "Comment fonctionne l'inscription?",
                answer:
                  "Remplissez simplement le formulaire d'inscription, choisissez votre profil (professionnel ou entreprise) et suivez les étapes guidées pour compléter votre profil et commencer à explorer la plateforme.",
              },
              {
                question: "Dois-je fournir mes informations bancaires?",
                answer:
                  "Oui, mais vous ne serez pas débité pendant la période d'essai. Vous pourrez annuler à tout moment avant la fin de l'essai gratuit sans aucun frais.",
              },
              {
                question: "Quand la plateforme sera-t-elle officiellement lancée?",
                answer:
                  "La version complète sera lancée après la phase d'essai. Les premiers utilisateurs (Early adopters) bénéficieront d'un mois gratuit et seront informés par email dès que la plateforme sera lancée.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-purple-500/30"
              >
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.question}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center max-w-5xl mx-auto">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-400 mb-4">
                <span>Newsletter</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 dark:text-white">
                Restez informé
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
                Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles, mises à jour et offres
                exclusives.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  "Conseils de réseautage professionnels",
                  "Invitations aux événements exclusifs",
                  "Opportunités professionnelles exclusives",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-purple-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg animate-fade-in-right">
              {isSubscribed ? (
                <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
                  <div className="p-3 bg-blue-100 dark:bg-purple-900/30 rounded-full">
                    <CheckCircle className="h-8 w-8 text-blue-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Inscription réussie !
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Merci de vous être abonné à notre newsletter. Vous recevrez bientôt nos dernières mises à jour et offres exclusives.
                  </p>
                  <Button
                    onClick={() => setIsSubscribed(false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
                  >
                    S'abonner à nouveau
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
                    >
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nom@example.com"
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
                    >
                      Votre nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Jean Dupont"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue- personally-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all hover:-translate-y-0.5 transform hover:scale-105 text-white"
                  >
                    S'abonner à la newsletter
                  </Button>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
                    En vous inscrivant, vous acceptez notre politique de confidentialité.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 dark:border-gray-800 py-12 bg-[#013959] dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Catchub Logo"
                  className="h-7 w-auto hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <p className="text-sm text-gray-200 dark:text-gray-200">
                La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires.
              </p>
            </div>
            {[
              {
                title: "Plateforme",
                links: [
                  { name: "Fonctionnalités", href: "#features" },
                  { name: "Avantages", href: "#benefits" },
                  { name: "FAQ", href: "#faq" },
                ],
              },
              {
                title: "Légal",
                links: [
                  { name: "Conditions d'utilisation", href: "#" },
                  { name: "Politique de confidentialité", href: "#" },
                  { name: "Cookies", href: "#" },
                ],
              },
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h4 className="font-semibold text-sm text-white dark:text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue-100 dark:border-gray-800 mt-8 pt-8">
            <p className="text-sm text-gray-300 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Catchub. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              {[
                { name: "LinkedIn", href: "#", icon: "LinkedIn" },
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/share/1BWU5gLuo7/",
                  icon: "Facebook",
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/joincatchub?igsh=MW5rZ3hzMXQwNTBjYQ==",
                  icon: "Instagram",
                },
                {
                  name: "Twitter",
                  href: "https://x.com/JoinCatchub?t=68YH3hKHnPHlHBhGbv têtes_4xw&s=09",
                  icon: "Twitter",
                },
                {
                  name: "TikTok",
                  href: "https://www.tiktok.com/@catchub?_t=ZM-8wBW9gBF5FN&_r=1",
                  icon: "TikTok",
                },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors hover:-translate-y-0.5 transform"
                  aria-label={social.name}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon === "LinkedIn" && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                    {social.icon === "Facebook" && (
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    )}
                    {social.icon === "Instagram" && (
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.853-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.324a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm5.25-10.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
                        clipRule="evenodd"
                      />
                    )}
                    {social.icon === "Twitter" && (
                      <path
                        fillRule="evenodd"
                        d="M8.404 20.513c7.404 0 11.454-6.135 11.454-11.454 0-.174 0-.347-.01-.519A8.197 8.197 0 0022 4.39a8.073 8.073 0 01-2.318.635 4.043 4.043 0 001.772-2.23 8.097 8.097 0 01-2.565.982 4.026 4.026 0 00-6.856 3.672 11.427 11.427 0 01-8.3-4.204 4.026 4.026 0 001.247 5.375 4.003 4.003 0 01-1.823-.503v.05a4.026 4.026 0 003.23 3.948 4.02 4.02 0 01-1.818.069 4.027 4.027 0 003.758 2.794 8.077 8.077 0 01-5.007 1.727 8.14 8.14 0 01-.958-.058 11.392 11.392 0 006.174 1.807"
                        clipRule="evenodd"
                      />
                    )}
                    {social.icon === "TikTok" && (
                      <path
                        d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0z"
                      />
                    )}
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Bannière cookies */}
        <div className="w-full bg-[#013959] dark:bg-gray-900">
          <CookieBanner />
        </div>
      </footer>

      {/* Analytics */}
      <Analytics />
    </div>
  )
}