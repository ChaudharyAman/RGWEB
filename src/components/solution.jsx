import { motion } from "framer-motion";

const solutions = [
  "Human Resource Management",
  "Supply Chain Management",
  "Fleet Management",
  "Operations Management",
  "Financial Management",
  "Workforce Management",
  "CRM Solutions",
  "Web Portals",
  "Content Management System",
  "Document Management",
  "E-Learning Solutions",
  "Asset Management"
];

export default function Solutions() {
  return (
    <section className="section py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Solutions We <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Deliver</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Drawing on our software proficiency, we architect dynamic, dependable, and resilient tech solutions, bolstering businesses across diverse landscapes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="glass p-6 rounded-xl cursor-pointer border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{solution.charAt(0)}</span>
                </div>
                <h3 className="font-bold">{solution}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Professional {solution.toLowerCase()} solutions tailored for business efficiency.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}