import React from 'react';

export const TrustMetrics: React.FC = () => {
  const stats = [
    { value: '100%', label: 'Type-Safe Code', detail: 'Zero compiler shortcuts across production suites' },
    { value: '< 1.2s', label: 'Average LCP Latency', detail: 'Sub-second performance on global edge CDNs' },
    { value: '15+', label: 'Shipped Deployments', detail: 'SaaS platforms, digital experiences, & automations' },
    { value: '500+', label: 'Students Upskilled', detail: 'Through hands-on fellowships and code workshops' },
  ];

  return (
    <section id="trust" className="py-12 border-y border-[#EAE3D2]/70 bg-[#FAF7F0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col text-left">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#191C1E] tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-[#806429] mt-1.5">
                {stat.label}
              </span>
              <span className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
