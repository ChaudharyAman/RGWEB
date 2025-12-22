import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Who We <span className="gradient-text">Are</span>
          </h2>

          <p className="text-gray-600 mb-4">
            That trust is built on execution. Resource Gateway helps businesses
            grow by aligning people, technology, and processes to deliver
            measurable, reliable outcomes at enterprise scale.
          </p>

          <p className="text-gray-600">
            Established in 2011, we support organizations across PAN India,
            Africa, and global markets, enabling transformation across telecom,
            IT, cloud, and enterprise ecosystems.
          </p>
        </motion.div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-6">
          {[
            ["15+ Years", "Proven Industry Experience"],
            ["PAN India & Africa", "Hiring & Delivery Presence"],
            ["Fortune 500", "Enterprise Client Exposure"],
            ["Quick Deployment", "Talent-as-a-Service (TaaS)"],
          ].map(([title, desc]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-xl font-bold mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
