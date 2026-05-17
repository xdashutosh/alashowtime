import React, { useState } from 'react';
import { UserCheck, Lock, ShieldCheck, ChevronRight, ChevronLeft, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

interface AadhaarVerifyProps {
  aadhaarNumber: string;
  onSetAadhaar: (num: string) => void;
  onSendOtp: () => void;
  onBack: () => void;
}

export const AadhaarVerifyView: React.FC<AadhaarVerifyProps> = ({
  aadhaarNumber,
  onSetAadhaar,
  onSendOtp,
  onBack,
}) => {
  const [error, setError] = useState('');

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const formatted = formatAadhaar(e.target.value);
    onSetAadhaar(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = aadhaarNumber.replace(/\s/g, '');
    if (raw.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    onSendOtp();
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#131622]/90 border border-[#c5a059]/25 rounded-2xl p-6 lg:p-12 shadow-2xl max-w-xl mx-auto w-full backdrop-blur-xl flex flex-col space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon & Title */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#d4af37]/20 via-[#d4af37]/10 to-transparent p-1 mx-auto border border-[#d4af37]/40 flex items-center justify-center shadow-lg shadow-[#d4af37]/10">
            <UserCheck className="w-10 h-10 text-[#d4af37]" />
          </div>

          <h2 className="font-cinzel text-3xl lg:text-4xl font-bold tracking-widest text-[#e6ca65]">
            AADHAAR VERIFICATION
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#e6ca65] to-[#9c7a38] mx-auto rounded-full" />

          <p className="text-sm text-[#cbd5e1] max-w-sm mx-auto">
            Enter your Aadhaar number for verification and ticket booking.
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter 12-digit Aadhaar Number"
                value={aadhaarNumber}
                onChange={handleInputChange}
                className="w-full bg-[#0b0e17] border-2 border-[#c5a059]/40 rounded-xl px-5 py-4 font-mono text-lg tracking-widest text-[#e6ca65] placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/20 transition pr-16 shadow-inner"
                autoFocus
              />
              <div className="absolute right-4 text-[#d4af37]/80 pointer-events-none flex items-center space-x-1">
                <Fingerprint className="w-7 h-7 animate-pulse text-[#d4af37]" />
              </div>
            </div>
            {error && <p className="text-xs text-red-400 font-semibold pl-1">{error}</p>}
          </div>

          {/* Security message */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 font-medium pt-1">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <span>Your data is secure and encrypted</span>
          </div>

          {/* Alert Box */}
          <div className="bg-[#1e1c15]/80 p-4 rounded-xl border border-[#d4af37]/30 flex items-start space-x-3 text-left">
            <ShieldCheck className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
            <p className="text-xs text-[#e6ca65]/90 leading-snug font-medium">
              Each Aadhaar number can be used to book a maximum of 4 tickets. Verification is mandatory for venue security.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <button 
              type="button"
              onClick={onBack}
              className="w-full sm:w-1/3 py-4 rounded-xl border border-[#c5a059]/40 text-[#d4af37] font-semibold hover:bg-[#d4af37]/10 transition tracking-wider text-sm uppercase flex items-center justify-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>BACK</span>
            </button>
            <button 
              type="submit"
              className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-black text-lg tracking-widest uppercase shadow-xl hover:opacity-95 shadow-[#d4af37]/20 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer font-bold"
            >
              <span>SEND OTP</span>
              <ChevronRight className="w-5 h-5 text-black shrink-0" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
