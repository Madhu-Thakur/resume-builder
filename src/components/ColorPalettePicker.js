import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";

const colorPalettes = {
  corporate: {
    name: "Corporate Professional",
    colors: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#93c5fd",
      text: "#1f2937",
      background: "#ffffff"
    }
  },
  creative: {
    name: "Creative Bold",
    colors: {
      primary: "#7c3aed",
      secondary: "#6366f1",
      accent: "#f472b6",
      text: "#1f2937",
      background: "#ffffff"
    }
  },
  tech: {
    name: "Tech Modern",
    colors: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#22d3ee",
      text: "#0f172a",
      background: "#ffffff"
    }
  },
  minimalist: {
    name: "Minimalist Clean",
    colors: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#9ca3af",
      text: "#111827",
      background: "#ffffff"
    }
  },
  warm: {
    name: "Warm Professional",
    colors: {
      primary: "#ef4444",
      secondary: "#dc2626",
      accent: "#fca5a5",
      text: "#1f2937",
      background: "#ffffff"
    }
  }
};

function ColorPalettePicker() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const [customColors, setCustomColors] = useState({
    primary: "#2563eb",
    secondary: "#1e40af",
    accent: "#93c5fd",
    text: "#1f2937",
    background: "#ffffff"
  });
  const [isCustomMode, setIsCustomMode] = useState(false);

  const currentPalette = resumeData.customColors || colorPalettes.corporate.colors;

  const applyPalette = (colors) => {
    updateField('customColors', colors, true);
    setCustomColors(colors);
  };

  const handleCustomColorChange = (colorType, value) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
    applyPalette(newColors);
  };

  const getContrastColor = (hexColor) => {
    // Simple contrast calculation for text readability
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1f2937' : '#ffffff';
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Color Palette</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsCustomMode(false)}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              !isCustomMode ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setIsCustomMode(true)}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              isCustomMode ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-xs text-gray-600 mb-2">Preview:</div>
        <div className="flex items-center space-x-4 text-sm">
          <div 
            className="px-3 py-1 rounded-full text-white font-medium"
            style={{ backgroundColor: currentPalette.primary }}
          >
            Primary Button
          </div>
          <div 
            className="px-3 py-1 rounded-lg border-2 font-medium"
            style={{ 
              borderColor: currentPalette.accent,
              color: getContrastColor(currentPalette.accent)
            }}
          >
            Secondary
          </div>
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: currentPalette.secondary }}></div>
        </div>
      </div>

      {/* Preset Palettes */}
      {!isCustomMode && (
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(colorPalettes).map(([key, palette]) => (
            <button
              key={key}
              onClick={() => applyPalette(palette.colors)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                JSON.stringify(currentPalette) === JSON.stringify(palette.colors)
                  ? 'border-indigo-400 ring-2 ring-indigo-200'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-900">{palette.name}</span>
                {JSON.stringify(currentPalette) === JSON.stringify(palette.colors) && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.colors.primary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.colors.secondary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.colors.accent }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.colors.text }}></div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Custom Colors */}
      {isCustomMode && (
        <div className="space-y-3">
          {Object.entries(customColors).map(([colorType, colorValue]) => (
            <div key={colorType} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: colorValue }}
                ></div>
                <span className="text-sm text-gray-700 capitalize">{colorType}</span>
              </div>
              <input
                type="color"
                value={colorValue}
                onChange={(e) => handleCustomColorChange(colorType, e.target.value)}
                className="w-12 h-8 border-none cursor-pointer"
              />
            </div>
          ))}
          
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => {
                const corporate = colorPalettes.corporate.colors;
                applyPalette(corporate);
                setCustomColors(corporate);
              }}
              className="flex-1 px-3 py-2 text-xs bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={() => {
                // Generate random colors
                const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                const randomColors = {
                  primary: randomColor(),
                  secondary: randomColor(),
                  accent: randomColor(),
                  text: '#1f2937',
                  background: '#ffffff'
                };
                applyPalette(randomColors);
                setCustomColors(randomColors);
              }}
              className="flex-1 px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Random Colors
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPalettePicker;