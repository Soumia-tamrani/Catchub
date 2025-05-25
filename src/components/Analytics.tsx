'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Script from 'next/script'

export default function Analytics() {
  const [consent, setConsent] = useState<'accepted' | 'refused' | undefined>()

  useEffect(() => {
    const value = Cookies.get('cookie_consent')
    console.log('Consentement GA :', value)
    if (value === 'accepted') {
      setConsent('accepted')
    } else {
      setConsent('refused')
    }
  }, [])

  if (consent !== 'accepted') return null

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-G9C0EBCGE9"
        strategy="afterInteractive"
      />
      <Script
        id="ga-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-67W13QYTQK', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}