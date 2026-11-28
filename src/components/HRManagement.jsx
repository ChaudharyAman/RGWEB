
import { motion } from "framer-motion";

export default function HRManagement() {
    return (
        <section className="bg-white min-h-screen">

            {/* Hero Section */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20">

                    {/* Top Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <p className="text-base sm:text-lg font-semibold tracking-wider text-[#c89b4e] mb-4 uppercase">
                            Our Solutions / Human Resource Management
                        </p>
                    </motion.div>

                    {/* Left & Right Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-6xl mx-auto mt-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center"
                    >

                        {/* Left Side - Heading */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-slate-900 leading-tight">
                                Human Resource{" "}
                                <span className="text-[#c89b4e]">
                                    Management
                                </span>
                            </h1>
                        </div>

                        {/* Right Side - Paragraph */}
                        <div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Build a stronger and more capable workforce with our
                                professional HR and staffing services. As a best staffing
                                company for businesses, we provide end-to-end recruitment
                                services that help businesses identify, attract, and hire
                                the right talent.
                            </p>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                                Our staffing solutions and workforce solutions are
                                designed to support changing business needs, improve
                                hiring efficiency, and build reliable teams. As a
                                professional staffing recruiting company, we focus on
                                practical recruitment strategies and recruitment consent
                                to create a smooth and effective hiring experience.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* HR Solutions Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

                <div className="max-w-2xl mb-9">
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-slate-900 mb-3">
                        Our HR Services
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        Simple and effective human resource services that support
                        your business at every stage of hiring.
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 p-7 sm:p-9 rounded-xl bg-[#07152b] text-white">

                    <h2 className="text-xl sm:text-2xl font-bold font-serif-display mb-3">
                        Find the Right Talent for Your Business
                    </h2>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                        From recruitment planning to staffing support, our HR
                        solutions help businesses build capable and reliable teams.
                    </p>

                    <a
                        href="/"
                        className="inline-block mt-6 text-sm font-semibold text-[#c89b4e] hover:text-white transition-colors"
                    >
                        Back to Home →
                    </a>

                </div>
            </div>
        </section>
    );
}
