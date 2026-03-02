import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react"; // npm install lucide-react
import { Link } from "react-router";

// 1. Data Source
const faqs = [
  {
    question: "How do I create a new parcel delivery request?",
    answer:
      "Go to the 'Create Parcel' page, fill in the sender and receiver details, parcel type, weight, and delivery instructions, then submit the form. You will receive a unique tracking ID for your parcel.",
  },
  {
    question: "How can I track my parcel?",
    answer:
      "Use the 'Track Parcel' feature and enter your tracking ID. You will see the current status, history of updates, and expected delivery time for your parcel.",
  },
  {
    question: "Can I update parcel information after creation?",
    answer:
      "Yes, admins and senders can update parcel details like receiver information or delivery instructions before the parcel is dispatched. Changes cannot be made once the parcel is in transit.",
  },
  {
    question: "What happens if the parcel is delayed?",
    answer:
      "You can track the parcel in real-time. If a delay occurs, the status will reflect it. Contact support if you need further assistance or rescheduling.",
  },
  {
    question: "Can I cancel a parcel delivery?",
    answer:
      "Yes, parcels that have not yet been dispatched can be canceled by the sender. Once a parcel is in transit, cancellation is not allowed.",
  },
  {
    question: "How do I see all parcels I sent or received?",
    answer:
      "Go to the 'My Parcels' page. It lists all parcels you have sent or are set to receive, along with their current status and tracking history.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="main-container ">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* === Left Column: Header & Support === */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="mb-8">
              <div className="inline-block border border-[#FA4318] px-4 py-1 rounded-full mb-4 bg-white dark:bg-gray-800">
                <span className="text-[#FA4318] text-sm font-bold uppercase tracking-wider">
                  Need Help?
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Have questions about sending, receiving, or tracking parcels? We have answers to help you manage your deliveries easily.
              </p>
            </div>

            {/* Support Box */}
            <div className="bg-[#111827] dark:bg-black rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FA4318] rounded-full opacity-20 blur-2xl"></div>

              <MessageCircle className="w-10 h-10 text-[#FA4318] mb-4" />
              <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
              <p className="text-gray-400 text-sm mb-6">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <Link to="/contact">
                <button className="w-full cursor-pointer py-3 bg-[#FA4318] hover:bg-orange-700 text-white font-bold rounded-lg transition-colors">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>

          {/* === Right Column: Accordion === */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`bg-white dark:bg-gray-800 border rounded-xl overflow-hidden transition-all duration-300 ${isOpen
                        ? "border-[#FA4318] shadow-lg shadow-orange-500/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-start justify-between p-5 sm:p-6 text-left"
                    >
                      <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? "text-[#FA4318]" : "text-[#111827] dark:text-white"
                        }`}>
                        {faq.question}
                      </span>

                      {/* Animated Icon */}
                      <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? "bg-[#FA4318] text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                        }`}>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Plus size={20} />
                        </motion.div>
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-gray-500 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;