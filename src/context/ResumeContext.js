import { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [mode, setMode] = useState("fresher");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "personal",
    "summary",
    "education",
    "experience",
    "skills",
    "projects",
    "additional",
    "review",
  ];

  const [template, setTemplate] = useState("classic");

  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    interests: [],
  });
   
const [sectionOrder, setSectionOrder] = useState([
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "achievements",
  "languages",
  "interests"
]);

  // ---------- Update Field ----------
  const updateField = (section, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  // ---------- Add Item ----------
  const addItem = (section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));
  };

  // ---------- Remove Item ----------
  const removeItem = (section, index) => {
    const updated = [...resumeData[section]];
    updated.splice(index, 1);

    setResumeData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  // ---------- Step Navigation ----------
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ---------- LocalStorage Persistence ----------
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <ResumeContext.Provider
      value={{
        mode,
        setMode,
        currentStep,
         setCurrentStep,
        steps,
        template,
        setTemplate,
        resumeData,
        updateField,
        addItem,
        removeItem,
        nextStep,
        prevStep,
        sectionOrder,
setSectionOrder,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
