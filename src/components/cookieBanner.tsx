'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import CookieModal from './cookieModal'; // Assure-toi que le chemin est correct

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent || (consent !== 'accepted' && consent !== 'refused')) {
      setShowBanner(true);
      setTimeout(() => setVisible(true), 100);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie_consent', 'accepted', { expires: 365, sameSite: 'Lax' });
    Cookies.set('cookie_preferences', JSON.stringify({
      functional: true,
      statistics: true,
      marketing: true,
    }), { expires: 365, sameSite: 'Lax' });
    closeBanner();
  };

  const refuseCookies = () => {
    Cookies.set('cookie_consent', 'refused', { expires: 365, sameSite: 'Lax' });
    Cookies.set('cookie_preferences', JSON.stringify({
      functional: true,
      statistics: false,
      marketing: false,
    }), { expires: 365, sameSite: 'Lax' });
    closeBanner();
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const handlePreferencesSaved = () => {
    setShowPreferences(false);
    closeBanner();
  };

  const closeBanner = () => {
    setVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <>
      {showPreferences && <CookieModal onClose={handlePreferencesSaved} />}

      <div
        className={`fixed bottom-0 w-full z-50 transition-all duration-500 transform ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-indigo-900 text-white p-6 shadow-xl border-t-2 border-indigo-400">
          <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">🍪 Gestion des cookies</h3>
              <p className="text-sm text-indigo-100">
                Nous utilisons des cookies pour améliorer votre expérience, mesurer l'audience 
                et proposer des contenus personnalisés.{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="underline text-indigo-200 hover:text-white transition-colors"
                >
                  En savoir plus
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={refuseCookies}
                className="bg-transparent hover:bg-indigo-800 text-indigo-200 hover:text-white px-4 py-2 rounded-md border border-indigo-400 transition-colors duration-300 text-sm font-medium"
              >
                Tout refuser
              </button>
              <button
                onClick={openPreferences}
                className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300 text-sm font-medium"
              >
                Paramétrer
              </button>
              <button
                onClick={acceptCookies}
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300 text-sm font-medium"
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}