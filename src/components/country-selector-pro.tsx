"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, X, Check, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Liste des pays avec leurs codes, noms et préfixes téléphoniques

interface CountrySelectorProps {     
  value: string
  onChange: (value: string) => void
  error?: string
  onPrefixChange?: (prefix: string) => void
  countries: { code: string; name: string; prefix: string }[] // ✅ nouvelle prop
}


export default function CountrySelector({ value, onChange, error, onPrefixChange,countries }: CountrySelectorProps) {
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
          "w-full pl-4 h-12 rounded-lg border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-left font-normal justify-between transition-all duration-300",
          error
            ? "border-red-500 dark:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/50 text-gray-900 dark:text-gray-100"
            : "border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 text-gray-900 dark:text-gray-100",
          isHovered && "shadow-md dark:shadow-gray-900/50",
        )}
      >
        {selectedCountry ? (
          <span className="flex items-center text-gray-900 dark:text-gray-100">
            <span className="font-medium">{selectedCountry.name}</span>
          </span>
        ) : (
          <span className="flex items-center text-gray-500 dark:text-gray-400">
            <Globe className="w-5 h-5 mr-2" />
            <span>Sélectionnez votre pays</span>
          </span>
        )}
        <ChevronDown
          className={cn("h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-300", isOpen && "transform rotate-180")}
        />
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-xl dark:shadow-gray-900/50 animate-in fade-in-50 slide-in-from-top-5 duration-200 overflow-hidden">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-100 dark:focus:ring-blue-900/50 rounded-md"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <div
            className="py-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
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
                    "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-200",
                    country.name === value ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200",
                  )}
                >
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{country.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{country.prefix}</span>
                    </div>
                  </div>
                  {country.name === value && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">Aucun pays trouvé</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}