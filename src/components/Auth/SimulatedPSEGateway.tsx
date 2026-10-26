import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import { clearUserRateLimitCache } from '../../utils/rateLimit';
import toast from 'react-hot-toast';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Lock, 
  RefreshCw,
  AlertCircle,
  X
} from 'lucide-react';

interface SimulatedPSEGatewayProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const COLOMBIAN_BANKS = [
  { id: 'bancolombia', name: 'Bancolombia', color: '#FDDA24', textColor: '#000000', tag: 'Popular' },
  { id: 'nequi', name: 'Nequi', color: '#200020', textColor: '#FFFFFF', tag: 'Rápido' },
  { id: 'davivienda', name: 'Davivienda', color: '#ED1C24', textColor: '#FFFFFF' },
  { id: 'bbva', name: 'BBVA Colombia', color: '#004481', textColor: '#FFFFFF' },
  { id: 'banco_bogota', name: 'Banco de Bogotá', color: '#002D72', textColor: '#FFFFFF' },
  { id: 'daviplata', name: 'Daviplata', color: '#E4002B', textColor: '#FFFFFF' },
  { id: 'scotiabank', name: 'Scotiabank Colpatria', color: '#C41230', textColor: '#FFFFFF' },
  { id: 'bancamia', name: 'Bancamía', color: '#00833E', textColor: '#FFFFFF' },
  { id: 'itau', name: 'Itaú Colombia', color: '#EC7000', textColor: '#FFFFFF' },
  { id: 'nu', name: 'Nu Colombia', color: '#820AD1', textColor: '#FFFFFF' },
];

