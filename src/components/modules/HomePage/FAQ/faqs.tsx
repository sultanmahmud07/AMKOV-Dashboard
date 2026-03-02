import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

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
  // {
  //   question: "Who can access parcel details?",
  //   answer:
  //     "Senders, receivers, and admins have access to parcel details. Sensitive information is restricted based on your role in the system.",
  // },
  // {
  //   question: "Is there a limit on parcel weight or type?",
  //   answer:
  //     "Yes, each parcel type has predefined weight limits. Make sure your parcel complies with the system's rules to avoid rejection.",
  // },
];


const FAQAccordion = () => {
const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto md:px-4 py-6 md:pt-10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full text-left flex items-center justify-between px-4 py-2 font-semibold text-md md:text-lg rounded-md transition-colors ${
                isOpen ? "bg-primary " : ""
              }`}
            >
              {faq.question}
              <span className="text-xl md:text-3xl">
                {isOpen ? (
                  <FiMinus className="" />
                ) : (
                  <FiPlus className="text-primary" />
                )}
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-4 text-sm md:text-base text-muted-foreground mt-2"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
