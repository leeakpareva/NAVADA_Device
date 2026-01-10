'use client';

import { useState } from 'react';
import ScrollablePage from '@/components/layout/ScrollablePage';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ScrollablePage>
      <div className="bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Sign Up for NAVADA</h1>

          <div className="space-y-8">
            <section>
              <p className="text-xl text-gray-300 mb-6">
                Join the waitlist for early access to NAVADA OS, development kits, and exclusive updates.
              </p>
            </section>

            <div className="bg-gray-900 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Early Access Program</h2>
              <p className="text-gray-300 mb-6">
                Get priority access to hardware kits, beta software releases, and developer resources.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="">Select an option</option>
                    <option value="development">App Development</option>
                    <option value="hardware">Hardware Integration</option>
                    <option value="research">Research & Education</option>
                    <option value="commercial">Commercial Applications</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 rounded-md transition-colors"
                >
                  Join Waitlist
                </button>
              </form>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">What You'll Get</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">🎯 Early Access</h3>
                  <p className="text-gray-400 text-sm">Be among the first to receive NAVADA development hardware and software releases.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">📚 Documentation</h3>
                  <p className="text-gray-400 text-sm">Complete technical documentation, APIs, and development guides.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">🛠️ Developer Tools</h3>
                  <p className="text-gray-400 text-sm">Full SDK, IDE, simulator, and debugging tools for rapid development.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">👥 Community</h3>
                  <p className="text-gray-400 text-sm">Access to exclusive developer forums and direct support channels.</p>
                </div>
              </div>
            </div>

            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </ScrollablePage>
  );
}