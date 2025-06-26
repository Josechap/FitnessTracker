import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface DraggableWidgetProps {
  children: React.ReactNode;
  className?: string;
  dragHandle?: boolean;
}

export function DraggableWidget({ 
  children, 
  className,
  dragHandle = true 
}: DraggableWidgetProps) {
  return (
    <div className={cn(
      "glassmorphism rounded-2xl p-6 relative widget-container transition-all duration-200 hover:shadow-lg",
      className
    )}>
      {dragHandle && (
        <div className="widget-drag-handle absolute top-4 right-4 cursor-move p-1 rounded hover:bg-white/10 transition-colors">
          <GripVertical className="h-4 w-4 text-gray-500" />
        </div>
      )}
      {children}
    </div>
  );
}
