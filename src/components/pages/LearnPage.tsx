'use client';

import { useState, useEffect, useCallback, memo, useRef } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isMobileUserAgent = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsMobile(isMobileUserAgent || (isTouchDevice && isSmallScreen));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent background scroll when modal is open on desktop
  useEffect(() => {
    if (selectedPDF && !isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [selectedPDF, isMobile]);

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
    if (isMobile) {
      // On mobile, open PDF in new tab for better interaction
      window.open(pdf.path, '_blank', 'noopener,noreferrer');
    } else {
      // On desktop, show in modal
      setSelectedPDF(pdf);
    }
  }, [isMobile]);

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
              <p className="text-xl text-gray-300 mb-4">
                Access technical documentation, protocols, and learning materials for NAVADA OS development.
              </p>
              {isMobile && (
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 text-sm">
                    📱 On mobile devices, PDFs will open in a new tab for optimal scrolling and zoom experience.
                  </p>
                </div>
              )}
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
                        {isMobile ? 'Open' : 'View'}
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

      {/* PDF Viewer Modal - Desktop Only */}
      {selectedPDF && !isMobile && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex flex-col"
          style={{
            height: '100vh',
            width: '100vw',
            touchAction: 'none'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-900 border-b border-gray-700 flex-shrink-0">
            <h2 className="text-white text-sm sm:text-lg font-semibold flex-1 mr-2 truncate">
              {selectedPDF.title}
            </h2>
            <button
              onClick={closePDFViewer}
              className="text-white hover:text-gray-300 transition-colors p-2 touch-manipulation bg-gray-800 rounded-lg"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* PDF Content Container */}
          <div className="flex-1 overflow-hidden">
            <div
              className="w-full h-full p-2 sm:p-4"
              style={{
                overflowY: 'auto',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x pan-y'
              }}
            >
              <iframe
                src={selectedPDF.path}
                className="w-full border border-gray-700 rounded-lg bg-white"
                title={selectedPDF.title}
                style={{
                  height: 'calc(100vh - 140px)', // Account for header and instructions
                  minHeight: '500px',
                  WebkitOverflowScrolling: 'touch'
                }}
                scrolling="yes"
                allowFullScreen
              />
            </div>
          </div>

          {/* Mobile-friendly instructions */}
          <div className="block sm:hidden bg-gray-900 p-3 text-center border-t border-gray-700 flex-shrink-0">
            <p className="text-gray-400 text-xs leading-relaxed">
              Pinch to zoom • Drag to pan • Swipe up/down to scroll pages
            </p>
          </div>
        </div>
      )}
    </ScrollablePage>
  );
}

export default memo(LearnPage);