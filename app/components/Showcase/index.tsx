"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Show() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-black">
      <main className="container mx-auto px-4 py-16 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Our Companies
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-8 flex flex-col items-center justify-center h-full cursor-pointer">
              <h2 className="text-5xl font-bold mb-4 text-center">Tundra</h2>
              <p className="text-xl text-gray-300 mb-6 text-center">
                Revolutionizing cold climate technology
              </p>
              <span className="inline-block bg-blue rounded-full px-4 py-2 text-lg font-semibold cursor-pointer">
                Coming Soon
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-8 flex flex-col items-center justify-center h-full cursor-pointer">
              <h2 className="text-5xl font-bold mb-4 text-center">eClass</h2>
              <p className="text-xl text-gray-300 mb-6 text-center">
                Transforming online education
              </p>
              <Link
                href="http://e-class-ffac7.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue transition-colors text-lg"
              >
                Visit eClass
                <ExternalLink className="ml-2 h-5 w-5" />
                <span className="sr-only">(opens in a new tab)</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
