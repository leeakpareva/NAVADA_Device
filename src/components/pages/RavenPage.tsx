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
            <p className="text-gray-400">Designed by Lee Akpareva</p>
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