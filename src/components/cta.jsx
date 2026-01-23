import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function CTA() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirements: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          requirements: form.requirements,
          time: new Date().toLocaleString()
        },
        import.meta.env.VITE_EMAIL_PUBLIC
      );

      alert("Enquiry sent successfully 🚀");

      setForm({
        name: "",
        phone: "",
        email: "",
        requirements: ""
      });

    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send enquiry 😬");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-28 overflow-hidden bg-gray-50">

      {/* Logo-inspired soft background flows */}
      <div className="absolute -top-40 -left-40 w-130 h-130 bg-cyan-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-130 h-130 bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-130 h-130 bg-fuchsia-300/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent"
          >
            Transform Your Business Today
          </motion.h2>

          <p className="text-lg md:text-xl text-gray-700 mb-14 max-w-3xl mx-auto">
            Discover bespoke IT solutions for unparalleled business growth.
          </p>

          {/* Inline form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Full Name*"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number*"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="md:col-span-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-fuchsia-500"
              />

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="Requirements"
                rows="3"
                className="md:col-span-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 mt-2 px-12 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:shadow-xl hover:shadow-fuchsia-400/30 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Enquire Now"}
              </button>

            </form>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
