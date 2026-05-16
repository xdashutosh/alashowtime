import React, { useState } from 'react';
import type { Step, BookingState } from './types';
import { Navbar } from './components/Navbar';
import { FooterBar } from './components/FooterBar';
import { SidebarPoster } from './components/SidebarPoster';
import { ShowDetailsModal, ContactModal } from './components/Modals';

// Views
import { LandingView } from './views/LandingView';
import { TermsView } from './views/TermsView';
import { DateSelectionView } from './views/DateSelectionView';
import { SeatSelectionView } from './views/SeatSelectionView';
import { AadhaarVerifyView } from './views/AadhaarVerifyView';
import { OtpVerifyView } from './views/OtpVerifyView';
import { PaymentView } from './views/PaymentView';
import { ConfirmationView } from './views/ConfirmationView';
import { FinalDashboardView } from './views/FinalDashboardView';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [bookingState, setBookingState] = useState<BookingState>({
    selectedDate: '15 May 2025',
    selectedTime: '7:00 PM',
    selectedSeats: ['C-6', 'C-7'], // Default pre-selected 2 seats
    aadhaarNumber: '',
    mobileNumber: '9876543210',
    otp: '',
    paymentMethod: 'upi',
    bookingId: 'ASAM250515000123',
    totalAmount: 210.00,
  });

  const handleNavigate = (step: Step) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(step);
  };

  const handleReset = () => {
    setBookingState({
      selectedDate: '15 May 2025',
      selectedTime: '7:00 PM',
      selectedSeats: ['C-6', 'C-7'],
      aadhaarNumber: '',
      mobileNumber: '9876543210',
      otp: '',
      paymentMethod: 'upi',
      bookingId: `ASAM${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      totalAmount: 210.00,
    });
    handleNavigate('landing');
  };

  // Render correct view based on current step
  const renderCurrentView = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <LandingView 
            onBookTickets={() => handleNavigate('terms')} 
            onOpenDetailsModal={() => setIsDetailsOpen(true)}
          />
        );
      case 'terms':
        return (
          <TermsView 
            onAccept={() => handleNavigate('date')}
            onCancel={() => handleNavigate('landing')}
          />
        );
      case 'date':
        return (
          <DateSelectionView 
            selectedDate={bookingState.selectedDate}
            onSelectDate={(date) => setBookingState(prev => ({ ...prev, selectedDate: date }))}
            onNext={() => handleNavigate('seats')}
            onBack={() => handleNavigate('terms')}
          />
        );
      case 'seats':
        return (
          <SeatSelectionView 
            selectedDate={bookingState.selectedDate}
            selectedSeats={bookingState.selectedSeats}
            onSelectSeats={(seats) => setBookingState(prev => ({ ...prev, selectedSeats: seats, totalAmount: seats.length * 100 + 10 }))}
            onNext={() => handleNavigate('aadhaar')}
            onBack={() => handleNavigate('date')}
          />
        );
      case 'aadhaar':
        return (
          <AadhaarVerifyView 
            aadhaarNumber={bookingState.aadhaarNumber}
            onSetAadhaar={(num) => setBookingState(prev => ({ ...prev, aadhaarNumber: num }))}
            onSendOtp={() => handleNavigate('otp')}
            onBack={() => handleNavigate('seats')}
          />
        );
      case 'otp':
        return (
          <OtpVerifyView 
            mobileNumber={bookingState.mobileNumber}
            onSetMobile={(mob) => setBookingState(prev => ({ ...prev, mobileNumber: mob }))}
            onVerify={() => handleNavigate('payment')}
            onChangeMobile={() => alert('Mobile number change option activated.')}
          />
        );
      case 'payment':
        return (
          <PaymentView 
            bookingState={bookingState}
            onSetPaymentMethod={(method) => setBookingState(prev => ({ ...prev, paymentMethod: method }))}
            onPay={() => handleNavigate('confirmation')}
            onBack={() => handleNavigate('otp')}
            onViewSeats={() => alert(`Selected Seats: ${bookingState.selectedSeats.join(', ')}`)}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationView 
            bookingState={bookingState}
            onBookAgain={handleReset}
            onGoHome={() => handleNavigate('landing')}
            onViewFinalDashboard={() => handleNavigate('final_dashboard')}
          />
        );
      case 'final_dashboard':
        return (
          <FinalDashboardView 
            bookingState={bookingState}
            onGoHome={() => handleNavigate('landing')}
          />
        );
      default:
        return <LandingView onBookTickets={() => handleNavigate('terms')} onOpenDetailsModal={() => setIsDetailsOpen(true)} />;
    }
  };

  const isLanding = currentStep === 'landing';

  return (
    <div className="min-h-screen bg-[#0c0505] text-gray-200 flex flex-col font-['Inter',sans-serif] selection:bg-amber-500 selection:text-black">
      {/* Global Navbar */}
      <Navbar 
        currentStep={currentStep}
        onNavigate={handleNavigate}
        onOpenDetailsModal={() => setIsDetailsOpen(true)}
        onOpenContactModal={() => setIsContactOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col w-full">
        {isLanding ? (
          renderCurrentView()
        ) : (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 md:py-12 flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">
            {/* Reusable Sidebar Poster for steps 2-9 */}
            <SidebarPoster 
              bookingState={bookingState}
              currentStep={currentStep}
            />

            {/* Step View Card */}
            {renderCurrentView()}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <FooterBar currentStep={currentStep} />

      {/* Global Modals */}
      <ShowDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;
