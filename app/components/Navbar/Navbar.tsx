"use client";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Contactusform from "./Contactus";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "About Us", href: "#aboutus-section", current: false },
  { name: "Services", href: "#services-section", current: false },
  { name: "FAQ", href: "#faq-section", current: false },
  { name: "Blog", href: "#blog-section", current: false },
  { name: "Testimonial", href: "#testimonial-section", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <Disclosure as="nav" className="navbar z-50">
      <React.Fragment>
        <div className="mx-auto max-w-7xl p-3 md:p-4 lg:px-8 ">
          <div className="relative flex h-12 sm:h-20 items-center z-50">
            <div className="flex flex-1 items-center sm:justify-between">
              {/* LOGO */}
              <div className="flex flex-shrink-0 items-center border-right">
                <Link
                  href="/"
                  className="text-2xl sm:text-4xl font-semibold text-black"
                >
                  UNICON TECH
                </Link>
              </div>

              {/* LINKS */}
              <div className="hidden lg:flex items-center border-right">
                <div className="flex justify-end space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900"
                          : "navlinks hover:text-black",
                        "px-3 py-4 rounded-md text-lg font-normal"
                      )}
                      aria-current={item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CONTACT US BUTTON */}
              <button
                className="hidden lg:flex justify-end text-xl font-semibold bg-transparent py-4 px-6 lg:px-12 navbutton rounded-full hover:bg-navyblue hover:text-white"
                onClick={() => setIsContactFormOpen(true)}
              >
                Contact us
              </button>

              {/* CONTACT US FORM */}
              {isContactFormOpen && (
                <Contactusform
                  isOpen={isContactFormOpen}
                  closeModal={() => setIsContactFormOpen(false)}
                />
              )}
            </div>

            {/* DRAWER FOR MOBILE VIEW */}
            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </React.Fragment>
    </Disclosure>
  );
};

export default Navbar;
