import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Link from "next/link";

interface ContactusformProps {
  isOpen: boolean; // Indicates whether the modal is open
  closeModal: () => void; // Function to close the modal
}

const Contactusform: React.FC<ContactusformProps> = ({
  isOpen,
  closeModal,
}) => {
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    const { input1, input2, input3 } = inputValues;

    // Format the message for WhatsApp
    const message = `Hello, I am ${input1}.%0AEmail: ${input2}%0A%0AMessage: ${input3}`;

    // Replace the placeholder number with your WhatsApp number
    const whatsappURL = `https://wa.me/2349110212491?text=${message}`;

    // Open the WhatsApp URL in a new tab
    window.open(whatsappURL, "_blank");

    closeModal();
  };

  const isDisabled = Object.values(inputValues).some((value) => value === "");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Modal Content */}
                <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                  <div className="flex flex-shrink-0 items-center justify-center">
                    <Link
                      href="/"
                      className="text-2xl sm:text-4xl font-semibold text-black"
                    >
                      Unicon Tech
                    </Link>
                  </div>
                  <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Contact us now? Want to send us feedback?
                  </p>
                  <form action="#" className="space-y-8">
                    <div>
                      <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your Name
                      </label>
                      <input
                        id="text"
                        name="input1"
                        value={inputValues.input1}
                        onChange={handleChange}
                        type="text"
                        required
                        className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Name..."
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your email
                      </label>
                      <input
                        id="email"
                        name="input2"
                        value={inputValues.input2}
                        onChange={handleChange}
                        type="email"
                        required
                        className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="xyz@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Your message
                      </label>
                      <textarea
                        id="message"
                        name="input3"
                        value={inputValues.input3}
                        onChange={handleChange}
                        className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Leave a comment..."
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={handleClick}
                      disabled={isDisabled}
                      className="py-3 px-5 text-sm disabled:opacity-50 font-medium w-full text-center text-white rounded-lg bg-blue focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Send message
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Contactusform;
