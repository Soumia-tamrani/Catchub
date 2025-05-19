"use client"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { Loader2 } from "lucide-react"
import EnhancedCountrySelect from "./enhanced-country-select"
import FlagIcon from "./flag-icon"

// Liste des pays avec leurs drapeaux, codes et préfixes téléphoniques
const countries = [
  {
    code: "MA",
    name: "Maroc",
    prefix: "+212",
    pattern: "^(?:\\+212|0)[5-7]\\d{8}$",
    hint: "Format: 06XXXXXXXX, 07XXXXXXXX ou 05XXXXXXXX",
  },
  {
    code: "FR",
    name: "France",
    prefix: "+33",
    pattern: "^(?:\\+33|0)[67]\\d{8}$",
    hint: "Format: 06XXXXXXXX ou 07XXXXXXXX",
  },
  {
    code: "BE",
    name: "Belgique",
    prefix: "+32",
    pattern: "^(?:\\+32|0)4\\d{8}$",
    hint: "Format: 04XXXXXXXX",
  },
  {
    code: "CH",
    name: "Suisse",
    prefix: "+41",
    pattern: "^(?:\\+41|0)7\\d{8}$",
    hint: "Format: 07XXXXXXXX",
  },
  {
    code: "CA",
    name: "Canada",
    prefix: "+1",
    pattern: "^\\+?1?\\d{10}$",
    hint: "Format: XXXXXXXXXX (10 chiffres)",
  },
  {
    code: "SN",
    name: "Sénégal",
    prefix: "+221",
    pattern: "^(?:\\+221|0)[7]\\d{8}$",
    hint: "Format: 7XXXXXXXX",
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    prefix: "+225",
    pattern: "^(?:\\+225|0)[7]\\d{8}$",
    hint: "Format: 7XXXXXXXX",
  },
  {
    code: "TN",
    name: "Tunisie",
    prefix: "+216",
    pattern: "^(?:\\+216|0)?[259]\\d{7}$",
    hint: "Format: 2XXXXXXX, 5XXXXXXX ou 9XXXXXXX",
  },
  {
    code: "DZ",
    name: "Algérie",
    prefix: "+213",
    pattern: "^(?:\\+213|0)[567]\\d{8}$",
    hint: "Format: 05XXXXXXXX, 06XXXXXXXX ou 07XXXXXXXX",
  },
  {
    code: "CM",
    name: "Cameroun",
    prefix: "+237",
    pattern: "^(?:\\+237|0)[6-9]\\d{8}$",
    hint: "Format: 6XXXXXXXX, 7XXXXXXXX, 8XXXXXXXX ou 9XXXXXXXX",
  },
  {
    code: "MG",
    name: "Madagascar",
    prefix: "+261",
    pattern: "^(?:\\+261|0)[3]\\d{8}$",
    hint: "Format: 03XXXXXXXX",
  },
  {
    code: "ML",
    name: "Mali",
    prefix: "+223",
    pattern: "^(?:\\+223|0)[67]\\d{7}$",
    hint: "Format: 6XXXXXXX ou 7XXXXXXX",
  },
  {
    code: "NE",
    name: "Niger",
    prefix: "+227",
    pattern: "^(?:\\+227|0)[89]\\d{7}$",
    hint: "Format: 8XXXXXXX ou 9XXXXXXX",
  },
  {
    code: "BF",
    name: "Burkina Faso",
    prefix: "+226",
    pattern: "^(?:\\+226|0)[67]\\d{7}$",
    hint: "Format: 6XXXXXXX ou 7XXXXXXX",
  },
  {
    code: "GN",
    name: "Guinée",
    prefix: "+224",
    pattern: "^(?:\\+224|0)[6]\\d{8}$",
    hint: "Format: 6XXXXXXXX",
  },
  {
    code: "BJ",
    name: "Bénin",
    prefix: "+229",
    pattern: "^(?:\\+229|0)[569]\\d{7}$",
    hint: "Format: 5XXXXXXX, 6XXXXXXX ou 9XXXXXXX",
  },
  {
    code: "TG",
    name: "Togo",
    prefix: "+228",
    pattern: "^(?:\\+228|0)[79]\\d{7}$",
    hint: "Format: 7XXXXXXX ou 9XXXXXXX",
  },
  {
    code: "GA",
    name: "Gabon",
    prefix: "+241",
    pattern: "^(?:\\+241|0)[67]\\d{7}$",
    hint: "Format: 6XXXXXXX ou 7XXXXXXX",
  },
  {
    code: "CG",
    name: "Congo",
    prefix: "+242",
    pattern: "^(?:\\+242|0)[56]\\d{8}$",
    hint: "Format: 5XXXXXXXX ou 6XXXXXXXX",
  },
  {
    code: "CD",
    name: "Rép. Dém. du Congo",
    prefix: "+243",
    pattern: "^(?:\\+243|0)[89]\\d{8}$",
    hint: "Format: 8XXXXXXXX ou 9XXXXXXXX",
  },
  {
    code: "OTHER",
    name: "Autre",
    prefix: "",
    pattern: "^\\+?[0-9\\s-]{6,}$",
    hint: "Format international",
  },
]

interface EnhancedPhoneInputProps {
  value: string
  onChange: (value: string | undefined) => void
  onBlur: () => void
  error?: string
  country: string
  onCountryChange: (country: string) => void
  isChecking: boolean
}

export default function EnhancedPhoneInput({
  value,
  onChange,
  onBlur,
  error,
  country,
  onCountryChange,
  isChecking,
}: EnhancedPhoneInputProps) {
  // Trouver le pays sélectionné
  const selectedCountry = countries.find((c) => c.code === country) || countries[0]

  // Obtenir l'indice pour le numéro de téléphone
  const getPhoneHint = () => {
    const countryData = countries.find((c) => c.code === country)
    return countryData ? countryData.hint : "Sélectionnez votre pays et entrez votre numéro"
  }

  // Personnaliser le rendu du drapeau dans PhoneInput
  const renderFlag = ({ country, countryName }: { country: string; countryName: string }) => {
    return (
      <div className="w-6 h-4 relative">
        <FlagIcon countryCode={country.toUpperCase()} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <EnhancedCountrySelect value={country} onChange={onCountryChange} error={error} className="mb-2" />

      <div className="relative">
        <PhoneInput
          international
          // Convertir le code de pays en minuscules pour PhoneInput
          // La bibliothèque attend les codes en minuscules
          defaultCountry={country.toLowerCase() as any}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "h-12 rounded-lg border transition-all duration-200",
            error
              ? "border-red-500"
              : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100",
          )}
          countrySelectProps={{
            unicodeFlags: false,
            className: "phone-country-select-dropdown",
          }}
          flagComponent={renderFlag}
        />
        {isChecking && <Loader2 className="absolute right-3 top-3.5 text-blue-500 animate-spin" size={18} />}
      </div>

      {error ? (
        <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
          <AlertCircle className="mr-1 h-4 w-4" /> {error}
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-1">{getPhoneHint()}</p>
      )}
    </div>
  )
}
