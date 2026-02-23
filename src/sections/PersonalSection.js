import { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";

function PersonalSection() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const personalInfo = resumeData.personalInfo || {};

  const [imagePreview, setImagePreview] = useState(
    personalInfo.profileImage || ""
  );

  const handleChange = (e) => {
    updateField("personalInfo", {
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        updateField("personalInfo", {
          ...personalInfo,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={personalInfo.name || ""}
          onChange={handleChange}
          className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalInfo.email || ""}
          onChange={handleChange}
          className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={personalInfo.phone || ""}
          onChange={handleChange}
          className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={personalInfo.linkedin || ""}
          onChange={handleChange}
          className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={personalInfo.github || ""}
          onChange={handleChange}
          className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="portfolio"
          placeholder="Portfolio URL"
          value={personalInfo.portfolio || ""}
          onChange={handleChange}
          className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Profile Image</label>

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 w-32 h-32 object-cover rounded-full shadow-lg"
          />
        )}
      </div>
    </div>
  );
}

export default PersonalSection;