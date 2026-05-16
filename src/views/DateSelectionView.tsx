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
        className="bg-[#160a0a]/90 border border-amber-500/40 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black backdrop-blur-xl flex flex-col"
      >
        {/* Title */}
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-[#381818]">
          <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-400">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-cinzel text-2xl lg:text-3xl font-bold tracking-wider text-amber-300">
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
          <div className="xl:col-span-7 bg-[#0c0505] p-5 rounded-2xl border border-[#381818] shadow-inner flex flex-col">
            {/* Month Nav */}
            <div className="flex items-center justify-between pb-4 border-b border-[#281010] mb-4">
              <button 
                onClick={prevMonth}
                className="p-2 bg-[#1a0808] rounded-lg text-amber-400 hover:bg-amber-500 hover:text-black transition border border-amber-500/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-cinzel text-lg font-bold tracking-widest text-amber-200">
                {currentMonth}
              </span>
              <button 
                onClick={nextMonth}
                className="p-2 bg-[#1a0808] rounded-lg text-amber-400 hover:bg-amber-500 hover:text-black transition border border-amber-500/20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold tracking-wider text-amber-500 mb-2">
              {daysOfWeek.map((d) => (
                <span key={d} className="py-1">{d}</span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {blanks.map((b) => (
                <div key={`blank-${b}`} className="py-2.5 text-gray-700 font-medium bg-[#120606]/30 rounded-lg select-none">
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
                    className={`py-2.5 rounded-lg font-semibold transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold scale-110 shadow-lg shadow-amber-500/40 z-10'
                        : isToday
                          ? 'bg-amber-500/10 border border-amber-500 text-amber-300 hover:bg-amber-500/20'
                          : 'bg-[#180a0a] text-gray-300 border border-[#2a1212] hover:border-amber-500/50 hover:text-amber-300'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Info Banner */}
            <div className="mt-6 pt-4 border-t border-[#281010] flex items-center space-x-3 text-xs text-amber-300/80">
              <Info className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Seats availability will be shown for the selected date</span>
            </div>
          </div>

          {/* Show Details Sidebar (Right 5 cols) */}
          <div className="xl:col-span-5 bg-gradient-to-b from-[#1c0808] to-[#120505] p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-5">
              <div className="text-center pb-3 border-b border-amber-500/20">
                <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-400">Show Details Summary</span>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <CalendarIcon className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Show Name</h4>
                    <p className="text-sm font-bold text-amber-200 mt-0.5">Assam - The Saga of Glory</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Show Time</h4>
                    <p className="text-sm font-bold text-amber-200 mt-0.5">7:00 PM (Every Evening)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Venue</h4>
                    <p className="text-xs text-gray-300 leading-snug mt-0.5">Assam Legislative Assembly Premises, Dispur, Guwahati</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Duration</h4>
                    <p className="text-xs font-semibold text-amber-300 mt-0.5">30 Minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#381818]">
              <div className="bg-black/60 p-4 rounded-xl border border-amber-500/40 flex items-center justify-between">
                <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Total Seats</span>
                <span className="font-mono text-xl font-bold text-amber-400">126</span>
              </div>

              <div className="bg-red-950/50 p-4 rounded-xl border border-red-500/40 flex items-start space-x-3 text-left">
                <ShieldCheck className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-red-300">Limited Seats Available</h4>
                  <p className="text-[11px] text-gray-300 mt-1 leading-snug">Book early to secure your preferred show date & premium immersive seats.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons bottom */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#381818]">
          <button 
            onClick={onBack}
            className="px-8 py-3.5 rounded-xl border border-amber-500/50 text-amber-400 font-semibold hover:bg-amber-500/10 transition tracking-wider text-sm uppercase flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>
          <button 
            onClick={onNext}
            className="px-10 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-cinzel font-bold text-base tracking-widest uppercase shadow-xl hover:brightness-110 shadow-amber-500/20 transition duration-300 flex items-center space-x-2"
          >
            <span>CHECK AVAILABILITY</span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
