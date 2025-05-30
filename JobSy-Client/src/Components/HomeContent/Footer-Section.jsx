import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export default function FooterSection() {
  const searchTrendingLinks = ["Web Design", "Graphic Design", "Web Developers", "Python", "HTML5", "CSS3"]

  const companyLinks = ["About Us", "Career", "Blog", "Resources"]

  const supportLinks = ["Support", "Privacy", "Terms of Service"]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-gray-700 text-gray-300 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Search Trending Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Search Trending</h3>
            <ul className="space-y-3">
              {searchTrendingLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p className="flex items-center justify-center flex-wrap gap-1">
              <span>Copyright ©2025 All rights reserved |</span>
              <span>This template is made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by</span>
              <a href="#" className="text-white hover:text-green-400 transition-colors duration-200">
                Didar Ahmed Belal
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
