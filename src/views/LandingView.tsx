import React from 'react';
import { Ticket, ShieldCheck, User, Clock, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingViewProps {
  onBookTickets: () => void;
  onOpenDetailsModal: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onBookTickets, onOpenDetailsModal }) => {
  return (
    <div className="flex-1 flex flex-col relative w-full overflow-hidden bg-black">
      {/* Background Hero Image & Sky Projector Animations */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0505]">
        {/* Sky Projector Razor-Sharp Laser Rays coming from behind */}
        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-0 flex justify-center items-end">
          {/* Central Ground Projector Glow */}
          <div className="absolute bottom-0 w-[400px] md:w-[800px] h-[350px] bg-gradient-to-t from-amber-500/40 via-red-600/10 to-transparent blur-3xl animate-pulse opacity-80 mix-blend-screen" />

          {/* Razor Sharp Laser 1 (Golden Amber) */}
          <div className="absolute bottom-0 w-1.5 md:w-2.5 h-[170%] bg-gradient-to-t from-white via-amber-400 to-transparent shadow-[0_0_25px_#f59e0b] blur-[0.5px] animate-laser-1 opacity-95 mix-blend-screen" />
          
          {/* Razor Sharp Laser 2 (Ruby Red) */}
          <div className="absolute bottom-0 w-1.5 md:w-2 h-[160%] bg-gradient-to-t from-white via-red-500 to-transparent shadow-[0_0_25px_#ef4444] blur-[0.5px] animate-laser-2 opacity-95 mix-blend-screen ml-12 md:ml-24" />
          
          {/* Razor Sharp Laser 3 (Electric Blue) */}
          <div className="absolute bottom-0 w-1.5 md:w-2.5 h-[180%] bg-gradient-to-t from-white via-blue-400 to-transparent shadow-[0_0_25px_#3b82f6] blur-[0.5px] animate-laser-3 opacity-95 mix-blend-screen mr-16 md:mr-32" />

          {/* Razor Sharp Laser 4 (Emerald Green) */}
          <div className="absolute bottom-0 w-1.5 md:w-2 h-[165%] bg-gradient-to-t from-white via-emerald-400 to-transparent shadow-[0_0_25px_#10b981] blur-[0.5px] animate-laser-1 opacity-90 mix-blend-screen ml-32 md:ml-64" style={{ animationDelay: '-3s' }} />

          {/* Razor Sharp Laser 5 (Royal Purple) */}
          <div className="absolute bottom-0 w-1.5 md:w-2 h-[175%] bg-gradient-to-t from-white via-purple-400 to-transparent shadow-[0_0_25px_#a855f7] blur-[0.5px] animate-laser-2 opacity-90 mix-blend-screen mr-32 md:mr-64" style={{ animationDelay: '-6s' }} />
        </div>

        <img 
          src="/assam-hero-bg.png" 
          alt="Assam Legislative Assembly Light Show" 
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center transform scale-105 filter brightness-95 contrast-105 z-10 opacity-90 mix-blend-lighten"
        />
        {/* Dark gradient overlay to ensure text readability on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0505] via-[#0c0505]/80 to-transparent w-full md:w-2/3 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0505] via-transparent to-transparent z-20 opacity-90 pointer-events-none" />
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
            <div className="w-16 h-[2px] bg-gradient-to-r from-amber-500 to-amber-700" />
            <span className="text-xs md:text-sm font-cinzel font-bold tracking-widest text-amber-500 uppercase">
              Assam Legislative Assembly
            </span>
          </div>

          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-amber-300 leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            ASSAM
          </h1>
          <h2 className="font-cinzel text-2xl md:text-4xl lg:text-5xl font-extrabold text-amber-500 tracking-widest leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
            THE SAGA OF GLORY
          </h2>

          {/* Decorative Flourish Bottom */}
          <div className="w-48 h-[2px] bg-gradient-to-r from-amber-500 via-red-600 to-transparent my-4" />

          <p className="text-sm md:text-base uppercase tracking-[0.25em] font-medium text-gray-200 drop-shadow">
            A 3D PROJECTION MAPPING & LIGHT & SOUND SHOW
          </p>

          {/* 3 Info Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-4 pb-6 w-full max-w-lg">
            <div className="flex items-center space-x-3 bg-[#1a0808]/80 p-3 rounded-xl border border-amber-500/30 backdrop-blur-md">
              <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Total Seats</p>
                <p className="text-sm md:text-base font-mono font-bold text-amber-300">126</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-[#1a0808]/80 p-3 rounded-xl border border-amber-500/30 backdrop-blur-md">
              <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Duration</p>
                <p className="text-sm md:text-base font-mono font-bold text-amber-300">30 Mins</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-[#1a0808]/80 p-3 rounded-xl border border-amber-500/30 backdrop-blur-md">
              <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Show Time</p>
                <p className="text-xs font-bold text-amber-300 truncate">7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Book Tickets Button */}
          <div className="space-y-3 pt-2">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookTickets}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-cinzel font-black text-xl md:text-2xl tracking-widest rounded-xl shadow-[0_0_40px_rgba(212,175,55,0.5)] flex items-center justify-center space-x-4 hover:brightness-110 transition duration-300 border border-amber-300"
            >
              <Ticket className="w-7 h-7 text-black" />
              <span>BOOK TICKETS</span>
            </motion.button>

            {/* Security Note */}
            <div className="flex items-center space-x-2 text-xs md:text-sm text-amber-300/80 font-medium pl-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Secure Booking • Limited Seats • One Aadhaar Max 4 Tickets</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Features Banner */}
      <div className="w-full bg-gradient-to-r from-[#200808] via-[#1a0505] to-[#200808] border-t border-amber-500/30 py-6 px-6 mt-auto relative z-20 shadow-2xl shadow-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#3a1818] group hover:border-amber-500/50 transition">
            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/20 text-amber-400 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 tracking-wide text-sm">VERIFIED BOOKING</h3>
              <p className="text-xs text-gray-400 mt-0.5">Secure & Safe Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#3a1818] group hover:border-amber-500/50 transition">
            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/20 text-amber-400 transition">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 tracking-wide text-sm">AADHAAR VERIFIED</h3>
              <p className="text-xs text-gray-400 mt-0.5">Secure Your Booking</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#3a1818] group hover:border-amber-500/50 transition">
            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/20 text-amber-400 transition">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 tracking-wide text-sm">MAX 4 TICKETS</h3>
              <p className="text-xs text-gray-400 mt-0.5">Per Aadhaar Number</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-black/40 p-4 rounded-xl border border-[#3a1818] group hover:border-amber-500/50 transition">
            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/20 text-amber-400 transition">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 tracking-wide text-sm">EASY & QUICK</h3>
              <p className="text-xs text-gray-400 mt-0.5">3-Step Booking Process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
