import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { clearUserRateLimitCache } from '../../utils/rateLimit'
import toast from 'react-hot-toast'

import { User, LogOut, ShieldCheck } from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, profile, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const getPlanName = (type?: number | string) => {
    if (Number(type) === 1) return 'Plan Premium (Activo)';
    return 'Plan Estudiante';
  };

  const handleSignOut = async () => {
    await signOut();
    clearUserRateLimitCache();
    toast.success("Sesión cerrada exitosamente");
    if (onClose) onClose();
  };

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
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <ShieldCheck size={13} />
            Activo
          </span>
        </div>
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
