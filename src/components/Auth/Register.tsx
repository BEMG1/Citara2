import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterProps {
  onClose?: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const finalEmail = email.trim();
    if (!finalEmail) {
      setError('Por favor ingresa tu correo electrónico.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    const { error: signUpError } = await signUp(finalEmail, password, 0);
    
    if (signUpError) {
      setError(signUpError.message || 'Error al registrar el usuario.');
    } else {
      toast.success('¡Registro exitoso! Por favor verifica tu correo o inicia sesión.');
      if (onClose) onClose();
    }
    setLoading(false);
  };

  const isEmailActive = isEmailFocused || email.length > 0;
  const isPasswordActive = isPasswordFocused || password.length > 0;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Crear Cuenta</h2>
        <p className="text-xs text-slate-400 mt-1">
          Regístrate para comenzar a usar Citara
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl mb-4 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Campo Correo con Floating Label */}
        <div className="relative">
          <input 
            id="register-email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            required
            className="w-full h-[52px] rounded-xl px-3.5 pt-5 pb-1 text-sm outline-none transition-all bg-[#0B0F19] border border-[#1E2A47] text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
          <label 
            htmlFor="register-email"
            className={`absolute left-3.5 transition-all duration-200 pointer-events-none select-none ${
              isEmailActive
                ? 'top-1.5 text-[10px] font-bold uppercase tracking-wider ' + (isEmailFocused ? 'text-blue-400' : 'text-slate-400')
                : 'top-3.5 text-sm text-slate-400 font-normal'
            }`}
          >
            Correo electrónico
          </label>
        </div>

        {/* Campo Contraseña con Floating Label */}
        <div className="relative">
          <input 
            id="register-password"
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            required
            minLength={6}
            className="w-full h-[52px] rounded-xl px-3.5 pr-10 pt-5 pb-1 text-sm outline-none transition-all bg-[#0B0F19] border border-[#1E2A47] text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <label 
            htmlFor="register-password"
            className={`absolute left-3.5 transition-all duration-200 pointer-events-none select-none ${
              isPasswordActive
                ? 'top-1.5 text-[10px] font-bold uppercase tracking-wider ' + (isPasswordFocused ? 'text-blue-400' : 'text-slate-400')
                : 'top-3.5 text-sm text-slate-400 font-normal'
            }`}
          >
            Contraseña
          </label>
          {password.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Crear Cuenta y Entrar'}
        </button>
      </form>
    </div>
  );
};
