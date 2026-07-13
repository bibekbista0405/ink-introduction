import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useActiveSectionFocus() {
  const location = useLocation();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    if (sections.length === 0) return;

    // Helper to safely and efficiently update the attribute only on change
    const updateSectionActive = (targetSection: Element, active: boolean) => {
      const activeStr = active ? 'true' : 'false';
      if (targetSection.getAttribute('data-scroll-active') !== activeStr) {
        targetSection.setAttribute('data-scroll-active', activeStr);
      }
    };

    // Initially active set to first section
    sections.forEach((section, index) => {
      updateSectionActive(section, index === 0);
    });

    // Create IntersectionObserver targeting the middle of the viewport
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px', // focused in the center area
      threshold: 0,
    };

    const intersectionMap = new Map<Element, boolean>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectionMap.set(entry.target, entry.isIntersecting);
      });

      // Find the first section in document order that is currently intersecting
      let foundActive = false;
      let activeSection: Element | null = null;

      for (const section of sections) {
        if (intersectionMap.get(section)) {
          activeSection = section;
          foundActive = true;
          break;
        }
      }

      if (foundActive && activeSection) {
        sections.forEach((section) => {
          updateSectionActive(section, section === activeSection);
        });
      } else {
        // Fallback: If no section is intersecting, determine active section from scroll boundaries
        const scrollY = window.scrollY;
        const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollY < 100) {
          sections.forEach((section, index) => {
            updateSectionActive(section, index === 0);
          });
        } else if (scrollY >= maxScrollY - 100) {
          sections.forEach((section, index) => {
            updateSectionActive(section, index === sections.length - 1);
          });
        }
      }
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Passive throttled fallback scroll checks via requestAnimationFrame
    let isThrottled = false;
    const handleScroll = () => {
      if (isThrottled) return;
      isThrottled = true;
      requestAnimationFrame(() => {
        isThrottled = false;
        const scrollY = window.scrollY;
        const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollY < 100) {
          sections.forEach((section, index) => {
            updateSectionActive(section, index === 0);
          });
        } else if (scrollY >= maxScrollY - 100) {
          sections.forEach((section, index) => {
            updateSectionActive(section, index === sections.length - 1);
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // Re-run when route changes
}

