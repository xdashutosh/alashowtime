import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, MapPin, Ticket, Info, Lock, ChevronLeft, CreditCard, Building, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BookingState } from '../types';

interface PaymentViewProps {
  bookingState: BookingState;
  onSetPaymentMethod: (method: 'upi' | 'card' | 'netbanking') => void;
  onPay: () => void;
  onBack: () => void;
  onViewSeats: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  bookingState,
  onSetPaymentMethod,
  onPay,
  onBack,
  onViewSeats,
}) => {
  const [timeLeft, setTimeLeft] = useState(295); // 04:55 as in PDF
  const ticketCount = bookingState.selectedSeats.length || 2;
  const ticketPriceTotal = ticketCount * 100;
  const bookingFee = 10;
  const grandTotal = ticketPriceTotal + bookingFee;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#160a0a]/90 border border-amber-500/40 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black backdrop-blur-xl flex flex-col space-y-6"
      >
        {/* Top Summary Banner */}
        <div className="bg-[#0e0505] p-5 rounded-xl border border-amber-500/30 shadow-inner flex flex-col space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-[#381818]">
            <FileText className="w-6 h-6 text-amber-500 shrink-0" />
            <h3 className="font-cinzel text-lg font-bold text-amber-300 tracking-wider">BOOKING SUMMARY</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-left">
            <div className="flex items-start space-x-2">
              <Calendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Date</span>
                <p className="font-semibold text-amber-200 truncate">{bookingState.selectedDate || '15 May 2025'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Time</span>
                <p className="font-semibold text-amber-200 truncate">{bookingState.selectedTime || '7:00 PM'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Venue</span>
                <p className="font-semibold text-amber-200 truncate">Assam Assembly</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#1a0808] p-2 rounded-lg border border-amber-500/20 md:col-span-1">
              <div className="flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Seats Selected</span>
                  <span className="font-mono font-bold text-amber-300">{ticketCount} Seats</span>
                </div>
              </div>
              <button 
                onClick={onViewSeats}
                className="text-[10px] uppercase font-bold text-amber-400 hover:text-amber-300 px-2 py-1 bg-amber-500/10 rounded border border-amber-500/30 transition"
              >
                VIEW
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Section: Payment Options Left, QR Code Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Price Breakdown & Payment Method */}
          <div className="xl:col-span-7 flex flex-col space-y-6">
            {/* Price Breakdown */}
            <div className="bg-[#0c0505] p-5 rounded-xl border border-[#381818] space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center text-gray-300">
                <span>TICKET PRICE (₹100.00 × {ticketCount})</span>
                <span>₹ {ticketPriceTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300 pb-3 border-b border-[#281010]">
                <span className="flex items-center space-x-1">
                  <span>BOOKING FEE</span>
                  <span title="Secure portal transaction fee"><Info className="w-3.5 h-3.5 text-amber-500/70 cursor-help" /></span>
                </span>
                <span>₹ {bookingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-amber-400 pt-1">
                <span>TOTAL AMOUNT</span>
                <span className="text-xl">₹ {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Choose Payment Method */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-2 border-b border-[#381818]">
                <h4 className="font-cinzel text-base font-bold text-amber-300 tracking-wider">CHOOSE PAYMENT METHOD</h4>
              </div>

              <div className="space-y-3 text-left">
                {/* Option 1: UPI */}
                <div 
                  onClick={() => onSetPaymentMethod('upi')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    bookingState.paymentMethod === 'upi'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-black/60 border-[#381818] text-gray-400 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                      bookingState.paymentMethod === 'upi' ? 'border-amber-500 bg-amber-500 text-black' : 'border-gray-600'
                    }`}>
                      {bookingState.paymentMethod === 'upi' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                    </div>
                    <div>
                      <span className="font-bold text-amber-200 block text-sm">UPI / QR CODE</span>
                      <span className="text-xs text-gray-400">Pay using any UPI app</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-amber-500">
                    <span className="px-2 py-0.5 bg-black rounded border border-amber-500/30">GPay</span>
                    <span className="px-2 py-0.5 bg-black rounded border border-amber-500/30">PhonePe</span>
                    <span className="px-2 py-0.5 bg-black rounded border border-amber-500/30">Paytm</span>
                  </div>
                </div>

                {/* Option 2: Card */}
                <div 
                  onClick={() => onSetPaymentMethod('card')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    bookingState.paymentMethod === 'card'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-black/60 border-[#381818] text-gray-400 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                      bookingState.paymentMethod === 'card' ? 'border-amber-500 bg-amber-500 text-black' : 'border-gray-600'
                    }`}>
                      {bookingState.paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                    </div>
                    <div>
                      <span className="font-bold text-amber-200 block text-sm">DEBIT / CREDIT CARD</span>
                      <span className="text-xs text-gray-400">Visa, Mastercard, Rupay & more</span>
                    </div>
                  </div>
                  <CreditCard className="w-6 h-6 text-amber-500/80" />
                </div>

                {/* Option 3: Net Banking */}
                <div 
                  onClick={() => onSetPaymentMethod('netbanking')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    bookingState.paymentMethod === 'netbanking'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-black/60 border-[#381818] text-gray-400 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                      bookingState.paymentMethod === 'netbanking' ? 'border-amber-500 bg-amber-500 text-black' : 'border-gray-600'
                    }`}>
                      {bookingState.paymentMethod === 'netbanking' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                    </div>
                    <div>
                      <span className="font-bold text-amber-200 block text-sm">NET BANKING</span>
                      <span className="text-xs text-gray-400">All major banks supported</span>
                    </div>
                  </div>
                  <Building className="w-6 h-6 text-amber-500/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): QR Code Scan & Pay */}
          <div className="xl:col-span-5 bg-gradient-to-b from-[#200808] to-[#120404] p-6 rounded-2xl border border-amber-500/40 flex flex-col items-center justify-center space-y-5 text-center shadow-2xl">
            <div className="flex items-center space-x-2 text-amber-400 font-bold tracking-wider text-sm">
              <QrCode className="w-5 h-5" />
              <span>SCAN & PAY</span>
            </div>

            <p className="text-xs text-gray-300 px-2 leading-relaxed">
              Scan the QR code using any UPI app to make instant secure payment
            </p>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-amber-500/60 relative group transform transition hover:scale-105">
              <img 
                src="/qr-code.png" 
                alt="UPI Payment QR Code" 
                className="w-44 h-44 object-contain"
                onError={(e) => {
                  // Fallback dummy styling if qr image is missing
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 border-2 border-dashed border-amber-500 rounded-xl pointer-events-none animate-pulse opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase text-gray-400 font-semibold tracking-wider block">UPI ID</span>
              <span className="font-mono text-sm font-bold text-amber-300 tracking-wider">assamglory@upi</span>
            </div>

            {/* Countdown timer */}
            <div className="bg-black/60 py-2.5 px-4 rounded-xl border border-amber-500/30 flex items-center justify-center space-x-2 text-xs w-full">
              <Clock className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="font-mono font-bold text-red-400">{formatTime(timeLeft)}</span>
              <span className="text-gray-400 font-medium">remaining to complete</span>
            </div>
          </div>
        </div>

        {/* Security Message */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-4 border-t border-[#381818]">
          <Lock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Your payment details are 256-bit SSL encrypted and securely processed.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button 
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-amber-500/50 text-amber-400 font-semibold hover:bg-amber-500/10 transition tracking-wider text-sm uppercase flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>BACK</span>
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPay}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-cinzel font-black text-lg tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-110 transition duration-300 flex items-center justify-center space-x-3 cursor-pointer"
          >
            <Lock className="w-5 h-5 text-black shrink-0" />
            <span>PAY ₹ {grandTotal.toFixed(2)}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
