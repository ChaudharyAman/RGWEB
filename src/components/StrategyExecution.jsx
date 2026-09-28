import { motion } from "framer-motion";

export default function StrategyExecution() {
  return (
    <section className="relative bg-[#07152b] py-14 sm:py-16 overflow-hidden">
      {/* Background with Dark Navy Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/strategy-bg.jpg"
          alt="Resource Gateway Strategy to Execution"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07152b] via-[#07152b]/95 via-55% to-[#07152b]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-white mb-3">
              <span className="text-[#d8a85e] mr-2">—</span>
              From strategy to <span className="text-[#d8a85e]">execution.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              We partner with enterprises across industries to design, build and operate technology solutions with the right talent and delivery model.
            </p>

            <a
              href="#solutions"
              className="border border-white/50 hover:border-white text-white font-medium px-5 py-2.5 rounded-lg text-sm inline-flex items-center gap-2 hover:bg-white/10 transition-all duration-200"
            >
              <span>View Our Solutions</span>
              <span className="text-base leading-none">→</span>
            </a>
          </motion.div>

          {/* Right Column: PEOPLE PLATFORMS PERFORMANCE matching Image 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start md:items-end justify-center"
          >
            <div className="border-l-2 md:border-l-0 md:border-r-2 border-[#d8a85e] pl-4 md:pl-0 md:pr-4 py-1 space-y-1">
              <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase">
                PEOPLE
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#d8a85e] uppercase">
                PLATFORMS
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-300 uppercase">
                PERFORMANCE
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
