const services = [
  "Telecom Network Services (2G–5G)",
  "IT Infrastructure & Operations",
  "Cloud Architecture & DevOps",
  "Enterprise Software Development",
  "Managed Services & Consulting",
  "Cybersecurity & Data Analytics",
  "NOC / SOC / SNOC Enablement",
  "ERP & Business Applications",
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Implementation <span className="gradient-text">Excellence</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s} className="glass p-6 rounded-xl">
              <h3 className="font-bold mb-2">{s}</h3>
              <p className="text-sm text-gray-600">
                Enterprise-grade delivery with reliability and scale.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
