import { motion } from "framer-motion";
import CountUp from 'react-countup';

export default function Stats() {
  const stats = [
    { value: 15, label: "Years of Experience", suffix: "+" },
    { value: 500, label: "Consultants", suffix: "+" },
    { value: 95, label: "Repeat Client", suffix: "%" },
    { value: 100, label: "Client Satisfaction", suffix: "%" }
  ];

  return (
    <section className="section py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-95"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Our <span className="text-yellow-300">Achievements</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              </div>
              <h3 className="text-xl font-semibold">{stat.label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}