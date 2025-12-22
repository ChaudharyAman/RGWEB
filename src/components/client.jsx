
import { motion } from "framer-motion";

export default function Clients() {
  // Mock client logos - in real app, use actual client logos
  const clients = Array.from({ length: 8 }, (_, i) => `Client ${i + 1}`);

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
            Our <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies across various industries worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="h-24 bg-gray-50 rounded-xl flex items-center justify-center p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm font-medium text-gray-700">{client}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}