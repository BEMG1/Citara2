import React from 'react';
import { useLanguage } from '@/context/AppContext';

export const HeaderBrand: React.FC = () => {
  const { t } = useLanguage();  

  return (
    <div className="flex items-center gap-2.5">
      {/* Logo */}
      <img
        src={"images/Logo.png"}
        alt="Citara"
        className="shrink-0 select-none object-contain"
        style={{
          height: 28,
          borderRadius: 6,
        }}
      />

      {/* App name */}
      <span
        style={{
          fontFamily: 'var(--brand-font)',
          fontSize: 19,
          letterSpacing: '-.01em',
          color: 'var(--text)',
        }}
      >
        {t('appTitle')}
      </span>
    </div>
  );
};
