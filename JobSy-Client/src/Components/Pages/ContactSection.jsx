import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

import { Toaster, toast } from "react-hot-toast"; // Import Toaster and toast for notifications

import image1 from "../../assets/About/about1.webp"; // Ensure this path is correct
import image2 from "../../assets/About/about2.webp"; // Ensure this path is correct

export default function ContactPage() {
  const formRef = useRef(); // Create a ref for the form element
  const [sending, setSending] = useState(false); // State to manage sending status

  // Function to send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission
    setSending(true); // Set sending status to true

    emailjs
      .sendForm(
        "service_tedkcpv", // Your EmailJS Service ID
        "template_zigxkmb", // Your EmailJS Template ID
        formRef.current, // The form element
        "wBO8d0CXFOXOHd6bJ" // Your EmailJS Public Key
      )
      .then(
        (result) => {
          // On success
          toast.success("Message sent successfully!"); // Show success toast
          setSending(false); // Reset sending status
          formRef.current.reset(); // Reset the form fields
        },
        (error) => {
          // On error
          console.error("EmailJS Error:", error); // Log the error for debugging
          toast.error("Failed to send message. Please try again."); // Show error toast
          setSending(false); // Reset sending status
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toaster Container for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-4xl font-bold text-start text-gray-800 px-12 py-10 ">
        Contact Us!
      </h1>

      {/* Contact Form and Info Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Full Name (combining First Name and Last Name for simplicity with EmailJS template) */}
              {/* If your EmailJS template expects separate first_name and last_name, you'd need to adjust */}
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name" // Important for EmailJS
                  placeholder="Full Name"
                  required
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email" // Important for EmailJS
                  placeholder="Email address"
                  required
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject" // Important for EmailJS
                  placeholder="Subject of your message"
                  required
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message" // Important for EmailJS
                  rows={6}
                  placeholder="Write your notes or questions here..."
                  required
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending} // Disable button while sending
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors duration-200 ${
                  sending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {sending ? "Sending..." : "Send Your Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600 leading-relaxed">
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">Monday - Friday<br />9:00 - 17:00</p>
              <p className="text-green-600 font-medium">+1 232 3235 324</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mail Us</h3>
              <p className="text-gray-600">Support: help@example.com</p>
              <p className="text-yellow-600 font-medium">youremail@domain.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Happy Candidates Says</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Elisabeth Smith Testimonial */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-6 italic">
              "Ipsum harum assumenda in eum vel eveniet numquam cumque vero vitae enim cupiditate deserunt eligendi
              officia modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit"
            </p>
            <div className="flex items-center space-x-4">
              <img
                src={image1}
                alt="Elisabeth Smith"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Elisabeth Smith</h4>
                <p className="text-gray-500 text-sm">Creative Director</p>
              </div>
            </div>
          </div>

          {/* Chris Peter Testimonial */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-6 italic">
              "Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi
              officia modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit"
            </p>
            <div className="flex items-center space-x-4">
              <img
                src={image2}
                alt="Chris Peter"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Chris Peter</h4>
                <p className="text-gray-500 text-sm">Web Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
