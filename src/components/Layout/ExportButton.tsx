import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useExportWord, useDocument, useLanguage, useExportPDF } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { checkRateLimit, updateRateLimit } from '@/utils/rateLimit';
import toast from 'react-hot-toast';
import { ExportModal } from './ExportModal';

export const ExportButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleExportClick } = useExportWord();
  const { handleExportPdfClick, isExportingPdf } = useExportPDF();
  const { haveText } = useDocument();
  const { t } = useLanguage();
  const { user, profile } = useAuth();

  const handleOpenExport = async () => {    
    const { allowed, remainingMinutes } = await checkRateLimit(user?.id, profile?.userType);
    
    if (!allowed) {
      if (!user) {
        toast.error(`Actualmente no estas logueado, y deberas esperar ${remainingMinutes} minutos, si quieres disminuir el tiempo incia sesión o crea una cuenta`, { duration: 5000 });
      } else {
        toast.error(`Actualmente no puede generar debido al límite de la capa gratuita. Espera ${remainingMinutes} minutos.`, { duration: 5000 });
      }
      return;
    }
    
    setIsModalOpen(true);
  };

  const handleDocxExport = async () => {
    try {
      await handleExportClick();
      updateRateLimit(user?.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePdfExport = async () => {
    try {
      await handleExportPdfClick();
      updateRateLimit(user?.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenExport}
        disabled={!haveText || isExportingPdf}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#1F2B48] bg-[#162035] hover:bg-[#1C2843] text-slate-200 disabled:opacity-40 disabled:hover:bg-[#162035] disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
      >
        <Download size={13} strokeWidth={1.8} className="text-slate-400" />
        {isExportingPdf ? t('loading') : t('exportBtn')}
      </button>

      <ExportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExportDocx={handleDocxExport}
        onExportPdf={handlePdfExport}
      />
    </>
  );
};
