export default function Footer() {
  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "/careers" },
    {
      name: "Contact Us",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=lalit@resourcegateway.in&su=Resource%20Gateway%20Enquiry",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  const servicesLinks = [
    { name: "Software Product Engineering", href: "#software-product-engineering" },
    { name: "Dedicated Software Teams", href: "#dedicated-teams" },
    { name: "QA & Testing", href: "#qa-testing" },
    { name: "Application Development", href: "#app-development" },
    { name: "Cloud Services", href: "#cloud-services" },
    { name: "AI Solutions", href: "#ai" },
  ];

  const solutionsLinks = [
    { name: "HR Management", href: "#hr-management" },
    { name: "Supply Chain", href: "#supply-chain" },
    { name: "CRM", href: "#crm" },
    { name: "Web Portals", href: "#web-portals" },
    { name: "Document Management", href: "#document-management" },
    { name: "E-Learning", href: "#elearning" },
  ];

  const technologiesLinks = [
    { name: "Web Technologies", href: "#web-technologies" },
    { name: "Cloud", href: "#cloud-technologies" },
    { name: "Mobility", href: "#mobility" },
    { name: "ERP", href: "#erp-technologies" },
    { name: "Data Technologies", href: "#data-technologies" },
    { name: "ETL", href: "#etl-technologies" },
  ];

  return (
    <footer className="bg-[#0b1120] text-white pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-14">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#hero"
              className="inline-block mb-5 hover:opacity-90 transition-opacity"
            >
              <img
                src="/logo-footer.png"
                alt="Resource Gateway"
                className="h-12 sm:h-14 w-auto object-contain rounded-lg"
              />
            </a>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 font-normal max-w-xs">
              Crafting bespoke software solutions with cutting-edge technology and best practices.
            </p>

            <a
              href="https://maps.google.com/?q=C+-+5%2F25%2C+First+Floor%2C+Sector-+52%2C+Gurgaon%2C+Haryana%2C+India+-+122003"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm leading-relaxed mb-6 max-w-xs"
            >
              <svg
                className="w-4 h-4 text-[#38bdf8] group-hover:text-[#818cf8] shrink-0 mt-0.5 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>C - 5/25, First Floor, Sector- 52, Gurgaon, Haryana, India - 122003</span>
            </a>

            <a
              href="https://www.linkedin.com/company/resource-gateway/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-md bg-white/10 hover:bg-[#38bdf8] flex items-center justify-center text-slate-300 hover:text-white transition-colors text-xs font-bold"
            >
              in
            </a>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {solutionsLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Column */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">
              Technologies
            </h4>
            <ul className="space-y-2.5">
              {technologiesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2025 ResourceGateway. All rights reserved.</p>
          <p className="text-right">Recognized as one of the Top Custom Software Development Companies</p>
        </div>
      </div>
    </footer>
  );
}