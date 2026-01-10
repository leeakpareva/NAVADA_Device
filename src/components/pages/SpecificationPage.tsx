'use client';

import ScrollablePage from '@/components/layout/ScrollablePage';

export default function SpecificationPage() {
  return (
    <ScrollablePage>
      <div className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Specifications</h1>

          <div className="space-y-8">
            <section>
              <p className="text-xl text-gray-300 mb-6">
                Complete technical specifications and requirements for NAVADA OS and compatible hardware platforms.
              </p>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Display Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Physical Dimensions</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Screen Size: 64mm × 96mm</li>
                    <li>• Aspect Ratio: 2:3 (Portrait)</li>
                    <li>• Thickness: 2.5mm maximum</li>
                    <li>• Bezel Width: 2mm on all sides</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-3">Display Technology</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Technology: OLED or E-Ink</li>
                    <li>• Resolution: 480 × 720 pixels</li>
                    <li>• Pixel Density: 300 PPI</li>
                    <li>• Color Depth: 16-bit or Monochrome</li>
                    <li>• Refresh Rate: 60Hz (OLED) / 1Hz (E-Ink)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Hardware Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Minimum Requirements</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• CPU: ARM Cortex-M7 @ 400MHz</li>
                    <li>• RAM: 512MB LPDDR4</li>
                    <li>• Storage: 4GB eMMC</li>
                    <li>• GPU: Integrated 2D accelerator</li>
                    <li>• Power: 3.7V Li-Po, 150mAh</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-3">Recommended Specifications</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• CPU: ARM Cortex-A55 @ 1.2GHz</li>
                    <li>• RAM: 1GB LPDDR4X</li>
                    <li>• Storage: 8GB eMMC + microSD</li>
                    <li>• GPU: Mali-G52 MP1</li>
                    <li>• Power: 3.7V Li-Po, 300mAh</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Connectivity & I/O</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Wireless</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Wi-Fi 802.11n/ac</li>
                    <li>• Bluetooth 5.2 LE</li>
                    <li>• NFC (Optional)</li>
                    <li>• LoRa (Optional)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-3">Wired Interfaces</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• USB-C (Power + Data)</li>
                    <li>• I2C (Expansion)</li>
                    <li>• SPI (Sensors)</li>
                    <li>• UART (Debug)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-3">Sensors</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Accelerometer</li>
                    <li>• Gyroscope</li>
                    <li>• Magnetometer</li>
                    <li>• Ambient Light</li>
                    <li>• Temperature</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Software Platform</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-3">NAVADA OS Core</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Based on Linux kernel 5.15+ with real-time patches</p>
                      <ul className="space-y-1 text-gray-400 text-sm">
                        <li>• Custom window manager</li>
                        <li>• Touch gesture recognition</li>
                        <li>• Power management</li>
                        <li>• Security framework</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Application Framework</p>
                      <ul className="space-y-1 text-gray-400 text-sm">
                        <li>• React-based UI framework</li>
                        <li>• WebAssembly runtime</li>
                        <li>• Native C/C++ SDK</li>
                        <li>• JavaScript APIs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="font-medium text-white mb-3">Performance Characteristics</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">&lt; 1s</div>
                      <p className="text-gray-400 text-sm">Boot Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">60 FPS</div>
                      <p className="text-gray-400 text-sm">UI Refresh</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">&lt; 50ms</div>
                      <p className="text-gray-400 text-sm">Touch Latency</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">72h</div>
                      <p className="text-gray-400 text-sm">Battery Life</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Environmental Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Operating Conditions</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Temperature: -10°C to +60°C</li>
                    <li>• Humidity: 5% to 95% RH</li>
                    <li>• Altitude: 0 to 3000m</li>
                    <li>• Vibration: 10-500Hz, 2G</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-3">Protection Ratings</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• IP65: Dust and water resistant</li>
                    <li>• IK07: Impact resistance</li>
                    <li>• EMC: Class B emissions</li>
                    <li>• Safety: IEC 62368-1</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Development Tools</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">SDK & Tools</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• NAVADA Studio IDE</li>
                    <li>• Visual UI Designer</li>
                    <li>• Hardware Simulator</li>
                    <li>• Performance Profiler</li>
                    <li>• Remote Debugging</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-3">Supported Languages</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• C/C++ (Native)</li>
                    <li>• JavaScript/TypeScript</li>
                    <li>• Python (Embedded)</li>
                    <li>• Rust (Experimental)</li>
                    <li>• Assembly (Low-level)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Build?</h2>
              <p className="text-gray-200 mb-6">
                Download the complete technical documentation and development kit.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Download SDK
                </button>
                <button className="border border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-black transition-colors">
                  Hardware Kit
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