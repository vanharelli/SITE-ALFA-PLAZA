import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import RoomsGallery from '../components/RoomsGallery';
import Amenities from '../components/Amenities';
import Location from '../components/Location';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReservationModal from '../components/ReservationModal';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [initialSuite, setInitialSuite] = useState(null);

  const openReservation = (suite = null) => {
    setInitialSuite(suite);
    setIsReservationOpen(true);
  };
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-obsidian min-h-screen">
      <Header onOpenReservation={() => openReservation()} />
      <Hero onOpenReservation={() => openReservation()} />
      <Location onOpenReservation={() => openReservation()} />
      <Amenities onOpenReservation={() => openReservation()} />
      <RoomsGallery onOpenReservation={(suite) => openReservation(suite)} />
      <Footer />
      
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
        initialSuite={initialSuite}
      />

      <WhatsAppButton />
    </div>
  );
};

export default Home;
