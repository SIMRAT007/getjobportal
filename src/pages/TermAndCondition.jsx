import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="md:max-w-[80%] mx-auto px-4 py-10 border border-gray-200 shadow-lg rounded-xl mt-10 lg:shadow-none lg:border-none max-md:w-[98%] bg-white px-20 max-md:px-5">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
        Terms and Conditions for Destiny Jobs
      </h1>

      <h2 className="text-lg font-medium text-gray-500 mb-8 text-center pb-4 border-b">
        Please read these terms and conditions carefully before using Our Service.
      </h2>

      <section className="space-y-8 text-gray-700 text-base leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Introduction</h2>
          <p>
            Welcome to our application. By accessing or using this platform, you agree to be bound
            by these Terms and Conditions. Please read them carefully.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">2. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password
            and for restricting access to your device. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Content Ownership</h2>
          <p>
            All content provided on this platform is the intellectual property of the company or
            used with permission. Unauthorized use of any materials may violate copyright laws.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Limitation of Liability</h2>
          <p>
            We are not liable for any damages resulting from your use of or inability to use our
            services. We do not guarantee that the services will be available at all times.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of your
            jurisdiction, without regard to its conflict of law provisions.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. It is your
            responsibility to review them periodically.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Others</h2>
          <p>
            Country refers to: Saskatchewan, Canada <br />
            Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Destiny Jobs.
            Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.<br />
            Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.<br />
            Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service. <br />
            Website refers to Destiny Jobs, accessible from <b className="text-blue-600 underline">https://destinyjobs.ca/</b><br />
            You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">8. Acknowledgment</h2>
          <p>
            These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.
            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
            By accessing or using the Service You agree to be bound by these Terms and Conditions.
            You represent that you are over the age of 18.
            Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">9. Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
            The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party websites or services.
            We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">10. Termination</h2>
          <p>
            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever.
            Upon termination, Your right to use the Service will cease immediately.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">11. Limitation of Liability</h2>
          <p>
            The entire liability of the Company shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
            To the maximum extent permitted by applicable law, the Company shall not be liable for any special, incidental, indirect, or consequential damages.
          </p>
        </div>

        <div>
          <p className="bg-gray-50 rounded p-4 text-gray-600 border border-gray-100">
            <span className="font-semibold">"AS IS" and "AS AVAILABLE" Disclaimer :</span> <br />
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.
            The Company disclaims all warranties including those of merchantability, fitness for a particular purpose, and non-infringement.
            Some jurisdictions do not allow these exclusions, so they may not apply to You.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">12. Governing Law</h2>
          <p>
            The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">13. Disputes Resolution </h2>
          <p>
            If You have any concern or dispute about the Service, You agree to try to resolve the dispute informally by contacting the Company.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">14. For European Union (EU) Users </h2>
          <p>
            If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
            <span className="block mt-2 font-semibold">United States Legal Compliance</span>
            You represent and warrant that:
            <ul className="list-disc pl-6 mt-1">
              <li>You are not located in a country that is subject to the United States government embargo.</li>
              <li>You are not listed on any United States government list of prohibited or restricted parties.</li>
            </ul>
          </p>
        </div>

        <div>
          <p className="bg-gray-50 rounded p-4 text-gray-600 border border-gray-100">
            <span className="font-semibold">Changes to These Terms and Conditions</span><br />
            We may modify or replace these Terms at any time.<br />
            By continuing to access or use Our Service after changes become effective, You agree to be bound by the revised terms.
          </p>
        </div>

        <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about these Terms and Conditions, You can contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a href="mailto:Destinyjobsca@gmail.com" 
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 hover:text-blue-600">Destinyjobsca@gmail.com</span>
                  </a>
                  <a href="tel:+16397470999" 
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700 hover:text-blue-600">+1 (639) 747-0999</span>
                  </a>
                  <a href="https://destinyjobs.ca/contact" 
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-gray-700 hover:text-blue-600">Visit Our Website</span>
                  </a>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">514 Cory Cres S, Saskatoon, SK S0k 2T0</span>
                  </div>
                </div>
              </motion.div>

        <p className="text-xs text-gray-400 mt-10 text-center">
          Last updated on: June 16, 2025
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
