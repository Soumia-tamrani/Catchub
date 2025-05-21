// "use client"

// import { useState, useEffect } from "react"
// import { AlertCircle } from "lucide-react"
// import PhoneInput, { Country } from "react-phone-number-input"
// import "react-phone-number-input/style.css"

// interface PhoneInputHelperProps {
//   value: string
//   onChange: (value: string | undefined) => void
//   onBlur: () => void
//   error?: string
//   country: string
//   isChecking: boolean
// }

// export default function PhoneInputHelper({
//   value,
//   onChange,
//   onBlur,
//   error,
//   country,
//   isChecking,
// }: PhoneInputHelperProps) {
//   const [hint, setHint] = useState("")

//   // Mettre à jour l'indice en fonction du pays sélectionné
//   useEffect(() => {
//     switch (country) {
//       case "MA":
//         setHint("Format: 06XXXXXXXX, 07XXXXXXXX ou 05XXXXXXXX")
//         break
//       case "FR":
//         setHint("Format: 06XXXXXXXX ou 07XXXXXXXX")
//         break
//       case "BE":
//         setHint("Format: 04XXXXXXXX")
//         break
//       case "CH":
//         setHint("Format: 07XXXXXXXX")
//         break
//       case "CA":
//         setHint("Format: XXXXXXXXXX (10 chiffres)")
//         break
//       case "SN":
//       case "CI":
//         setHint("Format: 7XXXXXXXX")
//         break
//       case "TN":
//         setHint("Format: 2XXXXXXX, 5XXXXXXX ou 9XXXXXXX")
//         break
//       case "DZ":
//         setHint("Format: 05XXXXXXXX, 06XXXXXXXX ou 07XXXXXXXX")
//         break
//       default:
//         setHint("Sélectionnez votre pays et entrez votre numéro")
//     }
//   }, [country])

//   return (
//     <div className="space-y-1">
//       <PhoneInput
//         international
//         defaultCountry={country ? (country as Country) : "MA"}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         className={`h-12 rounded-lg border transition-all duration-200 ${
//           error
//             ? "border-red-500"
//             : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
//         }`}
//         countrySelectProps={{
//           unicodeFlags: true,
//           className: "country-select-dropdown",
//         }}
//       />
//       {error ? (
//         <p className="text-red-500 text-xs flex items-center mt-1 animate-in fade-in">
//           <AlertCircle className="mr-1 h-4 w-4" /> {error}
//         </p>
//       ) : (
//         <p className="text-xs text-gray-500 mt-1">{hint}</p>
//       )}
//     </div>
//   )
// }
