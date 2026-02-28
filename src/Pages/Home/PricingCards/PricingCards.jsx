import React, { useState } from "react";
import { Check, X, Crown, Zap } from "lucide-react";
import UseAuth from "../../../hooks/UseAuth";
import { useNavigate } from "react-router";

const plans = [
    {
        id: "basic",
        name: "Basic",
        price: "$100",
        duration: "/month",
        description: "Basic access for new users",
        highlight: false,
        features: [
            { text: "Report up to 3 issues", available: true },
            { text: "Track issue status", available: true },
            { text: "Basic support", available: true },
            { text: "Boost priority", available: false },
            { text: "Unlimited issue reporting", available: false },
        ],
        buttonText: "Select Basic"
    },
    {
        id: "standard",
        name: "Standard",
        price: "$200",
        duration: "/3 months",
        description: "Most popular plan for active citizens",
        highlight: true,
        features: [
            { text: "Report up to 10 issues", available: true },
            { text: "Track issue status", available: true },
            { text: "Priority support", available: true },
            { text: "Boost priority", available: true },
            { text: "Unlimited issue reporting", available: false },
        ],
        buttonText: "Select Standard"
    },
    {
        id: "premium",
        name: "Premium",
        price: "$1000",
        duration: "Lifetime",
        description: "All features unlocked forever",
        highlight: false,
        features: [
            { text: "Report unlimited issues", available: true },
            { text: "Boost issue priority", available: true },
            { text: "Faster authority response", available: true },
            { text: "Premium badge", available: true },
            { text: "Priority support", available: true },
        ],
        buttonText: "Select Premium"
    },
];

const PricingCards = () => {

    const { user } = UseAuth();

    const navigate = useNavigate();

    const [selectedId, setSelectedId] = useState("standard");

    const handlePurchase = () => {

        if (!user) {
            navigate("/login")
        }
        else {
            navigate("/dashboard/profile");
        }
    }

    return (
        <section className="py-6 md:py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fa0bd2]/10 text-[#fa0bd2] rounded-full text-xs font-black uppercase tracking-widest mb-2">
                        <Zap size={14} className="fill-current" />
                        <span>Pricing Plans</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter italic">
                        Choose Your <span className="text-[#fa0bd2]">Plan</span>
                    </h2>
                    <p className="text-base-content/50 font-medium max-w-md mx-auto">
                        Flexible plans designed to empower every citizen in our community.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => {
                        const isSelected = selectedId === plan.id;

                        return (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedId(plan.id)}
                                className={`
                                    relative cursor-pointer group
                                    bg-base-100 p-8 rounded-[2.5rem] border-2 transition-all duration-500
                                    ${isSelected
                                        ? "border-[#fa0bd2] shadow-2xl shadow-[#fa0bd2]/20 scale-[1.02]"
                                        : "border-base-200 hover:border-base-300 shadow-xl shadow-base-200/50"}
                                `}
                            >
                                {/* Highlight/Selection Badge */}
                                {(plan.highlight || isSelected) && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fa0bd2] text-white px-5 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-lg shadow-[#fa0bd2]/40 uppercase tracking-tighter">
                                        {isSelected ? <Check size={14} strokeWidth={4} /> : <Crown size={14} />}
                                        {isSelected ? "Selected" : "Most Popular"}
                                    </div>
                                )}

                                {/* Card Header */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-base-content tracking-tight mb-2 uppercase">
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-base-content tracking-tighter">
                                            {plan.price}
                                        </span>
                                        <span className="text-base-content/40 font-bold uppercase text-xs tracking-widest">
                                            {plan.duration}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-base-content/50 text-sm font-medium">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-4 mb-10">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`p-1 rounded-full ${feature.available ? "bg-green-500/10 text-green-500" : "bg-base-200 text-base-content/20"}`}>
                                                {feature.available ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
                                            </div>
                                            <span className={`text-sm font-bold ${feature.available ? "text-base-content/80" : "text-base-content/30 line-through"}`}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <button onClick={ handlePurchase}
                                    className={`
                                        w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer
                                        ${isSelected
                                            ? "bg-[#fa0bd2] text-white shadow-lg shadow-[#fa0bd2]/30 scale-95"
                                            : "bg-base-200 text-base-content/60 hover:bg-[#fa0bd2] hover:text-white"}
                                    `}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PricingCards;