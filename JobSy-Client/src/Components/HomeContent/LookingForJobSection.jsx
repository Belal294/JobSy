import { Link } from "react-router-dom";

export default function LookingForJobSection() {
  return (
    <div
      className="w-full bg-lime-500 bg-opacity-90 py-12 px-4 flex flex-col md:flex-row items-center justify-around"
      style={{
        backgroundImage: "url('/your-image-path.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Text */}
      <div className="text-center md:text-left text-white mb-6 md:mb-0 max-w-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Looking For A Job?</h2>
        <p className="text-md md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.
        </p>
      </div>

      {/* Right Button */}
      <Link to={"/signup"}
      className="bg-yellow-200/80 hover:bg-yellow-200 text-black font-semibold px-25 py-4  transition">
        Sign Up
      
      </Link>
    </div>
  );
}
