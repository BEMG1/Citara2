import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme, useLanguage } from '@/context/AppContext';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={toggleDarkMode} className="h-8 w-8 rounded-lg border border-[#1F2B48] bg-[#162035] hover:bg-[#1C2843] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
          {isDark ? <Sun size={14} strokeWidth={1.8} /> : <Moon size={14} strokeWidth={1.8} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isDark ? t('themeToggleLight') : t('themeToggleDark')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
