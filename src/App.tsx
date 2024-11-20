import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import CaseStudyDetail from './components/CaseStudyDetail';
import AppointmentModal from './components/AppointmentModal';
import AdminDashboard from './components/AdminDashboard';
import Chat from './components/Chat';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Get the current path from window location
  const path = window.location.pathname;
  const caseStudyId = path.startsWith('/case-study/') ? path.split('/case-study/')[1] : null;

  if (path === '/chat') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Chat />
      </div>
    );
  }

  if (user && showDashboard) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AdminDashboard />
      </div>
    );
  }

  if (caseStudyId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CaseStudyDetail id={caseStudyId} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <About onBookAppointment={() => setIsAppointmentModalOpen(true)} />
      <Services />
      <CaseStudies onCaseStudyClick={setSelectedCaseStudy} />
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
      <Footer />
    </div>
  );
}

export default App;