import { Link } from "react-router";


const PartnerBanner = () => {
  return (
    <section className="bg-black py-12">
      <div className="main-container ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Side: Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Partner up with <span className="text-[#FA4318]">DropX</span> today
            </h2>
            <p className="text-gray-300 text-lg">
              Signing up takes only 2 mins
            </p>
          </div>

          {/* Right Side: Action Button */}
          <div className="shrink-0">
            <Link to="/register">
              <button className="bg-[#FA4318] hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-orange-900/50 transform hover:-translate-y-1">
                Sign up now
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerBanner;