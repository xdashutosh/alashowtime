import React, { useState } from 'react';
import { Ticket, UserCheck, Ban, Clock, ShieldCheck, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface TermsViewProps {
  onAccept: () => void;
  onCancel: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onAccept, onCancel }) => {
  const [accepted, setAccepted] = useState(false);

  const termsList = [
    { icon: Ticket, text: 'Tickets are valid only for the selected date and show time.' },
    { icon: UserCheck, text: 'Each Aadhaar number can be used to book a maximum of 4 tickets.' },
    { icon: Ban, text: 'Tickets are non-transferable and non-refundable under any circumstance.' },
    { icon: Clock, text: 'Please reach the venue at least 30 minutes prior to the show.' },
    { icon: ShieldCheck, text: 'Management reserves the right of admission and security screening.' },
    { icon: AlertCircle, text: 'Follow all venue rules, laser safety guidelines, and instructions.' },
  ];

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#160a0a]/90 border border-amber-500/40 rounded-2xl p-6 lg:p-10 shadow-2xl shadow-black relative overflow-hidden backdrop-blur-xl"
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-3 mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-500" />
            <h2 className="font-cinzel text-2xl lg:text-3xl font-black tracking-widest text-amber-300">
              TERMS & CONDITIONS
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto rounded-full" />
        </div>

        {/* Terms Items */}
        <div className="space-y-5 my-8">
          {termsList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="flex items-start space-x-4 p-3 bg-black/40 rounded-xl border border-[#381818] hover:border-amber-500/40 transition duration-300"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5" />
                </div>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium pt-1">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Agreement Checkbox */}
        <div 
          onClick={() => setAccepted(!accepted)}
          className="flex items-center space-x-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/40 cursor-pointer my-8 group hover:bg-amber-500/20 transition"
        >
          <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition ${
            accepted 
              ? 'bg-amber-500 border-amber-500 text-black' 
              : 'border-amber-500/60 bg-black/50 text-transparent'
          }`}>
            <Check className="w-4 h-4 font-bold" />
          </div>
          <span className="text-sm md:text-base text-amber-200 font-semibold select-none">
            I have read, understood and agree to the Terms & Conditions.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-[#381818]">
          <button 
            onClick={onCancel}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-amber-500/50 text-amber-400 font-semibold hover:bg-amber-500/10 transition tracking-wider text-sm uppercase"
          >
            CANCEL
          </button>
          <button 
            onClick={onAccept}
            disabled={!accepted}
            className={`w-full sm:w-auto px-10 py-3.5 rounded-xl font-cinzel font-bold text-base tracking-widest uppercase shadow-xl transition duration-300 ${
              accepted 
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:brightness-110 shadow-amber-500/20 cursor-pointer scale-100 hover:scale-102' 
                : 'bg-gray-700 text-gray-400 opacity-50 cursor-not-allowed shadow-none'
            }`}
          >
            ACCEPT & BOOK TICKETS
          </button>
        </div>
      </motion.div>
    </div>
  );
};
