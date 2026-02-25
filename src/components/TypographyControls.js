import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";

const fontOptions = {
  headings: [
    { value: "font-sans", label: "Sans Serif (Modern)", family: "ui-sans-serif, system-ui" },
    { value: "font-serif", label: "Serif (Classic)", family: "ui-serif, Georgia" },
    { value: "font-mono", label: "Monospace (Tech)", family: "ui-monospace, SFMono" },
    { value: "font-display", label: "Display (Bold)", family: "system-ui, -apple-system" }
  ],
  body: [
    { value: "font-sans", label: "Sans Serif", family: "ui-sans-serif, system-ui" },
    { value: "font-serif", label: "Serif", family: "ui-serif, Georgia" },
    { value: "font-mono", label: "Monospace", family: "ui-monospace, SFMono" }
  ]
};

const fontSizeOptions = [
  { value: "text-xs", label: "Extra Small", size: "12px" },
  { value: "text-sm", label: "Small", size: "14px" },
  { value: "text-base", label: "Medium", size: "16px" },
  { value: "text-lg", label: "Large", size: "18px" },
  { value: "text-xl", label: "Extra Large", size: "20px" }
];

const spacingOptions = [
  { value: "leading-5", label: "Tight", spacing: "1.25" },
  { value: "leading-6", label: "Normal", spacing: "1.5" },
  { value: "leading-7", label: "Loose", spacing: "1.75" },
  { value: "leading-8", label: "Extra Loose", spacing: "2.0" }
];

function TypographyControls() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const [activeTab, setActiveTab] = useState('fonts');

  const currentTypography = resumeData.typography || {
    headingFont: 'font-sans',
    bodyFont: 'font-sans',
    fontSize: 'text-base',
    lineHeight: 'leading-6'
  };

  const applyTypography = (field, value) => {
    const newTypography = { ...currentTypography, [field]: value };
    updateField('typography', newTypography, true);
  };

  const resetTypography = () => {
    const defaultTypography = {
      headingFont: 'font-sans',
      bodyFont: 'font-sans',
      fontSize: 'text-base',
      lineHeight: 'leading-6'
    };
    updateField('typography', defaultTypography, true);
  };

  const getFontPreview = (fontClass) => {
    const fontMap = {
      'font-sans': 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto',
      'font-serif': 'ui-serif, Georgia, Cambria, "Times New Roman"',
      'font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco',
      'font-display': 'system-ui, -apple-system, Segoe UI, Roboto'
    };
    return fontMap[fontClass] || fontMap['font-sans'];
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Typography</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('fonts')}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              activeTab === 'fonts' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Fonts
          </button>
          <button
            onClick={() => setActiveTab('size')}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              activeTab === 'size' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Size
          </button>
          <button
            onClick={() => setActiveTab('spacing')}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              activeTab === 'spacing' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Spacing
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-xs text-gray-600 mb-2">Preview:</div>
        <div className="space-y-2">
          <h3 
            className={`text-lg font-bold ${currentTypography.headingFont}`}
            style={{ fontFamily: getFontPreview(currentTypography.headingFont) }}
          >
            Professional Resume Heading
          </h3>
          <p 
            className={`${currentTypography.fontSize} ${currentTypography.lineHeight}`}
            style={{ fontFamily: getFontPreview(currentTypography.bodyFont) }}
          >
            This is how your body text will appear with the selected typography settings. 
            The font, size, and spacing work together to create a professional and readable resume.
          </p>
        </div>
      </div>

      {/* Font Controls */}
      {activeTab === 'fonts' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Heading Font</label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.headings.map((font) => (
                <button
                  key={font.value}
                  onClick={() => applyTypography('headingFont', font.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    currentTypography.headingFont === font.value
                      ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="font-medium text-sm" style={{ fontFamily: font.family }}>
                    {font.label}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Aa Bb Cc</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Body Font</label>
            <div className="grid grid-cols-3 gap-2">
              {fontOptions.body.map((font) => (
                <button
                  key={font.value}
                  onClick={() => applyTypography('bodyFont', font.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    currentTypography.bodyFont === font.value
                      ? 'border-purple-400 bg-purple-50 ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-medium text-sm" style={{ fontFamily: font.family }}>
                    {font.label}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Aa Bb Cc</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Size Controls */}
      {activeTab === 'size' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Font Size</label>
            <div className="grid grid-cols-5 gap-2">
              {fontSizeOptions.map((size) => (
                <button
                  key={size.value}
                  onClick={() => applyTypography('fontSize', size.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    currentTypography.fontSize === size.value
                      ? 'border-pink-400 bg-pink-50 ring-2 ring-pink-200'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className={`font-medium ${size.value}`}>Aa</div>
                  <div className="text-xs text-gray-600 mt-1">{size.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spacing Controls */}
      {activeTab === 'spacing' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Line Height</label>
            <div className="grid grid-cols-4 gap-2">
              {spacingOptions.map((spacing) => (
                <button
                  key={spacing.value}
                  onClick={() => applyTypography('lineHeight', spacing.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    currentTypography.lineHeight === spacing.value
                      ? 'border-green-400 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className={`text-sm ${spacing.value}`} style={{ lineHeight: spacing.spacing }}>
                    Aa
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{spacing.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={resetTypography}
          className="flex-1 px-3 py-2 text-xs bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Reset to Default
        </button>
        <button
          onClick={() => {
            // Apply a professional combination
            const professionalTypography = {
              headingFont: 'font-serif',
              bodyFont: 'font-sans',
              fontSize: 'text-base',
              lineHeight: 'leading-7'
            };
            updateField('typography', professionalTypography, true);
          }}
          className="flex-1 px-3 py-2 text-xs bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Professional
        </button>
      </div>
    </div>
  );
}

export default TypographyControls;