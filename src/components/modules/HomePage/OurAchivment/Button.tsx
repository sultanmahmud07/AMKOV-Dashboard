import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router";

const Button = () => {

  return (
    <Link to="/contact">
      <button  type="button" className="transition-transform duration-500 hover:scale-105 bg-primary flex items-center gap-2 md:text-md cursor-pointer rounded-md hover:bg-opacity-90 text-white p-2 md:p-3 md:px-6 font-semibold">
        Contact Now
        <span><FaArrowAltCircleRight /></span>
      </button>

    </Link>
  )
}

export default Button
