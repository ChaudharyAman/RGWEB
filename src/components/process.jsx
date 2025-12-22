import { motion } from "framer-motion";

const steps = ["Discover", "Design", "Develop", "Deploy", "Scale"];

export default function Process() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-20">
          Our <span className="gradient-text">Process</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mx-auto w-14 h-14 gradient-primary rounded-full mb-4" />
              <h4 className="font-semibold">{step}</h4>
              <p className="text-sm text-(--color-text-muted) mt-2">
                Lorem ipsum dolor sit amet.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
