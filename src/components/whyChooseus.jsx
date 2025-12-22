import { motion } from "framer-motion";

const features = [
  {
    title: "Excellent Academic Background",
    description: "All our employees have excellent academic credentials, and are from leading colleges including the prestigious IITs. Mathematical ability is ranked high in order to be a part of our team."
  },
  {
    title: "Domain Expertise",
    description: "We understand your needs and domain. Our expertise allows us to handle and execute the concerned project smoothly without you beating your head against the wall in explaining the business domains."
  },
  {
    title: "Customer Service",
    description: "Our commitment goes beyond solutions, offering unparalleled customer support round the clock, ensuring seamless interactions and successful project deliveries."
  },
  {
    title: "Flexible and Scalable",
    description: "Based on the client's requirements, we scale up/down our team. Also, we are open to iterating the estimate and incorporating scope changes subsequently."
  }
];

export default function WhyChooseUs() {
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
            Why Choose <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ResourceGateway</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At ResourceGateway, we stand as a beacon of excellence in the IT Industry, offering unparalleled solutions driven by a commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
            See What We Do
          </button>
        </div>
      </div>
    </section>
  );
}