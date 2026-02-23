import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import SortableItem from "./SortableItem";

function SectionManager() {
  const { sectionOrder, setSectionOrder } = useContext(ResumeContext);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);

      setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold mb-4">
        Reorder Sections
      </h3>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          {sectionOrder.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default SectionManager;