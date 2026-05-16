export type Step = 
  | 'landing' 
  | 'terms' 
  | 'date' 
  | 'seats' 
  | 'aadhaar' 
  | 'otp' 
  | 'payment' 
  | 'confirmation' 
  | 'final_dashboard';

export interface Seat {
  id: string; // e.g., "C-6"
  row: string; // "A" - "G"
  col: number; // 1 - 18
  status: 'available' | 'selected' | 'booked';
  tier?: 'premium' | 'standard';
}

export interface BookingState {
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  aadhaarNumber: string;
  mobileNumber: string;
  otp: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  bookingId: string;
  totalAmount: number;
}
