import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const email = "lalit@resourcegateway.in";
  const phone = "+91 9818648467";

  return (
    <section className="section relative mt-10 py-12 md:py-20 lg:py-32 overflow-x-hidden overflow-y-visible min-h-[80vh] md:min-h-screen bg-white">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute -top-20 -left-20 md:-top-32 md:-left-32 w-64 h-64 md:w-96 md:h-96 bg-linear-to-r from-blue-100 to-purple-100 rounded-full blur-2xl md:blur-3xl opacity-70"
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute -bottom-20 -right-20 md:-bottom-32 md:-right-32 w-64 h-64 md:w-96 md:h-96 bg-linear-to-r from-purple-100 to-pink-100 rounded-full blur-2xl md:blur-3xl opacity-70"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Headline */}
            <div className="overflow-visible py-2 px-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {/* Mobile Layout */}
                <div className="flex flex-col items-center gap-4 sm:hidden">
                  <span className="text-blue-800 bg-clip-text">
                    Technology
                  </span>

                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-gray-500 text-xs"
                    />
                    <span className="text-blue-800 bg-clip-text">
                      Talent
                    </span>
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-gray-500 text-xs"
                    />
                  </div>

                  <span className="text-blue-800 bg-clip-text">
                    Transformation
                  </span>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-center gap-x-3 md:gap-x-5 whitespace-nowrap">
                  <span className="text-blue-800 bg-clip-text">
                    Technology
                  </span>

                  <FontAwesomeIcon
                    icon={faAsterisk}
                    className="text-gray-500 text-[8px] leading-none"
                  />

                  <span className="text-blue-800 bg-clip-text">
                    Talent
                  </span>

                  <FontAwesomeIcon
                    icon={faAsterisk}
                    className="text-gray-500 text-[8px] leading-none"
                  />

                  <span className="text-blue-800 bg-clip-text">
                    Transformation
                  </span>
                </div>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto px-4">
              From vision to execution — enabling enterprises to scale through
              the right mix of people, platforms, and performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <a
                href="#about"
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-1 text-sm md:text-base text-center"
              >
                Who We Are
              </a>

              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 md:px-8 md:py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-sm md:text-base"
              >
                Talk to Experts
              </button>
            </div>

            {/* Popup Modal */}
            {open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-2xl"
                  onClick={() => setOpen(false)}
                />
                
                {/* Modal Content */}
                <div className="relative bg-white/30  rounded-xl shadow-2xl max-w-sm w-full">
                  {/* Header */}
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-gray-900">Contact Our Experts</h3>
                    <p className="text-gray-600 mt-1">Choose how you'd like to connect</p>
                  </div>

                  {/* Contact Options */}
                  <div className="p-6 space-y-4">
                    {/* Email Option */}
                    <a
                      href={`mailto:${email}?subject=Expert Consultation`}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="mr-4 p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600">Send Email</p>
                        <p className="text-sm text-gray-600">{email}</p>
                      </div>
                    </a>

                    {/* Phone Option */}
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="mr-4 p-2 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-green-600">Call Now</p>
                        <p className="text-sm text-gray-600">{phone}</p>
                      </div>
                    </a>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t bg-gray-50/30 rounded-b-xl">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Text */}
            <p className="mt-12 md:mt-16 text-xs md:text-sm text-gray-500 tracking-wide px-4">
              Trusted by enterprises to deliver people, platforms, and outcomes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}