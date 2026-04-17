import { assets } from "../assets/assets";

const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Featured Jobs", "Latest Jobs", "Contact Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["How to Apply", "Resume Tips", "Account Settings", "Employer Support", "Report a Job"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="px-6 md:px-90 lg:px-200
         xl:px-1 bg-black">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-amber-700 text-amber-300">
                <div>
                    <img className="w-34 md:w-32 bg-amber-100" src={assets.logo} alt="logo" />
                    <p className="max-w-[410px] mt-6" >Our job portal is dedicated to connecting talented job seekers with the right employers across various industries. We provide a reliable, fast, and user-friendly platform where you can explore the latest job opportunities and take the next step in your career. Our mission is to simplify the hiring process while helping individuals achieve their professional goals. We continuously strive to deliver updated listings and a seamless experience for both candidates and recruiters.?</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-amber-300 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright 2026 © <a href="https://www.careerbuilder.com/">CareerBuilder</a> All Right Reserved.
            </p>
        </div>
    );
};
export default Footer;