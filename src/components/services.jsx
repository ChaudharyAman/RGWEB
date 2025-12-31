const services = [
  "Software Product Engineering",
  "Dedicated Software Teams",
  "QA & Testing",
  "Application Development",
  "E-Commerce",
  "Data Engineering",
  "Artificial Intelligence",
  "Cloud Services",
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our <span className="gradient-text">Services</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service}
              className="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold mb-2">{service}</h3>
              <p className="text-sm text-gray-600">
                Enterprise-grade solutions built for scale, performance, and reliability.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
