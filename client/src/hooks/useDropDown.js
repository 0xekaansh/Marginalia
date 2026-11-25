import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideTap = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideTap);
    return () => document.removeEventListener("pointerdown", handleOutsideTap);
  }, [isOpen]);

  const toggle = (event) => {
    event?.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const close = () => setIsOpen(false);

  return { isOpen, menuRef, toggle, close };
}

export default useDropdown;