"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, X, Check, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Liste des pays avec leurs codes, noms et préfixes téléphoniques
const countries = [
  { code: "MA", name: "Maroc", prefix: "+212" },
  { code: "FR", name: "France", prefix: "+33" },
  { code: "BE", name: "Belgique", prefix: "+32" },
  { code: "CH", name: "Suisse", prefix: "+41" },
  { code: "CA", name: "Canada", prefix: "+1" },
  { code: "SN", name: "Sénégal", prefix: "+221" },
  { code: "CI", name: "Côte d'Ivoire", prefix: "+225" },
  { code: "TN", name: "Tunisie", prefix: "+216" },
  { code: "DZ", name: "Algérie", prefix: "+213" },
  { code: "CM", name: "Cameroun", prefix: "+237" },
  { code: "MG", name: "Madagascar", prefix: "+261" },
  { code: "ML", name: "Mali", prefix: "+223" },
  { code: "NE", name: "Niger", prefix: "+227" },
  { code: "BF", name: "Burkina Faso", prefix: "+226" },
  { code: "GN", name: "Guinée", prefix: "+224" },
  { code: "BJ", name: "Bénin", prefix: "+229" },
  { code: "TG", name: "Togo", prefix: "+228" },
  { code: "GA", name: "Gabon", prefix: "+241" },
  { code: "CG", name: "Congo", prefix: "+242" },
  { code: "CD", name: "Rép. Dém. du Congo", prefix: "+243" },
]

interface CountrySelectorProps {
  value: string // Nom du pays (par exemple, "Maroc")
  onChange: (value: string) => void // Passe le nom du pays
  error?: string
  onPrefixChange?: (prefix: string) => void // Passe le préfixe téléphonique
}

export default function CountrySelector({ value, onChange, error, onPrefixChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const selectedItemRef = useRef<HTMLButtonElement>(null)

  // Filtrer les pays en fonction du terme de recherche
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.prefix.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Trouver le pays sélectionné
  const selectedCountry = countries.find((country) => country.name === value)

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
  const handleCountrySelect = (name: string) => {
    onChange(name)
    const country = countries.find((c) => c.name === name)
    if (country && onPrefixChange) {
      onPrefixChange(country.prefix) // Passer le préfixe au composant parent
    }
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "w-full pl-4 h-12 rounded-lg border bg-white hover:bg-gray-50 text-left font-normal justify-between transition-all duration-300",
          error
            ? "border-red-500 focus:ring-red-100 text-gray-900"
            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900",
          isHovered && "shadow-md",
        )}
      >
        {selectedCountry ? (
          <span className="flex items-center text-gray-900">
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

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-xl animate-in fade-in-50 slide-in-from-top-5 duration-200 overflow-hidden">
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
                  ref={country.name === value ? selectedItemRef : null}
                  onClick={() => handleCountrySelect(country.name)}
                  className={cn(
                    "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50 transition-all duration-200",
                    country.name === value ? "bg-blue-50 text-blue-700" : "text-gray-700",
                  )}
                >
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">{country.name}</span>
                      <span className="text-xs text-gray-500">{country.prefix}</span>
                    </div>
                  </div>
                  {country.name === value && <Check className="h-4 w-4 text-blue-600" />}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">Aucun pays trouvé</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}