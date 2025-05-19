import CountryFlag from "react-country-flag"
import { cn } from "@/lib/utils"

// Liste des préfixes et indices par pays, indexée par nom du pays
const countryPrefixes: Record<string, { prefix: string; hint: string; code: string }> = {
  Maroc: { prefix: "+212", hint: "Format: 06XXXXXXXX, 07XXXXXXXX ou 05XXXXXXXX", code: "MA" },
  France: { prefix: "+33", hint: "Format: 06XXXXXXXX ou 07XXXXXXXX", code: "FR" },
  Belgique: { prefix: "+32", hint: "Format: 04XXXXXXXX", code: "BE" },
  Suisse: { prefix: "+41", hint: "Format: 07XXXXXXXX", code: "CH" },
  Canada: { prefix: "+1", hint: "Format: XXXXXXXXXX (10 chiffres)", code: "CA" },
  Sénégal: { prefix: "+221", hint: "Format: 7XXXXXXXX", code: "SN" },
  "Côte d'Ivoire": { prefix: "+225", hint: "Format: 7XXXXXXXX", code: "CI" },
  Tunisie: { prefix: "+216", hint: "Format: 2XXXXXXX, 5XXXXXXX ou 9XXXXXXX", code: "TN" },
  Algérie: { prefix: "+213", hint: "Format: 05XXXXXXXX, 06XXXXXXXX ou 07XXXXXXXX", code: "DZ" },
  Cameroun: { prefix: "+237", hint: "Format: 6XXXXXXXX, 7XXXXXXXX, 8XXXXXXXX ou 9XXXXXXXX", code: "CM" },
  Madagascar: { prefix: "+261", hint: "Format: 03XXXXXXXX", code: "MG" },
  Mali: { prefix: "+223", hint: "Format: 6XXXXXXX ou 7XXXXXXX", code: "ML" },
  Niger: { prefix: "+227", hint: "Format: 8XXXXXXX ou 9XXXXXXX", code: "NE" },
  "Burkina Faso": { prefix: "+226", hint: "Format: 6XXXXXXX ou 7XXXXXXX", code: "BF" },
  Guinée: { prefix: "+224", hint: "Format: 6XXXXXXXX", code: "GN" },
  Bénin: { prefix: "+229", hint: "Format: 5XXXXXXX, 6XXXXXXX ou 9XXXXXXX", code: "BJ" },
  Togo: { prefix: "+228", hint: "Format: 7XXXXXXX ou 9XXXXXXX", code: "TG" },
  Gabon: { prefix: "+241", hint: "Format: 6XXXXXXX ou 7XXXXXXX", code: "GA" },
  Congo: { prefix: "+242", hint: "Format: 5XXXXXXXX ou 6XXXXXXXX", code: "CG" },
  "Rép. Dém. du Congo": { prefix: "+243", hint: "Format: 8XXXXXXXX ou 9XXXXXXXX", code: "CD" },
}

interface PhoneInputWithFlagProps {
  country: string
}

export default function PhoneInputWithFlag({ country }: PhoneInputWithFlagProps) {
  const countryInfo = countryPrefixes[country] || {
    prefix: "",
    hint: "Format international",
    code: "",
  }

  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 bg-gray-100 rounded-l-lg h-12",
      )}
    >
      {countryInfo.code && (
        <CountryFlag countryCode={countryInfo.code} svg className="mr-2 h-4 w-4" />
      )}
      <span className="text-sm font-medium text-gray-800">{countryInfo.prefix}</span>
    </div>
  )
}