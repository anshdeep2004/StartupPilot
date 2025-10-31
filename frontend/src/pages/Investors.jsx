import React from "react";

const Investors = () => {
  const investors = [
    {
      name: "Rohan Mehta",
      role: "Angel Investor",
      company: "Mehta Ventures",
      email: "rohan@mehtaventures.com",
    },
    {
      name: "Aarav Malhotra",
      role: "Venture Capitalist",
      company: "NextGen Capital",
      email: "aarav@nextgenvc.com",
    },
    {
      name: "Sara Kapoor",
      role: "Startup Mentor",
      company: "Kapoor Innovations",
      email: "sara.kapoor@ki.com",
    },
    {
      name: "Vikram Singh",
      role: "Private Equity Investor",
      company: "Singh Holdings",
      email: "vikram@sholdings.com",
    },
    {
      name: "Rohan Mehta",
      role: "Angel Investor",
      company: "Mehta Ventures",
      email: "rohan@mehtaventures.com",
    },
    {
      name: "Aarav Malhotra",
      role: "Venture Capitalist",
      company: "NextGen Capital",
      email: "aarav@nextgenvc.com",
    },
    {
      name: "Sara Kapoor",
      role: "Startup Mentor",
      company: "Kapoor Innovations",
      email: "sara.kapoor@ki.com",
    },
    {
      name: "Rohan Mehta",
      role: "Angel Investor",
      company: "Mehta Ventures",
      email: "rohan@mehtaventures.com",
    },
    {
      name: "Aarav Malhotra",
      role: "Venture Capitalist",
      company: "NextGen Capital",
      email: "aarav@nextgenvc.com",
    },
    {
      name: "Sara Kapoor",
      role: "Startup Mentor",
      company: "Kapoor Innovations",
      email: "sara.kapoor@ki.com",
    },
    {
      name: "Rohan Mehta",
      role: "Angel Investor",
      company: "Mehta Ventures",
      email: "rohan@mehtaventures.com",
    },
    {
      name: "Aarav Malhotra",
      role: "Venture Capitalist",
      company: "NextGen Capital",
      email: "aarav@nextgenvc.com",
    },
    {
      name: "Sara Kapoor",
      role: "Startup Mentor",
      company: "Kapoor Innovations",
      email: "sara.kapoor@ki.com",
    },
  ];

  return (
    <div className="w-full h-full px-6 py-10 text-black">
      <h2 className="text-3xl font-bold mb-6">Investors</h2>

      <p className="text-gray-700 mb-8 text-sm">
        Explore the amazing investors who support startups and innovation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {investors.map((inv, index) => (
          <div
            key={index}
            className="p-5 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] bg-white border border-gray-100 
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
          >
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[#353535]">{inv.name}</div>
              <div className="text-sm text-[#6457D6] font-semibold">{inv.role}</div>
              <div className="text-sm text-gray-600">{inv.company}</div>
              <div className="text-sm text-gray-500 mt-1">{inv.email}</div>
            </div>

            <button className="mt-4 px-4 py-2 rounded-lg bg-[#6457D6] text-white text-sm hover:bg-[#4f46d3] transition-all">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investors;