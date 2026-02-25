import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import SortableItem from "./SortableItem";

function SectionManager() {
  const { sectionOrder, setSectionOrder } = useContext(ResumeContext);
  const [isDragging, setIsDragging] = useState(false);

  // Enhanced sensors for better UX
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px drag before activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);

      setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
    }
    
    setIsDragging(false);
  };

  const handleDragCancel = () => {
    setIsDragging(false);
  };

  const getSectionLabel = (id) => {
    const labels = {
      summary: "Professional Summary",
      experience: "Work Experience", 
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      achievements: "Achievements",
      languages: "Languages",
      interests: "Interests"
    };
    return labels[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Reorder Sections</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isDragging ? 'bg-indigo-400 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-600">Drag to reorder</span>
        </div>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sectionOrder.map((id, index) => (
              <SortableItem 
                key={id} 
                id={id} 
                label={getSectionLabel(id)}
                index={index + 1}
                total={sectionOrder.length}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => setSectionOrder([
            "summary", "experience", "education", 
            "skills", "projects", "certifications", 
            "achievements", "languages", "interests"
          ])}
          className="flex-1 px-3 py-2 text-xs bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
        >
          Reset Order
        </button>
        <button
          onClick={() => setSectionOrder([
            "skills", "experience", "education",
            "projects", "summary", "certifications",
            "achievements", "languages", "interests"
          ])}
          className="flex-1 px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
        >
          Skills First
        </button>
      </div>
    </div>
  );
}

export default SectionManager;
