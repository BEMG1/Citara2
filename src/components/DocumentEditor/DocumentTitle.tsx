import React, { useState, useRef, useEffect } from 'react';
import { useDocument } from '@/context/AppContext';
import { FileText, Edit2 } from 'lucide-react';
import { useLanguage } from '@/context/AppContext';

const DocumentTitle: React.FC = () => {
  const { documentTitle, setDocumentTitle } = useDocument();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempTitle(documentTitle);
  }, [documentTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (tempTitle.trim()) {
      setDocumentTitle(tempTitle.trim());
    } else {
      setTempTitle(documentTitle); // Revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(documentTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center space-x-2.5 mb-3 shrink-0 group">
      <FileText className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={1.8} />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-sm font-medium text-white bg-slate-800/80 px-2 py-0.5 rounded border border-blue-500/60 focus:outline-none w-full max-w-xs"
        />
      ) : (
        <div 
          className="flex items-center cursor-pointer max-w-sm rounded px-1 -mx-1 py-0.5 hover:bg-slate-800/30 transition-colors"
          onClick={() => setIsEditing(true)}
          title="Haz clic para editar el nombre"
        >
          <h2 className="text-sm font-semibold text-white tracking-tight truncate">
            {documentTitle || t('documentTitle')}
          </h2>
          <Edit2 className="h-3 w-3 ml-2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  );
};

export default DocumentTitle;
