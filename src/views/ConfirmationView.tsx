import React, { useState, useEffect, useRef } from 'react';
import { Check, Copy, Ticket, ShieldCheck, Download, Wallet, Home, ArrowRight, Calendar, Clock, MapPin, Award, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
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
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  
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

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    
    try {
      const dataUrl = await toPng(ticketRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#0c0505',
        filter: (node) => {
          if (node instanceof HTMLElement && node.hasAttribute('data-html2image-ignore')) {
            return false;
          }
          return true;
        }
      });
      
      const width = ticketRef.current.offsetWidth;
      const height = ticketRef.current.offsetHeight;
      const orientation = width > height ? 'l' : 'p';

      const pdf = new jsPDF(orientation, 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (height * pdfWidth) / width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Assam_Ticket_${bookingState.bookingId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
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
        className="bg-[#131622]/90 border border-emerald-500/40 rounded-2xl p-6 lg:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-xl flex flex-col space-y-6"
      >
        {/* Header Success Banner */}
        <div className="text-center space-y-3 pb-4 border-b border-[#232938]">
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
            <div className="flex items-center space-x-2 bg-[#0b0e17] px-4 py-2 rounded-lg border border-[#c5a059]/30">
              <span className="text-gray-400">BOOKING ID:</span>
              <span className="font-bold text-[#e6ca65]">{bookingState.bookingId}</span>
              <button 
                onClick={handleCopyId}
                className="p-1 hover:bg-[#d4af37]/20 rounded text-[#d4af37] transition ml-1 cursor-pointer"
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
        <div ref={ticketRef} className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch bg-[#131622] p-2 rounded-2xl">
          {/* Ticket Details Box (7 cols) */}
          <div className="xl:col-span-7 bg-[#0b0e17] p-6 rounded-2xl border border-[#232938] shadow-inner flex flex-col justify-between space-y-6">
            <div className="flex items-center space-x-3 pb-3 border-b border-[#1c2230]">
              <Ticket className="w-6 h-6 text-[#d4af37] shrink-0" />
              <h3 className="font-cinzel text-lg font-bold text-[#e6ca65] tracking-wide">TICKET DETAILS</h3>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-left text-xs font-medium">
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Show Name</span>
                <span className="text-sm font-bold text-[#e6ca65] mt-0.5 block">Assam - The Saga of Glory</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Time</span>
                <span className="text-sm font-bold text-[#e6ca65] mt-0.5 block">{bookingState.selectedTime || '7:00 PM'}</span>
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
                <span className="font-mono text-sm font-bold text-[#d4af37] mt-0.5 block">{seatsStr}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total Paid</span>
                <span className="font-mono text-base font-black text-[#d4af37] mt-0.5 block">₹ {bookingState.totalAmount.toFixed(2)}</span>
                <span className="text-[9px] text-gray-400">(Inclusive of all taxes)</span>
              </div>
            </div>

            {/* Notification Alert */}
            <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30 flex items-center space-x-3 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-emerald-200 leading-snug">
                A confirmation SMS & Email have been sent to <strong>{bookingState.email || 'your registered email'}</strong>. Please show the QR code at the entry gate.
              </p>
            </div>
          </div>

          {/* Your Ticket Panel (5 cols) */}
          <div className="xl:col-span-5 bg-gradient-to-b from-[#131722] to-[#0b0e17] p-6 rounded-2xl border border-[#c5a059]/40 flex flex-col items-center justify-center space-y-5 text-center shadow-2xl">
            <div className="pb-2 border-b border-[#c5a059]/20 w-full text-center">
              <span className="font-cinzel text-base font-bold text-[#e6ca65] tracking-wider uppercase">YOUR TICKET</span>
            </div>

            <p className="text-xs text-gray-300 px-2">
              Scan QR code at the entry checkpoint for seamless access
            </p>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-[#d4af37]/60 relative group transform transition hover:scale-105">
              <div className="w-36 h-36 flex items-center justify-center">
                <QRCodeSVG 
                  value={bookingState.bookingId} 
                  size={144}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  level="H"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider block">Booking ID</span>
              <span className="font-mono text-xs font-bold text-[#d4af37] tracking-widest">{bookingState.bookingId}</span>
            </div>

            {/* Buttons */}
            <div className="w-full space-y-2 pt-2" data-html2image-ignore>
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-3 bg-[#d4af37]/15 border border-[#d4af37]/40 rounded-xl font-semibold text-xs text-[#e6ca65] hover:bg-[#d4af37]/25 transition flex items-center justify-center space-x-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 text-[#d4af37] animate-spin" />
                ) : (
                  <Download className="w-4 h-4 text-[#d4af37]" />
                )}
                <span>{isDownloading ? 'Generating PDF...' : 'Download E-Ticket'}</span>
              </button>

              <button 
                onClick={handleAddToWallet}
                className="w-full py-3 bg-[#0e111a] border border-[#232938] rounded-xl font-semibold text-xs text-gray-300 hover:bg-[#151a28] transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Wallet className="w-4 h-4 text-gray-400" />
                <span>Add to Apple/Google Wallet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#232938]">
          <button 
            onClick={onBookAgain}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#c5a059]/40 text-[#d4af37] font-semibold hover:bg-[#d4af37]/10 transition tracking-wider text-sm uppercase cursor-pointer"
          >
            BOOK ANOTHER TICKET
          </button>
          
          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto">
            <button 
              onClick={onGoHome}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-black border border-[#232938] text-gray-300 font-semibold hover:text-white transition flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>HOME</span>
            </button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewFinalDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-bold text-sm tracking-widest uppercase shadow-xl hover:opacity-95 shadow-[#d4af37]/20 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer font-bold"
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
