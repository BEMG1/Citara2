import React from 'react';
import { createPortal } from 'react-dom';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { ExportButton } from './ExportButton';
import { HeaderBrand } from './HeaderBrand';
import { useDocument } from '@/context/DocumentContext';
import { useCitationFormat } from '@/context/AppContext';
import { FORMAT_CONFIGS } from '@/utils/citationFormats';
import { useAuth } from '@/context/AuthContext';
import { Login } from '../Auth/Login';
import { Register } from '../Auth/Register';
import { UserProfile } from '../Auth/UserProfile';

const Header: React.FC = () => {
  const { haveText, complianceScore, setIsComplianceModalOpen } = useDocument();
  const { citationFormat } = useCitationFormat();
  const { user } = useAuth();
  const [modalType, setModalType] = React.useState<'login' | 'register' | 'profile' | null>(null);
  
  return (
    <header className="border-b sticky top-0 z-50 backdrop-blur-md" style={{ background: 'var(--bg)', borderBottomColor: 'var(--border)' }}>
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-4 justify-between items-center">
        {/* ── Brand ── */}
        <div className="flex items-center gap-6">
          <HeaderBrand />
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center">
          {/* Herramientas */}
          <div className="flex items-center space-x-2.5">
            {(complianceScore !== null && haveText) && (
              <div 
                className="flex items-center gap-2 px-3 py-1 rounded-full shadow-sm animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: 'var(--surface-3)', border: '1px solid var(--border)' }}
                onClick={() => setIsComplianceModalOpen(true)}
                title="Ver reporte de cumplimiento"
              >
                {/* Circular Progress */}
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path 
                      strokeWidth="4.5" 
                      stroke="var(--surface-2)" 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                    <path 
                      strokeDasharray={`${complianceScore}, 100`} 
                      strokeWidth="4.5" 
                      strokeLinecap="round" 
                      stroke="var(--accent)" 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                  {complianceScore}%
                </span>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--text-3)' }}>
                  {citationFormat === 'custom' ? 'Estilo Personalizado' : (FORMAT_CONFIGS[citationFormat as keyof typeof FORMAT_CONFIGS]?.label || 'APA')}
                </span>
              </div>
            )}
            {/* <FormatSelector /> */}
            <LanguageToggle />
            <ThemeToggle />
            <ExportButton />
          </div>

          {/* Separador */}
          <div className="w-px h-5 mx-3.5" style={{ background: 'var(--border)' }} />

          {/* Opciones de Cuenta */}
          <div className="flex items-center space-x-2">
            {user ? (
              <button 
                onClick={() => setModalType('profile')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-2 border border-[#1E2A47] bg-[#162035] text-slate-200 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="truncate max-w-[120px]">{user.email?.split('@')[0] || 'Perfil'}</span>
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setModalType('login')}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setModalType('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Crear Cuenta
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modals Overlay via Portal (evita recorte por backdrop-filter) */}
      {modalType && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div 
            className="relative w-full max-w-md p-6 rounded-2xl shadow-2xl bg-[#131A2B] border border-[#1E2A47] text-white"
          >
            <button 
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              ✕
            </button>
            {modalType === 'login' && <Login onClose={() => setModalType(null)} />}
            {modalType === 'register' && <Register onClose={() => setModalType(null)} />}
            {modalType === 'profile' && <UserProfile onClose={() => setModalType(null)} />}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
