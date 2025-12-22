import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What IT Services do you offer?",
    answer: "Our IT Services cover a wide spectrum, including software development, cloud computing, data management, cybersecurity, and IT consulting. We tailor solutions to meet your specific business objectives."
  },
  {
    question: "What sets your Consulting services apart?",
    answer: "Our consulting services stand out through deep industry expertise, customized strategic approaches, and a commitment to delivering measurable business outcomes with cutting-edge technology solutions."
  },
  {
    question: "How can IT Consulting benefit my business strategy?",
    answer: "IT consulting aligns technology with your business goals, optimizes operations, enhances efficiency, reduces costs, and provides competitive advantages through innovative digital transformation strategies."
  },
  {
    question: "Do you offer ERP customization services?",
    answer: "Yes, we provide comprehensive ERP customization services to tailor enterprise resource planning solutions to your specific business processes and requirements."
  },
  {
    question: "What cloud services do you leverage for your projects?",
    answer: "We leverage major cloud platforms including AWS, Azure, and Google Cloud for scalable, secure, and cost-effective cloud solutions."
  },
  {
    question: "Which web development technologies do you specialize in?",
    answer: "We specialize in React, Angular, Vue.js, Node.js, Python Django, and other modern web development frameworks and technologies."
  },
  {
    question: "How do you approach data management and analytics in your projects?",
    answer: "We implement comprehensive data strategies including data warehousing, ETL processes, business intelligence, and advanced analytics using tools like Power BI, Tableau, and custom solutions."
  },
  {
    question: "Which programming languages do your developers specialize in?",
    answer: "Our developers specialize in JavaScript/TypeScript, Python, Java, C#, Go, and other modern programming languages across various domains."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Frequently Asked <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
            View All FAQs
          </button>
        </div>
      </div>
    </section>
  );
}