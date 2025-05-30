import { Link } from "react-router-dom"
import blog1 from "../../assets/Blogs/blog1.webp"
import blog2 from "../../assets/Blogs/blog2.webp"
import blog3 from "../../assets/Blogs/blog3.webp"
import blog4 from "../../assets/Blogs/blog4.webp"
import blog5 from "../../assets/Blogs/blog5.webp"
import blog6 from "../../assets/Blogs/blog6.webp"
export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "7 Factors for Choosing Between Two Jobs",
      date: "April 15, 2019",
      comments: 2,
      image: blog1,
      alt: "Person with dog on beach",
    },
    {
      id: 2,
      title: "How to Write a Creative Cover Letter",
      date: "April 15, 2019",
      comments: 2,
      image: blog2,
      alt: "Travel items on map",
    },
    {
      id: 3,
      title: "The Right Way to Quit a Job You Started",
      date: "April 15, 2019",
      comments: 2,
      image: blog3,
      alt: "Curved architectural ceiling",
    },
    {
      id: 4,
      title: "7 Factors for Choosing Between Two Jobs",
      date: "April 15, 2019",
      comments: 2,
      image: blog4,
      alt: "Person taking photos by ocean",
    },
    {
      id: 5,
      title: "How to Write a Creative Cover Letter",
      date: "April 15, 2019",
      comments: 2,
      image: blog5,
      alt: "Modern geometric architecture",
    },
    {
      id: 6,
      title: "The Right Way to Quit a Job You Started",
      date: "April 15, 2019",
      comments: 2,
      image: blog6,
      alt: "People working at computers",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
               <h1 className="text-4xl font-bold text-start text-gray-800 px-12 py-12 mb-5">
        Our Blogs
      </h1>

      <div className="container mx-auto px-4 py-16">
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              {/* Blog Post Image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Link to={"/details"}><img
                  src={post.image || "/placeholder.svg"}
                  alt={post.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                /></Link>
              </div>

              {/* Blog Post Content */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="text-green-600 font-medium">{post.comments} Comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button className="px-4 py-2 text-gray-500 hover:text-green-600 transition-colors duration-200">Prev</button>

          <button className="w-10 h-10 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors duration-200">
            1
          </button>

          <button className="w-10 h-10 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200">
            2
          </button>

          <button className="w-10 h-10 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200">
            3
          </button>

          <button className="w-10 h-10 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200">
            4
          </button>

          <button className="px-4 py-2 text-gray-500 hover:text-green-600 transition-colors duration-200">Next</button>
        </div>
      </div>
    </div>
  )
}
