import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { clearUserRateLimitCache } from '../../utils/rateLimit'
import toast from 'react-hot-toast'
import { SimulatedPSEGateway } from './SimulatedPSEGateway'

import { User, LogOut, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, profile, signOut } = useAuth();
  const [showPSEModal, setShowPSEModal] = useState(false);

  if (!user) {
    return null;
  }

  const isPremium = Number(profile?.userType) === 1;

  const getPlanName = (type?: number | string) => {
    if (Number(type) === 1) return 'Plan Premium (Activo)';
    return 'Plan Estudiante (Gratuito)';
  };

  const handleSignOut = async () => {
    await signOut();
    clearUserRateLimitCache();
    toast.success("Sesión cerrada exitosamente");
    if (onClose) onClose();
  };

  if (showPSEModal) {
    return (
      <SimulatedPSEGateway 
        onClose={() => setShowPSEModal(false)} 
        onSuccess={() => {
          setShowPSEModal(false);
        }} 
      />
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg shadow-inner">
          {user.email?.charAt(0).toUpperCase() || <User size={22} />}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-white tracking-tight">Perfil de Usuario</h2>
          <p className="text-xs text-slate-400 truncate max-w-[240px]">{user.email}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2A47]">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Cuenta Conectada
          </p>
          <p className="text-sm font-medium text-slate-200 truncate">
            {user.email}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E2A47] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              Nivel de Acceso
            </p>
            <p className="text-sm font-semibold text-slate-200">
              {getPlanName(profile?.userType)}
            </p>
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isPremium 
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
          }`}>
            <ShieldCheck size={13} />
            {isPremium ? 'Premium' : 'Activo'}
          </span>
        </div>

        {/* Banner de Actualización a Premium si es gratuito */}
        {!isPremium ? (
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 via-indigo-950/20 to-purple-950/30 border border-blue-500/30 relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mejora a Plan Premium</h4>
                  <p className="text-[11px] text-slate-400">Elimina límites de tiempo y descargas</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                COP $10.000
              </span>
            </div>

            <ul className="text-xs text-slate-300 space-y-1 mb-3.5 mt-2">
              <li className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400 shrink-0" />
                <span>Generaciones continuas sin tiempo de espera</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400 shrink-0" />
                <span>Formatos personalizados sin restricciones</span>
              </li>
            </ul>

            <button
              onClick={() => setShowPSEModal(true)}
              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Activar Premium</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles size={16} />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-emerald-300">¡Beneficios Premium Activos!</p>
              <p className="text-slate-400 text-[11px]">Disfrutas de uso ilimitado en todas las funciones.</p>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleSignOut}
        className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
      >
        <LogOut size={16} />
        Cerrar Sesión
      </button>
    </div>
  );
};
