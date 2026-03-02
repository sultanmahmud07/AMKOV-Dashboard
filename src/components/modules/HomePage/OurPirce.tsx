
import { Link } from "react-router"; // Ensure you use 'react-router-dom'
import { CheckCircle2 } from "lucide-react"; // Install: npm install lucide-react

const OurPrice = () => {
  const plans = [
    {
      id: 1,
      title: "BASIC",
      price: "$50",
      type: "Single Package",
      features: [
        "Product Weight: < 3KG",
        "Country: Select Countries",
        "Duration: 7-14 Days",
        "Support: Email Only",
      ],
      highlight: false,
    },
    {
      id: 2,
      title: "PREMIUM",
      price: "$250",
      type: "Business Freight",
      features: [
        "Product Weight: Unlimited",
        "Country: Worldwide",
        "Duration: 3-5 Days",
        "Support: 24/7 Live Chat",
        "Cargo Insurance Included"
      ],
      highlight: true,
    },
    {
      id: 3,
      title: "STANDARD",
      price: "$150",
      type: "Multiple Packages",
      features: [
        "Product Weight: < 10KG",
        "Country: All",
        "Duration: 5-9 Days",
        "Support: Dedicated Agent",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
            <div className="inline-block border border-[#FA4318] px-4 py-1 rounded-full mb-2">
              <span className="text-[#FA4318] text-sm font-bold uppercase tracking-wider">
                PRICING & PLANS
              </span>
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white uppercase">
            Effective <span className="text-[#FA4318]">Affordable</span> Plans
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
            Transparent pricing for every shipment. Choose the plan that fits your logistics needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2
                ${
                  plan.highlight
                    ? "bg-[#111827] text-white shadow-2xl ring-4 ring-[#FA4318]/20 scale-105 z-10"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg border border-gray-100 dark:border-gray-700"
                }
              `}
            >
              {/* Card Header */}
              <div className="mb-6">
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 
                    ${plan.highlight ? "text-[#FA4318]" : "text-gray-500 dark:text-gray-400"}`}>
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className={`text-sm font-medium ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                        / shipment
                    </span>
                </div>
                <p className={`mt-2 text-sm ${plan.highlight ? "text-gray-300" : "text-gray-500"}`}>
                    {plan.type}
                </p>
              </div>

              {/* Divider */}
              <div className={`h-px w-full mb-6 ${plan.highlight ? "bg-gray-700" : "bg-gray-200"}`}></div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 
                        className={`w-5 h-5 shrink-0 ${plan.highlight ? "text-[#FA4318]" : "text-[#FA4318]"}`} 
                    />
                    <span className={`text-sm font-medium ${plan.highlight ? "text-gray-300" : "text-gray-600 dark:text-gray-300"}`}>
                        {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <Link to="/contact" className="w-full">
                <button
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300
                    ${
                      plan.highlight
                        ? "bg-[#FA4318] text-white hover:bg-orange-700 shadow-lg shadow-orange-900/20"
                        : "bg-gray-100 dark:bg-gray-700 text-[#111827] dark:text-white hover:bg-[#FA4318] hover:text-white"
                    }
                  `}
                >
                  Choose {plan.title}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPrice;