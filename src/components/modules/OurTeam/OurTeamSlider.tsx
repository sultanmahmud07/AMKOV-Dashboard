import img1 from '../../../assets/images/team/1.jpg'
import img2 from '../../../assets/images/team/2.jpg'
import img3 from '../../../assets/images/team/3.jpg'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const OurTeamSlider = () => {
  const data = [
    {
      id: 1,
      name: "Sultan Mahmud",
      img: img1,
      post: "Project Manager",
      socials: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/"
      }
    },
    {
      id: 2,
      name: "Farhana Jahan",
      img: img3,
      post: "UI/UX Designer",
      socials: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/"
      }
    },
    {
      id: 3,
      name: "Rakibul Islam",
      img: img2,
      post: "Lead Developer",
      socials: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/"
      }
    }
  ]

  return (
    <div className='py-4 md:py-7 my-6 md:my-10'>
      <div className="main-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="left_content w-full md:w-[45%]">
            <h5 className='text-primary font-bold capitalize md:text-sm'>Contact Us</h5>
            <h2 className='section_title text-2xl md:text-4xl mt-2'>
              Our <span className='text-primary'>Team</span>
            </h2>
            <p className="my-2 md:my-3">
              A great team is the foundation of every successful project, combining skills and creativity to achieve goals faster.
            </p>
          </div>
          <div className="left_content w-full md:w-[55%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center group">
                <div className="aspect-[16/20] w-full overflow-hidden rounded-lg relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h6 className="capitalize mt-2 font-semibold">{item.name}</h6>
                <p className='text-muted-foreground text-sm capitalize'>{item.post}</p>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mt-2 text-primary">
                  <a href={item.socials.facebook} target="_blank" rel="noreferrer">
                    <FaFacebookF className="hover:text-yellow-500 transition-colors duration-300" />
                  </a>
                  <a href={item.socials.twitter} target="_blank" rel="noreferrer">
                    <FaTwitter className="hover:text-yellow-500 transition-colors duration-300" />
                  </a>
                  <a href={item.socials.linkedin} target="_blank" rel="noreferrer">
                    <FaLinkedinIn className="hover:text-yellow-500 transition-colors duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurTeamSlider;
