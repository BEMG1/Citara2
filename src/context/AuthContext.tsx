import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../services/supabase/client'

export interface UserProfile {
  id: string
  email: string
  userType: number // 0 = Gratuito, 1 = Premium
  lastGeneration: string | null
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userType: number) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, emailFallback?: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Perfil en tabla users:', error.message);
        // Fallback si el usuario no tiene fila en la tabla users todavía
        setProfile({
          id: userId,
          email: emailFallback || '',
          userType: 0,
          lastGeneration: null,
        });
      } else if (data) {
        setProfile({
          id: data.id,
          email: data.email,
          userType: Number(data.user_type) || data.plan_type || 0,
          lastGeneration: data.last_generation,
        });
      }
    } catch (err) {
      console.error('Error al obtener perfil:', err);
      setProfile({
        id: userId,
        email: emailFallback || '',
        userType: 0,
        lastGeneration: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Restaurar sesión existente al cargar la aplicación
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error('Error al restaurar sesión inicial:', err);
      setLoading(false);
    });

    // 2. Escuchar cambios de estado de autenticación (Login, Logout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.email);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userType: number = 0) => {
    try {
      // Fase 1: Registrar en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) return { error };

      // Fase 2: Insertar fila en tabla pública users (si no se maneja por triggers de Postgres)
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            { id: data.user.id, email: email, user_type: userType }
          ]);

        if (insertError) {
          console.warn('Nota sobre inserción en tabla users:', insertError.message);
        }
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user.id, data.user.email);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        setProfile(null);
        setSession(null);
      }
      return { error };
    } catch (err: any) {
      setUser(null);
      setProfile(null);
      setSession(null);
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
