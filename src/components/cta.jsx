import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-gray-50">
      {/* Logo-inspired soft background flows */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-cyan-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-[520px] h-[520px] bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] bg-fuchsia-300/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="
              text-3xl md:text-4xl font-bold mb-6
              bg-gradient-to-r
              from-cyan-500 via-indigo-500 to-fuchsia-500
              bg-clip-text text-transparent
            "
          >
            Transform Your Business Today
          </motion.h2>

          <p className="text-lg md:text-xl text-gray-700 mb-14 max-w-3xl mx-auto">
            Discover bespoke IT solutions for unparalleled business growth.
            Let’s embark on a journey to transform your idea into a compelling
            digital presence.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <a
              href="#contact"
              className="
                inline-flex items-center justify-center
                px-12 py-4
                rounded-xl
                font-semibold text-lg text-white
                bg-gradient-to-r
                from-cyan-500 via-indigo-500 to-fuchsia-500
                hover:shadow-xl hover:shadow-indigo-400/30
                transition-all duration-200
              "
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Inline form – logo themed */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Got a Project in Mind?
            </h3>

            <p className="text-gray-600 mb-10">
              Contact us for a free consultation and custom solutions.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name*"
                className="
                  w-full px-4 py-3
                  bg-white
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-cyan-500
                "
              />

              <input
                type="tel"
                placeholder="Phone Number*"
                className="
                  w-full px-4 py-3
                  bg-white
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-indigo-500
                "
              />

              <input
                type="email"
                placeholder="Email"
                className="
                  md:col-span-2
                  w-full px-4 py-3
                  bg-white
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-fuchsia-500
                "
              />

              <textarea
                placeholder="Requirements"
                rows="3"
                className="
                  md:col-span-2
                  w-full px-4 py-3
                  bg-white
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-indigo-500
                "
              />

              <button
                type="submit"
                className="
                  md:col-span-2
                  mt-2
                  px-12 py-4
                  rounded-xl
                  font-semibold text-white
                  bg-gradient-to-r
                  from-cyan-500 via-indigo-500 to-fuchsia-500
                  hover:shadow-xl hover:shadow-fuchsia-400/30
                  transition-all duration-200
                "
              >
                Enquire Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
