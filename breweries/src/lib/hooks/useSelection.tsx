import { useState } from "react";

export function useSelection(initial: string[] = []) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initial));

  const toggle = (id: string) => {
    setSelected(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const clear = () => setSelected(new Set());

  return { selected, toggle, clear };
}
