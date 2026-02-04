
import React, { useState, useRef } from 'react';
/* Removed non-existent SelectAll and unused Info, Trash2 icons */
import { ShieldCheck, FileText, Sparkles, Loader2, Camera, X, CheckCircle2 } from 'lucide-react';
import { DOCUMENT_GUIDES } from '../constants';
import { analyzeDocumentRisk } from '../services/gemini';

interface DocumentImage {
  id: string;
  data: string;
  selected: boolean;
}

const Learn: React.FC = () => {
  const [docInput, setDocInput] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<DocumentImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage: DocumentImage = {
            id: Math.random().toString(36).substr(2, 9),
            data: reader.result as string,
            selected: true,
          };
          setImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });
      // Reset input value so same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toggleImageSelection = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, selected: !img.selected } : img
      )
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const selectAll = () => {
    setImages((prev) => prev.map((img) => ({ ...img, selected: true })));
  };

  const clearAll = () => {
    setImages([]);
  };

  const handleAnalyze = async () => {
    const selectedImages = images.filter((img) => img.selected).map((img) => img.data);
    if (!docInput.trim() && selectedImages.length === 0) return;
    
    setLoading(true);
    setAnalysis(null);
    const result = await analyzeDocumentRisk(docInput, selectedImages);
    setAnalysis(result);
    setLoading(false);
  };

  const selectedCount = images.filter((img) => img.selected).length;

  return (
    <div className="p-4 space-y-6 pb-12">
      <section>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="text-green-600" />
          <h2 className="text-xl font-bold">Documentation Guide</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Avoid costly mistakes. Understand Nigerian property laws in simple terms.</p>
        
        <div className="space-y-4">
          {DOCUMENT_GUIDES.map((doc, i) => (
            <div key={i} className="bg-white border rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">{doc.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  doc.risk === 'Low' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {doc.risk} Risk
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{doc.desc}</p>
              <div className="text-[10px] text-gray-400 font-medium">Validity: {doc.validity}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant */}
      <section className="bg-green-50 border border-green-100 rounded-[32px] p-5 shadow-inner">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-600 rounded-xl text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-green-900">AI Land Assistant</h3>
            <p className="text-[10px] text-green-700 font-medium">Powered by Gemini AI</p>
          </div>
        </div>
        
        <p className="text-xs text-green-800 mb-4 leading-relaxed">
          Describe or upload photos of your documents (C of O, Deed, etc.). Our AI analyzes multiple pages to spot risks.
        </p>
        
        <div className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full rounded-2xl border-green-200 p-4 text-sm focus:ring-green-500 focus:border-green-500 min-h-[140px] pb-12 shadow-sm transition-all"
              placeholder="E.g. I have a Deed of Assignment for land in Guzape. Does it need a Governor's consent?"
              value={docInput}
              onChange={(e) => setDocInput(e.target.value)}
            />
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
              <input 
                type="file" 
                accept="image/*" 
                multiple
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 border border-green-500 rounded-xl text-xs font-bold text-white shadow-md active:bg-green-700 active:scale-[0.98] transition-all"
              >
                <Camera size={16} />
                Select Multiple Photos
              </button>
              <span className="text-[10px] text-green-700 font-medium opacity-70">
                (Select all pages)
              </span>
            </div>
          </div>

          {images.length > 0 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {images.length} Page{images.length !== 1 ? 's' : ''} Uploaded
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={selectAll}
                    className="text-[10px] font-bold text-green-700 flex items-center gap-1 hover:underline"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={clearAll}
                    className="text-[10px] font-bold text-red-600 flex items-center gap-1 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 px-1">
                {/* Add More Slot */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-dashed border-green-200 flex flex-col items-center justify-center text-green-400 bg-white/50 hover:bg-white hover:text-green-600 transition-all"
                >
                  <Camera size={20} />
                  <span className="text-[8px] font-bold mt-1 uppercase">Add Page</span>
                </button>

                {images.map((img) => (
                  <div key={img.id} className="relative flex-shrink-0 group">
                    <div 
                      onClick={() => toggleImageSelection(img.id)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        img.selected 
                          ? 'border-green-500 shadow-lg scale-[1.05] z-10' 
                          : 'border-white opacity-60 grayscale-[0.5]'
                      }`}
                    >
                      <img src={img.data} alt="Doc page" className="w-full h-full object-cover" />
                      {img.selected && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <div className="bg-white rounded-full p-0.5 shadow-md">
                            <CheckCircle2 size={24} className="text-green-600" />
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      className="absolute -top-2 -right-2 bg-white text-gray-700 rounded-full p-1 shadow-xl border border-gray-100 active:bg-gray-100 transition-colors z-20 flex items-center justify-center hover:text-red-500"
                      aria-label="Remove image"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={handleAnalyze}
            disabled={loading || (!docInput.trim() && selectedCount === 0)}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:bg-gray-300 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98] relative overflow-hidden group"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Running Legal Check...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} className="group-hover:animate-pulse" />
                <span>
                  {selectedCount > 0 
                    ? `Analyze ${selectedCount} Page${selectedCount !== 1 ? 's' : ''}` 
                    : 'Analyze Document'}
                </span>
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="mt-6 bg-white border border-green-200 rounded-3xl p-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
              <h4 className="font-bold text-sm text-green-800 flex items-center gap-2">
                <ShieldCheck size={16} /> Legal Analysis Report
              </h4>
              <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Verified Result</span>
            </div>
            <div className="text-[13px] text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap font-medium">
              {analysis}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
               <div className="flex flex-col">
                 <p className="text-[9px] text-gray-400 italic">Disclaimer: AI results are for guidance only.</p>
                 <p className="text-[9px] text-gray-400 italic">Consult a registered solicitor in Abuja.</p>
               </div>
               <button className="bg-gray-50 text-gray-700 font-bold text-[10px] px-3 py-2 rounded-xl border border-gray-100 hover:bg-gray-100">
                 Share Report
               </button>
            </div>
          </div>
        )}
      </section>

      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-[32px] p-6 text-white shadow-xl shadow-blue-900/30 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Need a Professional Search?</h4>
              <p className="text-xs text-blue-200/80">Get a physical site check at AGIS.</p>
            </div>
          </div>
          <button className="w-full bg-white text-blue-900 py-3.5 rounded-2xl text-sm font-black transition-all active:scale-[0.97] shadow-lg shadow-black/20">
            Contact Verified Surveyor
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
      </section>
    </div>
  );
};

export default Learn;
