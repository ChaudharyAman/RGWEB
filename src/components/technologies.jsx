import { motion } from "framer-motion";

const technologies = [
  {
    name: "Cloud",
    id: "cloud-technologies",
    code: "C",
    description: "Access to scalable resources, storage, and services",
  },
  {
    name: "Mobility",
    id: "mobility",
    code: "M",
    description: "Mobility refers to the ability to access and use information",
  },
  {
    name: "Web Technologies",
    id: "web-technologies",
    code: "W",
    description: "Seamless online communication, collaboration, and IT",
  },
  {
    name: "ERP",
    id: "erp-technologies",
    code: "E",
    description: "Integrates core business processes and functions",
  },
  {
    name: "Data Technologies",
    id: "data-technologies",
    code: "D",
    description: "Advanced data processing and analytics solutions",
  },
  {
    name: "ETL Technologies",
    id: "etl-technologies",
    code: "E",
    description: "Efficient data extraction, transformation, and loading",
  },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-9">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900 mb-4"
          >
            Technologies We <span className="text-[#c89b4e]">Master</span>
          </motion.h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From modern cloud architectures to enterprise ERPs and cutting-edge data solutions, we deliver engineering proficiency across all in-demand platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              id={tech.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/90 shadow-xs hover:border-[#c89b4e] hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#07152b] text-white flex items-center justify-center font-bold text-sm tracking-wider group-hover:bg-[#80142a] transition-colors mb-4">
                {tech.code}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-[#80142a] transition-colors">
                {tech.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}