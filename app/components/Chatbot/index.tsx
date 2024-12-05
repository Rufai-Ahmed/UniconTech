"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaTimes,
  FaComments,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

type Message = {
  text: string;
  isUser: boolean;
};

type QA = {
  question: string;
  answer: string;
};

const qaPairs: QA[] = [
  {
    question: "What services does UniconTech offer?",
    answer:
      "UniconTech offers cutting-edge services including website development, mobile app creation, software maintenance, project editing, and technical training. Our expertise spans across various technologies to deliver top-notch digital solutions.",
  },
  {
    question:
      "What’s the difference between Cybersecurity and Ethical Hacking courses?",
    answer:
      "The Cybersecurity course focuses on general network security, incident response, and protection techniques, while the Ethical Hacking course specializes in identifying vulnerabilities and securing systems using real-world hacking scenarios.",
  },
  {
    question:
      "Do I need prior coding experience for the Artificial Intelligence course?",
    answer:
      "While basic programming knowledge is helpful, it's not mandatory. Our class is designed to accommodate beginners, and we provide foundational coding lessons to help you get started with tools like TensorFlow and PyTorch.",
  },

  {
    question: "What does the Start-up Package include?",
    answer:
      "The Start-up Package includes full website development, mobile app creation, branding and logo design, and 6 months of post-launch support for a seamless business start-up experience.",
  },
  {
    question: "How long does the UI/UX Design training take?",
    answer:
      "The UI/UX Design training takes 2 months to complete. It covers user research, wireframing, prototyping, and mastering design tools like Figma and Adobe XD.",
  },
  {
    question:
      "Can I enroll in both Frontend and Backend Web Development courses?",
    answer:
      "Yes, you can enroll in both Frontend and Backend Web Development courses. Alternatively, you can opt for the Full Stack Web Development course, which combines both frontend and backend training.",
  },
  {
    question: "What is covered in Mobile App Development training?",
    answer:
      "The Mobile App Development training covers both frontend and backend technologies. You can choose to specialize in frontend (React Native) or backend (server-side programming, databases), or take the Full Stack course for end-to-end development.",
  },
  {
    question: "How is the Website Maintenance service charged?",
    answer:
      "The Website Maintenance service is charged at ₦99,000 per month. It includes regular updates, security monitoring, backups, content updates, and 24/7 support.",
  },
  {
    question: "What does the Web Development - Full Stack training include?",
    answer:
      "The Full Stack training combines frontend and backend development, full stack project execution, DevOps basics, deployment strategies, and 24/7 support to prepare you for end-to-end web development.",
  },
  {
    question: "Is support available during training and after projects?",
    answer:
      "Yes, all our training programs and project services include 24/7 expert support to ensure you have assistance whenever needed.",
  },
  {
    question: "How are complexity levels determined in services?",
    answer:
      "Complexity levels are determined by the features, customization, and scope of the project. Basic is for foundational setups, standard includes additional functionalities, and premium provides advanced options tailored to specific needs.",
  },
  {
    question: "Can I upgrade my service or training plan later?",
    answer:
      "Yes, you can upgrade your service or training plan at any time by contacting our support team. We'll guide you through the process based on your needs.",
  },
  {
    question: "How can I enroll in a course or start a project?",
    answer:
      "To enroll in a course or start a project, simply click the 'Enroll Now' or 'Start My Project' button on the desired service page and follow the instructions. Our team will get in touch with you shortly after.",
  },
  {
    question: "What kind of projects can I expect during training?",
    answer:
      "During training, you'll work on hands-on projects that mirror real-world scenarios, such as building responsive websites, securing networks, developing AI models, or creating mobile apps, depending on the course.",
  },
  {
    question: "How long does it take to develop a website?",
    answer:
      "The timeline for website development varies based on complexity. A simple website might take 4-6 weeks, while more intricate projects can extend to 3-6 months. We provide detailed, personalized timelines during our initial consultation to ensure transparency and efficient project management.",
  },
  {
    question: "Do you offer mobile app development?",
    answer:
      "We specialize in developing high-performance, user-centric mobile apps for both iOS and Android platforms. Our focus is on creating intuitive user interfaces, ensuring optimal performance, and delivering a seamless user experience across devices.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We leverage a wide array of cutting-edge technologies including React, Next.js, Node.js, React Native, TypeScript, Python, and Django. Our tech stack is carefully chosen for each project to ensure the best performance, scalability, and maintainability for your specific needs.",
  },
  {
    question: "Do you provide maintenance services?",
    answer:
      "Yes, we offer comprehensive maintenance services to keep your digital products in top shape. This includes regular updates, security patches, bug fixes, and performance optimizations. We ensure your software remains secure, efficient, and up-to-date with the latest technological advancements.",
  },
  {
    question: "Can you help with an existing project?",
    answer:
      "Our expert team specializes in project editing and enhancement. We can improve and update your existing websites or mobile apps, focusing on enhancing functionality, modernizing designs, optimizing performance, and ensuring your digital product meets current market standards and user expectations.",
  },
  {
    question: "Do you offer training services?",
    answer:
      "Yes, we provide extensive training programs tailored to your team's needs. Our training covers various aspects of web and mobile technologies, empowering your team to effectively manage and update your digital products. We offer both on-site and remote training options to suit your preferences.",
  },
  {
    question: "What is your development process?",
    answer:
      "Our development process is comprehensive and client-centric, involving these key steps: initial consultation, in-depth planning, creative design, agile development, rigorous testing, smooth deployment, and ongoing maintenance. We ensure clear communication and active client involvement throughout the entire journey.",
  },
  {
    question: "How can I get a quote for my project?",
    answer:
      "Getting a quote is easy! Simply email us at info@unicontech.com or call us at (555) 123-4567. We'll schedule a free consultation to discuss your project requirements in detail. Following this, we'll provide you with a comprehensive, no-obligation quote tailored to your specific needs and budget.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "We love working with startups and businesses of all sizes. Our services are scalable and can be tailored to meet the unique needs and budget constraints of startups. We offer special startup packages and can provide guidance on technology choices that allow for future growth and scalability.",
  },

  {
    question: "Do you offer UI/UX design services?",
    answer:
      "Yes, we specialize in creating intuitive, user-friendly designs that not only look great but also enhance the overall user experience. Our UI/UX design services focus on understanding your audience, creating wireframes and prototypes, and conducting usability testing to ensure your product is both functional and appealing.",
  },
  {
    question: "How do you ensure the best UI/UX design for my project?",
    answer:
      "We follow a user-centered design approach, focusing on your target audience and their specific needs. Our process includes research, wireframing, prototyping, user testing, and continuous feedback loops to ensure the final product delivers an exceptional user experience.",
  },
  {
    question: "What is your approach to software development?",
    answer:
      "Our approach to software development combines agile methodologies with best practices in coding and testing. We focus on delivering high-quality software in iterative cycles, ensuring that each phase meets your goals and allows for continuous improvement throughout the development process.",
  },
  {
    question: "Can you integrate third-party tools into my project?",
    answer:
      "Yes, we are experienced in integrating third-party tools and services into your project. Whether it's payment gateways, social media APIs, or cloud storage, we ensure seamless integration to extend your software's capabilities and enhance its functionality.",
  },
  {
    question: "Do you offer custom software development services?",
    answer:
      "Absolutely! We specialize in building custom software solutions tailored to meet the unique needs of your business. From web and mobile apps to complex enterprise solutions, our team works closely with you to develop software that aligns perfectly with your goals and requirements.",
  },
  {
    question: "What types of training do you offer?",
    answer:
      "We provide comprehensive training programs in web development (frontend, backend, and full stack), mobile app development, UI/UX design, cybersecurity, ethical hacking, and artificial intelligence. Each program is designed to equip you with practical skills and real-world expertise.",
  },

  {
    question: "Can I receive training on maintaining my website or mobile app?",
    answer:
      "Yes, we provide training on how to manage and maintain your website or mobile app after it has been launched. This includes content management, troubleshooting, updating features, and using analytics tools to track performance. We ensure that your team is self-sufficient in managing the software.",
  },
  {
    question: "How do you ensure security in software development?",
    answer:
      "We prioritize security in every phase of software development. Our practices include secure coding standards, encryption, regular security audits, and adhering to industry best practices to protect your data and user information. We also offer guidance on implementing security measures once your product is live.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, we offer comprehensive post-launch support to ensure your software continues to perform optimally. This includes bug fixes, performance monitoring, and any necessary updates to adapt to changes in the market or user feedback.",
  },
  {
    question: "What makes your development team unique?",
    answer:
      "Our development team is composed of highly skilled professionals with expertise across various technologies and industries. We combine creativity with technical proficiency to deliver solutions that are not only innovative but also highly functional and scalable.",
  },
  {
    question: "How do you handle project collaboration with clients?",
    answer:
      "We maintain open and transparent communication with our clients throughout the entire project. Our team uses collaborative tools and regular meetings to keep you updated on progress, address any concerns, and ensure that your feedback is incorporated into the development process.",
  },
];

