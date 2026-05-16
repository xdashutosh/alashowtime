import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Home, Info, Ticket, Phone, Check, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Step } from '../types';

interface NavbarProps {
  currentStep: Step;
  onNavigate: (step: Step) => void;
  onOpenDetailsModal: () => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onNavigate,
  onOpenDetailsModal,
  onOpenContactModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isLanding = currentStep === 'landing';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Map current Step to stepper number (1-5)
  const getStepNumber = (): number => {
    switch (currentStep) {
      case 'terms':
        return 1;
      case 'date':
        return 2;
      case 'aadhaar':
      case 'otp':
        return 3;
      case 'seats':
      case 'payment':
        return 4;
      case 'confirmation':
      case 'final_dashboard':
        return 5;
      default:
        return 1;
    }
  };

  const activeStepNum = getStepNumber();

  const stepperItems = [
    { num: 1, label: 'TERMS & CONDITIONS', stepKey: 'terms' as Step },
    { num: 2, label: 'SELECT DATE', stepKey: 'date' as Step },
    { num: 3, label: 'VERIFY', stepKey: 'aadhaar' as Step },
    { num: 4, label: 'SEATS & PAY', stepKey: 'seats' as Step },
    { num: 5, label: 'CONFIRMATION', stepKey: 'confirmation' as Step },
  ];

  const handleNavClick = (callback: () => void) => {
    setIsMobileMenuOpen(false);
    callback();
  };

