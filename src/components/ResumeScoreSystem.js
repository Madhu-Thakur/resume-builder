import React, { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import CompactRecommendations from "./CompactRecommendations";

// Scoring constants
const SCORE_WEIGHTS = {
  content: 0.4,
  ats: 0.25,
  presentation: 0.2,
  skills: 0.15
};

const CONTENT_WEIGHTS = {
  personalInfo: 0.25,
  summary: 0.25,
  experience: 0.375,
  education: 0.125
};

const ATS_WEIGHTS = {
  keywords: 0.4,
  formatting: 0.32,
  structure: 0.28
};

const PRESENTATION_WEIGHTS = {
  grammar: 0.5,
  consistency: 0.25,
  readability: 0.25
};

const SKILLS_WEIGHTS = {
  relevance: 0.533,
  achievements: 0.467
};

// Common professional keywords for ATS optimization
const PROFESSIONAL_KEYWORDS = [
  'leadership', 'management', 'team', 'project', 'development', 'analysis',
  'strategic', 'planning', 'communication', 'collaboration', 'innovation',
  'problem-solving', 'results', 'performance', 'quality', 'efficiency',
  'customer', 'client', 'vendor', 'budget', 'timeline', 'deadline',
  'technical', 'software', 'tools', 'platform', 'system', 'process'
];

function ResumeScoreSystem() {
  const { resumeData } = useContext(ResumeContext);
  const [score, setScore] = useState({
    overall: 0,
    content: 0,
    ats: 0,
    presentation: 0,
    skills: 0,
    breakdown: {}
  });
  const [recommendations, setRecommendations] = useState([]);

  // Calculate overall resume score
  const calculateScore = () => {
    const contentScore = calculateContentScore();
    const atsScore = calculateATSScore();
    const presentationScore = calculatePresentationScore();
    const skillsScore = calculateSkillsScore();

    const overall = Math.round(
      (contentScore * SCORE_WEIGHTS.content) +
      (atsScore * SCORE_WEIGHTS.ats) +
      (presentationScore * SCORE_WEIGHTS.presentation) +
      (skillsScore * SCORE_WEIGHTS.skills)
    );

    setScore({
      overall,
      content: Math.round(contentScore),
      ats: Math.round(atsScore),
      presentation: Math.round(presentationScore),
      skills: Math.round(skillsScore),
      breakdown: {
        content: {
          personalInfo: Math.round(contentScore * CONTENT_WEIGHTS.personalInfo),
          summary: Math.round(contentScore * CONTENT_WEIGHTS.summary),
          experience: Math.round(contentScore * CONTENT_WEIGHTS.experience),
          education: Math.round(contentScore * CONTENT_WEIGHTS.education)
        },
        ats: {
          keywords: Math.round(atsScore * ATS_WEIGHTS.keywords),
          formatting: Math.round(atsScore * ATS_WEIGHTS.formatting),
          structure: Math.round(atsScore * ATS_WEIGHTS.structure)
        },
        presentation: {
          grammar: Math.round(presentationScore * PRESENTATION_WEIGHTS.grammar),
          consistency: Math.round(presentationScore * PRESENTATION_WEIGHTS.consistency),
          readability: Math.round(presentationScore * PRESENTATION_WEIGHTS.readability)
        },
        skills: {
          relevance: Math.round(skillsScore * SKILLS_WEIGHTS.relevance),
          achievements: Math.round(skillsScore * SKILLS_WEIGHTS.achievements)
        }
      }
    });

    generateRecommendations(contentScore, atsScore, presentationScore, skillsScore);
  };

  // Calculate content quality score
  const calculateContentScore = () => {
    let score = 0;
    const totalWeight = 100;

    // Personal Info Score (25%)
    const personalInfoScore = calculatePersonalInfoScore();
    score += personalInfoScore * CONTENT_WEIGHTS.personalInfo;

    // Summary Score (25%)
    const summaryScore = calculateSummaryScore();
    score += summaryScore * CONTENT_WEIGHTS.summary;

    // Experience Score (37.5%)
    const experienceScore = calculateExperienceScore();
    score += experienceScore * CONTENT_WEIGHTS.experience;

    // Education Score (12.5%)
    const educationScore = calculateEducationScore();
    score += educationScore * CONTENT_WEIGHTS.education;

    return Math.min(score, totalWeight);
  };

  const calculatePersonalInfoScore = () => {
    const info = resumeData.personalInfo || {};
    let score = 0;

    if (info.name && info.name.trim().length > 0) score += 40;
    if (info.email && info.email.includes('@')) score += 30;
    if (info.phone && info.phone.length > 6) score += 20;
    if (info.title && info.title.trim().length > 0) score += 10;

    return score;
  };

  const calculateSummaryScore = () => {
    const summary = resumeData.summary || '';
    let score = 0;

    if (summary.length > 50) score += 30;
    if (summary.length > 100) score += 20;
    if (summary.length > 200) score += 20;
    if (summary.length < 500) score += 20;
    if (summary.length > 0 && summary.length < 50) score += 10;

    // Check for professional keywords
    const keywordCount = countKeywords(summary);
    if (keywordCount > 3) score += 10;

    return score;
  };

  const calculateExperienceScore = () => {
    const experience = resumeData.experience || [];
    let score = 0;

    if (experience.length === 0) return 0;

    experience.forEach(exp => {
      if (exp.title && exp.company && exp.description) {
        score += 20; // Basic completeness
        if (exp.startDate) score += 10; // Date provided
        if (exp.description.length > 50) score += 10; // Detailed description
        if (countKeywords(exp.description) > 2) score += 10; // Keywords used
      }
    });

    return Math.min(score, 100);
  };

  const calculateEducationScore = () => {
    const education = resumeData.education || [];
    let score = 0;

    if (education.length === 0) return 0;

    education.forEach(edu => {
      if (edu.degree && edu.institution) {
        score += 40; // Basic completeness
        if (edu.startDate) score += 20; // Date provided
        if (edu.gpa && edu.gpa > 3.0) score += 20; // Good GPA
        if (edu.description && edu.description.length > 20) score += 20; // Details provided
      }
    });

    return Math.min(score, 100);
  };

  // Calculate ATS optimization score
  const calculateATSScore = () => {
    let score = 0;

    // Keywords Score (40%)
    const keywordScore = calculateKeywordScore();
    score += keywordScore * ATS_WEIGHTS.keywords;

    // Formatting Score (32%)
    const formattingScore = calculateFormattingScore();
    score += formattingScore * ATS_WEIGHTS.formatting;

    // Structure Score (28%)
    const structureScore = calculateStructureScore();
    score += structureScore * ATS_WEIGHTS.structure;

    return score;
  };

  const calculateKeywordScore = () => {
    const text = getAllTextContent();
    const keywordCount = countKeywords(text);
    
    if (keywordCount > 15) return 100;
    if (keywordCount > 10) return 80;
    if (keywordCount > 5) return 60;
    if (keywordCount > 2) return 40;
    if (keywordCount > 0) return 20;
    return 0;
  };

  const calculateFormattingScore = () => {
    // Basic formatting checks
    let score = 100;

    // Check for special characters that might cause issues
    const text = getAllTextContent();
    const specialChars = text.match(/[^a-zA-Z0-9\s.,!?()\-:;'"&]/g);
    if (specialChars && specialChars.length > 10) score -= 20;

    // Check for consistent bullet points
    const bulletCount = (text.match(/•|\-|\*/g) || []).length;
    if (bulletCount > 5) score += 10;

    return score;
  };

  const calculateStructureScore = () => {
    let score = 0;

    // Check for essential sections
    if (resumeData.summary && resumeData.summary.length > 0) score += 25;
    if (resumeData.experience && resumeData.experience.length > 0) score += 25;
    if (resumeData.education && resumeData.education.length > 0) score += 25;
    if (resumeData.skills && resumeData.skills.length > 0) score += 25;

    return score;
  };

  // Calculate presentation score
  const calculatePresentationScore = () => {
    let score = 0;

    // Grammar Score (50%)
    const grammarScore = calculateGrammarScore();
    score += grammarScore * PRESENTATION_WEIGHTS.grammar;

    // Consistency Score (25%)
    const consistencyScore = calculateConsistencyScore();
    score += consistencyScore * PRESENTATION_WEIGHTS.consistency;

    // Readability Score (25%)
    const readabilityScore = calculateReadabilityScore();
    score += readabilityScore * PRESENTATION_WEIGHTS.readability;

    return score;
  };

  const calculateGrammarScore = () => {
    // Basic grammar checks
    const text = getAllTextContent();
    let score = 100;

    // Check for common grammar issues
    const issues = text.match(/(\s{2,}|[.!?][^.!?]*[a-z][A-Z])/g);
    if (issues) score -= issues.length * 5;

    return Math.max(score, 0);
  };

  const calculateConsistencyScore = () => {
    let score = 100;

    // Check date format consistency
    const experience = resumeData.experience || [];
    const education = resumeData.education || [];

    // Basic consistency check
    if (experience.length > 0 && !experience[0].startDate) score -= 20;
    if (education.length > 0 && !education[0].startDate) score -= 20;

    return score;
  };

  const calculateReadabilityScore = () => {
    const text = getAllTextContent();
    let score = 100;

    // Check text length
    if (text.length < 500) score -= 30;
    if (text.length > 3000) score -= 20;

    // Check for line breaks and structure
    const lineCount = text.split('\n').length;
    if (lineCount < 10) score -= 20;

    return score;
  };

  // Calculate skills score
  const calculateSkillsScore = () => {
    let score = 0;

    // Skills Relevance (53.3%)
    const relevanceScore = calculateSkillsRelevanceScore();
    score += relevanceScore * SKILLS_WEIGHTS.relevance;

    // Achievements Quality (46.7%)
    const achievementsScore = calculateAchievementsScore();
    score += achievementsScore * SKILLS_WEIGHTS.achievements;

    return score;
  };

  const calculateSkillsRelevanceScore = () => {
    const skills = resumeData.skills || [];
    let score = 0;

    if (skills.length === 0) return 0;

    skills.forEach(skill => {
      if (skill.name && skill.name.length > 2) score += 20;
      if (skill.level && skill.level > 0) score += 10;
    });

    return Math.min(score, 100);
  };

  const calculateAchievementsScore = () => {
    const experience = resumeData.experience || [];
    let score = 0;

    experience.forEach(exp => {
      if (exp.description) {
        // Check for achievement-oriented language
        const achievementWords = ['achieved', 'improved', 'increased', 'reduced', 'saved', 'grew', 'developed'];
        const hasAchievement = achievementWords.some(word => 
          exp.description.toLowerCase().includes(word)
        );
        
        if (hasAchievement) score += 25;
        
        // Check for quantification
        if (/\d+[%$]|quantified|measured/.test(exp.description)) score += 25;
      }
    });

    return Math.min(score, 100);
  };

  // Helper functions
  const countKeywords = (text) => {
    const lowerText = text.toLowerCase();
    return PROFESSIONAL_KEYWORDS.filter(keyword => 
      lowerText.includes(keyword)
    ).length;
  };

  const getAllTextContent = () => {
    let text = '';
    
    // Add personal info
    if (resumeData.personalInfo) {
      text += ` ${resumeData.personalInfo.name || ''} ${resumeData.personalInfo.title || ''} ${resumeData.personalInfo.email || ''}`;
    }
    
    // Add summary
    text += ` ${resumeData.summary || ''}`;
    
    // Add experience
    (resumeData.experience || []).forEach(exp => {
      text += ` ${exp.title || ''} ${exp.company || ''} ${exp.description || ''}`;
    });
    
    // Add education
    (resumeData.education || []).forEach(edu => {
      text += ` ${edu.degree || ''} ${edu.institution || ''} ${edu.description || ''}`;
    });
    
    // Add skills
    (resumeData.skills || []).forEach(skill => {
      text += ` ${skill.name || ''}`;
    });

    return text;
  };

  // Generate recommendations based on scores
  const generateRecommendations = (contentScore, atsScore, presentationScore, skillsScore) => {
    const recs = [];

    if (contentScore < 70) {
      recs.push({
        priority: 'high',
        category: 'Content',
        message: 'Improve content completeness and quality',
        action: 'Add more detailed descriptions and ensure all required fields are filled'
      });
    }

    if (atsScore < 80) {
      recs.push({
        priority: 'medium',
        category: 'ATS Optimization',
        message: 'Optimize for Applicant Tracking Systems',
        action: 'Include more industry keywords and improve formatting'
      });
    }

    if (presentationScore < 85) {
      recs.push({
        priority: 'medium',
        category: 'Presentation',
        message: 'Enhance professional presentation',
        action: 'Check grammar, consistency, and readability'
      });
    }

    if (skillsScore < 75) {
      recs.push({
        priority: 'high',
        category: 'Skills',
        message: 'Strengthen skills and achievements',
        action: 'Add quantified achievements and relevant skills'
      });
    }

    // Specific recommendations
    if (!resumeData.personalInfo?.title) {
      recs.push({
        priority: 'high',
        category: 'Personal Info',
        message: 'Add professional title',
        action: 'Include your current job title or professional designation'
      });
    }

    if (resumeData.experience?.length === 0) {
      recs.push({
        priority: 'high',
        category: 'Experience',
        message: 'Add work experience',
        action: 'Include relevant work experience with detailed descriptions'
      });
    }

    setRecommendations(recs.slice(0, 5)); // Limit to top 5 recommendations
  };

  // Calculate score when resume data changes
  useEffect(() => {
    calculateScore();
  }, [resumeData]);

  // Get grade based on score
  const getGrade = (score) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'A-';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'B-';
    if (score >= 65) return 'C+';
    if (score >= 60) return 'C';
    if (score >= 55) return 'C-';
    if (score >= 50) return 'D+';
    if (score >= 40) return 'D';
    return 'F';
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Resume Score</h3>
        <div className="flex items-center space-x-2">
          <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(score.overall)} bg-clip-text text-transparent`}>
            {score.overall}%
          </div>
          <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {getGrade(score.overall)}
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3 mb-4">
        {[
          { label: 'Content Quality', score: score.content, color: 'from-blue-400 to-cyan-500' },
          { label: 'ATS Optimization', score: score.ats, color: 'from-purple-400 to-pink-500' },
          { label: 'Presentation', score: score.presentation, color: 'from-green-400 to-emerald-500' },
          { label: 'Skills & Achievements', score: score.skills, color: 'from-orange-400 to-red-500' }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.score}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <CompactRecommendations recommendations={recommendations} />
      )}

      {/* Score Tips */}
      <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <p className="text-xs text-gray-600">
          Tip: Aim for a score above 80% for the best results. Focus on completing all sections and using professional keywords.
        </p>
      </div>
    </div>
  );
}

export default ResumeScoreSystem;