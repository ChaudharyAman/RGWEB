import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const handleMouseEnter = (item) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const navItems = [
    {
      name: "Home",
      href: "#",
      type: "link",
    },
    {
      name: "Our Services",
      href: "#services",
      type: "dropdown",
      items: [
        { name: "Smart Talent-as-a-Service (TaaS)", href: "#talent-as-a-service" },
        { name: "Software Product Engineering", href: "#software-product-engineering" },
        { name: "Dedicated Software Teams", href: "#dedicated-teams" },
        { name: "QA & Testing", href: "#qa-testing" },
        { name: "Application Development", href: "#app-development" },
        { name: "E-Commerce", href: "#ecommerce" },
        { name: "Data Engineering", href: "#data-engineering" },
        { name: "Artificial Intelligence", href: "#ai" },
        { name: "Cloud Services", href: "#cloud-services" }
      ]
    },
    {
      name: "Solutions",
      href: "#solutions",
      type: "dropdown",
      items: [
        { name: "Workforce Management", href: "#workforce-management" },
        { name: "Human Resource Management", href: "#hr-management" },
        { name: "E-Learning", href: "#elearning" },
        { name: "Supply Chain Management", href: "#supply-chain" },
        { name: "CRM", href: "#crm" },
        { name: "Operations Management", href: "#operations" },
        { name: "Web Portals", href: "#web-portals" },
        { name: "Content Management System", href: "#cms" },
        { name: "Document Management", href: "#document-management" }
      ]
    },
    {
      name: "Technologies",
      href: "#technologies",
      type: "dropdown",
      items: [
        { name: "Mobility", href: "#mobility" },
        { name: "Web Technologies", href: "#web-technologies" },
        { name: "ERP Technologies", href: "#erp-technologies" },
        { name: "ETL Technologies", href: "#etl-technologies" },
        { name: "Cloud Technologies", href: "#cloud-technologies" },
        { name: "Data Technologies", href: "#data-technologies" }
      ]
    },
    {
      name: "Let’s Connect ",
      href: "#contact",
      type: "link"
    }
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200"
    >
      <div className="container  mx-auto  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between ">
          {/* Logo */}
            <a href="#" className="flex items-center p-1">
            <img 
              src="logoNN.png" 
              alt="ResourceGateway" 
              className="h-15 w-20 "
              />
            {/* <span className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              ResourceGateway
            </span> */}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {item.type === "link" ? (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 block"
                  >
                    {item.name}
                  </a>
                ) : (
                  <>
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 flex items-center gap-1"
                    >
                      {item.name}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>

                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          {item.items.map((subItem, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <a
                                href={subItem.href}
                                className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.description ? (
                                  <>
                                    <span className="font-medium text-gray-800 block">{subItem.name}</span>
                                    <span className="text-xs text-gray-500 mt-1 line-clamp-2">{subItem.description}</span>
                                  </>
                                ) : (
                                  <span className="font-medium text-gray-800">{subItem.name}</span>
                                )}
                              </a>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:block bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}