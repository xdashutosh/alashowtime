import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Info, ShieldCheck, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface DateSelectionProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DateSelectionView: React.FC<DateSelectionProps> = ({
  selectedDate,
  onSelectDate,
  onNext,
  onBack,
}) => {
  // Simple state for calendar display (May 2025 as in PDF)
  const [currentMonth, setCurrentMonth] = useState('May 2025');
  const [activeDay, setActiveDay] = useState<number>(() => {
    if (selectedDate && selectedDate.includes('May 2025')) {
      const dayStr = selectedDate.split(' ')[0];
      return parseInt(dayStr, 10) || 15;
    }
    return 15; // default 15th May 2025 as in PDF
  });

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // May 2025 begins on a Thursday (4 blank days before 1st)
  const blanks = [27, 28, 29, 30]; // Previous month trailing days
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSelectDay = (day: number) => {
    setActiveDay(day);
    onSelectDate(`${day} May 2025`);
  };

  const nextMonth = () => {
    if (currentMonth === 'May 2025') setCurrentMonth('June 2025');
    else setCurrentMonth('May 2025');
  };

  const prevMonth = () => {
    if (currentMonth === 'June 2025') setCurrentMonth('May 2025');
    else setCurrentMonth('May 2025');
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#131622]/90 border border-[#c5a059]/25 rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl flex flex-col"
      >
        {/* Title */}
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-[#232938]">
          <div className="p-3 bg-[#d4af37]/15 rounded-xl border border-[#d4af37]/30 text-[#d4af37]">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-cinzel text-2xl lg:text-3xl font-bold tracking-wider text-[#e6ca65]">
              SELECT SHOW DATE
            </h2>
            <p className="text-xs lg:text-sm text-gray-400 font-medium tracking-wide">
              Choose your preferred date for the show
            </p>
          </div>
        </div>

        {/* Main Grid: Calendar Left, Details Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-4">
          {/* Calendar Component (Left 7 cols) */}
          <div className="xl:col-span-7 bg-[#0b0e17] p-5 rounded-2xl border border-[#232938] shadow-inner flex flex-col">
            {/* Month Nav */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1c2230] mb-4">
              <button 
                onClick={prevMonth}
                className="p-2 bg-[#131722] rounded-lg text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition border border-[#d4af37]/20 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-cinzel text-lg font-bold tracking-widest text-[#e6ca65]">
                {currentMonth}
              </span>
              <button 
                onClick={nextMonth}
                className="p-2 bg-[#131722] rounded-lg text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition border border-[#d4af37]/20 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold tracking-wider text-[#d4af37] mb-2">
              {daysOfWeek.map((d) => (
                <span key={d} className="py-1">{d}</span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {blanks.map((b) => (
                <div key={`blank-${b}`} className="py-2.5 text-gray-600 font-medium bg-[#121622]/30 rounded-lg select-none">
                  {b}
                </div>
              ))}
              {daysInMonth.map((day) => {
                const isSelected = activeDay === day && currentMonth === 'May 2025';
                const isToday = day === 15; // PDF reference highlights 15

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => handleSelectDay(day)}
                    className={`py-2.5 rounded-lg font-semibold transition-all duration-300 relative cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-extrabold scale-110 shadow-lg shadow-[#d4af37]/40 z-10'
                        : isToday
                          ? 'bg-[#d4af37]/15 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/25'
                          : 'bg-[#151a28] text-gray-300 border border-[#232938] hover:border-[#d4af37]/50 hover:text-[#e6ca65]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Info Banner */}
            <div className="mt-6 pt-4 border-t border-[#1c2230] flex items-center space-x-3 text-xs text-[#d4af37]/80">
              <Info className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Seats availability will be shown for the selected date</span>
            </div>
          </div>

          {/* Show Details Sidebar (Right 5 cols) */}
          <div className="xl:col-span-5 bg-gradient-to-b from-[#131722] to-[#0e111a] p-5 rounded-2xl border border-[#c5a059]/30 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-5">
              <div className="text-center pb-3 border-b border-[#232938]">
                <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#d4af37]">Show Details Summary</span>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <CalendarIcon className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Show Name</h4>
                    <p className="text-sm font-bold text-[#e6ca65] mt-0.5">Assam - The Saga of Glory</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Show Time</h4>
                    <p className="text-sm font-bold text-[#e6ca65] mt-0.5">7:00 PM (Every Evening)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Venue</h4>
                    <p className="text-xs text-gray-300 leading-snug mt-0.5">Assam Legislative Assembly Premises, Dispur, Guwahati</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Duration</h4>
                    <p className="text-xs font-semibold text-[#e6ca65] mt-0.5">30 Minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#232938]">
              <div className="bg-black/60 p-4 rounded-xl border border-[#c5a059]/30 flex items-center justify-between">
                <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Total Seats</span>
                <span className="font-mono text-xl font-bold text-[#d4af37]">126</span>
              </div>

              <div className="bg-[#1e1c15]/60 p-4 rounded-xl border border-[#d4af37]/30 flex items-start space-x-3 text-left">
                <ShieldCheck className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#e6ca65]">Limited Seats Available</h4>
                  <p className="text-[11px] text-gray-300 mt-1 leading-snug">Book early to secure your preferred show date & premium immersive seats.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons bottom */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 mt-4 border-t border-[#232938]">
          <button 
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#c5a059]/40 text-[#d4af37] font-semibold hover:bg-[#d4af37]/10 transition tracking-wider text-sm uppercase flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>BACK</span>
          </button>
          <button 
            onClick={onNext}
            className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-bold text-base tracking-widest uppercase shadow-xl hover:opacity-95 shadow-[#d4af37]/20 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>CHECK AVAILABILITY</span>
            <ChevronRight className="w-5 h-5 text-black shrink-0" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
