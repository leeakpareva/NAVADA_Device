'use client';

import ScrollablePage from '@/components/layout/ScrollablePage';

export default function DesignsPage() {
  return (
    <ScrollablePage>
      <div className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-red-500">Designs</h1>

          <div className="space-y-8">
            <section>
              <p className="text-xl text-gray-300 mb-6">
                Explore our innovative design concepts and user interface elements crafted specifically for micro-display environments.
              </p>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Design Philosophy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Every pixel matters in micro-display design. Our approach focuses on clarity, efficiency, and intuitive interaction patterns that work seamlessly at the smallest scales.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-medium text-white">Precision</h3>
                  <p className="text-gray-400 text-sm">Every element positioned with pixel-perfect accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-medium text-white">Efficiency</h3>
                  <p className="text-gray-400 text-sm">Maximum functionality in minimum space</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-medium text-white">Clarity</h3>
                  <p className="text-gray-400 text-sm">Clean, readable interfaces at any size</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">UI Component Library</h2>
              <div className="space-y-4">
                <div className="border border-gray-700 p-4 rounded">
                  <h3 className="font-medium text-white mb-2">Micro Buttons</h3>
                  <div className="flex space-x-2 mb-2">
                    <button className="bg-red-600 text-white text-xs px-2 py-1 rounded">Primary</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Secondary</button>
                    <button className="border border-gray-600 text-gray-300 text-xs px-2 py-1 rounded">Outline</button>
                  </div>
                  <p className="text-gray-400 text-sm">Touch-optimized buttons designed for finger and stylus interaction</p>
                </div>

                <div className="border border-gray-700 p-4 rounded">
                  <h3 className="font-medium text-white mb-2">Compact Forms</h3>
                  <div className="space-y-2 max-w-xs">
                    <input type="text" placeholder="Micro input field" className="w-full bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600" />
                    <select className="w-full bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600">
                      <option>Select option</option>
                    </select>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Space-efficient form controls with clear visual hierarchy</p>
                </div>

                <div className="border border-gray-700 p-4 rounded">
                  <h3 className="font-medium text-white mb-2">Micro Navigation</h3>
                  <div className="flex space-x-1 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-400 text-sm">Ultra-compact navigation indicators and breadcrumbs</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Typography System</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Heading Large</h3>
                  <p className="text-gray-400 text-sm">12px, Bold weight, for primary headings</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Heading Medium</h4>
                  <p className="text-gray-400 text-sm">10px, Semibold weight, for section headers</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-white">Heading Small</h5>
                  <p className="text-gray-400 text-sm">8px, Medium weight, for subsections</p>
                </div>
                <div>
                  <p className="text-sm text-white">Body Text</p>
                  <p className="text-gray-400 text-sm">8px, Regular weight, for content</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Caption Text</p>
                  <p className="text-gray-400 text-sm">6px, Regular weight, for annotations</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="w-full h-16 bg-red-500 rounded mb-2"></div>
                  <p className="text-white text-sm font-medium">Primary Red</p>
                  <p className="text-gray-400 text-xs">#EF4444</p>
                </div>
                <div>
                  <div className="w-full h-16 bg-gray-900 border border-gray-600 rounded mb-2"></div>
                  <p className="text-white text-sm font-medium">Dark Gray</p>
                  <p className="text-gray-400 text-xs">#111827</p>
                </div>
                <div>
                  <div className="w-full h-16 bg-gray-600 rounded mb-2"></div>
                  <p className="text-white text-sm font-medium">Medium Gray</p>
                  <p className="text-gray-400 text-xs">#4B5563</p>
                </div>
                <div>
                  <div className="w-full h-16 bg-white rounded mb-2"></div>
                  <p className="text-white text-sm font-medium">Pure White</p>
                  <p className="text-gray-400 text-xs">#FFFFFF</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Layout Patterns</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Grid System</h3>
                  <div className="grid grid-cols-12 gap-1 mb-2">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className="h-8 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">12-column responsive grid for flexible layouts</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Spacing Scale</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-4 bg-red-500"></div>
                      <span className="text-gray-400 text-sm">0.25rem (4px) - Micro spacing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-4 bg-red-500"></div>
                      <span className="text-gray-400 text-sm">0.5rem (8px) - Small spacing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500"></div>
                      <span className="text-gray-400 text-sm">1rem (16px) - Medium spacing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-4 bg-red-500"></div>
                      <span className="text-gray-400 text-sm">1.5rem (24px) - Large spacing</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-red-900 to-red-800 p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Design Resources</h2>
              <p className="text-red-100 mb-6">
                Download our complete design system and component library for your micro-display projects.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-red-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Figma Kit
                </button>
                <button className="border border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-red-800 transition-colors">
                  Sketch Library
                </button>
              </div>
            </section>

            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </ScrollablePage>
  );
}