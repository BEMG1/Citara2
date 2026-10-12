import React, { useId } from 'react';
import { RotateCcw, FileText, Info, Upload, Trash2 } from 'lucide-react';
import { useCoverPage, useLanguage } from '@/context/AppContext';
import { useCitationFormat } from '@/context/AppContext';
import type { ICoverPageData } from '@/interfaces/ICoverPage';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import CoverPagePreview from './CoverPagePreview';
import DatePickerField from './DatePickerField';

// ─── Field definitions per format ─────────────────────────────────────────────

interface FieldDef {
  key: keyof ICoverPageData;
  labelKey: keyof typeof import('@/i18n/locales/es').es;
  placeholderKey: keyof typeof import('@/i18n/locales/es').es;
  hintKey?: keyof typeof import('@/i18n/locales/es').es;
  required?: boolean;
  formats: ('apa7' | 'apa6' | 'ieee' | 'upel')[];
}

const FIELD_DEFS: FieldDef[] = [
  {
    key: 'title',
    labelKey: 'coverDocTitle',
    placeholderKey: 'coverDocTitlePlaceholder',
    required: true,
    formats: ['apa7', 'apa6', 'ieee', 'upel'],
  },
  {
    key: 'subtitle',
    labelKey: 'coverSubtitle',
    placeholderKey: 'coverSubtitlePlaceholder',
    formats: ['apa7', 'apa6'],
  },
  {
    key: 'authors',
    labelKey: 'coverAuthors',
    placeholderKey: 'coverAuthorsPlaceholder',
    required: true,
    hintKey: 'coverAuthorsHint',
    formats: ['apa7', 'apa6', 'ieee', 'upel'],
  },
  {
    key: 'institution',
    labelKey: 'coverInstitution',
    placeholderKey: 'coverInstitutionPlaceholder',
    required: true,
    formats: ['apa7', 'apa6', 'ieee', 'upel'],
  },
  {
    key: 'faculty',
    labelKey: 'coverFaculty',
    placeholderKey: 'coverFacultyPlaceholder',
    formats: ['apa7', 'apa6', 'ieee', 'upel'],
  },
  {
    key: 'course',
    labelKey: 'coverCourse',
    placeholderKey: 'coverCoursePlaceholder',
    formats: ['apa7', 'apa6'],
  },
  {
    key: 'teacher',
    labelKey: 'coverTeacher',
    placeholderKey: 'coverTeacherPlaceholder',
    formats: ['apa7', 'apa6', 'upel'],
  },
  {
    key: 'city',
    labelKey: 'coverCity',
    placeholderKey: 'coverCityPlaceholder',
    formats: ['apa7', 'apa6', 'ieee', 'upel'],
  },
  {
    key: 'date',
    labelKey: 'coverDate',
    placeholderKey: 'coverDate',
    required: true,
    formats: ['apa7', 'apa6', 'ieee', 'upel'],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

interface FormFieldProps {
  id: string;
  def: FieldDef;
  value: string;
  onChange: (val: string) => void;
  t: any;
}

const FormField: React.FC<FormFieldProps> = ({ id, def, value, onChange, t }) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="flex items-center gap-1 text-xs font-medium text-slate-300"
    >
      {t(def.labelKey) as string}
      {def.required && (
        <span className="text-blue-400 font-bold" aria-label="campo obligatorio">*</span>
      )}
      {def.hintKey && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help inline-flex">
              <Info className="h-3 w-3 text-slate-500 hover:text-slate-300 transition-colors" />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t(def.hintKey) as string}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t(def.placeholderKey) as string}
      className="w-full px-3 py-2 text-xs rounded-lg border border-[#1F2B48] bg-[#0E1424] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
    />
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────

const CoverPageForm: React.FC = () => {
  const { coverPage, updateField, resetCoverPage } = useCoverPage();
  const { citationFormat } = useCitationFormat();
  const { t } = useLanguage();
  const baseId = useId();

  const activeFields = FIELD_DEFS.filter((f) =>
    f.formats.includes(citationFormat as 'apa7' | 'apa6' | 'ieee'),
  );

  const handleToggle = (checked: boolean) => {
    updateField('enabled', checked);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoRemove = () => {
    updateField('logo', null);
  };

  // Group fields so teacher and city sit on the same row if both present
  const mainFields = activeFields.filter((f) => f.key !== 'teacher' && f.key !== 'city' && f.key !== 'date');
  const teacherDef = activeFields.find((f) => f.key === 'teacher');
  const cityDef = activeFields.find((f) => f.key === 'city');
  const dateDef = activeFields.find((f) => f.key === 'date');

  return (
    <div className="flex flex-col gap-4">

      {/* ── Item 11: Switch para incluir portada en la exportación ── */}
      <div
        className="flex items-center justify-between p-3.5 rounded-xl border border-[#1F2B48] bg-[#162035] shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <FileText className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">
              {t('includeCoverPage')}
            </p>
            <p className="text-[11px] text-slate-400">
              {t('includeCoverPageDesc')}
            </p>
          </div>
        </div>
        <Switch
          id="cover-page-toggle"
          checked={coverPage.enabled}
          onCheckedChange={handleToggle}
          aria-label={coverPage.enabled ? t('disableCoverPage') : t('enableCoverPage')}
        />
      </div>

      {/* ── Item 12 & 13 Upper section: Logo (Left) + Vista Previa (Right) ── */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 items-start transition-opacity duration-200 ${
          coverPage.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none select-none'
        }`}
      >
        {/* Logo Uploader */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              {t('institutionalLogo') as string}
            </label>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help inline-flex">
                  <Info className="h-3 w-3 text-slate-500 hover:text-slate-300 transition-colors" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('suggestionLogo') as string}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {coverPage.logo ? (
            <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1F2B48] bg-[#162035]">
              <img src={coverPage.logo} alt="Logo" className="h-10 w-auto object-contain bg-white rounded p-1 border border-slate-700/50" />
              <div className="flex flex-col gap-1.5 ml-auto">
                <label className="px-2 py-1 text-[11px] font-medium rounded border border-[#26375A] bg-[#1B2640] hover:bg-[#223052] text-slate-200 transition-colors cursor-pointer flex items-center gap-1">
                  <Upload size={11} />
                  {t('replaceLogo') as string}
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                <button
                  type="button"
                  onClick={handleLogoRemove}
                  className="px-2 py-1 text-[11px] font-medium rounded text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={11} />
                  {t('deleteLogo') as string}
                </button>
              </div>
            </div>
          ) : (
            <label className="h-[145px] flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[#243354] hover:border-blue-500/50 bg-[#162035]/40 hover:bg-[#162035] cursor-pointer transition-all group">
              <Upload className="h-5 w-5 mb-2 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{t('uploadLogo') as string}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">PNG, JPG o SVG</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          )}
        </div>

        {/* Live Preview Column (Item 13) */}
        <div className="flex flex-col items-center justify-center">
          <CoverPagePreview
            coverPage={coverPage}
            citationFormat={citationFormat as 'apa7' | 'apa6' | 'ieee'}
          />
        </div>
      </div>

      {/* ── Form fields (Item 12) ── */}
      <div
        className={`flex flex-col gap-3 transition-opacity duration-200 ${
          coverPage.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none select-none'
        }`}
      >
        {mainFields.map((def) => {
          const rawValue = coverPage[def.key];
          const value = typeof rawValue === 'string' ? rawValue : '';

          return (
            <FormField
              key={def.key as string}
              id={`${baseId}-${def.key as string}`}
              def={def}
              value={value}
              onChange={(val) => updateField(def.key, val as ICoverPageData[typeof def.key])}
              t={t}
            />
          );
        })}

        {/* Two-column row for Docente and Ciudad */}
        {(teacherDef || cityDef) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teacherDef && (
              <FormField
                key={teacherDef.key as string}
                id={`${baseId}-${teacherDef.key as string}`}
                def={teacherDef}
                value={typeof coverPage.teacher === 'string' ? coverPage.teacher : ''}
                onChange={(val) => updateField('teacher', val)}
                t={t}
              />
            )}
            {cityDef && (
              <FormField
                key={cityDef.key as string}
                id={`${baseId}-${cityDef.key as string}`}
                def={cityDef}
                value={typeof coverPage.city === 'string' ? coverPage.city : ''}
                onChange={(val) => updateField('city', val)}
                t={t}
              />
            )}
          </div>
        )}

        {/* Date Field (if applicable) */}
        {dateDef && (
          <DatePickerField
            id={`${baseId}-${dateDef.key as string}`}
            label={t(dateDef.labelKey) as string}
            value={typeof coverPage.date === 'string' ? coverPage.date : ''}
            required={dateDef.required}
            onChange={(val) => updateField('date', val)}
          />
        )}

        {/* Reset fields button */}
        <button
          id="cover-page-reset"
          onClick={resetCoverPage}
          className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors self-start cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t('resetFields')}
        </button>
      </div>

      {/* Format notice */}
      {coverPage.enabled && (
        <div
          className="flex items-start gap-2.5 p-3 rounded-xl border border-[#1F2B48] bg-[#162035]"
        >
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-400" />
          <p className="text-xs leading-relaxed text-slate-300">
            {citationFormat === 'ieee'
              ? t('ieeeCoverNotice')
              : citationFormat === 'apa7'
              ? t('apa7CoverNotice')
              : t('apa6CoverNotice')}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoverPageForm;
