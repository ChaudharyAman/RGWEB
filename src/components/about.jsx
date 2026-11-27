import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-white relative border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1528] tracking-tight mb-8">
            Who We{" "}
            <span className="bg-gradient-to-r from-[#205493] via-[#33449c] to-[#6a307d] bg-clip-text text-transparent">
              Are
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-6">
            That trust is built on execution. Resource Gateway helps businesses grow by aligning people, technology, and processes to deliver measurable, reliable outcomes at enterprise scale.
          </p>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Established in 2011, we support organizations across PAN India, Africa, and global markets, enabling transformation across telecom, IT, cloud, and enterprise ecosystems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
