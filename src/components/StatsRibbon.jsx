export default function StatsRibbon() {
  const stats = [
    {
      id: 1,
      icon: (
        <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      primary: "15+ Years",
      secondary: "Proven Industry Experience",
    },
    {
      id: 2,
      icon: (
        <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      primary: "PAN India & Africa",
      secondary: "Hiring & Delivery Presence",
    },
    {
      id: 3,
      icon: (
        <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      primary: "Fortune 500",
      secondary: "Enterprise Client Exposure",
    },
    {
      id: 4,
      icon: (
        <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      primary: "Quick Deployment",
      secondary: "Talent-as-a-Service (TaaS)",
    },
  ];

  return (
    <div className="w-full bg-[#f8f9fa] border-b border-gray-200 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-3.5 py-3 sm:py-0 px-4 first:pl-0 last:pr-0">
              <div className="flex-shrink-0 text-slate-700">
                {stat.icon}
              </div>

              <div>
                <div className="text-lg sm:text-[19px] font-extrabold text-[#07152b] leading-tight tracking-tight">
                  {stat.primary}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  {stat.secondary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
