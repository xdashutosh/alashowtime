import React from 'react';
import { Check, Mail, QrCode, Clock, Sparkles, Download, Home, Ticket, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BookingState } from '../types';

interface FinalDashboardProps {
  bookingState: BookingState;
  onGoHome: () => void;
}

export const FinalDashboardView: React.FC<FinalDashboardProps> = ({ bookingState, onGoHome }) => {
  const ticketCount = bookingState.selectedSeats.length || 2;
  const seatsStr = bookingState.selectedSeats.join(', ') || 'C-6, C-7';

  const handleDownload = () => {
    alert('Your E-Ticket PDF has been successfully generated and downloaded!');
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#131622]/90 border border-[#c5a059]/25 rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl flex flex-col space-y-8"
      >
        {/* Top Title Banner */}
        <div className="flex items-center space-x-4 pb-4 border-b border-[#232938]">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 font-black" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block">Booking Guide & Information</span>
            <h2 className="font-cinzel text-2xl lg:text-3xl font-extrabold tracking-wider text-emerald-400">
              BOOKING CONFIRMED!
            </h2>
          </div>
        </div>

        {/* Two Column Layout: Details Left, What's Next Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Booking Details Summary (5 cols) */}
          <div className="xl:col-span-5 bg-[#0b0e17] p-6 rounded-2xl border border-[#232938] shadow-inner space-y-6">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#1c2230]">
              <Ticket className="w-5 h-5 text-[#d4af37] shrink-0" />
              <h3 className="font-cinzel text-base font-bold text-[#e6ca65] tracking-wider">BOOKING DETAILS</h3>
            </div>

            <div className="space-y-4 text-left text-xs">
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Booking ID</span>
                <span className="font-mono text-sm font-bold text-[#e6ca65] mt-0.5 block tracking-widest">{bookingState.bookingId}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Show Timing</span>
                <span className="text-sm font-bold text-[#e6ca65] mt-0.5 block">{bookingState.selectedTime || '7:00 PM'}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Show Date</span>
                <span className="text-sm font-semibold text-gray-200 mt-0.5 block">{bookingState.selectedDate || '15 May 2025'}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Allocated Seats ({ticketCount})</span>
                <span className="font-mono text-sm font-bold text-[#d4af37] mt-0.5 block">{seatsStr}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total Amount Paid</span>
                <span className="font-mono text-base font-black text-[#d4af37] mt-0.5 block">₹ {bookingState.totalAmount.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-[#1c2230]">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Venue Address</span>
                <span className="text-xs text-gray-300 mt-1 block leading-relaxed">Assam Legislative Assembly Premises, Dispur, Guwahati</span>
              </div>
            </div>
          </div>

          {/* What's Next Guide (7 cols) */}
          <div className="xl:col-span-7 bg-gradient-to-b from-[#131722] to-[#0b0e17] p-6 rounded-2xl border border-[#c5a059]/30 flex flex-col space-y-6 shadow-xl">
            <div className="pb-3 border-b border-[#c5a059]/20 text-left">
              <span className="font-cinzel text-lg font-bold text-[#e6ca65] tracking-wider">WHAT'S NEXT?</span>
              <p className="text-xs text-gray-400 mt-0.5">Please follow these instructions for a smooth venue experience</p>
            </div>

            <div className="space-y-5 text-left">
              {/* Step 1 */}
              <div className="flex items-start space-x-4 p-3.5 bg-black/40 rounded-xl border border-[#232938]">
                <div className="p-2.5 bg-[#d4af37]/15 rounded-lg text-[#d4af37] border border-[#d4af37]/30 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e6ca65]">1. E-TICKET SENT</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">
                    An e-ticket with your authenticated entry QR code has been sent to your registered mobile number and email.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4 p-3.5 bg-black/40 rounded-xl border border-[#232938]">
                <div className="p-2.5 bg-[#d4af37]/15 rounded-lg text-[#d4af37] border border-[#d4af37]/30 shrink-0 mt-0.5">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e6ca65]">2. SHOW YOUR TICKET</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">
                    Present your digital QR code or printed ticket at the entrance gate for quick verification.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4 p-3.5 bg-black/40 rounded-xl border border-[#232938]">
                <div className="p-2.5 bg-[#d4af37]/15 rounded-lg text-[#d4af37] border border-[#d4af37]/30 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e6ca65]">3. ARRIVE EARLY</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">
                    Please reach the venue at least 30 minutes before the show starts for security screening.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4 p-3.5 bg-black/40 rounded-xl border border-[#232938]">
                <div className="p-2.5 bg-[#d4af37]/15 rounded-lg text-[#d4af37] border border-[#d4af37]/30 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e6ca65]">4. ENJOY THE SHOW</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">
                    Immerse yourself in the spectacular 3D Projection Mapping and Light & Sound experience of Assam's history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#232938]">
          <button 
            onClick={handleDownload}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#c5a059]/40 text-[#d4af37] font-semibold hover:bg-[#d4af37]/10 transition tracking-wider text-sm uppercase flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>DOWNLOAD TICKET</span>
          </button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoHome}
            className="w-full sm:w-auto px-12 py-4 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-bold text-base tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:opacity-95 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer font-bold"
          >
            <Home className="w-5 h-5 text-black shrink-0" />
            <span>BACK TO HOME</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
