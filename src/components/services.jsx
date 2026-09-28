import { motion } from "framer-motion";

const services = [
  {
    title: "Software Product Engineering",
    id: "software-product-engineering",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#80142a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Dedicated Software Teams",
    id: "dedicated-teams",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#c89b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "QA & Testing",
    id: "qa-testing",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#80142a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Application Development",
    id: "app-development",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#c89b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "E-Commerce",
    id: "ecommerce",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#80142a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: "Data Engineering",
    id: "data-engineering",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#c89b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "Artificial Intelligence",
    id: "ai",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#80142a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Cloud Services",
    id: "cloud-services",
    desc: "Enterprise-grade solutions built for scale, performance, and reliability.",
    icon: (
      <svg className="w-6 h-6 text-[#c89b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  }
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 bg-[#f8f9fa] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-9">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#80142a] uppercase mb-3">
            {/* <span>WHAT WE DELIVER</span> */}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900 mb-4">
            Our <span className="text-[#c89b4e]">Services</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enterprise-grade solutions engineered for scale, reliability, and measurable business performance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              id={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="bg-white p-6 rounded-xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-[#c89b4e]/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4.5 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-[#80142a] transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
