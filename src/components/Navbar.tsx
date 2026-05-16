import React from 'react';
import { Home, Info, Ticket, Phone, Check } from 'lucide-react';
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
  const isLanding = currentStep === 'landing';

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

  return (
    <header className="w-full bg-[#0d0505]/95 border-b border-[#381818] sticky top-0 z-50 backdrop-blur-md px-6 py-4 shadow-2xl shadow-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-4 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
            <img 
              src="/assam-logo.png" 
              alt="Assam Legislative Assembly" 
              className="relative h-12 md:h-14 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              onError={(e) => {
                // Fallback elegant markup if logo not fully loaded
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel tracking-wider text-lg md:text-xl font-bold text-amber-200 group-hover:text-amber-400 transition-colors">
              ASSAM LEGISLATIVE ASSEMBLY
            </span>
            <span className="text-xs tracking-widest uppercase text-amber-500/80 font-medium">
              Presents
            </span>
          </div>
        </div>

        {/* Right Nav / Stepper */}
        {isLanding ? (
          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-medium">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              <Home className="w-4 h-4 text-amber-500" />
              <span>Home</span>
            </button>
            <button 
              onClick={onOpenDetailsModal}
              className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <Info className="w-4 h-4 text-amber-500/80" />
              <span>Show Details</span>
            </button>
            <button 
              onClick={() => onNavigate('terms')}
              className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <Ticket className="w-4 h-4 text-amber-500/80" />
              <span>Book Tickets</span>
            </button>
            <button 
              onClick={onOpenContactModal}
              className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-500/80" />
              <span>Contact</span>
            </button>
          </nav>
        ) : (
          <div className="hidden lg:flex items-center space-x-6">
            {stepperItems.map((item, index) => {
              const isCompleted = item.num < activeStepNum;
              const isActive = item.num === activeStepNum;
              
              return (
                <div key={item.num} className="flex items-center">
                  <button 
                    onClick={() => {
                      // Allow back navigation in stepper for excellent UX
                      if (isCompleted || isActive) {
                        onNavigate(item.stepKey);
                      }
                    }}
                    disabled={!isCompleted && !isActive}
                    className={`flex items-center space-x-2 group ${
                      isCompleted || isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 shadow-lg ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-amber-500/50 scale-110 font-bold' 
                        : isCompleted 
                          ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                          : 'bg-[#1e1010] border border-[#4a2828] text-gray-500'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : item.num}
                    </div>
                    <span className={`text-xs tracking-wider uppercase font-medium transition-colors ${
                      isActive 
                        ? 'text-amber-400 font-bold' 
                        : isCompleted 
                          ? 'text-amber-200/80' 
                          : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </button>

                  {/* Connecting Line */}
                  {index < stepperItems.length - 1 && (
                    <div className={`w-8 h-[1px] mx-4 transition-colors ${
                      isCompleted ? 'bg-amber-500/50' : 'bg-[#381818]'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
