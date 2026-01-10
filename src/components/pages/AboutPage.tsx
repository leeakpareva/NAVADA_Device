'use client';

import ScrollablePage from '@/components/layout/ScrollablePage';

export default function AboutPage() {
  return (
    <ScrollablePage>
      <div className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-red-500">About NAVADA</h1>

          <div className="space-y-8">
            <section>
              <p className="text-xl text-gray-300 mb-6">
                Welcome to NAVADA - the revolutionary micro-display operating system designed for the future of computing.
              </p>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To create the most advanced micro-display interface that brings full computing power to ultra-compact devices. We believe that the future of computing lies in miniaturization without compromise.
              </p>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">The Vision</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                NAVADA represents a paradigm shift in how we interact with technology. Our 64x96mm micro-display platform demonstrates that powerful computing experiences don't require large screens.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Ultra-compact form factor for maximum portability</li>
                <li>• Full-featured operating system in minimal space</li>
                <li>• Touch-optimized interface for micro interactions</li>
                <li>• Extensible app ecosystem for specialized applications</li>
              </ul>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Innovation at Scale</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-white">Hardware Excellence</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our custom-designed hardware platform leverages the latest ARM architecture with optimized power consumption and thermal management for sustained performance in ultra-compact environments.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3 text-white">Software Innovation</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    NAVADA OS is built from the ground up for micro-displays, featuring a completely reimagined user interface that maximizes functionality while maintaining intuitive operation.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Applications</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-medium text-white">Wearable Computing</h3>
                  <p className="text-gray-400 text-sm">Perfect for smartwatches, fitness devices, and augmented reality interfaces.</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-medium text-white">IoT Devices</h3>
                  <p className="text-gray-400 text-sm">Ideal for smart home controllers, industrial monitors, and embedded systems.</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-medium text-white">Medical Devices</h3>
                  <p className="text-gray-400 text-sm">Enabling precise control interfaces for medical equipment and patient monitoring.</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-medium text-white">Automotive</h3>
                  <p className="text-gray-400 text-sm">Compact displays for vehicle controls, navigation, and passenger entertainment.</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Team</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our team combines decades of experience in embedded systems, user interface design, and hardware engineering. We're passionate about pushing the boundaries of what's possible in micro-computing.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <h3 className="font-medium text-white">John Doe</h3>
                  <p className="text-gray-400 text-sm">CEO & Founder</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <h3 className="font-medium text-white">Jane Smith</h3>
                  <p className="text-gray-400 text-sm">CTO</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    MJ
                  </div>
                  <h3 className="font-medium text-white">Mike Johnson</h3>
                  <p className="text-gray-400 text-sm">Head of Design</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-red-900 to-red-800 p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Experience NAVADA?</h2>
              <p className="text-red-100 mb-6">
                Join our beta program and be among the first to experience the future of micro-computing.
              </p>
              <button className="bg-white text-red-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Get Early Access
              </button>
            </section>

            <div className="h-20"></div> {/* Bottom padding for scroll */}
          </div>
        </div>
      </div>
    </ScrollablePage>
  );
}