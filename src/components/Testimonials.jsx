import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      text: "ResourceGateway transformed our digital infrastructure completely. Their expertise and dedication are unmatched in the industry.",
      author: "John Doe",
      position: "CEO, TechCorp Inc."
    },
    {
      text: "Working with ResourceGateway was a game-changer for our business. Their solutions are innovative, scalable, and perfectly tailored to our needs.",
      author: "Sarah Johnson",
      position: "CTO, Innovate Solutions"
    },
    {
      text: "The team at ResourceGateway delivered exceptional results beyond our expectations. Their commitment to quality is outstanding.",
      author: "Michael Chen",
      position: "Operations Director, Global Enterprises"
    }
  ];

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
            Client <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Testimonials</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-xl"
            >
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}