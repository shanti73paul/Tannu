import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
         {/* left section */}
         <div>
          <img src={assets.hero_img} alt="" />
         </div>
         {/*right section */}
         <div>
          <h2 className="text-3xl font-semibold text-gray-800">About Our Job Portal</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We connect talented individuals with top employers worldwide.Our mission is to simplify the job search process,making it faster,smarter,and more accesible for everyone.Whether you're a job seeker or a company looking to hire,our platform offers the per solution.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Explore thousands of job listings,apply seamlessly,and take your career to the next level with our modern and intuitive platform.
          </p>
          
         </div>
        </div>
        <div className="mt-12 bg-gray-100 rounded-xl p-6 shadow-inner">
        <h3 className="text-2xl text-gray-700 mb-3 font-semibold">Why Choose Us?</h3>
        <p className="text-gray-600 leading-relaxed">Thousands of verified job listings <br/>Easy application process <br /> Personalized job recommendations <br />Secure trustworthy platform</p>
        </div>
       </div>
       
    
  )
};

export default About;
