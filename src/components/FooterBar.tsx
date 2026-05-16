import React from 'react';
import { ShieldCheck, Headphones, Clock, Mail, Globe, Share2, MessageCircle } from 'lucide-react';
import type { Step } from '../types';

interface FooterBarProps {
  currentStep: Step;
}

export const FooterBar: React.FC<FooterBarProps> = ({ currentStep }) => {
  const isFinal = currentStep === 'confirmation' || currentStep === 'final_dashboard';

  return (
    <footer className="w-full bg-[#1b0808] border-t border-[#3a1616] py-4 px-6 mt-auto shadow-inner text-gray-300 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
        {/* Left Security notice */}
        <div className="flex items-center space-x-3 group">
          <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:border-amber-500/60 transition-colors">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="font-semibold text-amber-400">Secure Booking</p>
            <p className="text-xs text-gray-400">Your information is safe with us.</p>
          </div>
        </div>

        {/* Center Help/Contact */}
        <div className="flex items-center space-x-3 group">
          <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:border-amber-500/60 transition-colors">
            <Headphones className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="font-semibold text-amber-400">Need Help? Contact Us</p>
            <p className="text-xs text-gray-400">+91 00000 00000</p>
          </div>
        </div>

        {/* Right Info / Socials */}
        {isFinal ? (
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-semibold text-amber-400">Write to us</p>
                <p className="text-xs text-gray-400">support@assamglory.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Follow us:</span>
              <div className="flex space-x-2">
                <a href="#web" className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300" title="Website">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#share" className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300" title="Share">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="#chat" className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300" title="Community">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 group">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 group-hover:border-amber-500/60 transition-colors">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-amber-400">Show Time</p>
              <p className="text-xs text-gray-400">Every Evening</p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
