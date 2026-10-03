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
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /* --- LÓGICA ORIGINAL SUPABASE ---
    // Restaurar sesión al inicio
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Escuchar cambios de estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
    ----------------------------------- */
    
    // MOCK: Omitimos la consulta a la BD (Supabase) y cargamos instantáneamente
    setLoading(false)
  }, [])

  const fetchProfile = async (userId: string) => {
    /* --- LÓGICA ORIGINAL SUPABASE ---
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error al obtener el perfil de usuario:', error)
      } else if (data) {
        setProfile({
          id: data.id,
          email: data.email,
          userType: data.user_type,
          lastGeneration: data.last_generation
        })
      }
    } catch (err) {
      console.error('Error de red al obtener perfil:', err)
    } finally {
      setLoading(false)
    }
    ----------------------------------- */
  }

  const signUp = async (email: string, password: string, userType: number) => {
    /* --- LÓGICA ORIGINAL SUPABASE ---
    // Fase 1: Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return { error }

    // Fase 2: Insertar en la tabla users
    if (data.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          { id: data.user.id, email: email, user_type: userType }
        ])

      if (insertError) {
        return { error: insertError }
      }
    }

    return { error: null }
    ----------------------------------- */

    // MOCK: Simular registro exitoso
    return { error: null }
  }

  const signIn = async (email: string, password: string) => {
    /* --- LÓGICA ORIGINAL SUPABASE ---
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
    ----------------------------------- */

    // MOCK: Quemamos un usuario exitoso sin consultar la BD
    const mockUser = {
      id: 'mock-user-123',
      email: email,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User

    setUser(mockUser)
    setProfile({
      id: 'mock-user-123',
      email: email,
      userType: 1, // Premium por defecto
      lastGeneration: null
    })
    setSession({
      access_token: 'mock-token',
      refresh_token: 'mock-token',
      expires_in: 3600,
      token_type: 'bearer',
      user: mockUser
    })
    
    return { error: null }
  }

  const signOut = async () => {
    /* --- LÓGICA ORIGINAL SUPABASE ---
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setProfile(null)
      setSession(null)
    }
    return { error }
    ----------------------------------- */

    // MOCK
    setUser(null)
    setProfile(null)
    setSession(null)
    return { error: null }
  }

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
