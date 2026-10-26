import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Cookie, 
  DatabaseBackup, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { LegalModal } from '../Legal/LegalModal';
import type { LegalModalTab } from '../Legal/LegalModal';
import { SimulatedPSEGateway } from '../Auth/SimulatedPSEGateway';

interface FooterProps {
  onOpenPricing?: () => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPricing, className = '' }) => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedLegalTab, setSelectedLegalTab] = useState<LegalModalTab>('costs');
  const [showPSEModal, setShowPSEModal] = useState(false);

  const openLegal = (tab: LegalModalTab) => {
    setSelectedLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleOpenPricing = () => {
    if (onOpenPricing) {
      onOpenPricing();
    } else {
      setShowPSEModal(true);
    }
  };

  return (
    <>
      <footer 
        className={`w-full border-t border-[#1E2A47] bg-[#0A0E1A]/95 text-slate-300 text-xs backdrop-blur-md transition-colors ${className}`}
        style={{ borderTopColor: 'var(--border)' }}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Columna 1: Marca y Propósito */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span 
                  className="text-base font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--brand-font, "Georgia", serif)' }}
                >
                  Citara
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  APA 7.ª Ed.
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Plataforma académica integral para redacción, normalización, citas bibliográficas y verificación de documentos según directrices de APA 7.ª edición.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sistema Operativo y Pasarela Activa</span>
              </div>
            </div>

            {/* Columna 2: Planes, Costos y Pagos */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard size={14} className="text-blue-400" />
                Costos y Afiliaciones
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button 
                    onClick={() => openLegal('costs')} 
                    className="hover:text-blue-400 transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>Estructura de Tarifas y Cobros</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleOpenPricing} 
                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={12} />
                    <span>Plan Premium (PSE) — $10.000 COP</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal('costs')} 
                    className="hover:text-blue-400 transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>Condiciones de Afiliación y Pagos</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna 3: Políticas Legales y Protección de Datos */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue-400" />
                Políticas y Normativa
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button 
                    onClick={() => openLegal('privacy')} 
                    className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    Aviso de Privacidad
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal('data-treatment')} 
                    className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    Tratamiento de Datos Personales (Ley 1581)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal('backup')} 
                    className="hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <DatabaseBackup size={12} />
                    <span>Política de Respaldo y Continuidad</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal('cookies')} 
                    className="hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Cookie size={12} />
                    <span>Política de Cookies</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contacto y Ubicación */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Mail size={14} className="text-blue-400" />
                Canales de Contacto
              </h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-slate-500 shrink-0" />
                  <a href="mailto:contacto@citara.app" className="hover:text-blue-400 transition-colors">
                    contacto@citara.app
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-slate-500 shrink-0" />
                  <span>+57 (601) 456-7890</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="text-slate-500 shrink-0 mt-0.5" />
                  <span>Cra. 7 # 71 - 21, Bogotá D.C., Colombia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Barra inferior: Derechos de Autor y Créditos */}
          <div className="pt-4 border-t border-[#1E2A47] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <p>
                © {new Date().getFullYear()} Citara Technologies. Todos los derechos reservados.
              </p>
              <span className="hidden sm:inline text-slate-600">•</span>
              <button
                onClick={() => openLegal('contact')}
                className="hover:text-blue-400 transition-colors underline cursor-pointer"
              >
                Créditos institucionales
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => openLegal('costs')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Costos
              </button>
              <button
                onClick={() => openLegal('privacy')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Privacidad
              </button>
              <button
                onClick={() => openLegal('data-treatment')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Habeas Data
              </button>
              <button
                onClick={() => openLegal('cookies')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Legal Central */}
      <LegalModal 
        isOpen={legalModalOpen} 
        onClose={() => setLegalModalOpen(false)} 
        defaultTab={selectedLegalTab}
        onOpenPricing={handleOpenPricing}
      />

      {/* Modal de Pago PSE Simulado (Punto 4 + 3) */}
      {showPSEModal && (
        <SimulatedPSEGateway
          onClose={() => setShowPSEModal(false)}
          onSuccess={() => setShowPSEModal(false)}
        />
      )}
    </>
  );
};