  const drawerContent = (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] md:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Slide-out Sidebar Drawer Container */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative w-80 max-w-[85vw] bg-[#140606] border-l border-amber-500/40 z-[100000] shadow-2xl flex flex-col p-6 space-y-8 overflow-y-auto h-full"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#381818] shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <span className="font-cinzel font-bold text-amber-300 tracking-wider text-sm">NAVIGATION</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-amber-400" />
              </button>
            </div>

            {/* Drawer Links / Stepper */}
            <div className="flex-1 flex flex-col space-y-6">
              {isLanding ? (
                <div className="flex flex-col space-y-4 font-medium tracking-wider text-sm">
                  <button 
                    onClick={() => handleNavClick(() => onNavigate('landing'))}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/40 hover:bg-amber-500/10 border border-[#381818] hover:border-amber-500/40 text-amber-300 transition text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5 text-amber-500 shrink-0" />
                      <span>HOME</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
                  </button>

                  <button 
                    onClick={() => handleNavClick(onOpenDetailsModal)}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/40 hover:bg-amber-500/10 border border-[#381818] hover:border-amber-500/40 text-gray-200 transition text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Info className="w-5 h-5 text-amber-500 shrink-0" />
                      <span>SHOW DETAILS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
                  </button>

                  <button 
                    onClick={() => handleNavClick(() => onNavigate('terms'))}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-transparent border border-amber-500/50 text-amber-300 font-bold transition text-left shadow-lg shadow-amber-500/10 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Ticket className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>BOOK TICKETS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                  </button>

                  <button 
                    onClick={() => handleNavClick(onOpenContactModal)}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/40 hover:bg-amber-500/10 border border-[#381818] hover:border-amber-500/40 text-gray-200 transition text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                      <span>CONTACT HELP</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
                  </button>
                </div>
              ) : (
                /* Mobile Stepper in Drawer */
                <div className="flex flex-col space-y-6">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2 border-b border-[#381818]">
                    Booking Progress
                  </div>
                  {stepperItems.map((item) => {
                    const isCompleted = item.num < activeStepNum;
                    const isActive = item.num === activeStepNum;

                    return (
                      <button
                        key={item.num}
                        onClick={() => {
                          if (isCompleted || isActive) {
                            handleNavClick(() => onNavigate(item.stepKey));
                          }
                        }}
                        disabled={!isCompleted && !isActive}
                        className={`flex items-center space-x-4 p-3.5 rounded-xl border transition ${
                          isActive
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20 cursor-pointer font-bold'
                            : isCompleted
                              ? 'bg-black/60 border-amber-500/40 text-amber-200 cursor-pointer font-medium'
                              : 'bg-black/20 border-[#281010] text-gray-600 cursor-not-allowed opacity-50 font-medium'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isActive
                            ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/40 scale-105'
                            : isCompleted
                              ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                              : 'bg-[#180a0a] border border-[#381818] text-gray-500'
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4 font-black" /> : item.num}
                        </div>
                        <span className="text-xs uppercase tracking-wider text-left truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Drawer Footer Information */}
            <div className="pt-6 border-t border-[#381818] space-y-2 text-center shrink-0">
              <span className="text-[10px] text-gray-400 uppercase block font-medium tracking-wider">Show Timings</span>
              <span className="font-mono text-xs font-bold text-amber-400 block tracking-widest">7:00 PM EVERY EVENING</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="w-full bg-[#0d0505]/95 border-b border-[#381818] sticky top-0 z-50 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 shadow-2xl shadow-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Logos & Title */}
          <div 
            onClick={() => handleNavClick(() => onNavigate('landing'))}
            className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group min-w-0"
          >
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
                <img 
                  src="https://aialisa.in/assets/Ashok-7dc73d9e.png" 
                  alt="Ashoka Emblem" 
                  className="relative h-8 sm:h-12 md:h-14 w-auto object-contain filter invert brightness-125 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  onError={(e) => { e.currentTarget.src = '/ashok-logo.png'; }}
                />
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
                <img 
                  src="/assam-logo.png" 
                  alt="Assam Legislative Assembly" 
                  className="relative h-8 sm:h-12 md:h-14 w-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="font-cinzel tracking-wider sm:text-lg md:text-xl font-bold text-amber-200 group-hover:text-amber-400 transition-colors truncate">
                ASSAM LEGISLATIVE ASSEMBLY
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase text-amber-500/80 font-medium">
                Presents
              </span>
            </div>
          </div>

          {/* Desktop Navigation for Landing */}
          {isLanding ? (
            <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-medium">
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center space-x-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Home</span>
              </button>
              <button 
                onClick={onOpenDetailsModal}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4 text-amber-500/80 shrink-0" />
                <span>Show Details</span>
              </button>
              <button 
                onClick={() => onNavigate('terms')}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-amber-500/80 shrink-0" />
                <span>Book Tickets</span>
              </button>
              <button 
                onClick={onOpenContactModal}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-500/80 shrink-0" />
                <span>Contact</span>
              </button>
            </nav>
          ) : (
            /* Desktop Stepper for Booking Steps */
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {stepperItems.map((item, index) => {
                const isCompleted = item.num < activeStepNum;
                const isActive = item.num === activeStepNum;
                
                return (
                  <div key={item.num} className="flex items-center">
                    <button 
                      onClick={() => {
                        if (isCompleted || isActive) {
                          onNavigate(item.stepKey);
                        }
                      }}
                      disabled={!isCompleted && !isActive}
                      className={`flex items-center space-x-2 group ${
                        isCompleted || isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 shrink-0 shadow-lg ${
                        isActive 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-amber-500/50 scale-110 font-bold' 
                          : isCompleted 
                            ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                            : 'bg-[#1e1010] border border-[#4a2828] text-gray-500'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4" /> : item.num}
                      </div>
                      <span className={`text-xs xl:text-sm tracking-wider uppercase font-medium transition-colors ${
                        isActive 
                          ? 'text-amber-400 font-bold whitespace-nowrap' 
                          : isCompleted 
                            ? 'text-amber-200/80 whitespace-nowrap' 
                            : 'text-gray-500 whitespace-nowrap'
                      }`}>
                        {item.label}
                      </span>
                    </button>

                    {/* Connecting Line */}
                    {index < stepperItems.length - 1 && (
                      <div className={`w-4 xl:w-8 h-[1px] mx-2 xl:mx-4 transition-colors ${
                        isCompleted ? 'bg-amber-500/50' : 'bg-[#381818]'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Render Portal directly into document.body when mounted */}
      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
};
