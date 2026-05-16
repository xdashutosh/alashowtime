import React, { useState, useEffect } from 'react';
import { Check, Copy, Ticket, ShieldCheck, Download, Wallet, Home, ArrowRight, Calendar, Clock, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BookingState } from '../types';

interface ConfirmationViewProps {
  bookingState: BookingState;
  onBookAgain: () => void;
  onGoHome: () => void;
  onViewFinalDashboard: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  bookingState,
  onBookAgain,
  onGoHome,
  onViewFinalDashboard,
}) => {
  const [copied, setCopied] = useState(false);
  const ticketCount = bookingState.selectedSeats.length || 2;
  const seatsStr = bookingState.selectedSeats.join(', ') || 'C-6, C-7';

  useEffect(() => {
    // Spectacular confetti fireworks on successful booking
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d4af37', '#f5d77f', '#22c55e']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d4af37', '#f5d77f', '#22c55e']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingState.bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert('Your E-Ticket PDF has been successfully generated and downloaded!');
  };

  const handleAddToWallet = () => {
    alert('Ticket successfully added to your Apple / Google Wallet!');
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#160a0a]/90 border border-emerald-500/40 rounded-2xl p-6 lg:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-xl flex flex-col space-y-6"
      >
        {/* Header Success Banner */}
        <div className="text-center space-y-3 pb-4 border-b border-[#381818]">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <Check className="w-8 h-8 font-black" />
          </div>

          <h2 className="font-cinzel text-3xl lg:text-4xl font-extrabold tracking-wider text-emerald-400 drop-shadow">
            BOOKING CONFIRMED!
          </h2>

          <p className="text-xs lg:text-sm text-gray-300 font-medium">
            Your tickets are booked successfully. Thank you for being a part of Assam's pride.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs font-mono">
            <div className="flex items-center space-x-2 bg-black/60 px-4 py-2 rounded-lg border border-amber-500/30">
              <span className="text-gray-400">BOOKING ID:</span>
              <span className="font-bold text-amber-300">{bookingState.bookingId}</span>
              <button 
                onClick={handleCopyId}
                className="p-1 hover:bg-amber-500/20 rounded text-amber-400 transition ml-1"
                title="Copy Booking ID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              {copied && <span className="text-[10px] text-emerald-400 font-sans font-bold">Copied!</span>}
            </div>
            <span className="text-gray-400">Booking Date: 10 May 2025 | 11:45 AM</span>
          </div>
        </div>

        {/* Main Grid: Details Left, E-Ticket Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
          {/* Ticket Details Box (7 cols) */}
          <div className="xl:col-span-7 bg-[#0c0505] p-6 rounded-2xl border border-[#381818] shadow-inner flex flex-col justify-between space-y-6">
            <div className="flex items-center space-x-3 pb-3 border-b border-[#281010]">
              <Ticket className="w-6 h-6 text-amber-500 shrink-0" />
              <h3 className="font-cinzel text-lg font-bold text-amber-300 tracking-wide">TICKET DETAILS</h3>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-left text-xs font-medium">
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Show Name</span>
                <span className="text-sm font-bold text-amber-200 mt-0.5 block">Assam - The Saga of Glory</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Time</span>
                <span className="text-sm font-bold text-amber-200 mt-0.5 block">{bookingState.selectedTime || '7:00 PM'}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Date</span>
                <span className="text-sm font-semibold text-gray-200 mt-0.5 block">{bookingState.selectedDate || '15 May 2025'}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Duration</span>
                <span className="text-sm font-semibold text-gray-200 mt-0.5 block">30 Minutes</span>
              </div>

              <div className="col-span-2">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Venue</span>
                <span className="text-xs text-gray-300 mt-0.5 block leading-relaxed">Assam Legislative Assembly Premises, Dispur, Guwahati</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Seats Allocated ({ticketCount})</span>
                <span className="font-mono text-sm font-bold text-amber-300 mt-0.5 block">{seatsStr}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total Paid</span>
                <span className="font-mono text-base font-black text-amber-400 mt-0.5 block">₹ {bookingState.totalAmount.toFixed(2)}</span>
                <span className="text-[9px] text-gray-400">(Inclusive of all taxes)</span>
              </div>
            </div>

            {/* Notification Alert */}
            <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/30 flex items-center space-x-3 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-emerald-200 leading-snug">
                A confirmation SMS & Email have been sent. Please show the QR code at the entry gate.
              </p>
            </div>
          </div>

          {/* Your Ticket Panel (5 cols) */}
          <div className="xl:col-span-5 bg-gradient-to-b from-[#1b0808] to-[#120404] p-6 rounded-2xl border border-amber-500/40 flex flex-col items-center justify-center space-y-5 text-center shadow-2xl">
            <div className="pb-2 border-b border-amber-500/20 w-full text-center">
              <span className="font-cinzel text-base font-bold text-amber-300 tracking-wider uppercase">YOUR TICKET</span>
            </div>

            <p className="text-xs text-gray-300 px-2">
              Scan QR code at the entry checkpoint for seamless access
            </p>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-amber-500/60 relative group transform transition hover:scale-105">
              <img 
                src="/qr-code.png" 
                alt="Ticket QR Code" 
                className="w-36 h-36 object-contain"
              />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider block">Booking ID</span>
              <span className="font-mono text-xs font-bold text-amber-300 tracking-widest">{bookingState.bookingId}</span>
            </div>

            {/* Buttons */}
            <div className="w-full space-y-2 pt-2">
              <button 
                onClick={handleDownload}
                className="w-full py-3 bg-amber-500/10 border border-amber-500/40 rounded-xl font-semibold text-xs text-amber-300 hover:bg-amber-500/20 transition flex items-center justify-center space-x-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download E-Ticket</span>
              </button>

              <button 
                onClick={handleAddToWallet}
                className="w-full py-3 bg-black/60 border border-gray-700 rounded-xl font-semibold text-xs text-gray-300 hover:bg-gray-800 transition flex items-center justify-center space-x-2"
              >
                <Wallet className="w-4 h-4 text-gray-400" />
                <span>Add to Apple/Google Wallet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#381818]">
          <button 
            onClick={onBookAgain}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-amber-500/50 text-amber-400 font-semibold hover:bg-amber-500/10 transition tracking-wider text-sm uppercase"
          >
            BOOK ANOTHER TICKET
          </button>
          
          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto">
            <button 
              onClick={onGoHome}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-black border border-[#4a2020] text-gray-300 font-semibold hover:text-white transition flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-500 shrink-0" />
              <span>HOME</span>
            </button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewFinalDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-cinzel font-bold text-sm tracking-widest uppercase shadow-xl hover:brightness-110 shadow-amber-500/20 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>VIEW DASHBOARD</span>
              <ArrowRight className="w-4 h-4 text-black shrink-0" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
