import { useState } from "react";
import CertificationsSection from "./CertificationsSection";
import AchievementsSection from "./AchievementsSection";
import LanguagesSection from "./LanguagesSection";
import InterestsSection from "./InterestsSection";

function AdditionalSection() {
  const [activeSection, setActiveSection] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case "certifications":
        return <CertificationsSection />;
      case "achievements":
        return <AchievementsSection />;
      case "languages":
        return <LanguagesSection />;
      case "interests":
        return <InterestsSection />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">
        Additional Information
      </h2>

      {/* If no sub-section selected → show buttons */}
      {!activeSection && (
        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => setActiveSection("certifications")}
            className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 text-left"
          >
            <h3 className="text-lg font-semibold">
              Certifications
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Add professional certifications
            </p>
          </button>

          <button
            onClick={() => setActiveSection("achievements")}
            className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 text-left"
          >
            <h3 className="text-lg font-semibold">
              Achievements
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Add notable achievements
            </p>
          </button>

          <button
            onClick={() => setActiveSection("languages")}
            className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 text-left"
          >
            <h3 className="text-lg font-semibold">
              Languages
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Add language proficiency
            </p>
          </button>

          <button
            onClick={() => setActiveSection("interests")}
            className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 text-left"
          >
            <h3 className="text-lg font-semibold">
              Interests
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Add personal interests
            </p>
          </button>

        </div>
      )}

      {/* If sub-section selected → show component */}
      {activeSection && (
        <div>
          <button
            onClick={() => setActiveSection(null)}
            className="mb-6 text-indigo-600 hover:underline"
          >
            ← Back to Additional Menu
          </button>

          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default AdditionalSection;