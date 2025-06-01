import { useState } from "react";
import { Send, Mail, PhoneCall, ChevronDown, ChevronUp } from "lucide-react";

export default function SupportPage() {
  const [ticket, setTicket] = useState({ subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticket.subject && ticket.message) {
      setSubmitted(true);
      setTicket({ subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const previousTickets = [
    { id: 1, subject: "Payment issue", status: "Resolved" },
    { id: 2, subject: "Can't update profile", status: "Open" },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer: "Go to your profile settings and click 'Change Password'.",
    },
    {
      id: 2,
      question: "How can I post a job?",
      answer: "Click on 'Post a Job' in the navbar. Make sure you're logged in as an employer.",
    },
    {
      id: 3,
      question: "How do I contact support?",
      answer: "You can use the contact form below or submit a ticket above.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Support Center</h1>

      {/* Submit Ticket */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Submit a New Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={ticket.subject}
            onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
            className="w-full rounded px-3 py-2 text-black bg-gray-100 focus:outline-none"
            required
          />
          <textarea
            placeholder="Describe your issue..."
            value={ticket.message}
            onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
            className="w-full rounded px-3 py-2 h-32 text-black bg-gray-100 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
          >
            <Send size={16} /> Submit
          </button>
        </form>
        {submitted && (
          <p className="text-green-600 mt-2">Your ticket has been submitted!</p>
        )}
      </div>

      {/* Previous Tickets */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
        <ul className="space-y-3">
          {previousTickets.map((t) => (
            <li key={t.id} className="flex justify-between pb-2">
              <span>{t.subject}</span>
              <span
                className={`text-sm font-medium ${
                  t.status === "Resolved" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded bg-gray-50">
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center px-4 py-2 font-medium hover:bg-gray-100 text-black"
              >
                {faq.question}
                {openFAQ === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFAQ === faq.id && (
                <div className="px-4 py-2 text-black">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <div className="flex flex-col gap-2 text-black">
          <div className="flex items-center gap-2">
            <Mail size={18} /> support@jobsy.com
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={18} /> +880 1234-567890
          </div>
        </div>
      </div>
    </div>
  );
}
