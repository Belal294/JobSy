import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import image1 from "../../assets/Carousel/image1.png"
import image2 from "../../assets/Carousel/image2.png"
import image3 from "../../assets/Carousel/image1.png"

const testimonials = [
  {
    id: 1,
    quote:
      "Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.",
    name: "Corey Woods",
    company: "@Dribbble",
    image: image1,
  },
  {
    id: 2,
    quote:
      "Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.",
    name: "Chris Peters",
    company: "@Google",
    image: image2,
  },
  {
    id: 3,
    quote:
      "Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.",
    name: "Sarah Johnson",
    company: "@Microsoft",
    image: image3,
  },
]

export default function TestimonialCarousel() {
  return (
    <section className="px-4 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={50}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Text Section */}
                <div className="space-y-8">
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl text-gray-600 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span className="text-lg">—</span>
                    <span className="text-lg font-medium">{testimonial.name}</span>
                    <span className="text-lg">{testimonial.company}</span>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center lg:justify-end h-full">
                    <img
                        src={testimonial.image}
                        alt={`${testimonial.name} testimonial`}
                        className="h-full object-cover rounded-lg mt-5.5"
                    />
                    </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
