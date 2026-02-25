import { createContext, useState, useEffect, useCallback, useRef } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [mode, setMode] = useState("fresher");
  const [currentStep, setCurrentStep] = useState(0);
  const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(true);
  const [previewAnimation, setPreviewAnimation] = useState(false);

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

  // Ref to track if this is an initial load
  const isInitialLoad = useRef(true);

  // ---------- Update Field with Live Preview ----------
  const updateField = useCallback((section, value, skipAnimation = false) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: value,
    }));

    // Trigger animation for live preview
    if (isLivePreviewEnabled && !skipAnimation && !isInitialLoad.current) {
      setPreviewAnimation(true);
      setTimeout(() => setPreviewAnimation(false), 300);
    }
  }, [isLivePreviewEnabled]);

  // ---------- Add Item with Animation ----------
  const addItem = useCallback((section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));

    // Trigger animation for new items
    if (isLivePreviewEnabled) {
      setPreviewAnimation(true);
      setTimeout(() => setPreviewAnimation(false), 300);
    }
  }, [isLivePreviewEnabled]);

  // ---------- Remove Item with Animation ----------
  const removeItem = useCallback((section, index) => {
    const updated = [...resumeData[section]];
    updated.splice(index, 1);

    setResumeData((prev) => ({
      ...prev,
      [section]: updated,
    }));

    // Trigger animation for removed items
    if (isLivePreviewEnabled) {
      setPreviewAnimation(true);
      setTimeout(() => setPreviewAnimation(false), 300);
    }
  }, [resumeData, isLivePreviewEnabled]);

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

  // ---------- Live Preview Controls ----------
  const toggleLivePreview = () => {
    setIsLivePreviewEnabled(prev => !prev);
  };

  const triggerPreviewUpdate = useCallback(() => {
    if (isLivePreviewEnabled) {
      setPreviewAnimation(true);
      setTimeout(() => setPreviewAnimation(false), 300);
    }
  }, [isLivePreviewEnabled]);

  // ---------- LocalStorage Persistence ----------
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      const parsedData = JSON.parse(saved);
      setResumeData(parsedData);
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad.current) {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  // Reset initial load flag after first render
  useEffect(() => {
    isInitialLoad.current = false;
  }, []);

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
        isLivePreviewEnabled,
        setIsLivePreviewEnabled,
        toggleLivePreview,
        previewAnimation,
        setPreviewAnimation,
        triggerPreviewUpdate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
