import Image from 'next/image'
import about from '@@/about/owner.webp'

const MoreData = () => {
  return (
    <div className="py-8">
      <div className="main_container">
        <div className="flex flex-col md:flex-row gap-5 md:gap-16 items-start">
          {/* Left Image Section */}
          <div className='w-full md:w-[45%]'>
            <div className="p-4 bg-[#219D8033] rounded-lg">
              <Image
                src={about}
                alt="Organization Image"
                width={500}
                height={450}
                className="w-full rounded"
              />
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-[55%] space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
            <p>
              The organization has a strong management committee who are skilled on social development issues.
              CJUS has been implementing its development projects in field level with a skilled and trained staff team.
              The organization has been implementing its development projects with assistance from national and international
              donors, including the Bangladesh Government.
            </p>

            <div className="grid grid-cols-1 gap-2 text-sm md:text-base">
              <p><strong>Name Of Organization:</strong> Char O Janata Unnayan Sangstha (CJUS)</p>
              <p><strong>Short Name:</strong> CJUS</p>
              <p><strong>Address Of Organization:</strong> House- 4, Level- 2, Road-15 Block- D, Banani, Dhaka Bangladesh.</p>
              <p><strong>Cell Phone:</strong>+8801327357894</p>
              <p><strong>Email:</strong> dev.mrshimul@gmail.com</p>
              <p><strong>Year Of Establishment:</strong> 2009</p>
              <p><strong>Name Of Contact Person:</strong> Azadur Rahman</p>
              <p><strong>Designation Of Contact Person:</strong> Executive Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreData
