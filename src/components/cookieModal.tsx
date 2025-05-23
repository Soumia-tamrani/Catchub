'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';

export default function CookieModal({ onClose }: { onClose: () => void }) {
  const [preferences, setPreferences] = useState({
    functional: true,
    statistics: false,
    marketing: false,
  });

  const handleCheckboxChange = (category: string) => {
    setPreferences(prev => ({ ...prev, [category]: !prev[category as keyof typeof prev] }));
  };

  const handleSavePreferences = () => {
    Cookies.set('cookie_preferences', JSON.stringify(preferences), { expires: 365, sameSite: 'Lax' });
    Cookies.set('cookie_consent', 'accepted', { expires: 365, sameSite: 'Lax' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Paramétrer mes choix</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.functional}
              disabled
              className="accent-indigo-600"
            />
            <span className="text-gray-700">Cookies fonctionnels (obligatoires)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.statistics}
              onChange={() => handleCheckboxChange('statistics')}
              className="accent-indigo-600"
            />
            <span className="text-gray-700">Cookies statistiques</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => handleCheckboxChange('marketing')}
              className="accent-indigo-600"
            />
            <span className="text-gray-700">Cookies marketing</span>
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={handleSavePreferences}
            className="text-sm px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}