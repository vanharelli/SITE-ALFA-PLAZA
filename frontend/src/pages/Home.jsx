import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import RoomsGallery from '../components/RoomsGallery';
import Amenities from '../components/Amenities';
import DigitalProtocol from '../components/DigitalProtocol';
import Location from '../components/Location';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
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
      <Header />
      <Hero />
      <RoomsGallery />
      <Amenities />
      <DigitalProtocol />
      <Location />
      <Footer />
    </div>
  );
};

export default Home;
