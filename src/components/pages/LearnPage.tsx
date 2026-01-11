'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import ScrollablePage from '@/components/layout/ScrollablePage';

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  filename: string;
  path: string;
}

function LearnPage() {
  const [selectedPDF, setSelectedPDF] = useState<PDFDocument | null>(null);
  const [pdfDocuments, setPdfDocuments] = useState<PDFDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch PDFs from API
    const fetchPDFs = async () => {
      try {
        const response = await fetch('/api/pdfs');
        const data = await response.json();
        if (data.pdfs && data.pdfs.length > 0) {
          setPdfDocuments(data.pdfs);
        }
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPDFs();
  }, []);

  const selectPDF = useCallback((pdf: PDFDocument) => {
    setSelectedPDF(pdf);
  }, []);

  const closePDFViewer = useCallback(() => {
    setSelectedPDF(null);
  }, []);

  return (
    <ScrollablePage>
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-8 pt-2">
          <h1 className="text-4xl font-bold mb-4 text-white">Learn</h1>

          <div className="space-y-6">
            <section>
              <p className="text-xl text-gray-300 mb-6">
                Access technical documentation, protocols, and learning materials for NAVADA OS development.
              </p>
            </section>

            {/* PDF Documents Grid */}
            <section>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">Loading PDFs...</p>
                </div>
              ) : pdfDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No PDFs available. Add PDF files to the /public/pdfs/ folder.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
                  {pdfDocuments.map((pdf) => (
                  <div
                    key={pdf.id}
                    className="bg-gray-900 rounded-lg p-4 sm:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800 border border-gray-700 hover:border-white active:scale-95"
                    onClick={() => selectPDF(pdf)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                      <div className="text-3xl sm:text-4xl mb-2 sm:mb-0 sm:mr-4 text-center sm:text-left">📄</div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 leading-tight">
                          {pdf.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                          {pdf.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500 text-xs">PDF Document</span>
                      <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                        View
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </section>

            <div className="h-20"></div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-900 border-b border-gray-700">
            <h2 className="text-white text-sm sm:text-lg font-semibold flex-1 mr-2 truncate">
              {selectedPDF.title}
            </h2>
            <button
              onClick={closePDFViewer}
              className="text-white hover:text-gray-300 transition-colors p-1 sm:p-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* PDF Content */}
          <div className="flex-1 p-2 sm:p-4">
            <iframe
              src={selectedPDF.path}
              className="w-full h-full border border-gray-700 rounded-lg bg-white"
              title={selectedPDF.title}
            />
          </div>

          {/* Mobile-friendly instructions */}
          <div className="block sm:hidden bg-gray-900 p-2 text-center border-t border-gray-700">
            <p className="text-gray-400 text-xs">
              Tap and zoom to navigate the PDF • Swipe to scroll pages
            </p>
          </div>
        </div>
      )}
    </ScrollablePage>
  );
}

export default memo(LearnPage);