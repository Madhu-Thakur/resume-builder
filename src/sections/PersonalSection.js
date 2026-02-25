import { useContext, useState, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";

function PersonalSection() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const personalInfo = resumeData.personalInfo || {};

  const [imagePreview, setImagePreview] = useState(
    personalInfo.profileImage || ""
  );
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        newErrors.name = value.trim() === '' ? 'Full name is required' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = value && !emailRegex.test(value) ? 'Please enter a valid email address' : '';
        break;
      case 'phone':
        const phoneRegex = /^[+]?[\d\s\-\(\)]{7,}$/;
        newErrors.phone = value && !phoneRegex.test(value) ? 'Please enter a valid phone number' : '';
        break;
      case 'linkedin':
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
        newErrors.linkedin = value && !linkedinRegex.test(value) ? 'Please enter a valid LinkedIn URL' : '';
        break;
      case 'github':
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
        newErrors.github = value && !githubRegex.test(value) ? 'Please enter a valid GitHub URL' : '';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField("personalInfo", {
      ...personalInfo,
      [name]: value
    });
    
    // Validate field on change
    validateField(name, value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Please upload a valid image file (JPEG, PNG)' }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      setErrors(prev => ({ ...prev, image: '' }));
      
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

  const removeImage = () => {
    setImagePreview('');
    updateField("personalInfo", {
      ...personalInfo,
      profileImage: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600 text-sm">Fill in your basic details to get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Field with Floating Label */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={personalInfo.name || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.name 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-indigo-500'
            }`}
            placeholder=" "
          />
          <label className={`absolute left-3 top-2 text-sm transition-all duration-300 pointer-events-none ${
            personalInfo.name 
              ? 'top-[-8px] text-xs text-indigo-600 bg-white px-1 -translate-y-1/2' 
              : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}>
            Full Name *
          </label>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={personalInfo.email || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.email 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-indigo-500'
            }`}
            placeholder=" "
          />
          <label className={`absolute left-3 top-2 text-sm transition-all duration-300 pointer-events-none ${
            personalInfo.email 
              ? 'top-[-8px] text-xs text-indigo-600 bg-white px-1 -translate-y-1/2' 
              : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}>
            Email Address
          </label>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.phone 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-indigo-500'
            }`}
            placeholder=" "
          />
          <label className={`absolute left-3 top-2 text-sm transition-all duration-300 pointer-events-none ${
            personalInfo.phone 
              ? 'top-[-8px] text-xs text-indigo-600 bg-white px-1 -translate-y-1/2' 
              : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}>
            Phone Number
          </label>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* LinkedIn Field */}
        <div className="relative">
          <input
            type="url"
            name="linkedin"
            value={personalInfo.linkedin || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.linkedin 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-indigo-500'
            }`}
            placeholder=" "
          />
          <label className={`absolute left-3 top-2 text-sm transition-all duration-300 pointer-events-none ${
            personalInfo.linkedin 
              ? 'top-[-8px] text-xs text-indigo-600 bg-white px-1 -translate-y-1/2' 
              : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}>
            LinkedIn Profile
          </label>
          {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
        </div>

        {/* GitHub Field */}
        <div className="relative">
          <input
            type="url"
            name="github"
            value={personalInfo.github || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.github 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-indigo-500'
            }`}
            placeholder=" "
          />
          <label className={`absolute left-3 top-2 text-sm transition-all duration-300 pointer-events-none ${
            personalInfo.github 
              ? 'top-[-8px] text-xs text-indigo-600 bg-white px-1 -translate-y-1/2' 
              : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}>
            GitHub Profile
          </label>
          {errors.github && <p className="text-red-500 text-xs mt-1">{errors.github}</p>}
        </div>

        {/* Portfolio Field */}
        <div className="relative">
          <input
            type="url"
            name="portfolio"
            value={personalInfo.portfolio || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 transition-all duration-300 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className={`absolute left-3 top-2 text-sm transition-all duration-300 pointer-events-none ${
            personalInfo.portfolio 
              ? 'top-[-8px] text-xs text-indigo-600 bg-white px-1 -translate-y-1/2' 
              : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}>
            Portfolio Website
          </label>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Photo</h3>
          <p className="text-gray-600 text-sm">Upload a professional photo (max 5MB, JPEG/PNG)</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Upload Area */}
          <div className="flex-1">
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-indigo-400 transition-colors duration-300">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
            {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
          </div>

          {/* Preview Area */}
          {imagePreview && (
            <div className="md:w-48 flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 shadow-lg"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">Profile photo preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalSection;