import image1 from "../../../assets/BlogDetails/Image1.webp"
import image2 from "../../../assets/BlogDetails/image2.webp"
export default function BlogDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Blog Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h1>

            {/* Blog Introduction */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda nihil aspernatur nemo sunt, qui, harum
              repudiandae quisquam eaque dolore itaque quod tenetur quo quos labore?
            </p>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={image1}
                alt="People working on laptops"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none text-gray-600 space-y-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae expedita cumque necessitatibus ducimus
                debitis totam, quasi praesentium eveniet tempore possimus illo esse, facilis? Corrupti possimus quae
                ipsa pariatur cumque, accusantium tenetur voluptatibus incidunt reprehenderit, quidem repellat sapiente,
                id, earum obcaecati.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident vero tempora aliquam excepturi
                labore, ad soluta voluptate necessitatibus. Nulla error beatae, quam, facilis suscipit quaerat aperiam
                minima eveniet quis placeat.
              </p>

              <p>
                Eveniet deleniti accusantium nulla natus nobis nam asperiores ipsa minima laudantium vero cumque
                cupiditate ipsum ratione dicta, expedita quae, officiis provident harum nisi! Esse eligendi ab
                molestias, quod nostrum hic saepe repudiandae non. Suscipit reiciendis tempora ut, saepe temporibus
                nemo.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h2>

              <p>
                Accusamus, temporibus, ullam. Voluptate consectetur laborum totam sunt culpa repellat, dolore voluptas.
                Quaerat cum ducimus aut distinctio sit, facilis corporis ab vel alias, voluptas aliquam, expedita
                molestias quisquam sequi eligendi nobis ea error omnis consequatur iste deleniti illum, dolorum odit.
              </p>

              <p>
                In adipisci corporis at delectus! Cupiditate, voluptas, in architecto odit id error reprehenderit quam
                quibusdam excepturi distinctio dicta laborum deserunt qui labore dignissimos necessitatibus reiciendis
                tenetur corporis quas explicabo exercitationem suscipit. Nisi quo nulla, nihil harum obcaecati vel atque
                quos.
              </p>

              <p>
                Amet sint explicabo maxime accusantium qui dicta enim quia, nostrum id libero voluptates quae suscipit
                dolor quam tenetur dolores inventore illo laborum, corporis non ex, debitis quidem obcaecati!
                Praesentium maiores illo atque error! Earum, et, fugit. Sint, delectus molestiae. Totam.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa iste, repudiandae facere aperiam
                sapiente, officia delectus soluta molestiae nihil corporis animi quos ratione qui labore? Sint eaque
                perspiciatis minus illum.
              </p>

              <p>
                Consectetur porro odio quod iure quaerat cupiditate similique, dolor reprehenderit molestias provident,
                esse dolorum omnis architecto magni amet corrupti neque ratione sunt beatae perspiciatis? Iste pariatur
                omnis sed ut itaque.
              </p>

              <p>
                Id similique, rem ipsam accusantium iusto dolores sit velit ex quas ea atque, molestiae. Sint, sed.
                Quisquam, suscipit! Quisquam quibusdam maiores fugiat eligendi eius consequuntur, molestiae saepe
                commodi expedita nemo!
              </p>
            </div>

            {/* Comments Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">6 Comments</h3>

              <div className="space-y-8">
                {/* Comment 1 */}
                <div className="flex gap-4">
                  <img
                    src={image2}
                    alt="Jacob Smith"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="mb-1">
                      <h4 className="font-semibold text-gray-900">Jacob Smith</h4>
                      <p className="text-sm text-gray-500">JANUARY 9, 2018 AT 2:21PM</p>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus,
                      ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
                      impedit necessitatibus, nihil?
                    </p>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded transition-colors duration-200">
                      REPLY
                    </button>
                  </div>
                </div>

                {/* Comment 2 */}
                <div className="flex gap-4">
                  <img
                    src={image2}
                    alt="Chris Meyer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="mb-1">
                      <h4 className="font-semibold text-gray-900">Chris Meyer</h4>
                      <p className="text-sm text-gray-500">JANUARY 9, 2018 AT 2:21PM</p>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus,
                      ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
                      impedit necessitatibus, nihil?
                    </p>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded transition-colors duration-200">
                      REPLY
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a comment</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            {/* Search */}
            <div className="mb-12">
            <input
                type="text"
                placeholder="Type a keyword and hit enter"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            </div>


            {/* Author Info */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-12">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={image2}
                  alt="Author"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">About The Author</h3>
              </div>
              <p className="text-gray-600 text-center mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate
                quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos
                fugit cupiditate numquam!
              </p>
              <div className="text-center">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                    Creatives
                  </a>
                  <span className="text-gray-500">(12)</span>
                </li>
                <li className="flex justify-between items-center">
                  <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                    News
                  </a>
                  <span className="text-gray-500">(22)</span>
                </li>
                <li className="flex justify-between items-center">
                  <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                    Design
                  </a>
                  <span className="text-gray-500">(37)</span>
                </li>
                <li className="flex justify-between items-center">
                  <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                    HTML
                  </a>
                  <span className="text-gray-500">(42)</span>
                </li>
                <li className="flex justify-between items-center">
                  <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                    Web Development
                  </a>
                  <span className="text-gray-500">(14)</span>
                </li>
              </ul>
            </div>

            {/* Paragraph */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Paragraph</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate
                quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos
                fugit cupiditate numquam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
