import { motion } from "framer-motion";
import { useState } from "react";

export default function CTA() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirements: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipient = "lalit@resourcegateway.in";
    const subject = `Business Enquiry - ${form.name || "Client"}`;
    const body = `Full Name: ${form.name}
Phone Number: ${form.phone}
Business Email: ${form.email}

Project or Talent Requirements:
${form.requirements || "N/A"}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 overflow-hidden bg-slate-50">
      {/* Background ambient accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#07152b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#c89b4e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#80142a] uppercase mb-2.5">
            <span>START A CONVERSATION</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-bold font-serif-display text-slate-900 mb-3"
          >
            Ready to Build What’s <span className="text-[#c89b4e]">Next?</span>
          </motion.h2>

          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Speak with our enterprise consultants to align the right engineering talent and technology architecture for your organization.
          </p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-left"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#c89b4e] focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. +91 98186 48467"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#c89b4e] focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. name@company.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#c89b4e] focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Project or Talent Requirements
                </label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="Describe your goals, team scale, or required tech stack..."
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#c89b4e] focus:bg-white transition-all text-sm resize-none"
                />
              </div>

              <div className="md:col-span-2 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Your information is encrypted & protected under enterprise NDA standards.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-[#80142a] hover:bg-[#681022] shadow-md transition-all duration-200 cursor-pointer text-sm"
                >
                  Submit Enquiry →
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
