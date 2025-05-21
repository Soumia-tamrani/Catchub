// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Search, ChevronDown, X, Check, Globe } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { updatedCountriesList } from "@/lib/form-utils"
// import { motion, AnimatePresence } from "framer-motion"

// interface CountrySelectorProps {
//   value: string
//   onChange: (value: string) => void
//   error?: string
//   onPrefixChange?: (prefix: string) => void
// }

// export default function CountrySelector({ value, onChange, error, onPrefixChange }: CountrySelectorProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isHovered, setIsHovered] = useState(false)
//   const [isFocused, setIsFocused] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const listRef = useRef<HTMLDivElement>(null)
//   const selectedItemRef = useRef<HTMLButtonElement>(null)
//   const buttonRef = useRef<HTMLButtonElement>(null)

//   // Filtrer les pays en fonction du terme de recherche
//   const filteredCountries = updatedCountriesList.filter(
//     (country) =>
//       country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       country.prefix.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   // Trouver le pays sélectionné
//   const selectedCountry = updatedCountriesList.find((country) => country.code === value)

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
//         // Fermer le dropdown sans manipuler le focus
//         setIsOpen(false)
//       }
//     }

//     // Utiliser mousedown au lieu de click pour une meilleure réactivité
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

//   // Gérer la sélection d'un pays
//   const handleCountrySelect = (code: string) => {
//     // Stocker l'élément actif avant de changer quoi que ce soit
//     const activeElement = document.activeElement

//     onChange(code)
//     const country = updatedCountriesList.find((c) => c.code === code)
//     if (country && onPrefixChange) {
//       onPrefixChange(country.prefix)
//     }
//     setIsOpen(false)
//     setSearchTerm("")

//     // Éviter de perturber le focus de l'utilisateur
//     // Ne pas forcer le blur
//   }

//   // Modifiez la fonction handleButtonClick pour éviter les effets secondaires indésirables
//   const handleButtonClick = (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation() // Empêcher la propagation de l'événement

//     // Ouvrir/fermer le dropdown sans perturber le focus global
//     setIsOpen((prev) => !prev)

//     // Ne pas manipuler le focus ici
//   }

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       <Button
//         type="button"
//         ref={buttonRef}
//         onClick={handleButtonClick}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         className={cn(
//           "w-full h-12 pl-4 rounded-lg border bg-white hover:bg-gray-50 text-left font-normal justify-between transition-all duration-300",
//           error
//             ? "border-red-500 focus:ring-red-100 text-gray-900"
//             : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900",
//           (isHovered || isFocused) && "shadow-md",
//         )}
//       >
//         {selectedCountry ? (
//           <span className="flex items-center text-gray-900">
//             <img
//               src={selectedCountry.flag ? selectedCountry.flag : "/placeholder.svg"}
//               alt={`${selectedCountry.name} flag`}
//               className="mr-2 h-4 w-6"
//             />
//             <span className="font-medium">{selectedCountry.name}</span>
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

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden"
//           >
//             <div className="p-3 border-b border-gray-100 sticky top-0 bg-white z-10">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   ref={inputRef}
//                   type="text"
//                   placeholder="Rechercher un pays..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 h-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-md"
//                 />
//                 {searchTerm && (
//                   <button
//                     type="button"
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 transition-colors"
//                   >
//                     <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div
//               className="py-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
//               ref={listRef}
//             >
//               {filteredCountries.length > 0 ? (
//                 filteredCountries.map((country) => (
//                   <button
//                     key={country.code}
//                     type="button"
//                     ref={country.code === value ? selectedItemRef : null}
//                     onClick={() => handleCountrySelect(country.code)}
//                     className={cn(
//                       "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50 transition-all duration-200",
//                       country.code === value ? "bg-blue-50 text-blue-700" : "text-gray-700",
//                     )}
//                   >
//                     <div className="flex items-center">
//                       <img
//                         src={country.flag ? country.flag : "/placeholder.svg"}
//                         alt={`${country.name} flag`}
//                         className="mr-2 h-4 w-6"
//                       />
//                       <div className="flex flex-col">
//                         <span className="text-sm font-medium">{country.name}</span>
//                         <span className="text-xs text-gray-500">{country.prefix}</span>
//                       </div>
//                     </div>
//                     {country.code === value && <Check className="h-4 w-4 text-blue-600" />}
//                   </button>
//                 ))
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500 text-center">Aucun pays trouvé</div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// components/country-selector.tsx
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, X, Check, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"



import { motion, AnimatePresence } from "framer-motion"


interface CountrySelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
  onPrefixChange?: (prefix: string) => void

}


export default function CountrySelector({ value, onChange, error, onPrefixChange,countries }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const selectedItemRef = useRef<HTMLButtonElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Filtrer les pays en fonction du terme de recherche
  const filteredCountries = updatedCountriesList.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.prefix.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Trouver le pays sélectionné
  const selectedCountry = updatedCountriesList.find((country) => country.code === value)

  // Faire défiler jusqu'à l'élément sélectionné quand la liste s'ouvre
  useEffect(() => {
    if (isOpen && selectedItemRef.current && listRef.current) {
      const listRect = listRef.current.getBoundingClientRect()
      const selectedRect = selectedItemRef.current.getBoundingClientRect()

      if (selectedRect.top < listRect.top || selectedRect.bottom > listRect.bottom) {
        selectedItemRef.current.scrollIntoView({ block: "center" })
      }
    }
  }, [isOpen])

  // Gérer le clic en dehors du dropdown pour le fermer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus sur l'input de recherche quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Gérer la sélection d'un pays
  const handleCountrySelect = (code: string) => {
    const activeElement = document.activeElement

    onChange(code)
    const country = updatedCountriesList.find((c) => c.code === code)
    if (country && onPrefixChange) {
      onPrefixChange(country.prefix)
    }
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        type="button"
        ref={buttonRef}
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full h-12 pl-4 rounded-lg border bg-white hover:bg-gray-50 text-left font-normal justify-between transition-all duration-300",
          error
            ? "border-red-500 focus:ring-red-100 text-gray-900"
            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900",
          (isHovered || isFocused) && "shadow-md",
        )}
      >
        {selectedCountry ? (
          <span className="flex items-center text-gray-900">
            {/* Remove the flag from the selected country display */}
            <span className="font-medium">{selectedCountry.name}</span>
          </span>
        ) : (
          <span className="flex items-center text-gray-500">
            <Globe className="w-5 h-5 mr-2" />
            <span>Sélectionnez votre pays</span>
          </span>
        )}
        <ChevronDown
          className={cn("h-4 w-4 text-gray-400 transition-transform duration-300", isOpen && "transform rotate-180")}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Rechercher un pays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-md"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            <div
              className="py-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
              ref={listRef}
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    ref={country.code === value ? selectedItemRef : null}
                    onClick={() => handleCountrySelect(country.code)}
                    className={cn(
                      "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50 transition-all duration-200",
                      country.code === value ? "bg-blue-50 text-blue-700" : "text-gray-700",
                    )}
                  >
                    <div className="flex items-center">
                      {/* Add the flag from the dropdown options */}
                      <img src={country.flag ? country.flag : "/placeholder.svg"} alt={`${country.name} flag`} className="mr-2 h-4 w-6" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{country.name}</span>
                        <span className="text-xs text-gray-500">{country.prefix}</span>
                      </div>
                    </div>
                    {country.code === value && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">Aucun pays trouvé</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}