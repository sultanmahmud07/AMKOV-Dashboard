import  { useState } from 'react';
import { Shield, FileText, Lock, Calendar } from 'lucide-react';

const PrivacyTerms = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-950 py-12 md:py-20 transition-colors duration-300">
      <div className="main-container ">
        
        {/* === Header Section === */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] dark:text-white mb-4">
            Legal Center
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please read our terms and policies carefully to understand how we operate.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
             <Calendar size={14} />
             <span>Last Updated: December 24, 2025</span>
          </div>
        </div>

        {/* === Tab Switcher === */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-900 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 inline-flex">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === 'privacy'
                  ? 'bg-[#FA4318] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              <Shield size={18} />
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === 'terms'
                  ? 'bg-[#FA4318] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              <FileText size={18} />
              Terms of Service
            </button>
          </div>
        </div>

        {/* === Content Area === */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          
          {activeTab === 'privacy' ? (
            // === Privacy Policy Content ===
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
              <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="text-[#FA4318]" size={24} />
                  1. Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us when you create an account, request a delivery, or communicate with us. This includes:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Personal identification (Name, Email, Phone Number)</li>
                    <li>Delivery details (Sender/Receiver addresses)</li>
                    <li>Payment information (Processed securely via Stripe/PayPal)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                  2. How We Use Your Data
                </h2>
                <p>
                  Your data is primarily used to facilitate parcel deliveries. We may also use it to send tracking updates, improve our platform, and prevent fraud. We <strong>never</strong> sell your personal data to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                  3. Cookies & Tracking
                </h2>
                <p>
                  We use cookies to remember your preferences and keep you logged in. You can disable cookies in your browser settings, but some features of DropX may not function correctly.
                </p>
              </div>
            </div>
          ) : (
            // === Terms of Service Content ===
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
               <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using DropX, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                  2. User Responsibilities
                </h2>
                <p>
                  You are responsible for ensuring that parcels sent through our service comply with all local and international laws. Prohibited items include illegal substances, weapons, and hazardous materials.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                  3. Liability Limitation
                </h2>
                <p>
                  DropX is not liable for indirect, incidental, or consequential damages arising from lost or delayed parcels beyond the declared insurance value chosen at checkout.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                  4. Termination
                </h2>
                <p>
                  We reserve the right to terminate or suspend your account immediately, without prior notice, if you breach these Terms.
                </p>
              </div>
            </div>
          )}

          {/* Footer of the card */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              For any legal questions, please contact <a href="mailto:legal@dropx.com" className="text-[#FA4318] hover:underline">legal@dropx.com</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyTerms;