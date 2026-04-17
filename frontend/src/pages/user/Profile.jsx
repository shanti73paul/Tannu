import { useContext, useEffect } from "react";
import { useState } from "react"

import { AppContext } from "../../context/AppContext";

import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const {user,axios,setUser}=useContext(AppContext);
const [formData,setFormData]=useState({
     name: "",
     email: "",
     phone: "",
     location: "",
     education: "",
     experience: "",
     skills: "",
     about: "",
     profileImage: null,
     resume: null,


}

)
const [preview,setPreview]=useState(null);
const handleChange=(e)=>{
    const {name,value,files}= e.target;
    if (files) {
        setFormData({ ...formData,[name]: files[0] });
    }else{
        setFormData({ ...formData,[name]: value });
    }
};
useEffect(()=>{
if(user) {
  setFormData({
    name:user.name,
    email:user.email,
    phone:user.phone,
    location:user.location,
    education:user.education,
    experience:user.experience,
    skills:user.skills,
    about:user.about,
     resume:user.resume,
    profileImage:user.image,
   }

  );
}
},[user]
)
const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const formPlayload=new FormData();
  formPlayload.append("name",formData.name);
  formPlayload.append("email",formData.email);
  formPlayload.append("phone",formData.phone);
  formPlayload.append("location",formData.location);
  formPlayload.append("education",formData.education);
  formPlayload.append("experience",formData.experience);
  formPlayload.append("skills",formData.skills);
  formPlayload.append("about",formData.about);
  formPlayload.append("resume",formData.resume);
  formPlayload.append("profileImage",formData.profileImage);


  const { data } = await axios.put(`http://localhost:5000/user/update-profile/${user._id}`, formPlayload,{
    headers: {
      "Content-Type": "multipart/form-data",
    },

  }

  );
  if(data.success) {
    setUser(data.user);
    toast.success(data.message);
  }
 
} catch (error) {
  toast.error(error.response.data.message);
}
};
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            {preview&&(
                <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-full mb-4" />
            )

            }
        </div>

        {formData.profileImage && (
          <img src={formData?.profileImage ? `http://localhost:5000/uploads/${formData.profileImage}` : ""} alt="" className="w-24 h-24 object-cover rounded-full mb-4" />
        )
        }

        <div>
            <label className="block mb-1 font-semibold">Profile Image</label>
            <input type="file"
            name="profileImage"
            onChange={handleChange} />
        </div>
         <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} className="w-full border rounded p-2 required"
            autoComplete="name" />
        </div>
         <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input 
            type="email"
            name="email"
            value={formData.email} 
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-100"
            autoComplete="email" />
        </div>
        <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input 
            type="text"
            name="phone"
            value={formData.phone} 
            onChange={handleChange}
          className="w-full border rounded p-2"
          autoComplete="tel" />
        </div>
        <div>
            <label className="block mb-1 font-semibold">Location</label>
            <input 
            type="text"
            name="location"
            value={formData.location} 
            onChange={handleChange}
          className="w-full border rounded p-2"/>
        </div>
        <div>
            <label className="block mb-1 font-semibold">Education</label>
            <input 
            type="text"
            name="education"
            value={formData.education} 
            onChange={handleChange}
          className="w-full border rounded p-2"/>
        </div>
        <div>
            <label className="block mb-1 font-semibold">Experience</label>
            <input 
            type="text"
            name="experience"
            value={formData.experience} 
            onChange={handleChange}
          className="w-full border rounded p-2 "/>
        </div>
        <div>
            <label className="block mb-1 font-semibold">Skills</label>
            <textarea
            type="skills"
            name="skills"
            value={formData.skills} 
            onChange={handleChange}
          className="w-full border rounded p-2 "
          row="2"
          placeholder="React,Node.js,MongoDB"></textarea>
        </div>
        <div>
            <label className="block mb-1 font-semibold">About Me</label>
            <textarea
             name="about"
            value={formData.about} 
            onChange={handleChange}
          className="w-full border rounded p-2 "
          row="3"
          placeholder="Tell us something about yourself....."></textarea>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Resume (PDF/DOC)</label>
          <input type="file" name="resume" onChange={handleChange} />
        </div>
         
         {formData.resume&&(
          <div className="mt-2">
            <a href={`http://localhost:5000/uploads/${formData.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
               >View Resume</a>
          </div>
         )}


       <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
         Update Profile
       </button>
      </form>
    </div>
  )
};

export default Profile;
