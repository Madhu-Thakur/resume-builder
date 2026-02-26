import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

function CertificationsSection() {
  const { resumeData, addItem, removeItem, updateField } = useContext(ResumeContext);
  const certifications = resumeData.certifications || [];

  const [errors, setErrors] = useState({});

  const handleCertificationChange = (index, field, value) => {
    const updated = [...certifications];
    if (!updated[index]) {
      updated[index] = {
        name: '',
        provider: '',
        completionId: '',
        url: '',
        validity: ''
      };
    }
    updated[index] = { ...updated[index], [field]: value };
    updateField("certifications", updated);
  };

  const validateCertification = (cert, index) => {
    const newErrors = { ...errors };
    const certErrors = {};

    // Required fields validation
    if (!cert.name || cert.name.trim() === '') {
      certErrors.name = 'Certification name is required';
    } else {
      delete certErrors.name;
    }

    if (!cert.provider || cert.provider.trim() === '') {
      certErrors.provider = 'Certification provider is required';
    } else {
      delete certErrors.provider;
    }

    // URL validation
    if (cert.url && cert.url.trim() !== '') {
      const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlRegex.test(cert.url)) {
        certErrors.url = 'Please enter a valid URL (e.g., https://example.com)';
      } else {
        delete certErrors.url;
      }
    } else {
      delete certErrors.url;
    }

    newErrors[index] = certErrors;
    setErrors(newErrors);
  };

  const addNewCertification = () => {
    addItem("certifications", {
      name: '',
      provider: '',
      completionId: '',
      url: '',
      validity: ''
    });
  };

  const removeCertification = (index) => {
    removeItem("certifications", index);
    // Clear errors for removed certification
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">Certifications</h3>

      {certifications.map((cert, index) => (
        <div key={index} className="mb-6 p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-700">Certification {index + 1}</h4>
            <button
              onClick={() => removeCertification(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Remove certification"
            >
              ✕ Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Certification Name - Required */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cert.name || ''}
                onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                onBlur={() => validateCertification(cert, index)}
                placeholder="e.g., AWS Certified Solutions Architect"
                className={`w-full p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors[index]?.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors[index]?.name && (
                <p className="text-red-500 text-sm">{errors[index].name}</p>
              )}
            </div>

            {/* Certification Provider - Required */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certification Provider <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cert.provider || ''}
                onChange={(e) => handleCertificationChange(index, 'provider', e.target.value)}
                onBlur={() => validateCertification(cert, index)}
                placeholder="e.g., Amazon Web Services, Microsoft, Google"
                className={`w-full p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors[index]?.provider 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors[index]?.provider && (
                <p className="text-red-500 text-sm">{errors[index].provider}</p>
              )}
            </div>

            {/* Completion ID - Optional */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Completion ID
              </label>
              <input
                type="text"
                value={cert.completionId || ''}
                onChange={(e) => handleCertificationChange(index, 'completionId', e.target.value)}
                placeholder="e.g., AWS-1234567890"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Validity Period - Optional */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Validity Period
              </label>
              <input
                type="text"
                value={cert.validity || ''}
                onChange={(e) => handleCertificationChange(index, 'validity', e.target.value)}
                placeholder="e.g., 2023 - 2026, Valid until 2025"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Certification URL - Optional */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certification URL
              </label>
              <input
                type="url"
                value={cert.url || ''}
                onChange={(e) => handleCertificationChange(index, 'url', e.target.value)}
                onBlur={() => validateCertification(cert, index)}
                placeholder="https://example.com/certification/verify/12345"
                className={`w-full p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors[index]?.url 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors[index]?.url && (
                <p className="text-red-500 text-sm">{errors[index].url}</p>
              )}
              <p className="text-xs text-gray-500">Optional: Link to verify your certification</p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addNewCertification}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
      >
        + Add New Certification
      </button>
    </div>
  );
}

export default CertificationsSection;
