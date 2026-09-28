import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const capabilities = [
  {
    title: "Cloud & Infrastructure",
    href: "#cloud-services",
    iconClass: "group-hover:text-cyan-300 group-hover:scale-115 transition-all duration-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "Software Engineering",
    href: "#software-product-engineering",
    iconClass: "group-hover:text-amber-300 group-hover:scale-115 transition-all duration-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Data & AI",
    href: "#ai",
    iconClass: "group-hover:text-emerald-300 group-hover:scale-115 transition-all duration-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Managed Services",
    href: "#dedicated-teams",
    iconClass: "group-hover:text-purple-300 group-hover:scale-115 transition-all duration-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Cyber Security",
    href: "#services",
    iconClass: "group-hover:text-blue-400 group-hover:scale-115 transition-all duration-300",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Enterprise Solutions",
    href: "#solutions",
    iconClass: "group-hover:text-[#d8a85e] group-hover:rotate-180 transition-all duration-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = "lalit@resourcegateway.in";
  const phone = "+91 9818648467";

  return (
    <section id="hero" className="relative mt-14 sm:mt-16 min-h-[515px] md:min-h-[545px] lg:min-h-[612px] flex items-center bg-[#07152b] overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Resource Gateway Enterprise Tech Collaboration"
          className="w-full h-full object-cover object-[center_30%] md:object-right opacity-85"
        />
        {/* Navy Gradient Overlay to ensure crisp legibility on left & highlight team on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07152b] via-[#07152b]/95 via-45% to-[#07152b]/60 sm:to-[#07152b]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152b] via-transparent to-[#07152b]/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-[50px] sm:py-[64px] lg:py-[76px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Left Content */}
          <div className="lg:col-span-7 xl:col-span-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#d8a85e] uppercase mb-3.5">
                <span>TECHNOLOGY</span>
                <span className="text-white/40">·</span>
                <span>TALENT</span>
                <span className="text-white/40">·</span>
                <span>TRANSFORMATION</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold text-white font-serif-display leading-[1.14] mb-4.5 tracking-tight">
                Build what’s next.<br />
                <span className="text-[#d8a85e] font-serif-display italic md:not-italic font-normal">
                  With the right people.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] max-w-xl leading-relaxed mb-7 font-light">
                From vision to execution, enabling enterprises to scale through the right mix of people, platforms, and performance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-7">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#d4a259] hover:bg-[#c39145] text-[#07152b] font-semibold px-6 py-3 rounded-lg text-sm sm:text-base inline-flex items-center gap-2 shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Talk to Experts</span>
                  <span className="text-base leading-none">→</span>
                </button>

                <a
                  href="#services"
                  className="border border-white/40 hover:border-white text-white font-medium px-6 py-3 rounded-lg text-sm sm:text-base inline-flex items-center gap-2 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore Services</span>
                  <span className="text-base leading-none">→</span>
                </a>
              </div>

              {/* Trust line under buttons */}
              <p className="text-xs sm:text-sm text-slate-300/90 font-normal">
                Trusted by enterprises to deliver people, platforms, and outcomes.
              </p>
            </motion.div>
          </div>

          {/* Right Floating Transparent & Animated Capabilities Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end relative">
            {/* Ambient Pulsing Glow Aura */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#38bdf8]/20 via-[#c89b4e]/20 to-[#80142a]/30 rounded-3xl blur-2xl opacity-60 animate-pulse pointer-events-none" />

            {/* Floating Glassmorphic Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotate: [0, 0.4, -0.4, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              className="relative w-full max-w-[310px] sm:max-w-[330px] rounded-2xl bg-slate-900/35 backdrop-blur-xl border border-white/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Shimmer Light Beam Sweep */}
              <motion.div
                className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none -rotate-45"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />

              <div className="space-y-3 relative z-10">
                {capabilities.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.07 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3.5 py-2 px-3 rounded-xl hover:bg-white/12 text-white/90 hover:text-white group transition-all duration-200 cursor-pointer border border-transparent hover:border-white/15"
                  >
                    <span className={`text-white/80 ${item.iconClass} flex-shrink-0`}>
                      {item.icon}
                    </span>
                    <span className="text-sm sm:text-[15px] font-medium tracking-wide">
                      {item.title}
                    </span>
                    <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#d8a85e] transition-all duration-200 font-bold">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal for Talk to Experts */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-gray-100"
            >
              <div className="p-6 bg-gradient-to-r from-[#07152b] to-[#0f2244] text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif-display">Talk to Our Experts</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-300 hover:text-white text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5">
                  Connect with our enterprise advisors for tailored talent & engineering solutions.
                </p>
              </div>

              <div className="p-6 space-y-4">
                <a
                  href={`mailto:${email}?subject=Resource%20Gateway%20Expert%20Consultation`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-[#c89b4e] hover:bg-amber-50/40 transition-all group"
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="mr-4 p-3 bg-amber-100/60 rounded-xl text-[#b47e28]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-[#b47e28]">Send an Email</p>
                    <p className="text-sm text-slate-500">{email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-[#80142a] hover:bg-rose-50/40 transition-all group"
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="mr-4 p-3 bg-rose-100/60 rounded-xl text-[#80142a]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-[#80142a]">Direct Call</p>
                    <p className="text-sm text-slate-500">{phone}</p>
                  </div>
                </a>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}