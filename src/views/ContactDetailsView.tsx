import React, { useState } from 'react';
import { Mail, Smartphone, ChevronRight, ChevronLeft, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactDetailsProps {
  email: string;
  mobileNumber: string;
  onSetEmail: (email: string) => void;
  onSetMobile: (mobile: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContactDetailsView: React.FC<ContactDetailsProps> = ({
  email,
  mobileNumber,
  onSetEmail,
  onSetMobile,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || email.length < 5) {
      setError('Please enter a valid email address.');
      return;
    }
    if (mobileNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    onNext();
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
            CONTACT DETAILS
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#e6ca65] to-[#9c7a38] mx-auto rounded-full" />

          <p className="text-sm text-[#cbd5e1] max-w-sm mx-auto">
            Where should we send your booking confirmation and OTP?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            
            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase ml-1">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => onSetEmail(e.target.value)}
                  className="w-full bg-[#0b0e17] border border-[#c5a059]/40 rounded-xl px-5 py-4 text-[#e6ca65] placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition pr-12 shadow-inner"
                  autoFocus
                />
                <div className="absolute right-4 text-[#d4af37]/60 pointer-events-none">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Mobile Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase ml-1">Mobile Number</label>
              <div className="relative flex items-center space-x-2">
                <span className="bg-[#0b0e17] border border-[#c5a059]/40 rounded-xl px-4 py-4 text-[#e6ca65] font-mono font-bold flex items-center shadow-inner">
                  +91
                </span>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="98765 43210"
                    value={mobileNumber}
                    onChange={(e) => onSetMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-[#0b0e17] border border-[#c5a059]/40 rounded-xl px-5 py-4 font-mono text-lg text-[#e6ca65] placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition pr-12 shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37]/60 pointer-events-none">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-red-400 font-semibold pl-1 text-center">{error}</p>}
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
              <span>CONTINUE</span>
              <ChevronRight className="w-5 h-5 text-black shrink-0" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
