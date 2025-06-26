import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DEFAULT_LAYOUTS } from "@/lib/utils";
import type { Layout, Layouts } from "react-grid-layout";

interface LayoutHook {
  layouts: Layouts;
  onLayoutChange: (layout: Layout[], layouts: Layouts) => void;
  resetLayouts: () => void;
  isLoading: boolean;
}

export function useWidgetLayout(userId: number, initialLayouts?: Layouts): LayoutHook {
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts || DEFAULT_LAYOUTS);
  const queryClient = useQueryClient();

  const saveLayoutMutation = useMutation({
    mutationFn: async (layoutData: Layouts) => {
      const response = await apiRequest("POST", "/api/dashboard-layout", {
        userId,
        layoutData,
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate dashboard query to refresh layout
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard', userId] });
    },
  });

  const onLayoutChange = useCallback((layout: Layout[], layouts: Layouts) => {
    setLayouts(layouts);
    
    // Debounce the save operation
    const timeoutId = setTimeout(() => {
      saveLayoutMutation.mutate(layouts);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [saveLayoutMutation]);

  const resetLayouts = useCallback(() => {
    setLayouts(DEFAULT_LAYOUTS);
    saveLayoutMutation.mutate(DEFAULT_LAYOUTS);
  }, [saveLayoutMutation]);

  return {
    layouts,
    onLayoutChange,
    resetLayouts,
    isLoading: saveLayoutMutation.isPending,
  };
}
