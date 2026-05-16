import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Award, ShieldCheck, Plus, Minus, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface SeatSelectionProps {
  selectedDate: string;
  selectedSeats: string[];
  onSelectSeats: (seats: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SeatSelectionView: React.FC<SeatSelectionProps> = ({
  selectedDate,
  selectedSeats,
  onSelectSeats,
  onNext,
  onBack,
}) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cols = 18;
  const ticketPrice = 100;

  // Let's create some dummy booked seats so the grid looks extremely realistic
  const bookedSeatsStr = ['A-5', 'A-6', 'B-10', 'B-11', 'D-12', 'D-13', 'E-7', 'E-8', 'G-1', 'G-2', 'G-17', 'G-18'];

  const handleSeatClick = (seatId: string) => {
    if (bookedSeatsStr.includes(seatId)) return; // Can't select booked

    if (selectedSeats.includes(seatId)) {
      onSelectSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length >= 4) {
        alert('Maximum 4 tickets can be booked per Aadhaar number.');
        return;
      }
      onSelectSeats([...selectedSeats, seatId]);
    }
  };

  const handleIncrement = () => {
    if (selectedSeats.length >= 4) {
      alert('Maximum 4 tickets allowed.');
      return;
    }
    // Auto pick next available seat in Row C or D
    for (const r of ['C', 'D', 'E', 'F', 'B', 'A']) {
      for (let c = 5; c <= 15; c++) {
        const sid = `${r}-${c}`;
        if (!bookedSeatsStr.includes(sid) && !selectedSeats.includes(sid)) {
          onSelectSeats([...selectedSeats, sid]);
          return;
        }
      }
    }
  };

  const handleDecrement = () => {
    if (selectedSeats.length > 0) {
      onSelectSeats(selectedSeats.slice(0, -1));
    }
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center my-auto">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#160a0a]/90 border border-amber-500/40 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black backdrop-blur-xl flex flex-col space-y-6"
      >
        {/* Title & Legend Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#381818]">
          <div>
            <h2 className="font-cinzel text-2xl lg:text-3xl font-bold tracking-wider text-amber-300">
              SEATS AVAILABILITY
            </h2>
            <p className="text-xs text-gray-400 font-medium tracking-wide mt-1">
              Select your preferred seats (Max. 4 tickets per Aadhaar)
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-6 text-xs font-semibold tracking-wider">
            <div className="flex items-center space-x-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-sm shadow-emerald-500/50" />
              <span className="text-gray-300">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span className="text-amber-400 font-bold">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#2a1a1a] border border-[#4a2828]" />
              <span className="text-gray-500">Booked</span>
            </div>
          </div>
        </div>

        {/* Stage Component */}
        <div className="w-full max-w-lg mx-auto py-2 bg-gradient-to-r from-amber-950 via-red-950 to-amber-950 rounded-b-3xl border-t-2 border-amber-500/60 text-center shadow-lg shadow-black mb-2">
          <span className="font-cinzel text-xs font-black tracking-[0.5em] text-amber-400 uppercase">STAGE</span>
        </div>

        {/* Seat Grid Layout */}
        <div className="overflow-x-auto py-2 px-1">
          <div className="min-w-[650px] flex flex-col space-y-3">
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-between space-x-3">
                <span className="font-mono text-xs font-bold text-amber-500 w-6 text-center">{row}</span>
                
                <div className="flex-1 grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1 sm:gap-1.5">
                  {Array.from({ length: cols }, (_, i) => i + 1).map((col) => {
                    const seatId = `${row}-${col}`;
                    const isBooked = bookedSeatsStr.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => handleSeatClick(seatId)}
                        className={`h-7 sm:h-8 rounded-md font-mono text-[10px] sm:text-[11px] font-bold flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold scale-110 shadow-md shadow-amber-500/50 ring-2 ring-white/50 z-10'
                            : isBooked
                              ? 'bg-[#1c1010] text-gray-600 border border-[#301616] cursor-not-allowed opacity-60'
                              : 'bg-emerald-800/80 hover:bg-emerald-600 text-emerald-100 border border-emerald-500/40 shadow-sm'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>

                <span className="font-mono text-xs font-bold text-amber-500 w-6 text-center">{row}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom controls breakdown & Summary panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#381818] items-center">
          {/* Selected Chips */}
          <div className="flex flex-col space-y-2 text-left">
            <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
              Selected Seats ({selectedSeats.length})
            </span>
            <div className="flex flex-wrap gap-1.5 min-h-[40px] items-center">
              {selectedSeats.length === 0 ? (
                <span className="text-xs text-gray-500 italic">No seats selected yet</span>
              ) : (
                selectedSeats.map((sid) => (
                  <span
                    key={sid}
                    onClick={() => handleSeatClick(sid)}
                    className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/60 rounded-full text-amber-300 font-mono text-xs font-bold flex items-center space-x-1 cursor-pointer hover:bg-amber-500/30 transition group shrink-0"
                  >
                    <span>{sid}</span>
                    <X className="w-3.5 h-3.5 text-amber-400 group-hover:text-red-400" />
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Ticket Counter */}
          <div className="flex flex-col items-center justify-center space-y-2 border-y lg:border-y-0 lg:border-x border-[#381818] py-4 lg:py-0">
            <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Tickets Selected</span>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleDecrement}
                disabled={selectedSeats.length === 0}
                className="w-10 h-10 rounded-xl bg-black/60 border border-amber-500/40 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 transition cursor-pointer"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-mono text-2xl font-black text-amber-300 w-8 text-center">
                {selectedSeats.length}
              </span>
              <button 
                onClick={handleIncrement}
                disabled={selectedSeats.length >= 4}
                className="w-10 h-10 rounded-xl bg-black/60 border border-amber-500/40 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 transition cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">Max. 4 tickets allowed per Aadhaar</span>
          </div>

          {/* Total Amount */}
          <div className="flex flex-col lg:items-end space-y-1 text-center lg:text-right">
            <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Total Amount</span>
            <span className="font-mono text-3xl font-black text-amber-400">
              ₹ {(selectedSeats.length * ticketPrice).toFixed(2)}
            </span>
            <span className="text-[11px] text-gray-400">
              (₹100.00 × {selectedSeats.length} Tickets)
            </span>
          </div>
        </div>

        {/* Verification Alert Banner */}
        <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 flex items-center space-x-3 text-xs text-amber-200 text-left">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Aadhaar verification required in next step. Ensure you have your 12-digit Aadhaar number ready.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#381818]">
          <button 
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-amber-500/50 text-amber-400 font-semibold hover:bg-amber-500/10 transition tracking-wider text-sm uppercase flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>
          <button 
            onClick={onNext}
            disabled={selectedSeats.length === 0}
            className={`w-full sm:w-auto px-10 py-3.5 rounded-xl font-cinzel font-bold text-base tracking-widest uppercase shadow-xl transition duration-300 flex items-center justify-center space-x-2 ${
              selectedSeats.length > 0 
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black hover:brightness-110 shadow-amber-500/20 cursor-pointer' 
                : 'bg-gray-700 text-gray-400 opacity-50 cursor-not-allowed'
            }`}
          >
            <span>PROCEED TO VERIFY</span>
            <ChevronRight className="w-5 h-5 text-black shrink-0" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