export const SimulatedPSEGateway: React.FC<SimulatedPSEGatewayProps> = ({ onClose, onSuccess }) => {
  const { user, updateUserType } = useAuth();

  // Pasos: 
  // 1 = Datos del Pagador y Banco (PSE Selector)
  // 2 = Portal Bancario Simulado (Login/Aprobación)
  // 3 = Procesando transacción
  // 4 = Comprobante Exitoso
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Datos del formulario
  const [personType, setPersonType] = useState<'NATURAL' | 'JURIDICA'>('NATURAL');
  const [docType, setDocType] = useState('CC');
  const [docNumber, setDocNumber] = useState('1098765432');
  const [fullName, setFullName] = useState('Juan Pérez');
  const [pseEmail, setPseEmail] = useState(user?.email || 'usuario@ejemplo.com');
  const [selectedBankId, setSelectedBankId] = useState('bancolombia');

  // Datos simulados del banco
  const [bankUsername, setBankUsername] = useState(user?.email?.split('@')[0] || 'juanperez');
  const [bankPassword, setBankPassword] = useState('••••••••');
  const [transactionCode] = useState(() => `PSE-${Math.floor(100000000 + Math.random() * 900000000)}`);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedBank = COLOMBIAN_BANKS.find(b => b.id === selectedBankId) || COLOMBIAN_BANKS[0];
  const PLAN_PRICE = 'COP $10.000';

  const handleProceedToBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim() || !fullName.trim() || !pseEmail.trim()) {
      setErrorMsg('Por favor completa todos los campos requeridos');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleAuthorizePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);

    // Simular tiempo de validación bancaria y débito
    setTimeout(async () => {
      try {
        const { error } = await updateUserType(1);
        if (error) {
          console.warn('Aviso al actualizar tipo:', error.message);
        }
        clearUserRateLimitCache();
        setStep(4);
        toast.success('¡Pago PSE aprobado! Ya tienes Plan Premium activo.');
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error(err);
        setErrorMsg('Ocurrió un error simulando la aprobación.');
        setStep(2);
      }
    }, 2400);
  };

  const content = (
    <div className="w-full text-slate-200">
      {/* Header Modal */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E2A47]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs tracking-wider">
            PSE
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              Pasarela de Pagos Segura
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
                Simulación
              </span>
            </h2>
            <p className="text-xs text-slate-400">Activación de Citara Plan Premium</p>
          </div>
        </div>

        {/* Indicador de pasos */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
          <div className="w-3 h-0.5 bg-slate-700"></div>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 2 || step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
          <div className="w-3 h-0.5 bg-slate-700"></div>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
        </div>
      </div>

      {/* Resumen del Monto */}
      {step !== 4 && (
        <div className="mb-4 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-400" size={18} />
            <div>
              <p className="text-xs font-semibold text-white">Suscripción Citara Premium</p>
              <p className="text-[11px] text-slate-400">Generaciones y descargas ilimitadas</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-emerald-400">{PLAN_PRICE}</span>
            <span className="text-[10px] text-slate-400 block">Pago único / Mes</span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs text-red-400">
          <AlertCircle size={15} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* PASO 1: Formulario PSE y Selección de Banco */}
      {step === 1 && (
        <form onSubmit={handleProceedToBank} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Tipo de Persona
              </label>
              <select
                value={personType}
                onChange={(e) => setPersonType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="NATURAL">Persona Natural</option>
                <option value="JURIDICA">Persona Jurídica</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Documento
              </label>
              <div className="flex gap-1.5">
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-20 px-2 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="NIT">NIT</option>
                  <option value="PP">Pasaporte</option>
                </select>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="Número doc"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Nombre Completo / Razón Social
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
              placeholder="Ej: Laura Gómez"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Email registrado en PSE
            </label>
            <input
              type="email"
              required
              value={pseEmail}
              onChange={(e) => setPseEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Selecciona tu Entidad Financiera (Banco)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              {COLOMBIAN_BANKS.map((bank) => {
                const isSelected = selectedBankId === bank.id;
                return (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBankId(bank.id)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white font-semibold ring-1 ring-blue-500'
                        : 'bg-[#0B0F19] border-[#1E2A47] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Building2 size={14} className={isSelected ? 'text-blue-400' : 'text-slate-500'} />
                      <span className="truncate">{bank.name}</span>
                    </div>
                    {bank.tag && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 ml-1 shrink-0">
                        {bank.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-2/3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              Ir al Banco
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      )}

      {/* PASO 2: Portal Bancario Simulado */}
      {step === 2 && (
        <form onSubmit={handleAuthorizePayment} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs shadow"
                  style={{ backgroundColor: selectedBank.color, color: selectedBank.textColor }}
                >
                  {selectedBank.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedBank.name}</h3>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Lock size={10} className="text-emerald-400" /> Conexión Cifrada SSL
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-400">{PLAN_PRICE}</span>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Estás en la sucursal virtual simulada de <span className="font-semibold text-white">{selectedBank.name}</span>. Ingresa tus credenciales de prueba para autorizar el débito.
            </p>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Usuario / Identificación en el Banco
                </label>
                <input
                  type="text"
                  required
                  value={bankUsername}
                  onChange={(e) => setBankUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Clave de Internet / Token
                </label>
                <input
                  type="password"
                  required
                  value={bankPassword}
                  onChange={(e) => setBankPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2A47] text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} />
              Atrás
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <CreditCard size={14} />
              Aprobar y Pagar {PLAN_PRICE}
            </button>
          </div>
        </form>
      )}

      {/* PASO 3: Pantalla de Procesamiento */}
      {step === 3 && (
        <div className="py-8 text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
            <RefreshCw className="text-blue-400 animate-pulse" size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">Procesando Transacción Bancaria</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Comunicando con <span className="text-slate-200 font-semibold">{selectedBank.name}</span> y validando fondos...
            </p>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-emerald-400" /> Simulación segura en entorno de pruebas
          </div>
        </div>
      )}

      {/* PASO 4: Comprobante Exitoso */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center mb-2.5">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-base font-bold text-emerald-300">¡Transacción Exitosa!</h3>
            <p className="text-xs text-slate-300 mt-1">
              Tu cuenta ha sido actualizada al <span className="font-bold text-white">Plan Premium</span>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2A47] text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Referencia PSE:</span>
              <span className="font-mono text-slate-200 font-semibold">{transactionCode}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Banco:</span>
              <span className="text-slate-200">{selectedBank.name}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Titular:</span>
              <span className="text-slate-200">{fullName}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Valor Débito:</span>
              <span className="text-emerald-400 font-bold">{PLAN_PRICE}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estado:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Aprobada
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
          >
            Comenzar a disfrutar Premium
          </button>
        </div>
      )}
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 rounded-2xl shadow-2xl bg-[#11192E] border border-[#1E2A47] text-white scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-10"
          title="Cerrar pasarela"
        >
          <X size={18} />
        </button>
        {content}
      </div>
    </div>,
    document.body
  );
};
