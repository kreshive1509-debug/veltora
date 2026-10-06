import React from 'react';
import { ContactSection } from './ContactSection';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="pt-16 pb-12">
      <ContactSection />
    </div>
  );
};
