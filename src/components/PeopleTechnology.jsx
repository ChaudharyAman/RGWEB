import { motion } from "framer-motion";

export default function PeopleTechnology() {
  const cards = [
    {
      id: "software-engineering",
      icon: (
        <svg className="w-9 h-9 text-[#80142a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Software Engineering",
      desc: "Build and scale high-performing engineering teams for modern applications, platforms and digital transformation.",
      accentColor: "#80142a",
      accentBg: "bg-[#80142a]",
      textColor: "text-[#80142a]",
      href: "#software-product-engineering",
    },
    {
      id: "cloud-ai",
      icon: (
        <svg className="w-9 h-9 text-[#c89b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Cloud & AI",
      desc: "Accelerate innovation with cloud, DevOps, data and AI solutions designed for real business outcomes.",
      accentColor: "#c89b4e",
      accentBg: "bg-[#c89b4e]",
      textColor: "text-[#c89b4e]",
      href: "#ai",
    },
    {
      id: "enterprise-solutions",
      icon: (
        <svg className="w-9 h-9 text-[#80142a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Enterprise Solutions",
      desc: "Deliver end-to-end technology and managed services across infrastructure, security, and business applications.",
      accentColor: "#80142a",
      accentBg: "bg-[#80142a]",
      textColor: "text-[#80142a]",
      href: "#solutions",
    },
  ];

  return (
    <section id="approach" className="py-10 sm:py-14 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900 leading-[1.18] mb-5">
                People and technology<br />
                working <span className="text-[#c89b4e]">together.</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-7 font-normal">
                Resource Gateway helps businesses grow by aligning people, technology, and processes to deliver measurable, reliable outcomes at enterprise scale.
              </p>

              <a
                href="#about"
                className="bg-[#80142a] hover:bg-[#681022] text-white px-6 py-2.5 rounded-md font-medium text-sm inline-flex items-center gap-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Our Approach</span>
                <span className="text-base leading-none">→</span>
              </a>
            </motion.div>
          </div>

          {/* Right Cards Column (3 side-by-side cards) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="p-6 sm:p-7">
                    {/* Icon */}
                    <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {card.desc}
                    </p>

                    {/* Link */}
                    <a
                      href={card.href}
                      className={`inline-flex items-center gap-1.5 ${card.textColor} text-xs sm:text-sm font-semibold hover:gap-2.5 transition-all duration-200`}
                    >
                      <span>Learn More</span>
                      <span className="text-base leading-none">→</span>
                    </a>
                  </div>

                  {/* Colored Bottom Accent Bar matching Image 1 */}
                  <div className={`h-1.5 w-full ${card.accentBg}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