export default function UniconTechChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm UniconTech's AI assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }]);
      setInput("");
      const answer = findAnswer(input);
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: answer, isUser: false }]);
        updateSuggestedQuestions();
        checkConversationEnd();
      }, 500);
    }
  };

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const match = qaPairs.find((qa) =>
      qa.question.toLowerCase().includes(lowerQuestion)
    );
    return match
      ? match.answer
      : "I apologize, but I don't have a specific answer for that question. Is there something else about UniconTech's services or process that I can help you with?";
  };

  const updateSuggestedQuestions = () => {
    const suggestions = qaPairs
      .filter((qa) => !messages.some((m) => m.text.includes(qa.question)))
      .slice(0, 3)
      .map((qa) => qa.question);
    setSuggestedQuestions(suggestions);
  };

  const checkConversationEnd = () => {
    if (messages.length > 5 && Math.random() > 0.7) {
      setShowConfetti(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for chatting with UniconTech's AI assistant! We hope we've answered all your questions. If you need any further assistance, please don't hesitate to ask or contact our team directly. Have a great day!",
            isUser: false,
          },
        ]);
        setShowConfetti(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (messages.length === 1) {
      updateSuggestedQuestions();
    }
  }, [messages]);

  const isMobile = windowSize.width < 640;

  return (
    <>
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <div
        className={`fixed ${
          isMobile ? "bottom-4 right-4" : "bottom-4 right-4"
        } z-50`}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-16 h-16 rounded-full bg-blue to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => setIsOpen(true)}
            >
              <FaComments className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden ${
                isMobile ? "fixed inset-0" : "w-96 h-[32rem]"
              }`}
            >
              <div className="bg-gradient-to-r from-blue to-darkpurple p-4 flex justify-between items-center">
                <h2 className="text-white font-bold text-lg">
                  UniconTech AI Assistant
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.isUser
                          ? "bg-blue text-white"
                          : "bg-grey text-gray"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.isUser ? (
                          <FaUser className="w-4 h-4" />
                        ) : (
                          <FaRobot className="w-4 h-4" />
                        )}
                        <span className="font-semibold">
                          {message.isUser ? "You" : "AI Assistant"}
                        </span>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {suggestedQuestions.length > 0 && (
                <div className="p-4 bg-gray-100">
                  <p className="text-sm text-gray-600 mb-2">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInput(question);
                          handleSendMessage();
                        }}
                        className="bg-white text-blue-500 text-sm py-1 px-3 rounded-full border border-blue hover:bg-blue hover:text-white transition-colors duration-300"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-4 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex space-x-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue text-white p-2 rounded-lg hover:bg-blue transition-colors duration-300"
                  >
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
