import React, { useEffect, useState, useRef } from 'react';
import './ContextMenu.css';

export interface ContextMenuOption {
  label: string;
  onClick: () => void;
}

interface ContextMenuProps {
  options: ContextMenuOption[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ options }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsVisible(false);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    // Stop the event from propagating to window
    e.stopPropagation();
    setPosition({ top: e.clientY, left: e.clientX });
    setIsVisible(true);
  };

  return (
    <>
      <div className="context-menu-ellipsis" onClick={handleIconClick}>
        &#8942;
      </div>
      {isVisible && (
        <div
          ref={menuRef}
          className="context-menu"
          style={{ top: position.top, left: position.left }}>
          {options.map((option, index) => (
            <div
              key={index}
              className="context-menu-option"
              onClick={() => handleOptionClick(option.onClick)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContextMenu;
