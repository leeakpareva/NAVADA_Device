'use client';

import ScrollablePage from '@/components/layout/ScrollablePage';

export default function AboutPage() {
  return (
    <ScrollablePage>
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-8 pt-2">
          <div className="space-y-8 text-white leading-relaxed">

            <section>
              <h1 className="text-3xl font-bold mb-6">ABOUT RAVEN</h1>
              <p className="mb-4">
                RAVEN is a builder focused initiative designed to make artificial intelligence, edge computing, and modern hardware accessible to everyone.
              </p>
              <p className="mb-4">
                RAVEN is not a finished product.<br />
                It is a gateway.
              </p>
              <p className="mb-4">
                The project exists to help people learn by building using real hardware, real code, and real world constraints. In an era dominated by abstract AI tools, RAVEN brings learning back to the edge where computation meets the physical world.
              </p>
              <p>
                At its core, RAVEN is a 360 degree learning and creation gateway powered by Raspberry Pi, designed to teach the future of technology through hands on experimentation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">THE RAVEN DEVICE</h2>
              <p className="mb-4">The RAVEN device is built using:</p>
              <ul className="space-y-2 ml-6 mb-4">
                <li>• Raspberry Pi 4B</li>
                <li>• OSOYOO 3.5 inch touch screen</li>
                <li>• Custom 3D printed enclosure and hardware</li>
                <li>• Local and edge first AI workflows</li>
                <li>• Secure connectivity to initiative servers</li>
              </ul>
              <p className="mb-4">
                The physical case and supporting hardware are fully 3D printed. All design files have been created to encourage learning, modification, and experimentation.
              </p>
              <p className="mb-4">
                When users sign up, the complete set of STL files is provided free of charge, allowing anyone to print, modify, and rebuild the device independently.
              </p>
              <p className="mb-4">This setup enables users to:</p>
              <ul className="space-y-2 ml-6">
                <li>• Build and run AI models locally</li>
                <li>• Experiment with edge computing</li>
                <li>• Learn systems thinking across hardware, software, and AI</li>
                <li>• Prototype real world intelligent systems</li>
                <li>• Understand how modern AI works end to end</li>
              </ul>
              <p className="mt-4">
                RAVEN is designed for students, creatives, engineers, artists, and curious minds. No prior experience is required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">THE RAVEN INITIATIVE AND SERVERS</h2>
              <p className="mb-4">
                RAVEN extends beyond the physical device.
              </p>
              <p className="mb-4">
                The initiative servers provide a support layer that includes learning packs, guided challenges, AI models optimized for edge use, experimentation tooling, and community driven knowledge sharing.
              </p>
              <p>
                This hybrid approach combining a local device with connected infrastructure prepares builders for the future of technology where intelligence is distributed, private, efficient, and close to the real world.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">LEAD DEVELOPER AND DESIGNER</h2>
              <p className="mb-2 font-semibold">Leslie Akpareva, MBA, MA</p>
              <p className="mb-4 italic">Lead Developer and Designer</p>
              <p className="mb-4">
                Leslie Akpareva is a builder, AI engineer, and systems thinker working at the intersection of artificial intelligence, hardware, design, and real world impact.
              </p>
              <p>
                His work focuses on removing barriers to advanced technology by turning learning into a tactile, transparent, and practical process. RAVEN reflects a belief that the future belongs to people who build, break, and rebuild systems rather than simply use them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">PROJECT SPONSOR</h2>
              <p className="mb-2 font-semibold">Chopstix</p>
              <p className="mb-4 italic">Music Producer and Creative Sponsor</p>
              <p className="mb-4">
                Chopstix is an established music producer known for blending creativity with technology. As project sponsor, he brings a creative first perspective to RAVEN, ensuring the initiative speaks not only to engineers but also to artists, creators, and cultural innovators.
              </p>
              <p>
                His involvement reinforces the idea that AI and technology are creative instruments shaping the future of culture, not just technical tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">AN OPEN INVITATION</h2>
              <p className="mb-4">
                RAVEN is built on a simple belief.
              </p>
              <p className="mb-4 text-xl font-medium">
                Anyone can learn to build the future.
              </p>
              <p className="mb-4">
                If you are curious about AI, edge computing, hardware, or the future of technology, RAVEN is for you.
              </p>
              <p className="mb-4">
                Sign up today to receive a free RAVEN starter pack within 72 hours.<br />
                This includes access to learning materials, server resources, and the full set of 3D printable STL files for the RAVEN device.
              </p>
              <p className="text-lg font-medium">
                No cost. No gatekeeping. Just an invitation to build.
              </p>
            </section>

            <div className="h-20"></div> {/* Bottom padding for scroll */}
          </div>
        </div>
      </div>
    </ScrollablePage>
  );
}