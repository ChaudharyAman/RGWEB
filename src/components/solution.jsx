import { motion } from "framer-motion";

const solutions = [
  {
    title: "Human Resource Management",
    id: "hr-management",
    code: "H",
    desc: "Professional human resource management solutions tailored for business efficiency.",
  },
  {
    title: "Supply Chain Management",
    id: "supply-chain",
    code: "S",
    desc: "Professional supply chain management solutions tailored for business efficiency.",
  },
  {
    title: "Operations Management",
    id: "operations",
    code: "O",
    desc: "Professional operations management solutions tailored for business efficiency.",
  },
  {
    title: "Financial Management",
    id: "financial-management",
    code: "F",
    desc: "Professional financial management solutions tailored for business efficiency.",
  },
  {
    title: "Workforce Management",
    id: "workforce-management",
    code: "W",
    desc: "Professional workforce management solutions tailored for business efficiency.",
  },
  {
    title: "CRM Solutions",
    id: "crm",
    code: "C",
    desc: "Professional crm solutions tailored for business efficiency.",
  },
  {
    title: "Web Portals",
    id: "web-portals",
    code: "W",
    desc: "Professional web portals solutions tailored for business efficiency.",
  },
  {
    title: "Content Management System",
    id: "cms",
    code: "C",
    desc: "Professional content management system solutions tailored for business efficiency.",
  },
  {
    title: "Document Management",
    id: "document-management",
    code: "D",
    desc: "Professional document management solutions tailored for business efficiency.",
  },
  {
    title: "E-Learning Solutions",
    id: "elearning",
    code: "E",
    desc: "Professional e-learning solutions tailored for business efficiency.",
  },
  {
    title: "Asset Management",
    id: "asset-management",
    code: "A",
    desc: "Professional asset management solutions tailored for business efficiency.",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-9">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900 mb-3"
          >
            Solutions We <span className="text-[#c89b4e]">Deliver</span>
          </motion.h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Drawing on our software proficiency, we architect dynamic, dependable, and resilient tech solutions, bolstering businesses across diverse landscapes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              id={solution.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="p-5.5 rounded-xl border border-gray-200/90 bg-white hover:border-[#c89b4e] hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span className="w-9 h-9 rounded-lg bg-[#07152b] text-white flex items-center justify-center font-bold text-sm tracking-wider group-hover:bg-[#80142a] transition-colors">
                    {solution.code}
                  </span>
                </div>

                <h3 className="font-bold text-[15px] sm:text-base text-slate-900 mb-2 leading-snug group-hover:text-[#80142a] transition-colors">
                  {solution.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {solution.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}