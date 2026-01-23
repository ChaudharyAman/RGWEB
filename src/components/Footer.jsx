export default function Footer() {
  const footerLinks = {
    "Company": ["About Us", "Careers", "Contact Us", "Privacy Policy"],
    "Services": [
      "Software Product Engineering",
      "Dedicated Software Teams",
      "QA & Testing",
      "Application Development",
      "Cloud Services",
      "AI Solutions"
    ],
    "Solutions": [
      "HR Management",
      "Supply Chain",
      "CRM",
      "Web Portals",
      "Document Management",
      "E-Learning"
    ],
    "Technologies": [
      "Web Technologies",
      "Cloud",
      "Mobility",
      "ERP",
      "Data Technologies",
      "ETL"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Single Row Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Company Info - Left Side */}
          <div className="lg:w-1/4">
            <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ResourceGateway
            </h3>
            <p className="text-gray-400 mb-6">
              Crafting bespoke software solutions with cutting-edge technology and best practices.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/resource-gateway/" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">in</div>
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">𝕏</div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">f</div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">ig</div>
              </a> */}
            </div>
          </div>

          {/* Links Grid - Right Side */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-bold text-lg mb-4 text-white">{category}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors text-sm hover:pl-2 duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ResourceGateway. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Recognized as one of the Top Custom Software Development Companies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}