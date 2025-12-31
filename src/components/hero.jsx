import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
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
                  <span className="bg-linear-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent text-4xl">
                    Technology
                  </span>

                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-gray-500 text-xs"
                    />
                    <span className="bg-linear-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent text-4xl">
                      Talent
                    </span>
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-gray-500 text-xs"
                    />
                  </div>

                  <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-4xl">
                    Transformation
                  </span>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-center gap-x-3 md:gap-x-5 whitespace-nowrap">
                  <span className=" text-blue-800 bg-clip-text">
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

              <a
                href="#contact"
                className="px-6 py-3 md:px-8 md:py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-sm md:text-base text-center"
              >
                Talk to Experts
              </a>
            </div>

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
