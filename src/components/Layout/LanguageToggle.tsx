import React from 'react';
import { useLanguage } from '@/context/AppContext';
import { Languages } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={toggleLanguage} className="h-8 px-2.5 rounded-lg border border-[#1F2B48] bg-[#162035] hover:bg-[#1C2843] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-xs font-semibold" aria-label={t('languageToggle')}>
          <Languages size={13} strokeWidth={1.8} className="text-slate-400" />
          <span style={{ fontFamily: 'var(--mono-font)', fontSize: 11, fontWeight: 600 }}>{language.toUpperCase()}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('languageToggle')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
