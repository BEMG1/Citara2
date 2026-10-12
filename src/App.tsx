import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Login } from "@/components/Auth/Login";
import { Register } from "@/components/Auth/Register";
import AppProviders from "@/context/AppContext";
import Header from "@/components/Layout/Header";
import DocumentEditor from "@/components/DocumentEditor/DocumentEditor";
import DocumentTitle from "@/components/DocumentEditor/DocumentTitle";
import ReferencesManager from "@/components/References/ReferencesManager";
import ExportWarningModal from "@/components/DocumentEditor/ExportWarningModal";
import CoverPageForm from "@/components/CoverPage/CoverPageForm";
import { BookOpen, FileImage } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SupportWidget } from "@/components/Support/SupportWidget";
import { useLanguage } from "@/context/AppContext";
import { useCoverPage } from "@/context/AppContext";


// ─── Right panel with tabs ─────────────────────────────────────────────────────

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageSettings from "@/components/Settings/PageSettings";
import { Settings, ImageIcon } from "lucide-react";
import FigurePropertiesPanel from "@/components/Figures/FigurePropertiesPanel";
import { useFigures } from "@/context/AppContext";

function RightPanel() {
  const { coverPage } = useCoverPage();
  const { figures } = useFigures();
  const { t } = useLanguage();

  return (
    <div
      className="rounded-2xl flex-1 flex flex-col min-h-0 shadow-2xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <Tabs defaultValue="cover" className="flex-1 flex flex-col min-h-0">
        {/* Tab bar */}
        <div
          className="flex px-4 pt-3 pb-2 gap-1"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <TabsList className="bg-transparent p-0 h-auto gap-1">
            <TabsTrigger
              value="cover"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 data-[state=active]:bg-blue-600/15 data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-500/30 data-[state=active]:shadow-none cursor-pointer"
            >
              <FileImage className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t("coverPageTab")}
              {coverPage.enabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              )}
            </TabsTrigger>

            <TabsTrigger
              value="references"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 data-[state=active]:bg-blue-600/15 data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-500/30 data-[state=active]:shadow-none cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t("referencesHeading") || "Referencias"}
            </TabsTrigger>

            {figures.length > 0 && (
              <TabsTrigger
                value="figures"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 data-[state=active]:bg-blue-600/15 data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-500/30 data-[state=active]:shadow-none cursor-pointer"
              >
                <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {t("figuresTab") || "Figuras"}
              </TabsTrigger>
            )}
            
            <TabsTrigger
              value="settings"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 data-[state=active]:bg-blue-600/15 data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-500/30 data-[state=active]:shadow-none cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t("titleSettingsTab") || "Ajustes"}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 min-h-0">
          <TabsContent value="cover" className="m-0 h-full anim-fade-in outline-none">
            <CoverPageForm />
          </TabsContent>
          <TabsContent value="references" className="m-0 h-full anim-fade-in outline-none">
            <ReferencesManager />
          </TabsContent>
          <TabsContent value="settings" className="m-0 h-full anim-fade-in outline-none">
            <PageSettings />
          </TabsContent>
          {figures.length > 0 && (
            <TabsContent value="figures" className="m-0 h-full anim-fade-in outline-none">
              <FigurePropertiesPanel />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}

import { Toaster } from "react-hot-toast";

// ─── App content ───────────────────────────────────────────────────────────────

function AppContent() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--surface-2)',
            color: 'var(--text)',
            border: '1px solid var(--border)'
          }
        }} 
      />
      <ExportWarningModal />
      <Header />
      <SupportWidget />

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row gap-5 min-h-0 h-[calc(100vh-4.25rem)]">
        {/* Left column — Main Editor */}
        <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col min-h-0 h-full">
          <div
            className="p-5 rounded-2xl flex-1 flex flex-col min-h-0 shadow-2xl overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <DocumentTitle />
            <DocumentEditor />
          </div>
        </div>

        {/* Right column — Tabbed panel (Portada | Referencias | Ajustes) */}
        <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col anim-fade-in anim-delay-1 min-h-0 h-full">
          <RightPanel />
        </div>
      </main>
    </div>
  );
}

// ─── Auth Guard ────────────────────────────────────────────────────────────────

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [view, setView] = useState<'login' | 'register'>('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Obligatorio: para ingresar al editor hay que estar autenticado
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0B0F19] text-slate-100 relative selection:bg-blue-600 selection:text-white">
        {/* Halo decorativo sutil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Identidad de Marca */}
        <div className="flex flex-col items-center mb-6 relative z-10">
          <img
            src={`${import.meta.env.BASE_URL}images/LogoSF.png`}
            alt="Citara"
            className="h-12 w-12 rounded-xl shadow-xl shadow-blue-900/30 mb-3 object-contain"
          />
          <h1
            className="text-3xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--brand-font, "Georgia", serif)' }}
          >
            Citara
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma inteligente de normalización y citación APA 7.ª
          </p>
        </div>

        {/* Tarjeta de Autenticación */}
        <div className="w-full max-w-[420px] p-7 rounded-2xl bg-[#131A2B] border border-[#1E2A47] shadow-2xl relative z-10">
          {view === 'login' ? <Login /> : <Register />}

          {/* Selector de alternancia entre Iniciar Sesión y Registro */}
          <div className="mt-6 pt-5 border-t border-[#1E2A47] text-center text-xs text-slate-400">
            {view === 'login' ? (
              <p>
                ¿No tienes una cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors ml-1 cursor-pointer"
                >
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes una cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors ml-1 cursor-pointer"
                >
                  Inicia sesión aquí
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ─── Root ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <AppProviders>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--surface-2)',
            color: 'var(--text)',
            border: '1px solid var(--border)'
          }
        }} 
      />
      <TooltipProvider delayDuration={300}>
        <AuthGuard>
          <AppContent />
        </AuthGuard>
      </TooltipProvider>
    </AppProviders>
  );
}

export default App;
