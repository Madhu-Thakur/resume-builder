import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, label, index, total }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group p-4 rounded-xl border-2 transition-all duration-200 ${
        isDragging 
          ? 'border-indigo-400 bg-indigo-50 shadow-lg scale-105' 
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md hover:scale-102 cursor-grab'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Drag Handle */}
          <div className="flex flex-col space-y-1 cursor-grab hover:text-indigo-600 transition-colors">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Content */}
          <div>
            <div className="font-medium text-gray-900">{label}</div>
            <div className="text-xs text-gray-500">{index} of {total}</div>
          </div>
        </div>
        
        {/* Position Indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 font-mono">{index}</span>
          <div className={`w-3 h-3 rounded-full transition-colors ${
            isDragging ? 'bg-indigo-400 animate-pulse' : 'bg-gray-300'
          }`}></div>
        </div>
      </div>
      
      {/* Dragging Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-indigo-200/30 rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
}

export default SortableItem;
