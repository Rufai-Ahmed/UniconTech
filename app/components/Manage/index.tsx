"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import Image from "next/image";

interface ComplexityPricing {
  basic: number;
  standard: number;
  premium: number;
}

interface Plan {
  heading: string;
  basePrice: number;
  complexityPricing: ComplexityPricing;
  user: string;
  button: string;
  features: string[];
  category: string;
}

const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(1)}m`;
  } else if (price >= 1000) {
    return `₦${(price / 1000).toFixed(0)}k`;
  } else {
    return `₦${price}`;
  }
};

const plans = [
  {
    heading: "Website Creation",
    basePrice: 250000,
    complexityPricing: { basic: 250000, standard: 1000000, premium: 2500000 },
    user: "one-time fee",
    button: "Get Started Now",
    features: [
      "Custom Responsive Design",
      "SEO Optimization",
      "Content Management System",
      "Up to 5 Pages",
      "24/7 Support",
    ],
    category: "Build/Desing",
  },
  {
    heading: "Mobile Application Development",
    basePrice: 1500000,
    complexityPricing: { basic: 1500000, standard: 3000000, premium: 5000000 },
    user: "one-time fee",
    button: "Start My Project",
    features: [
      "Cross-Platform Compatibility",
      "User-Friendly Interface",
      "In-App Purchases Integration",
      "Push Notifications",
      "24/7 Support",
    ],
    category: "Build/Desing",
  },
  {
    heading: "UI/UX Design",
    basePrice: 200000,
    complexityPricing: { basic: 200000, standard: 350000, premium: 500000 },
    user: "per project",
    button: "Get Your Design",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "User Testing & Feedback",
      "Visual Design",
      "24/7 Support",
    ],
    category: "Build/Desing",
  },
  {
    heading: "Start-up Package",
    price: 6000000,
    user: "per project",
    button: "Launch Your Start-up",
    features: [
      "Full Website Development",
      "Mobile App Development",
      "Branding & Logo Design",
      "6 Months Post-Launch Support",
    ],
    category: "Build/Desing",
  },
  {
    heading: "Website Maintenance",
    price: 99000,
    user: "per month",
    button: "Subscribe Now",
    features: [
      "Regular Updates",
      "Security Monitoring",
      "Backup Services",
      "Content Updates",
      "24/7 Support",
    ],
    category: "Build/Desing",
  },
  {
    heading: "App Maintenance",
    price: 149000,
    user: "per month",
    button: "Subscribe Now",
    features: [
      "Regular Updates",
      "Performance Monitoring",
      "Bug Fixes",
      "User Feedback Implementation",
      "24/7 Support",
    ],
    category: "Build/Desing",
  },
  {
    heading: "Web Development - Frontend",
    price: 120000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "HTML, CSS, JavaScript",
      "React.js",
      "Responsive Design",
      "Web Accessibility",
      "24/7 Support",
    ],
    category: "Training",
  },
  {
    heading: "Web Development - Backend",
    price: 120000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "Node.js",
      "Express.js",
      "Database Management",
      "RESTful APIs",
      "24/7 Support",
    ],
    category: "Training",
  },
  {
    heading: "Web Development - Full Stack",
    price: 240000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "Frontend & Backend Technologies",
      "Full Stack Projects",
      "DevOps Basics",
      "Deployment Strategies",
      "24/7 Support",
    ],
    category: "Training",
  },
  {
    heading: "Cybersecurity",
    price: 299999,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "Comprehensive Cybersecurity Training",
      "Network Security Fundamentals",
      "Incident Response Techniques",
      "24/7 Expert Support",
    ],
    category: "Training",
  },
  {
    heading: "Ethical Hacking",
    price: 299999,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "Introduction to Hacking Techniques",
      "Hands-on Practice with Real-world Scenarios",
      "Understanding Vulnerabilities and Exploits",
      "Tools and Methods for Ethical Hacking",
      "24/7 Expert Support",
    ],
    category: "Training",
  },
  {
    heading: "Artificial Intelligence",
    price: 350000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "Fundamentals of Artificial Intelligence",
      "Hands-on Machine Learning Projects",
      "Deep Learning and Neural Networks",
      "AI Tools and Frameworks (TensorFlow, PyTorch)",
      "24/7 Expert Support",
    ],
    category: "Training",
  },

  {
    heading: "Mobile App Development - Frontend",
    price: 200000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "React Native",
      "User Interface",
      "State Management",
      "Native APIs",
      "24/7 Support",
    ],
    category: "Training",
  },
  {
    heading: "Mobile App Development - Backend",
    price: 200000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "Server-side Programming",
      "Mobile Databases",
      "Push Notifications",
      "API Development",
      "24/7 Support",
    ],
    category: "Training",
  },
  {
    heading: "Mobile App Development - Full Stack",
    price: 400000,
    user: "3 Months",
    button: "Enroll Now",
    features: [
      "End-to-end Mobile Development",
      "Cross-platform Solutions",
      "App Store Deployment",
      "Performance Optimization",
      "24/7 Support",
    ],
    category: "Training",
  },
  {
    heading: "UI/UX Design",
    price: 100000,
    user: "2 Months",
    button: "Enroll Now",
    features: [
      "Fundamentals of User Interface Design",
      "Creating User-Centered Designs",
      "Prototyping and Wireframing",
      "Design Tools Mastery (Figma, Adobe XD)",
      "24/7 Support and Guidance",
    ],
    category: "Training",
  },
];

const Manage = () => {
  const [enabled, setEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Build/Desing");
  const [selectedComplexity, setSelectedComplexity] = useState<
    "basic" | "standard" | "premium"
  >("basic");

  const toggleEnabled = () => {
    setEnabled(!enabled);
    setSelectedCategory(enabled ? "Build/Desing" : "Training");
  };

  const filteredPlans = plans.filter(
    (plan) => plan.category === selectedCategory
  );

  const handleButtonClick = (planName: string) => {
    const message = encodeURIComponent(
      `I'm interested in the ${planName} plan. Can you provide more information?`
    );
    window.open(`https://wa.me/2349110212491?text=${message}`, "_blank");
  };

  const getComplexityPrice = (plan: Plan) => {
    return formatPrice(plan.complexityPricing[selectedComplexity]);
  };

  return (
    <div id="services-section">
      <div className="mx-auto max-w-7xl sm:py-20 lg:px-8 my-16">
        <h3 className="text-center text-4xl sm:text-65xl font-black">
          Manage Your Digital Solutions <br /> All in One Place.
        </h3>

        {/* <div className="flex flex-col items-center mt-8">
          <div className="flex items-center mb-2">
            <label className="mr-3 font-extrabold text-2xl md:text-xl text-center">
              Complexity:
            </label>
            <select
              value={selectedComplexity}
              onChange={(e) =>
                setSelectedComplexity(
                  e.target.value as "basic" | "standard" | "premium"
                )
              }
              className="border border-gray-300 rounded-md px-3 py-1 font-bold text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <p className="text-base md:text-lg text-center font-extrabold text-gray-800">
            If your work requires higher complexity, please select
            &ldquo;Premium&ldquo; or contact us for a customized solution.
          </p>
        </div> */}

        <div className="md:flex md:justify-around mt-20">
          <div className="flex gap-5 justify-center md:justify-start">
            <Image
              src="/images/manage/right.svg"
              alt="right-icon"
              width={21}
              height={14}
            />
            <h4 className="text-lg font-semibold">Dedicated Support</h4>
          </div>
          <div className="flex gap-5 justify-center md:justify-start">
            <Image
              src="/images/manage/right.svg"
              alt="right-icon"
              width={21}
              height={14}
            />
            <h4 className="text-lg font-semibold">Custom Solutions</h4>
          </div>
          <div className="flex gap-5 justify-center md:justify-start">
            <Image
              src="/images/manage/right.svg"
              alt="right-icon"
              width={21}
              height={14}
            />
            <h4 className="text-lg font-semibold">Ongoing Improvements</h4>
          </div>
        </div>

        <div className="mt-6 relative">
          <div className="dance-text mb-5">Flexible Payment Options</div>
          <Image
            src="/images/manage/toggle.svg"
            alt="toggle-image"
            width={24}
            height={24}
            className="toggleImage"
          />
          <div className="flex justify-center">
            <h3 className="text-base font-extrabold mr-5">
              Software Development-UI/UX
            </h3>
            <Switch
              checked={enabled}
              onChange={toggleEnabled}
              className={`${
                enabled ? "bg-darkpurple" : "bg-darkpurple"
              } relative inline-flex h-8 w-11 items-center rounded-full`}
            >
              <span className="sr-only text-black">Enable subscription</span>
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <h3 className="text-base font-extrabold ml-5">Training</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16 mx-5 gap-14 manage">
          {filteredPlans.map((plan, i) => (
            <div className="manageTabs text-center p-10" key={i}>
              <h4 className="text-2xl font-bold mb-3">{plan.heading}</h4>
              <h2 className="text-5xl sm:text-65xl font-extrabold mb-3">
                {plan.complexityPricing
                  ? getComplexityPrice(plan)
                  : formatPrice(plan.price)}
              </h2>

              <p className="text-sm font-medium text-darkgrey mb-6">
                {plan.user}
              </p>
              <button
                className="text-sm font-bold text-blue bg-transparent hover:bg-blue hover:text-white border-2 border-blue rounded-full py-4 px-12 mb-6"
                onClick={() => handleButtonClick(plan.heading)}
              >
                {plan.button}
              </button>
              <hr style={{ color: "darkgrey", width: "50%", margin: "auto" }} />
              <h3 className="text-sm font-medium text-darkgrey mb-3 mt-6">
                Features:
              </h3>
              <ul className="text-sm font-medium text-darkgrey mb-3">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manage;
