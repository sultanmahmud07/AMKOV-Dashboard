/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAddContactMutation } from '@/redux/features/contact/contact.api';
import { IApiError } from '@/types';
import { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [addContact] = useAddContactMutation();
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const contactInfo = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    }
    try {
      const res = await addContact(contactInfo).unwrap();
      if (res.success) {
        toast.success("Message send successfully");
        setIsLoading(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });

      }
    } catch (err) {
      console.error(err);
      const error = err as IApiError;
      setIsLoading(false);
      toast.error(error?.data?.message || "Failed to create Contact");
    }
  };

  return (
    <div className="py-16">
      <div className="main-container">
        {/* Header */}
        <div className="mb-8">
          <h6 className="text-lg font-medium  border-l-4 border-primary pl-2">
            Get In Touch
          </h6>
          <h2 className="text-3xl font-bold  mt-2">Send Me A Message</h2>
        </div>

        {/* Form and Address */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Form */}
          <div className="w-full md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm  mb-1">Fast name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border bg-secondary rounded focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm  mb-1">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border bg-secondary rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm  mb-1">Mail</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border bg-secondary rounded focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm  mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+880"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border bg-secondary rounded focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm  mb-1">Massage</label>
                <textarea
                  name="message"
                  placeholder="Type Your Massage Here..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border bg-secondary rounded focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white cursor-pointer transition flex items-center gap-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

            </form>
          </div>

          {/* Address */}
          <div className="w-full md:w-2/5">
            <div className=" bg-secondary mt-6 p-6 rounded shadow-sm">
              <h4 className="text-xl md:text-2xl font-bold mb-3">Address</h4>
              <p className=" mb-4">
                Experience fast, secure, and affordable parcel services. From documents to heavy shipments, we ensure your deliveries reach the right place at the right time.
              </p>

              <p className="font-semibold ">
                Location: <span className="font-normal">
                   Banani, Dhaka, Bangladesh.
                </span>
              </p>

              <p className="mt-2 font-semibold">
                Phone: <span className="font-normal">+8801327-357894</span>
              </p>

              <p className="mt-2 font-semibold">
                Email: <span className="font-normal">dev.mrshimul@gmail.com</span>
              </p>
             <div className="flex items-center gap-3 py-5">
                        <a href="https://www.facebook.com/joltorongo.awt" className="flex items-center justify-center transition text-primary text-xl">
                          <FaFacebookF />
                        </a>
                        <a href="https://www.instagram.com/jol.torongo.coxbazar" className="flex items-center justify-center transition text-primary text-xl">
                          <IoLogoInstagram />
                        </a>
                        <a href="https://www.linkedin.com/company/joltorongo" className="flex items-center justify-center transition text-primary text-xl">
                          <FaLinkedinIn />
                        </a>
                        <a
                          href="https://www.youtube.com/@JoltorongoAWT"
                          className="flex items-center justify-center transition text-primary text-xl"
                        >
                          <FaYoutube />
                        </a>
                      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
