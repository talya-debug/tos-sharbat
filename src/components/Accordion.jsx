import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ icon: Icon, title, color, isOpen, onToggle, children }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={onToggle}>
        <div className="accordion-header-right">
          <div className="section-icon" style={{ background: color + '12', color }}>
            <Icon size={16} />
          </div>
          <span>{title}</span>
        </div>
        <ChevronDown size={16} className={`accordion-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>
      <div
        className="accordion-body"
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? height + 'px' : '0px',
          transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
