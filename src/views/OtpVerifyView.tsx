import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Lock, Clock, ChevronRight, RefreshCw, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface OtpVerifyProps {
  mobileNumber: string;
  onSetMobile: (mobile: string) => void;
  onVerify: () => void;
  onChangeMobile: () => void;
}

export const OtpVerifyView: React.FC<OtpVerifyProps> = ({
  mobileNumber,
  onSetMobile,
  onVerify,
  onChangeMobile,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(175); // 02:55 as in PDF
  const [isEditingMobile, setIsEditingMobile] = useState(!mobileNumber);
  const [tempMobile, setTempMobile] = useState(mobileNumber || '');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...otpValues];
    newValues[index] = value.slice(-1);
    setOtpValues(newValues);

    // Auto advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempMobile.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }
    onSetMobile(tempMobile);
    setIsEditingMobile(false);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingMobile) {
      alert('Please save your mobile number first.');
      return;
    }
    const fullOtp = otpValues.join('');
    if (fullOtp.length !== 6) {
      alert('Please enter the 6-digit OTP.');
      return;
    }
    onVerify();
  };

  const handleResend = () => {
    setTimeLeft(175);
    setOtpValues(['', '', '', '', '', '']);
    alert('A new OTP has been sent to your mobile number.');
    inputRefs.current[0]?.focus();
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
            <Smartphone className="w-10 h-10 text-[#d4af37]" />
          </div>

          <h2 className="font-cinzel text-3xl lg:text-4xl font-bold tracking-widest text-[#e6ca65]">
            VERIFY OTP
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#e6ca65] to-[#9c7a38] mx-auto rounded-full" />
        </div>

        {/* Mobile Number Display / Edit */}
        {isEditingMobile ? (
          <form onSubmit={handleMobileSubmit} className="space-y-4 bg-black/60 p-5 rounded-xl border border-[#c5a059]/30">
            <label className="text-xs uppercase text-[#d4af37] font-semibold tracking-wider block">
              Enter Registered Mobile Number
            </label>
            <div className="flex space-x-2">
              <span className="bg-[#0b0e17] border border-[#c5a059]/40 rounded-lg px-4 py-3 text-[#e6ca65] font-mono font-bold flex items-center">
                +91
              </span>
              <input
                type="tel"
                placeholder="98765 43210"
                value={tempMobile}
                onChange={(e) => setTempMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 bg-[#0b0e17] border border-[#c5a059]/40 rounded-lg px-4 py-3 font-mono text-lg text-[#e6ca65] placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 bg-[#d4af37] text-black font-bold text-sm rounded-lg hover:bg-[#e6ca65] transition uppercase tracking-wider cursor-pointer"
              >
                Send
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-sm text-[#cbd5e1]">
              An OTP has been sent to your mobile number
            </p>
            <div className="flex items-center justify-center space-x-3">
              <span className="font-mono text-lg font-bold text-[#e6ca65] tracking-wider">
                +91 {mobileNumber.slice(0, 2)}XXX XX{mobileNumber.slice(-3)}
              </span>
              <button 
                onClick={() => setIsEditingMobile(true)}
                className="p-1.5 bg-[#d4af37]/20 text-[#d4af37] rounded-md hover:bg-[#d4af37] hover:text-black transition cursor-pointer"
                title="Edit Mobile Number"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 pt-2 font-medium">Enter the 6-digit OTP below</p>
          </div>
        )}

        {/* OTP Input Boxes */}
        {!isEditingMobile && (
          <form onSubmit={handleVerifySubmit} className="space-y-8">
            <div className="grid grid-cols-6 gap-3 max-w-sm mx-auto">
              {otpValues.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-full aspect-square bg-[#0b0e17] border-2 border-[#c5a059]/40 rounded-xl text-center font-mono text-2xl font-black text-[#e6ca65] focus:outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/20 transition shadow-inner"
                />
              ))}
            </div>

            {/* Timer & Resend */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold px-2 text-center">
              <div className="flex items-center space-x-1.5 text-[#d4af37]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>OTP will expire in {formatTime(timeLeft)}</span>
              </div>
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 150}
                className="text-[#d4af37] hover:text-[#e6ca65] hover:underline disabled:opacity-40 disabled:hover:no-underline transition flex items-center space-x-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 shrink-0" />
                <span>Didn't receive OTP? Resend OTP</span>
              </button>
            </div>

            {/* Security message */}
            <div className="bg-[#181d2c]/80 p-4 rounded-xl border border-[#2b3347] flex items-start space-x-3 text-left">
              <Lock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#cbd5e1]">Your data is secure and encrypted</p>
                <p className="text-[11px] text-gray-400 mt-0.5">We do not share your mobile or Aadhaar information with anyone.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button 
                type="button"
                onClick={onChangeMobile}
                className="w-full sm:w-1/2 py-4 rounded-xl border border-[#c5a059]/40 text-[#d4af37] font-semibold hover:bg-[#d4af37]/10 transition tracking-wider text-xs uppercase cursor-pointer"
              >
                CHANGE MOBILE NUMBER
              </button>
              <button 
                type="submit"
                className="w-full sm:w-1/2 py-4 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-bold text-sm tracking-widest uppercase shadow-xl hover:opacity-95 shadow-[#d4af37]/20 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer font-bold"
              >
                <span>VERIFY & PROCEED</span>
                <ChevronRight className="w-4 h-4 text-black shrink-0" />
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
