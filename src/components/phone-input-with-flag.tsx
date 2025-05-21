"use client"

import { cn } from "@/lib/utils"
import { updatedCountriesList } from "@/lib/form-utils"

interface PhoneInputWithFlagProps {
  country: string
  flag?: string
  prefix?: string
  className?: string
  countryCode?: string
}

// Assurez-vous que le composant ne capture pas le focus de manière inappropriée
export default function PhoneInputWithFlag({ country, flag, prefix, className }: PhoneInputWithFlagProps) {
  const countryInfo = updatedCountriesList.find((c) => c.name === country) || {
    prefix: prefix || "",
    flag: "",
    code: "",
  }

  return (
    <div
      className={cn("flex items-center px-3 h-12 bg-white border border-r-0 border-gray-200 rounded-l-lg", className)}
      // Désactiver complètement les interactions de focus
      tabIndex={-1}
      // Empêcher les événements de souris de perturber le focus
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => e.stopPropagation()}
    >
      {countryInfo.flag && (
        <div className="flex items-center">
          <img
            src={typeof countryInfo.flag === "string" ? countryInfo.flag : "/placeholder.svg"}
            alt={`${country} flag`}
            className="mr-2 h-4 w-6"
          />
          <span className="text-sm font-medium text-gray-700">{countryInfo.prefix || prefix || ""}</span>
        </div>
      )}
    </div>
  )
}
