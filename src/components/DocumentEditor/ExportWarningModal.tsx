import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';
import { useExportWord, useLanguage, useExportPDF } from '@/context/AppContext';

const ExportWarningModal: React.FC = () => {
  const { showExportWarning, setShowExportWarning, handleExportAnyway } = useExportWord();
  const { showExportPdfWarning, setShowExportPdfWarning, handleExportPdfAnyway } = useExportPDF();
  const { t } = useLanguage();

  if (!showExportWarning && !showExportPdfWarning) return null;

  const handleCancel = () => {
    if (showExportWarning) setShowExportWarning(false);
    if (showExportPdfWarning) setShowExportPdfWarning(false);
  };

  const handleConfirm = () => {
    if (showExportWarning) handleExportAnyway();
    if (showExportPdfWarning) handleExportPdfAnyway();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="rounded-2xl shadow-2xl p-6 max-w-md w-full anim-scale-in"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-start space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text)' }}>
              {t('warningTitle')}
            </h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {t('warningMessage')}
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button onClick={handleCancel} className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#1F2B48] bg-[#162035] hover:bg-[#1C2843] text-slate-200 transition-colors cursor-pointer">
            {t('cancel')}
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer">
            {t('exportAnyway')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ExportWarningModal;
