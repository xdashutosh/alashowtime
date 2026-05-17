import React from 'react';
import { Ticket, ShieldCheck, User, Clock, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingViewProps {
  onBookTickets: () => void;
  onOpenDetailsModal: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onBookTickets, onOpenDetailsModal }) => {
  const laserBeams = [
    { color: 'from-amber-600 via-amber-500', shadow: 'shadow-[0_0_15px_#d4af37]', pos: 'left-[10%]', h: 'h-[175%]', anim: 'animate-laser-1', delay: '0s' },
    { color: 'from-red-700 via-red-600', shadow: 'shadow-[0_0_15px_#dc2626]', pos: 'left-[13%]', h: 'h-[160%]', anim: 'animate-laser-2', delay: '-1s' },
    { color: 'from-blue-700 via-blue-600', shadow: 'shadow-[0_0_15px_#2563eb]', pos: 'left-[16%]', h: 'h-[185%]', anim: 'animate-laser-3', delay: '-2s' },
    { color: 'from-emerald-700 via-emerald-600', shadow: 'shadow-[0_0_15px_#059669]', pos: 'left-[19%]', h: 'h-[195%]', anim: 'animate-laser-4', delay: '-3s' },
    { color: 'from-purple-700 via-purple-600', shadow: 'shadow-[0_0_15px_#7c3aed]', pos: 'left-[22%]', h: 'h-[170%]', anim: 'animate-laser-5', delay: '-4s' },
    { color: 'from-cyan-700 via-cyan-600', shadow: 'shadow-[0_0_15px_#0891b2]', pos: 'left-[25%]', h: 'h-[180%]', anim: 'animate-laser-1', delay: '-5s' },
    { color: 'from-rose-700 via-rose-600', shadow: 'shadow-[0_0_15px_#e11d48]', pos: 'left-[28%]', h: 'h-[165%]', anim: 'animate-laser-2', delay: '-6s' },
    { color: 'from-indigo-700 via-indigo-600', shadow: 'shadow-[0_0_15px_#4f46e5]', pos: 'left-[31%]', h: 'h-[190%]', anim: 'animate-laser-3', delay: '-7s' },
    { color: 'from-yellow-600 via-yellow-500', shadow: 'shadow-[0_0_15px_#eab308]', pos: 'left-[34%]', h: 'h-[175%]', anim: 'animate-laser-4', delay: '-8s' },
    { color: 'from-fuchsia-700 via-fuchsia-600', shadow: 'shadow-[0_0_15px_#c026d3]', pos: 'left-[37%]', h: 'h-[185%]', anim: 'animate-laser-5', delay: '-9s' },
    { color: 'from-teal-700 via-teal-600', shadow: 'shadow-[0_0_15px_#0d9488]', pos: 'left-[40%]', h: 'h-[195%]', anim: 'animate-laser-1', delay: '-10s' },
    { color: 'from-amber-700 via-amber-600', shadow: 'shadow-[0_0_15px_#d97706]', pos: 'left-[43%]', h: 'h-[160%]', anim: 'animate-laser-2', delay: '-11s' },
    { color: 'from-blue-800 via-blue-700', shadow: 'shadow-[0_0_15px_#1d4ed8]', pos: 'left-[46%]', h: 'h-[180%]', anim: 'animate-laser-3', delay: '-12s' },
    { color: 'from-red-800 via-red-700', shadow: 'shadow-[0_0_15px_#b91c1c]', pos: 'left-[49%]', h: 'h-[170%]', anim: 'animate-laser-4', delay: '-13s' },
    { color: 'from-emerald-800 via-emerald-700', shadow: 'shadow-[0_0_15px_#047857]', pos: 'left-[52%]', h: 'h-[185%]', anim: 'animate-laser-5', delay: '-14s' },
    { color: 'from-violet-700 via-violet-600', shadow: 'shadow-[0_0_15px_#6d28d9]', pos: 'left-[55%]', h: 'h-[190%]', anim: 'animate-laser-1', delay: '-15s' },
    { color: 'from-cyan-800 via-cyan-700', shadow: 'shadow-[0_0_15px_#0e7490]', pos: 'left-[58%]', h: 'h-[175%]', anim: 'animate-laser-2', delay: '-1.5s' },
    { color: 'from-rose-800 via-rose-700', shadow: 'shadow-[0_0_15px_#be123c]', pos: 'left-[61%]', h: 'h-[165%]', anim: 'animate-laser-3', delay: '-2.5s' },
    { color: 'from-indigo-800 via-indigo-700', shadow: 'shadow-[0_0_15px_#4338ca]', pos: 'left-[64%]', h: 'h-[180%]', anim: 'animate-laser-4', delay: '-3.5s' },
    { color: 'from-yellow-700 via-yellow-600', shadow: 'shadow-[0_0_15px_#ca8a04]', pos: 'left-[67%]', h: 'h-[195%]', anim: 'animate-laser-5', delay: '-4.5s' },
    { color: 'from-fuchsia-800 via-fuchsia-700', shadow: 'shadow-[0_0_15px_#a21caf]', pos: 'left-[70%]', h: 'h-[170%]', anim: 'animate-laser-1', delay: '-5.5s' },
    { color: 'from-teal-800 via-teal-700', shadow: 'shadow-[0_0_15px_#0f766e]', pos: 'left-[73%]', h: 'h-[185%]', anim: 'animate-laser-2', delay: '-6.5s' },
    { color: 'from-amber-800 via-amber-700', shadow: 'shadow-[0_0_15px_#b45309]', pos: 'left-[76%]', h: 'h-[190%]', anim: 'animate-laser-3', delay: '-7.5s' },
    { color: 'from-blue-700 via-blue-600', shadow: 'shadow-[0_0_15px_#2563eb]', pos: 'left-[79%]', h: 'h-[160%]', anim: 'animate-laser-4', delay: '-8.5s' },
    { color: 'from-red-700 via-red-600', shadow: 'shadow-[0_0_15px_#dc2626]', pos: 'left-[82%]', h: 'h-[175%]', anim: 'animate-laser-5', delay: '-9.5s' },
    { color: 'from-emerald-700 via-emerald-600', shadow: 'shadow-[0_0_15px_#059669]', pos: 'left-[85%]', h: 'h-[180%]', anim: 'animate-laser-1', delay: '-10.5s' },
    { color: 'from-purple-800 via-purple-700', shadow: 'shadow-[0_0_15px_#6b21a8]', pos: 'left-[88%]', h: 'h-[165%]', anim: 'animate-laser-2', delay: '-11.5s' },
    { color: 'from-cyan-700 via-cyan-600', shadow: 'shadow-[0_0_15px_#0891b2]', pos: 'left-[91%]', h: 'h-[195%]', anim: 'animate-laser-3', delay: '-12.5s' },
    { color: 'from-rose-700 via-rose-600', shadow: 'shadow-[0_0_15px_#e11d48]', pos: 'left-[5%]', h: 'h-[185%]', anim: 'animate-laser-4', delay: '-13.5s' },
    { color: 'from-indigo-700 via-indigo-600', shadow: 'shadow-[0_0_15px_#4f46e5]', pos: 'left-[95%]', h: 'h-[170%]', anim: 'animate-laser-5', delay: '-14.5s' },
  ];

  return (
    <div className="flex-1 flex flex-col relative w-full overflow-hidden bg-black">
      {/* Background Hero Image & Sky Projector Animations */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0505]">
        {/* Sky Projector Razor-Sharp Laser Rays coming from behind */}
        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-0 flex justify-center items-end">
          {/* Central Ground Projector Glow */}
          <div className="absolute bottom-0 w-[400px] md:w-[800px] h-[350px] bg-gradient-to-t from-amber-500/40 via-red-600/10 to-transparent blur-3xl animate-pulse opacity-80 mix-blend-screen" />

          {/* Denser, Thinner, Darker Laser Array */}
          {laserBeams.map((laser, idx) => (
            <div
              key={idx}
              className={`absolute bottom-0 w-0.5 md:w-1 ${laser.h} bg-gradient-to-t ${laser.color} to-transparent ${laser.shadow} ${laser.pos} ${laser.anim} opacity-75 mix-blend-screen blur-[0.3px]`}
              style={{ animationDelay: laser.delay }}
            />
          ))}
        </div>

        <img 
          src="/assam-hero-bg.png" 
          alt="Assam Legislative Assembly Light Show" 
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center transform scale-105 filter brightness-95 contrast-105 z-10 opacity-90 mix-blend-lighten"
        />
        {/* Dark gradient overlay to ensure text readability on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e17] via-[#0b0e17]/85 to-transparent w-full md:w-2/3 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-transparent to-transparent z-20 opacity-90 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-24 relative z-20 flex flex-col justify-center my-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-left space-y-6"
        >
          {/* Decorative Flourish Top */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#e6ca65] to-[#9c7a38]" />
            <span className="text-xs md:text-sm font-cinzel font-bold tracking-widest text-[#c5a059] uppercase">
              Assam Legislative Assembly
            </span>
          </div>

          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-[#e6ca65] leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            ASSAM
          </h1>
          <h2 className="font-cinzel text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#d4af37] tracking-widest leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
            THE SAGA OF GLORY
          </h2>

          {/* Decorative Flourish Bottom */}
          <div className="w-48 h-[2px] bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-transparent my-4" />

          <p className="text-sm md:text-base uppercase tracking-[0.25em] font-medium text-[#cbd5e1] drop-shadow">
            A 3D PROJECTION MAPPING & LIGHT & SOUND SHOW
          </p>

          {/* 3 Info Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-4 pb-6 w-full max-w-lg">
            <div className="flex items-center space-x-3 bg-[#131722]/85 p-3 rounded-xl border border-[#c5a059]/25 backdrop-blur-md">
              <div className="p-2.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Total Seats</p>
                <p className="text-sm md:text-base font-mono font-bold text-[#e6ca65]">126</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-[#131722]/85 p-3 rounded-xl border border-[#c5a059]/25 backdrop-blur-md">
              <div className="p-2.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Duration</p>
                <p className="text-sm md:text-base font-mono font-bold text-[#e6ca65]">30 Mins</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-[#131722]/85 p-3 rounded-xl border border-[#c5a059]/25 backdrop-blur-md">
              <div className="p-2.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Show Time</p>
                <p className="text-xs font-bold text-[#e6ca65] truncate">7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Book Tickets Button */}
          <div className="space-y-3 pt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookTickets}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-black text-xl md:text-2xl tracking-widest rounded-xl shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center space-x-4 hover:opacity-95 transition duration-300 border border-[#e6ca65]/60 cursor-pointer"
            >
              <Ticket className="w-7 h-7 text-black shrink-0" />
              <span>BOOK TICKETS</span>
            </motion.button>

            {/* Security Note */}
            <div className="flex items-center space-x-2 text-xs md:text-sm text-[#d4af37]/80 font-medium pl-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Secure Booking • Limited Seats • One Aadhaar Max 4 Tickets</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Features Banner */}
      <div className="w-full bg-gradient-to-r from-[#0f131f] via-[#0b0e17] to-[#0f131f] border-t border-[#c5a059]/25 py-6 px-6 mt-auto relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#232938] group hover:border-[#d4af37]/50 transition">
            <div className="p-3 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30 group-hover:bg-[#d4af37]/20 text-[#d4af37] transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-[#e6ca65] tracking-wide text-sm">VERIFIED BOOKING</h3>
              <p className="text-xs text-gray-400 mt-0.5">Secure & Safe Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#232938] group hover:border-[#d4af37]/50 transition">
            <div className="p-3 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30 group-hover:bg-[#d4af37]/20 text-[#d4af37] transition">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-[#e6ca65] tracking-wide text-sm">AADHAAR VERIFIED</h3>
              <p className="text-xs text-gray-400 mt-0.5">Secure Your Booking</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#232938] group hover:border-[#d4af37]/50 transition">
            <div className="p-3 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30 group-hover:bg-[#d4af37]/20 text-[#d4af37] transition">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-[#e6ca65] tracking-wide text-sm">MAX 4 TICKETS</h3>
              <p className="text-xs text-gray-400 mt-0.5">Per Aadhaar Number</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#232938] group hover:border-[#d4af37]/50 transition">
            <div className="p-3 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30 group-hover:bg-[#d4af37]/20 text-[#d4af37] transition">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-[#e6ca65] tracking-wide text-sm">EASY & QUICK</h3>
              <p className="text-xs text-gray-400 mt-0.5">3-Step Booking Process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
