import { Apple, ChevronDown, ChevronUp, Play } from "lucide-react"

export default function MobileAppSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-400 to-green-500 min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 left-32 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-20 right-40 w-20 h-20 border border-white rounded-full"></div>
        {/* Leaf patterns */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <path d="M50 10 C30 10, 10 30, 10 50 C10 70, 30 90, 50 90 C70 90, 90 70, 90 50 C90 30, 70 10, 50 10 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Get The Mobile Apps</h2>

            <p className="text-lg md:text-xl text-green-100 leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn btn-lg bg-gray-800 hover:bg-gray-900 text-white border-none px-8">
                <Apple className="w-6 h-6 mr-2" />
                App Store
              </button>

              <button className="btn btn-lg bg-gray-800 hover:bg-gray-900 text-white border-none px-8">
                <Play className="w-6 h-6 mr-2" />
                Play Store
              </button>
            </div>
          </div>

          {/* Right Content - Mobile Mockups */}
          <div className="relative flex justify-center items-center">
            {/* Phone 1 - Background */}
            <div className="relative z-10 transform rotate-12 -mr-8">
              <div className="mockup-phone border-primary">
                <div className="camera"></div>
                <div className="display">
                  <div className="artboard artboard-demo phone-1 bg-gray-900 text-white p-4">
                    {/* Phone 1 Content */}
                    <div className="text-center mb-6">
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">JOBBOARD</h3>
                      <h4 className="text-lg font-bold mb-2">The Easiest Way To Get Your Dream Job</h4>
                      <p className="text-xs text-gray-400">
                        A fresh new free template handcrafted by the fine folks at Free-Template.co
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Job Title, Company..."
                        className="input input-sm w-full bg-white text-gray-800 text-xs"
                      />
                      <select className="select select-sm w-full bg-white text-gray-800 text-xs">
                        <option>Select Region</option>
                      </select>
                      <select className="select select-sm w-full bg-white text-gray-800 text-xs">
                        <option>Select Job Type</option>
                      </select>
                      <button className="btn btn-sm btn-success w-full text-xs">🔍 Search Job</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 - Foreground */}
            <div className="relative z-20 transform -rotate-6">
              <div className="mockup-phone border-primary">
                <div className="camera"></div>
                <div className="display">
                  <div className="artboard artboard-demo phone-1 bg-gray-900 text-white p-4">
                    {/* Phone 2 Content */}
                    <div className="text-center mb-6">
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">JOBBOARD</h3>
                      <h4 className="text-lg font-bold mb-2">The Easiest Way To Get Your Dream Job</h4>
                      <p className="text-xs text-gray-400">
                        A fresh new free template handcrafted by the fine folks at Free-Template.co
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3 mb-4">
                      <input
                        type="text"
                        placeholder="Job Title, Company..."
                        className="input input-sm w-full bg-white text-gray-800 text-xs"
                      />
                      <select className="select select-sm w-full bg-white text-gray-800 text-xs">
                        <option>Select Region</option>
                      </select>
                      <select className="select select-sm w-full bg-white text-gray-800 text-xs">
                        <option>Select Job Type</option>
                      </select>
                      <button className="btn btn-sm btn-success w-full text-xs">🔍 Search Job</button>
                    </div>

                    {/* Trending Keywords */}
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Trending Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="badge badge-sm bg-gray-700 text-white text-xs">UI Designer</span>
                        <span className="badge badge-sm bg-gray-700 text-white text-xs">Python</span>
                        <span className="badge badge-sm bg-gray-700 text-white text-xs">Developer</span>
                      </div>
                    </div>

                    {/* Bottom indicator */}
                    <div className="flex justify-center mt-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">↓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <ChevronUp className="w-6 h-6 text-gray-600" />
            </div>
          </div>
    </section>
  )
}
