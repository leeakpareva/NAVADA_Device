'use client';

import ScrollablePage from '@/components/layout/ScrollablePage';

export default function RavenPage() {
  return (
    <ScrollablePage>
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 pt-4 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">RAVEN</h1>
            <p className="text-xl text-gray-300 mb-2">Raspberry Pi-Powered AI Learning Platform</p>
            <p className="text-gray-400 mb-3">Designed by Lee Akpareva</p>
            <div className="flex justify-center">
              <a
                href="https://www.linkedin.com/in/leslie-akpareva-mba-ma-56a888182/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Executive Summary</h2>
              <div className="text-gray-200 leading-relaxed space-y-4">
                <p>
                  <strong>RAVEN</strong> is an innovative educational technology platform designed by Lee Akpareva to democratize artificial intelligence education through hands-on, immersive learning experiences. Built on the robust foundation of the Raspberry Pi 4B, RAVEN represents a comprehensive approach to AI education that bridges the gap between theoretical knowledge and practical application.
                </p>
              </div>
            </section>

            {/* Research Dashboard */}
            <section className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                <span className="mr-2">📊</span>
                RAVEN Research Dashboard
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Explore comprehensive research data, analytics, and insights about the RAVEN platform's educational impact and technical capabilities through our interactive dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://raven-dashboard-research.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Research Dashboard
                </a>
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Powered by Streamlit
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-black/30 rounded p-2">
                  <div className="text-2xl font-bold text-purple-400">Live</div>
                  <div className="text-xs text-gray-400">Data Analytics</div>
                </div>
                <div className="bg-black/30 rounded p-2">
                  <div className="text-2xl font-bold text-blue-400">Interactive</div>
                  <div className="text-xs text-gray-400">Visualizations</div>
                </div>
                <div className="bg-black/30 rounded p-2">
                  <div className="text-2xl font-bold text-green-400">Real-time</div>
                  <div className="text-xs text-gray-400">Metrics</div>
                </div>
                <div className="bg-black/30 rounded p-2">
                  <div className="text-2xl font-bold text-orange-400">Research</div>
                  <div className="text-xs text-gray-400">Insights</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-white">Design Philosophy</h3>
              <p className="text-gray-200 leading-relaxed">
                The hardware architecture was meticulously crafted using Shaper3D and brought to life through detailed 3D modeling in Blender, leveraging ClaudeMCP for enhanced design precision. This integration of cutting-edge design tools reflects RAVEN's commitment to merging traditional engineering principles with modern AI-assisted development workflows.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-white">360-Degree Learning Approach</h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                RAVEN's core mission is to inspire curiosity and foster deep understanding across four fundamental pillars of AI education:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-blue-400">Programming</h4>
                  <p className="text-gray-300 text-sm">Interactive coding environments that teach AI algorithms, machine learning concepts, and software development best practices</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-green-400">Robotics</h4>
                  <p className="text-gray-300 text-sm">Hands-on exploration of autonomous systems, sensor integration, and real-world AI applications</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Hardware</h4>
                  <p className="text-gray-300 text-sm">Understanding the physical foundations of AI computing, from microprocessors to embedded systems</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-orange-400">3D Design & Visualization</h4>
                  <p className="text-gray-300 text-sm">Spatial computing, computer vision, and the intersection of AI with creative technologies</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-white">Educational Impact</h3>
              <p className="text-gray-200 leading-relaxed">
                By providing a tangible, interactive platform, RAVEN transforms abstract AI concepts into concrete learning experiences. Students and enthusiasts can progress from basic programming concepts to advanced machine learning implementations, all while working with physical hardware that demonstrates real-world applications.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-white">Target Audience</h3>
              <p className="text-gray-200 leading-relaxed">
                RAVEN serves educators, students, makers, and professionals seeking comprehensive AI literacy. Whether in classroom settings, maker spaces, or individual learning environments, the platform adapts to diverse learning styles and skill levels.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-white">Innovation & Accessibility</h3>
              <p className="text-gray-200 leading-relaxed">
                The Raspberry Pi 4B foundation ensures RAVEN remains accessible and cost-effective while maintaining the computational power necessary for meaningful AI experimentation. This deliberate choice reflects a commitment to making advanced AI education available to a global audience, regardless of economic barriers.
              </p>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-200 leading-relaxed italic text-center">
                <strong>RAVEN represents the future of AI education</strong>—where curiosity meets capability, and where the next generation of AI innovators can build the foundation for tomorrow's technological breakthroughs.
              </p>
            </section>

            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </ScrollablePage>
  );
}