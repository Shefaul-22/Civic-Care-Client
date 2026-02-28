import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router";

const faqs = [
    {
        question: "What is Civic Care?",
        answer: "Civic Care is a public infrastructure issue reporting platform that allows citizens to report problems like potholes, broken streetlights, water leaks, and more. Authorities can review and resolve issues efficiently."
    },
    {
        question: "Is Civic Care free to use?",
        answer: "Yes, Civic Care is free to use. Free users can report up to 3 issues. This allows everyone to use the platform without any cost."
    },
    {
        question: "What happens after reporting 3 issues?",
        answer: "After reporting 3 issues, free users will need to upgrade to Premium to continue reporting new issues."
    },
    {
        question: "What are the benefits of Premium membership?",
        answer: "Premium users can report unlimited issues, boost issue priority, and receive faster attention from authorities."
    },
    {
        question: "What is Boost Priority?",
        answer: "Boost Priority highlights your issue and increases its visibility, helping authorities identify and resolve it faster."
    },
    {
        question: "How do I report an issue?",
        answer: "Simply create an account, click on 'Report Issue', provide details, upload an image if needed, and submit. Your issue will be reviewed by authorities."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-6 md:py-10">
            <div className="max-w-6xl mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fa0bd2]/10 text-[#fa0bd2] rounded-full text-xs font-black uppercase tracking-widest mb-2">
                        <HelpCircle size={16} />
                        <span>Support Center</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
                        Got <span className="text-[#fa0bd2]">Questions?</span>
                    </h2>
                    <p className="text-base-content/50 font-medium max-w-lg mx-auto leading-relaxed">
                        Find everything you need to know about CivicCare and how we help rebuild your city.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`group border-2 transition-all duration-300 rounded-[2rem] overflow-hidden ${isOpen
                                        ? "border-[#fa0bd2] bg-base-100 shadow-xl shadow-[#fa0bd2]/5"
                                        : "border-base-200 bg-base-100 hover:border-base-300"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center p-6 md:p-8 text-left transition-colors"
                                >
                                    <span className={`text-lg md:text-xl font-bold tracking-tight ${isOpen ? "text-[#fa0bd2]" : "text-base-content"
                                        }`}>
                                        {faq.question}
                                    </span>

                                    <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? "bg-[#fa0bd2] text-white rotate-180" : "bg-base-200 text-base-content/50"
                                        }`}>
                                        <ChevronDown size={20} strokeWidth={3} />
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-500 ease-in-out px-6 md:px-8 overflow-hidden ${isOpen ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="pt-2 border-t border-base-200">
                                        <p className="text-base-content/60 font-medium leading-relaxed mt-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">
                        Still have questions? <Link to="/service-centers" className="text-[#fa0bd2] cursor-pointer hover:underline">Contact Support</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;