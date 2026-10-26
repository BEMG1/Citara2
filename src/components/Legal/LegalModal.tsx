import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  DatabaseBackup, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin, 
  X, 
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SimulatedPSEGateway } from '../Auth/SimulatedPSEGateway';

export type LegalModalTab = 
  | 'costs' 
  | 'privacy' 
  | 'data-treatment' 
  | 'backup' 
  | 'cookies' 
  | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: LegalModalTab;
  onOpenPricing?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'costs',
  onOpenPricing
}) => {
  const [activeTab, setActiveTab] = useState<LegalModalTab>(defaultTab);
  const [showPSEModal, setShowPSEModal] = useState(false);

  // Sincronizar tab si cambia el prop al abrir
  React.useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  const handleStartPayment = () => {
    if (onOpenPricing) {
      onOpenPricing();
    }
    // Abrir la pasarela de pagos simulada
    setShowPSEModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-[#1E2A47] text-slate-100"
        style={{ background: '#0D1322' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2A47] bg-[#11192E]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Centro Legal, Políticas y Términos de Citara
              </h2>
              <p className="text-xs text-slate-400">
                Transparencia, cumplimiento legal (Ley 1581 de 2012) y condiciones del servicio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Cerrar ventana"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenedor Interior: Menú lateral + Contenido */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Navegación de pestañas */}
          <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#1E2A47] bg-[#0E1527] p-2 sm:p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
            <button
              onClick={() => setActiveTab('costs')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all shrink-0 md:shrink ${
                activeTab === 'costs'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <CreditCard size={16} />
              <span>Costos y Planes</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all shrink-0 md:shrink ${
                activeTab === 'privacy'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <ShieldCheck size={16} />
              <span>Aviso de Privacidad</span>
            </button>

            <button
              onClick={() => setActiveTab('data-treatment')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all shrink-0 md:shrink ${
                activeTab === 'data-treatment'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileText size={16} />
              <span>Tratamiento de Datos</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all shrink-0 md:shrink ${
                activeTab === 'backup'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <DatabaseBackup size={16} />
              <span>Política de Respaldo</span>
            </button>

            <button
              onClick={() => setActiveTab('cookies')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all shrink-0 md:shrink ${
                activeTab === 'cookies'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Cookie size={16} />
              <span>Política de Cookies</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all shrink-0 md:shrink ${
                activeTab === 'contact'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Mail size={16} />
              <span>Contacto y Créditos</span>
            </button>
          </nav>

          {/* Área de contenido scrollable */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed scrollbar-thin">
            {/* 1. COSTOS, COBROS Y AFILIACIONES */}
            {activeTab === 'costs' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#1E2A47] pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="text-blue-400" size={22} />
                    Costos, Cobros, Pagos y Afiliaciones
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Estructura transparente de precios para la plataforma Citara.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Tarjeta Plan Gratuito */}
                  <div className="p-4 rounded-xl border border-[#1E2A47] bg-[#11192E] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Plan Académico</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">Gratis</span>
                      </div>
                      <div className="text-2xl font-extrabold text-white mb-2">$0 <span className="text-xs text-slate-400 font-normal">COP / para siempre</span></div>
                      <p className="text-xs text-slate-300 mb-3">
                        Ideal para estudiantes que están realizando citas puntuales y trabajos académicos regulares.
                      </p>
                      <ul className="text-xs space-y-2 text-slate-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Editor APA 7.ª completo con portada</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Gestión de fuentes y citas</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Info size={14} className="text-amber-400 shrink-0" />
                          <span>Límite de velocidad en operaciones continuas</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Tarjeta Plan Premium */}
                  <div className="p-4 rounded-xl border border-blue-500/40 bg-gradient-to-br from-[#121B33] to-[#1a1c3d] flex flex-col justify-between relative shadow-lg shadow-blue-900/20">
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Sparkles size={11} /> Recomendado
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Plan Premium</span>
                      </div>
                      <div className="text-2xl font-extrabold text-white mb-2">$10.000 <span className="text-xs text-slate-400 font-normal">COP / único pago</span></div>
                      <p className="text-xs text-slate-300 mb-3">
                        Para investigadores y autores que requieren flujos de trabajo sin interrupciones ni esperas.
                      </p>
                      <ul className="text-xs space-y-2 text-slate-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Generaciones y descargas ilimitadas</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Sin tiempos de espera o rate-limits</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Soporte prioritario y acceso a futuros formatos</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={handleStartPayment}
                      className="mt-4 w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      <span>Proceder al Pago PSE</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0E1527] border border-[#1E2A47] text-xs text-slate-400 space-y-2">
                  <h4 className="font-semibold text-slate-200">Pasarela y Métodos de Pago</h4>
                  <p>
                    Los pagos son recaudados electrónicamente de forma segura mediante integración con PSE (Pagos Seguros en Línea), soportando bancos autorizados por la Superintendencia Financiera de Colombia (Bancolombia, Nequi, Davivienda, BBVA, Banco de Bogotá, etc.).
                  </p>
                  <p>
                    No cobramos tarifas ocultas de afiliación ni renovaciones automáticas no autorizadas.
                  </p>
                </div>
              </div>
            )}

            {/* 2. AVISO DE PRIVACIDAD */}
            {activeTab === 'privacy' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#1E2A47] pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="text-blue-400" size={22} />
                    Aviso de Privacidad
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Conoce cómo custodiamos y protegemos tu privacidad en Citara.
                  </p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <p>
                    En cumplimiento de las normas vigentes de protección al consumidor y de la legislación de privacidad digital, <strong>Citara</strong> informa a todos sus usuarios que la información personal proporcionada durante el registro o uso de la plataforma será tratada con los más estrictos estándares de confidencialidad y seguridad.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                    <h4 className="font-bold text-slate-200 mb-1.5 text-sm">¿Qué datos recolectamos?</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li>Dirección de correo electrónico e identificador de cuenta de usuario.</li>
                      <li>Nivel de suscripción (Plan Gratuito / Plan Premium).</li>
                      <li>Metadatos necesarios para la trazabilidad de transacciones en pasarela de pagos (en caso de actualización).</li>
                      <li>Preferencias de configuración de formato (idioma, estilo de citación, portada).</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                    <h4 className="font-bold text-slate-200 mb-1.5 text-sm">Privacidad de tus Documentos e Investigaciones</h4>
                    <p className="text-slate-300">
                      Citara no comercializa ni divulga el contenido textual de tus manuscritos, referencias bibliográficas ni proyectos académicos. Todo el formateo y procesamiento respeta la propiedad intelectual del autor.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES */}
            {activeTab === 'data-treatment' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#1E2A47] pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="text-blue-400" size={22} />
                    Política de Tratamiento de Datos Personales (Habeas Data)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Conforme a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.
                  </p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <p>
                    <strong>Citara</strong> adopta la presente Política de Tratamiento de Datos Personales para garantizar el derecho constitucional de Habeas Data de todos los titulares de datos registrados en nuestra plataforma.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-200">1. Finalidades del Tratamiento</h4>
                    <p>Los datos suministrados serán empleados exclusivamente para:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                      <li>Gestionar el acceso a la cuenta de usuario y validar el nivel de suscripción.</li>
                      <li>Emitir comprobantes de pago de la pasarela electrónica.</li>
                      <li>Atención de PQRS y requerimientos de soporte técnico académico.</li>
                      <li>Notificaciones operativas sobre mantenimiento o mejoras de la herramienta.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-200">2. Derechos del Titular</h4>
                    <p>Como titular de los datos personales tienes derecho a:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                      <li>Conocer, actualizar y rectificar tus datos personales frente a Citara.</li>
                      <li>Solicitar prueba de la autorización otorgada para el tratamiento.</li>
                      <li>Ser informado previa solicitud respecto al uso que se le ha dado a tus datos.</li>
                      <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios constitucionales.</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-blue-200">
                    <p>
                      Para ejercer cualquiera de tus derechos de Habeas Data, puedes enviar una solicitud formal a <strong>soporte@citara.app</strong>. Tu solicitud será respondida en un término máximo de 10 días hábiles.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. POLÍTICA DE RESPALDO Y DISPONIBILIDAD */}
            {activeTab === 'backup' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#1E2A47] pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <DatabaseBackup className="text-blue-400" size={22} />
                    Política de Respaldo y Continuidad del Servicio
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Garantías de persistencia, copias de seguridad e integridad de la información.
                  </p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                    <h4 className="font-bold text-slate-200 mb-1">Almacenamiento Local y Resiliencia en Navegador</h4>
                    <p>
                      Citara implementa mecanismos automáticos de persistencia local (Local Storage e IndexedDB seguro) que guardan el estado de tu documento y referencias continuamente mientras editas, minimizando el riesgo de pérdida por cierres accidentales o fallas de red.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                    <h4 className="font-bold text-slate-200 mb-1">Copias de Seguridad en Nube (Cloud Backup)</h4>
                    <p>
                      La información de cuentas y perfiles es respaldada periódicamente en servidores redundantes con cifrado en reposo y en tránsito (SSL/TLS). Se realizan snapshots automáticos diarios para salvaguardar la integridad de las cuentas y suscripciones activas.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                    <h4 className="font-bold text-slate-200 mb-1">Recomendación al Usuario</h4>
                    <p>
                      Recomendamos descargar y respaldar con regularidad copias en formato .docx o .pdf de tus investigaciones mediante el botón "Exportar" situado en la barra principal.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. POLÍTICA DE COOKIES */}
            {activeTab === 'cookies' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#1E2A47] pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Cookie className="text-blue-400" size={22} />
                    Política de Cookies y Almacenamiento Local
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Detalle sobre las tecnologías de sesión y almacenamiento utilizadas.
                  </p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <p>
                    Citara utiliza cookies técnicas y tecnologías de almacenamiento local en el navegador para posibilitar el correcto funcionamiento de la plataforma:
                  </p>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                      <span className="font-semibold text-white block mb-0.5">Cookies Técnicas Esenciales:</span>
                      <span>Mantienen activa la sesión del usuario de forma segura y previenen fraudes o accesos no autorizados.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                      <span className="font-semibold text-white block mb-0.5">Cookies y Almacenamiento de Preferencias:</span>
                      <span>Guardan tus preferencias de interfaz, tales como tema oscuro/claro, idioma y última norma seleccionada.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#11192E] border border-[#1E2A47]">
                      <span className="font-semibold text-white block mb-0.5">No usamos Cookies de Rastreo Publicitario de Terceros:</span>
                      <span>No compartimos tu navegación con anunciantes externos ni redes publicitarias.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. DATOS DE CONTACTO, CRÉDITOS Y DERECHOS */}
            {activeTab === 'contact' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#1E2A47] pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Mail className="text-blue-400" size={22} />
                    Datos de Contacto, Créditos y Derechos Reservados
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Información institucional del proyecto y canales de atención.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47] space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
                      <Mail size={16} />
                      <span>Correo Electrónico</span>
                    </div>
                    <p className="text-slate-200 font-medium">contacto@citara.app</p>
                    <p className="text-slate-400 text-[11px]">Atención de soporte y consultas institucionales</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47] space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
                      <Phone size={16} />
                      <span>Línea de Atención</span>
                    </div>
                    <p className="text-slate-200 font-medium">+57 (601) 456-7890 / +57 310 000 0000</p>
                    <p className="text-slate-400 text-[11px]">Lunes a Viernes 8:00 AM - 5:00 PM (COT)</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11192E] border border-[#1E2A47] space-y-1 sm:col-span-2">
                    <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
                      <MapPin size={16} />
                      <span>Sede y Domicilio Principal</span>
                    </div>
                    <p className="text-slate-200 font-medium">Carrera 7 # 71 - 21, Torre Empresarial, Bogotá D.C., Colombia</p>
                  </div>
                </div>

                {/* Créditos y Propiedad Intelectual */}
                <div className="p-4 rounded-xl bg-[#0E1527] border border-[#1E2A47] text-xs space-y-2">
                  <h4 className="font-bold text-slate-200 text-sm">Créditos del Proyecto y Derechos Reservados</h4>
                  <p className="text-slate-300">
                    <strong>Citara APA 7.ª Edition Platform</strong> es un software desarrollado para la normalización técnica, redacción y gestión rigurosa de documentos bajo estándares internacionales de citación (American Psychological Association 7th Edition).
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    © {new Date().getFullYear()} Citara Technologies. Todos los derechos reservados. Queda prohibida la reproducción total o parcial del software sin autorización previa y expresa de los autores.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="px-6 py-3.5 border-t border-[#1E2A47] bg-[#11192E] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span>Versión 2.4.0 — Plataforma Verificada</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Pasarela PSE Simulación lanzada desde LegalModal */}
      {showPSEModal && (
        <SimulatedPSEGateway
          onClose={() => setShowPSEModal(false)}
          onSuccess={() => {
            setShowPSEModal(false);
          }}
        />
      )}
    </div>
  );
};
