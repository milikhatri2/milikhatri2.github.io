import React from 'react';
import { Section } from '../types';
import { Briefcase, User, Mail, MessageSquareText } from 'lucide-react';

interface NavigationProps {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  
  const navItems = [
    { label: 'Work', value: Section.WORK, icon: <Briefcase size={18} /> },
    { label: 'About', value: Section.ABOUT, icon: <User size={18} /> },
    { label: 'Testimonials', value: Section.TESTIMONIALS, icon: <MessageSquareText size={18} /> },
    { label: 'Contact', value: Section.CONTACT, icon: <Mail size={18} /> },
  ];

  return (
    <>
      {/* Floating Pill Nav - Centered Bottom for easy mobile reach, or Top Center for desktop */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-auto">
        <nav className="glass-panel px-2 py-2 rounded-full shadow-2xl flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => scrollToSection(item.value)}
              className={`
                relative px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300
                ${activeSection === item.value 
                  ? 'bg-coco-nav-button text-white shadow-lg' 
                  : 'text-gray-500 hover:text-coco-text hover:bg-coco-purple-light/20'}
              `}
            >
              <span className="relative z-10 flex items-center gap-2 font-medium text-sm">
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navigation;