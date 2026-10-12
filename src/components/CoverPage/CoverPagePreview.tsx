import React from 'react';
import type { ICoverPageData } from '@/interfaces/ICoverPage';
import type { CitationFormat } from '@/utils/citationFormats';
import { useLanguage } from '@/context/AppContext';

interface CoverPagePreviewProps {
  coverPage: ICoverPageData;
  citationFormat: CitationFormat;
}

/**
 * Renders a visual mini-preview of the cover page inside the form panel.
 * Simulates the look of a printed A4 page following each standard's layout:
 *
 * APA 7 / APA 6 (§2.3):
 *   - Page number "1" top-right in the header area.
 *   - Title block positioned in the UPPER HALF of the page (~top third).
 *   - Author/institution block below, centred.
 *
 * IEEE:
 *   - Compact centred layout, no page number header.
 */
const CoverPagePreview: React.FC<CoverPagePreviewProps> = ({ coverPage, citationFormat }) => {
  const isIEEE = citationFormat === 'ieee';
  const isAPA = citationFormat === 'apa7';
  const { t } = useLanguage();

  const hasContent =
    coverPage.title.trim() ||
    coverPage.authors.trim() ||
    coverPage.institution.trim();

  return (
    <div className="flex flex-col items-center select-none">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 self-center">
        VISTA PREVIA
      </p>

      {/* A4 miniature white page simulation */}
      <div
        className="w-full max-w-[130px] sm:max-w-[145px] bg-white border border-slate-300/40 rounded-sm shadow-md overflow-hidden relative"
        style={{ aspectRatio: '210 / 297' }}
        aria-label={t('preview')}
      >
        {hasContent ? (
          <div className="flex flex-col h-full text-slate-900 p-2">
            {/* Header bar (page number for APA) */}
            <div className={`flex items-center pb-0.5 flex-shrink-0 ${coverPage.logo ? 'justify-between' : 'justify-end'}`}
                 style={{ height: '10%' }}>
              {coverPage.logo && (
                <img src={coverPage.logo} alt="Logo" className="object-contain" style={{ maxHeight: '0.75rem', maxWidth: '1.25rem' }} />
              )}
              {isAPA && (
                <span
                  className="text-slate-400 font-mono"
                  style={{ fontSize: '0.4rem' }}
                >
                  1
                </span>
              )}
            </div>

            {/* Upper half: title block */}
            <div
              className="flex flex-col items-center justify-center px-1 text-center flex-shrink-0"
              style={{ height: isIEEE ? '45%' : '40%' }}
            >
              {coverPage.title && (
                <p
                  className="font-bold text-slate-950 leading-tight line-clamp-3"
                  style={{ fontSize: '0.52rem' }}
                >
                  {isIEEE ? coverPage.title.toUpperCase() : coverPage.title}
                </p>
              )}
              {isAPA && coverPage.subtitle?.trim() && (
                <p className="text-slate-600 mt-0.5 line-clamp-2" style={{ fontSize: '0.45rem' }}>
                  {coverPage.subtitle}
                </p>
              )}
            </div>

            {/* Lower half: author / institution / course / date */}
            <div
              className="flex flex-col items-center justify-start px-1 text-center gap-0.5 flex-shrink-0 text-slate-700"
              style={{ height: isIEEE ? '40%' : '42%' }}
            >
              {isAPA && <div style={{ height: '0.5rem' }} />}

              {coverPage.authors && (
                <div className="font-medium text-slate-900 leading-tight" style={{ fontSize: '0.44rem' }}>
                  {coverPage.authors.split('\n').map((author: string, idx: number) => (
                    <div key={idx} className="truncate">{author}</div>
                  ))}
                </div>
              )}
              {coverPage.institution && (
                <p className="text-slate-600 truncate max-w-full" style={{ fontSize: '0.4rem' }}>
                  {coverPage.institution}
                </p>
              )}
              {coverPage.faculty && (
                <p className="text-slate-500 truncate max-w-full" style={{ fontSize: '0.38rem' }}>
                  {coverPage.faculty}
                </p>
              )}
              {!isIEEE && coverPage.course && (
                <p className="text-slate-500 truncate max-w-full" style={{ fontSize: '0.38rem' }}>
                  {coverPage.course}
                </p>
              )}
              {!isIEEE && coverPage.teacher && (
                <p className="text-slate-500 truncate max-w-full" style={{ fontSize: '0.38rem' }}>
                  {coverPage.teacher}
                </p>
              )}
              {(coverPage.city || coverPage.date) && (
                <p className="text-slate-400 truncate max-w-full" style={{ fontSize: '0.38rem' }}>
                  {[coverPage.city, coverPage.date].filter(Boolean).join(', ')}
                </p>
              )}
            </div>

            <div className="flex-1" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1.5 px-2">
            <div className="w-8 h-0.5 bg-slate-200 rounded" />
            <div className="w-12 h-0.5 bg-slate-200 rounded" />
            <div className="w-6 h-0.5 bg-slate-200 rounded" />
            <p className="text-slate-400 text-center mt-2 leading-tight px-1" style={{ fontSize: '0.44rem' }}>
              Completá los campos para ver la vista previa
            </p>
          </div>
        )}
      </div>

      {/* Format badge */}
      <div className="mt-2 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
        <span className="text-[10px] text-blue-400 font-medium">
          {citationFormat === 'apa7' ? 'APA 7.ª' : citationFormat === 'upel' ? 'UPEL' : 'IEEE'}
        </span>
      </div>
    </div>
  );
};

export default CoverPagePreview;
