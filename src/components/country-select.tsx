// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Search, ChevronDown, X, Check, Globe } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import Image from "next/image"

// // Liste des pays avec leurs drapeaux, codes et préfixes téléphoniques
// const countries = [
//   {
//     code: "MA",
//     name: "Maroc",
//     flagUrl: "https://flagcdn.com/w80/ma.png",
//     prefix: "+212",
//   },
//   {
//     code: "FR",
//     name: "France",
//     flagUrl: "https://flagcdn.com/w80/fr.png",
//     prefix: "+33",
//   },
//   {
//     code: "BE",
//     name: "Belgique",
//     flagUrl: "https://flagcdn.com/w80/be.png",
//     prefix: "+32",
//   },
//   {
//     code: "CH",
//     name: "Suisse",
//     flagUrl: "https://flagcdn.com/w80/ch.png",
//     prefix: "+41",
//   },
//   {
//     code: "CA",
//     name: "Canada",
//     flagUrl: "https://flagcdn.com/w80/ca.png",
//     prefix: "+1",
//   },
//   {
//     code: "SN",
//     name: "Sénégal",
//     flagUrl: "https://flagcdn.com/w80/sn.png",
//     prefix: "+221",
//   },
//   {
//     code: "CI",
//     name: "Côte d'Ivoire",
//     flagUrl: "https://flagcdn.com/w80/ci.png",
//     prefix: "+225",
//   },
//   {
//     code: "TN",
//     name: "Tunisie",
//     flagUrl: "https://flagcdn.com/w80/tn.png",
//     prefix: "+216",
//   },
//   {
//     code: "DZ",
//     name: "Algérie",
//     flagUrl: "https://flagcdn.com/w80/dz.png",
//     prefix: "+213",
//   },
//   {
//     code: "CM",
//     name: "Cameroun",
//     flagUrl: "https://flagcdn.com/w80/cm.png",
//     prefix: "+237",
//   },
//   {
//     code: "MG",
//     name: "Madagascar",
//     flagUrl: "https://flagcdn.com/w80/mg.png",
//     prefix: "+261",
//   },
//   {
//     code: "ML",
//     name: "Mali",
//     flagUrl: "https://flagcdn.com/w80/ml.png",
//     prefix: "+223",
//   },
//   {
//     code: "NE",
//     name: "Niger",
//     flagUrl: "https://flagcdn.com/w80/ne.png",
//     prefix: "+227",
//   },
//   {
//     code: "BF",
//     name: "Burkina Faso",
//     flagUrl: "https://flagcdn.com/w80/bf.png",
//     prefix: "+226",
//   },
//   {
//     code: "GN",
//     name: "Guinée",
//     flagUrl: "https://flagcdn.com/w80/gn.png",
//     prefix: "+224",
//   },
//   {
//     code: "BJ",
//     name: "Bénin",
//     flagUrl: "https://flagcdn.com/w80/bj.png",
//     prefix: "+229",
//   },
//   {
//     code: "TG",
//     name: "Togo",
//     flagUrl: "https://flagcdn.com/w80/tg.png",
//     prefix: "+228",
//   },
//   {
//     code: "GA",
//     name: "Gabon",
//     flagUrl: "https://flagcdn.com/w80/ga.png",
//     prefix: "+241",
//   },
//   {
//     code: "CG",
//     name: "Congo",
//     flagUrl: "https://flagcdn.com/w80/cg.png",
//     prefix: "+242",
//   },
//   {
//     code: "CD",
//     name: "Rép. Dém. du Congo",
//     flagUrl: "https://flagcdn.com/w80/cd.png",
//     prefix: "+243",
//   },
// ]

// interface CountrySelectProps {
//   value: string
//   onChange: (value: string) => void
//   error?: string
// }

// export default function CountrySelect({ value, onChange, error }: CountrySelectProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isHovered, setIsHovered] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const listRef = useRef<HTMLDivElement>(null)
//   const selectedItemRef = useRef<HTMLButtonElement>(null)

