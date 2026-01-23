import { motion } from "framer-motion";

const technologies = [
  {
    name: "Cloud",
    description: "Access to scalable resources, storage, and services"
  },
  {
    name: "Mobility",
    description: "Mobility refers to the ability to access and use information"
  },
  {
    name: "Web Technologies",
    description: "Seamless online communication, collaboration, and IT"
  },
  {
    name: "ERP",
    description: "Integrates core business processes and functions"
  },
  {
    name: "Data Technologies",
    description: "Advanced data processing and analytics solutions"
  },
  {
    name: "ETL Technologies",
    description: "Efficient data extraction, transformation, and loading"
  }
];

export default function Technologies() {
  return (
    <section className="section py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Technologies We <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Use</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get what you are looking for to fulfill your software development and outsourcing needs at ResourceGateway, with our expertise on all in-demand technologies & platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{tech.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
            View All Technologies
          </button> */}
        </div>
      </div>
    </section>
  );
}