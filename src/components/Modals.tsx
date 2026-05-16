import React from 'react';
import { X, MapPin, Clock, Calendar, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-[#170a0a] border border-amber-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)] text-gray-200"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#281010] to-[#1c0808] p-6 border-b border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">About The Show</span>
                <h3 className="font-cinzel text-2xl font-bold text-amber-300">Assam – The Saga of Glory</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-gray-400 hover:text-amber-400 border border-amber-500/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              <p className="text-sm leading-relaxed text-gray-300">
                Experience the majestic history and cultural heritage of Assam like never before. 
                <span className="text-amber-400 font-semibold"> "Assam – The Saga of Glory" </span> is a spectacular 3D Projection Mapping and Light & Sound show hosted at the iconic premises of the Assam Legislative Assembly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-amber-400 font-semibold text-sm">Venue</h4>
                    <p className="text-xs text-gray-400 mt-1">Assam Legislative Assembly Premises, Dispur, Guwahati, Assam</p>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-amber-400 font-semibold text-sm">Show Timing</h4>
                    <p className="text-xs text-gray-400 mt-1">Every Evening at 7:00 PM. Duration is exactly 30 Minutes.</p>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-amber-400 font-semibold text-sm">Schedule</h4>
                    <p className="text-xs text-gray-400 mt-1">Open all days of the week including weekends & public holidays.</p>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-start space-x-3">
                  <Award className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-amber-400 font-semibold text-sm">Capacity</h4>
                    <p className="text-xs text-gray-400 mt-1">126 Premium immersive viewing seats. Advance booking required.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-xs text-amber-200">
                  Note: Entry is completely authenticated via Aadhaar verification. A maximum of 4 tickets can be booked per Aadhaar number.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/60 border-t border-amber-500/20 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm rounded-lg hover:brightness-110 transition shadow-lg shadow-amber-500/20"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-[#170a0a] border border-amber-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)] text-gray-200"
          >
            <div className="relative bg-gradient-to-r from-[#281010] to-[#1c0808] p-6 border-b border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Assistance & Inquiries</span>
                <h3 className="font-cinzel text-2xl font-bold text-amber-300">Contact Venue Support</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-gray-400 hover:text-amber-400 border border-amber-500/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-300">
                Our support desk is available 24/7 to assist you with ticket booking, payment verification, and directions to the venue.
              </p>

              <div className="space-y-4">
                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-center space-x-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-gray-400 font-semibold">Phone Support</h4>
                    <p className="text-base text-amber-300 font-mono font-bold mt-0.5">+91 00000 00000</p>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-center space-x-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-gray-400 font-semibold">Email Support</h4>
                    <p className="text-base text-amber-300 font-mono font-bold mt-0.5">support@assamglory.com</p>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-[#381818] flex items-center space-x-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-gray-400 font-semibold">Venue Helpdesk</h4>
                    <p className="text-xs text-gray-300 mt-0.5">Gate No. 1, Assam Legislative Assembly, Dispur, Guwahati</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/60 border-t border-amber-500/20 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm rounded-lg hover:brightness-110 transition shadow-lg shadow-amber-500/20"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
