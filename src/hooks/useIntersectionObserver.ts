import { useEffect } from "react";

export function useIntersectionObserver({
    target,
    onIntersect,
    enabled = true,
    threshold = 0.1,
  }: {
    target: React.RefObject<Element>;
    onIntersect: () => void;
    enabled?: boolean;
    threshold?: number;
  }) {
    useEffect(() => {
      if (!enabled || !target.current) return;
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onIntersect();
            }
          });
        },
        { threshold }
      );
  
      observer.observe(target.current);
      return () => observer.disconnect();
    }, [target, enabled, onIntersect, threshold]);
  }