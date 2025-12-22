import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="section relative py-20 md:py-32 overflow-x-hidden overflow-y-visible bg-white">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-linear-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-linear-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="overflow-visible py-2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.25]">
                <span className="inline-flex items-center justify-center gap-x-5 whitespace-nowrap">
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Technology
                  </span>
                  <span className="w-3 h-3 rounded-full bg-gray-600 shrink-0" />
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Talent
                  </span>
                  <span className="w-3 h-3 rounded-full bg-gray-600 shrink-0" />
                  <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Transformation
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              From vision to execution — enabling enterprises to scale through
              the right mix of people, platforms, and performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#about"
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-1"
              >
                Who We Are
              </a>

              <a
                href="#contact"
                className="px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                Talk to Experts
              </a>
            </div>

            {/* 👇 NARRATIVE HANDOFF */}
            <p className="mt-16 text-sm text-gray-500 tracking-wide">
              Trusted by enterprises to deliver people, platforms, and outcomes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
