import React, { useState } from 'react';
import { UploadCloud, ShieldCheck, ChevronRight, ChevronLeft, Fingerprint, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AadhaarVerifyProps {
  aadhaarNumber: string;
  onSetAadhaar: (num: string) => void;
  onUploadImages: (front: string, back: string) => void;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const AadhaarVerifyView: React.FC<AadhaarVerifyProps> = ({
  aadhaarNumber,
  onSetAadhaar,
  onUploadImages,
  onVerifySuccess,
  onBack,
}) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') setFrontImage(reader.result as string);
        else setBackImage(reader.result as string);
        setVerificationError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = () => {
    if (!frontImage || !backImage) {
      setVerificationError('Please upload both front and back images of your Aadhaar card.');
      return;
    }

    setIsVerifying(true);
    
    // Simulate Gemini API Verification Delay
    setTimeout(() => {
      setIsVerifying(false);
      // Simulate successful extraction
      onSetAadhaar('1234 5678 9012');
      onUploadImages(frontImage, backImage);
      onVerifySuccess();
    }, 3500); // 3.5s delay to simulate AI processing
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#131622]/90 border border-[#c5a059]/25 rounded-2xl p-6 lg:p-10 shadow-2xl max-w-xl mx-auto w-full backdrop-blur-xl flex flex-col space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37]/20 via-[#d4af37]/10 to-transparent p-1 mx-auto border border-[#d4af37]/40 flex items-center justify-center">
            <Fingerprint className="w-8 h-8 text-[#d4af37]" />
          </div>

          <h2 className="font-cinzel text-2xl lg:text-3xl font-bold tracking-widest text-[#e6ca65]">
            AADHAAR VERIFICATION
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-[#e6ca65] to-[#9c7a38] mx-auto rounded-full" />

          <p className="text-sm text-[#cbd5e1] max-w-sm mx-auto">
            Upload your Aadhaar card for AI-powered identity verification.
          </p>
        </div>

        {/* Upload Section */}
        <div className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Front Upload */}
            <label className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition overflow-hidden h-36 ${frontImage ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-[#c5a059]/30 bg-black/40 hover:border-[#c5a059]/60 hover:bg-black/60'}`}>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'front')} className="hidden" />
              {frontImage ? (
                <>
                  <img src={frontImage} alt="Aadhaar Front" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <CheckCircle2 className="w-8 h-8 text-[#d4af37] relative z-10 mb-2" />
                  <span className="text-xs font-semibold text-[#e6ca65] relative z-10">Front Uploaded</span>
                  <span className="text-[10px] text-gray-300 relative z-10 underline mt-1">Tap to change</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-[#c5a059]/80 mb-2" />
                  <span className="text-sm font-semibold text-[#cbd5e1]">Upload Front</span>
                  <span className="text-[10px] text-gray-400 mt-1">JPG, PNG format</span>
                </>
              )}
            </label>

            {/* Back Upload */}
            <label className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition overflow-hidden h-36 ${backImage ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-[#c5a059]/30 bg-black/40 hover:border-[#c5a059]/60 hover:bg-black/60'}`}>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'back')} className="hidden" />
              {backImage ? (
                <>
                  <img src={backImage} alt="Aadhaar Back" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <CheckCircle2 className="w-8 h-8 text-[#d4af37] relative z-10 mb-2" />
                  <span className="text-xs font-semibold text-[#e6ca65] relative z-10">Back Uploaded</span>
                  <span className="text-[10px] text-gray-300 relative z-10 underline mt-1">Tap to change</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-[#c5a059]/80 mb-2" />
                  <span className="text-sm font-semibold text-[#cbd5e1]">Upload Back</span>
                  <span className="text-[10px] text-gray-400 mt-1">JPG, PNG format</span>
                </>
              )}
            </label>
          </div>

          {verificationError && (
            <p className="text-xs text-red-400 font-semibold text-center mt-2">{verificationError}</p>
          )}

          {/* AI Info Box */}
          <div className="bg-gradient-to-r from-[#181d2c]/90 to-[#131722]/90 p-4 rounded-xl border border-[#2b3347] flex items-start space-x-3 text-left shadow-lg">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-100 flex items-center">
                Powered by Gemini AI 
                <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">Secure</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                Your Aadhaar card is instantly verified using advanced AI models. Data is encrypted and automatically removed from our servers after verification.
              </p>
            </div>
          </div>
        </div>

        {/* Verifying Overlay */}
        <AnimatePresence>
          {isVerifying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#131622]/90 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6 rounded-2xl"
            >
              <Loader2 className="w-12 h-12 text-[#d4af37] animate-spin mb-4" />
              <h3 className="text-lg font-cinzel font-bold text-[#e6ca65] tracking-widest mb-2">Analyzing Document</h3>
              <p className="text-xs text-[#cbd5e1] max-w-xs leading-relaxed">
                Gemini AI is processing your Aadhaar details. Please wait a moment while we verify your identity.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 relative z-10">
          <button 
            type="button"
            onClick={onBack}
            disabled={isVerifying}
            className="w-full sm:w-1/3 py-4 rounded-xl border border-[#c5a059]/40 text-[#d4af37] font-semibold hover:bg-[#d4af37]/10 transition tracking-wider text-sm uppercase flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>
          <button 
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || !frontImage || !backImage}
            className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b38f44] text-black font-cinzel font-black text-lg tracking-widest uppercase shadow-xl hover:opacity-95 shadow-[#d4af37]/20 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:grayscale"
          >
            <span>VERIFY AADHAAR</span>
            <ChevronRight className="w-5 h-5 text-black shrink-0" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
