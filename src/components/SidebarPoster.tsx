import React from 'react';
import { Calendar, Clock, MapPin, Award } from 'lucide-react';
import type { BookingState, Step } from '../types';

interface SidebarPosterProps {
  bookingState: BookingState;
  currentStep: Step;
}

export const SidebarPoster: React.FC<SidebarPosterProps> = ({ bookingState, currentStep }) => {
  const showSummaryBadges = currentStep === 'confirmation' || currentStep === 'final_dashboard' || currentStep === 'payment';

  return (
    <div className="w-full lg:w-5/12 shrink-0 flex flex-col">
      <div className="sticky top-28 bg-[#180a0a]/90 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-black group transition-all duration-500">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-red-600/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Poster Image */}
        <div className="relative w-full pb-[60%] sm:pb-[75%] lg:pb-[110%] overflow-hidden bg-black">
          <img 
            src="/assam-poster.png" 
            alt="Assam The Saga of Glory" 
            className="absolute inset-0 w-full h-full object-cover object-center lg:object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = '/assam-hero-bg.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180a0a] via-[#180a0a]/40 lg:via-transparent to-transparent opacity-95" />
        </div>

        {/* Text Details underneath */}
        <div className="p-4 sm:p-6 relative z-10 -mt-16 sm:-mt-20 space-y-3 sm:space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs uppercase tracking-widest font-semibold backdrop-blur-md mb-2">
            Immersive 3D Projection & Light Show
          </div>
          <h2 className="font-cinzel text-3xl lg:text-4xl font-extrabold text-amber-300 tracking-wide drop-shadow-md">
            ASSAM
          </h2>
          <h3 className="font-cinzel text-xl lg:text-2xl font-bold text-amber-500 tracking-wider -mt-3">
            THE SAGA OF GLORY
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-300 font-medium pb-2 border-b border-[#3a1818]">
            A 3D Projection Mapping & Light & Sound Show
          </p>

          {/* If on confirmation or payment, show the 4 badges row */}
          {showSummaryBadges ? (
            <div className="grid grid-cols-2 gap-2 text-left pt-2">
              <div className="bg-black/50 p-2.5 rounded-lg border border-[#3a1818] flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Date</p>
                  <p className="text-xs text-amber-200 font-medium truncate">{bookingState.selectedDate || '15 May 2025'}</p>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-lg border border-[#3a1818] flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Time</p>
                  <p className="text-xs text-amber-200 font-medium truncate">{bookingState.selectedTime || '7:00 PM'}</p>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-lg border border-[#3a1818] flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Venue</p>
                  <p className="text-xs text-amber-200 font-medium truncate">Assam Assembly</p>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-lg border border-[#3a1818] flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Duration</p>
                  <p className="text-xs text-amber-200 font-medium truncate">30 Minutes</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-around text-xs pt-2">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Seats</span>
                <span className="font-mono font-bold text-amber-400 text-sm mt-0.5">126</span>
              </div>
              <div className="w-[1px] h-8 bg-[#3a1818]" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Duration</span>
                <span className="font-mono font-bold text-amber-400 text-sm mt-0.5">30 Mins</span>
              </div>
              <div className="w-[1px] h-8 bg-[#3a1818]" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Show Time</span>
                <span className="font-bold text-amber-400 text-xs mt-0.5">Every Evening</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
