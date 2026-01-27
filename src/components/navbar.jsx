import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const toggleMobileDropdown = (itemName) => {
    setActiveMobileDropdown(activeMobileDropdown === itemName ? null : itemName);
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
        // { name: "Smart Talent-as-a-Service (TaaS)", href: "#talent-as-a-service" },
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
      name: "Our Solutions",
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
      name: "Let's Connect",
      href: "mailto:lalit@resourcegateway.in",
      type: "link"
    },
  //   {
  //    name: "Carrers",
  //    href: "#Career",
  //    type: "link"
  //  },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-100' 
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center p-1">
            <img 
              src="logoNN.png" 
              alt="ResourceGateway" 
              className="h-12 w-auto md:h-15"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 text-sm font-medium flex-1">
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
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-1 block"
                  >
                    {item.name}
                  </a>
                ) : (
                  <>
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-1 flex items-center gap-1"
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
                                <span className="font-medium text-gray-800 text-sm">{subItem.name}</span>
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

          {/* Desktop CTA Button */}
          {/* <a
            href="#contact"
            className="hidden md:block bg-linear-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Get Started
          </a> */}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white"
              style={{ backdropFilter: 'none' }} // Explicitly remove backdrop blur
            >
              <div className="py-2 border-t border-gray-200">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                    {item.type === "link" ? (
                      <a
                        href={item.href}
                        className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                      </a>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 text-left"
                        >
                          <span className="text-base font-medium">{item.name}</span>
                          <svg 
                            className={`w-5 h-5 transition-transform duration-200 ${
                              activeMobileDropdown === item.name ? 'rotate-180' : ''
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {activeMobileDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-gray-50"
                            >
                              <div className="pl-6 py-1 space-y-0">
                                {item.items.map((subItem, index) => (
                                  <a
                                    key={index}
                                    href={subItem.href}
                                    className="block py-3 px-4 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setActiveMobileDropdown(null);
                                    }}
                                  >
                                    <span className="text-sm">{subItem.name}</span>
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Button */}
               {/* <div className="mt-2 p-4 bg-white border-t border-gray-200">
                  <a
                    href="#contact"
                    className="block w-full bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center text-base hover:shadow-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </a>
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop for mobile menu - REMOVED BACKDROP BLUR */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            style={{ backdropFilter: 'none' }} // Remove blur from backdrop
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}