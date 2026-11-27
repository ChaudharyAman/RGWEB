import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ currentPath = "/" }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const email = "lalit@resourcegateway.in";
  const phone = "+91 9818648467";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (name) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
    setDropdownTimeout(timeout);
  };

  const toggleMobileDropdown = (name) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  const resolveHref = (href) => {
    if (href.startsWith("#")) {
      return currentPath === "/careers" ? `/${href}` : href;
    }
    return href;
  };

  const navItems = [
    {
      name: "Home",
      href: "#hero",
      type: "link",
    },
    {
      name: "Our Services",
      href: "#services",
      type: "dropdown",
      items: [
        { name: "Software Product Engineering", href: "#software-product-engineering" },
        { name: "Dedicated Software Teams", href: "#dedicated-teams" },
        { name: "QA & Testing", href: "#qa-testing" },
        { name: "Application Development", href: "#app-development" },
        { name: "E-Commerce", href: "#ecommerce" },
        { name: "Data Engineering", href: "#data-engineering" },
        { name: "Artificial Intelligence", href: "#ai" },
        { name: "Cloud Services", href: "#cloud-services" },
      ]
    },
    {
      name: "Our Solutions",
      href: "#solutions",
      type: "dropdown",
      items: [
        { name: "Human Resource Management", href: "#hr-management" },
        { name: "Supply Chain Management", href: "#supply-chain" },
        { name: "Operations Management", href: "#operations" },
        { name: "Financial Management", href: "#financial-management" },
        { name: "Workforce Management", href: "#workforce-management" },
        { name: "CRM Solutions", href: "#crm" },
        { name: "Web Portals", href: "#web-portals" },
        { name: "Content Management System", href: "#cms" },
        { name: "Document Management", href: "#document-management" },
        { name: "E-Learning Solutions", href: "#elearning" },
        { name: "Asset Management", href: "#asset-management" },
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
        { name: "Data Technologies", href: "#data-technologies" },
      ]
    },
    {
      name: "Careers",
      href: "/careers",
      type: "link"
    },
    {
      name: "Let's Connect",
      href: "mailto:lalit@resourcegateway.in",
      type: "connect"
    },
  ];

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 shadow-sm border-b border-gray-200/90 py-1"
            : "bg-white border-b border-gray-200/70 py-1.5"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-14 sm:h-16 relative w-full">
            {/* Logo */}
            <a href={resolveHref("#hero")} className="flex items-center group py-0.5 z-10 flex-shrink-0">
              <img
                src="/logo-clean.png"
                alt="Resource Gateway"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </a>

            {/* Desktop Navigation - Centered in a single row */}
            <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-[13px] xl:text-sm font-medium text-slate-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative py-1"
                  onMouseEnter={() => item.type === "dropdown" && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.type === "dropdown" && handleMouseLeave()}
                >
                  {item.type === "link" ? (
                    <a
                      href={resolveHref(item.href)}
                      className="text-slate-800 hover:text-[#80142a] transition-colors duration-200 py-1 whitespace-nowrap block"
                    >
                      {item.name}
                    </a>
                  ) : item.type === "connect" ? (
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="text-slate-800 hover:text-[#80142a] transition-colors duration-200 py-1 cursor-pointer whitespace-nowrap block"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <>
                      <a
                        href={resolveHref(item.href)}
                        className="text-slate-800 hover:text-[#80142a] transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer py-1 whitespace-nowrap"
                      >
                        <span className="whitespace-nowrap">{item.name}</span>
                        <svg
                          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
                            openDropdown === item.name ? "rotate-180 text-[#80142a]" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </a>

                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.16 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 whitespace-normal"
                            onMouseEnter={() => handleMouseEnter(item.name)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="space-y-0.5">
                              {item.items.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={resolveHref(subItem.href)}
                                  className="block px-3.5 py-1.5 rounded-lg hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#80142a] transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Certifications - Desktop (ISO 27001, ISO 9001, CMMI) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-shrink-0 z-10">
              <img
                src="/iso-27001.png"
                alt="ISO 27001 Certified"
                className="h-8 xl:h-9 w-auto object-contain drop-shadow-xs"
                title="ISO 27001 Certified"
              />
              <img
                src="/iso-9001.png"
                alt="ISO 9001 Certified"
                className="h-8 xl:h-9 w-auto object-contain drop-shadow-xs"
                title="ISO 9001 Certified"
              />
              <img
                src="/cmmi.png"
                alt="CMMI Certified"
                className="h-6 xl:h-7 w-auto object-contain drop-shadow-xs"
                title="CMMI Certified"
              />
            </div>

            {/* Mobile menu hamburger button */}
            <div className="flex items-center lg:hidden">
              <button
                className="text-slate-700 hover:text-slate-900 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-b-0 py-1">
                    {item.type === "link" ? (
                      <a
                        href={resolveHref(item.href)}
                        className="block py-2.5 text-base font-medium text-slate-800 hover:text-[#80142a]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : item.type === "connect" ? (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsContactModalOpen(true);
                        }}
                        className="block w-full text-left py-2.5 text-base font-medium text-slate-800 hover:text-[#80142a]"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="flex items-center justify-between w-full py-2.5 text-base font-medium text-slate-800 hover:text-[#80142a] text-left"
                        >
                          <span>{item.name}</span>
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeMobileDropdown === item.name ? "rotate-180" : ""
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
                              className="pl-3 pb-2 space-y-1"
                            >
                              {item.items.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={resolveHref(subItem.href)}
                                  className="block py-2 text-sm text-slate-600 hover:text-[#80142a]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}

                {/* Certifications - Mobile */}
                <div className="mt-4 p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-center gap-3">
                  <img src="/iso-27001.png" alt="ISO 27001" className="h-10 w-auto object-contain" />
                  <img src="/iso-9001.png" alt="ISO 9001" className="h-10 w-auto object-contain" />
                  <img src="/cmmi.png" alt="CMMI" className="h-7 w-auto object-contain" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Connect Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsContactModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-gray-100"
            >
              <div className="p-6 bg-gradient-to-r from-[#07152b] to-[#0f2244] text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif-display">Let's Connect</h3>
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    className="text-slate-300 hover:text-white text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5">
                  Reach out directly to connect with our leadership team.
                </p>
              </div>

              <div className="p-6 space-y-4">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Resource Gateway Enquiry")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-[#c89b4e] hover:bg-amber-50/40 transition-all group"
                  onClick={() => setIsContactModalOpen(false)}
                >
                  <div className="mr-4 p-3 bg-amber-100/60 rounded-xl text-[#b47e28]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-[#b47e28]">Send an Email</p>
                    <p className="text-sm text-slate-500">{email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-[#80142a] hover:bg-rose-50/40 transition-all group"
                  onClick={() => setIsContactModalOpen(false)}
                >
                  <div className="mr-4 p-3 bg-rose-100/60 rounded-xl text-[#80142a]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-[#80142a]">Direct Phone Call</p>
                    <p className="text-sm text-slate-500">{phone}</p>
                  </div>
                </a>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
