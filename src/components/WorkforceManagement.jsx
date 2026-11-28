import { motion } from "framer-motion";

export default function WorkforceManagement() {
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
                            Our Solutions / Workforce Management
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
                                Workforce{" "}
                                <span className="text-[#c89b4e]">
                                    Management
                                </span>
                            </h1>
                        </div>

                        {/* Right Side - Paragraph */}
                        <div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Manage your workforce more effectively with practical
                                workforce solutions designed around your business goals.
                                We help organizations improve staffing, resource planning,
                                employee coordination, and overall operational efficiency.
                                Our approach helps businesses build a well-organized and
                                productive workforce that can adapt to changing business needs.
                            </p>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                                We provide flexible staffing solutions and workforce
                                management support to help businesses manage resources
                                efficiently. From workforce planning and resource allocation
                                to staffing support and workforce optimization, our solutions
                                are designed to improve productivity and create a more
                                efficient working environment.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Workforce Solutions Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

                <div className="max-w-2xl mb-9">
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-slate-900 mb-3">
                        Our Workforce Solutions
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        Practical workforce services that help businesses organize
                        teams, manage resources, and improve productivity.
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 p-7 sm:p-9 rounded-xl bg-[#07152b] text-white">

                    <h2 className="text-xl sm:text-2xl font-bold font-serif-display mb-3">
                        Build a More Efficient Workforce
                    </h2>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                        Create a well-organized and productive workforce with
                        professional staffing and workforce management support.
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