//   // Filtrer les pays en fonction du terme de recherche
//   const filteredCountries = countries.filter(
//     (country) =>
//       country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       country.prefix.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   // Trouver le pays sélectionné
//   const selectedCountry = countries.find((country) => country.code === value)

//   // Faire défiler jusqu'à l'élément sélectionné quand la liste s'ouvre
//   useEffect(() => {
//     if (isOpen && selectedItemRef.current && listRef.current) {
//       const listRect = listRef.current.getBoundingClientRect()
//       const selectedRect = selectedItemRef.current.getBoundingClientRect()

//       if (selectedRect.top < listRect.top || selectedRect.bottom > listRect.bottom) {
//         selectedItemRef.current.scrollIntoView({ block: "center" })
//       }
//     }
//   }, [isOpen])

//   // Gérer le clic en dehors du dropdown pour le fermer
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   // Focus sur l'input de recherche quand le dropdown s'ouvre
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus()
//     }
//   }, [isOpen])

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       <Button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className={cn(
//           "w-full pl-10 h-12 rounded-lg border bg-white hover:bg-gray-50 text-left font-normal justify-between transition-all duration-300",
//           error
//             ? "border-red-500 focus:ring-red-100"
//             : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
//           isHovered && "shadow-md",
//         )}
//       >
//         {selectedCountry ? (
//           <span className="flex items-center">
//             <div className="relative w-6 h-4 mr-3 overflow-hidden rounded shadow-sm">
//               <Image
//                 src={selectedCountry.flagUrl || "/placeholder.svg"}
//                 alt={`Drapeau ${selectedCountry.name}`}
//                 fill
//                 sizes="24px"
//                 className="object-cover"
//               />
//             </div>
//             <span className="font-medium">{selectedCountry.name}</span>
//             <span className="ml-2 text-sm text-gray-500">{selectedCountry.prefix}</span>
//           </span>
//         ) : (
//           <span className="flex items-center text-gray-500">
//             <Globe className="w-5 h-5 mr-2" />
//             <span>Sélectionnez votre pays</span>
//           </span>
//         )}
//         <ChevronDown
//           className={cn("h-4 w-4 text-gray-400 transition-transform duration-300", isOpen && "transform rotate-180")}
//         />
//       </Button>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-xl animate-in fade-in-50 slide-in-from-top-5 duration-200 overflow-hidden">
//           <div className="p-3 border-b border-gray-100 sticky top-0 bg-white z-10">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Rechercher un pays..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 h-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-md"
//               />
//               {searchTerm && (
//                 <button
//                   type="button"
//                   onClick={() => setSearchTerm("")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 transition-colors"
//                 >
//                   <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>
//           </div>

//           <div
//             className="py-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
//             ref={listRef}
//           >
//             {filteredCountries.length > 0 ? (
//               filteredCountries.map((country) => (
//                 <button
//                   key={country.code}
//                   type="button"
//                   ref={country.code === value ? selectedItemRef : null}
//                   onClick={() => {
//                     onChange(country.code)
//                     setIsOpen(false)
//                     setSearchTerm("")
//                   }}
//                   className={cn(
//                     "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50 transition-all duration-200",
//                     country.code === value ? "bg-blue-50 text-blue-700" : "text-gray-700",
//                   )}
//                 >
//                   <div className="flex items-center">
//                     <div className="relative w-8 h-6 mr-3 overflow-hidden rounded shadow-sm">
//                       <Image
//                         src={country.flagUrl || "/placeholder.svg"}
//                         alt={`Drapeau ${country.name}`}
//                         fill
//                         sizes="32px"
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-medium">{country.name}</span>
//                       <span className="text-xs text-gray-500">{country.prefix}</span>
//                     </div>
//                   </div>
//                   {country.code === value && <Check className="h-4 w-4 text-blue-600" />}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-3 text-sm text-gray-500 text-center">Aucun pays trouvé</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
