export default function Timeline() {
  const milestones = [
    ["2011", "Company Established"],
    ["2012", "Team of 10+ Employees"],
    ["2014", "Pan India & Africa Hiring"],
    ["2019", "Tech Transformation Projects"],
    ["Today", "Enterprise Scale Delivery"],
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-14">
          Our <span className="gradient-text">Journey</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {milestones.map(([year, text]) => (
            <div key={year} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                {year}
              </div>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
