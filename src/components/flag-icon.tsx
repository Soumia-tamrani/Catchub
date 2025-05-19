interface FlagIconProps {
  countryCode: string
  className?: string
}

const flagUrls: Record<string, string> = {
  MA: "https://flagcdn.com/ma.svg",
  FR: "https://flagcdn.com/fr.svg",
  BE: "https://flagcdn.com/be.svg",
  CH: "https://flagcdn.com/ch.svg",
  CA: "https://flagcdn.com/ca.svg",
  SN: "https://flagcdn.com/sn.svg",
  CI: "https://flagcdn.com/ci.svg",
  TN: "https://flagcdn.com/tn.svg",
  DZ: "https://flagcdn.com/dz.svg",
  CM: "https://flagcdn.com/cm.svg",
  MG: "https://flagcdn.com/mg.svg",
  ML: "https://flagcdn.com/ml.svg",
  NE: "https://flagcdn.com/ne.svg",
  BF: "https://flagcdn.com/bf.svg",
  GN: "https://flagcdn.com/gn.svg",
  BJ: "https://flagcdn.com/bj.svg",
  TG: "https://flagcdn.com/tg.svg",
  GA: "https://flagcdn.com/ga.svg",
  CG: "https://flagcdn.com/cg.svg",
  CD: "https://flagcdn.com/cd.svg",
}

export default function FlagIcon({ countryCode, className = "" }: FlagIconProps) {
  const flagUrl = flagUrls[countryCode] || "https://flagcdn.com/xx.svg"

  return (
    <div className={`flag-icon ${className}`}>
      <img
        src={flagUrl || "/placeholder.svg"}
        alt={`Drapeau ${countryCode}`}
        className="w-full h-full object-cover rounded-sm shadow-sm"
        loading="lazy"
      />
    </div>
  )
}
