import React, { useState, useEffect } from 'react';
import { ToastMessage } from './types';

// Components
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { OurVision } from './components/OurVision';
import { WhatWeOffer } from './components/WhatWeOffer';
import { Partner } from './components/Partner';
import { Internship } from './components/Internship';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Modals & Notifications
import { Toast } from './components/Toast';
import { ServiceModal } from './components/ServiceModal';
import { IdeaModal } from './components/IdeaModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Modal states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call in case page is already scrolled on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast Trigger Helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scroll Fade-in Intersection Observer Setup
  useEffect(() => {
    if (isLoading) return;

    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOption);
    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    
    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [isLoading]);

  const handleOpenServiceInquiry = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsServiceModalOpen(true);
  };

  const handleOpenInternship = () => {
    // Scroll to internship section
    const el = document.getElementById('internship');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Brand Loading Screen */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div id="veltora-dashboard" className="bg-[#05071A] min-h-screen text-white relative font-sans select-none antialiased">
          
          {/* Scroll Progress Bar */}
          <div 
            id="scroll-progress-bar"
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] z-[10000] transition-all duration-75 ease-out shadow-[0_0_10px_rgba(0,245,255,0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Universal GPU customized cursor */}
          <CustomCursor />

          {/* Sticky responsive Navbar */}
          <Navbar onOpenIdeaModal={() => setIsIdeaModalOpen(true)} />

          {/* Intro Section with floating particles canvas */}
          <Hero onOpenInternship={handleOpenInternship} />

          {/* Staggered Scroll-fade Container wrappers */}
          <div className="scroll-fade-in">
            <WhoWeAre />
          </div>

          <div className="scroll-fade-in">
            <OurVision />
          </div>

          <div className="scroll-fade-in">
            <WhatWeOffer onEnquire={handleOpenServiceInquiry} />
          </div>

          <div className="scroll-fade-in">
            <Partner onShowToast={showToast} />
          </div>

          <div className="scroll-fade-in">
            <Internship />
          </div>

          <div className="scroll-fade-in">
            <Team />
          </div>

          <div className="scroll-fade-in">
            <Contact onShowToast={showToast} />
          </div>

          {/* Corporate Footer */}
          <Footer />

          {/* Dialog: Service Enquiry form overlay */}
          <ServiceModal
            serviceName={selectedService}
            isOpen={isServiceModalOpen}
            onClose={() => setIsServiceModalOpen(false)}
            onShowToast={showToast}
          />

          {/* Dialog: Share Your Proposal panel overlay */}
          <IdeaModal
            isOpen={isIdeaModalOpen}
            onOpen={() => setIsIdeaModalOpen(true)}
            onClose={() => setIsIdeaModalOpen(false)}
            onShowToast={showToast}
          />

          {/* Portal: Sliding Stack of Toasts rendering bottom-right */}
          <div
            id="toasts-portal"
            className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none"
          >
            {toasts.map((toast) => (
              <div key={toast.id} className="pointer-events-auto">
                <Toast toast={toast} onClose={removeToast} />
              </div>
            ))}
          </div>

        </div>
      )}
    </>
  );
}
